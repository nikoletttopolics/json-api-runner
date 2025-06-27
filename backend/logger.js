const fs = require("fs");
const path = require("path");

const getTimestamp = () => {
  return new Date().toISOString();
};

const log = (message, location, type = "info") => {
  const logMessage = `[${getTimestamp()}] [${location.toUpperCase()}] [${type.toUpperCase()}] ${message}`;
  console.log(logMessage);

  fs.appendFileSync(path.join(__dirname, "app.log"), logMessage + "\n");
};

module.exports = log;
