// two interfaces with the same root module should merge

// root module now multiple module declarations
module M2 {
    export interface A {
        foo: string;
    }

    var a: A;
    var r1 = a.foo;
    var r2 = a.bar;
}

module M2 {
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
module M2 {
    export module M3 {
        export interface A {
            foo: string;
        }

        var a: A;
        var r1 = a.foo;
        var r2 = a.bar;
    }
}

module M2 {
    export module M3 {
        export interface A {
            bar: number;
        }

        var a: A;

        var r1 = a.foo
        var r2 = a.bar;
        var r3 = a.baz;
    }
}

module M2 {
    export module M3 {
        export interface A {
            baz: boolean;
        }

        var a: A;
        var r1 = a.foo
        var r2 = a.bar;
        var r3 = a.baz;
    }
}