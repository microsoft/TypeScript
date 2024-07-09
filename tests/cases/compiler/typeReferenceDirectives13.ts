// @noImplicitReferences: true
// @declaration: true
// @typeRoots: /types
// @traceResolution: true
// @currentDirectory: /

// @filename: /ref.d.ts
export interface $ { x }

// @filename: /types/lib/index.d.ts
declare let $: { x: number }

// @filename: /app.ts
/// <reference types="lib"/>
import {$} from "./ref";
export interface A {
    x: () => typeof $
}
