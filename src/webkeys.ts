import { addStyle } from "./html";
import { getInput, hideInput, showInput } from "./input";
import { closePopups, showPopups } from "./popup";

addStyle();

window.addEventListener("keydown", (e) => {
  if (e.key !== ":") {
    return;
  }

  console.log("open popups");
  e.preventDefault();
  e.stopImmediatePropagation();

  showPopups();
  showInput();
  getInput().focus();
});

window.addEventListener(
  "scroll",
  () => {
    closePopups();
    hideInput();
  },
  { passive: true }
);
