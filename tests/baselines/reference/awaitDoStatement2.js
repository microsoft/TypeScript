//// [awaitDoStatement2.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: boolean;
declare var p: Promise<boolean>;
async function func(): Promise<void> {
    "before";
    do {
        "body1";
        await p;
        "body2";
    } while (a);
}

//// [awaitDoStatement2.js]
function func() {
    return new Promise(function (__resolve) {
        __resolve(__awaiter(__generator(function (__state) {
            switch (__state.label) {
                case 0:
                    "before";
                    __state.label = 1;
                case 1:
                    "body1";
                    return ["yield", p];
                case 2:
                    "body2";
                    __state.label = 3;
                case 3:
                    if (a) { return ["break", 1]; }
                    __state.label = 4;
                case 4:
                    return ["return"];
            }
        })));
    });
}
