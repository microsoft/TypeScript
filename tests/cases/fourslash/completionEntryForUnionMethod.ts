///<reference path="fourslash.ts" />

////var y: Array<string>|Array<number>;
////y.map/**/(

goTo.marker();
verify.quickInfoIs("(property) map: (<U, V>(callbackfn: (this: V, value: string, index: number, array: string[]) => U, thisArg?: V) => U[]) | (<U, V>(callbackfn: (this: V, value: number, index: number, array: number[]) => U, thisArg?: V) => U[])");
verify.completionListContains('map', "(property) map: (<U, V>(callbackfn: (this: V, value: string, index: number, array: string[]) => U, thisArg?: V) => U[]) | (<U, V>(callbackfn: (this: V, value: number, index: number, array: number[]) => U, thisArg?: V) => U[])");
