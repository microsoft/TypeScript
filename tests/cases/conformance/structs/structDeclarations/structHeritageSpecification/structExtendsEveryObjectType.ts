interface I {
    foo: string;
}
struct C extends I { } // error, cannot find I

struct C2 extends { foo: string; } { } // error
var x: { foo: string; }
struct C3 extends x { } // error

module M { export var x = 1; }
struct C4 extends M { } // error

function foo() { }
struct C5 extends foo { } // error

struct C6 extends []{ } // error