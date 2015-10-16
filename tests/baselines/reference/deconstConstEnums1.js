//// [deconstConstEnums1.ts]

const enum Foo {
	Item1,
	Item2
}

let a = Foo.Item1;
let b = Foo.Item2;

//// [deconstConstEnums1.js]
var Foo;
(function (Foo) {
    Foo[Foo["Item1"] = 0] = "Item1";
    Foo[Foo["Item2"] = 1] = "Item2";
})(Foo || (Foo = {}));
var a = 0 /* Item1 */;
var b = 1 /* Item2 */;


//// [deconstConstEnums1.d.ts]
declare enum Foo {
    Item1 = 0,
    Item2 = 1,
}
declare let a: Foo;
declare let b: Foo;
