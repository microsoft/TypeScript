//// [tests/cases/compiler/jsDeclarationEmitExportedClassWithExtends.ts] ////

//// [package.json]
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
//// [index.d.ts]
export * from "lit-element/lit-element.js";
//// [package.json]
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
//// [index.d.ts]
export * from "./lit-element.js";
//// [lit-element.d.ts]
export class LitElement {}
//// [package.json]
{
    "type": "module",
    "private": true
}
//// [index.js]
import { LitElement, LitElement as LitElement2 } from "lit";
export class ElementB extends LitElement {}
export class ElementC extends LitElement2 {}

//// [index.js]
import { LitElement, LitElement as LitElement2 } from "lit";
export class ElementB extends LitElement {
}
export class ElementC extends LitElement2 {
}


//// [index.d.ts]
import { LitElement, LitElement as LitElement2 } from "lit";
export declare class ElementB extends LitElement {
}
export declare class ElementC extends LitElement2 {
}
