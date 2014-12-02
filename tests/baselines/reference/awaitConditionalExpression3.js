//// [awaitConditionalExpression3.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: number;
declare var p: Promise<number>;
async function func(): Promise<void> {
    var b = a ? a : await p;
}

//// [awaitConditionalExpression3.js]
function func() {
    var b, __l0;
    return new Promise(function (__resolve) {
        __resolve(__awaiter(__generator(function (__state) {
            switch (__state.label) {
                case 0:
                    if (!(a)) { return ["break", 1]; }
                    __l0 = a
                    return ["break", 3];
                case 1:
                    return ["yield", p];
                case 2:
                    __l0 = __state.sent
                    __state.label = 3;
                case 3:
                    b = __l0;
                    return ["return"];
            }
        })));
    });
}
