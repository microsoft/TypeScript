//// [tests/cases/compiler/declFileIndexSignatures.ts] ////

//// [declFileIndexSignatures_0.ts]
export interface IStringIndexSignature {
    [s: string]: string;
}
export interface INumberIndexSignature {
    [n: number]: number;
}

export interface IBothIndexSignature {
    [s: string]: any;
    [n: number]: number;
}

export interface IIndexSignatureWithTypeParameter<T> {
    [a: string]: T;
}

//// [declFileIndexSignatures_1.ts]
interface IGlobalStringIndexSignature {
    [s: string]: string;
}
interface IGlobalNumberIndexSignature {
    [n: number]: number;
}

interface IGlobalBothIndexSignature {
    [s: string]: any;
    [n: number]: number;
}

interface IGlobalIndexSignatureWithTypeParameter<T> {
    [a: string]: T;
}

//// [declFileIndexSignatures_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [declFileIndexSignatures_1.js]


//// [declFileIndexSignatures_0.d.ts]
export interface IStringIndexSignature {
    [s: string]: string;
}
export interface INumberIndexSignature {
    [n: number]: number;
}
export interface IBothIndexSignature {
    [s: string]: any;
    [n: number]: number;
}
export interface IIndexSignatureWithTypeParameter<T> {
    [a: string]: T;
}
//// [declFileIndexSignatures_1.d.ts]
interface IGlobalStringIndexSignature {
    [s: string]: string;
}
interface IGlobalNumberIndexSignature {
    [n: number]: number;
}
interface IGlobalBothIndexSignature {
    [s: string]: any;
    [n: number]: number;
}
interface IGlobalIndexSignatureWithTypeParameter<T> {
    [a: string]: T;
}
