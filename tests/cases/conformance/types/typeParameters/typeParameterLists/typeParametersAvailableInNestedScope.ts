class C<T> {
    data: T;

    x = <U>(a: U) => {
        var y: T;
        return y;
    }

    foo() {
        function temp<U>(a: U) {
            var y: T;
            return y;
        }
        return temp(<T>null);
    }
}

var c = new C<number>();
c.data = c.x(null);
c.data = c.foo();
