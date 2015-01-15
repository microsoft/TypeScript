//// [awaitTypeAssertion1.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare class A {}
declare class B extends A {}
declare var a: B;
declare var p: Promise<B>;
async function f(): Promise<void> {
  var b = <A>await p;
}

//// [awaitTypeAssertion1.js]
function f() {
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    return ["yield", p];
                case 1:
                    b = _state.sent;
                    return ["return"];
            }
        })));
    });
    var b;
}
