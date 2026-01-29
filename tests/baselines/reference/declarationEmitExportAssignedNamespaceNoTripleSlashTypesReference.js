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
export function getComp() {
    return {};
}
//// [inferred-comp-export.js]
import { getComp } from "./get-comp";
// this shouldn't need any triple-slash references - it should have a direct import to `react` and that's it
// This issue (#35343) _only_ reproduces in the test harness when the file in question is in a subfolder
export const obj = {
    comp: getComp()
};
//// [some-other-file.js]
export * from '@emotion/core';


//// [get-comp.d.ts]
import { Component } from 'react';
export declare function getComp(): Component;
//// [inferred-comp-export.d.ts]
export declare const obj: {
    comp: import("react").Component;
};
//// [some-other-file.d.ts]
export * from '@emotion/core';
