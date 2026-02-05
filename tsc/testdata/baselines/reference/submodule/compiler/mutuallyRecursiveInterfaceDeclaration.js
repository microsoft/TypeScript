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
export {};


//// [mutuallyRecursiveInterfaceDeclaration.d.ts]
interface A {
    b: B;
}
interface B {
    a: A;
}
export { A, B };
