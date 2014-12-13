//// [awaitBreakStatement1.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: number;
declare var p: Promise<number>;
async function f(): Promise<void> {
  do {
    await p;
    break;
  } while (true);
}

//// [awaitBreakStatement1.js]
function f() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    return ["yield", p];
                case 1:
                    return ["break", 3];
                case 2:
                    if (true)
                        return ["break", 0];
                    _state.label = 3;
                case 3: return ["return"];
            }
        })));
    });
}
