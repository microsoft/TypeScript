//// [tests/cases/compiler/declarationEmitTypeAliasWithTypeParameters1.ts] ////

//// [declarationEmitTypeAliasWithTypeParameters1.ts]
export type Bar<X, Y> = () => [X, Y];
export type Foo<Y> = Bar<any, Y>;
export const y = (x: Foo<string>) => 1

//// [declarationEmitTypeAliasWithTypeParameters1.js]
export const y = (x) => 1;


//// [declarationEmitTypeAliasWithTypeParameters1.d.ts]
export type Bar<X, Y> = () => [X, Y];
export type Foo<Y> = Bar<any, Y>;
export declare const y: (x: Foo<string>) => number;
