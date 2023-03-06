//// [narrowByEquality.ts]
declare let x: number | string | boolean
declare let n: number;
declare let s: string;
declare let b: boolean;
declare let xUnknown: unknown;

if (x == n) {
    x;
}

if (x == s) {
    x;
}

if (x == b) {
    x;
}

if (x == 1) {
    x;
}

if (x == "") {
    x;
}

if (x == "foo") {
    x;
}

if (x == true) {
    x;
}

if (x == false) {
    x;
}

declare let xAndObj: number | string | boolean | object

if (xAndObj == {}) {
    xAndObj;
}

if (x == xAndObj) {
    x;
    xAndObj;
}

// Repro from #24991

function test(level: number | string):number {
    if (level == +level) {
        const q2: number = level; // error
        return level;
    }
    return 0;
}

// From issue #32798
if (xUnknown == null) {
    xUnknown;
} else {
    xUnknown
}

if (xUnknown != null) {
    xUnknown;
} else {
    xUnknown;
}



//// [narrowByEquality.js]
"use strict";
if (x == n) {
    x;
}
if (x == s) {
    x;
}
if (x == b) {
    x;
}
if (x == 1) {
    x;
}
if (x == "") {
    x;
}
if (x == "foo") {
    x;
}
if (x == true) {
    x;
}
if (x == false) {
    x;
}
if (xAndObj == {}) {
    xAndObj;
}
if (x == xAndObj) {
    x;
    xAndObj;
}
// Repro from #24991
function test(level) {
    if (level == +level) {
        var q2 = level; // error
        return level;
    }
    return 0;
}
// From issue #32798
if (xUnknown == null) {
    xUnknown;
}
else {
    xUnknown;
}
if (xUnknown != null) {
    xUnknown;
}
else {
    xUnknown;
}
