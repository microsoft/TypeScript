//// [tests/cases/compiler/isolatedModulesExportImportUninstantiatedNamespace.ts] ////

//// [jsx.ts]
export namespace JSXInternal {
  export type HTMLAttributes = string
  export type ComponentChildren = string
}

//// [factory.ts]
import { JSXInternal } from "./jsx"

export import JSX = JSXInternal;

export function createElement<ElementType extends HTMLElement>(
  tagName: string,
  attributes: JSX.HTMLAttributes,
  ...children: JSX.ComponentChildren[]
): any {
  //...
}



//// [jsx.js]
export {};
//// [factory.js]
export function createElement(tagName, attributes) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    //...
}
