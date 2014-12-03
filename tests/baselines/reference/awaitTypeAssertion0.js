//// [awaitTypeAssertion0.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare class A {}
declare class B extends A {}
declare var a: B;
declare var p: Promise<B>;
async function f(): Promise<void> {
  var b = <A>a;
}

//// [awaitTypeAssertion0.js]
function f() {
    var b;
    return new Promise(function (_resolve) {
        _resolve(__awaiter(__generator(function (_state) {
            switch (_state.label) {
                case 0:
                    b = a;
                    return ["return"];
            }
        })));
    });
}
