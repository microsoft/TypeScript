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
var _a = f(); // error (only in strictNullChecks)
var p1 = f().p1; // error
var _b = f(); // error
var _c = f(), e1 = _c[0], e2 = _c[1]; // error
var funcs1 = {
    funcA: function (a) { },
    funcB: function (b, bb) { },
    funcC: function (c, cc, ccc) { },
};
var _d = useReduxDispatch1(function (d, f) { return ({
    funcA: function () {
        var p = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            p[_i] = arguments[_i];
        }
        return d(f.funcA.apply(f, p));
    }, // p should be inferrable
    funcB: function () {
        var p = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            p[_i] = arguments[_i];
        }
        return d(f.funcB.apply(f, p));
    },
    funcC: function () {
        var p = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            p[_i] = arguments[_i];
        }
        return d(f.funcC.apply(f, p));
    },
}); });
