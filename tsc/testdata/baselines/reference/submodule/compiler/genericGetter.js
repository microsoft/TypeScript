//// [tests/cases/compiler/genericGetter.ts] ////

//// [genericGetter.ts]
class C<T> {
    data: T;
    get x(): T {
        return this.data;
    }
}

var c = new C<number>();
var r: string = c.x;

//// [genericGetter.js]
class C {
    data;
    get x() {
        return this.data;
    }
}
var c = new C();
var r = c.x;
