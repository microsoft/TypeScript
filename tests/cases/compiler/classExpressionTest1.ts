function M() {
    class C<X> {
        f<T>() {
            var t: T;
            var x: X;
            return { t, x };
        }
    }

    var v = new C<number>();
    return v.f<string>();
}