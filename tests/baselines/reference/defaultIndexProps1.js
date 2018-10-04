//// [defaultIndexProps1.ts]
class Foo {
	public v = "Yo";
}

var f = new Foo();

var q = f["v"];

var o = {v:"Yo2"};

var q2 = o["v"];


//// [defaultIndexProps1.js]
var Foo = /** @class */ (function () {
    function Foo() {
        this.v = "Yo";
    }
    return Foo;
}());
var f = new Foo();
var q = f["v"];
var o = { v: "Yo2" };
var q2 = o["v"];
