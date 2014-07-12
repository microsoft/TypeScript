class A<T> { foo: T; }

class C<T> {
    data: A<T>;
    get x(): A<T> {
        return this.data;
    }
    set x(v: A<string>) {
        this.data = v;
    }
}

var x = new C();
var r = x.x;
x.x = r;