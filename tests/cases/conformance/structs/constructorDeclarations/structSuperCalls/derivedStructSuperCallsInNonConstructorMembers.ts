// doc 3.2
// error to use super calls outside a constructor or in nested functions inside constructors

struct Base {
    x: string;
}

struct Derived extends Base {
    a: super(); // error
    b() {
        super(); // error
    }

    static a: super(); // error
    static b() {
        super(); // error
    }
}