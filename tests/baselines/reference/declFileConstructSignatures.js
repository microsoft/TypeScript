//// [tests/cases/compiler/declFileConstructSignatures.ts] ////

//// [declFileConstructSignatures_0.ts]
export interface IConstructSignature {
    /** This comment should appear for foo*/
    new (): string;
}

export interface IConstructSignatureWithParameters {
    /** This is comment for function signature*/
    new (/** this is comment about a*/a: string,
        /** this is comment for b*/
        b: number);
}

export interface IConstructSignatureWithRestParameters {
    new (a: string, ...rests: string[]): string;
}

export interface IConstructSignatureWithOverloads {
    new (a: string): string;
    new (a: number): number;
}

export interface IConstructSignatureWithTypeParameters<T> {
    /** This comment should appear for foo*/
    new (a: T): T;
}

export interface IConstructSignatureWithOwnTypeParametes {
    new <T extends IConstructSignature>(a: T): T;
}

//// [declFileConstructSignatures_1.ts]
interface IGlobalConstructSignature {
    /** This comment should appear for foo*/
    new (): string;
}

interface IGlobalConstructSignatureWithParameters {
    /** This is comment for function signature*/
    new (/** this is comment about a*/a: string,
        /** this is comment for b*/
        b: number);
}

interface IGlobalConstructSignatureWithRestParameters {

    new (a: string, ...rests: string[]): string;

}

interface IGlobalConstructSignatureWithOverloads {
    new (a: string): string;
    new (a: number): number;
}

interface IGlobalConstructSignatureWithTypeParameters<T> {
    /** This comment should appear for foo*/
    new (a: T): T;
}

interface IGlobalConstructSignatureWithOwnTypeParametes {
    new <T extends IGlobalConstructSignature>(a: T): T;
}

//// [declFileConstructSignatures_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [declFileConstructSignatures_1.js]


//// [declFileConstructSignatures_0.d.ts]
export interface IConstructSignature {
    /** This comment should appear for foo*/
    new (): string;
}
export interface IConstructSignatureWithParameters {
    /** This is comment for function signature*/
    new (/** this is comment about a*/ a: string, 
    /** this is comment for b*/
    b: number): any;
}
export interface IConstructSignatureWithRestParameters {
    new (a: string, ...rests: string[]): string;
}
export interface IConstructSignatureWithOverloads {
    new (a: string): string;
    new (a: number): number;
}
export interface IConstructSignatureWithTypeParameters<T> {
    /** This comment should appear for foo*/
    new (a: T): T;
}
export interface IConstructSignatureWithOwnTypeParametes {
    new <T extends IConstructSignature>(a: T): T;
}
//// [declFileConstructSignatures_1.d.ts]
interface IGlobalConstructSignature {
    /** This comment should appear for foo*/
    new (): string;
}
interface IGlobalConstructSignatureWithParameters {
    /** This is comment for function signature*/
    new (/** this is comment about a*/ a: string, 
    /** this is comment for b*/
    b: number): any;
}
interface IGlobalConstructSignatureWithRestParameters {
    new (a: string, ...rests: string[]): string;
}
interface IGlobalConstructSignatureWithOverloads {
    new (a: string): string;
    new (a: number): number;
}
interface IGlobalConstructSignatureWithTypeParameters<T> {
    /** This comment should appear for foo*/
    new (a: T): T;
}
interface IGlobalConstructSignatureWithOwnTypeParametes {
    new <T extends IGlobalConstructSignature>(a: T): T;
}
