//// [sourceMapValidationDestructuringForOfArrayBindingPattern2.ts]
declare var console: {
    log(msg: any): void;
}
type Robot = [number, string, string];
type MultiSkilledRobot = [string, [string, string]];

let robotA: Robot = [1, "mower", "mowing"];
let robotB: Robot = [2, "trimmer", "trimming"];
let robots = [robotA, robotB];
function getRobots() {
    return robots;
}

let multiRobotA: MultiSkilledRobot = ["mower", ["mowing", ""]];
let multiRobotB: MultiSkilledRobot = ["trimmer", ["trimming", "edging"]];
let multiRobots = [multiRobotA, multiRobotB];
function getMultiRobots() {
    return multiRobots;
}

let nameA: string, primarySkillA: string, secondarySkillA: string;
let numberB: number, nameB: string;
let numberA2: number, nameA2: string, skillA2: string, nameMA: string;
let numberA3: number, robotAInfo: (number | string)[], multiRobotAInfo: (string | [string, string])[];

for ([, nameA] of robots) {
    console.log(nameA);
}
for ([, nameA] of getRobots()) {
    console.log(nameA);
}
for ([, nameA] of [robotA, robotB]) {
    console.log(nameA);
}
for ([, [primarySkillA, secondarySkillA]] of multiRobots) {
    console.log(primarySkillA);
}
for ([, [primarySkillA, secondarySkillA]] of getMultiRobots()) {
    console.log(primarySkillA);
}
for ([, [primarySkillA, secondarySkillA]] of [multiRobotA, multiRobotB]) {
    console.log(primarySkillA);
}

for ([numberB] of robots) {
    console.log(numberB);
}
for ([numberB] of getRobots()) {
    console.log(numberB);
}
for ([numberB] of [robotA, robotB]) {
    console.log(numberB);
}
for ([nameB] of multiRobots) {
    console.log(nameB);
}
for ([nameB] of getMultiRobots()) {
    console.log(nameB);
}
for ([nameB] of [multiRobotA, multiRobotB]) {
    console.log(nameB);
}

for ([numberA2, nameA2, skillA2] of robots) {
    console.log(nameA2);
}
for ([numberA2, nameA2, skillA2] of getRobots()) {
    console.log(nameA2);
}
for ([numberA2, nameA2, skillA2] of [robotA, robotB]) {
    console.log(nameA2);
}
for ([nameMA, [primarySkillA, secondarySkillA]] of multiRobots) {
    console.log(nameMA);
}
for ([nameMA, [primarySkillA, secondarySkillA]] of getMultiRobots()) {
    console.log(nameMA);
}
for ([nameMA, [primarySkillA, secondarySkillA]] of [multiRobotA, multiRobotB]) {
    console.log(nameMA);
}

for ([numberA3, ...robotAInfo] of robots) {
    console.log(numberA3);
}
for ([numberA3, ...robotAInfo] of getRobots()) {
    console.log(numberA3);
}
for ([numberA3, ...robotAInfo] of [robotA, robotB]) {
    console.log(numberA3);
}
for ([...multiRobotAInfo] of multiRobots) {
    console.log(multiRobotAInfo);
}
for ([...multiRobotAInfo] of getMultiRobots()) {
    console.log(multiRobotAInfo);
}
for ([...multiRobotAInfo] of [multiRobotA, multiRobotB]) {
    console.log(multiRobotAInfo);
}

//// [sourceMapValidationDestructuringForOfArrayBindingPattern2.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = typeof Symbol === "function" && o[Symbol.iterator])) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var __values = (this && this.__values) || function (o) { return (i = typeof Symbol === "function" && o[Symbol.iterator] || 0) ? i.call(o) : { next: function () { return { done: d = d || i >= o.length, value: d ? void 0 : o[i++] }; } }; var i, d; };
var __step = (this && this.__step) || function (r) { return !(r.done || (r.done = (r.result = r.iterator.next()).done)); };
var __close = (this && this.__close) || function (r) { return (m = !(r && r.done) && r.iterator["return"]) && m.call(r.iterator); var m; };
var robotA = [1, "mower", "mowing"];
var robotB = [2, "trimmer", "trimming"];
var robots = [robotA, robotB];
function getRobots() {
    return robots;
}
var multiRobotA = ["mower", ["mowing", ""]];
var multiRobotB = ["trimmer", ["trimming", "edging"]];
var multiRobots = [multiRobotA, multiRobotB];
function getMultiRobots() {
    return multiRobots;
}
var nameA, primarySkillA, secondarySkillA;
var numberB, nameB;
var numberA2, nameA2, skillA2, nameMA;
var numberA3, robotAInfo, multiRobotAInfo;
try {
    for (var robots_1 = { iterator: __values(robots) }; __step(robots_1);) {
        _a = __read(robots_1.result.value, 2), nameA = _a[1];
        console.log(nameA);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try { __close(robots_1); } finally { if (e_1) throw e_1.error; }
}
try {
    for (var iterator_1 = { iterator: __values(getRobots()) }; __step(iterator_1);) {
        _b = __read(iterator_1.result.value, 2), nameA = _b[1];
        console.log(nameA);
    }
}
catch (e_2_1) { e_2 = { error: e_2_1 }; }
finally {
    try { __close(iterator_1); } finally { if (e_2) throw e_2.error; }
}
for (var _i = 0, _c = [robotA, robotB]; _i < _c.length; _i++) {
    _d = __read(_c[_i], 2), nameA = _d[1];
    console.log(nameA);
}
try {
    for (var multiRobots_1 = { iterator: __values(multiRobots) }; __step(multiRobots_1);) {
        _e = __read(multiRobots_1.result.value, 2), _f = __read(_e[1], 2), primarySkillA = _f[0], secondarySkillA = _f[1];
        console.log(primarySkillA);
    }
}
catch (e_3_1) { e_3 = { error: e_3_1 }; }
finally {
    try { __close(multiRobots_1); } finally { if (e_3) throw e_3.error; }
}
try {
    for (var iterator_2 = { iterator: __values(getMultiRobots()) }; __step(iterator_2);) {
        _g = __read(iterator_2.result.value, 2), _h = __read(_g[1], 2), primarySkillA = _h[0], secondarySkillA = _h[1];
        console.log(primarySkillA);
    }
}
catch (e_4_1) { e_4 = { error: e_4_1 }; }
finally {
    try { __close(iterator_2); } finally { if (e_4) throw e_4.error; }
}
for (var _j = 0, _k = [multiRobotA, multiRobotB]; _j < _k.length; _j++) {
    _l = __read(_k[_j], 2), _m = __read(_l[1], 2), primarySkillA = _m[0], secondarySkillA = _m[1];
    console.log(primarySkillA);
}
try {
    for (var robots_2 = { iterator: __values(robots) }; __step(robots_2);) {
        _o = __read(robots_2.result.value, 1), numberB = _o[0];
        console.log(numberB);
    }
}
catch (e_5_1) { e_5 = { error: e_5_1 }; }
finally {
    try { __close(robots_2); } finally { if (e_5) throw e_5.error; }
}
try {
    for (var iterator_3 = { iterator: __values(getRobots()) }; __step(iterator_3);) {
        _p = __read(iterator_3.result.value, 1), numberB = _p[0];
        console.log(numberB);
    }
}
catch (e_6_1) { e_6 = { error: e_6_1 }; }
finally {
    try { __close(iterator_3); } finally { if (e_6) throw e_6.error; }
}
for (var _q = 0, _r = [robotA, robotB]; _q < _r.length; _q++) {
    _s = __read(_r[_q], 1), numberB = _s[0];
    console.log(numberB);
}
try {
    for (var multiRobots_2 = { iterator: __values(multiRobots) }; __step(multiRobots_2);) {
        _t = __read(multiRobots_2.result.value, 1), nameB = _t[0];
        console.log(nameB);
    }
}
catch (e_7_1) { e_7 = { error: e_7_1 }; }
finally {
    try { __close(multiRobots_2); } finally { if (e_7) throw e_7.error; }
}
try {
    for (var iterator_4 = { iterator: __values(getMultiRobots()) }; __step(iterator_4);) {
        _u = __read(iterator_4.result.value, 1), nameB = _u[0];
        console.log(nameB);
    }
}
catch (e_8_1) { e_8 = { error: e_8_1 }; }
finally {
    try { __close(iterator_4); } finally { if (e_8) throw e_8.error; }
}
for (var _v = 0, _w = [multiRobotA, multiRobotB]; _v < _w.length; _v++) {
    _x = __read(_w[_v], 1), nameB = _x[0];
    console.log(nameB);
}
try {
    for (var robots_3 = { iterator: __values(robots) }; __step(robots_3);) {
        _y = __read(robots_3.result.value, 3), numberA2 = _y[0], nameA2 = _y[1], skillA2 = _y[2];
        console.log(nameA2);
    }
}
catch (e_9_1) { e_9 = { error: e_9_1 }; }
finally {
    try { __close(robots_3); } finally { if (e_9) throw e_9.error; }
}
try {
    for (var iterator_5 = { iterator: __values(getRobots()) }; __step(iterator_5);) {
        _z = __read(iterator_5.result.value, 3), numberA2 = _z[0], nameA2 = _z[1], skillA2 = _z[2];
        console.log(nameA2);
    }
}
catch (e_10_1) { e_10 = { error: e_10_1 }; }
finally {
    try { __close(iterator_5); } finally { if (e_10) throw e_10.error; }
}
for (var _0 = 0, _1 = [robotA, robotB]; _0 < _1.length; _0++) {
    _2 = __read(_1[_0], 3), numberA2 = _2[0], nameA2 = _2[1], skillA2 = _2[2];
    console.log(nameA2);
}
try {
    for (var multiRobots_3 = { iterator: __values(multiRobots) }; __step(multiRobots_3);) {
        _3 = __read(multiRobots_3.result.value, 2), nameMA = _3[0], _4 = __read(_3[1], 2), primarySkillA = _4[0], secondarySkillA = _4[1];
        console.log(nameMA);
    }
}
catch (e_11_1) { e_11 = { error: e_11_1 }; }
finally {
    try { __close(multiRobots_3); } finally { if (e_11) throw e_11.error; }
}
try {
    for (var iterator_6 = { iterator: __values(getMultiRobots()) }; __step(iterator_6);) {
        _5 = __read(iterator_6.result.value, 2), nameMA = _5[0], _6 = __read(_5[1], 2), primarySkillA = _6[0], secondarySkillA = _6[1];
        console.log(nameMA);
    }
}
catch (e_12_1) { e_12 = { error: e_12_1 }; }
finally {
    try { __close(iterator_6); } finally { if (e_12) throw e_12.error; }
}
for (var _7 = 0, _8 = [multiRobotA, multiRobotB]; _7 < _8.length; _7++) {
    _9 = __read(_8[_7], 2), nameMA = _9[0], _10 = __read(_9[1], 2), primarySkillA = _10[0], secondarySkillA = _10[1];
    console.log(nameMA);
}
try {
    for (var robots_4 = { iterator: __values(robots) }; __step(robots_4);) {
        _11 = __read(robots_4.result.value), numberA3 = _11[0], robotAInfo = _11.slice(1);
        console.log(numberA3);
    }
}
catch (e_13_1) { e_13 = { error: e_13_1 }; }
finally {
    try { __close(robots_4); } finally { if (e_13) throw e_13.error; }
}
try {
    for (var iterator_7 = { iterator: __values(getRobots()) }; __step(iterator_7);) {
        _12 = __read(iterator_7.result.value), numberA3 = _12[0], robotAInfo = _12.slice(1);
        console.log(numberA3);
    }
}
catch (e_14_1) { e_14 = { error: e_14_1 }; }
finally {
    try { __close(iterator_7); } finally { if (e_14) throw e_14.error; }
}
for (var _13 = 0, _14 = [robotA, robotB]; _13 < _14.length; _13++) {
    _15 = __read(_14[_13]), numberA3 = _15[0], robotAInfo = _15.slice(1);
    console.log(numberA3);
}
try {
    for (var multiRobots_4 = { iterator: __values(multiRobots) }; __step(multiRobots_4);) {
        _16 = __read(multiRobots_4.result.value), multiRobotAInfo = _16.slice(0);
        console.log(multiRobotAInfo);
    }
}
catch (e_15_1) { e_15 = { error: e_15_1 }; }
finally {
    try { __close(multiRobots_4); } finally { if (e_15) throw e_15.error; }
}
try {
    for (var iterator_8 = { iterator: __values(getMultiRobots()) }; __step(iterator_8);) {
        _17 = __read(iterator_8.result.value), multiRobotAInfo = _17.slice(0);
        console.log(multiRobotAInfo);
    }
}
catch (e_16_1) { e_16 = { error: e_16_1 }; }
finally {
    try { __close(iterator_8); } finally { if (e_16) throw e_16.error; }
}
for (var _18 = 0, _19 = [multiRobotA, multiRobotB]; _18 < _19.length; _18++) {
    _20 = __read(_19[_18]), multiRobotAInfo = _20.slice(0);
    console.log(multiRobotAInfo);
}
var _a, e_1, _b, e_2, _d, _e, _f, e_3, _g, _h, e_4, _l, _m, _o, e_5, _p, e_6, _s, _t, e_7, _u, e_8, _x, _y, e_9, _z, e_10, _2, _3, _4, e_11, _5, _6, e_12, _9, _10, _11, e_13, _12, e_14, _15, _16, e_15, _17, e_16, _20;
//# sourceMappingURL=sourceMapValidationDestructuringForOfArrayBindingPattern2.js.map