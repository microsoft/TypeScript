// doc 2.2
// private property members can be accessed only within the struct body that contains their declaration

struct Base {
    private foo: string;
}

struct Derived extends Base {
	// error,  Only public methods of the base class are accessible via the 'super' keyword
    x = super.foo;

    y() {
        return super.foo; // error
    }
    z: typeof super.foo; // error

    a: this.foo; // error
}