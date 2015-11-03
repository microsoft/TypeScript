class A<T> {
    genericVar: T
}
class B3 extends A<number> {
}
function B1<U>() {
    // class expression can use T
    return class extends A<U> { }
}
class B2<V> {
    anon = class extends A<V> { }
}
// extends can call B
class K extends B1<number>() {
    namae: string;
}
class C extends (new B2<number>().anon) {
    name: string;
}
var c = new C();
var k = new K();
var b3 = new B3();
c.genericVar = 12;
k.genericVar = 12;
b3.genericVar = 12
