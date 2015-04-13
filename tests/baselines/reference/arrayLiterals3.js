//// [arrayLiterals3.ts]
interface I0 extends Array<String|Number|Boolean> {
    0: number;
    1: number;
    2: string;
    3: boolean;
}
var [a, b]: [number, number] = [1, 2];
var [a1, b1]: [number, number] = [1, 2, "string", true];   // error
var [a2, b2]: (number| string)[] = [1, 2, 3, "string"];
var [c1, c2, c3]: I0 = [10, 11, "string", true];
interface I extends Array<String|Number>{
    0: string|number;
    1: string|number;
    2: string|number;
}
interface I2 extends Array<String|Number> {
    0: number;
    1: number;
    2: string|number;
}
var tup: [number, number, string] = [1, 2, "world"];
var [c, d, e]: I = tup;
var [f, g]: I2 = tup;
var h1: string| number;
var [f1, g1,h1]: I2 = tup;
h1 = g1;

var arr1 = [1, 2, 3];
var arr2 = [true, false, true];
var arr3 = [true]
var [[foo1, foo2, foo3], [boo1, boo2, boo3]] = [[...arr1], [...arr2]];
var [bar1, bar2, bar3, bar1, bar2, bar3] = [...arr1, ...arr2];
var [bar1, bar2, bar3, bar1, bar2] = [...arr1, ...arr3];
var [[r, s], t] = [[...arr1], "hello"];
var [[r1, s1], t1] = [[...arr1], ...["hello"]];  // error
var [x] = [...["word"]];
var [...y] = [...["word"]];
var z = [...[...["word"]]];
function foobar() {
    return [...arguments];
}
var [...as] = [[, , , , ]];

//// [arrayLiterals3.js]
var _a = [1, 2], a = _a[0], b = _a[1];
var _b = [1, 2, "string", true], a1 = _b[0], b1 = _b[1]; // error
var _c = [1, 2, 3, "string"], a2 = _c[0], b2 = _c[1];
var _d = [10, 11, "string", true], c1 = _d[0], c2 = _d[1], c3 = _d[2];
var tup = [1, 2, "world"];
var c = tup[0], d = tup[1], e = tup[2];
var f = tup[0], g = tup[1];
var h1;
var f1 = tup[0], g1 = tup[1], h1 = tup[2];
h1 = g1;
var arr1 = [1, 2, 3];
var arr2 = [true, false, true];
var arr3 = [true];
var _e = [arr1, arr2], _f = _e[0], foo1 = _f[0], foo2 = _f[1], foo3 = _f[2], _g = _e[1], boo1 = _g[0], boo2 = _g[1], boo3 = _g[2];
var _h = arr1.concat(arr2), bar1 = _h[0], bar2 = _h[1], bar3 = _h[2], bar1 = _h[3], bar2 = _h[4], bar3 = _h[5];
var _j = arr1.concat(arr3), bar1 = _j[0], bar2 = _j[1], bar3 = _j[2], bar1 = _j[3], bar2 = _j[4];
var _k = [arr1, "hello"], _l = _k[0], r = _l[0], s = _l[1], t = _k[1];
var _m = [arr1].concat(["hello"]), _o = _m[0], r1 = _o[0], s1 = _o[1], t1 = _m[1]; // error
var x = (["word"])[0];
var _p = ["word"], y = _p.slice(0);
var z = ["word"];
function foobar() {
    return arguments;
}
var _q = [[, , , ,]], as = _q.slice(0);
