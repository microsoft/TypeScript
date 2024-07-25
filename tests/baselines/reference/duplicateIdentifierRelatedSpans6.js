//// [tests/cases/compiler/duplicateIdentifierRelatedSpans6.ts] ////

//// [file1.ts]
declare module "someMod" {
    export interface TopLevel {
        duplicate1: () => string;
        duplicate2: () => string;
        duplicate3: () => string;
    }
}
//// [file2.ts]
/// <reference path="./file1" />

declare module "someMod" {
    export interface TopLevel {
        duplicate1(): number;
        duplicate2(): number;
        duplicate3(): number;
    }
}
export {};


//// [file1.js]
//// [file2.js]
"use strict";
/// <reference path="./file1" />
Object.defineProperty(exports, "__esModule", { value: true });
