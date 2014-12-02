//// [awaitBinaryExpression13.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: boolean;
declare var p: Promise<boolean>;
declare var o: { [key: string]: boolean; }
async function func(): Promise<void> {
    "before";
    o["b"] = await p;
    "after";
}

//// [awaitBinaryExpression13.js]
function func() {
    var __l0, __l1;
    return new Promise(function (__resolve) {
        __resolve(__awaiter(__generator(function (__state) {
            switch (__state.label) {
                case 0:
                    "before";
                    __l0 = o;
                    __l1 = "b";
                    return ["yield", p];
                case 1:
                    __l0[__l1] = __state.sent;
                    "after";
                    return ["return"];
            }
        })));
    });
}
