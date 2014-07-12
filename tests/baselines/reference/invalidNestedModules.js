//// [invalidNestedModules.js]
var A;
(function (A) {
    (function (B) {
        (function (C) {
            var Point = (function () {
                function Point() {
                }
                return Point;
            })();
            C.Point = Point;
        })(B.C || (B.C = {}));
        var C = B.C;
    })(A.B || (A.B = {}));
    var B = A.B;
})(A || (A = {}));

var A;
(function (A) {
    (function (B) {
        var C = (function () {
            function C() {
            }
            return C;
        })();
        B.C = C;
    })(A.B || (A.B = {}));
    var B = A.B;
})(A || (A = {}));

var M2;
(function (M2) {
    (function (X) {
        var Point = (function () {
            function Point() {
            }
            return Point;
        })();
        X.Point = Point;
    })(M2.X || (M2.X = {}));
    var X = M2.X;
})(M2 || (M2 = {}));

var M2;
(function (M2) {
    (function (X) {
        X.Point;
    })(M2.X || (M2.X = {}));
    var X = M2.X;
})(M2 || (M2 = {}));
