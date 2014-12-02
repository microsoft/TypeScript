//// [awaitForStatement3.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var p: Promise<number>;
async function func(): Promise<void> {
    "before";
    var i;
    for (i = await p; i < 1; i++) {
        "body";
    }
    "after";
}

//// [awaitForStatement3.js]
function func() {
    var i;
    return new Promise(function (__resolve) {
        __resolve(__awaiter(__generator(function (__state) {
            switch (__state.label) {
                case 0:
                    "before";
                    return ["yield", p];
                case 1:
                    for (i = __state.sent; i < 1; i++) {
                        "body";
                    }
                    "after";
                    return ["return"];
            }
        })));
    });
}
