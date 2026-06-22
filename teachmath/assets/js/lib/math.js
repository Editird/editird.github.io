// @ts-expect-error KaTeX ships this browser ESM file without a matching local .d.ts.
import katex from "../vendor/katex/katex.mjs";
export function renderLatex(root = document) {
    renderDelimitedInlineLatex(root);
    root.querySelectorAll("[data-latex]").forEach((element) => {
        const expression = element.dataset.latex ?? "";
        try {
            katex.render(expression, element, {
                displayMode: element.dataset.latexDisplay === "true",
                output: "html",
                throwOnError: false,
                strict: "ignore"
            });
        }
        catch {
            element.textContent = expression;
        }
    });
}
function renderDelimitedInlineLatex(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            const text = node.textContent ?? "";
            const parent = node.parentElement;
            if (!text.includes("$") || !parent) {
                return NodeFilter.FILTER_REJECT;
            }
            if (parent.closest("[data-latex], .katex, script, style, textarea")) {
                return NodeFilter.FILTER_REJECT;
            }
            return /\$[^$\n]+\$/.test(text) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
    });
    const nodes = [];
    while (walker.nextNode()) {
        nodes.push(walker.currentNode);
    }
    nodes.forEach((node) => {
        const text = node.textContent ?? "";
        const fragment = document.createDocumentFragment();
        let cursor = 0;
        const pattern = /\$([^$\n]+)\$/g;
        let match;
        while ((match = pattern.exec(text))) {
            if (match.index > cursor) {
                fragment.append(text.slice(cursor, match.index));
            }
            const math = document.createElement("span");
            math.className = "math-inline";
            math.dataset.latex = match[1];
            fragment.append(math);
            cursor = match.index + match[0].length;
        }
        if (cursor < text.length) {
            fragment.append(text.slice(cursor));
        }
        node.replaceWith(fragment);
    });
}
export function escapeHtml(value) {
    return value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}
export function latexInline(expression, ariaLabel) {
    return `<span class="math-inline" data-latex="${escapeHtml(expression)}"${ariaLabel ? ` aria-label="${escapeHtml(ariaLabel)}"` : ""}></span>`;
}
export function latexBlock(expression, ariaLabel) {
    return `<span class="math-block" data-latex="${escapeHtml(expression)}" data-latex-display="true"${ariaLabel ? ` aria-label="${escapeHtml(ariaLabel)}"` : ""}></span>`;
}
