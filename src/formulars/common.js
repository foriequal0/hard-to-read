/**
 * @param {Element} node
 * @param {Function} filter
 */
export function textContent(node, filter) {
    function go(n) {
        if (!filter(n)) {
            return "";
        } else if (n.childNodes.length == 0) {
            return n.textContent;
        }

        const texts = [];
        for (var child of n.childNodes) {
            texts.push(go(child));
        }

        return texts.join("");
    }

    return go(node, filter);
}