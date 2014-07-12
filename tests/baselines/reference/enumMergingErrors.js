//// [enumMergingErrors.ts]
// Enum with constant, computed, constant members split across 3 declarations with the same root module
module M {
    export enum E1 { A = 0 }
    export enum E2 { C }
    export enum E3 { A = 0 }
}
module M {
    export enum E1 { B = 'foo'.length }
    export enum E2 { B = 'foo'.length }
    export enum E3 { C }
}
module M {
    export enum E1 { C }
    export enum E2 { A = 0 }
    export enum E3 { B = 'foo'.length }
}

// Enum with no initializer in either declaration with constant members with the same root module
module M1 {
    export enum E1 { A = 0 }
}
module M1 {
    export enum E1 { B }
}
module M1 {
    export enum E1 { C }
}


// Enum with initializer in only one of three declarations with constant members with the same root module
module M2 {
    export enum E1 { A }
}
module M2 {
    export enum E1 { B = 0 }
}
module M2 {
    export enum E1 { C }
}




//// [enumMergingErrors.js]
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
