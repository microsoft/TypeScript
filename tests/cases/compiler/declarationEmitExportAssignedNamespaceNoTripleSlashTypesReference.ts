// @declaration: true
// @filename: node_modules/@types/react/index.d.ts
export = React;

declare namespace React {
    export type Component<T = any, U = {}, V = {}> = { x: T, y: U, z: V };
    export interface DOMAttributes<T> { }
}
// @filename: node_modules/@emotion/core/index.d.ts
import {
    Component
} from 'react'
export {};

declare module 'react' {
    interface DOMAttributes<T> {
        css?: any
    }
}

// @filename: src/get-comp.ts
import {Component} from 'react';

export function getComp(): Component {
    return {} as any as Component
}
// @filename: src/inferred-comp-export.ts
import { getComp } from "./get-comp";

// this shouldn't need any triple-slash references - it should have a direct import to `react` and that's it
// This issue (#35343) _only_ reproduces in the test harness when the file in question is in a subfolder
export const obj = {
    comp: getComp()
}
// @filename: src/some-other-file.ts
export * from '@emotion/core';
