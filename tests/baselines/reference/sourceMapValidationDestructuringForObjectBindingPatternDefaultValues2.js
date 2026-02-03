//// [tests/cases/compiler/sourceMapValidationDestructuringForObjectBindingPatternDefaultValues2.ts] ////

//// [sourceMapValidationDestructuringForObjectBindingPatternDefaultValues2.ts]
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

let robot: Robot = { name: "mower", skill: "mowing" };
let multiRobot: MultiRobot = { name: "mower", skills: { primary: "mowing", secondary: "none" } };
function getRobot() {
    return robot;
}
function getMultiRobot() {
    return multiRobot;
}

let nameA: string, primaryA: string, secondaryA: string, i: number, skillA: string;
let name: string, primary: string, secondary: string, skill: string;

for ({name: nameA = "noName" } = robot, i = 0; i < 1; i++) {
    console.log(nameA);
}
for ({name: nameA = "noName" } = getRobot(), i = 0; i < 1; i++) {
    console.log(nameA);
}
for ({name: nameA = "noName" } = <Robot>{ name: "trimmer", skill: "trimming" }, i = 0; i < 1; i++) {
    console.log(nameA);
}
for ({
    skills: {
        primary: primaryA = "primary",
        secondary: secondaryA = "secondary"
    } = { primary: "none", secondary: "none" }
} = multiRobot, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for ({
    skills: {
        primary: primaryA = "primary",
        secondary: secondaryA = "secondary"
    } = { primary: "none", secondary: "none" }
} = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(primaryA);
}
for ({
    skills: {
        primary: primaryA = "primary",
        secondary: secondaryA = "secondary"
    } = { primary: "none", secondary: "none" }
} = <MultiRobot>{ name: "trimmer", skills: { primary: "trimming", secondary: "edging" } },
    i = 0; i < 1; i++) {
    console.log(primaryA);
}

for ({ name = "noName" } = robot, i = 0; i < 1; i++) {
    console.log(nameA);
}
for ({ name = "noName" } = getRobot(), i = 0; i < 1; i++) {
    console.log(nameA);
}
for ({ name = "noName" } = <Robot>{ name: "trimmer", skill: "trimming" }, i = 0; i < 1; i++) {
    console.log(nameA);
}
for ({
    skills: {
        primary = "primary",
        secondary = "secondary"
    } = { primary: "none", secondary: "none" }
} = multiRobot, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for ({
    skills: {
        primary = "primary",
        secondary = "secondary"
    } = { primary: "none", secondary: "none" }
} = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(primaryA);
}
for ({
    skills: {
        primary = "primary",
        secondary = "secondary"
    } = { primary: "none", secondary: "none" }
} = <MultiRobot>{ name: "trimmer", skills: { primary: "trimming", secondary: "edging" } },
    i = 0; i < 1; i++) {
    console.log(primaryA);
}


for ({name: nameA = "noName", skill: skillA = "skill" } = robot, i = 0; i < 1; i++) {
    console.log(nameA);
}
for ({name: nameA = "noName", skill: skillA = "skill" } = getRobot(), i = 0; i < 1; i++) {
    console.log(nameA);
}
for ({name: nameA = "noName", skill: skillA = "skill" } = <Robot>{ name: "trimmer", skill: "trimming" }, i = 0; i < 1; i++) {
    console.log(nameA);
}
for ({
    name: nameA = "noName",
    skills: {
        primary: primaryA = "primary",
        secondary: secondaryA = "secondary"
    } = { primary: "none", secondary: "none" }
} = multiRobot, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for ({
    name: nameA = "noName",
    skills: {
        primary: primaryA = "primary",
        secondary: secondaryA = "secondary"
    } = { primary: "none", secondary: "none" }
} = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(primaryA);
}
for ({
    name: nameA = "noName",
    skills: {
        primary: primaryA = "primary",
        secondary: secondaryA = "secondary"
    } = { primary: "none", secondary: "none" }
} = <MultiRobot>{ name: "trimmer", skills: { primary: "trimming", secondary: "edging" } },
    i = 0; i < 1; i++) {
    console.log(primaryA);
}

for ({ name = "noName", skill = "skill" } = robot, i = 0; i < 1; i++) {
    console.log(nameA);
}
for ({ name = "noName", skill = "skill" } = getRobot(), i = 0; i < 1; i++) {
    console.log(nameA);
}
for ({ name = "noName", skill = "skill" } = <Robot>{ name: "trimmer", skill: "trimming" }, i = 0; i < 1; i++) {
    console.log(nameA);
}
for ({
    name = "noName",
    skills: {
        primary = "primary",
        secondary = "secondary"
    } = { primary: "none", secondary: "none" }
} = multiRobot, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for ({
    name = "noName",
    skills: {
        primary = "primary",
        secondary = "secondary"
    } = { primary: "none", secondary: "none" }
} = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(primaryA);
}
for ({
    name = "noName",
    skills: {
        primary = "primary",
        secondary = "secondary"
    } = { primary: "none", secondary: "none" }
} = <MultiRobot>{ name: "trimmer", skills: { primary: "trimming", secondary: "edging" } },
    i = 0; i < 1; i++) {
    console.log(primaryA);
}

//// [sourceMapValidationDestructuringForObjectBindingPatternDefaultValues2.js]
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55;
var robot = { name: "mower", skill: "mowing" };
var multiRobot = { name: "mower", skills: { primary: "mowing", secondary: "none" } };
function getRobot() {
    return robot;
}
function getMultiRobot() {
    return multiRobot;
}
var nameA, primaryA, secondaryA, i, skillA;
var name, primary, secondary, skill;
for (_a = robot.name, nameA = _a === void 0 ? "noName" : _a, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_b = getRobot().name, nameA = _b === void 0 ? "noName" : _b, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_c = { name: "trimmer", skill: "trimming" }.name, nameA = _c === void 0 ? "noName" : _c, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_d = multiRobot.skills, _e = _d === void 0 ? { primary: "none", secondary: "none" } : _d, _f = _e.primary, primaryA = _f === void 0 ? "primary" : _f, _g = _e.secondary, secondaryA = _g === void 0 ? "secondary" : _g, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_h = getMultiRobot().skills, _j = _h === void 0 ? { primary: "none", secondary: "none" } : _h, _k = _j.primary, primaryA = _k === void 0 ? "primary" : _k, _l = _j.secondary, secondaryA = _l === void 0 ? "secondary" : _l, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_m = { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }.skills, _o = _m === void 0 ? { primary: "none", secondary: "none" } : _m, _p = _o.primary, primaryA = _p === void 0 ? "primary" : _p, _q = _o.secondary, secondaryA = _q === void 0 ? "secondary" : _q,
    i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_r = robot.name, name = _r === void 0 ? "noName" : _r, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_s = getRobot().name, name = _s === void 0 ? "noName" : _s, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_t = { name: "trimmer", skill: "trimming" }.name, name = _t === void 0 ? "noName" : _t, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_u = multiRobot.skills, _v = _u === void 0 ? { primary: "none", secondary: "none" } : _u, _w = _v.primary, primary = _w === void 0 ? "primary" : _w, _x = _v.secondary, secondary = _x === void 0 ? "secondary" : _x, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_y = getMultiRobot().skills, _z = _y === void 0 ? { primary: "none", secondary: "none" } : _y, _0 = _z.primary, primary = _0 === void 0 ? "primary" : _0, _1 = _z.secondary, secondary = _1 === void 0 ? "secondary" : _1, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_2 = { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }.skills, _3 = _2 === void 0 ? { primary: "none", secondary: "none" } : _2, _4 = _3.primary, primary = _4 === void 0 ? "primary" : _4, _5 = _3.secondary, secondary = _5 === void 0 ? "secondary" : _5,
    i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_6 = robot.name, nameA = _6 === void 0 ? "noName" : _6, _7 = robot.skill, skillA = _7 === void 0 ? "skill" : _7, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_8 = getRobot(), _9 = _8.name, nameA = _9 === void 0 ? "noName" : _9, _10 = _8.skill, skillA = _10 === void 0 ? "skill" : _10, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_11 = { name: "trimmer", skill: "trimming" }, _12 = _11.name, nameA = _12 === void 0 ? "noName" : _12, _13 = _11.skill, skillA = _13 === void 0 ? "skill" : _13, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_14 = multiRobot.name, nameA = _14 === void 0 ? "noName" : _14, _15 = multiRobot.skills, _16 = _15 === void 0 ? { primary: "none", secondary: "none" } : _15, _17 = _16.primary, primaryA = _17 === void 0 ? "primary" : _17, _18 = _16.secondary, secondaryA = _18 === void 0 ? "secondary" : _18, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_19 = getMultiRobot(), _20 = _19.name, nameA = _20 === void 0 ? "noName" : _20, _21 = _19.skills, _22 = _21 === void 0 ? { primary: "none", secondary: "none" } : _21, _23 = _22.primary, primaryA = _23 === void 0 ? "primary" : _23, _24 = _22.secondary, secondaryA = _24 === void 0 ? "secondary" : _24, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_25 = { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }, _26 = _25.name, nameA = _26 === void 0 ? "noName" : _26, _27 = _25.skills, _28 = _27 === void 0 ? { primary: "none", secondary: "none" } : _27, _29 = _28.primary, primaryA = _29 === void 0 ? "primary" : _29, _30 = _28.secondary, secondaryA = _30 === void 0 ? "secondary" : _30,
    i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_31 = robot.name, name = _31 === void 0 ? "noName" : _31, _32 = robot.skill, skill = _32 === void 0 ? "skill" : _32, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_33 = getRobot(), _34 = _33.name, name = _34 === void 0 ? "noName" : _34, _35 = _33.skill, skill = _35 === void 0 ? "skill" : _35, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_36 = { name: "trimmer", skill: "trimming" }, _37 = _36.name, name = _37 === void 0 ? "noName" : _37, _38 = _36.skill, skill = _38 === void 0 ? "skill" : _38, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_39 = multiRobot.name, name = _39 === void 0 ? "noName" : _39, _40 = multiRobot.skills, _41 = _40 === void 0 ? { primary: "none", secondary: "none" } : _40, _42 = _41.primary, primary = _42 === void 0 ? "primary" : _42, _43 = _41.secondary, secondary = _43 === void 0 ? "secondary" : _43, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_44 = getMultiRobot(), _45 = _44.name, name = _45 === void 0 ? "noName" : _45, _46 = _44.skills, _47 = _46 === void 0 ? { primary: "none", secondary: "none" } : _46, _48 = _47.primary, primary = _48 === void 0 ? "primary" : _48, _49 = _47.secondary, secondary = _49 === void 0 ? "secondary" : _49, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_50 = { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }, _51 = _50.name, name = _51 === void 0 ? "noName" : _51, _52 = _50.skills, _53 = _52 === void 0 ? { primary: "none", secondary: "none" } : _52, _54 = _53.primary, primary = _54 === void 0 ? "primary" : _54, _55 = _53.secondary, secondary = _55 === void 0 ? "secondary" : _55,
    i = 0; i < 1; i++) {
    console.log(primaryA);
}
//# sourceMappingURL=sourceMapValidationDestructuringForObjectBindingPatternDefaultValues2.js.map