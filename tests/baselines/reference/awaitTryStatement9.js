//// [awaitTryStatement9.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var p: Promise<void>;
async function func(): Promise<void> {
    "before";
    try {
        "try";
    } finally {        
        "finally0";
        await p;
        "finally1";
    }
    "after";
}


//// [awaitTryStatement9.js]
function func() {
    return new Promise(function (__resolve) {
        __resolve(__awaiter(__generator(function (__state) {
            switch (__state.label) {
                case 0:
                    __state.trys = [];
                    "before";
                    __state.label = 1;
                case 1:
                    __state.trys.push([1,,2,4])
                    "try";
                    return ["break", 4];
                case 2:
                    "finally0";
                    return ["yield", p];
                case 3:
                    "finally1";
                    return ["endfinally"];
                case 4:
                    "after";
                    return ["return"];
            }
        })));
    });
}
