// @target: es6
// @strictNullChecks: true

declare namespace Windows.Foundation {
    interface IPromise<TResult> {
        then<U>(success?: (value: TResult) => IPromise<U>, error?: (error: any) => IPromise<U>, progress?: (progress: any) => void): IPromise<U>;
        then<U>(success?: (value: TResult) => IPromise<U>, error?: (error: any) => U, progress?: (progress: any) => void): IPromise<U>;
        then<U>(success?: (value: TResult) => U, error?: (error: any) => IPromise<U>, progress?: (progress: any) => void): IPromise<U>;
        then<U>(success?: (value: TResult) => U, error?: (error: any) => U, progress?: (progress: any) => void): IPromise<U>;
        done<U>(success?: (value: TResult) => any, error?: (error: any) => any, progress?: (progress: any) => void): void;

        cancel(): void;
    }
}

async function sample(promise: Windows.Foundation.IPromise<number>) {
    var number = await promise;
}


declare function resolve1<T>(value: T): Promise<T>;
declare function resolve2<T>(value: T): Windows.Foundation.IPromise<T>;

async function sample2(x?: number) {
    let x1 = await resolve1(x);
    let x2 = await resolve2(x);
}
