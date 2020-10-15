//// [enumStringAnnotation1.ts]
enum A: string {
    A,
    B
}

enum B: string {
    A,
    B = '1',
    C,
}

enum C: string {
    A = 1,
    B = '2',
    C
}

enum D: number {
    A,
    B
}

//// [enumStringAnnotation1.js]
var A;
(function (A) {
    A["A"] = "A";
    A["B"] = "B";
})(A || (A = {}));
var B;
(function (B) {
    B["A"] = "A";
    B["B"] = "1";
    B["C"] = "C";
})(B || (B = {}));
var C;
(function (C) {
    C[C["A"] = 1] = "A";
    C["B"] = "2";
    C["C"] = "C";
})(C || (C = {}));
var D;
(function (D) {
    D["A"] = "A";
    D["B"] = "B";
})(D || (D = {}));


//// [enumStringAnnotation1.d.ts]
declare enum A {
    A = "A",
    B = "B"
}
declare enum B {
    A = "A",
    B = "1",
    C = "C"
}
declare enum C {
    A = 1,
    B = "2",
    C = "C"
}
declare enum D {
    A = "A",
    B = "B"
}
