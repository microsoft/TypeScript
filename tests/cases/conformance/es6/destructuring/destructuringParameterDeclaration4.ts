interface F { }
class C implements F{
}
function foo<T>(...a: T[]) { }
function foo1<T extends String>(...a: T[]) { }
function bar<T extends C>({x} = { x: new C() }) { }
function baz<T extends F>({x}: { x: F }) { }
function baz1<T extends C>({x}: { x: C }) { }
function baz2<T extends C>({x}: { x: C }) { }

var obj = new C();
baz1({ x: obj });
baz({ x: new C() });
baz({ x: {} });
foo("hello", 1, 2);
foo<number|string>("hello", 1, 2);
foo("hello", "world");

