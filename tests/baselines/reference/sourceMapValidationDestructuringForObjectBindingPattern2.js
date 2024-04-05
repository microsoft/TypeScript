//// [tests/cases/compiler/sourceMapValidationDestructuringForObjectBindingPattern2.ts] ////

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
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
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
for (nameA = robot.name, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (nameA = getRobot().name, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (nameA = { name: "trimmer", skill: "trimming" }.name, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_a = multiRobot.skills, primaryA = _a.primary, secondaryA = _a.secondary, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_b = getMultiRobot().skills, primaryA = _b.primary, secondaryA = _b.secondary, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_c = { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }.skills, primaryA = _c.primary, secondaryA = _c.secondary,
    i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (name = robot.name, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (name = getRobot().name, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (name = { name: "trimmer", skill: "trimming" }.name, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_d = multiRobot.skills, primary = _d.primary, secondary = _d.secondary, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_e = getMultiRobot().skills, primary = _e.primary, secondary = _e.secondary, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_f = { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }.skills, primary = _f.primary, secondary = _f.secondary,
    i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (nameA = robot.name, skillA = robot.skill, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_g = getRobot(), nameA = _g.name, skillA = _g.skill, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_h = { name: "trimmer", skill: "trimming" }, nameA = _h.name, skillA = _h.skill, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (nameA = multiRobot.name, _j = multiRobot.skills, primaryA = _j.primary, secondaryA = _j.secondary, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_k = getMultiRobot(), nameA = _k.name, _l = _k.skills, primaryA = _l.primary, secondaryA = _l.secondary, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_m = { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }, nameA = _m.name, _o = _m.skills, primaryA = _o.primary, secondaryA = _o.secondary,
    i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (name = robot.name, skill = robot.skill, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_p = getRobot(), name = _p.name, skill = _p.skill, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (_q = { name: "trimmer", skill: "trimming" }, name = _q.name, skill = _q.skill, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (name = multiRobot.name, _r = multiRobot.skills, primary = _r.primary, secondary = _r.secondary, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_s = getMultiRobot(), name = _s.name, _t = _s.skills, primary = _t.primary, secondary = _t.secondary, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (_u = { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }, name = _u.name, _v = _u.skills, primary = _v.primary, secondary = _v.secondary,
    i = 0; i < 1; i++) {
    console.log(primaryA);
}
//# sourceMappingURL=sourceMapValidationDestructuringForObjectBindingPattern2.js.map