const fs = require("fs").promises;
const path = require("path");

const dataPath = path.join(__dirname, "data.json");

// Initialize data and update project status
async function initData() {
  try {
    await fs.access(dataPath);
  } catch (error) {
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
