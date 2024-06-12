const { BrowserWindow } = require("electron");
const path = require("path");

const pluginsPath = path.join(__dirname, "plugins");
const scrapersPath = path.join(pluginsPath, "scrapers");

let currentPluginWindow = null;
let currentPluginDir = null;

function openPlugin(pluginDir) {
  if (currentPluginWindow) {
    currentPluginWindow.close();
  }

  const pluginConfig = global.scrapers.find((p) => p.dir === pluginDir);
  if (!pluginConfig) {
    throw new Error(`Plugin ${pluginDir} not found`);
  }

  const pluginPath = path.join(scrapersPath, pluginDir, pluginConfig.start);
  currentPluginWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  currentPluginWindow.loadFile(pluginPath);
  currentPluginDir = pluginDir; // Set the current plugin directory

  currentPluginWindow.on("closed", () => {
    currentPluginWindow = null;
    currentPluginDir = null; // Clear the current plugin directory
  });
}

module.exports = {
  openPlugin,
  getCurrentPluginDir: () => currentPluginDir,
};
