// Any attempt to access a private property member outside the class body that contains its declaration results in a compile-time error.

class C {
    private foo: string;
    private static bar: string;
}

class D extends C {
    baz: number;   
}

module D {
    export var y = D.bar; // error
}