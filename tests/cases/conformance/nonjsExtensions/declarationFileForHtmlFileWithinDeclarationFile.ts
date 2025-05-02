// @lib: es2020,dom
// @target: es2020
// @filename: component.d.html.ts

// html modules were proposed at https://github.com/WICG/webcomponents/blob/gh-pages/proposals/html-modules-explainer.md

// per proposal, `default` is user-defined, but if not present, will be the document of the imported module
declare var doc: Document;
export default doc;

// all other exports are just whatever was exported in module script blocks in the html file
export const blogPost: Element;

export class HTML5Element extends HTMLElement {
    connectedCallback(): void;
}

// @filename: file.d.ts
export * as mod from "./component.html";

// @filename: main.ts
import { mod } from "./file.js";

window.customElements.define("my-html5-element", mod.HTML5Element);

if (document !== mod.default) {
    document.body.appendChild(mod.blogPost);
}