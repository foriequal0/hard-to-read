'use strict'

function traverse(root, callback) {
    for (var child of root.childNodes || []) {
        traverse(child, callback);
    }
    callback(root);
}

export function sweep(callback) {
    traverse(document.body, callback);
}

export default function sweep_and_watch(callback) {
    traverse(document.body, callback);

    var observer = new MutationObserver(function (changes) {
        for (var change of changes) {
            traverse(change.target, callback);
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}