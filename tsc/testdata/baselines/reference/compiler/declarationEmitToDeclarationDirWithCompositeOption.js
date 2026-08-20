//// [tests/cases/compiler/declarationEmitToDeclarationDirWithCompositeOption.ts] ////

//// [test.ts]
interface Foo {
    x: number;
}
export default Foo;


//// [test.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [test.d.ts]
interface Foo {
    x: number;
}
export default Foo;
