//// [awaitTryStatement11.ts]
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
            "try1";
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


//// [awaitTryStatement11.js]
function func() {
    return new Promise(function (__resolve) {
        __resolve(__awaiter(__generator(function (__state) {
            switch (__state.label) {
                case 0:
                    "before";
                    try {
                        "try0.0";
                        try {
                            "try1";
                        }
                        catch (e) {
                            "catch1";
                        }
                        finally {
                            "finally1";
                        }
                        "try0.1";
                    }
                    catch (e) {
                        "catch0";
                    }
                    finally {
                        "finally0";
                    }
                    "after";
                    return ["return"];
            }
        })));
    });
}
