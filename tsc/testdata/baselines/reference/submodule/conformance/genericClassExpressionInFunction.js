//// [tests/cases/conformance/classes/classExpressions/genericClassExpressionInFunction.ts] ////

//// [genericClassExpressionInFunction.ts]
class A<T> {
    genericVar: T
}
function B1<U>() {
    // class expression can use T
    return class extends A<U> { }
}
class B2<V> {
    anon = class extends A<V> { }
}
function B3<W>() {
    return class Inner<TInner> extends A<W> { }
}
// extends can call B
class K extends B1<number>() {
    namae: string;
}
class C extends (new B2<number>().anon) {
    name: string;
}
let b3Number = B3<number>();
class S extends b3Number<string> {
    nom: string;
}
var c = new C();
var k = new K();
var s = new S();
c.genericVar = 12;
k.genericVar = 12;
s.genericVar = 12;


//// [genericClassExpressionInFunction.js]
class A {
    genericVar;
}
function B1() {
    // class expression can use T
    return class extends A {
    };
}
class B2 {
    anon = class extends A {
    };
}
function B3() {
    return class Inner extends A {
    };
}
// extends can call B
class K extends B1() {
    namae;
}
class C extends (new B2().anon) {
    name;
}
let b3Number = B3();
class S extends b3Number {
    nom;
}
var c = new C();
var k = new K();
var s = new S();
c.genericVar = 12;
k.genericVar = 12;
s.genericVar = 12;
