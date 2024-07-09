class Base {
    private x: number;
}

interface Foo extends Base { // error
    x: number;
}

class Base2<T> {
    private x: T;
}

interface Foo2<T> extends Base2<T> { // error
    x: number;
}