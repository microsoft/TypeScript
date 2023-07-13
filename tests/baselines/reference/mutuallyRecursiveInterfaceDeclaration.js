//// [tests/cases/compiler/mutuallyRecursiveInterfaceDeclaration.ts] ////

//// [mutuallyRecursiveInterfaceDeclaration.ts]
interface A {
    b: B
}

interface B {
    a: A
}
export {A, B}

//// [mutuallyRecursiveInterfaceDeclaration.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });


//// [mutuallyRecursiveInterfaceDeclaration.d.ts]
interface A {
    b: B;
}
interface B {
    a: A;
}
export { A, B };
