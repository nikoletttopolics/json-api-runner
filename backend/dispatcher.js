const userService = require("./apis/userService");
const imageService = require("./apis/imageService");
const mathService = require("./apis/mathService");

const dispatch = async (requests) => {
  const userServicePayload = [];
  const imageServicePayload = [];
  const mathServicePayload = [];
  const result = [];

  for (let i = 0; i < requests.length; i++) {
    if (requests[i].service === "userService") {
      userServicePayload.push(requests[i]);
    } else if (requests[i].service === "imageService") {
      imageServicePayload.push(requests[i]);
    } else if (requests[i].service === "mathService") {
      mathServicePayload.push(requests[i]);
    } else {
      result.push({ error: "Unknown service: " + requests[i].service });
    }
  }

  // TODO: ha az adott payload ures, ne legyen service hivas
  return Promise.all([
    userService(userServicePayload),
    imageService(imageServicePayload),
    mathService(mathServicePayload),
  ]).then((values) => {
    console.log(JSON.stringify(values));
    const mergedResults = values.concat(result);
    return mergedResults.flat();
  });
};

module.exports = dispatch;
