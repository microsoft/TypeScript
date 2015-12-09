module T {
    var x = 2;

    module x { // error
        export class Bar {
            test: number;
        }
    }

    module z {
        var t;
    }
    var z; // error

    module y {
        var b;
    }

    class y { } // error

    var w;
    module w { } //ok

    var f;
    function f() { } //error

    function f2() { }
    var f2; // error

    var i;
    interface i { } //ok

    class C { }
    function C() { } // error

    function C2() { }
    class C2 { } // error

    function fi() { }
    interface fi { } // ok

    class cli { }
    interface cli { }

    interface cli2 { }
    class cli2 { }
}