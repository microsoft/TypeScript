//// [recursiveTypeIdentity.ts]
interface A {
    <T extends A>(x: T): void;
}

interface B {
    <T extends B>(x: T): void;
}

interface C {
    (x: A): void;
    (x: B): void;
}

//// [recursiveTypeIdentity.js]
