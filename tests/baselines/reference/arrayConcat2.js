//// [arrayConcat2.ts]
var a: string[] = [];
a.concat("hello", 'world');

a.concat('Hello');

var b = new Array<string>();
b.concat('hello');

// #26378

[""].concat([1]);

// #26976

[].concat([""]);


//// [arrayConcat2.js]
var a = [];
a.concat("hello", 'world');
a.concat('Hello');
var b = new Array();
b.concat('hello');
// #26378
[""].concat([1]);
// #26976
[].concat([""]);
