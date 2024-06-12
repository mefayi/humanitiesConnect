const { checkerName } = require("../csvLoader");

module.exports = {
  name: "digis Berlin Importer",
  description:
    "Fetches data from a provided URL and adds it to the JSON database.",
  start: "plugin.html",
  checkerName: "Axios GET Checker",
};
