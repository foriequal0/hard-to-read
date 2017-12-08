'use strict'
import sweep_and_watch from "./sweep.js"
import dummy_formular from "./formulars/dummy.js"

const tooltipAttribute = "tooltip-" + Math.floor((Math.random() * 1000000) + 1);

function append_rule(css) {
    var head = document.getElementsByTagName('head')[0]; 
    var newCss = document.createElement('style');
    newCss.type = "text/css"; 
    newCss.innerHTML = css; 
    head.appendChild(newCss); 
}

append_rule(`
*:hover > [${tooltipAttribute}] {
    position: relative;
    visibility: hidden;
}
*:hover > [${tooltipAttribute}]:before {
    position: absolute;
    visibility: visible;
    font-size: 1rem;
    content: attr(${tooltipAttribute});
    bottom: calc(100% + 1em);
    background-color: black;
    box-shadow: 0px 0px 3px 3px black;
    padding: 0px 0.5em;
    color: white;
    white-space: nowrap;
}`);

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
    
    const tooltipAnchor = document.createElement("span");
    tooltipAnchor.setAttribute(tooltipAttribute, "level: " + level);

    const already = root.querySelector(`[${tooltipAttribute}]`);
    if (already != null) {
        root.removeChild(already);
    }
    
    root.insertAdjacentElement('afterbegin', tooltipAnchor);
    converted.add(root);
}

sweep_and_watch((root) => attach_level(root, dummy_formular));
