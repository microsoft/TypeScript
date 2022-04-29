interface I {
    foo: string;
}
class C extends I { } // error

class C2 extends { foo: string; } { } // error
var x: { foo: string; }
class C3 extends x { } // error

module M { export var x = 1; }
class C4 extends M { } // error

function foo() { }
class C5 extends foo { } // error

class C6 extends []{ } // error