// @strict: true
// @noEmit: true

declare function f1(arg: boolean): string;
declare function f1(arg1: number, arg2: number): number;
declare function f1(...args: string[]): string[];

declare function f2(arg: unknown): unknown;

declare function f3(): string;

type AllParams<T> =
    T extends { (...a: infer A1): any, (...a: infer A2): any, (...a: infer A3): any, (...a: infer A4): any } ? A1 | A2 | A3 | A4 : never;

type AllReturns<T> =
    T extends { (...a: any[]): infer R1, (...a: any[]): infer R2, (...a: any[]): infer R3, (...a: any[]): infer R4 } ? R1 | R2 | R3 | R4 : never;

type Params1 = AllParams<typeof f1>;  // string[] | [arg: boolean] | [arg1: number, arg2: number]
type Params2 = AllParams<typeof f2>;  // [arg: unknown]
type Params3 = AllParams<typeof f3>;  // []

type Returns1 = AllReturns<typeof f1>  // string | number | string[]
type Returns2 = AllReturns<typeof f2>;  // unknown
type Returns3 = AllReturns<typeof f3>;  // string

// Repro from #28867

type InferTwoOverloads<F extends Function> = 
  F extends { (...a1: infer A1): infer R1, (...a0: infer A0): infer R0 } ? 
    [(...a1: A1) => R1, (...a0: A0) => R0] : 
    never;

type Expected = InferTwoOverloads<((x: string) => number) & (() => string)>;  // [(x: string) => number, () => string]    

type JustOneSignature = InferTwoOverloads<((x: string) => number)>;  // [(x: string) => number, (x: string) => number]

type JustTheOtherSignature = InferTwoOverloads<(() => string)>;  // [() => string, () => string]

// Repro from #28867

type Overloads<F> =
    F extends {
          (...args: infer A1): infer R1
          (...args: infer A2): infer R2;
      } ? {rule: 2, variants: [A1, R1] | [A2, R2]} :
    F extends {
          (...args: infer A1): infer R1;
      } ? {rule: 1, variants: [A1, R1]} :
    never;

declare const ok1: Overloads<(x: number) => boolean>;  // {rule: 2, variants: [[number], boolean]}

declare const ok2: Overloads<{(): 1; (x: number): 2}>;  // {rule: 2, variants: [[], 1] | [[number], 2]}

declare const ok3: Overloads<() => boolean>;  // {rule: 2, variants: [[], boolean] }

declare const ok4: Overloads<(...args: unknown[]) => boolean>;  // {rule: 2, variants: [unknown[], boolean] }

declare const ok5: Overloads<(x: unknown) => boolean>;  // {rule: 2, variants: [[unknown], boolean] }

declare const ok6: Overloads<(x: any) => boolean>;  // {rule: 2, variants: [[any], boolean] }
