//// [awaitSwitchStatement3.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: any;
declare var b: any;
declare var p: Promise<any>;
async function func(): Promise<void> {
    "before";
    switch (a) {
        case await p:
            "body0";
            break;
        case 1:
        default:
            "body1";
    }
    "after";
}

//// [awaitSwitchStatement3.js]
function func() {
    var __l0;
    return new Promise(function (__resolve) {
        __resolve(__awaiter(__generator(function (__state) {
            switch (__state.label) {
                case 0:
                    "before";
                    __l0 = a;
                    return ["yield", p];
                case 1:
                    if (__l0 === __state.sent) { return ["break", 2]; }
                    switch (__l0) {
                        case 1: return ["break", 4];
                    }
                    return ["break", 4];
                case 2:
                    return ["yield", p];
                case 3:
                    "body0";
                    return ["break", 5];
                case 4:
                    "body1";
                    __state.label = 5;
                case 5:
                    "after";
                    return ["return"];
            }
        })));
    });
}
