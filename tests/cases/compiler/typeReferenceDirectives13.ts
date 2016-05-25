// @noImplicitReferences: true
// @declaration: true
// @typesRoot: /
// @traceResolution: true

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
