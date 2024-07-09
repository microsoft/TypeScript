// @target: ES5
// @declaration: true
// @removeComments: false
// @module: commonjs

// @Filename: declFileIndexSignatures_0.ts
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

// @Filename: declFileIndexSignatures_1.ts
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