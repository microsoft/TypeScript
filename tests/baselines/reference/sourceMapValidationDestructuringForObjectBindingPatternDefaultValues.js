//// [tests/cases/compiler/sourceMapValidationDestructuringForObjectBindingPatternDefaultValues.ts] ////

//// [sourceMapValidationDestructuringForObjectBindingPatternDefaultValues.ts]
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

for (let {name: nameA= "noName" } = robot, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (let {name: nameA = "noName" } = getRobot(), i = 0; i < 1; i++) {
    console.log(nameA);
}
for (let {name: nameA = "noName" } = <Robot>{ name: "trimmer", skill: "trimming" }, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (let {
    skills: {
        primary: primaryA = "primary",
        secondary: secondaryA = "secondary"
    } = { primary: "none", secondary: "none" }
} = multiRobot, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (let {
    skills: {
        primary: primaryA = "primary",
        secondary: secondaryA = "secondary"
    } = { primary: "none", secondary: "none" }
} = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (let {
    skills: {
        primary: primaryA = "primary",
        secondary: secondaryA = "secondary"
    } = { primary: "none", secondary: "none" }
} = <MultiRobot>{ name: "trimmer", skills: { primary: "trimming", secondary: "edging" } },
    i = 0; i < 1; i++) {
    console.log(primaryA);
}

for (let {name: nameA = "noName", skill: skillA = "skill" } = robot, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (let {name: nameA = "noName", skill: skillA = "skill" } = getRobot(), i = 0; i < 1; i++) {
    console.log(nameA);
}
for (let {name: nameA = "noName", skill: skillA = "skill" } = <Robot>{ name: "trimmer", skill: "trimming" }, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (let {
    name: nameA = "noName",
    skills: {
        primary: primaryA = "primary",
        secondary: secondaryA = "secondary"
    } = { primary: "none", secondary: "none" }
} = multiRobot, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (let {
    name: nameA = "noName",
    skills: {
        primary: primaryA = "primary",
        secondary: secondaryA = "secondary"
    } = { primary: "none", secondary: "none" }
} = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (let {
    name: nameA = "noName",
    skills: {
        primary: primaryA = "primary",
        secondary: secondaryA = "secondary"
    } = { primary: "none", secondary: "none" }
} = <MultiRobot>{ name: "trimmer", skills: { primary: "trimming", secondary: "edging" } },
    i = 0; i < 1; i++) {
    console.log(primaryA);
}

//// [sourceMapValidationDestructuringForObjectBindingPatternDefaultValues.js]
var robot = { name: "mower", skill: "mowing" };
var multiRobot = { name: "mower", skills: { primary: "mowing", secondary: "none" } };
function getRobot() {
    return robot;
}
function getMultiRobot() {
    return multiRobot;
}
for (var _a = robot.name, nameA = _a === void 0 ? "noName" : _a, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (var _b = getRobot().name, nameA = _b === void 0 ? "noName" : _b, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (var _c = { name: "trimmer", skill: "trimming" }.name, nameA = _c === void 0 ? "noName" : _c, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (var _d = multiRobot.skills, _e = _d === void 0 ? { primary: "none", secondary: "none" } : _d, _f = _e.primary, primaryA = _f === void 0 ? "primary" : _f, _g = _e.secondary, secondaryA = _g === void 0 ? "secondary" : _g, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (var _h = getMultiRobot().skills, _j = _h === void 0 ? { primary: "none", secondary: "none" } : _h, _k = _j.primary, primaryA = _k === void 0 ? "primary" : _k, _l = _j.secondary, secondaryA = _l === void 0 ? "secondary" : _l, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (var _m = { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }.skills, _o = _m === void 0 ? { primary: "none", secondary: "none" } : _m, _p = _o.primary, primaryA = _p === void 0 ? "primary" : _p, _q = _o.secondary, secondaryA = _q === void 0 ? "secondary" : _q, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (var _r = robot.name, nameA = _r === void 0 ? "noName" : _r, _s = robot.skill, skillA = _s === void 0 ? "skill" : _s, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (var _t = getRobot(), _u = _t.name, nameA = _u === void 0 ? "noName" : _u, _v = _t.skill, skillA = _v === void 0 ? "skill" : _v, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (var _w = { name: "trimmer", skill: "trimming" }, _x = _w.name, nameA = _x === void 0 ? "noName" : _x, _y = _w.skill, skillA = _y === void 0 ? "skill" : _y, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (var _z = multiRobot.name, nameA = _z === void 0 ? "noName" : _z, _0 = multiRobot.skills, _1 = _0 === void 0 ? { primary: "none", secondary: "none" } : _0, _2 = _1.primary, primaryA = _2 === void 0 ? "primary" : _2, _3 = _1.secondary, secondaryA = _3 === void 0 ? "secondary" : _3, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (var _4 = getMultiRobot(), _5 = _4.name, nameA = _5 === void 0 ? "noName" : _5, _6 = _4.skills, _7 = _6 === void 0 ? { primary: "none", secondary: "none" } : _6, _8 = _7.primary, primaryA = _8 === void 0 ? "primary" : _8, _9 = _7.secondary, secondaryA = _9 === void 0 ? "secondary" : _9, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (var _10 = { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }, _11 = _10.name, nameA = _11 === void 0 ? "noName" : _11, _12 = _10.skills, _13 = _12 === void 0 ? { primary: "none", secondary: "none" } : _12, _14 = _13.primary, primaryA = _14 === void 0 ? "primary" : _14, _15 = _13.secondary, secondaryA = _15 === void 0 ? "secondary" : _15, i = 0; i < 1; i++) {
    console.log(primaryA);
}
//# sourceMappingURL=sourceMapValidationDestructuringForObjectBindingPatternDefaultValues.js.map