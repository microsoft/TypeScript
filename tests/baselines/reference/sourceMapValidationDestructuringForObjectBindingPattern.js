//// [sourceMapValidationDestructuringForObjectBindingPattern.ts]
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

for (let {name: nameA } = robot, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (let {name: nameA } = getRobot(), i = 0; i < 1; i++) {
    console.log(nameA);
}
for (let {name: nameA } = <Robot>{ name: "trimmer", skill: "trimming" }, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (let { skills: { primary: primaryA, secondary: secondaryA } } = multiRobot, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (let { skills: { primary: primaryA, secondary: secondaryA } } = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (let { skills: { primary: primaryA, secondary: secondaryA } } =
    <MultiRobot>{ name: "trimmer", skills: { primary: "trimming", secondary: "edging" } },
    i = 0; i < 1; i++) {
    console.log(primaryA);
}

for (let {name: nameA, skill: skillA } = robot, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (let {name: nameA, skill: skillA } = getRobot(), i = 0; i < 1; i++) {
    console.log(nameA);
}
for (let {name: nameA, skill: skillA } = <Robot>{ name: "trimmer", skill: "trimming" }, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (let {name: nameA, skills: { primary: primaryA, secondary: secondaryA } } = multiRobot, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (let {name: nameA, skills: { primary: primaryA, secondary: secondaryA } } = getMultiRobot(), i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (let {name: nameA, skills: { primary: primaryA, secondary: secondaryA } } =
    <MultiRobot>{ name: "trimmer", skills: { primary: "trimming", secondary: "edging" } },
    i = 0; i < 1; i++) {
    console.log(primaryA);
}

//// [sourceMapValidationDestructuringForObjectBindingPattern.js]
var robot = { name: "mower", skill: "mowing" };
var multiRobot = { name: "mower", skills: { primary: "mowing", secondary: "none" } };
function getRobot() {
    return robot;
}
function getMultiRobot() {
    return multiRobot;
}
for (var nameA = robot.name, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (var nameA = getRobot().name, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (var nameA = { name: "trimmer", skill: "trimming" }.name, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (var _a = multiRobot.skills, primaryA = _a.primary, secondaryA = _a.secondary, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (var _b = getMultiRobot().skills, primaryA = _b.primary, secondaryA = _b.secondary, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (var _c = { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }.skills, primaryA = _c.primary, secondaryA = _c.secondary, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (var nameA = robot.name, skillA = robot.skill, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (var _d = getRobot(), nameA = _d.name, skillA = _d.skill, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (var _e = { name: "trimmer", skill: "trimming" }, nameA = _e.name, skillA = _e.skill, i = 0; i < 1; i++) {
    console.log(nameA);
}
for (var nameA = multiRobot.name, _f = multiRobot.skills, primaryA = _f.primary, secondaryA = _f.secondary, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (var _g = getMultiRobot(), nameA = _g.name, _h = _g.skills, primaryA = _h.primary, secondaryA = _h.secondary, i = 0; i < 1; i++) {
    console.log(primaryA);
}
for (var _j = { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }, nameA = _j.name, _k = _j.skills, primaryA = _k.primary, secondaryA = _k.secondary, i = 0; i < 1; i++) {
    console.log(primaryA);
}
//# sourceMappingURL=sourceMapValidationDestructuringForObjectBindingPattern.js.map