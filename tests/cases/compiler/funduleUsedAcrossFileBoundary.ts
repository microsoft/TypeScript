// @Filename: funduleUsedAcrossFileBoundary_file1.ts
declare function Q<T>(value: T): string;
declare module Q {
    interface Promise<T> {
        foo: string;
    }
    export function defer<T>(): string;
}

// @Filename: funduleUsedAcrossFileBoundary_file2.ts
function promiseWithCancellation<T>(promise: Q.Promise<T>) {
    var deferred = Q.defer<T>(); // used to be an error
}