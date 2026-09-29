//// [tests/cases/compiler/declarationEmitPrivateMethodSignatures.ts] ////

//// [a.ts]
interface A<T> { private a(): boolean {} }

interface B {
    /** Method documentation. */
    private a<T>(x: T): T;
    private b(x: string): string;
    private b(x: number): number;
    private c?(): boolean;
}

type C = {
    /** Method documentation. */
    private a(): boolean;
    private b(x: string): string;
    private b(x: number): number;
};


//// [a.js]
"use strict";
{ }


//// [a.d.ts]
interface A<T> {
    private a;
}
interface B {
    /** Method documentation. */
    private a;
    private b;
    private c;
}
type C = {
    /** Method documentation. */
    private a;
    private b;
};
