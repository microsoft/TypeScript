//// [awaitForStatement6.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var p: Promise<number>;
async function func(): Promise<void> {
    "before";
    for (var i = 0; i < 1; i++) {
        "body1";
        await p;
        "body2";
    }
    "after";
}


//// [awaitForStatement6.js]
function func() {
    var i;
    return new Promise(function (__resolve) {
        __resolve(__awaiter(__generator(function (__state) {
            switch (__state.label) {
                case 0:
                    "before";
                    i = 0;
                    __state.label = 1;
                case 1:
                    if (!(i < 1)) { return ["break", 4]; }
                    "body1";
                    return ["yield", p];
                case 2:
                    "body2";
                    __state.label = 3;
                case 3:
                    i++;
                    return ["break", 1];
                case 4:
                    "after";
                    return ["return"];
            }
        })));
    });
}
