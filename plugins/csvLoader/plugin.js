// Initial log to confirm the script has loaded
console.log("plugin.js loaded");

// DOM elements
const fileInput = document.getElementById("csvFile");
const importButton = document.getElementById("importButton");

// Event listener for the import button
importButton.addEventListener("click", () => {
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = async function (event) {
      importButton.disabled = true; // Disable the button to prevent multiple clicks
      const csvData = event.target.result;
      const parsedData = parseCSV(csvData);

      try {
        const response = await window.api.pluginAddData(parsedData);
        alert(response.message); // Show success alert
        window.api.notifyMain(); // Notify main application about the update
        window.close(); // Close the plugin window
      } catch (error) {
        console.error("Error importing CSV:", error);
        alert("Error importing CSV: " + error.message);
      } finally {
        importButton.disabled = false; // Re-enable the button if an error occurs
      }
    };

    reader.readAsText(file);
  } else {
    alert("Please select a CSV file to import.");
  }
});

// Function to parse CSV data
function parseCSV(data) {
  const lines = data.split("\n");
  const result = [];
  const headers = lines[0].split(",").map((header) => header.trim());

  for (let i = 1; i < lines.length; i++) {
    const currentline = lines[i].split(",");
    const obj = {
      name: "",
      description: "",
      link: "",
    };

    for (let j = 0; j < headers.length; j++) {
      const header = headers[j];
      if (header === "name" || header === "description" || header === "link") {
        obj[header] = currentline[j].trim();
      }
    }

    // Add to result only if all required fields are present
    if (obj.name && obj.description && obj.link) {
      result.push(obj);
    }
  }

  return result;
}
