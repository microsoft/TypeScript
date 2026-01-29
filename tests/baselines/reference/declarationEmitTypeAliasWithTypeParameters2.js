//// [tests/cases/compiler/declarationEmitTypeAliasWithTypeParameters2.ts] ////

//// [declarationEmitTypeAliasWithTypeParameters2.ts]
export type Bar<X, Y, Z> = () => [X, Y, Z];
export type Baz<M, N> = Bar<M, string, N>;
export type Baa<Y> = Baz<boolean, Y>;
export const y = (x: Baa<number>) => 1

//// [declarationEmitTypeAliasWithTypeParameters2.js]
export const y = (x) => 1;


//// [declarationEmitTypeAliasWithTypeParameters2.d.ts]
export type Bar<X, Y, Z> = () => [X, Y, Z];
export type Baz<M, N> = Bar<M, string, N>;
export type Baa<Y> = Baz<boolean, Y>;
export declare const y: (x: Baa<number>) => number;
