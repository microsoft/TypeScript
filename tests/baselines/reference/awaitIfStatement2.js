//// [awaitIfStatement2.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
var a: boolean;
var p: Promise<boolean>;

async function func(): Promise<void> {
    "before";
    if (await p) {
        "then";
    } else {
        "else";
    }
    "after";
}

//// [awaitIfStatement2.js]
var a;
var p;
function func() {
    return new Promise(function (__resolve) {
        __resolve(__awaiter(__generator(function (__state) {
            switch (__state.label) {
                case 0:
                    "before";
                    return ["yield", p];
                case 1:
                    if (__state.sent) {
                        "then";
                    }
                    else {
                        "else";
                    }
                    "after";
                    return ["return"];
            }
        })));
    });
}
