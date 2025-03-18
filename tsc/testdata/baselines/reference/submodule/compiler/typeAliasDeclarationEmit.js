//// [tests/cases/compiler/typeAliasDeclarationEmit.ts] ////

//// [typeAliasDeclarationEmit.ts]
export type callback<T> = () => T;

export type CallbackArray<T extends callback> = () => T;

//// [typeAliasDeclarationEmit.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
