const container = document.querySelector(".container");
const actionBar = document.querySelector(".action-bar");
const apiSelector = document.querySelector(".api-selector");
const themeButton = document.getElementById("theme-button");
const alignButton = document.getElementById("align-button");
const runButton = document.getElementById("run-button");
const textarea = document.getElementById("textarea");
const preWrapper = document.querySelector(".pre-wrapper");
const result = document.getElementById("result");

runButton.disabled = true;

let isDark = false;

themeButton.addEventListener("click", () => {
  isDark = !isDark;

  if (isDark) {
    document.body.classList.add("body-dark");
    container.classList.add("container-dark");
    apiSelector.classList.add("api-selector-dark");
    textarea.classList.add("textarea-dark");
    themeButton.classList.add("theme-button-dark");
    alignButton.classList.add("align-button-dark");
    runButton.classList.add("run-button-dark");
    preWrapper.classList.add("pre-wrapper-dark");
    themeButton.innerText = "Toggle Light Theme";
  } else {
    document.body.classList.remove("body-dark");
    container.classList.remove("container-dark");
    apiSelector.classList.remove("api-selector-dark");
    textarea.classList.remove("textarea-dark");
    themeButton.classList.remove("theme-button-dark");
    alignButton.classList.remove("align-button-dark");
    runButton.classList.remove("run-button-dark");
    preWrapper.classList.remove("pre-wrapper-dark");
    themeButton.innerText = "Toggle Dark Theme";
  }

  //   document.body.classList.toggle("body-dark", isDark);
});

let isAlignToRight = false;

alignButton.addEventListener("click", () => {
  isAlignToRight = !isAlignToRight;

  if (isAlignToRight) {
    alignButton.innerText = "Align Left";
    actionBar.classList.add("action-bar-right-alignment");
  } else {
    alignButton.innerText = "Align Right";
    actionBar.classList.remove("action-bar-right-alignment");
  }
});

let selectedApis = [];

apiSelector.addEventListener("change", () => {
  if (textarea.value) {
    try {
      selectedApis = JSON.parse(textarea.value);
    } catch {
      alert("Wrong JSON format");
    }
  }

  const selectedValue = apiSelector.value;
  const alreadyExists = selectedApis.some(
    (api) => api.endpoint === selectedValue
  );

  if (alreadyExists) {
    return;
  }

  switch (selectedValue) {
    case "getUserProfile":
      selectedApis.push({
        service: "userService",
        endpoint: selectedValue,
        params: { userId: 1 },
      });
      break;
    case "getUserProfiles":
      selectedApis.push({
        service: "userService",
        endpoint: selectedValue,
      });
      break;
    case "deleteUserProfile":
      selectedApis.push({
        service: "userService",
        endpoint: selectedValue,
        params: { userId: 2 },
      });
      break;
    case "getImage":
      selectedApis.push({
        service: "imageService",
        endpoint: selectedValue,
        params: { id: 1 },
      });
      break;
    case "getImages":
      selectedApis.push({
        service: "imageService",
        endpoint: selectedValue,
      });
      break;
    case "deleteImage":
      selectedApis.push({
        service: "imageService",
        endpoint: selectedValue,
        params: { id: 2 },
      });
      break;
    case "getFibonacci":
      selectedApis.push({
        service: "mathService",
        endpoint: selectedValue,
        params: { n: 10 },
      });
      break;
    default:
      break;
  }
  textarea.value = JSON.stringify(selectedApis, null, 2);
  runButton.disabled = false;
});

textarea.addEventListener("input", () => {
  if (textarea.value.trim().length === 0) {
    // ha a textarea tartalma torlodik akkor a selectedapis is uruljon
    selectedApis = [];
    runButton.disabled = true;
  } else {
    runButton.disabled = false;
  }
});

runButton.addEventListener("click", async () => {
  try {
    // ha sikerul a parse, a json valid
    JSON.parse(textarea.value);

    const response = await fetch("/dispatch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: textarea.value,
    });

    const data = await response.json();

    result.textContent = JSON.stringify(data, null, 2);
    Prism.highlightElement(result);
  } catch {
    alert("Wrong JSON format");
  }
});
