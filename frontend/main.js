const themeButton = document.getElementById("theme-button");

let isDark = false;
themeButton.addEventListener("click", () => {
  isDark = !isDark;

  if (isDark) {
    document.body.classList.add("body-dark");
    themeButton.innerText = "Toggle Light Theme";
  } else {
    document.body.classList.remove("body-dark");
    themeButton.innerText = "Toggle Dark Theme";
  }

  //   document.body.classList.toggle("body-dark", isDark);
});
