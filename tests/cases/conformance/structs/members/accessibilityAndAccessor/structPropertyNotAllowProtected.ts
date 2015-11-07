// doc 2.2
// no protected property members in struct.

struct C {
    protected x: string; // error
    protected foo() { } // error

    protected static a: string; // error
    protected static foo() { } // error
}