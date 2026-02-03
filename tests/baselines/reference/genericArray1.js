//// [tests/cases/compiler/genericArray1.ts] ////

//// [genericArray1.ts]
/*
var n: number[];

interface Array<T> {
map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
}

interface String{
	length: number;
}
*/

var lengths = ["a", "b", "c"].map(x => x.length);


//// [genericArray1.js]
/*
var n: number[];

interface Array<T> {
map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
}

interface String{
    length: number;
}
*/
var lengths = ["a", "b", "c"].map(function (x) { return x.length; });


//// [genericArray1.d.ts]
declare var lengths: number[];
