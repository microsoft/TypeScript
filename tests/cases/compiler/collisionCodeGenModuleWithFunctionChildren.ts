namespace M {
    export var x = 3;
    function fn(M, p = x) { }
}

namespace M {
    function fn2() {
        var M;
        var p = x;
    }
}

namespace M {
    function fn3() {
        function M() {
            var p = x;
        }
    }
}