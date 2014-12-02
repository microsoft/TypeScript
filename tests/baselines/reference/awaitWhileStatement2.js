//// [awaitWhileStatement2.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: boolean;
declare var p: Promise<boolean>;
async function func(): Promise<void> {
    "before";
    while (a) {
        "body1";
        await p;
        "body2";
    }
    "after";
}

//// [awaitWhileStatement2.js]
function func() {
    return new Promise(function (__resolve) {
        __resolve(__awaiter(__generator(function (__state) {
            switch (__state.label) {
                case 0:
                    "before";
                    __state.label = 1;
                case 1:
                    if (!(a)) { return ["break", 3]; }
                    "body1";
                    return ["yield", p];
                case 2:
                    "body2";
                    return ["break", 1];
                case 3:
                    "after";
                    return ["return"];
            }
        })));
    });
}
