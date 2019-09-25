var a: string[] = [];
a.concat("hello", 'world');

a.concat('Hello');

var b = new Array<string>();
b.concat('hello');

// #26378

[""].concat([1]);

// #26976

// @strictNullChecks: true
[].concat([""]);
