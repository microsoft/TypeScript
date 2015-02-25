//// [ipromise4.ts]
declare module Windows.Foundation {
    export interface IPromise<T> {
        then<U>(success?: (value: T) => IPromise<U>, error?: (error: any) => IPromise<U>, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
        then<U>(success?: (value: T) => IPromise<U>, error?: (error: any) => U, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
        then<U>(success?: (value: T) => U, error?: (error: any) => IPromise<U>, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
        then<U>(success?: (value: T) => U, error?: (error: any) => U, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
        done? <U>(success?: (value: T) => any, error?: (error: any) => any, progress?: (progress: any) => void ): void;
    }
}
 
var p: Windows.Foundation.IPromise<number> = null;
 
p.then(function (x) { } ); // should not error
p.then(function (x) { return "hello"; } ).then(function (x) { return x } ); // should not error
 


//// [ipromise4.js]
var p = null;
p.then(function (x) { }); // should not error
p.then(function (x) { return "hello"; }).then(function (x) { return x; }); // should not error
