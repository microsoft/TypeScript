// bug 755602: ICE compiling generic derived class with static method with same name

class Foo<T> {
    static getFoo() {
    }
}

class Bar<T> extends Foo<T> {
    static getFoo() {
    }
}
