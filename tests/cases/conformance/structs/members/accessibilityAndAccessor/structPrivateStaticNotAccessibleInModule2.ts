// doc 2.2
// private property members can be accessed only within the struct body that contains their declaration

struct C {
    private foo: string;
    private static bar: string;
}

struct D extends C {
    baz: number;   
}

module D {
    export var y = D.bar; // error
}