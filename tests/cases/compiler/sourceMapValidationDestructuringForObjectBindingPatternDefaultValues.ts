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