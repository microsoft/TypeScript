module M {
    export var x = 3;
    function fn(M, p = x) { }
}

module M {
    function fn2() {
        var M;
        var p = x;
    }
}

module M {
    function fn3() {
        function M() {
            var p = x;
        }
    }
}