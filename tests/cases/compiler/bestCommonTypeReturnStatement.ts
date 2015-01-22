interface IPromise_<T> {
    then(successCallback: (promiseValue: T) => any, errorCallback?: (reason: any) => any): IPromise_<any>;
}

function f() {
    if (true) return b();
    return d();
}


function b(): IPromise_<void> { return null; }
function d(): IPromise_<any> { return null; }