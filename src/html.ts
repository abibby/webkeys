import { escapeHTMLPolicy } from "./escape";

export function addStyle() {
  let styles = document.getElementById("webkeys-styles");
  if (styles == null) {
    styles = document.createElement("style");
    styles.id = "webkeys-styles";
    document.head.appendChild(styles);
  }
  styles.innerHTML = escapeHTMLPolicy.createHTML(`
        .webkeys-popups {
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
            z-index: 1000000;
        }
        .webkeys-popup {
            position: absolute;
            z-index: 1000000;
            transform: translate(-50%, -50%);
            background: #dd0;
            line-height: 1;
            padding: 0px 2px;
            font-size: 12px;
        }
        .webkeys-input {
            box-sizing: border-box;
            position: fixed;
            bottom: 0;
            left: 0;
            z-index: 1000000;
            width: 100%;
            padding: 3px;
            padding-bottom: 30px;
            border-radius: 0;
            outline: none;
            border: none;
            border-top: solid 2px black;
        }
        .webkeys-input.hidden {
            display: none;
        }
        .webkeys-selected {
          outline: solid red 3px;
        }
    `);
}

let popupContainer: HTMLDivElement | null = null;
export function getPopupContainer() {
  if (popupContainer !== null) {
    return popupContainer;
  }
  const e = document.getElementById("webkeys-popups");
  if (e !== null && e instanceof HTMLDivElement) {
    popupContainer = e;
    return popupContainer;
  }

  popupContainer = document.createElement("div");
  popupContainer.id = "webkeys-popups";
  popupContainer.classList.add("webkeys-popups");
  document.body.appendChild(popupContainer);
  return popupContainer;
}
