//// [tests/cases/compiler/intersectionsOfLargeUnions2.ts] ////

//// [intersectionsOfLargeUnions2.ts]
// Repro from #24233

declare global {
    interface ElementTagNameMap {
        [index: number]: HTMLElement
    }

    interface HTMLElement {
        [index: number]: HTMLElement;
    }
}

export function assertIsElement(node: Node | null): node is Element {
    let nodeType = node === null ? null : node.nodeType;
    return nodeType === 1;
}
  
export function assertNodeTagName<
    T extends keyof ElementTagNameMap,
    U extends ElementTagNameMap[T]>(node: Node | null, tagName: T): node is U {
    if (assertIsElement(node)) {
        const nodeTagName = node.tagName.toLowerCase();
         return nodeTagName === tagName;
    }
    return false;
}
  
export function assertNodeProperty<
    T extends keyof ElementTagNameMap,
    P extends keyof ElementTagNameMap[T],
    V extends HTMLElementTagNameMap[T][P]>(node: Node | null, tagName: T, prop: P, value: V) {
    if (assertNodeTagName(node, tagName)) {
        node[prop];
    }
}


//// [intersectionsOfLargeUnions2.js]
"use strict";
// Repro from #24233
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertIsElement = assertIsElement;
exports.assertNodeTagName = assertNodeTagName;
exports.assertNodeProperty = assertNodeProperty;
function assertIsElement(node) {
    var nodeType = node === null ? null : node.nodeType;
    return nodeType === 1;
}
function assertNodeTagName(node, tagName) {
    if (assertIsElement(node)) {
        var nodeTagName = node.tagName.toLowerCase();
        return nodeTagName === tagName;
    }
    return false;
}
function assertNodeProperty(node, tagName, prop, value) {
    if (assertNodeTagName(node, tagName)) {
        node[prop];
    }
}
