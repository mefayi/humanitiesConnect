console.log("plugin.js loaded");
console.log(window.api);

document.getElementById("fetchButton").addEventListener("click", async () => {
  const urlInput = document.getElementById("urlInput");
  const fetchButton = document.getElementById("fetchButton");
  const url = urlInput.value.trim();

  if (url) {
    fetchButton.disabled = true;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const text = await response.text();

      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");

      // Funktion zum Extrahieren der Projektdaten
      function extractProjectData(projectDiv) {
        const name =
          projectDiv.querySelector("p strong")?.innerText || "No title";

        // Finden Sie das erste <p> Element mit einem <strong> Tag und dann das nächste <p> Element
        const firstPStrong = projectDiv.querySelector("p strong");
        const description =
          firstPStrong?.parentElement?.nextElementSibling?.innerText ||
          "No description";

        const linkElement =
          projectDiv.querySelector("p strong span.nobr a") ||
          projectDiv.querySelector("p strong a");

        let link = linkElement?.href || "";
        if (link && !link.startsWith("http")) {
          // Make relative links absolute
          link = new URL(link, url).href;
        }

        return {
          name,
          description,
          link,
        };
      }

      const projectContainers = doc.querySelectorAll("div.tab-content");
      const projects = [];

      projectContainers.forEach((container) => {
        const textWrap = container.querySelector("div.tb_text_wrap");
        if (textWrap) {
          const projectData = extractProjectData(textWrap);
          projects.push(projectData);
        }
      });

      console.log("Extracted projects:", projects);

      if (projects.length > 0) {
        const result = await window.api.pluginAddData(projects);
        alert(result.message);
        window.api.notifyMain(); // Notify the main application about the update
      } else {
        alert("No valid projects found.");
      }

      window.close(); // Close the plugin window after completing the work
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Error fetching data: " + error.message);
    } finally {
      fetchButton.disabled = false;
    }
  } else {
    alert("Please enter a valid URL.");
  }
});
