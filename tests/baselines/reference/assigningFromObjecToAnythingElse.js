//// [assigningFromObjecToAnythingElse.ts]
var x: Object;
var y: RegExp;
y = x;

var a: String = Object.create<Object>("");
var c: String = Object.create<Number>(1);

var w: Error = new Object();


//// [assigningFromObjecToAnythingElse.js]
var x;
var y;
y = x;
var a = Object.create("");
var c = Object.create(1);
var w = new Object();
