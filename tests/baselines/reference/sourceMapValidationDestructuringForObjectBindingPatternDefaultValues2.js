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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36, _37, _38, _39, _40, _41, _42, _43, _44, _45, _46, _47, _48, _49, _50, _51, _52, _53, _54, _55, _56, _57, _58, _59, _60, _61, _62, _63;
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
for (_a = robot.name, nameA = _a === void 0 ? "noName" : _a, robot, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_b = getRobot(), _c = _b.name, nameA = _c === void 0 ? "noName" : _c, _b, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_d = { name: "trimmer", skill: "trimming" }, _e = _d.name, nameA = _e === void 0 ? "noName" : _e, _d, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_f = multiRobot.skills, _g = _f === void 0 ? { primary: "none", secondary: "none" } : _f, _h = _g.primary, primaryA = _h === void 0 ? "primary" : _h, _j = _g.secondary, secondaryA = _j === void 0 ? "secondary" : _j, multiRobot, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_k = getMultiRobot(), _l = _k.skills, _m = _l === void 0 ? { primary: "none", secondary: "none" } : _l, _o = _m.primary, primaryA = _o === void 0 ? "primary" : _o, _p = _m.secondary, secondaryA = _p === void 0 ? "secondary" : _p, _k, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_q = { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }, _r = _q.skills, _s = _r === void 0 ? { primary: "none", secondary: "none" } : _r, _t = _s.primary, primaryA = _t === void 0 ? "primary" : _t, _u = _s.secondary, secondaryA = _u === void 0 ? "secondary" : _u, _q,
    i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_v = robot.name, name = _v === void 0 ? "noName" : _v, robot, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_w = getRobot(), _x = _w.name, name = _x === void 0 ? "noName" : _x, _w, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_y = { name: "trimmer", skill: "trimming" }, _z = _y.name, name = _z === void 0 ? "noName" : _z, _y, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_0 = multiRobot.skills, _1 = _0 === void 0 ? { primary: "none", secondary: "none" } : _0, _2 = _1.primary, primary = _2 === void 0 ? "primary" : _2, _3 = _1.secondary, secondary = _3 === void 0 ? "secondary" : _3, multiRobot, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_4 = getMultiRobot(), _5 = _4.skills, _6 = _5 === void 0 ? { primary: "none", secondary: "none" } : _5, _7 = _6.primary, primary = _7 === void 0 ? "primary" : _7, _8 = _6.secondary, secondary = _8 === void 0 ? "secondary" : _8, _4, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_9 = { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }, _10 = _9.skills, _11 = _10 === void 0 ? { primary: "none", secondary: "none" } : _10, _12 = _11.primary, primary = _12 === void 0 ? "primary" : _12, _13 = _11.secondary, secondary = _13 === void 0 ? "secondary" : _13, _9,
    i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_14 = robot.name, nameA = _14 === void 0 ? "noName" : _14, _15 = robot.skill, skillA = _15 === void 0 ? "skill" : _15, robot, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_16 = getRobot(), _17 = _16.name, nameA = _17 === void 0 ? "noName" : _17, _18 = _16.skill, skillA = _18 === void 0 ? "skill" : _18, _16, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_19 = { name: "trimmer", skill: "trimming" }, _20 = _19.name, nameA = _20 === void 0 ? "noName" : _20, _21 = _19.skill, skillA = _21 === void 0 ? "skill" : _21, _19, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_22 = multiRobot.name, nameA = _22 === void 0 ? "noName" : _22, _23 = multiRobot.skills, _24 = _23 === void 0 ? { primary: "none", secondary: "none" } : _23, _25 = _24.primary, primaryA = _25 === void 0 ? "primary" : _25, _26 = _24.secondary, secondaryA = _26 === void 0 ? "secondary" : _26, multiRobot, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_27 = getMultiRobot(), _28 = _27.name, nameA = _28 === void 0 ? "noName" : _28, _29 = _27.skills, _30 = _29 === void 0 ? { primary: "none", secondary: "none" } : _29, _31 = _30.primary, primaryA = _31 === void 0 ? "primary" : _31, _32 = _30.secondary, secondaryA = _32 === void 0 ? "secondary" : _32, _27, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_33 = { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }, _34 = _33.name, nameA = _34 === void 0 ? "noName" : _34, _35 = _33.skills, _36 = _35 === void 0 ? { primary: "none", secondary: "none" } : _35, _37 = _36.primary, primaryA = _37 === void 0 ? "primary" : _37, _38 = _36.secondary, secondaryA = _38 === void 0 ? "secondary" : _38, _33,
    i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_39 = robot.name, name = _39 === void 0 ? "noName" : _39, _40 = robot.skill, skill = _40 === void 0 ? "skill" : _40, robot, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_41 = getRobot(), _42 = _41.name, name = _42 === void 0 ? "noName" : _42, _43 = _41.skill, skill = _43 === void 0 ? "skill" : _43, _41, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_44 = { name: "trimmer", skill: "trimming" }, _45 = _44.name, name = _45 === void 0 ? "noName" : _45, _46 = _44.skill, skill = _46 === void 0 ? "skill" : _46, _44, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_47 = multiRobot.name, name = _47 === void 0 ? "noName" : _47, _48 = multiRobot.skills, _49 = _48 === void 0 ? { primary: "none", secondary: "none" } : _48, _50 = _49.primary, primary = _50 === void 0 ? "primary" : _50, _51 = _49.secondary, secondary = _51 === void 0 ? "secondary" : _51, multiRobot, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_52 = getMultiRobot(), _53 = _52.name, name = _53 === void 0 ? "noName" : _53, _54 = _52.skills, _55 = _54 === void 0 ? { primary: "none", secondary: "none" } : _54, _56 = _55.primary, primary = _56 === void 0 ? "primary" : _56, _57 = _55.secondary, secondary = _57 === void 0 ? "secondary" : _57, _52, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_58 = { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }, _59 = _58.name, name = _59 === void 0 ? "noName" : _59, _60 = _58.skills, _61 = _60 === void 0 ? { primary: "none", secondary: "none" } : _60, _62 = _61.primary, primary = _62 === void 0 ? "primary" : _62, _63 = _61.secondary, secondary = _63 === void 0 ? "secondary" : _63, _58,
    i = 0; i < 1; i++) {
    console.log(primaryA);
}
//# sourceMappingURL=sourceMapValidationDestructuringForObjectBindingPatternDefaultValues2.js.map