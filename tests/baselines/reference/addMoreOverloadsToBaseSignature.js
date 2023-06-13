//// [tests/cases/compiler/addMoreOverloadsToBaseSignature.ts] ////

//// [addMoreOverloadsToBaseSignature.ts]
interface Foo {
    f(): string;
}

interface Bar extends Foo {
    f(key: string): string;
}


//// [addMoreOverloadsToBaseSignature.js]
