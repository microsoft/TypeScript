//// [defaultIndexProps2.ts]
class Foo {
	public v = "Yo";
}

var f = new Foo();

// WScript.Echo(f[0]);

var o = {v:"Yo2"};

// WScript.Echo(o[0]);

1[0];
var q = "s"[0];


//// [defaultIndexProps2.js]
var Foo = /** @class */ (function () {
    function Foo() {
        this.v = "Yo";
    }
    return Foo;
}());
var f = new Foo();
// WScript.Echo(f[0]);
var o = { v: "Yo2" };
// WScript.Echo(o[0]);
1[0];
var q = "s"[0];
