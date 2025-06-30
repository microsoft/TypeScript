//// [tests/cases/compiler/contextualTypingGenericFunction2.ts] ////

//// [contextualTypingGenericFunction2.ts]
// https://github.com/microsoft/TypeScript/issues/61791

declare const fn1: <T, Args extends Array<any>, Ret>(
  self: T,
  body: (this: T, ...args: Args) => Ret,
) => (...args: Args) => Ret;

export const result1 = fn1({ message: "foo" }, function (n: number) {
  this.message;
});

export const result2 = fn1({ message: "foo" }, function <N>(n: N) {
  this.message;
});

declare const fn2: <Args extends Array<any>, Ret>(
  body: (first: string, ...args: Args) => Ret,
) => (...args: Args) => Ret;

export const result3 = fn2(function <N>(first, n: N) {});

declare const fn3: <Args extends Array<any>, Ret>(
  body: (...args: Args) => (arg: string) => Ret,
) => (...args: Args) => Ret;

export const result4 = fn3(function <N>(n: N) {
    return (arg) => {
        return 10
    }
});

declare function fn4<T, P>(config: {
  context: T;
  callback: (params: P) => (context: T, params: P) => number;
  other?: (arg: string) => void;
}): (params: P) => number;

export const result5 = fn4({
  context: 1,
  callback: <N,>(params: N) => {
    return (a, b) => a + 1;
  },
});

export const result6 = fn4({
  context: 1,
  callback: <N,>(params: N) => {
    return (a, b) => a + 1;
  },
  other: (_) => {} // outer context-sensitive function
});

// should error
export const result7 = fn4({
  context: 1,
  callback: <N,>(params: N) => {
    return (a: boolean, b) => a ? 1 : 2;
  },
  other: (_) => {} // outer context-sensitive function
});

 // should error
export const result8 = fn4({
  context: 1,
  callback: <N,>(params: N) => {
    return (a, b) => true;
  },
  other: (_) => {} // outer context-sensitive function
});

declare const fnGen1: <T, Args extends Array<any>, Ret>(
  self: T,
  body: (this: T, ...args: Args) => Generator<any, Ret, never>,
) => (...args: Args) => Ret;

export const result9 = fnGen1({ message: "foo" }, function* (n: number) {
  this.message;
});

export const result10 = fnGen1({ message: "foo" }, function* <N>(n: N) {
  this.message;
});




//// [contextualTypingGenericFunction2.d.ts]
export declare const result1: (n: number) => void;
export declare const result2: (n: any) => void;
export declare const result3: <N>(n: N) => void;
export declare const result4: <N>(n: N) => number;
export declare const result5: (params: unknown) => number;
export declare const result6: (params: unknown) => number;
export declare const result7: (params: unknown) => number;
export declare const result8: (params: unknown) => number;
export declare const result9: (n: number) => void;
export declare const result10: (n: any) => void;
