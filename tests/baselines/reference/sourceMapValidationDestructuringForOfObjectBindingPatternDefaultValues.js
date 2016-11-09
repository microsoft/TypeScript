//// [sourceMapValidationDestructuringForOfObjectBindingPatternDefaultValues.ts]
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
        primary?: string;
        secondary?: string;
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

for (let {name: nameA = "noName" } of robots) {
    console.log(nameA);
}
for (let {name: nameA = "noName" } of getRobots()) {
    console.log(nameA);
}
for (let {name: nameA = "noName" } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for (let { skills: { primary: primaryA = "primary", secondary: secondaryA = "secondary" } =
    { primary: "nosKill", secondary: "noSkill" } } of multiRobots) {
    console.log(primaryA);
}
for (let { skills: { primary: primaryA = "primary", secondary: secondaryA = "secondary" } =
    { primary: "nosKill", secondary: "noSkill" } } of getMultiRobots()) {
    console.log(primaryA);
}
for (let { skills: { primary: primaryA = "primary", secondary: secondaryA = "secondary" } =
    { primary: "nosKill", secondary: "noSkill" } } of
    <MultiRobot[]>[{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(primaryA);
}

for (let {name: nameA = "noName", skill: skillA = "noSkill" } of robots) {
    console.log(nameA);
}
for (let {name: nameA = "noName", skill: skillA = "noSkill"  } of getRobots()) {
    console.log(nameA);
}
for (let {name: nameA = "noName", skill: skillA = "noSkill"  } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for (let {
    name: nameA = "noName",
    skills: {
        primary: primaryA = "primary",
        secondary: secondaryA = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of multiRobots) {
    console.log(nameA);
}
for (let {
    name: nameA = "noName",
    skills: {
        primary: primaryA = "primary",
        secondary: secondaryA = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of getMultiRobots()) {
    console.log(nameA);
}
for (let {
    name: nameA = "noName",
    skills: {
        primary: primaryA = "primary",
        secondary: secondaryA = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of <MultiRobot[]>[{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(nameA);
}

//// [sourceMapValidationDestructuringForOfObjectBindingPatternDefaultValues.js]
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
        var _a = robots_1.result.value.name, nameA = _a === void 0 ? "noName" : _a;
        console.log(nameA);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try { __close(robots_1); } finally { if (e_1) throw e_1.error; }
}
try {
    for (var iterator_1 = { iterator: __values(getRobots()) }; __step(iterator_1);) {
        var _b = iterator_1.result.value.name, nameA = _b === void 0 ? "noName" : _b;
        console.log(nameA);
    }
}
catch (e_2_1) { e_2 = { error: e_2_1 }; }
finally {
    try { __close(iterator_1); } finally { if (e_2) throw e_2.error; }
}
for (var _i = 0, _c = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _i < _c.length; _i++) {
    var _d = _c[_i].name, nameA = _d === void 0 ? "noName" : _d;
    console.log(nameA);
}
try {
    for (var multiRobots_1 = { iterator: __values(multiRobots) }; __step(multiRobots_1);) {
        var _e = multiRobots_1.result.value.skills, _f = _e === void 0 ? { primary: "nosKill", secondary: "noSkill" } : _e, _g = _f.primary, primaryA = _g === void 0 ? "primary" : _g, _h = _f.secondary, secondaryA = _h === void 0 ? "secondary" : _h;
        console.log(primaryA);
    }
}
catch (e_3_1) { e_3 = { error: e_3_1 }; }
finally {
    try { __close(multiRobots_1); } finally { if (e_3) throw e_3.error; }
}
try {
    for (var iterator_2 = { iterator: __values(getMultiRobots()) }; __step(iterator_2);) {
        var _j = iterator_2.result.value.skills, _k = _j === void 0 ? { primary: "nosKill", secondary: "noSkill" } : _j, _l = _k.primary, primaryA = _l === void 0 ? "primary" : _l, _m = _k.secondary, secondaryA = _m === void 0 ? "secondary" : _m;
        console.log(primaryA);
    }
}
catch (e_4_1) { e_4 = { error: e_4_1 }; }
finally {
    try { __close(iterator_2); } finally { if (e_4) throw e_4.error; }
}
try {
    for (var iterator_3 = { iterator: __values([{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
            { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) }; __step(iterator_3);) {
        var _o = iterator_3.result.value.skills, _p = _o === void 0 ? { primary: "nosKill", secondary: "noSkill" } : _o, _q = _p.primary, primaryA = _q === void 0 ? "primary" : _q, _r = _p.secondary, secondaryA = _r === void 0 ? "secondary" : _r;
        console.log(primaryA);
    }
}
catch (e_5_1) { e_5 = { error: e_5_1 }; }
finally {
    try { __close(iterator_3); } finally { if (e_5) throw e_5.error; }
}
try {
    for (var robots_2 = { iterator: __values(robots) }; __step(robots_2);) {
        var _s = robots_2.result.value, _t = _s.name, nameA = _t === void 0 ? "noName" : _t, _u = _s.skill, skillA = _u === void 0 ? "noSkill" : _u;
        console.log(nameA);
    }
}
catch (e_6_1) { e_6 = { error: e_6_1 }; }
finally {
    try { __close(robots_2); } finally { if (e_6) throw e_6.error; }
}
try {
    for (var iterator_4 = { iterator: __values(getRobots()) }; __step(iterator_4);) {
        var _v = iterator_4.result.value, _w = _v.name, nameA = _w === void 0 ? "noName" : _w, _x = _v.skill, skillA = _x === void 0 ? "noSkill" : _x;
        console.log(nameA);
    }
}
catch (e_7_1) { e_7 = { error: e_7_1 }; }
finally {
    try { __close(iterator_4); } finally { if (e_7) throw e_7.error; }
}
for (var _y = 0, _z = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _y < _z.length; _y++) {
    var _0 = _z[_y], _1 = _0.name, nameA = _1 === void 0 ? "noName" : _1, _2 = _0.skill, skillA = _2 === void 0 ? "noSkill" : _2;
    console.log(nameA);
}
try {
    for (var multiRobots_2 = { iterator: __values(multiRobots) }; __step(multiRobots_2);) {
        var _3 = multiRobots_2.result.value, _4 = _3.name, nameA = _4 === void 0 ? "noName" : _4, _5 = _3.skills, _6 = _5 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _5, _7 = _6.primary, primaryA = _7 === void 0 ? "primary" : _7, _8 = _6.secondary, secondaryA = _8 === void 0 ? "secondary" : _8;
        console.log(nameA);
    }
}
catch (e_8_1) { e_8 = { error: e_8_1 }; }
finally {
    try { __close(multiRobots_2); } finally { if (e_8) throw e_8.error; }
}
try {
    for (var iterator_5 = { iterator: __values(getMultiRobots()) }; __step(iterator_5);) {
        var _9 = iterator_5.result.value, _10 = _9.name, nameA = _10 === void 0 ? "noName" : _10, _11 = _9.skills, _12 = _11 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _11, _13 = _12.primary, primaryA = _13 === void 0 ? "primary" : _13, _14 = _12.secondary, secondaryA = _14 === void 0 ? "secondary" : _14;
        console.log(nameA);
    }
}
catch (e_9_1) { e_9 = { error: e_9_1 }; }
finally {
    try { __close(iterator_5); } finally { if (e_9) throw e_9.error; }
}
try {
    for (var iterator_6 = { iterator: __values([{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
            { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) }; __step(iterator_6);) {
        var _15 = iterator_6.result.value, _16 = _15.name, nameA = _16 === void 0 ? "noName" : _16, _17 = _15.skills, _18 = _17 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _17, _19 = _18.primary, primaryA = _19 === void 0 ? "primary" : _19, _20 = _18.secondary, secondaryA = _20 === void 0 ? "secondary" : _20;
        console.log(nameA);
    }
}
catch (e_10_1) { e_10 = { error: e_10_1 }; }
finally {
    try { __close(iterator_6); } finally { if (e_10) throw e_10.error; }
}
var e_1, e_2, e_3, e_4, e_5, e_6, e_7, e_8, e_9, e_10;
//# sourceMappingURL=sourceMapValidationDestructuringForOfObjectBindingPatternDefaultValues.js.map