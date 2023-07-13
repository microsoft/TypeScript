//// [tests/cases/compiler/parseJsxExtends1.ts] ////

//// [index.tsx]
declare const React: any;

export function Foo() {
    // No error; "const" is lowercase and therefore intrinsic.
    return <const T extends/>
}


//// [index.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Foo = void 0;
function Foo() {
    // No error; "const" is lowercase and therefore intrinsic.
    return React.createElement("const", { T: true, extends: true });
}
exports.Foo = Foo;
