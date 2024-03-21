import { escapeHTMLPolicy, getPopupContainer } from "./html";
import { getName } from "./utils";

const interactableElementTypes = [
  "a",
  "button",
  "details",
  "input",
  "select",
  "textarea",
] as const;

let isOpen = false;
export const openPopups = new Map<string, HTMLElement>();

export function closePopups() {
  if (!isOpen) {
    return;
  }
  isOpen = false;
  const popups = getPopupContainer();
  popups.innerHTML = escapeHTMLPolicy.createHTML("");
}

export function showPopups() {
  closePopups();
  isOpen = true;
  const interactableElements = Array.from(
    document.querySelectorAll(interactableElementTypes.join(","))
  )
    .filter(isHTMLElement)
    .filter(isVisible);

  console.log(interactableElements);

  openPopups.clear();
  const popupElements = [];
  let i = 0;
  const nameLength = getName(interactableElements.length).length;
  console.log(nameLength);
  for (const e of interactableElements) {
    const rect = e.getBoundingClientRect();
    const name = getName(i, nameLength);

    const popup = document.createElement("div");
    popup.classList.add("webkeys-popup");
    popup.style.top = rect.top + "px";
    popup.style.left = rect.right + "px";
    popup.innerText = name;
    popup.addEventListener("click", () => console.log(e));
    popupElements.push(popup);
    openPopups.set(name, e);
    i++;
  }

  let popups = getPopupContainer();
  for (const e of popupElements) {
    popups.appendChild(e);
  }
}

function isHTMLElement(e: Element): e is HTMLElement {
  return e instanceof HTMLElement;
}

function isVisible(e: HTMLElement): boolean {
  if (e.offsetHeight == 0 || e.offsetWidth == 0) {
    return false;
  }

  let vw = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  let vh = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );
  const rect = e.getBoundingClientRect();

  return (
    rect.height > 0 &&
    rect.width > 0 &&
    rect.top > 0 &&
    rect.bottom < vh &&
    rect.left > 0 &&
    rect.right < vw &&
    e.checkVisibility()
  );
}
