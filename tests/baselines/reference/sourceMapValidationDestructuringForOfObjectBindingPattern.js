//// [sourceMapValidationDestructuringForOfObjectBindingPattern.ts]
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

for (let {name: nameA } of robots) {
    console.log(nameA);
}
for (let {name: nameA } of getRobots()) {
    console.log(nameA);
}
for (let {name: nameA } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for (let { skills: { primary: primaryA, secondary: secondaryA } } of multiRobots) {
    console.log(primaryA);
}
for (let { skills: { primary: primaryA, secondary: secondaryA } } of getMultiRobots()) {
    console.log(primaryA);
}
for (let { skills: { primary: primaryA, secondary: secondaryA } } of [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(primaryA);
}

for (let {name: nameA, skill: skillA } of robots) {
    console.log(nameA);
}
for (let {name: nameA, skill: skillA } of getRobots()) {
    console.log(nameA);
}
for (let {name: nameA, skill: skillA } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for (let {name: nameA, skills: { primary: primaryA, secondary: secondaryA } } of multiRobots) {
    console.log(nameA);
}
for (let {name: nameA, skills: { primary: primaryA, secondary: secondaryA } } of getMultiRobots()) {
    console.log(nameA);
}
for (let {name: nameA, skills: { primary: primaryA, secondary: secondaryA } } of [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(nameA);
}

//// [sourceMapValidationDestructuringForOfObjectBindingPattern.js]
var __values = (this && this.__values) || function (o) {
    var i = o.__iterator__ || 0, d;
    return i ? i.call(o) : { next: function () { return { done: d = d || i >= o.length, value: d ? void 0 : o[i++] }; } };
};
var __step = (this && this.__step) || function (r) {
    return !(r.done || (r.done = (r.result = r.iterator.next()).done));
};
var __close = (this && this.__close) || function (r) {
    var m = !(r && r.done) && r.iterator["return"];
    if (m) return m.call(r.iterator);
};
var robots = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }];
var multiRobots = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }];
function getRobots() {
    return robots;
}
function getMultiRobots() {
    return multiRobots;
}
try {
    for (var robots_1 = { iterator: __values(robots) }; __step(robots_1);) {
        var nameA = robots_1.result.value.name;
        console.log(nameA);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try { __close(robots_1); } finally { if (e_1) throw e_1.error; }
}
try {
    for (var iterator_1 = { iterator: __values(getRobots()) }; __step(iterator_1);) {
        var nameA = iterator_1.result.value.name;
        console.log(nameA);
    }
}
catch (e_2_1) { e_2 = { error: e_2_1 }; }
finally {
    try { __close(iterator_1); } finally { if (e_2) throw e_2.error; }
}
for (var _i = 0, _a = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _i < _a.length; _i++) {
    var nameA = _a[_i].name;
    console.log(nameA);
}
try {
    for (var multiRobots_1 = { iterator: __values(multiRobots) }; __step(multiRobots_1);) {
        var _b = multiRobots_1.result.value.skills, primaryA = _b.primary, secondaryA = _b.secondary;
        console.log(primaryA);
    }
}
catch (e_3_1) { e_3 = { error: e_3_1 }; }
finally {
    try { __close(multiRobots_1); } finally { if (e_3) throw e_3.error; }
}
try {
    for (var iterator_2 = { iterator: __values(getMultiRobots()) }; __step(iterator_2);) {
        var _c = iterator_2.result.value.skills, primaryA = _c.primary, secondaryA = _c.secondary;
        console.log(primaryA);
    }
}
catch (e_4_1) { e_4 = { error: e_4_1 }; }
finally {
    try { __close(iterator_2); } finally { if (e_4) throw e_4.error; }
}
for (var _d = 0, _e = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _d < _e.length; _d++) {
    var _f = _e[_d].skills, primaryA = _f.primary, secondaryA = _f.secondary;
    console.log(primaryA);
}
try {
    for (var robots_2 = { iterator: __values(robots) }; __step(robots_2);) {
        var _g = robots_2.result.value, nameA = _g.name, skillA = _g.skill;
        console.log(nameA);
    }
}
catch (e_5_1) { e_5 = { error: e_5_1 }; }
finally {
    try { __close(robots_2); } finally { if (e_5) throw e_5.error; }
}
try {
    for (var iterator_3 = { iterator: __values(getRobots()) }; __step(iterator_3);) {
        var _h = iterator_3.result.value, nameA = _h.name, skillA = _h.skill;
        console.log(nameA);
    }
}
catch (e_6_1) { e_6 = { error: e_6_1 }; }
finally {
    try { __close(iterator_3); } finally { if (e_6) throw e_6.error; }
}
for (var _j = 0, _k = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _j < _k.length; _j++) {
    var _l = _k[_j], nameA = _l.name, skillA = _l.skill;
    console.log(nameA);
}
try {
    for (var multiRobots_2 = { iterator: __values(multiRobots) }; __step(multiRobots_2);) {
        var _m = multiRobots_2.result.value, nameA = _m.name, _o = _m.skills, primaryA = _o.primary, secondaryA = _o.secondary;
        console.log(nameA);
    }
}
catch (e_7_1) { e_7 = { error: e_7_1 }; }
finally {
    try { __close(multiRobots_2); } finally { if (e_7) throw e_7.error; }
}
try {
    for (var iterator_4 = { iterator: __values(getMultiRobots()) }; __step(iterator_4);) {
        var _p = iterator_4.result.value, nameA = _p.name, _q = _p.skills, primaryA = _q.primary, secondaryA = _q.secondary;
        console.log(nameA);
    }
}
catch (e_8_1) { e_8 = { error: e_8_1 }; }
finally {
    try { __close(iterator_4); } finally { if (e_8) throw e_8.error; }
}
for (var _r = 0, _s = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _r < _s.length; _r++) {
    var _t = _s[_r], nameA = _t.name, _u = _t.skills, primaryA = _u.primary, secondaryA = _u.secondary;
    console.log(nameA);
}
var e_1, e_2, e_3, e_4, e_5, e_6, e_7, e_8;
//# sourceMappingURL=sourceMapValidationDestructuringForOfObjectBindingPattern.js.map