//// [nameCollisions.js]
// bug 738635: Error for clinterfaces is gone
var T;
(function (T) {
    var x = 2;

    var x;
    (function (x) {
        var Bar = (function () {
            function Bar() {
            }
            return Bar;
        })();
        x.Bar = Bar;
    })(x || (x = {}));

    var z;
    (function (z) {
        var t;
    })(z || (z = {}));
    var z;

    var y;
    (function (y) {
        var b;
    })(y || (y = {}));

    var y = (function () {
        function y() {
        }
        return y;
    })();

    var w;

    var f;
    function f() {
    }

    function f2() {
    }
    var f2;

    var i;

    var C = (function () {
        function C() {
        }
        return C;
    })();
    function C() {
    }

    function C2() {
    }
    var C2 = (function () {
        function C2() {
        }
        return C2;
    })();

    function fi() {
    }

    var cli = (function () {
        function cli() {
        }
        return cli;
    })();

    var cli2 = (function () {
        function cli2() {
        }
        return cli2;
    })();
})(T || (T = {}));
