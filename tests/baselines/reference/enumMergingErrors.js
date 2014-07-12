//// [enumMergingErrors.js]
// Enum with constant, computed, constant members split across 3 declarations with the same root module
var M;
(function (M) {
    (function (E1) {
        E1[E1["A"] = 0] = "A";
    })(M.E1 || (M.E1 = {}));
    var E1 = M.E1;
    (function (E2) {
        E2[E2["C"] = 0] = "C";
    })(M.E2 || (M.E2 = {}));
    var E2 = M.E2;
    (function (E3) {
        E3[E3["A"] = 0] = "A";
    })(M.E3 || (M.E3 = {}));
    var E3 = M.E3;
})(M || (M = {}));
var M;
(function (M) {
    (function (E1) {
        E1[E1["B"] = 'foo'.length] = "B";
    })(M.E1 || (M.E1 = {}));
    var E1 = M.E1;
    (function (E2) {
        E2[E2["B"] = 'foo'.length] = "B";
    })(M.E2 || (M.E2 = {}));
    var E2 = M.E2;
    (function (E3) {
        E3[E3["C"] = 0] = "C";
    })(M.E3 || (M.E3 = {}));
    var E3 = M.E3;
})(M || (M = {}));
var M;
(function (M) {
    (function (E1) {
        E1[E1["C"] = 0] = "C";
    })(M.E1 || (M.E1 = {}));
    var E1 = M.E1;
    (function (E2) {
        E2[E2["A"] = 0] = "A";
    })(M.E2 || (M.E2 = {}));
    var E2 = M.E2;
    (function (E3) {
        E3[E3["B"] = 'foo'.length] = "B";
    })(M.E3 || (M.E3 = {}));
    var E3 = M.E3;
})(M || (M = {}));

// Enum with no initializer in either declaration with constant members with the same root module
var M1;
(function (M1) {
    (function (E1) {
        E1[E1["A"] = 0] = "A";
    })(M1.E1 || (M1.E1 = {}));
    var E1 = M1.E1;
})(M1 || (M1 = {}));
var M1;
(function (M1) {
    (function (E1) {
        E1[E1["B"] = 0] = "B";
    })(M1.E1 || (M1.E1 = {}));
    var E1 = M1.E1;
})(M1 || (M1 = {}));
var M1;
(function (M1) {
    (function (E1) {
        E1[E1["C"] = 0] = "C";
    })(M1.E1 || (M1.E1 = {}));
    var E1 = M1.E1;
})(M1 || (M1 = {}));

// Enum with initializer in only one of three declarations with constant members with the same root module
var M2;
(function (M2) {
    (function (E1) {
        E1[E1["A"] = 0] = "A";
    })(M2.E1 || (M2.E1 = {}));
    var E1 = M2.E1;
})(M2 || (M2 = {}));
var M2;
(function (M2) {
    (function (E1) {
        E1[E1["B"] = 0] = "B";
    })(M2.E1 || (M2.E1 = {}));
    var E1 = M2.E1;
})(M2 || (M2 = {}));
var M2;
(function (M2) {
    (function (E1) {
        E1[E1["C"] = 0] = "C";
    })(M2.E1 || (M2.E1 = {}));
    var E1 = M2.E1;
})(M2 || (M2 = {}));
