// @lib: es5
// @sourcemap: true
declare var console: {
    log(msg: string): void;
}
interface Robot {
    name: string;
    skills: {
        primary?: string;
        secondary?: string;
    };
}
var robotA: Robot = { name: "mower", skills: { primary: "mowing", secondary: "none" } };
var robotB: Robot = { name: "trimmer", skills: { primary: "trimming", secondary: "edging" } };

var {
    skills: {
        primary: primaryA = "noSkill",
        secondary: secondaryA = "noSkill"
    } = { primary: "noSkill", secondary: "noSkill" }
} = robotA;
var {
    name: nameB = "noNameSpecified",
    skills: {
        primary: primaryB = "noSkill",
        secondary: secondaryB = "noSkill"
    } = { primary: "noSkill", secondary: "noSkill" }
} = robotB;
var {
    name: nameC = "noNameSpecified",
    skills: {
        primary: primaryB = "noSkill",
        secondary: secondaryB = "noSkill"
    } = { primary: "noSkill", secondary: "noSkill" }
} = <Robot>{ name: "Edger", skills: { primary: "edging", secondary: "branch trimming" } };

if (nameB == nameB) {
    console.log(nameC);
}
else {
    console.log(nameC);
}