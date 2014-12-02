//// [awaitForStatement1.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var p: Promise<number>;
async function func(): Promise<void> {
    "before";
    for (var i = 0; i < 1; i++) {
        "body";
    }
    "after";
}

//// [awaitForStatement1.js]
function func() {
    var i;
    return new Promise(function (__resolve) {
        __resolve(__awaiter(__generator(function (__state) {
            switch (__state.label) {
                case 0:
                    "before";
                    for (i = 0; i < 1; i++) {
                        "body";
                    }
                    "after";
                    return ["return"];
            }
        })));
    });
}
