//// [declarationEmitTypeAliasWithTypeParameters2.ts]
export type Bar<X, Y, Z> = () => [X, Y, Z];
export type Baz<M, N> = Bar<M, string, N>;
export type Baa<Y> = Baz<boolean, Y>;
export const y = (x: Baa<number>) => 1

//// [declarationEmitTypeAliasWithTypeParameters2.js]
"use strict";
exports.__esModule = true;
exports.y = void 0;
exports.y = function (x) { return 1; };


//// [declarationEmitTypeAliasWithTypeParameters2.d.ts]
export declare type Bar<X, Y, Z> = () => [X, Y, Z];
export declare type Baz<M, N> = Bar<M, string, N>;
export declare type Baa<Y> = Baz<boolean, Y>;
export declare const y: (x: Baa<number>) => number;
