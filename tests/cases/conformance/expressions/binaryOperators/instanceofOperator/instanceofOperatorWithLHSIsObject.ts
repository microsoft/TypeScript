class C { }

var x1: any;
var x2: Function;

var a: {};
var b: Object;
var c: C;
var d: string | C;

var r1 = a instanceof x1;
var r2 = b instanceof x2;
var r3 = c instanceof x1;
var r4 = d instanceof x1;
