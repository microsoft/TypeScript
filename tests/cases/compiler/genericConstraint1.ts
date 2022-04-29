class C<T> {
    public bar2<U extends T>(x: T, y: U): T {
        return null;
    }
}

var x = new C<number>();
x.bar2<string>(2, "");