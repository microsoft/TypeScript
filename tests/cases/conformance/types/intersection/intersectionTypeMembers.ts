// An intersection type has those members that are present in any of its constituent types,
// with types that are intersections of the respective members in the constituent types

interface A { a: string }
interface B { b: string }
interface C { c: string }

var abc: A & B & C;
abc.a = "hello";
abc.b = "hello";
abc.c = "hello";

interface X { x: A }
interface Y { x: B }
interface Z { x: C }

var xyz: X & Y & Z;
xyz.x.a = "hello";
xyz.x.b = "hello";
xyz.x.c = "hello";

type F1 = (x: string) => string;
type F2 = (x: number) => number;

var f: F1 & F2;
var s = f("hello");
var n = f(42);
