namespace M {
    export var x = 3;
    namespace m1 {
        var M = 10;
        var p = x;
    }
}

namespace M {
    namespace m2 {
        class M {
        }
        var p = x;
        var p2 = new M();
    }
}

namespace M {
    namespace m3 {
        function M() {
        }
        var p = x;
        var p2 = M();
    }
}

namespace M { // shouldnt be _M
    namespace m3 {
        interface M {
        }
        var p = x;
        var p2: M;
    }
}

namespace M {
    namespace m4 {
        namespace M {
            var p = x;
        }
    }
}