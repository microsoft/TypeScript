namespace M {
    export var x = 3;
    class c {
        private y;
        set Z(M) {
            this.y = x;
        }
    }
}

namespace M {
    class d {
        private y;
        set Z(p) {
            var M = 10;
            this.y = x;
        }
    }
}

namespace M { // Shouldnt be _M
    class e {
        private y;
        set M(p) {
            this.y = x;
        }
    }
}

namespace M {
    class f {
        get Z() {
            var M = 10;
            return x;
        }
    }
}

namespace M { // Shouldnt be _M
    class e {
        get M() {
            return x;
        }
    }
}