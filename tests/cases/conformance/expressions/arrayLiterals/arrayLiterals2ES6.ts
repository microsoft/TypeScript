// @target:es6
var a = [2,3,4]
var a1 = ["hello", "world"]
var a2 = [undefined, null, undefined];
var a3 = []
var a4: number[] = [...a3];
var a5: number[] = [];

var b = [, , , ...a,"hello"];
var c = [() => 1,];
var d = [...c,,];
var e = [,,...d];
var g = [[1, 2, "hello"], ["string", true]];
var h = [...g];
var i: [number[], string[]] = [[1, 2, 3],["hello", "string"]];
var j = [...i];
var k:Array<number[]|string[]> = [...i];
interface tup {
    0: number[]|string[];
    1: number[]|string[];
}
interface myArray extends Array<Number> {}
interface myArray2 extends Array<Number|String> {}
var l: tup = [...i];  // error
var m: [number, number, number] = [...a];  // error
var n: number[] = [...a];
var o: myArray = [...a];
var p: myArray = [...a, ...a1];  // error
var q: myArray2 = [...a, ...a1];
var r = [...a2];
var r1 = [...a3];
var r2 = [...a4];
var r3:number[][] = [[...a4]];