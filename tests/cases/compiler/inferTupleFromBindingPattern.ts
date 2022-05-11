declare function f2<T>(cb: () => T): T;
const [e1, e2, e3] = f2(() => [1, "hi", true]);

declare function f1<T>(): T;
const {} = f1();     // error
const { p1 } = f1(); // error

declare function pick<O, T extends keyof O>(keys: T[], obj?: O): Pick<O, T>;
const _    = pick(['b'], { a: 'a', b: 'b' }); // T: "b"
const {  } = pick(['b'], { a: 'a', b: 'b' }); // T: "b" | "a" ???

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
        funcA: (...p) => d(f.funcA(...p)),
        funcB: (...p) => d(f.funcB(...p)),
        funcC: (...p) => d(f.funcC(...p))
    })
);
