module M {
    export var x = 3;
    class c {
        fn(M, p = x) { }
    }
}

module M {
    class d {
        fn2() {
            var M;
            var p = x;
        }
    }
}

module M {
    class e {
        fn3() {
            function M() {
                var p = x;
            }
        }
    }
}

module M { // Shouldnt bn _M
    class f {
        M() {
        }
    }
}