//// [awaitTryStatement3.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var p: Promise<void>;
async function func(): Promise<void> {
    "before";
    try {
        "try";
    } catch (e) {
        "catch";
    } finally {        
        "finally";
    }
    "after";
}

//// [awaitTryStatement3.js]
function func() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            "before";
            try {
                "try";
            }
            catch (e) {
                "catch";
            }
            finally {
                "finally";
            }
            "after";
            return ["return"];
        })));
    });
}
