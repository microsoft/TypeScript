//// [asyncEnum.ts]
declare class Promise<T> {
    constructor(init: (resolve: (value?: T | IPromise<T>) => void, reject: (reason?: any) => void) => void);
    then<TResult>(onfulfilled?: (value: T) => TResult | IPromise<TResult>, onrejected?: (reason: any) => TResult | IPromise<TResult>): Promise<TResult>;
}

async enum E {  
  Value
}

//// [asyncEnum.js]
var E;
(function (E) {
    E[E["Value"] = 0] = "Value";
})(E || (E = {}));
