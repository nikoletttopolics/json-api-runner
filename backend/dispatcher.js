const userService = require("./apis/userService");
const imageService = require("./apis/imageService");
const mathService = require("./apis/mathService");
const log = require("./logger");

const dispatch = async (requests) => {
  const userServicePayload = [];
  const imageServicePayload = [];
  const mathServicePayload = [];
  const result = [];
  const promises = [];

  log(
    `API dispatch called with request payload: ${JSON.stringify(requests)}`,
    "dispatcher"
  );

  for (let i = 0; i < requests.length; i++) {
    if (requests[i].service === "userService") {
      userServicePayload.push(requests[i]);
    } else if (requests[i].service === "imageService") {
      imageServicePayload.push(requests[i]);
    } else if (requests[i].service === "mathService") {
      mathServicePayload.push(requests[i]);
    } else {
      result.push({ error: "Unknown service: " + requests[i].service });
      log(`Unknown service: ${requests[i].service}`, "dispatcher", "error");
    }
  }

  if (userServicePayload.length) {
    promises.push(userService(userServicePayload));
  }
  if (imageServicePayload.length) {
    promises.push(imageService(imageServicePayload));
  }
  if (mathServicePayload.length) {
    promises.push(mathService(mathServicePayload));
  }

  return Promise.all(promises)
    .then((values) => {
      const mergedResults = values.concat(result);
      log(
        `API dispatch result: ${JSON.stringify(mergedResults.flat())}`,
        "dispatcher"
      );

      return mergedResults.flat();
    })
    .catch((error) => {
      log(
        `API dispatch error: ${JSON.stringify(error)}`,
        "dispatcher",
        "error"
      );

      throw error;
    });
};

module.exports = dispatch;
