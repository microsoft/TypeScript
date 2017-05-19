//// [constIndexedAccess.ts]
const enum numbers {
    zero,
    one
}

interface indexAccess {
    0: string;
    1: number;
}

let test: indexAccess;

let s = test[0];
let n = test[1];

let s1 = test[numbers.zero];
let n1 = test[numbers.one];

let s2 = test[numbers["zero"]];
let n2 = test[numbers["one"]];

enum numbersNotConst {
    zero,
    one
}

let s3 = test[numbersNotConst.zero];
let n3 = test[numbersNotConst.one];


//// [constIndexedAccess.js]
var test;
var s = test[0];
var n = test[1];
var s1 = test[0 /* zero */];
var n1 = test[1 /* one */];
var s2 = test[0 /* "zero" */];
var n2 = test[1 /* "one" */];
var numbersNotConst;
(function (numbersNotConst) {
    numbersNotConst[numbersNotConst["zero"] = 0] = "zero";
    numbersNotConst[numbersNotConst["one"] = 1] = "one";
})(numbersNotConst || (numbersNotConst = {}));
var s3 = test[numbersNotConst.zero];
var n3 = test[numbersNotConst.one];
