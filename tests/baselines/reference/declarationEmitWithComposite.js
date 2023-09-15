//// [tests/cases/compiler/declarationEmitWithComposite.ts] ////

//// [test.ts]
interface Foo {
    x: number;
}
export default Foo;


//// [/foo/out/test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [/foo/out/test.d.ts]
interface Foo {
    x: number;
}
export default Foo;
