//// [awaitSwitchStatement2.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: any;
declare var b: any;
declare var p: Promise<any>;
async function func(): Promise<void> {
    "before";
    switch (await p) {
        case b:
            "body0";
            break;
        case 1:
        default:
            "body1";
    }
    "after";
}

//// [awaitSwitchStatement2.js]
function func() {
    return new Promise(function (__resolve) {
        __resolve(__awaiter(__generator(function (__state) {
            switch (__state.label) {
                case 0:
                    "before";
                    return ["yield", p];
                case 1:
                    switch (__state.sent) {
                        case b:
                            "body0";
                            break;
                        case 1:
                        default:
                            "body1";
                    }
                    "after";
                    return ["return"];
            }
        })));
    });
}
