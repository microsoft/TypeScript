//// [tests/cases/compiler/declarationEmitTypeAliasWithTypeParameters1.ts] ////

//// [declarationEmitTypeAliasWithTypeParameters1.ts]
export type Bar<X, Y> = () => [X, Y];
export type Foo<Y> = Bar<any, Y>;
export const y = (x: Foo<string>) => 1

//// [declarationEmitTypeAliasWithTypeParameters1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.y = void 0;
var y = function (x) { return 1; };
exports.y = y;


//// [declarationEmitTypeAliasWithTypeParameters1.d.ts]
export type Bar<X, Y> = () => [X, Y];
export type Foo<Y> = Bar<any, Y>;
export declare const y: (x: Foo<string>) => number;
