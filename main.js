const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs").promises;
const { initData, isProjectOnline } = require("./dataInitializer");

const dataPath = path.join(__dirname, "data.json");
const pluginsPath = path.join(__dirname, "plugins");
const scrapersPath = path.join(pluginsPath, "scrapers");

let mainWindow;
const devTools = false;

async function loadPlugins() {
  try {
    const scraperDirs = await fs.readdir(scrapersPath);
    const scrapers = [];

    for (const dir of scraperDirs) {
      const pluginIndexPath = path.join(scrapersPath, dir, "index.js");
      if (
        await fs
          .access(pluginIndexPath)
          .then(() => true)
          .catch(() => false)
      ) {
        const pluginConfig = require(pluginIndexPath);
        scrapers.push({ ...pluginConfig, dir });
      }
    }

    global.scrapers = scrapers;
    console.log("Scraper plugins successfully loaded.");
    return scrapers;
  } catch (error) {
    console.error("Error loading plugins:", error);
    return [];
  }
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    title: "HumanitiesConnect",
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadURL("http://localhost:3000");
  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  if (devTools) {
    mainWindow.webContents.openDevTools(); // Open DevTools at startup
  }

  Menu.setApplicationMenu(null);
}

app
  .whenReady()
  .then(initData)
  .then(loadPlugins)
  .then(createMainWindow)
  .catch((error) =>
    console.error("Error starting server or creating window:", error)
  );

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});

ipcMain.handle("get-data", async () => {
  try {
    const data = await fs.readFile(dataPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading data:", error);
    throw new Error("Error reading data");
  }
});

ipcMain.handle("save-data", async (event, newData) => {
  try {
    await fs.writeFile(dataPath, JSON.stringify(newData, null, 2));
  } catch (error) {
    console.error("Error saving data:", error);
    throw new Error("Error saving data");
  }
});

ipcMain.handle("add-data", async (event, newEntry) => {
  try {
    console.log("add-data received:", newEntry);
    const { name, description, link } = newEntry;
    if (!name || !description || !link) {
      throw new Error("Invalid data provided. All fields are required.");
    }

    const data = JSON.parse(await fs.readFile(dataPath, "utf8"));
    const newId =
      data.length > 0 ? Math.max(...data.map((item) => item.id)) + 1 : 1;
    const newData = {
      id: newId,
      name,
      description,
      link,
      isOnline: await isProjectOnline(link),
    };

    data.push(newData);
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
    return newData;
  } catch (error) {
    console.error("Error saving data:", error);
    throw new Error("Error saving data");
  }
});

ipcMain.handle("update-data", async (event, updatedEntry) => {
  const projectId = updatedEntry.id;
  if (isNaN(projectId)) {
    throw new Error("Invalid Id");
  }

  try {
    const data = JSON.parse(await fs.readFile(dataPath, "utf8"));
    const projectIndex = data.findIndex((proj) => proj.id === projectId);
    if (projectIndex === -1) {
      throw new Error("Project not found");
    }
    const { name, description, link } = updatedEntry;
    if (name) data[projectIndex].name = name;
    if (description) data[projectIndex].description = description;
    if (link) {
      data[projectIndex].link = link;
      data[projectIndex].isOnline = await isProjectOnline(link);
    }
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
    return data[projectIndex];
  } catch (error) {
    console.error("Error updating data:", error);
    throw new Error("Error updating data");
  }
});

// General Plugin Handler
ipcMain.handle("plugin-add-data", async (event, newEntries) => {
  try {
    const data = JSON.parse(await fs.readFile(dataPath, "utf8"));
    let maxId = data.length > 0 ? Math.max(...data.map((item) => item.id)) : 0;

    for (const entry of newEntries) {
      const { name, description, link } = entry;
      if (!name || !description || !link) {
        continue; // Skip invalid entries
      }

      const newId = ++maxId;
      const newData = {
        id: newId,
        name,
        description,
        link,
        isOnline: await isProjectOnline(link),
      };

      data.push(newData);
    }

    await fs.writeFile(dataPath, JSON.stringify(data, null, 2));
    return { message: "Data successfully added by plugin." };
  } catch (error) {
    console.error("Error adding data via plugin:", error);
    throw new Error("Error adding data via plugin");
  }
});

// Open a Plugin Window
ipcMain.handle("open-plugin", async (event, pluginDir) => {
  const pluginConfig = global.scrapers.find((p) => p.dir === pluginDir);
  if (!pluginConfig) {
    throw new Error(`Plugin ${pluginDir} not found`);
  }

  const pluginPath = path.join(scrapersPath, pluginDir, pluginConfig.start);
  let pluginWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  pluginWindow.loadFile(pluginPath);

  pluginWindow.on("closed", () => {
    pluginWindow = null;
  });
});

// IPC Handler for Plugins
ipcMain.handle("get-plugins", async () => {
  return global.scrapers;
});

// Listen for notify-main message and refresh the main window
ipcMain.on("notify-main", () => {
  if (mainWindow) {
    mainWindow.webContents.send("refresh-data");
  }
});

ipcMain.handle("refresh-data", async () => {
  try {
    const data = JSON.parse(await fs.readFile(dataPath, "utf8"));

    const updatePromises = data.map(async (project) => {
      project.isOnline = await isProjectOnline(project.link);
      return project;
    });

    const updatedData = await Promise.all(updatePromises);

    await fs.writeFile(dataPath, JSON.stringify(updatedData, null, 2));
    console.log("Projects successfully loaded and updated.");
  } catch (error) {
    console.error("Error loading and updating projects:", error);
  }
});
