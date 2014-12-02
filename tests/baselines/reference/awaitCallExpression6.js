//// [awaitCallExpression6.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: boolean;
declare var p: Promise<boolean>;
declare function fn(arg0: boolean, arg1: boolean, arg2: boolean): void;
declare var o: { fn(arg0: boolean, arg1: boolean, arg2: boolean): void; };
declare var pfn: Promise<{ (arg0: boolean, arg1: boolean, arg2: boolean): void; }>;
declare var po: Promise<{ fn(arg0: boolean, arg1: boolean, arg2: boolean): void; }>;
async function func(): Promise<void> {
    "before";
    var b = o.fn(await p, a, a);
    "after";
}

//// [awaitCallExpression6.js]
function func() {
    var b, __l0, __l1;
    return new Promise(function (__resolve) {
        __resolve(__awaiter(__generator(function (__state) {
            switch (__state.label) {
                case 0:
                    "before";
                    __l0 = o;
                    __l1 = __l0.fn;
                    return ["yield", p];
                case 1:
                    b = __l1.call(__l0, __state.sent, a, a);
                    "after";
                    return ["return"];
            }
        })));
    });
}
