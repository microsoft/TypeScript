//// [tests/cases/compiler/funduleUsedAcrossFileBoundary.ts] ////

//// [funduleUsedAcrossFileBoundary_file1.ts]
declare function Q<T>(value: T): string;
declare module Q {
    interface Promise<T> {
        foo: string;
    }
    export function defer<T>(): string;
}

//// [funduleUsedAcrossFileBoundary_file2.ts]
function promiseWithCancellation<T>(promise: Q.Promise<T>) {
    var deferred = Q.defer<T>(); // used to be an error
}

//// [funduleUsedAcrossFileBoundary_file1.js]
//// [funduleUsedAcrossFileBoundary_file2.js]
function promiseWithCancellation(promise) {
    var deferred = Q.defer(); // used to be an error
}
