//// [typeGuardWithRelaxEquality.ts]
// Github issue #24991
function test(level: number | string):number {
    if (level == +level) {
        const q2 = level; // number | string
        return level;
    }
    if (level === +level + 1) {
        const q2 = level;
        return level;
    }
    return 0;
}
alert(test(5) + 1);
alert(test("5") + 1)

declare const a: string | number | boolean | object | symbol | null | undefined;
declare const s: symbol;
declare const str: string;
declare const num: number;
declare const bool: boolean;

if (a == 1) {
    const t = a
}
if (a == num) {
    const t = a
}
if (a == '') {
    const t = a
}
if (a == str) {
    const t = a
}
if (a == false) {
    const t = a
}
if (a == bool) {
    const t = a
}
if (a == {}) {
    const t = a
}
if (a == s) {
    const t = a
}
if (a == null) {
    const t = a
}
if (a == undefined) {
    const t = a
}

//// [typeGuardWithRelaxEquality.js]
"use strict";
// Github issue #24991
function test(level) {
    if (level == +level) {
        var q2 = level; // number | string
        return level;
    }
    if (level === +level + 1) {
        var q2 = level;
        return level;
    }
    return 0;
}
alert(test(5) + 1);
alert(test("5") + 1);
if (a == 1) {
    var t = a;
}
if (a == num) {
    var t = a;
}
if (a == '') {
    var t = a;
}
if (a == str) {
    var t = a;
}
if (a == false) {
    var t = a;
}
if (a == bool) {
    var t = a;
}
if (a == {}) {
    var t = a;
}
if (a == s) {
    var t = a;
}
if (a == null) {
    var t = a;
}
if (a == undefined) {
    var t = a;
}
