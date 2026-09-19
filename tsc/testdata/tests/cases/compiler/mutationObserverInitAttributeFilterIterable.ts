// @target: esnext
// @lib: dom,esnext

const names = new Set<string>();

const options1: MutationObserverInit = { attributeFilter: names.keys() };
const options2: MutationObserverInit = { attributeFilter: ["foo", "bar"] };
const options3: MutationObserverInit = { attributeFilter: names };
