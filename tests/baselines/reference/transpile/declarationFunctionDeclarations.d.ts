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
//// [fnDecl.d.ts] ////
type T = number[];
export declare function fnDeclBasic1(p: number[] | string[] | [T] | undefined, rParam: string): void;
export declare function fnDeclBasic2(p: ((n: T) => T) | undefined, rParam: string): void;
export declare function fnDeclBasic3(p: (new () => any) | undefined, rParam: string): void;
export declare function fnDeclBasic4(p: [T] | undefined, rParam: string): void;
export declare function fnDeclBasic5(p: {
    a: T;
} | undefined, rParam: string): void;
export declare function fnDeclBasic6(p: `_${string}` | undefined, rParam: string): void;
export declare function fnDeclBasic7(p: ({
    a?: string;
} & number[]) | undefined, rParam: string): void;
export declare function fnDeclBasic8(p: (number[] | string[]) | number | undefined, rParam: string): void;
export declare function fnDeclHasUndefined(p: T | undefined, rParam: string): void;
export declare function fnDeclBad(p: T | undefined, rParam: string): void;
export declare const fnExprOk1: (array: number[] | undefined, rParam: string) => void;
export declare const fnExprOk2: (array: T | undefined, rParam: string) => void;
export declare const fnExprBad: (array: T | undefined, rParam: string) => void;
export declare const arrowOk1: (array: number[] | undefined, rParam: string) => void;
export declare const arrowOk2: (array: T | undefined, rParam: string) => void;
export declare const arrowBad: (array: T | undefined, rParam: string) => void;
export declare const inObjectLiteralFnExprOk1: {
    o: (array: number[] | undefined, rParam: string) => void;
};
export declare const inObjectLiteralFnExprOk2: {
    o: (array: T | undefined, rParam: string) => void;
};
export declare const inObjectLiteralFnExprBad: {
    o: (array: T | undefined, rParam: string) => void;
};
export declare const inObjectLiteralArrowOk1: {
    o: (array: number[] | undefined, rParam: string) => void;
};
export declare const inObjectLiteralArrowOk2: {
    o: (array: T | undefined, rParam: string) => void;
};
export declare const inObjectLiteralArrowBad: {
    o: (array: T | undefined, rParam: string) => void;
};
export declare const inObjectLiteralMethodOk1: {
    o(array: number[] | undefined, rParam: string): void;
};
export declare const inObjectLiteralMethodOk2: {
    o(array: T | undefined, rParam: string): void;
};
export declare const inObjectLiteralMethodBad: {
    o(array: T | undefined, rParam: string): void;
};
export declare class InClassFnExprOk1 {
    o: (array: number[] | undefined, rParam: string) => void;
}
export declare class InClassFnExprOk2 {
    o: (array: T | undefined, rParam: string) => void;
}
export declare class InClassFnExprBad {
    o: (array: T | undefined, rParam: string) => void;
}
export declare class InClassArrowOk1 {
    o: (array: number[] | undefined, rParam: string) => void;
}
export declare class InClassArrowOk2 {
    o: (array: T | undefined, rParam: string) => void;
}
export declare class InClassArrowBad {
    o: (array: T | undefined, rParam: string) => void;
}
export declare class InClassMethodOk1 {
    o(array: number[] | undefined, rParam: string): void;
}
export declare class InClassMethodOk2 {
    o(array: T | undefined, rParam: string): void;
}
export declare class InClassMethodBad {
    o(array: T | undefined, rParam: string): void;
}
declare class Bar {
}
export declare class ClsWithRequiredInitializedParameter {
    private arr;
    private bool;
    constructor(arr: Bar | undefined, bool: boolean);
}
export {};


//// [Diagnostics reported]
fnDecl.ts(12,27): error TS9025: Declaration emit for this parameter requires implicitly adding undefined to its type. This is not supported with --isolatedDeclarations.
fnDecl.ts(16,36): error TS9025: Declaration emit for this parameter requires implicitly adding undefined to its type. This is not supported with --isolatedDeclarations.
fnDecl.ts(20,26): error TS9025: Declaration emit for this parameter requires implicitly adding undefined to its type. This is not supported with --isolatedDeclarations.
fnDecl.ts(24,56): error TS9025: Declaration emit for this parameter requires implicitly adding undefined to its type. This is not supported with --isolatedDeclarations.
fnDecl.ts(28,46): error TS9025: Declaration emit for this parameter requires implicitly adding undefined to its type. This is not supported with --isolatedDeclarations.
fnDecl.ts(32,45): error TS9025: Declaration emit for this parameter requires implicitly adding undefined to its type. This is not supported with --isolatedDeclarations.
fnDecl.ts(37,47): error TS9025: Declaration emit for this parameter requires implicitly adding undefined to its type. This is not supported with --isolatedDeclarations.
fnDecl.ts(41,37): error TS9025: Declaration emit for this parameter requires implicitly adding undefined to its type. This is not supported with --isolatedDeclarations.
fnDecl.ts(45,35): error TS9025: Declaration emit for this parameter requires implicitly adding undefined to its type. This is not supported with --isolatedDeclarations.
fnDecl.ts(51,5): error TS9025: Declaration emit for this parameter requires implicitly adding undefined to its type. This is not supported with --isolatedDeclarations.


==== fnDecl.ts (10 errors) ====
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
                              ~~~~~~~~~
!!! error TS9025: Declaration emit for this parameter requires implicitly adding undefined to its type. This is not supported with --isolatedDeclarations.
!!! related TS9028 fnDecl.ts:12:27: Add a type annotation to the parameter p.
    
    export const fnExprOk1 = function (array: number[] = [], rParam: string): void { };
    export const fnExprOk2 = function (array: T | undefined = [], rParam: string): void { };
    export const fnExprBad = function (array: T = [], rParam: string): void { };
                                       ~~~~~~~~~~~~~
!!! error TS9025: Declaration emit for this parameter requires implicitly adding undefined to its type. This is not supported with --isolatedDeclarations.
!!! related TS9028 fnDecl.ts:16:36: Add a type annotation to the parameter array.
    
    export const arrowOk1 = (array: number[] = [], rParam: string): void => { };
    export const arrowOk2 = (array: T | undefined = [], rParam: string): void => { };
    export const arrowBad = (array: T = [], rParam: string): void => { };
                             ~~~~~~~~~~~~~
!!! error TS9025: Declaration emit for this parameter requires implicitly adding undefined to its type. This is not supported with --isolatedDeclarations.
!!! related TS9028 fnDecl.ts:20:26: Add a type annotation to the parameter array.
    
    export const inObjectLiteralFnExprOk1 = { o: function (array: number[] = [], rParam: string): void { } };
    export const inObjectLiteralFnExprOk2 = { o: function (array: T | undefined = [], rParam: string): void { } };
    export const inObjectLiteralFnExprBad = { o: function (array: T = [], rParam: string): void { } };
                                                           ~~~~~~~~~~~~~
!!! error TS9025: Declaration emit for this parameter requires implicitly adding undefined to its type. This is not supported with --isolatedDeclarations.
!!! related TS9028 fnDecl.ts:24:56: Add a type annotation to the parameter array.
    
    export const inObjectLiteralArrowOk1 = { o: (array: number[] = [], rParam: string): void => { } };
    export const inObjectLiteralArrowOk2 = { o: (array: T | undefined = [], rParam: string): void => { } };
    export const inObjectLiteralArrowBad = { o: (array: T = [], rParam: string): void => { } };
                                                 ~~~~~~~~~~~~~
!!! error TS9025: Declaration emit for this parameter requires implicitly adding undefined to its type. This is not supported with --isolatedDeclarations.
!!! related TS9028 fnDecl.ts:28:46: Add a type annotation to the parameter array.
    
    export const inObjectLiteralMethodOk1 = { o(array: number[] = [], rParam: string): void { } };
    export const inObjectLiteralMethodOk2 = { o(array: T | undefined = [], rParam: string): void { } };
    export const inObjectLiteralMethodBad = { o(array: T = [], rParam: string): void { } };
                                                ~~~~~~~~~~~~~
!!! error TS9025: Declaration emit for this parameter requires implicitly adding undefined to its type. This is not supported with --isolatedDeclarations.
!!! related TS9028 fnDecl.ts:32:45: Add a type annotation to the parameter array.
    
    
    export class InClassFnExprOk1 { o = function (array: number[] = [], rParam: string): void { } };
    export class InClassFnExprOk2 { o = function (array: T | undefined = [], rParam: string): void { } };
    export class InClassFnExprBad { o = function (array: T = [], rParam: string): void { } };
                                                  ~~~~~~~~~~~~~
!!! error TS9025: Declaration emit for this parameter requires implicitly adding undefined to its type. This is not supported with --isolatedDeclarations.
!!! related TS9028 fnDecl.ts:37:47: Add a type annotation to the parameter array.
    
    export class InClassArrowOk1 { o = (array: number[] = [], rParam: string): void => { } };
    export class InClassArrowOk2 { o = (array: T | undefined = [], rParam: string): void => { } };
    export class InClassArrowBad { o = (array: T = [], rParam: string): void => { } };
                                        ~~~~~~~~~~~~~
!!! error TS9025: Declaration emit for this parameter requires implicitly adding undefined to its type. This is not supported with --isolatedDeclarations.
!!! related TS9028 fnDecl.ts:41:37: Add a type annotation to the parameter array.
    
    export class InClassMethodOk1 { o(array: number[] = [], rParam: string): void { } };
    export class InClassMethodOk2 { o(array: T | undefined = [], rParam: string): void { } };
    export class InClassMethodBad { o(array: T = [], rParam: string): void { } };
                                      ~~~~~~~~~~~~~
!!! error TS9025: Declaration emit for this parameter requires implicitly adding undefined to its type. This is not supported with --isolatedDeclarations.
!!! related TS9028 fnDecl.ts:45:35: Add a type annotation to the parameter array.
    
    // https://github.com/microsoft/TypeScript/issues/60976
    class Bar {}
    export class ClsWithRequiredInitializedParameter {
      constructor(
        private arr: Bar = new Bar(),
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
!!! error TS9025: Declaration emit for this parameter requires implicitly adding undefined to its type. This is not supported with --isolatedDeclarations.
!!! related TS9028 fnDecl.ts:51:5: Add a type annotation to the parameter arr.
        private bool: boolean,
      ) {}
    }
