//// [awaitCallExpression8.ts]
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
    var b = (await po).fn(a, a, a);
    "after";
}

//// [awaitCallExpression8.js]
function func() {
    var b, __l0, __l1;
    return new Promise(function (__resolve) {
        __resolve(__awaiter(__generator(function (__state) {
            switch (__state.label) {
                case 0:
                    "before";
                    return ["yield", po];
                case 1:
                    __l0 = (__state.sent);
                    __l1 = __l0.fn;
                    b = __l1.call(__l0, a, a, a);
                    "after";
                    return ["return"];
            }
        })));
    });
}
