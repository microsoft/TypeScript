//// [tests/cases/compiler/declarationEmitExportAssignedNamespaceNoTripleSlashTypesReference.ts] ////

//// [index.d.ts]
export = React;

declare namespace React {
    export type Component<T = any, U = {}, V = {}> = { x: T, y: U, z: V };
    export interface DOMAttributes<T> { }
}
//// [index.d.ts]
import {
    Component
} from 'react'
export {};

declare module 'react' {
    interface DOMAttributes<T> {
        css?: any
    }
}

//// [get-comp.ts]
import {Component} from 'react';

export function getComp(): Component {
    return {} as any as Component
}
//// [inferred-comp-export.ts]
import { getComp } from "./get-comp";

// this shouldn't need any triple-slash references - it should have a direct import to `react` and that's it
// This issue (#35343) _only_ reproduces in the test harness when the file in question is in a subfolder
export const obj = {
    comp: getComp()
}
//// [some-other-file.ts]
export * from '@emotion/core';


//// [get-comp.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComp = getComp;
function getComp() {
    return {};
}
//// [inferred-comp-export.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obj = void 0;
var get_comp_1 = require("./get-comp");
// this shouldn't need any triple-slash references - it should have a direct import to `react` and that's it
// This issue (#35343) _only_ reproduces in the test harness when the file in question is in a subfolder
exports.obj = {
    comp: (0, get_comp_1.getComp)()
};
//// [some-other-file.js]
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("@emotion/core"), exports);


//// [get-comp.d.ts]
import { Component } from 'react';
export declare function getComp(): Component;
//// [inferred-comp-export.d.ts]
export declare const obj: {
    comp: import("react").Component;
};
//// [some-other-file.d.ts]
export * from '@emotion/core';
