// @allowUnreachableCode: true

interface IPromise<T> {
    then(successCallback: (promiseValue: T) => any, errorCallback?: (reason: any) => any): IPromise<any>;
}

function f() {
    if (true) return b();
    return d();
}


function b(): IPromise<void> { return null; }
function d(): IPromise<any> { return null; }