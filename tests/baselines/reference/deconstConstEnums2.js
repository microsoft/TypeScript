//// [deconstConstEnums2.ts]

const enum Foo {
	Item1,
	Item2
}

let a = Foo.Item1;
let b = Foo.Item2;

//// [deconstConstEnums2.js]
var a = 0 /* Item1 */;
var b = 1 /* Item2 */;


//// [deconstConstEnums2.d.ts]
declare enum Foo {
    Item1 = 0,
    Item2 = 1,
}
declare let a: Foo;
declare let b: Foo;
