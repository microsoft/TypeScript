//// [awaitTryStatement12.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var p: Promise<void>;
async function func(): Promise<void> {
    "before";
    try {
        "try0.0";
        try {
            "try1.0";
            await p;
            "try1.1";
        } catch (e) {
            "catch1";
        } finally {        
            "finally1";
        }
        "try0.1"
    } catch (e) {
        "catch0";
    } finally {
        "finally0";
    }
    "after";
}


//// [awaitTryStatement12.js]
function func() {
    var __l0, __l1;
    return new Promise(function (__resolve) {
        __resolve(__awaiter(__generator(function (__state) {
            switch (__state.label) {
                case 0:
                    __state.trys = [];
                    "before";
                    __state.label = 1;
                case 1:
                    __state.trys.push([1,7,8,9])
                    "try0.0";
                    __state.label = 2;
                case 2:
                    __state.trys.push([2,4,5,6])
                    "try1.0";
                    return ["yield", p];
                case 3:
                    "try1.1";
                    return ["break", 6];
                case 4:
                    __l0 = __state.error;
                    "catch1";
                    return ["break", 6];
                case 5:
                    "finally1";
                    return ["endfinally"];
                case 6:
                    "try0.1";
                    return ["break", 9];
                case 7:
                    __l1 = __state.error;
                    "catch0";
                    return ["break", 9];
                case 8:
                    "finally0";
                    return ["endfinally"];
                case 9:
                    "after";
                    return ["return"];
            }
        })));
    });
}
