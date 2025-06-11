//// [tests/cases/compiler/contextualTypingGenericFunction2.ts] ////

//// [contextualTypingGenericFunction2.ts]
// https://github.com/microsoft/TypeScript/issues/61791

declare const fn1: <T, Args extends Array<any>, Ret>(
  self: T,
  body: (this: T, ...args: Args) => Ret,
) => (...args: Args) => Ret;

export const ok1 = fn1({ message: "foo" }, function (n: number) {
  this.message;
});

export const ok2 = fn1({ message: "foo" }, function <N>(n: N) {
  this.message;
});

declare const fn2: <Args extends Array<any>, Ret>(
  body: (first: string, ...args: Args) => Ret,
) => (...args: Args) => Ret;

export const ok3 = fn2(function <N>(first, n: N) {});

declare const fn3: <Args extends Array<any>, Ret>(
  body: (...args: Args) => (arg: string) => Ret,
) => (...args: Args) => Ret;

export const ok4 = fn3(function <N>(n: N) {
    return (arg) => {
        return 10
    }
});

declare function fn4<T, P>(config: {
  context: T;
  callback: (params: P) => (context: T, params: P) => number;
}): (params: P) => number;

export const ok5 = fn4({
  context: 1,
  callback: <T,>(params: T) => {
    return (a, b) => a + 1;
  },
});

declare const fnGen1: <T, Args extends Array<any>, Ret>(
  self: T,
  body: (this: T, ...args: Args) => Generator<any, Ret, never>,
) => (...args: Args) => Ret;

export const ok6 = fnGen1({ message: "foo" }, function* (n: number) {
  this.message;
});

export const ok7 = fnGen1({ message: "foo" }, function* <N>(n: N) {
  this.message;
});




//// [contextualTypingGenericFunction2.d.ts]
export declare const ok1: (n: number) => void;
export declare const ok2: (n: any) => void;
export declare const ok3: <N>(n: N) => void;
export declare const ok4: <N>(n: N) => number;
export declare const ok5: (params: T) => number;
export declare const ok6: (n: number) => void;
export declare const ok7: (n: any) => void;


//// [DtsFileErrors]


contextualTypingGenericFunction2.d.ts(5,36): error TS2304: Cannot find name 'T'.


==== contextualTypingGenericFunction2.d.ts (1 errors) ====
    export declare const ok1: (n: number) => void;
    export declare const ok2: (n: any) => void;
    export declare const ok3: <N>(n: N) => void;
    export declare const ok4: <N>(n: N) => number;
    export declare const ok5: (params: T) => number;
                                       ~
!!! error TS2304: Cannot find name 'T'.
    export declare const ok6: (n: number) => void;
    export declare const ok7: (n: any) => void;
    