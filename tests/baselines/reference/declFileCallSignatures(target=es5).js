//// [tests/cases/compiler/declFileCallSignatures.ts] ////

//// [declFileCallSignatures_0.ts]
export interface ICallSignature {
    /** This comment should appear for foo*/
    (): string;
}

export interface ICallSignatureWithParameters {
    /** This is comment for function signature*/
    (/** this is comment about a*/a: string,
        /** this is comment for b*/
        b: number): void;
}

export interface ICallSignatureWithRestParameters {
    (a: string, ...rests: string[]): string;
}

export interface ICallSignatureWithOverloads {
    (a: string): string;
    (a: number): number;
}

export interface ICallSignatureWithTypeParameters<T> {
    /** This comment should appear for foo*/
    (a: T): string;
}

export interface ICallSignatureWithOwnTypeParametes {
    <T extends ICallSignature>(a: T): string;
}

//// [declFileCallSignatures_1.ts]
interface IGlobalCallSignature {
    /** This comment should appear for foo*/
    (): string;
}

interface IGlobalCallSignatureWithParameters {
    /** This is comment for function signature*/
    (/** this is comment about a*/a: string,
        /** this is comment for b*/
        b: number): void;
}

interface IGlobalCallSignatureWithRestParameters {

    (a: string, ...rests: string[]): string;

}

interface IGlobalCallSignatureWithOverloads {
    (a: string): string;
    (a: number): number;
}

interface IGlobalCallSignatureWithTypeParameters<T> {
    /** This comment should appear for foo*/
    (a: T): string;
}

interface IGlobalCallSignatureWithOwnTypeParametes {
    <T extends IGlobalCallSignature>(a: T): string;
}

//// [declFileCallSignatures_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//// [declFileCallSignatures_1.js]


//// [declFileCallSignatures_0.d.ts]
export interface ICallSignature {
    /** This comment should appear for foo*/
    (): string;
}
export interface ICallSignatureWithParameters {
    /** This is comment for function signature*/
    (/** this is comment about a*/ a: string, 
    /** this is comment for b*/
    b: number): void;
}
export interface ICallSignatureWithRestParameters {
    (a: string, ...rests: string[]): string;
}
export interface ICallSignatureWithOverloads {
    (a: string): string;
    (a: number): number;
}
export interface ICallSignatureWithTypeParameters<T> {
    /** This comment should appear for foo*/
    (a: T): string;
}
export interface ICallSignatureWithOwnTypeParametes {
    <T extends ICallSignature>(a: T): string;
}
//// [declFileCallSignatures_1.d.ts]
interface IGlobalCallSignature {
    /** This comment should appear for foo*/
    (): string;
}
interface IGlobalCallSignatureWithParameters {
    /** This is comment for function signature*/
    (/** this is comment about a*/ a: string, 
    /** this is comment for b*/
    b: number): void;
}
interface IGlobalCallSignatureWithRestParameters {
    (a: string, ...rests: string[]): string;
}
interface IGlobalCallSignatureWithOverloads {
    (a: string): string;
    (a: number): number;
}
interface IGlobalCallSignatureWithTypeParameters<T> {
    /** This comment should appear for foo*/
    (a: T): string;
}
interface IGlobalCallSignatureWithOwnTypeParametes {
    <T extends IGlobalCallSignature>(a: T): string;
}
