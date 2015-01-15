//// [awaitTemplateExpression3.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: number;
declare var p: Promise<number>;
async function f(): Promise<void> {
  var b = `beforeValue${a}beforeAwait${await p}afterAwait${a}afterValue`;
}

//// [awaitTemplateExpression3.js]
function f() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    _a = a;
                    return ["yield", p];
                case 1:
                    b = "beforeValue" + _a + "beforeAwait" + _state.sent + "afterAwait" + a + "afterValue";
                    return ["return"];
            }
        })));
    });
    var b, _a;
}
