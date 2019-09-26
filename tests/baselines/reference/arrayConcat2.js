//// [arrayConcat2.ts]
var a: string[] = [];
a.concat("hello", 'world');

a.concat('Hello');

var b = new Array<string>();
b.concat('hello');

const expected1: undefined = undefined as Flatten<undefined>;

// #19535

let [actual2] = (undefined as unknown as string[][]).concat([""]);
const expected2: string | string[] = actual2;
actual2 = undefined as unknown as string | string[];

// #26378

let [actual3] = [""].concat([1]);
const expected3: string | number = actual3;
actual3 = undefined as unknown as string | number;

// #26976

[].concat([""]);


//// [arrayConcat2.js]
var a = [];
a.concat("hello", 'world');
a.concat('Hello');
var b = new Array();
b.concat('hello');
var expected1 = undefined;
// #19535
var actual2 = undefined.concat([""])[0];
var expected2 = actual2;
actual2 = undefined;
// #26378
var actual3 = [""].concat([1])[0];
var expected3 = actual3;
actual3 = undefined;
// #26976
[].concat([""]);
