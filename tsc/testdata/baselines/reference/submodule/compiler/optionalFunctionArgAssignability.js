//// [tests/cases/compiler/optionalFunctionArgAssignability.ts] ////

//// [optionalFunctionArgAssignability.ts]
interface Promise<T> {
    then<U>(onFulfill?: (value: T) => U, onReject?: (reason: any) => U): Promise<U>;
}
 
var a = function then<U>(onFulfill?: (value: string) => U, onReject?: (reason: any) => U): Promise<U> { return null };
var b = function then<U>(onFulFill?: (value: number) => U, onReject?: (reason: any) => U): Promise<U> { return null };
a = b; // error because number is not assignable to string


//// [optionalFunctionArgAssignability.js]
var a = function then(onFulfill, onReject) { return null; };
var b = function then(onFulFill, onReject) { return null; };
a = b; // error because number is not assignable to string
