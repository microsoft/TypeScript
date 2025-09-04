// two interfaces with the same root module should merge

// root module now multiple module declarations
namespace M2 {
    export interface A {
        foo: string;
    }

    var a: A;
    var r1 = a.foo;
    var r2 = a.bar;
}

namespace M2 {
    export interface A {
        bar: number;
    }

    export interface A {
        baz: boolean;
    }

    var a: A;
    var r1 = a.foo;
    var r2 = a.bar;
    var r3 = a.baz; 
}

// same as above but with an additional level of nesting and third module declaration
namespace M2 {
    export namespace M3 {
        export interface A {
            foo: string;
        }

        var a: A;
        var r1 = a.foo;
        var r2 = a.bar;
    }
}

namespace M2 {
    export namespace M3 {
        export interface A {
            bar: number;
        }

        var a: A;

        var r1 = a.foo
        var r2 = a.bar;
        var r3 = a.baz;
    }
}

namespace M2 {
    export namespace M3 {
        export interface A {
            baz: boolean;
        }

        var a: A;
        var r1 = a.foo
        var r2 = a.bar;
        var r3 = a.baz;
    }
}