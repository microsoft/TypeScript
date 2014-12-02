//// [awaitBinaryExpression4.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: boolean;
declare var p: Promise<boolean>;
async function func(): Promise<void> {
    "before";
    var b = a || await p;
    "after";
}

//// [awaitBinaryExpression4.js]
function func() {
    var b, __l0;
    return new Promise(function (__resolve) {
        __resolve(__awaiter(__generator(function (__state) {
            switch (__state.label) {
                case 0:
                    "before";
                    __l0 = a
                    if (__l0) { return ["break", 2]; }
                    return ["yield", p];
                case 1:
                    __l0 = __state.sent
                    __state.label = 2;
                case 2:
                    b = __l0;
                    "after";
                    return ["return"];
            }
        })));
    });
}
