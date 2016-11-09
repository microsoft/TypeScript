//// [sourceMapValidationDestructuringVariableStatementArrayBindingPattern.ts]
declare var console: {
    log(msg: string): void;
}
type Robot = [number, string, string];
var robotA: Robot = [1, "mower", "mowing"];
var robotB: Robot = [2, "trimmer", "trimming"];


let [, nameA] = robotA;
let [numberB] = robotB;
let [numberA2, nameA2, skillA2] = robotA;

let [numberC2] = [3, "edging", "Trimming edges"];
let [numberC, nameC, skillC] = [3, "edging", "Trimming edges"];

let [numberA3, ...robotAInfo] = robotA;

if (nameA == nameA2) {
    console.log(skillA2);
}

//// [sourceMapValidationDestructuringVariableStatementArrayBindingPattern.js]
var __read = (this && this.__read) || function (o, n) {
    if (!(m = o.__iterator__)) return o;
    var m, i = m.call(o), ar = [], r, e;
    try { while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value); }
    catch (error) { e = { error: error }; }
    finally { try { if (m = !(r && r.done) && i["return"]) m.call(i); } finally { if (e) throw e.error; } }
    return ar;
};
var robotA = [1, "mower", "mowing"];
var robotB = [2, "trimmer", "trimming"];
var _a = __read(robotA, 2), nameA = _a[1];
var _b = __read(robotB, 1), numberB = _b[0];
var _c = __read(robotA, 3), numberA2 = _c[0], nameA2 = _c[1], skillA2 = _c[2];
var numberC2 = [3, "edging", "Trimming edges"][0];
var _d = [3, "edging", "Trimming edges"], numberC = _d[0], nameC = _d[1], skillC = _d[2];
var _e = __read(robotA), numberA3 = _e[0], robotAInfo = _e.slice(1);
if (nameA == nameA2) {
    console.log(skillA2);
}
//# sourceMappingURL=sourceMapValidationDestructuringVariableStatementArrayBindingPattern.js.map