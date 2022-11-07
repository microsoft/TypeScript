//// [genericStringMappingInIndexedAccessKeyConstraint.ts]
export function childByTag<K extends Uppercase<keyof HTMLElementTagNameMap>>(
    element: Element,
    tagName: K,
): HTMLElementTagNameMap[Lowercase<K>] | null; // this overload is rejected
export function childByTag(element: Element, tagName: string): Element | null;
export function childByTag(element: Element, tagName: string): Element | null {
    for (let i = 0; i < element.childElementCount; i++) {
        if (element.children[i].nodeName === tagName) {
            return element.children[i];
        }
    }

    return null;
}

const anchor = childByTag(document.documentElement, 'A');
if (anchor) {
    console.log(anchor.href); // Would be rejected without the first overload.
};

//// [genericStringMappingInIndexedAccessKeyConstraint.js]
"use strict";
exports.__esModule = true;
exports.childByTag = void 0;
function childByTag(element, tagName) {
    for (var i = 0; i < element.childElementCount; i++) {
        if (element.children[i].nodeName === tagName) {
            return element.children[i];
        }
    }
    return null;
}
exports.childByTag = childByTag;
var anchor = childByTag(document.documentElement, 'A');
if (anchor) {
    console.log(anchor.href); // Would be rejected without the first overload.
}
;
