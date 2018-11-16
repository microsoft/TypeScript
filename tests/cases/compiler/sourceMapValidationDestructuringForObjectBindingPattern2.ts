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