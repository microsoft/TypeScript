// doc 2.2
// private property members can be accessed only within the struct body that contains their declaration

struct C {
    private foo: string;
    private static bar: string;
}

module C {
    export var y = C.bar; // error
}