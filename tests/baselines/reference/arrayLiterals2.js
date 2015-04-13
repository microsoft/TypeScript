//// [arrayLiterals2.ts]
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

//// [arrayLiterals2.js]
var a = [2, 3, 4];
var a1 = ["hello", "world"];
var a2 = [undefined, null, undefined];
var a3 = [];
var a4 = a3;
var a5 = [];
var b = [, , ].concat(a, ["hello"]);
var c = [function () { return 1; },];
var d = c.concat([,]);
var e = [, ].concat(d);
var g = [[1, 2, "hello"], ["string", true]];
var h = g;
var i = [[1, 2, 3], ["hello", "string"]];
var j = i;
var k = i;
var l = i; // error
var m = a; // error
var n = a;
var o = a;
var p = a.concat(a1); // error
var q = a.concat(a1);
var r = a2;
var r1 = a3;
var r2 = a4;
var r3 = [a4];
