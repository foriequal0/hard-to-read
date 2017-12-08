'use strict'
import sweep_and_watch from "./sweep.js"
import dummy_formular from "./formulars/dummy.js"
import Tooltip from "tooltip.js"
 
var converted = new WeakSet();
/**
 * @param {Element} root
 * @param {Function} method 
 */
function attach_level(root, method) {
    if (root.nodeType !== 1 || root.nodeName !== "P" || converted.has(root))
        return;

    const level = method(root.textContent);
    if (level == null)
        return;

    const div = document.createElement("div");
    div.innerText = "level: " + level;
    Object.assign(div.style, {
        "opacity": 1,
        "padding": "0em 0.5em",
        "box-shadow": "0px 0px 5px 5px gray",
        "color": "white",
        "background-color": "gray"
    });

    const tooltip = new Tooltip(root, {
        placement: 'top-start',
        html: true, 
        title: div,
    });

    converted.add(root);
}

sweep_and_watch((root) => attach_level(root, dummy_formular));
