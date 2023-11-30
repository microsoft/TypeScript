///<reference path="fourslash.ts" />

////var y: Array<string>|Array<number>;
////y.map/**/(

const text = "(method) Array<T>.map<unknown>(callbackfn: ((value: string, index: number, array: string[]) => unknown) & ((value: number, index: number, array: number[]) => unknown), thisArg?: any): unknown[]";
const documentation = "Calls a defined callback function on each element of an array, and returns an array that contains the results.";

verify.quickInfoAt("", text, documentation);
verify.baselineCompletions()
