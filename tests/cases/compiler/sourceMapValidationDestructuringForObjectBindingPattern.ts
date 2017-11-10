// @lib: es5
// @sourcemap: true
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