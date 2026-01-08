namespace M {
    export var x = 3;
    class c {
        constructor(M, p = x) {
        }
    }
}

namespace M {
    class d {
        constructor(private M, p = x) {
        }
    }
}

namespace M {
    class d2 {
        constructor() {
            var M = 10;
            var p = x;
        }
    }
}