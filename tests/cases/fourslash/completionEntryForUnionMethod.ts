///<reference path="fourslash.ts" />

////var y: Array<string>|Array<number>;
////y.map/**/(

goTo.marker();
verify.quickInfoIs("(property) map: (<U>(callbackfn: (value: string, index: number, array: string[]) => U, thisArg?: any) => U[]) | (<U>(callbackfn: (value: number, index: number, array: number[]) => U, thisArg?: any) => U[])");
verify.completionListContains('map', "(property) map: (<U>(callbackfn: (value: string, index: number, array: string[]) => U, thisArg?: any) => U[]) | (<U>(callbackfn: (value: number, index: number, array: number[]) => U, thisArg?: any) => U[])");