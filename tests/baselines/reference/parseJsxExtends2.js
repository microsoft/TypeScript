//// [tests/cases/compiler/parseJsxExtends2.ts] ////

//// [index.tsx]
declare const React: any;

export function Foo() {
    // Error: T is not declared.
    return <T extends/>
}


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = Foo;
function Foo() {
    // Error: T is not declared.
    return React.createElement(T, { extends: true });
}
