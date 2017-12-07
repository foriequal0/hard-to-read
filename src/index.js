'use strict'
import sweep_and_watch from "./sweep.js"
import dummy_formular from "./formulars/dummy.js"

var converted = new WeakSet();
function attach_level(root, method) {
    if (root.nodeType !== 1 || root.nodeName !== "P" || converted.has(root))
        return;

    const level = method(root.textContent);
    if (level == null)
        return;

    const title = root.getAttribute("title");
    if (title == null || /^\s*$/.test(str)) {
        root.setAttribute("title", "level: " + level);
    } else {
        root.setAttribute("title", "level: " + level + "\n" + title);
    }

    converted.add(root);
}

sweep_and_watch((root) => attach_level(root, dummy_formular));
