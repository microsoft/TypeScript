// @strict: true
// @target: es2015
// @lib: esnext, dom

function restore<Key extends keyof CSSStyleDeclaration>(key: Key, element: HTMLElement) {
    const value = element.dataset[key];
    delete element.dataset[key];
}
