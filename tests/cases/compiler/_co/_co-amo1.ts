// @strict: true
// @declaration: true
// @target: es6

declare function strmapgen<T extends string|number>(x:T):T;
declare const arrsn : string[]|number[];

arrsn.map(strmapgen); // 5.2.2 error


