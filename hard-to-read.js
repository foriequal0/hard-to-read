'use strict'

function traverse(root, callback) {
    for (var child of root.childNodes || []) {
        traverse(child, callback);
    }
    callback(root);
}

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

function traverse_with(root, method) {
    traverse(root, (r) => attach_level(r, method));
}

function test_fomular(text) {
    return null;
}

traverse_with(document.body, test_fomular);

var observer = new MutationObserver(function (changes) {
    for (var change of changes) {
        traverse_with(change.target, test_fomular);
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});