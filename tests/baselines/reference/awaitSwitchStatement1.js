//// [awaitSwitchStatement1.ts]
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
        case b:
            "body0";
            break;
        case 1: 
        default:
            "body1";
    }
    "after";
}

//// [awaitSwitchStatement1.js]
function func() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            "before";
            switch (a) {
                case b:
                    "body0";
                    break;
                case 1:
                default:
                    "body1";
            }
            "after";
            return [2 /*return*/];
        })));
    });
}
