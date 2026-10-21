//// [tests/cases/compiler/domIterableGenericDatasetKeys.ts] ////

//// [domIterableGenericDatasetKeys.ts]
function restore<Key extends keyof CSSStyleDeclaration>(key: Key, element: HTMLElement) {
    const value = element.dataset[key];
    delete element.dataset[key];
}


//// [domIterableGenericDatasetKeys.js]
"use strict";
function restore(key, element) {
    const value = element.dataset[key];
    delete element.dataset[key];
}
