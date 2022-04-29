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
var robots = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }];
var multiRobots = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }];
function getRobots() {
    return robots;
}
function getMultiRobots() {
    return multiRobots;
}
for (var _i = 0, robots_1 = robots; _i < robots_1.length; _i++) {
    var _a = robots_1[_i].name, nameA = _a === void 0 ? "noName" : _a;
    console.log(nameA);
}
for (var _b = 0, _c = getRobots(); _b < _c.length; _b++) {
    var _d = _c[_b].name, nameA = _d === void 0 ? "noName" : _d;
    console.log(nameA);
}
for (var _e = 0, _f = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _e < _f.length; _e++) {
    var _g = _f[_e].name, nameA = _g === void 0 ? "noName" : _g;
    console.log(nameA);
}
for (var _h = 0, multiRobots_1 = multiRobots; _h < multiRobots_1.length; _h++) {
    var _j = multiRobots_1[_h].skills, _k = _j === void 0 ? { primary: "nosKill", secondary: "noSkill" } : _j, _l = _k.primary, primaryA = _l === void 0 ? "primary" : _l, _m = _k.secondary, secondaryA = _m === void 0 ? "secondary" : _m;
    console.log(primaryA);
}
for (var _o = 0, _p = getMultiRobots(); _o < _p.length; _o++) {
    var _q = _p[_o].skills, _r = _q === void 0 ? { primary: "nosKill", secondary: "noSkill" } : _q, _s = _r.primary, primaryA = _s === void 0 ? "primary" : _s, _t = _r.secondary, secondaryA = _t === void 0 ? "secondary" : _t;
    console.log(primaryA);
}
for (var _u = 0, _v = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _u < _v.length; _u++) {
    var _w = _v[_u].skills, _x = _w === void 0 ? { primary: "nosKill", secondary: "noSkill" } : _w, _y = _x.primary, primaryA = _y === void 0 ? "primary" : _y, _z = _x.secondary, secondaryA = _z === void 0 ? "secondary" : _z;
    console.log(primaryA);
}
for (var _0 = 0, robots_2 = robots; _0 < robots_2.length; _0++) {
    var _1 = robots_2[_0], _2 = _1.name, nameA = _2 === void 0 ? "noName" : _2, _3 = _1.skill, skillA = _3 === void 0 ? "noSkill" : _3;
    console.log(nameA);
}
for (var _4 = 0, _5 = getRobots(); _4 < _5.length; _4++) {
    var _6 = _5[_4], _7 = _6.name, nameA = _7 === void 0 ? "noName" : _7, _8 = _6.skill, skillA = _8 === void 0 ? "noSkill" : _8;
    console.log(nameA);
}
for (var _9 = 0, _10 = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]; _9 < _10.length; _9++) {
    var _11 = _10[_9], _12 = _11.name, nameA = _12 === void 0 ? "noName" : _12, _13 = _11.skill, skillA = _13 === void 0 ? "noSkill" : _13;
    console.log(nameA);
}
for (var _14 = 0, multiRobots_2 = multiRobots; _14 < multiRobots_2.length; _14++) {
    var _15 = multiRobots_2[_14], _16 = _15.name, nameA = _16 === void 0 ? "noName" : _16, _17 = _15.skills, _18 = _17 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _17, _19 = _18.primary, primaryA = _19 === void 0 ? "primary" : _19, _20 = _18.secondary, secondaryA = _20 === void 0 ? "secondary" : _20;
    console.log(nameA);
}
for (var _21 = 0, _22 = getMultiRobots(); _21 < _22.length; _21++) {
    var _23 = _22[_21], _24 = _23.name, nameA = _24 === void 0 ? "noName" : _24, _25 = _23.skills, _26 = _25 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _25, _27 = _26.primary, primaryA = _27 === void 0 ? "primary" : _27, _28 = _26.secondary, secondaryA = _28 === void 0 ? "secondary" : _28;
    console.log(nameA);
}
for (var _29 = 0, _30 = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]; _29 < _30.length; _29++) {
    var _31 = _30[_29], _32 = _31.name, nameA = _32 === void 0 ? "noName" : _32, _33 = _31.skills, _34 = _33 === void 0 ? { primary: "noSkill", secondary: "noSkill" } : _33, _35 = _34.primary, primaryA = _35 === void 0 ? "primary" : _35, _36 = _34.secondary, secondaryA = _36 === void 0 ? "secondary" : _36;
    console.log(nameA);
}
//# sourceMappingURL=sourceMapValidationDestructuringForOfObjectBindingPatternDefaultValues.js.map