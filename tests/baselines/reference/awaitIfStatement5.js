//// [awaitIfStatement5.ts]
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
        "else1";
        await p;
        "else2";
    }
    "after";
}

//// [awaitIfStatement5.js]
var a;
var p;
function func() {
    return new Promise(function (__resolve) {
        __resolve(__awaiter(__generator(function (__state) {
            switch (__state.label) {
                case 0:
                    "before";
                    if (!(a)) { return ["break", 1]; }
                    "then";
                    return ["break", 3];
                case 1:
                    "else1";
                    return ["yield", p];
                case 2:
                    "else2";
                    __state.label = 3;
                case 3:
                    "after";
                    return ["return"];
            }
        })));
    });
}
