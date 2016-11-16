//// [sourceMapValidationDestructuringForOfObjectBindingPattern2.ts]
declare var console: {
    log(msg: any): void;
}
interface Robot {
    name: string;
    skill: string;
}

interface MultiRobot {
    name: string;
    skills: {
        primary: string;
        secondary: string;
    };
}

let robots: Robot[] = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }];
let multiRobots: MultiRobot[] = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }];

function getRobots() {
    return robots;
}

function getMultiRobots() {
    return multiRobots;
}

let nameA: string, primaryA: string, secondaryA: string, i: number, skillA: string;
let name: string, primary: string, secondary: string, skill: string;

for ({name: nameA } of robots) {
    console.log(nameA);
}
for ({name: nameA } of getRobots()) {
    console.log(nameA);
}
for ({name: nameA } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for ({ skills: { primary: primaryA, secondary: secondaryA } } of multiRobots) {
    console.log(primaryA);
}
for ({ skills: { primary: primaryA, secondary: secondaryA } } of getMultiRobots()) {
    console.log(primaryA);
}
for ({ skills: { primary: primaryA, secondary: secondaryA } } of [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(primaryA);
}
for ({name } of robots) {
    console.log(nameA);
}
for ({name } of getRobots()) {
    console.log(nameA);
}
for ({name } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for ({ skills: { primary, secondary } } of multiRobots) {
    console.log(primaryA);
}
for ({ skills: { primary, secondary } } of getMultiRobots()) {
    console.log(primaryA);
}
for ({ skills: { primary, secondary } } of [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(primaryA);
}


for ({name: nameA, skill: skillA } of robots) {
    console.log(nameA);
}
for ({name: nameA, skill: skillA } of getRobots()) {
    console.log(nameA);
}
for ({name: nameA, skill: skillA } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for ({name: nameA, skills: { primary: primaryA, secondary: secondaryA } } of multiRobots) {
    console.log(nameA);
}
for ({name: nameA, skills: { primary: primaryA, secondary: secondaryA } } of getMultiRobots()) {
    console.log(nameA);
}
for ({name: nameA, skills: { primary: primaryA, secondary: secondaryA } } of [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(nameA);
}
for ({name, skill } of robots) {
    console.log(nameA);
}
for ({name, skill } of getRobots()) {
    console.log(nameA);
}
for ({name, skill } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for ({name, skills: { primary, secondary } } of multiRobots) {
    console.log(nameA);
}
for ({name, skills: { primary, secondary } } of getMultiRobots()) {
    console.log(nameA);
}
for ({name, skills: { primary, secondary } } of [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(nameA);
}

//// [sourceMapValidationDestructuringForOfObjectBindingPattern2.js]
var __values = (this && this.__values) || function (o) { return (i = typeof Symbol === "function" && o[Symbol.iterator] || 0) ? i.call(o) : { next: function () { return { done: d = d || i >= o.length, value: d ? void 0 : o[i++] }; } }; var i, d; };
var __step = (this && this.__step) || function (r) { return !(r.done || (r.done = (r.result = r.iterator.next()).done)); };
var __close = (this && this.__close) || function (r) { return (m = !(r && r.done) && r.iterator["return"]) && m.call(r.iterator); var m; };
var robots = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }];
var multiRobots = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }];
function getRobots() {
    return robots;
}
function getMultiRobots() {
    return multiRobots;
}
var nameA, primaryA, secondaryA, i, skillA;
var name, primary, secondary, skill;
try {
    for (var robots_1 = { iterator: __values(robots) }; __step(robots_1);) {
        nameA = robots_1.result.value.name;
        console.log(nameA);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try { __close(robots_1); } finally { if (e_1) throw e_1.error; }
}
try {
    for (var iterator_1 = { iterator: __values(getRobots()) }; __step(iterator_1);) {
        nameA = iterator_1.result.value.name;
        console.log(nameA);
    }
}
catch (e_2_1) { e_2 = { error: e_2_1 }; }
finally {
    try { __close(iterator_1); } finally { if (e_2) throw e_2.error; }
}
for (var _i = 0, _a = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _i < _a.length; _i++) {
    nameA = _a[_i].name;
    console.log(nameA);
}
try {
    for (var multiRobots_1 = { iterator: __values(multiRobots) }; __step(multiRobots_1);) {
        _b = multiRobots_1.result.value.skills, primaryA = _b.primary, secondaryA = _b.secondary;
        console.log(primaryA);
    }
}
catch (e_3_1) { e_3 = { error: e_3_1 }; }
finally {
    try { __close(multiRobots_1); } finally { if (e_3) throw e_3.error; }
}
try {
    for (var iterator_2 = { iterator: __values(getMultiRobots()) }; __step(iterator_2);) {
        _c = iterator_2.result.value.skills, primaryA = _c.primary, secondaryA = _c.secondary;
        console.log(primaryA);
    }
}
catch (e_4_1) { e_4 = { error: e_4_1 }; }
finally {
    try { __close(iterator_2); } finally { if (e_4) throw e_4.error; }
}
for (var _d = 0, _e = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _d < _e.length; _d++) {
    _f = _e[_d].skills, primaryA = _f.primary, secondaryA = _f.secondary;
    console.log(primaryA);
}
try {
    for (var robots_2 = { iterator: __values(robots) }; __step(robots_2);) {
        name = robots_2.result.value.name;
        console.log(nameA);
    }
}
catch (e_5_1) { e_5 = { error: e_5_1 }; }
finally {
    try { __close(robots_2); } finally { if (e_5) throw e_5.error; }
}
try {
    for (var iterator_3 = { iterator: __values(getRobots()) }; __step(iterator_3);) {
        name = iterator_3.result.value.name;
        console.log(nameA);
    }
}
catch (e_6_1) { e_6 = { error: e_6_1 }; }
finally {
    try { __close(iterator_3); } finally { if (e_6) throw e_6.error; }
}
for (var _g = 0, _h = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _g < _h.length; _g++) {
    name = _h[_g].name;
    console.log(nameA);
}
try {
    for (var multiRobots_2 = { iterator: __values(multiRobots) }; __step(multiRobots_2);) {
        _j = multiRobots_2.result.value.skills, primary = _j.primary, secondary = _j.secondary;
        console.log(primaryA);
    }
}
catch (e_7_1) { e_7 = { error: e_7_1 }; }
finally {
    try { __close(multiRobots_2); } finally { if (e_7) throw e_7.error; }
}
try {
    for (var iterator_4 = { iterator: __values(getMultiRobots()) }; __step(iterator_4);) {
        _k = iterator_4.result.value.skills, primary = _k.primary, secondary = _k.secondary;
        console.log(primaryA);
    }
}
catch (e_8_1) { e_8 = { error: e_8_1 }; }
finally {
    try { __close(iterator_4); } finally { if (e_8) throw e_8.error; }
}
for (var _l = 0, _m = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _l < _m.length; _l++) {
    _o = _m[_l].skills, primary = _o.primary, secondary = _o.secondary;
    console.log(primaryA);
}
try {
    for (var robots_3 = { iterator: __values(robots) }; __step(robots_3);) {
        _p = robots_3.result.value, nameA = _p.name, skillA = _p.skill;
        console.log(nameA);
    }
}
catch (e_9_1) { e_9 = { error: e_9_1 }; }
finally {
    try { __close(robots_3); } finally { if (e_9) throw e_9.error; }
}
try {
    for (var iterator_5 = { iterator: __values(getRobots()) }; __step(iterator_5);) {
        _q = iterator_5.result.value, nameA = _q.name, skillA = _q.skill;
        console.log(nameA);
    }
}
catch (e_10_1) { e_10 = { error: e_10_1 }; }
finally {
    try { __close(iterator_5); } finally { if (e_10) throw e_10.error; }
}
for (var _r = 0, _s = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _r < _s.length; _r++) {
    _t = _s[_r], nameA = _t.name, skillA = _t.skill;
    console.log(nameA);
}
try {
    for (var multiRobots_3 = { iterator: __values(multiRobots) }; __step(multiRobots_3);) {
        _u = multiRobots_3.result.value, nameA = _u.name, _v = _u.skills, primaryA = _v.primary, secondaryA = _v.secondary;
        console.log(nameA);
    }
}
catch (e_11_1) { e_11 = { error: e_11_1 }; }
finally {
    try { __close(multiRobots_3); } finally { if (e_11) throw e_11.error; }
}
try {
    for (var iterator_6 = { iterator: __values(getMultiRobots()) }; __step(iterator_6);) {
        _w = iterator_6.result.value, nameA = _w.name, _x = _w.skills, primaryA = _x.primary, secondaryA = _x.secondary;
        console.log(nameA);
    }
}
catch (e_12_1) { e_12 = { error: e_12_1 }; }
finally {
    try { __close(iterator_6); } finally { if (e_12) throw e_12.error; }
}
for (var _y = 0, _z = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _y < _z.length; _y++) {
    _0 = _z[_y], nameA = _0.name, _1 = _0.skills, primaryA = _1.primary, secondaryA = _1.secondary;
    console.log(nameA);
}
try {
    for (var robots_4 = { iterator: __values(robots) }; __step(robots_4);) {
        _2 = robots_4.result.value, name = _2.name, skill = _2.skill;
        console.log(nameA);
    }
}
catch (e_13_1) { e_13 = { error: e_13_1 }; }
finally {
    try { __close(robots_4); } finally { if (e_13) throw e_13.error; }
}
try {
    for (var iterator_7 = { iterator: __values(getRobots()) }; __step(iterator_7);) {
        _3 = iterator_7.result.value, name = _3.name, skill = _3.skill;
        console.log(nameA);
    }
}
catch (e_14_1) { e_14 = { error: e_14_1 }; }
finally {
    try { __close(iterator_7); } finally { if (e_14) throw e_14.error; }
}
for (var _4 = 0, _5 = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _4 < _5.length; _4++) {
    _6 = _5[_4], name = _6.name, skill = _6.skill;
    console.log(nameA);
}
try {
    for (var multiRobots_4 = { iterator: __values(multiRobots) }; __step(multiRobots_4);) {
        _7 = multiRobots_4.result.value, name = _7.name, _8 = _7.skills, primary = _8.primary, secondary = _8.secondary;
        console.log(nameA);
    }
}
catch (e_15_1) { e_15 = { error: e_15_1 }; }
finally {
    try { __close(multiRobots_4); } finally { if (e_15) throw e_15.error; }
}
try {
    for (var iterator_8 = { iterator: __values(getMultiRobots()) }; __step(iterator_8);) {
        _9 = iterator_8.result.value, name = _9.name, _10 = _9.skills, primary = _10.primary, secondary = _10.secondary;
        console.log(nameA);
    }
}
catch (e_16_1) { e_16 = { error: e_16_1 }; }
finally {
    try { __close(iterator_8); } finally { if (e_16) throw e_16.error; }
}
for (var _11 = 0, _12 = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _11 < _12.length; _11++) {
    _13 = _12[_11], name = _13.name, _14 = _13.skills, primary = _14.primary, secondary = _14.secondary;
    console.log(nameA);
}
var e_1, e_2, _b, e_3, _c, e_4, _f, e_5, e_6, _j, e_7, _k, e_8, _o, _p, e_9, _q, e_10, _t, _u, _v, e_11, _w, _x, e_12, _0, _1, _2, e_13, _3, e_14, _6, _7, _8, e_15, _9, _10, e_16, _13, _14;
//# sourceMappingURL=sourceMapValidationDestructuringForOfObjectBindingPattern2.js.map