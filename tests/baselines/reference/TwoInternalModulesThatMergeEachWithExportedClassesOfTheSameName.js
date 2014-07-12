//// [TwoInternalModulesThatMergeEachWithExportedClassesOfTheSameName.js]
var A;
(function (A) {
    var Point = (function () {
        function Point() {
        }
        return Point;
    })();
    A.Point = Point;
})(A || (A = {}));

var A;
(function (A) {
    // expected error
    var Point = (function () {
        function Point() {
        }
        return Point;
    })();
    A.Point = Point;
})(A || (A = {}));

var X;
(function (X) {
    (function (Y) {
        (function (Z) {
            var Line = (function () {
                function Line() {
                }
                return Line;
            })();
            Z.Line = Line;
        })(Y.Z || (Y.Z = {}));
        var Z = Y.Z;
    })(X.Y || (X.Y = {}));
    var Y = X.Y;
})(X || (X = {}));

var X;
(function (X) {
    (function (Y) {
        (function (Z) {
            // expected error
            var Line = (function () {
                function Line() {
                }
                return Line;
            })();
            Z.Line = Line;
        })(Y.Z || (Y.Z = {}));
        var Z = Y.Z;
    })(X.Y || (X.Y = {}));
    var Y = X.Y;
})(X || (X = {}));
