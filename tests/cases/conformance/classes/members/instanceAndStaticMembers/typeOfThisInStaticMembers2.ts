// @target: es2015
class C {
    static foo = this; // ok
}

class C2<T> {
    static foo = this; // ok
}