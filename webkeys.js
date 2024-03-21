// ==UserScript==
// @name         Webkeys
// @namespace    https://github.com/abibby
// @version      2024-03-20
// @description  jump to interactive elements
// @author       Adam Bibby
// @match        *://*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// ==/UserScript==

//@ts-check
(() => {
    let isOpen = false
    let _popupContainer = null
    let _input = null
    let openPopups = null

    const interactableElementTypes = [
        "a",
        "button",
        "details",
        "input",
        "select",
        "textarea",
    ]

    const escapeHTMLPolicy = trustedTypes.createPolicy("forceInner", {
        createHTML: (to_escape) => to_escape
    })

    function showPopups() {
        closePopups()
        isOpen = true
        const interactableElements = Array.from(document.querySelectorAll(interactableElementTypes.join(',')))
            .filter(isHTMLElement)
            .filter(isVisible)

        console.log(interactableElements)

        openPopups = new Map()
        const popupElements = []
        let i = 0;
        const nameLength = getName(interactableElements.length).length
        console.log(nameLength);
        for (const e of interactableElements) {
            const rect = e.getBoundingClientRect()
            const name = getName(i, nameLength)

            const popup = document.createElement('div')
            popup.classList.add("webkeys-popup")
            popup.style.top = rect.top + "px"
            popup.style.left = rect.right + "px"
            popup.innerText = name
            popup.addEventListener("click", () => console.log(e))
            popupElements.push(popup)
            openPopups.set(name, e)
            i++
        }

        let popups = getPopupContainer()
        for (const e of popupElements) {
            popups.appendChild(e)
        }
    }

    /**
     * 
     * @param {HTMLElement} e 
     */
    function isVisible(e) {
        if (e.offsetHeight == 0 || e.offsetWidth == 0) {
            return false;
        }

        let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        let vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
        const rect = e.getBoundingClientRect()

        return rect.height > 0
            && rect.width > 0
            && rect.top > 0
            && rect.bottom < vh
            && rect.left > 0
            && rect.right < vw
            && e.checkVisibility();
    }

    /**
     * @param {Element} e 
     * @returns {e is HTMLElement}
     */
    function isHTMLElement(e) {
        return e instanceof HTMLElement
    }

    /**
     * 
     * @param {number} i
     * @param {number} len
     * @returns {string}
     */
    function getName(i, len = 0) {
        const a = "a".charCodeAt(0)
        const base = 26
        return i.toString(base)
            .split("")
            .map(c => String.fromCharCode(a + parseInt(c, base)))
            .join("")
            .padStart(len, "a")
    }

    function addStyle() {
        let styles = document.getElementById("webkeys-styles")
        if (styles == null) {
            styles = document.createElement("style")
            styles.id = "webkeys-styles"
            document.head.appendChild(styles)
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
                position: fixed;
                bottom: 0;
                left: 0;
                z-index: 1000000;
            }
            .webkeys-input.hidden {
                display: none;
            }
        `)
    }

    /**
     * @returns {HTMLDivElement}
     */
    function getPopupContainer() {
        if (_popupContainer !== null) {
            return _popupContainer
        }
        _popupContainer = document.getElementById("webkeys-popups")
        if (_popupContainer !== null) {
            return _popupContainer
        }

        _popupContainer = document.createElement("div")
        _popupContainer.id = "webkeys-popups"
        _popupContainer.classList.add("webkeys-popups")
        document.body.appendChild(_popupContainer)
        return _popupContainer
    }

    /**
     * @returns {HTMLInputElement}
     */
    function getInput() {
        if (_input !== null) {
            return _input
        }
        _input = document.getElementById("webkeys-input")
        if (_input !== null) {
            return _input
        }

        _input = document.createElement("input")
        _input.id = "webkeys-input"
        _input.classList.add("webkeys-input")

        _input.addEventListener('input', () => {
            if (openPopups == null) { return }
            const e = openPopups.get(_input.value)
            if (e === undefined) {
                return
            }
            e.focus()

            hideInput()
            closePopups()
        })
        _input.addEventListener('keydown', (inputKeyEvent) => {
            if (inputKeyEvent.key !== "Escape") { return }
            hideInput()
            closePopups()
        })
        _input.addEventListener('blur', () => {
            hideInput()
            closePopups()
        })
        document.body.appendChild(_input)
        return _input
    }

    function closePopups() {
        if (!isOpen) {
            return
        }
        isOpen = false
        const popups = getPopupContainer()
        popups.innerHTML = escapeHTMLPolicy.createHTML("")
    }

    function hideInput() {
        const input = getInput()
        input.value = ""
        input.classList.add("hidden")
    }
    function showInput() {
        const input = getInput()
        input.value = ""
        input.classList.remove("hidden")
    }

    window.addEventListener("keypress", e => {
        if (e.key !== ":") { return }

        console.log("open popups");
        e.preventDefault()
        e.stopImmediatePropagation()


        showPopups()
        showInput()
        getInput().focus()
    })

    window.addEventListener("scroll", () => {
        closePopups()
        hideInput()
    }, { passive: true })

    addStyle()

    console.log("webkeys running");
})()