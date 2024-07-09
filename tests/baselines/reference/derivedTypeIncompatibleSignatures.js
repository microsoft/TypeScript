//// [tests/cases/compiler/derivedTypeIncompatibleSignatures.ts] ////

//// [derivedTypeIncompatibleSignatures.ts]
interface A {
    (a: string): string;
}

interface B extends A {
    (a: string): number; // Number is not a subtype of string.  Should error.
}

interface C {
    new (a: string): string;
}

interface D extends C {
    new (a: string): number; // Number is not a subtype of string.  Should error.
}

interface E {
    [a: string]: string;
}

interface F extends E {
    [a: string]: number; // Number is not a subtype of string.  Should error.
}

interface G {
    [a: number]: string;
}

interface H extends G {
    [a: number]: number; // Should error for the same reason
}

//// [derivedTypeIncompatibleSignatures.js]
