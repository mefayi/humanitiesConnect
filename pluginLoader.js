const fs = require("fs").promises;
const path = require("path");

const pluginsPath = path.join(__dirname, "plugins");
const scrapersPath = path.join(pluginsPath, "scrapers");
const checkersPath = path.join(pluginsPath, "checkers");

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

    const checkerFiles = await fs.readdir(checkersPath);
    const checkers = {};

    for (const file of checkerFiles) {
      const pluginIndexPath = path.join(checkersPath, file);
      if (
        await fs
          .access(pluginIndexPath)
          .then(() => true)
          .catch(() => false)
      ) {
        const pluginConfig = require(pluginIndexPath);
        checkers[pluginConfig.name] = pluginConfig;
      }
    }

    global.checkers = checkers;

    return { scrapers, checkers };
  } catch (error) {
    console.error("Error loading plugins:", error);
    return { scrapers: [], checkers: {} };
  }
}

module.exports = {
  loadPlugins,
};
