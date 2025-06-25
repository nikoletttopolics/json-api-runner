const userService = require("./apis/userService");

const dispatch = async (requests) => {
  const userServicePayload = [];
  const imageServicePayload = [];
  const mathServicePayload = [];
  const result = [];

  //   itt szedjük szét servicek szerint a requestet
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

  //   a promis allnak beadjuk a 3 servicet a hozzájuk tartozó payloaddal,
  //  a 3 service async, amit megvár a a promise all, amikor mindhárom returnöl
  //  akkor megfut a then
  return Promise.all([userService(userServicePayload)]).then((values) => {
    // console.log(JSON.stringify(values));
    const mergedResults = values.concat(result);
    return mergedResults.flat();
  });
};

module.exports = dispatch;
