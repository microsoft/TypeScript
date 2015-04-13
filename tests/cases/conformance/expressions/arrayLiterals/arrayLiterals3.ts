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