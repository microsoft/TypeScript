//// [awaitTryStatement10.ts]
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
        "finally0";
        await p;
        "finally1";
    }
    "after";
}


//// [awaitTryStatement10.js]
function func() {
    var e_a;
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    _state.trys = [];
                    _state.label = 1;
                case 1:
                    "before";
                    _state.label = 2;
                case 2:
                    _state.trys.push([2,3,4,6])
                    "try";
                    return ["break", 6];
                case 3:
                    e_a = _state.error;
                    "catch";
                    return ["break", 6];
                case 4:
                    "finally0";
                    return ["yield", p];
                case 5:
                    "finally1";
                    return ["endfinally"];
                case 6:
                    "after";
                    return ["return"];
            }
        })));
    });
}
