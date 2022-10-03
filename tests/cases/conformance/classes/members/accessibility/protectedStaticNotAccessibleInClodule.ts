// Any attempt to access a private property member outside the class body that contains its declaration results in a compile-time error.

class C {
    public static foo: string;
    protected static bar: string;
}

module C {
    export var f = C.foo; // OK
    export var b = C.bar; // error
}