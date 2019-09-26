//// [arrayConcat2.ts]
var a: string[] = [];
a.concat("hello", 'world');

a.concat('Hello');

var b = new Array<string>();
b.concat('hello');

// #19535

const [x] = (undefined as unknown as string[][]).concat([""]);
x == "";


//// [arrayConcat2.js]
var a = [];
a.concat("hello", 'world');
a.concat('Hello');
var b = new Array();
b.concat('hello');
// #19535
var x = undefined.concat([""])[0];
x == "";
