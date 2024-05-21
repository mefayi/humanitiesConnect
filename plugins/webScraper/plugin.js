const { ipcRenderer } = require("electron");
const axios = require("axios");
const cheerio = require("cheerio");

document.getElementById("scrapeButton").addEventListener("click", async () => {
  const url = document.getElementById("url").value;
  if (url) {
    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      // Beispielhafte Datenextraktion, diese kann angepasst werden
      const name = $("title").text();
      const description =
        $("meta[name='description']").attr("content") ||
        "No description available";
      const link = url;

      const newEntry = {
        name,
        description,
        link,
      };

      await ipcRenderer.invoke("plugin-add-data", [newEntry]);
      console.log("Website successfully scraped and data added.");
      window.close(); // Schließt das Plugin-Fenster nach Abschluss der Arbeit
    } catch (error) {
      console.error("Error scraping website:", error);
    }
  } else {
    alert("Please enter a valid URL.");
  }
});
