//// [tests/cases/conformance/constEnums/constEnum4.ts] ////

//// [constEnum4.ts]
if (1)
    const enum A { }
else if (2)
    const enum B { }
else
    const enum C { }


//// [constEnum4.js]
if (1) {
    var A;
    (function (A) {
    })(A || (A = {}));
}
else if (2) {
    var B;
    (function (B) {
    })(B || (B = {}));
}
else {
    var C;
    (function (C) {
    })(C || (C = {}));
}
