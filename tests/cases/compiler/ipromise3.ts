interface IPromise3<T> {
    then<U>(success?: (value: T) => IPromise3<U>, error?: (error: any) => IPromise3<U>, progress?: (progress: any) => void ): IPromise3<U>;
    then<U>(success?: (value: T) => IPromise3<U>, error?: (error: any) => U, progress?: (progress: any) => void ): IPromise3<U>;
    then<U>(success?: (value: T) => U, error?: (error: any) => IPromise3<U>, progress?: (progress: any) => void ): IPromise3<U>;
    then<U>(success?: (value: T) => U, error?: (error: any) => U, progress?: (progress: any) => void ): IPromise3<U>;
    done? <U>(success?: (value: T) => any, error?: (error: any) => any, progress?: (progress: any) => void ): void;
}
var p1: IPromise3<string>;
var p2: IPromise3<string> = p1.then(function (x) {
    return x;
});
