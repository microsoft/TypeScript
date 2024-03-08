// @checkJs: true
// @outDir: out
// @declaration: true
// @module: esnext
// @moduleResolution: nodenext
// @filename: node_modules/lit/package.json
{
    "name": "lit",
    "version": "0.0.1",
    "type": "module",
    "exports": {
      ".": {
        "types": "./development/index.d.ts"
      }
    }
}
// @filename: node_modules/lit/development/index.d.ts
export * from "lit-element/lit-element.js";
// @filename: node_modules/lit-element/package.json
{
    "name": "lit-element",
    "version": "0.0.1",
    "type": "module",
    "exports": {
      ".": {
        "types": "./development/index.d.ts"
      },
      "./lit-element.js": {
        "types": "./development/lit-element.d.ts"
      }
    }
}
// @filename: node_modules/lit-element/development/index.d.ts
export * from "./lit-element.js";
// @filename: node_modules/lit-element/development//lit-element.d.ts
export class LitElement {}
// @filename: package.json
{
    "type": "module",
    "private": true
}
// @filename: index.js
import { LitElement, LitElement as LitElement2 } from "lit";
export class ElementB extends LitElement {}
export class ElementC extends LitElement2 {}