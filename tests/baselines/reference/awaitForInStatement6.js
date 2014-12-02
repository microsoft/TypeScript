//// [awaitForInStatement6.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: any;
declare var i: any;
declare var p: Promise<any>;
async function func(): Promise<void> {
    "before";
    for (var i in a) {
        "body1";
        await p;
        "body2";
    }
    "after";
}

//// [awaitForInStatement6.js]
function func() {
    var i, __l0, __l1;
    return new Promise(function (__resolve) {
        __resolve(__awaiter(__generator(function (__state) {
            switch (__state.label) {
                case 0:
                    "before";
                    __l0 = [];
                    for (__l1 in a) {
                        __l0[__l0.length] = __l1;
                    }
                    __l1 = 0;
                    __state.label = 1;
                case 1:
                    if (__l1 >= __l0.length) { return ["break", 4]; }
                    i = __l0[__l1];
                    "body1";
                    return ["yield", p];
                case 2:
                    "body2";
                    __state.label = 3;
                case 3:
                    __l1++;
                    return ["break", 1];
                case 4:
                    "after";
                    return ["return"];
            }
        })));
    });
}
