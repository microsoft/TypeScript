declare module Windows.Foundation {
    export interface IPromise<T> {
        then<U>(success?: (value: T) => IPromise<U>, error?: (error: any) => IPromise<U>, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
        then<U>(success?: (value: T) => IPromise<U>, error?: (error: any) => U, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
        then<U>(success?: (value: T) => U, error?: (error: any) => IPromise<U>, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
        then<U>(success?: (value: T) => U, error?: (error: any) => U, progress?: (progress: any) => void ): Windows.Foundation.IPromise<U>;
        done<U>(success?: (value: T) => any, error?: (error: any) => any, progress?: (progress: any) => void ): void;
        value: T;
    }
}

var p: Windows.Foundation.IPromise<string>;

var p2 = p.then(function (s) {
    return 34;
} );


var x: number = p2.value;

