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
exports.__esModule = true;


//// [mutuallyRecursiveInterfaceDeclaration.d.ts]
interface A {
    b: B;
}
interface B {
    a: A;
}
export { A, B };
