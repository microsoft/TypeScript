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

let robots: Robot[] = [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }];
let multiRobots: MultiRobot[] = [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }];

function getRobots() {
    return robots;
}

function getMultiRobots() {
    return multiRobots;
}

let nameA: string, primaryA: string, secondaryA: string, i: number, skillA: string;
let name: string, primary: string, secondary: string, skill: string;

for ({name: nameA = "noName" } of robots) {
    console.log(nameA);
}
for ({name: nameA = "noName" } of getRobots()) {
    console.log(nameA);
}
for ({name: nameA = "noName" } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for ({ skills: { primary: primaryA = "primary", secondary: secondaryA = "secondary" } =
    { primary: "nosKill", secondary: "noSkill" } } of multiRobots) {
    console.log(primaryA);
}
for ({ skills: { primary: primaryA = "primary", secondary: secondaryA = "secondary" } =
    { primary: "nosKill", secondary: "noSkill" } } of getMultiRobots()) {
    console.log(primaryA);
}
for ({ skills: { primary: primaryA = "primary", secondary: secondaryA = "secondary" } =
    { primary: "nosKill", secondary: "noSkill" } } of
    <MultiRobot[]>[{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
        { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(primaryA);
}

for ({ name = "noName" } of robots) {
    console.log(nameA);
}
for ({ name = "noName" } of getRobots()) {
    console.log(nameA);
}
for ({ name = "noName" } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for ({
    skills: {
        primary = "primary",
        secondary = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of multiRobots) {
    console.log(primaryA);
}
for ({
    skills: {
        primary = "primary",
        secondary = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of getMultiRobots()) {
    console.log(primaryA);
}
for ({
    skills: {
        primary = "primary",
        secondary = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(primaryA);
}


for ({name: nameA = "noName", skill: skillA = "noSkill" } of robots) {
    console.log(nameA);
}
for ({name: nameA = "noName", skill: skillA = "noSkill"  } of getRobots()) {
    console.log(nameA);
}
for ({name: nameA = "noName", skill: skillA = "noSkill"  } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for ({
    name: nameA = "noName",
    skills: {
        primary: primaryA = "primary",
        secondary: secondaryA = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of multiRobots) {
    console.log(nameA);
}
for ({
    name: nameA = "noName",
    skills: {
        primary: primaryA = "primary",
        secondary: secondaryA = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of getMultiRobots()) {
    console.log(nameA);
}
for ({
    name: nameA = "noName",
    skills: {
        primary: primaryA = "primary",
        secondary: secondaryA = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of <MultiRobot[]>[{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(nameA);
}

for ({ name = "noName", skill  = "noSkill" } of robots) {
    console.log(nameA);
}
for ({ name = "noName", skill = "noSkill"  } of getRobots()) {
    console.log(nameA);
}
for ({ name = "noName", skill  = "noSkill" } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for ({
    name = "noName",
    skills: {
        primary = "primary",
        secondary = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of multiRobots) {
    console.log(nameA);
}
for ({
    name = "noName",
    skills: {
        primary = "primary",
        secondary = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of getMultiRobots()) {
    console.log(nameA);
}
for ({
    name = "noName",
    skills: {
        primary = "primary",
        secondary = "secondary"
    } = { primary: "noSkill", secondary: "noSkill" }
} of [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(nameA);
}