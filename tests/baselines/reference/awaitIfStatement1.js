//// [awaitIfStatement1.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
var a: boolean;
var p: Promise<boolean>;

async function func(): Promise<void> {
    "before";
    if (a) {
        "then";
    } else {
        "else";
    }
    "after";
}

//// [awaitIfStatement1.js]
var a;
var p;
function func() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    "before";
                    if (a) {
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
