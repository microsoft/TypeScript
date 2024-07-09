class C<T> {
    foo: number
    bar(): T {
        return null;
    }
}
class D extends C<string> implements C<number> {
    baz() { }
}

var d: D = new D();
var r: string = d.foo;
var r2: number = d.foo;

var r3: string = d.bar();
var r4: number = d.bar();