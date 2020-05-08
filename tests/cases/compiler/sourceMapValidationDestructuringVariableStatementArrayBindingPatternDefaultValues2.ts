// @lib: es5
// @sourcemap: true
declare var console: {
    log(msg: string): void;
}
type MultiSkilledRobot = [string, string[]];
var multiRobotA: MultiSkilledRobot = ["mower", ["mowing", ""]];
var multiRobotB: MultiSkilledRobot = ["trimmer", ["trimming", "edging"]];

let [, skillA = ["noSkill", "noSkill"]] = multiRobotA;
let [nameMB = "noName" ] = multiRobotB;
let [nameMA = "noName", [primarySkillA = "noSkill", secondarySkillA = "noSkill"] = ["noSkill", "noSkill"]] = multiRobotA;

let [nameMC = "noName" ] = ["roomba", ["vacuum", "mopping"]];
let [nameMC2 = "noName", [primarySkillC = "noSkill", secondarySkillC = "noSkill"] = ["noSkill", "noSkill"]] = ["roomba", ["vacuum", "mopping"]];

if (nameMB == nameMA) {
    console.log(skillA[0] + skillA[1]);
}