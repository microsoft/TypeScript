//// [tests/cases/compiler/declarationEmitInaccessibleHeritageType.ts] ////

//// [interface.ts]
label: interface I {}
export interface J extends I {}

//// [implements.ts]
label: interface I {}
export class C implements I {}

//// [typeArgument.ts]
label: interface I {}
interface Base<T> {}
export interface J extends Base<I> {}


//// [interface.js]
label: ;
export {};
//// [implements.js]
label: ;
export class C {
}
//// [typeArgument.js]
label: ;
export {};
