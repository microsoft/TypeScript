// @declaration: true
var {a, b} = { a:10, b:"10"};
var {c, d}: {c:string, d:string} = { c:"true", d:"false" };
let {k, j} = { k:true, j:{a:10}};

var a1 = ["string", 10];
var [x] = a1;
var [x, y] = a1;
var [x, y, z] = a1;
let [x1] = a1;