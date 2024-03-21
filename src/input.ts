import { closePopups, openPopups } from "./popup";

let input: HTMLInputElement | null = null;
export function getInput() {
  if (input !== null) {
    return input;
  }
  const e = document.getElementById("webkeys-input");
  if (e !== null && e instanceof HTMLInputElement) {
    input = e;
    return input;
  }

  input = document.createElement("input");
  input.id = "webkeys-input";
  input.classList.add("webkeys-input");

  input.addEventListener("input", (event) => {
    const e = openPopups.get((event.target as HTMLInputElement).value);
    if (e === undefined) {
      return;
    }
    e.focus();
    e.classList.add("webkeys-selected");
    e.addEventListener("blur", () => e.classList.remove("webkeys-selected"), {
      once: true,
    });

    hideInput();
    closePopups();
  });
  input.addEventListener("keydown", (inputKeyEvent) => {
    if (inputKeyEvent.key !== "Escape") {
      return;
    }
    hideInput();
    closePopups();
  });
  input.addEventListener("blur", () => {
    hideInput();
    closePopups();
  });
  document.body.appendChild(input);
  return input;
}

export function hideInput() {
  const input = getInput();
  input.value = "";
  input.classList.add("hidden");
}
export function showInput() {
  const input = getInput();
  input.value = "";
  input.classList.remove("hidden");
}
