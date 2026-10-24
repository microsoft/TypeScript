// @declaration: true

// @filename: interface.ts
label: interface I {}
export interface J extends I {}

// @filename: implements.ts
label: interface I {}
export class C implements I {}

// @filename: typeArgument.ts
label: interface I {}
interface Base<T> {}
export interface J extends Base<I> {}
