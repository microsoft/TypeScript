function M() {
    var m = class C<X> {
        f<T>() {
            var t: T;
            var x: X;
            return { t, x };
        }
    }

    var v = new m<number>();
    return v.f<string>();
}