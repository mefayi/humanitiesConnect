const axios = require("axios");
const fs = require("fs").promises;
const path = require("path");

const dataPath = path.join(__dirname, "data.json");

// Initialize data and update project status
async function initData() {
  try {
    await fs.access(dataPath);
  } catch (error) {
    console.log("data.json does not exist, creating...");
    await fs.writeFile(
      dataPath,
      JSON.stringify(
        [
          {
            id: 1,
            name: "Project",
            description: "Development",
            link: "http://example.com",
            isOnline: false,
          },
        ],
        null,
        2
      )
    );
    return;
  }
}

module.exports = {
  initData,
};
