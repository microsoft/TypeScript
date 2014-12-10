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
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    "before";
                    _state.label = 1;
                case 1:
                    "body1";
                    return ["yield", p];
                case 2:
                    "body2";
                    _state.label = 3;
                case 3:
                    if (a)
                        return ["break", 1];
                    _state.label = 4;
                case 4:
                    return ["return"];
            }
        })));
    });
}
