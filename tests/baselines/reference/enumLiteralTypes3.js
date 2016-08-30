//// [enumLiteralTypes3.ts]
const enum Choice { Unknown, Yes, No };

type Yes = Choice.Yes;
type YesNo = Choice.Yes | Choice.No;
type NoYes = Choice.No | Choice.Yes;
type UnknownYesNo = Choice.Unknown | Choice.Yes | Choice.No;

function f1(a: Yes, b: YesNo, c: UnknownYesNo, d: Choice) {
    a = a;
    a = b;
    a = c;
    a = d;
}

function f2(a: Yes, b: YesNo, c: UnknownYesNo, d: Choice) {
    b = a;
    b = b;
    b = c;
    b = d;
}

function f3(a: Yes, b: YesNo, c: UnknownYesNo, d: Choice) {
    c = a;
    c = b;
    c = c;
    c = d;
}

function f4(a: Yes, b: YesNo, c: UnknownYesNo, d: Choice) {
    d = a;
    d = b;
    d = c;
    d = d;
}

function f5(a: Yes, b: YesNo, c: UnknownYesNo, d: Choice) {
    a = Choice.Unknown;
    a = Choice.Yes;
    a = Choice.No;
    b = Choice.Unknown;
    b = Choice.Yes;
    b = Choice.No;
    c = Choice.Unknown;
    c = Choice.Yes;
    c = Choice.No;
    d = Choice.Unknown;
    d = Choice.Yes;
    d = Choice.No;
}

function f6(a: Yes, b: YesNo, c: UnknownYesNo, d: Choice) {
    a === Choice.Unknown;
    a === Choice.Yes;
    a === Choice.No;
    b === Choice.Unknown;
    b === Choice.Yes;
    b === Choice.No;
    c === Choice.Unknown;
    c === Choice.Yes;
    c === Choice.No;
    d === Choice.Unknown;
    d === Choice.Yes;
    d === Choice.No;
}

function f7(a: Yes, b: YesNo, c: UnknownYesNo, d: Choice) {
    a === a;
    a === b;
    a === c;
    a === d;
    b === a;
    b === b;
    b === c;
    b === d;
    c === a;
    c === b;
    c === c;
    c === d;
    d === a;
    d === b;
    d === c;
    d === d;
}

function f10(x: Yes): Yes {
    switch (x) {
        case Choice.Unknown: return x;
        case Choice.Yes: return x;
        case Choice.No: return x;
    }
    return x;
}

function f11(x: YesNo): YesNo {
    switch (x) {
        case Choice.Unknown: return x;
        case Choice.Yes: return x;
        case Choice.No: return x;
    }
    return x;
}

function f12(x: UnknownYesNo): UnknownYesNo {
    switch (x) {
        case Choice.Unknown: return x;
        case Choice.Yes: return x;
        case Choice.No: return x;
    }
    return x;
}

function f13(x: Choice): Choice {
    switch (x) {
        case Choice.Unknown: return x;
        case Choice.Yes: return x;
        case Choice.No: return x;
    }
    return x;
}

//// [enumLiteralTypes3.js]
;
function f1(a, b, c, d) {
    a = a;
    a = b;
    a = c;
    a = d;
}
function f2(a, b, c, d) {
    b = a;
    b = b;
    b = c;
    b = d;
}
function f3(a, b, c, d) {
    c = a;
    c = b;
    c = c;
    c = d;
}
function f4(a, b, c, d) {
    d = a;
    d = b;
    d = c;
    d = d;
}
function f5(a, b, c, d) {
    a = 0 /* Unknown */;
    a = 1 /* Yes */;
    a = 2 /* No */;
    b = 0 /* Unknown */;
    b = 1 /* Yes */;
    b = 2 /* No */;
    c = 0 /* Unknown */;
    c = 1 /* Yes */;
    c = 2 /* No */;
    d = 0 /* Unknown */;
    d = 1 /* Yes */;
    d = 2 /* No */;
}
function f6(a, b, c, d) {
    a === 0 /* Unknown */;
    a === 1 /* Yes */;
    a === 2 /* No */;
    b === 0 /* Unknown */;
    b === 1 /* Yes */;
    b === 2 /* No */;
    c === 0 /* Unknown */;
    c === 1 /* Yes */;
    c === 2 /* No */;
    d === 0 /* Unknown */;
    d === 1 /* Yes */;
    d === 2 /* No */;
}
function f7(a, b, c, d) {
    a === a;
    a === b;
    a === c;
    a === d;
    b === a;
    b === b;
    b === c;
    b === d;
    c === a;
    c === b;
    c === c;
    c === d;
    d === a;
    d === b;
    d === c;
    d === d;
}
function f10(x) {
    switch (x) {
        case 0 /* Unknown */: return x;
        case 1 /* Yes */: return x;
        case 2 /* No */: return x;
    }
    return x;
}
function f11(x) {
    switch (x) {
        case 0 /* Unknown */: return x;
        case 1 /* Yes */: return x;
        case 2 /* No */: return x;
    }
    return x;
}
function f12(x) {
    switch (x) {
        case 0 /* Unknown */: return x;
        case 1 /* Yes */: return x;
        case 2 /* No */: return x;
    }
    return x;
}
function f13(x) {
    switch (x) {
        case 0 /* Unknown */: return x;
        case 1 /* Yes */: return x;
        case 2 /* No */: return x;
    }
    return x;
}
