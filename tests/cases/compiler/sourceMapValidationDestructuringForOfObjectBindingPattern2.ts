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

for ({name: nameA } of robots) {
    console.log(nameA);
}
for ({name: nameA } of getRobots()) {
    console.log(nameA);
}
for ({name: nameA } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for ({ skills: { primary: primaryA, secondary: secondaryA } } of multiRobots) {
    console.log(primaryA);
}
for ({ skills: { primary: primaryA, secondary: secondaryA } } of getMultiRobots()) {
    console.log(primaryA);
}
for ({ skills: { primary: primaryA, secondary: secondaryA } } of [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(primaryA);
}
for ({name } of robots) {
    console.log(nameA);
}
for ({name } of getRobots()) {
    console.log(nameA);
}
for ({name } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for ({ skills: { primary, secondary } } of multiRobots) {
    console.log(primaryA);
}
for ({ skills: { primary, secondary } } of getMultiRobots()) {
    console.log(primaryA);
}
for ({ skills: { primary, secondary } } of [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(primaryA);
}


for ({name: nameA, skill: skillA } of robots) {
    console.log(nameA);
}
for ({name: nameA, skill: skillA } of getRobots()) {
    console.log(nameA);
}
for ({name: nameA, skill: skillA } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for ({name: nameA, skills: { primary: primaryA, secondary: secondaryA } } of multiRobots) {
    console.log(nameA);
}
for ({name: nameA, skills: { primary: primaryA, secondary: secondaryA } } of getMultiRobots()) {
    console.log(nameA);
}
for ({name: nameA, skills: { primary: primaryA, secondary: secondaryA } } of [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(nameA);
}
for ({name, skill } of robots) {
    console.log(nameA);
}
for ({name, skill } of getRobots()) {
    console.log(nameA);
}
for ({name, skill } of [{ name: "mower", skill: "mowing" }, { name: "trimmer", skill: "trimming" }]) {
    console.log(nameA);
}
for ({name, skills: { primary, secondary } } of multiRobots) {
    console.log(nameA);
}
for ({name, skills: { primary, secondary } } of getMultiRobots()) {
    console.log(nameA);
}
for ({name, skills: { primary, secondary } } of [{ name: "mower", skills: { primary: "mowing", secondary: "none" } },
    { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } }]) {
    console.log(nameA);
}