//// [sourceMapValidationDestructuringForOfObjectBindingPatternDefaultValues2.ts]
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

for ({name: nameA = "noName" } of robots) {
    console.log(nameA);
}
for ({name: nameA = "noName" } of getRobots()) {
    console.log(nameA);
}
for ({name: nameA = "noName" } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for ({ skills: { primary: primaryA = "primary", secondary: secondaryA = "secondary" } =
    { primary: "nosKill", secondary: "noSkill" } } of multiRobots) {
    console.log(primaryA);
}
for ({ skills: { primary: primaryA = "primary", secondary: secondaryA = "secondary" } =
    { primary: "nosKill", secondary: "noSkill" } } of getMultiRobots()) {
    console.log(primaryA);
}
for ({ skills: { primary: primaryA = "primary", secondary: secondaryA = "secondary" } =
    { primary: "nosKill", secondary: "noSkill" } } of
    <MultiRobot[]>[{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
        { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(primaryA);
}

for ({ name = "noName" } of robots) {
    console.log(nameA);
}
for ({ name = "noName" } of getRobots()) {
    console.log(nameA);
}
for ({ name = "noName" } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for ({
    skills: {
        primary = "primary",
        secondary = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of multiRobots) {
    console.log(primaryA);
}
for ({
    skills: {
        primary = "primary",
        secondary = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of getMultiRobots()) {
    console.log(primaryA);
}
for ({
    skills: {
        primary = "primary",
        secondary = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(primaryA);
}


for ({name: nameA = "noName", skill: skillA = "noSkill" } of robots) {
    console.log(nameA);
}
for ({name: nameA = "noName", skill: skillA = "noSkill"  } of getRobots()) {
    console.log(nameA);
}
for ({name: nameA = "noName", skill: skillA = "noSkill"  } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for ({
    name: nameA = "noName",
    skills: {
        primary: primaryA = "primary",
        secondary: secondaryA = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of multiRobots) {
    console.log(nameA);
}
for ({
    name: nameA = "noName",
    skills: {
        primary: primaryA = "primary",
        secondary: secondaryA = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of getMultiRobots()) {
    console.log(nameA);
}
for ({
    name: nameA = "noName",
    skills: {
        primary: primaryA = "primary",
        secondary: secondaryA = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of <MultiRobot[]>[{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(nameA);
}

for ({ name = "noName", skill  = "noSkill" } of robots) {
    console.log(nameA);
}
for ({ name = "noName", skill = "noSkill"  } of getRobots()) {
    console.log(nameA);
}
for ({ name = "noName", skill  = "noSkill" } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for ({
    name = "noName",
    skills: {
        primary = "primary",
        secondary = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of multiRobots) {
    console.log(nameA);
}
for ({
    name = "noName",
    skills: {
        primary = "primary",
        secondary = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of getMultiRobots()) {
    console.log(nameA);
}
for ({
    name = "noName",
    skills: {
        primary = "primary",
        secondary = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(nameA);
}

//// [sourceMapValidationDestructuringForOfObjectBindingPatternDefaultValues2.js]
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
var nameA, primaryA, secondaryA, i, skillA;
var name, primary, secondary, skill;
try {
    for (var robots_1 = { iterator: __values(robots) }; __step(robots_1);) {
        _a = robots_1.result.value.name, nameA = _a === void 0 ? "noName" : _a;
        console.log(nameA);
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try { __close(robots_1); } finally { if (e_1) throw e_1.error; }
}
try {
    for (var iterator_1 = { iterator: __values(getRobots()) }; __step(iterator_1);) {
        _b = iterator_1.result.value.name, nameA = _b === void 0 ? "noName" : _b;
        console.log(nameA);
    }
}
catch (e_2_1) { e_2 = { error: e_2_1 }; }
finally {
    try { __close(iterator_1); } finally { if (e_2) throw e_2.error; }
}
for (var _i = 0, _c = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _i < _c.length; _i++) {
    _d = _c[_i].name, nameA = _d === void 0 ? "noName" : _d;
    console.log(nameA);
}
try {
    for (var multiRobots_1 = { iterator: __values(multiRobots) }; __step(multiRobots_1);) {
        _e = multiRobots_1.result.value.skills, _f = _e === void 0 ? { primary: "nosKill", secondary: "noSkill" } : _e, _g = _f.primary, primaryA = _g === void 0 ? "primary" : _g, _h = _f.secondary, secondaryA = _h === void 0 ? "secondary" : _h;
        console.log(primaryA);
    }
}
catch (e_3_1) { e_3 = { error: e_3_1 }; }
finally {
    try { __close(multiRobots_1); } finally { if (e_3) throw e_3.error; }
}
try {
    for (var iterator_2 = { iterator: __values(getMultiRobots()) }; __step(iterator_2);) {
        _j = iterator_2.result.value.skills, _k = _j === void 0 ? { primary: "nosKill", secondary: "noSkill" } : _j, _l = _k.primary, primaryA = _l === void 0 ? "primary" : _l, _m = _k.secondary, secondaryA = _m === void 0 ? "secondary" : _m;
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
        _o = iterator_3.result.value.skills, _p = _o === void 0 ? { primary: "nosKill", secondary: "noSkill" } : _o, _q = _p.primary, primaryA = _q === void 0 ? "primary" : _q, _r = _p.secondary, secondaryA = _r === void 0 ? "secondary" : _r;
        console.log(primaryA);
    }
}
catch (e_5_1) { e_5 = { error: e_5_1 }; }
finally {
    try { __close(iterator_3); } finally { if (e_5) throw e_5.error; }
}
try {
    for (var robots_2 = { iterator: __values(robots) }; __step(robots_2);) {
        _s = robots_2.result.value.name, name = _s === void 0 ? "noName" : _s;
        console.log(nameA);
    }
}
catch (e_6_1) { e_6 = { error: e_6_1 }; }
finally {
    try { __close(robots_2); } finally { if (e_6) throw e_6.error; }
}
try {
    for (var iterator_4 = { iterator: __values(getRobots()) }; __step(iterator_4);) {
        _t = iterator_4.result.value.name, name = _t === void 0 ? "noName" : _t;
        console.log(nameA);
    }
}
catch (e_7_1) { e_7 = { error: e_7_1 }; }
finally {
    try { __close(iterator_4); } finally { if (e_7) throw e_7.error; }
}
for (var _u = 0, _v = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _u < _v.length; _u++) {
    _w = _v[_u].name, name = _w === void 0 ? "noName" : _w;
    console.log(nameA);
}
try {
    for (var multiRobots_2 = { iterator: __values(multiRobots) }; __step(multiRobots_2);) {
        _x = multiRobots_2.result.value.skills, _y = _x === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _x, _z = _y.primary, primary = _z === void 0 ? "primary" : _z, _0 = _y.secondary, secondary = _0 === void 0 ? "secondary" : _0;
        console.log(primaryA);
    }
}
catch (e_8_1) { e_8 = { error: e_8_1 }; }
finally {
    try { __close(multiRobots_2); } finally { if (e_8) throw e_8.error; }
}
try {
    for (var iterator_5 = { iterator: __values(getMultiRobots()) }; __step(iterator_5);) {
        _1 = iterator_5.result.value.skills, _2 = _1 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _1, _3 = _2.primary, primary = _3 === void 0 ? "primary" : _3, _4 = _2.secondary, secondary = _4 === void 0 ? "secondary" : _4;
        console.log(primaryA);
    }
}
catch (e_9_1) { e_9 = { error: e_9_1 }; }
finally {
    try { __close(iterator_5); } finally { if (e_9) throw e_9.error; }
}
for (var _5 = 0, _6 = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _5 < _6.length; _5++) {
    _7 = _6[_5].skills, _8 = _7 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _7, _9 = _8.primary, primary = _9 === void 0 ? "primary" : _9, _10 = _8.secondary, secondary = _10 === void 0 ? "secondary" : _10;
    console.log(primaryA);
}
try {
    for (var robots_3 = { iterator: __values(robots) }; __step(robots_3);) {
        _11 = robots_3.result.value, _12 = _11.name, nameA = _12 === void 0 ? "noName" : _12, _13 = _11.skill, skillA = _13 === void 0 ? "noSkill" : _13;
        console.log(nameA);
    }
}
catch (e_10_1) { e_10 = { error: e_10_1 }; }
finally {
    try { __close(robots_3); } finally { if (e_10) throw e_10.error; }
}
try {
    for (var iterator_6 = { iterator: __values(getRobots()) }; __step(iterator_6);) {
        _14 = iterator_6.result.value, _15 = _14.name, nameA = _15 === void 0 ? "noName" : _15, _16 = _14.skill, skillA = _16 === void 0 ? "noSkill" : _16;
        console.log(nameA);
    }
}
catch (e_11_1) { e_11 = { error: e_11_1 }; }
finally {
    try { __close(iterator_6); } finally { if (e_11) throw e_11.error; }
}
for (var _17 = 0, _18 = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _17 < _18.length; _17++) {
    _19 = _18[_17], _20 = _19.name, nameA = _20 === void 0 ? "noName" : _20, _21 = _19.skill, skillA = _21 === void 0 ? "noSkill" : _21;
    console.log(nameA);
}
try {
    for (var multiRobots_3 = { iterator: __values(multiRobots) }; __step(multiRobots_3);) {
        _22 = multiRobots_3.result.value, _23 = _22.name, nameA = _23 === void 0 ? "noName" : _23, _24 = _22.skills, _25 = _24 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _24, _26 = _25.primary, primaryA = _26 === void 0 ? "primary" : _26, _27 = _25.secondary, secondaryA = _27 === void 0 ? "secondary" : _27;
        console.log(nameA);
    }
}
catch (e_12_1) { e_12 = { error: e_12_1 }; }
finally {
    try { __close(multiRobots_3); } finally { if (e_12) throw e_12.error; }
}
try {
    for (var iterator_7 = { iterator: __values(getMultiRobots()) }; __step(iterator_7);) {
        _28 = iterator_7.result.value, _29 = _28.name, nameA = _29 === void 0 ? "noName" : _29, _30 = _28.skills, _31 = _30 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _30, _32 = _31.primary, primaryA = _32 === void 0 ? "primary" : _32, _33 = _31.secondary, secondaryA = _33 === void 0 ? "secondary" : _33;
        console.log(nameA);
    }
}
catch (e_13_1) { e_13 = { error: e_13_1 }; }
finally {
    try { __close(iterator_7); } finally { if (e_13) throw e_13.error; }
}
try {
    for (var iterator_8 = { iterator: __values([{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
            { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) }; __step(iterator_8);) {
        _34 = iterator_8.result.value, _35 = _34.name, nameA = _35 === void 0 ? "noName" : _35, _36 = _34.skills, _37 = _36 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _36, _38 = _37.primary, primaryA = _38 === void 0 ? "primary" : _38, _39 = _37.secondary, secondaryA = _39 === void 0 ? "secondary" : _39;
        console.log(nameA);
    }
}
catch (e_14_1) { e_14 = { error: e_14_1 }; }
finally {
    try { __close(iterator_8); } finally { if (e_14) throw e_14.error; }
}
try {
    for (var robots_4 = { iterator: __values(robots) }; __step(robots_4);) {
        _40 = robots_4.result.value, _41 = _40.name, name = _41 === void 0 ? "noName" : _41, _42 = _40.skill, skill = _42 === void 0 ? "noSkill" : _42;
        console.log(nameA);
    }
}
catch (e_15_1) { e_15 = { error: e_15_1 }; }
finally {
    try { __close(robots_4); } finally { if (e_15) throw e_15.error; }
}
try {
    for (var iterator_9 = { iterator: __values(getRobots()) }; __step(iterator_9);) {
        _43 = iterator_9.result.value, _44 = _43.name, name = _44 === void 0 ? "noName" : _44, _45 = _43.skill, skill = _45 === void 0 ? "noSkill" : _45;
        console.log(nameA);
    }
}
catch (e_16_1) { e_16 = { error: e_16_1 }; }
finally {
    try { __close(iterator_9); } finally { if (e_16) throw e_16.error; }
}
for (var _46 = 0, _47 = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _46 < _47.length; _46++) {
    _48 = _47[_46], _49 = _48.name, name = _49 === void 0 ? "noName" : _49, _50 = _48.skill, skill = _50 === void 0 ? "noSkill" : _50;
    console.log(nameA);
}
try {
    for (var multiRobots_4 = { iterator: __values(multiRobots) }; __step(multiRobots_4);) {
        _51 = multiRobots_4.result.value, _52 = _51.name, name = _52 === void 0 ? "noName" : _52, _53 = _51.skills, _54 = _53 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _53, _55 = _54.primary, primary = _55 === void 0 ? "primary" : _55, _56 = _54.secondary, secondary = _56 === void 0 ? "secondary" : _56;
        console.log(nameA);
    }
}
catch (e_17_1) { e_17 = { error: e_17_1 }; }
finally {
    try { __close(multiRobots_4); } finally { if (e_17) throw e_17.error; }
}
try {
    for (var iterator_10 = { iterator: __values(getMultiRobots()) }; __step(iterator_10);) {
        _57 = iterator_10.result.value, _58 = _57.name, name = _58 === void 0 ? "noName" : _58, _59 = _57.skills, _60 = _59 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _59, _61 = _60.primary, primary = _61 === void 0 ? "primary" : _61, _62 = _60.secondary, secondary = _62 === void 0 ? "secondary" : _62;
        console.log(nameA);
    }
}
catch (e_18_1) { e_18 = { error: e_18_1 }; }
finally {
    try { __close(iterator_10); } finally { if (e_18) throw e_18.error; }
}
for (var _63 = 0, _64 = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _63 < _64.length; _63++) {
    _65 = _64[_63], _66 = _65.name, name = _66 === void 0 ? "noName" : _66, _67 = _65.skills, _68 = _67 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _67, _69 = _68.primary, primary = _69 === void 0 ? "primary" : _69, _70 = _68.secondary, secondary = _70 === void 0 ? "secondary" : _70;
    console.log(nameA);
}
var _a, e_1, _b, e_2, _d, _e, _f, _g, _h, e_3, _j, _k, _l, _m, e_4, _o, _p, _q, _r, e_5, _s, e_6, _t, e_7, _w, _x, _y, _z, _0, e_8, _1, _2, _3, _4, e_9, _7, _8, _9, _10, _11, _12, _13, e_10, _14, _15, _16, e_11, _19, _20, _21, _22, _23, _24, _25, _26, _27, e_12, _28, _29, _30, _31, _32, _33, e_13, _34, _35, _36, _37, _38, _39, e_14, _40, _41, _42, e_15, _43, _44, _45, e_16, _48, _49, _50, _51, _52, _53, _54, _55, _56, e_17, _57, _58, _59, _60, _61, _62, e_18, _65, _66, _67, _68, _69, _70;
//# sourceMappingURL=sourceMapValidationDestructuringForOfObjectBindingPatternDefaultValues2.js.map