function f<T>() { }
var r = f<number>; // parse error

class C<T> {
    foo: T;
}
var c = new C<number>; // parse error

