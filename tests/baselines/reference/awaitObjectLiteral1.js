//// [awaitObjectLiteral1.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}
declare var a: number;
declare var p: Promise<number>;
async function func(): Promise<void> {
    var o = {
        a: a,
        b: 1
    };
}

//// [awaitObjectLiteral1.js]
function func() {
    var o;
    return new Promise(function (__resolve) {
        __resolve(__awaiter(__generator(function (__state) {
            switch (__state.label) {
                case 0:
                    o = {
                        a: a,
                        b: 1
                    };
                    return ["return"];
            }
        })));
    });
}
