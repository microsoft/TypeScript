//// [awaitBindingElement5.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: number;
declare var o: { x: number; };
declare var pa: Promise<number>;
declare var po: Promise<{x: number;}>;
async function func({ x = await pa }): Promise<void> {
}


//// [awaitBindingElement5.js]
function func(_a) {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    _b = _a.x;
                    if (!(_b === void 0))
                        return ["break", 2];
                    return ["yield", pa];
                case 1:
                    _c = _state.sent;
                    return ["break", 3];
                case 2:
                    _c = _b;
                    _state.label = 3;
                case 3:
                    x = _c;
                    return ["return"];
            }
        })));
    });
    var _b, x, _c;
}
