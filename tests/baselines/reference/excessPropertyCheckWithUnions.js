//// [excessPropertyCheckWithUnions.ts]
type ADT = {
    tag: "A",
    a1: string
} | {
    tag: "D",
    d20: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20
} | {
    tag: "T",
}
let wrong: ADT = { tag: "T", a1: "extra" }
wrong = { tag: "A", d20: 12 }
wrong = { tag: "D" }

type Ambiguous = {
    tag: "A",
    x: string
} | {
    tag: "A",
    y: number
} | {
    tag: "B",
    z: boolean
} | {
    tag: "C"
}
let amb: Ambiguous
// no error for ambiguous tag, even when it could satisfy both constituents at once
amb = { tag: "A", x: "hi" }
amb = { tag: "A", y: 12 }
amb = { tag: "A", x: "hi", y: 12 }

// correctly error on excess property 'extra', even when ambiguous
amb = { tag: "A", x: "hi", extra: 12 }
amb = { tag: "A", y: 12, extra: 12 }

// assignability errors still work.
// But note that the error for `z: true` is the fallback one of reporting on
// the last constituent since assignability error reporting can't find a single best discriminant either.
amb = { tag: "A" }
amb = { tag: "A", z: true }

type Overlapping =
    | { a: 1, b: 1, first: string }
    | { a: 2, second: string }
    | { b: 3, third: string }
let over: Overlapping

// these two are still errors despite their doubled up discriminants
over = { a: 1, b: 1, first: "ok", second: "error" }
over = { a: 1, b: 1, first: "ok", third: "error" }

// Freshness disappears after spreading a union
declare let t0: { a: any, b: any } | { d: any, e: any }
declare let t1: { a: any, b: any, c: any } | { c: any, d: any, e: any }
let t2 = { ...t1 }
t0 = t2

// Nested excess property checks work with discriminated unions
type AN = { a: string } | { c: string }
type BN = { b: string }
type AB = { kind: "A", n: AN } | { kind: "B", n: BN }
const abab: AB = {
    kind: "A",
    n: {
        a: "a",
        b: "b", // excess -- kind: "A"
    }
}
const abac: AB = {
    kind: "A",
    n: {
        a: "a",
        c: "c", // ok -- kind: "A", an: { a: string } | { c: string }
    }
}

// Excess property checks must match all discriminable properties
type Button = { tag: 'button'; type?: 'submit'; };
type Anchor = { tag: 'a'; type?: string; href: string };

type Union = Button | Anchor;
const obj: Union = {
    tag: 'button',
    type: 'submit',

    // should have error here
    href: 'foo',
};

// Repro from #34611

interface IValue {
  value: string
}

interface StringKeys { 
    [propertyName: string]: IValue;
};

interface NumberKeys {
    [propertyName: number]: IValue;
}

type ObjectDataSpecification = StringKeys | NumberKeys;


const dataSpecification: ObjectDataSpecification = {  // Error
    foo: "asdfsadffsd"
};

// Repro from #34611

const obj1: { [x: string]: number } | { [x: number]: number } = { a: 'abc' };  // Error
const obj2: { [x: string]: number } | { a: number } = { a: 5, c: 'abc' };  // Error

// Repro from #33732

interface I1 {
    prop1: string;
}

interface I2 {
    prop2: string;
}

interface I3 extends Record<string, string> {

}

type Properties =
    | { [key: string]: never }
    | I1
    | I2
    | I3
    ;


declare const prop1: string;
declare const prop2: string | undefined;

function F1(_arg: { props: Properties }) { }
F1({
    props: {
        prop1,
        prop2,
    },
});

function F2(_props: Properties) { }
F2({
    prop1,
    prop2,
});


//// [excessPropertyCheckWithUnions.js]
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var wrong = { tag: "T", a1: "extra" };
wrong = { tag: "A", d20: 12 };
wrong = { tag: "D" };
var amb;
// no error for ambiguous tag, even when it could satisfy both constituents at once
amb = { tag: "A", x: "hi" };
amb = { tag: "A", y: 12 };
amb = { tag: "A", x: "hi", y: 12 };
// correctly error on excess property 'extra', even when ambiguous
amb = { tag: "A", x: "hi", extra: 12 };
amb = { tag: "A", y: 12, extra: 12 };
// assignability errors still work.
// But note that the error for `z: true` is the fallback one of reporting on
// the last constituent since assignability error reporting can't find a single best discriminant either.
amb = { tag: "A" };
amb = { tag: "A", z: true };
var over;
// these two are still errors despite their doubled up discriminants
over = { a: 1, b: 1, first: "ok", second: "error" };
over = { a: 1, b: 1, first: "ok", third: "error" };
var t2 = __assign({}, t1);
t0 = t2;
var abab = {
    kind: "A",
    n: {
        a: "a",
        b: "b"
    }
};
var abac = {
    kind: "A",
    n: {
        a: "a",
        c: "c"
    }
};
var obj = {
    tag: 'button',
    type: 'submit',
    // should have error here
    href: 'foo'
};
;
var dataSpecification = {
    foo: "asdfsadffsd"
};
// Repro from #34611
var obj1 = { a: 'abc' }; // Error
var obj2 = { a: 5, c: 'abc' }; // Error
function F1(_arg) { }
F1({
    props: {
        prop1: prop1,
        prop2: prop2
    }
});
function F2(_props) { }
F2({
    prop1: prop1,
    prop2: prop2
});
