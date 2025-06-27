const log = require("../logger");

const mathService = async (payload) => {
  const result = [];

  for (let i = 0; i < payload.length; i++) {
    if (payload[i].endpoint === "getFibonacci") {
      result.push(getFibonacci(payload[i].params.n));
    } else {
      result.push({ error: "Unknown endpoint: " + payload[i].endpoint });
      log(`Unknown endpoint: ${payload[i].endpoint}`, "mathService", "error");
    }
  }
  return result;
};

const getFibonacci = (n) => {
  if (isNaN(Number(n)) || n < 1) {
    return {
      getFibonacciError: `The provided parameter "${n}" is not a valid positive number`,
    };
  }

  let num1 = 0;
  let num2 = 1;
  const result = [num1];

  for (let i = 1; i < n; i++) {
    result.push(num2);
    let temp = num1;
    num1 = num2;
    num2 = temp + num2;
  }

  return {
    getFibonacciResponse: `The first ${n} fibonacci numbers are: ${result}`,
  };
};

module.exports = mathService;
