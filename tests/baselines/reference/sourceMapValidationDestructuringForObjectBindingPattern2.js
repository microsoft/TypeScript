//// [sourceMapValidationDestructuringForObjectBindingPattern2.ts]
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

for ({ name: nameA } = robot, i = 0; i < 1; i++) {
    console.log(nameA);
}
for ({ name: nameA } = getRobot(), i = 0; i < 1; i++) {
    console.log(nameA);
}
for ({ name: nameA } = <Robot>{ name: "trimmer", skill: "trimming" }, i = 0; i < 1; i++) {
    console.log(nameA);
}
for ({ skills: { primary: primaryA, secondary: secondaryA } } = multiRobot, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for ({ skills: { primary: primaryA, secondary: secondaryA } } = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(primaryA);
}
for ({ skills: { primary: primaryA, secondary: secondaryA } } =
    <MultiRobot>{ name: "trimmer", skills: { primary: "trimming", secondary: "edging" } },
    i = 0; i < 1; i++) {
    console.log(primaryA);
}
for ({ name } = robot, i = 0; i < 1; i++) {
    console.log(nameA);
}
for ({ name } = getRobot(), i = 0; i < 1; i++) {
    console.log(nameA);
}
for ({ name } = <Robot>{ name: "trimmer", skill: "trimming" }, i = 0; i < 1; i++) {
    console.log(nameA);
}
for ({ skills: { primary, secondary } } = multiRobot, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for ({ skills: { primary, secondary } } = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(primaryA);
}
for ({ skills: { primary, secondary } } =
    <MultiRobot>{ name: "trimmer", skills: { primary: "trimming", secondary: "edging" } },
    i = 0; i < 1; i++) {
    console.log(primaryA);
}


for ({ name: nameA, skill: skillA } = robot, i = 0; i < 1; i++) {
    console.log(nameA);
}
for ({ name: nameA, skill: skillA } = getRobot(), i = 0; i < 1; i++) {
    console.log(nameA);
}
for ({ name: nameA, skill: skillA } = <Robot>{ name: "trimmer", skill: "trimming" }, i = 0; i < 1; i++) {
    console.log(nameA);
}
for ({ name: nameA, skills: { primary: primaryA, secondary: secondaryA } } = multiRobot, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for ({ name: nameA, skills: { primary: primaryA, secondary: secondaryA } } = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(primaryA);
}
for ({ name: nameA, skills: { primary: primaryA, secondary: secondaryA } } =
    <MultiRobot>{ name: "trimmer", skills: { primary: "trimming", secondary: "edging" } },
    i = 0; i < 1; i++) {
    console.log(primaryA);
}
for ({ name, skill } = robot, i = 0; i < 1; i++) {
    console.log(nameA);
}
for ({ name, skill } = getRobot(), i = 0; i < 1; i++) {
    console.log(nameA);
}
for ({ name, skill } = <Robot>{ name: "trimmer", skill: "trimming" }, i = 0; i < 1; i++) {
    console.log(nameA);
}
for ({ name, skills: { primary, secondary } } = multiRobot, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for ({ name, skills: { primary, secondary } } = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(primaryA);
}
for ({ name, skills: { primary, secondary } } =
    <MultiRobot>{ name: "trimmer", skills: { primary: "trimming", secondary: "edging" } },
    i = 0; i < 1; i++) {
    console.log(primaryA);
}

//// [sourceMapValidationDestructuringForObjectBindingPattern2.js]
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3;
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
for (nameA = robot.name, robot, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_a = getRobot(), nameA = _a.name, _a, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_b = { name: "trimmer", skill: "trimming" }, nameA = _b.name, _b, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_c = multiRobot.skills, primaryA = _c.primary, secondaryA = _c.secondary, multiRobot, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_d = getMultiRobot(), _e = _d.skills, primaryA = _e.primary, secondaryA = _e.secondary, _d, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_f = { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }, _g = _f.skills, primaryA = _g.primary, secondaryA = _g.secondary, _f,
    i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (name = robot.name, robot, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_h = getRobot(), name = _h.name, _h, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_j = { name: "trimmer", skill: "trimming" }, name = _j.name, _j, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_k = multiRobot.skills, primary = _k.primary, secondary = _k.secondary, multiRobot, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_l = getMultiRobot(), _m = _l.skills, primary = _m.primary, secondary = _m.secondary, _l, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_o = { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }, _p = _o.skills, primary = _p.primary, secondary = _p.secondary, _o,
    i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (nameA = robot.name, skillA = robot.skill, robot, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_q = getRobot(), nameA = _q.name, skillA = _q.skill, _q, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_r = { name: "trimmer", skill: "trimming" }, nameA = _r.name, skillA = _r.skill, _r, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (nameA = multiRobot.name, _s = multiRobot.skills, primaryA = _s.primary, secondaryA = _s.secondary, multiRobot, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_t = getMultiRobot(), nameA = _t.name, _u = _t.skills, primaryA = _u.primary, secondaryA = _u.secondary, _t, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_v = { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }, nameA = _v.name, _w = _v.skills, primaryA = _w.primary, secondaryA = _w.secondary, _v,
    i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (name = robot.name, skill = robot.skill, robot, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_x = getRobot(), name = _x.name, skill = _x.skill, _x, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_y = { name: "trimmer", skill: "trimming" }, name = _y.name, skill = _y.skill, _y, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (name = multiRobot.name, _z = multiRobot.skills, primary = _z.primary, secondary = _z.secondary, multiRobot, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_0 = getMultiRobot(), name = _0.name, _1 = _0.skills, primary = _1.primary, secondary = _1.secondary, _0, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_2 = { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }, name = _2.name, _3 = _2.skills, primary = _3.primary, secondary = _3.secondary, _2,
    i = 0; i < 1; i++) {
    console.log(primaryA);
}
//# sourceMappingURL=sourceMapValidationDestructuringForObjectBindingPattern2.js.map