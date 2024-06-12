const axios = require("axios");

module.exports = {
  name: "Axios GET Checker",
  description: "Checks if a project is online using an Axios GET request.",
  checkOnlineStatus: async function (link) {
    try {
      const response = await axios.get(link, { timeout: 5000 });
      return response.status >= 200 && response.status < 400;
    } catch (error) {
      return false;
    }
  },
};
