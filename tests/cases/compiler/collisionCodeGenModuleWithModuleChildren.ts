module M {
    export var x = 3;
    module m1 {
        var M = 10;
        var p = x;
    }
}

module M {
    module m2 {
        class M {
        }
        var p = x;
        var p2 = new M();
    }
}

module M {
    module m3 {
        function M() {
        }
        var p = x;
        var p2 = M();
    }
}

module M { // shouldnt be _M
    module m3 {
        interface M {
        }
        var p = x;
        var p2: M;
    }
}

module M {
    module m4 {
        module M {
            var p = x;
        }
    }
}