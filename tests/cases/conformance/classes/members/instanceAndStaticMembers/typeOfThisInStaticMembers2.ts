class C {
    static foo = this; // error
}

class C2<T> {
    static foo = this; // error
}