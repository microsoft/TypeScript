//// [tests/cases/compiler/genericGetter3.ts] ////

//// [genericGetter3.ts]
class A<T> { }

class C<T> {
    data: A<T>;
    get x(): A<T> {
        return this.data;
    }
}

var c = new C<number>();
var r: string = c.x;

//// [genericGetter3.js]
class A {
}
class C {
    data;
    get x() {
        return this.data;
    }
}
var c = new C();
var r = c.x;
