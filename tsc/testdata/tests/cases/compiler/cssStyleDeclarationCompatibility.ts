// @strict: true
// @target: es2015
// @lib: es2015, dom, dom.iterable
// @noEmit: true

declare const element: HTMLElement;
const style: CSSStyleDeclaration = element.style;
[...element.style];
