//// [fnDecl.ts] ////
type T = number[]
export function fnDeclBasic1(p: number[] | string[] | [T] = [], rParam: string): void { };
export function fnDeclBasic2(p: (n: T) => T = () => null!, rParam: string): void { };
export function fnDeclBasic3(p: new () => any = class {}, rParam: string): void { };
export function fnDeclBasic4(p: [T] = [[]], rParam: string): void { };
export function fnDeclBasic5(p: { a: T } = { a: [] }, rParam: string): void { };
export function fnDeclBasic6(p: `_${string}` = "_", rParam: string): void { };
export function fnDeclBasic7(p: { a?: string } & number[] = [], rParam: string): void { };
export function fnDeclBasic8(p: (number[] | string[]) | number = [], rParam: string): void { };

export function fnDeclHasUndefined(p: T | undefined = [], rParam: string): void { };
export function fnDeclBad(p: T = [], rParam: string): void { };

export const fnExprOk1 = function (array: number[] = [], rParam: string): void { };
export const fnExprOk2 = function (array: T | undefined = [], rParam: string): void { };
export const fnExprBad = function (array: T = [], rParam: string): void { };

export const arrowOk1 = (array: number[] = [], rParam: string): void => { };
export const arrowOk2 = (array: T | undefined = [], rParam: string): void => { };
export const arrowBad = (array: T = [], rParam: string): void => { };

export const inObjectLiteralFnExprOk1 = { o: function (array: number[] = [], rParam: string): void { } };
export const inObjectLiteralFnExprOk2 = { o: function (array: T | undefined = [], rParam: string): void { } };
export const inObjectLiteralFnExprBad = { o: function (array: T = [], rParam: string): void { } };

export const inObjectLiteralArrowOk1 = { o: (array: number[] = [], rParam: string): void => { } };
export const inObjectLiteralArrowOk2 = { o: (array: T | undefined = [], rParam: string): void => { } };
export const inObjectLiteralArrowBad = { o: (array: T = [], rParam: string): void => { } };

export const inObjectLiteralMethodOk1 = { o(array: number[] = [], rParam: string): void { } };
export const inObjectLiteralMethodOk2 = { o(array: T | undefined = [], rParam: string): void { } };
export const inObjectLiteralMethodBad = { o(array: T = [], rParam: string): void { } };


export class InClassFnExprOk1 { o = function (array: number[] = [], rParam: string): void { } };
export class InClassFnExprOk2 { o = function (array: T | undefined = [], rParam: string): void { } };
export class InClassFnExprBad { o = function (array: T = [], rParam: string): void { } };

export class InClassArrowOk1 { o = (array: number[] = [], rParam: string): void => { } };
export class InClassArrowOk2 { o = (array: T | undefined = [], rParam: string): void => { } };
export class InClassArrowBad { o = (array: T = [], rParam: string): void => { } };

export class InClassMethodOk1 { o(array: number[] = [], rParam: string): void { } };
export class InClassMethodOk2 { o(array: T | undefined = [], rParam: string): void { } };
export class InClassMethodBad { o(array: T = [], rParam: string): void { } };

// https://github.com/microsoft/TypeScript/issues/60976
class Bar {}
export class ClsWithRequiredInitializedParameter {
  constructor(
    private arr: Bar = new Bar(),
    private bool: boolean,
  ) {}
}
//// [fnDecl.js] ////
export function fnDeclBasic1(p = [], rParam) { }
;
export function fnDeclBasic2(p = () => null, rParam) { }
;
export function fnDeclBasic3(p = class {
}, rParam) { }
;
export function fnDeclBasic4(p = [[]], rParam) { }
;
export function fnDeclBasic5(p = { a: [] }, rParam) { }
;
export function fnDeclBasic6(p = "_", rParam) { }
;
export function fnDeclBasic7(p = [], rParam) { }
;
export function fnDeclBasic8(p = [], rParam) { }
;
export function fnDeclHasUndefined(p = [], rParam) { }
;
export function fnDeclBad(p = [], rParam) { }
;
export const fnExprOk1 = function (array = [], rParam) { };
export const fnExprOk2 = function (array = [], rParam) { };
export const fnExprBad = function (array = [], rParam) { };
export const arrowOk1 = (array = [], rParam) => { };
export const arrowOk2 = (array = [], rParam) => { };
export const arrowBad = (array = [], rParam) => { };
export const inObjectLiteralFnExprOk1 = { o: function (array = [], rParam) { } };
export const inObjectLiteralFnExprOk2 = { o: function (array = [], rParam) { } };
export const inObjectLiteralFnExprBad = { o: function (array = [], rParam) { } };
export const inObjectLiteralArrowOk1 = { o: (array = [], rParam) => { } };
export const inObjectLiteralArrowOk2 = { o: (array = [], rParam) => { } };
export const inObjectLiteralArrowBad = { o: (array = [], rParam) => { } };
export const inObjectLiteralMethodOk1 = { o(array = [], rParam) { } };
export const inObjectLiteralMethodOk2 = { o(array = [], rParam) { } };
export const inObjectLiteralMethodBad = { o(array = [], rParam) { } };
export class InClassFnExprOk1 {
    o = function (array = [], rParam) { };
}
;
export class InClassFnExprOk2 {
    o = function (array = [], rParam) { };
}
;
export class InClassFnExprBad {
    o = function (array = [], rParam) { };
}
;
export class InClassArrowOk1 {
    o = (array = [], rParam) => { };
}
;
export class InClassArrowOk2 {
    o = (array = [], rParam) => { };
}
;
export class InClassArrowBad {
    o = (array = [], rParam) => { };
}
;
export class InClassMethodOk1 {
    o(array = [], rParam) { }
}
;
export class InClassMethodOk2 {
    o(array = [], rParam) { }
}
;
export class InClassMethodBad {
    o(array = [], rParam) { }
}
;
// https://github.com/microsoft/TypeScript/issues/60976
class Bar {
}
export class ClsWithRequiredInitializedParameter {
    arr;
    bool;
    constructor(arr = new Bar(), bool) {
        this.arr = arr;
        this.bool = bool;
    }
}
