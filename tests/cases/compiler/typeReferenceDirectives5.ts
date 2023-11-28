// @noImplicitReferences: true
// @traceResolution: true
// @declaration: true
// @isolatedDeclarationDiffReason: TSC removes type only import. DTE can't know import is type only.
// @typeRoots: /types
// @currentDirectory: /

// @filename: /ref.d.ts
export interface $ { x }

// @filename: /types/lib/index.d.ts
declare let $: { x: number }

// @filename: /app.ts
/// <reference types="lib"/>
import {$} from "./ref";
export interface A {
    x: typeof $;
}