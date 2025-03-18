//// [tests/cases/compiler/defaultIndexProps1.ts] ////

//// [defaultIndexProps1.ts]
class Foo {
	public v = "Yo";
}

var f = new Foo();

var q = f["v"];

var o = {v:"Yo2"};

var q2 = o["v"];


//// [defaultIndexProps1.js]
class Foo {
    v = "Yo";
}
var f = new Foo();
var q = f["v"];
var o = { v: "Yo2" };
var q2 = o["v"];
