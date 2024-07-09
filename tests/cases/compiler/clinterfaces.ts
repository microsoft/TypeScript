//@module: commonjs
module M {
    class C { }
    interface C { }
    interface D { }
    class D { }
}

interface Foo<T> {
    a: string;
}

class Foo<T>{
    b: number;
}

class Bar<T>{
    b: number;
}

interface Bar<T> {
    a: string;
}

export = Foo;
