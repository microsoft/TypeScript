//// [awaitReturnStatement3.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: number;
declare var p: Promise<number>;
async function f(): Promise<number> {
  return await p;
}

//// [awaitReturnStatement3.js]
function f() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    return ["yield", p];
                case 1:
                    return ["return", _state.sent];
            }
        })));
    });
}
