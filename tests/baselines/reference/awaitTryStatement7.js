//// [awaitTryStatement7.ts]
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
        "catch0";
        await p;
        "catch1";
    }
    "after";
}


//// [awaitTryStatement7.js]
function func() {
    var e;
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
                    _state.trys.push([2,3,,5])
                    "try";
                    return ["break", 5];
                case 3:
                    e = _state.error;
                    "catch0";
                    return ["yield", p];
                case 4:
                    "catch1";
                    return ["break", 5];
                case 5:
                    "after";
                    return ["return"];
            }
        })));
    });
}
