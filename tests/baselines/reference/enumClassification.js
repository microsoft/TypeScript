//// [enumClassification.ts]
// An enum type where each member has no initializer or an initializer that specififes
// a numeric literal, a string literal, or a single identifier naming another member in
// the enum type is classified as a literal enum type. An enum type that doesn't adhere
// to this pattern is classified as a numeric enum type.

// Examples of literal enum types

enum E01 {
    A
}

enum E02 {
    A = 123
}

enum E03 {
    A = "hello"
}

enum E04 {
    A,
    B,
    C
}

enum E05 {
    A,
    B = 10,
    C
}

enum E06 {
    A = "one",
    B = "two",
    C = "three"
}

enum E07 {
    A,
    B,
    C = "hi",
    D = 10,
    E,
    F = "bye"
}

enum E08 {
    A = 10,
    B = "hello",
    C = A,
    D = B,
    E = C,
}

// Examples of numeric enum types with only constant members

enum E10 {}

enum E11 {
    A = +0,
    B,
    C
}

enum E12 {
    A = 1 << 0,
    B = 1 << 1,
    C = 1 << 2
}

// Examples of numeric enum types with constant and computed members

enum E20 {
    A = "foo".length,
    B = A + 1,
    C = +"123",
    D = Math.sin(1)
}


//// [enumClassification.js]
// An enum type where each member has no initializer or an initializer that specififes
// a numeric literal, a string literal, or a single identifier naming another member in
// the enum type is classified as a literal enum type. An enum type that doesn't adhere
// to this pattern is classified as a numeric enum type.
// Examples of literal enum types
var E01;
(function (E01) {
    E01[E01["A"] = 0] = "A";
})(E01 || (E01 = {}));
var E02;
(function (E02) {
    E02[E02["A"] = 123] = "A";
})(E02 || (E02 = {}));
var E03;
(function (E03) {
    E03["A"] = "hello";
})(E03 || (E03 = {}));
var E04;
(function (E04) {
    E04[E04["A"] = 0] = "A";
    E04[E04["B"] = 1] = "B";
    E04[E04["C"] = 2] = "C";
})(E04 || (E04 = {}));
var E05;
(function (E05) {
    E05[E05["A"] = 0] = "A";
    E05[E05["B"] = 10] = "B";
    E05[E05["C"] = 11] = "C";
})(E05 || (E05 = {}));
var E06;
(function (E06) {
    E06["A"] = "one";
    E06["B"] = "two";
    E06["C"] = "three";
})(E06 || (E06 = {}));
var E07;
(function (E07) {
    E07[E07["A"] = 0] = "A";
    E07[E07["B"] = 1] = "B";
    E07["C"] = "hi";
    E07[E07["D"] = 10] = "D";
    E07[E07["E"] = 11] = "E";
    E07["F"] = "bye";
})(E07 || (E07 = {}));
var E08;
(function (E08) {
    E08[E08["A"] = 10] = "A";
    E08["B"] = "hello";
    E08[E08["C"] = 10] = "C";
    E08["D"] = "hello";
    E08[E08["E"] = 10] = "E";
})(E08 || (E08 = {}));
// Examples of numeric enum types with only constant members
var E10;
(function (E10) {
})(E10 || (E10 = {}));
var E11;
(function (E11) {
    E11[E11["A"] = 0] = "A";
    E11[E11["B"] = 1] = "B";
    E11[E11["C"] = 2] = "C";
})(E11 || (E11 = {}));
var E12;
(function (E12) {
    E12[E12["A"] = 1] = "A";
    E12[E12["B"] = 2] = "B";
    E12[E12["C"] = 4] = "C";
})(E12 || (E12 = {}));
// Examples of numeric enum types with constant and computed members
var E20;
(function (E20) {
    E20[E20["A"] = "foo".length] = "A";
    E20[E20["B"] = E20.A + 1] = "B";
    E20[E20["C"] = +"123"] = "C";
    E20[E20["D"] = Math.sin(1)] = "D";
})(E20 || (E20 = {}));


//// [enumClassification.d.ts]
declare enum E01 {
    A = 0
}
declare enum E02 {
    A = 123
}
declare enum E03 {
    A = "hello"
}
declare enum E04 {
    A = 0,
    B = 1,
    C = 2
}
declare enum E05 {
    A = 0,
    B = 10,
    C = 11
}
declare enum E06 {
    A = "one",
    B = "two",
    C = "three"
}
declare enum E07 {
    A = 0,
    B = 1,
    C = "hi",
    D = 10,
    E = 11,
    F = "bye"
}
declare enum E08 {
    A = 10,
    B = "hello",
    C = 10,
    D = "hello",
    E = 10
}
declare enum E10 {
}
declare enum E11 {
    A = 0,
    B = 1,
    C = 2
}
declare enum E12 {
    A = 1,
    B = 2,
    C = 4
}
declare enum E20 {
    A,
    B,
    C,
    D
}
