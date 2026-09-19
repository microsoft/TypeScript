// @lib: dom,es2015
// @noImplicitAny: true

declare const el: HTMLElement;

const value = getComputedStyle(el)["background-color"];
el.style["background-color"] = "red";
