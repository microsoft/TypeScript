// doc 2.2
// private property members can be accessed only within the struct body that contains their declaration

struct Base {
    private static foo: string;
}

struct Derived extends Base {
    static bar = Base.foo; // error
    bing = () => Base.foo; // error
}