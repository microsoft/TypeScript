//// [awaitBinaryExpression9.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: number;
declare var p: Promise<number>;
async function func(): Promise<void> {
    "before";
    var b = a + await p;
    "after";
}

//// [awaitBinaryExpression9.js]
function func() {
    var b, __l0;
    return new Promise(function (__resolve) {
        __resolve(__awaiter(__generator(function (__state) {
            switch (__state.label) {
                case 0:
                    "before";
                    __l0 = a;
                    return ["yield", p];
                case 1:
                    b = __l0 + __state.sent;
                    "after";
                    return ["return"];
            }
        })));
    });
}
