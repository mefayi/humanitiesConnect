const axios = require("axios");

module.exports = {
  name: "Axios HEAD Checker",
  description: "Checks if a project is online using an Axios HEAD request.",
  checkOnlineStatus: async function (link) {
    try {
      const response = await axios.head(link, { timeout: 5000 });
      return response.status >= 200 && response.status < 400;
    } catch (error) {
      return false;
    }
  },
};
