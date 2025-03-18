//// [tests/cases/compiler/bindingPatternCannotBeOnlyInferenceSource.ts] ////

//// [bindingPatternCannotBeOnlyInferenceSource.ts]
declare function f<T>(): T;
const {} = f();       // error (only in strictNullChecks)
const { p1 } = f();   // error
const [] = f();       // error
const [e1, e2] = f(); // error

// Repro from #43605
type Dispatch<A = { type: any; [extraProps: string]: any }> = { <T extends A>(action: T): T };
type IFuncs = { readonly [key: string]: (...p: any) => void };
type IDestructuring<T extends IFuncs> = { readonly [key in keyof T]?: (...p: Parameters<T[key]>) => void };
type Destructuring<T extends IFuncs, U extends IDestructuring<T>> = (dispatch: Dispatch<any>, funcs: T) => U;
const funcs1 = {
    funcA: (a: boolean): void => {},
    funcB: (b: string, bb: string): void => {},
    funcC: (c: number, cc: number, ccc: boolean): void => {},
};
type TFuncs1 = typeof funcs1;
declare function useReduxDispatch1<T extends IDestructuring<TFuncs1>>(destructuring: Destructuring<TFuncs1, T>): T;
const {} = useReduxDispatch1(
    (d, f) => ({
        funcA: (...p) => d(f.funcA(...p)), // p should be inferrable
        funcB: (...p) => d(f.funcB(...p)),
        funcC: (...p) => d(f.funcC(...p)),
    })
);


//// [bindingPatternCannotBeOnlyInferenceSource.js]
const {} = f();
const { p1 } = f();
const [] = f();
const [e1, e2] = f();
const funcs1 = {
    funcA: (a) => { },
    funcB: (b, bb) => { },
    funcC: (c, cc, ccc) => { },
};
const {} = useReduxDispatch1((d, f) => ({
    funcA: (...p) => d(f.funcA(...p)),
    funcB: (...p) => d(f.funcB(...p)),
    funcC: (...p) => d(f.funcC(...p)),
}));
