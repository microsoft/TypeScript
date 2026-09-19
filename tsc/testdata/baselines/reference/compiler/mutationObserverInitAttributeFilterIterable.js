//// [tests/cases/compiler/mutationObserverInitAttributeFilterIterable.ts] ////

//// [mutationObserverInitAttributeFilterIterable.ts]
const names = new Set<string>();

const options1: MutationObserverInit = { attributeFilter: names.keys() };
const options2: MutationObserverInit = { attributeFilter: ["foo", "bar"] };
const options3: MutationObserverInit = { attributeFilter: names };


//// [mutationObserverInitAttributeFilterIterable.js]
"use strict";
const names = new Set();
const options1 = { attributeFilter: names.keys() };
const options2 = { attributeFilter: ["foo", "bar"] };
const options3 = { attributeFilter: names };
