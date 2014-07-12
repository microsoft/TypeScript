//// [nonExportedElementsOfMergedModules.js]
var One;
(function (One) {
    var A;
    (function (A) {
        A[A["X"] = 0] = "X";
    })(A || (A = {}));
    var B;
    (function (B) {
        B.x;
    })(B || (B = {}));
})(One || (One = {}));

var One;
(function (One) {
    var A;
    (function (A) {
        A[A["Y"] = 0] = "Y";
    })(A || (A = {}));
    var B;
    (function (B) {
        B.y;
    })(B || (B = {}));
    B.x;
    B.y;
})(One || (One = {}));
