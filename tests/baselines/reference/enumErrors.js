//// [enumErrors.ts]
// Enum named with PredefinedTypes
enum any { }
enum number { }
enum string { }
enum boolean { }

// Enum with computed member initializer of type Number
enum E5 {
    C = new Number(30)
}

enum E9 {
    A,
    B = A
}

//Enum with computed member intializer of different enum type
// Bug 707850: This should be allowed
enum E10 {
    A = E9.A,
    B = E9.B
}

// Enum with computed member intializer of other types
enum E11 {
    A = true,
    B = new Date(),
    C = window,
    D = {},
    E = (() => 'foo')(),
}

// Enum with string valued member and computed member initializers
enum E12 {
    A = '',
    B = new Date(),
    C = window,
    D = {},
    E = 1 + 1,
    F = (() => 'foo')(),
}

// Enum with incorrect syntax
enum E13 {
    postComma,
    postValueComma = 1,

    postSemicolon;
    postColonValueComma: 2,
    postColonValueSemicolon: 3;
};

enum E14 { a, b: any "hello" += 1, c, d}


//// [enumErrors.js]
// Enum named with PredefinedTypes
var any;
(function (any) {
})(any || (any = {}));
var number;
(function (number) {
})(number || (number = {}));
var string;
(function (string) {
})(string || (string = {}));
var boolean;
(function (boolean) {
})(boolean || (boolean = {}));
// Enum with computed member initializer of type Number
var E5;
(function (E5) {
    E5[E5["C"] = new Number(30)] = "C";
})(E5 || (E5 = {}));
var E9;
(function (E9) {
    E9[E9["A"] = 0] = "A";
    E9[E9["B"] = 0] = "B";
})(E9 || (E9 = {}));
//Enum with computed member intializer of different enum type
// Bug 707850: This should be allowed
var E10;
(function (E10) {
    E10[E10["A"] = 0] = "A";
    E10[E10["B"] = 0] = "B";
})(E10 || (E10 = {}));
// Enum with computed member intializer of other types
var E11;
(function (E11) {
    E11[E11["A"] = true] = "A";
    E11[E11["B"] = new Date()] = "B";
    E11[E11["C"] = window] = "C";
    E11[E11["D"] = {}] = "D";
    E11[E11["E"] = (function () { return 'foo'; })()] = "E";
})(E11 || (E11 = {}));
// Enum with string valued member and computed member initializers
var E12;
(function (E12) {
    E12["A"] = "";
    E12[E12["B"] = 0] = "B";
    E12[E12["C"] = 0] = "C";
    E12[E12["D"] = 0] = "D";
    E12[E12["E"] = 0] = "E";
    E12[E12["F"] = 0] = "F";
})(E12 || (E12 = {}));
// Enum with incorrect syntax
var E13;
(function (E13) {
    E13[E13["postComma"] = 0] = "postComma";
    E13[E13["postValueComma"] = 1] = "postValueComma";
    E13[E13["postSemicolon"] = 2] = "postSemicolon";
    E13[E13["postColonValueComma"] = 3] = "postColonValueComma";
    E13[E13[2] = 4] = 2;
    E13[E13["postColonValueSemicolon"] = 5] = "postColonValueSemicolon";
    E13[E13[3] = 6] = 3;
})(E13 || (E13 = {}));
;
var E14;
(function (E14) {
    E14[E14["a"] = 0] = "a";
    E14[E14["b"] = 1] = "b";
    E14[E14["any"] = 2] = "any";
    E14[E14["hello"] = 3] = "hello";
    E14[E14[1] = 4] = 1;
    E14[E14["c"] = 5] = "c";
    E14[E14["d"] = 6] = "d";
})(E14 || (E14 = {}));
