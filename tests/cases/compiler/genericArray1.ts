// @declaration: true
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
