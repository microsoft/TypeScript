// @declaration: true
// @strict: true,false

// @fileName: arrowFunctionPlacement.ts
type P = { name: string }

export let vLet = (/* param */p: P, p2: typeof p):P => null!;
export const vConst = (/* param */p: P, p2: typeof p):P => null!;

export function fn(p = (/* param */p: P, p2: typeof p):P => null!) {}

export function fnTypeFromBinding({ foo }: { foo: number }, p = (/* param */p: P, p2: typeof p, p3: typeof foo):P => null!) {}

/** p wil be resolved by the checker (requires | undefined)  */
export function fnWithRequiredDefaultParam(p = (/* param */p: P, p2: typeof p):P => null!, req: number) {}

/** p wil be resolved by the checker (requires | undefined)  */
export const exprWithRequiredDefaultParam = (p = function (/* param */p: P, p2: typeof p): P { return null!; }, req: number) => {

}

export class C {
    field = (/* param */p: P, p2: typeof p):P => null!;
    readonly roFiled = (/* param */p: P, p2: typeof p):P => null!;
    method(p = (/* param */p: P, p2: typeof p):P => null!) {}
    /** p wil be resolved by the checker (requires | undefined)  */
    methodWithRequiredDefault(p = (/* param */p: P, p2: typeof p):P => null!, req: number) {}
    thisType =  (): this  => this;

    constructor(public ctorField = (/* param */p: P, p2: typeof p):P => null!) {}
}

export default (/* param */p: P, p2: typeof p):P => null!;

// @fileName: functionExpressionPlacement.ts
type P = { name: string }

export let vLet = function (/* param */p: P, p2: typeof p): P { return null!; };
export const vConst = function (/* param */p: P, p2: typeof p): P { return null!; };

export function fn(p = function (/* param */p: P, p2: typeof p): P { return null!; }) {}

/** p wil be resolved by the checker (requires | undefined)  */
export function fnWithRequiredDefaultParam(p = function (/* param */p: P, p2: typeof p): P { return null!; }, req: number) {}

export class C {
    field = function (/* param */p: P, p2: typeof p): P { return null!; };
    readonly roFiled = function (/* param */p: P, p2: typeof p): P { return null!; };
    method(p = function (/* param */p: P, p2: typeof p): P { return null!; }) {}

    /** p wil be resolved by the checker (requires | undefined)  */
    methodWithRequiredDefault(p = function (/* param */p: P, p2: typeof p): P { return null!; }, req: number) {}

    constructor(public ctorField = function (/* param */p: P, p2: typeof p): P { return null!; }) {}
}

export default function (/* param */p: P, p2: typeof p): P { return null!; };


// @fileName: returnTypes.ts

type P = { name: string }
export let fromAnnotation  = (p: P):typeof p[keyof typeof p] => null!;
export let fromInference  = (p: P) => null! as typeof p[keyof typeof p];

// @fileName: genericFunctions.ts
type G1 = { name: string }
export let g1 = function<T extends keyof G1>(/* param */p: T){};


// unused
type G2 = { name: string }
export let g2 = <G2 extends keyof G1>(): G2 => { return null!};

export const createClient = <D>(
  clientDef: D
): D extends new (...args: any[]) => infer D ? 
    (D extends { d: infer D } ? D: never):
    never => {
  return null! 
}