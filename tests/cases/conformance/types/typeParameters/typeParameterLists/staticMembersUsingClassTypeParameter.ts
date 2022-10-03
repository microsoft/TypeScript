// BUG 745747
class C<T> {
    static x: T;
    static f(x: T) {}
}

class C2<T, U> {
    static x: U;
    static f(x: U) { }
}

class C3<T extends Date> {
    static x: T;
    static f(x: T) { }
}