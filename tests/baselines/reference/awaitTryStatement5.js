//// [awaitTryStatement5.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var p: Promise<void>;
async function func(): Promise<void> {
    "before";
    try {
        "try0";
        await p;
        "try1";
    } finally {        
        "finally";
    }
    "after";
}


//// [awaitTryStatement5.js]
function func() {
    return new Promise(function (__resolve) {
        __resolve(__awaiter(__generator(function (__state) {
            switch (__state.label) {
                case 0:
                    __state.trys = [];
                    "before";
                    __state.label = 1;
                case 1:
                    __state.trys.push([1,,3,4])
                    "try0";
                    return ["yield", p];
                case 2:
                    "try1";
                    return ["break", 4];
                case 3:
                    "finally";
                    return ["endfinally"];
                case 4:
                    "after";
                    return ["return"];
            }
        })));
    });
}
