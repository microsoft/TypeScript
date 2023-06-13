//// [tests/cases/compiler/mixedTypeEnumComparison.ts] ////

//// [mixedTypeEnumComparison.ts]
const enum E {
    S1 = "foo",
    S2 = "bar",

    N1 = 1000,
    N2 = 25,
}

declare var someNumber: number

if (someNumber > E.N2) {
    someNumber = E.N2;
}

declare const unionOfEnum: E.N1 | E.N2;

if (someNumber > unionOfEnum) {
    someNumber = E.N2;
}

declare var someString: string

if (someString > E.S1) {
    someString = E.S2;
}


declare function someValue(): number;

enum E2 {
    S1 = "foo",
    N1 = 1000,
    C1 = someValue(),
}

someString > E2.S1;
someNumber > E2.N1;
someNumber > E2.C1;


//// [mixedTypeEnumComparison.js]
"use strict";
if (someNumber > 25 /* E.N2 */) {
    someNumber = 25 /* E.N2 */;
}
if (someNumber > unionOfEnum) {
    someNumber = 25 /* E.N2 */;
}
if (someString > "foo" /* E.S1 */) {
    someString = "bar" /* E.S2 */;
}
var E2;
(function (E2) {
    E2["S1"] = "foo";
    E2[E2["N1"] = 1000] = "N1";
    E2[E2["C1"] = someValue()] = "C1";
})(E2 || (E2 = {}));
someString > E2.S1;
someNumber > E2.N1;
someNumber > E2.C1;
