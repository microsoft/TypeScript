//// [sourceMapValidationDestructuringVariableStatementArrayBindingPatternDefaultValues.ts]
declare var console: {
    log(msg: string): void;
}
type Robot = [number, string, string];
var robotA: Robot = [1, "mower", "mowing"];
var robotB: Robot = [2, "trimmer", "trimming"];

let [, nameA = "noName"] = robotA;
let [numberB = -1] = robotB;
let [numberA2 = -1, nameA2 = "noName", skillA2 = "noSkill"] = robotA;

let [numberC2 = -1] = [3, "edging", "Trimming edges"];
let [numberC = -1, nameC = "noName", skillC = "noSkill"] = [3, "edging", "Trimming edges"];

let [numberA3 = -1, ...robotAInfo] = robotA;

if (nameA == nameA2) {
    console.log(skillA2);
}

//// [sourceMapValidationDestructuringVariableStatementArrayBindingPatternDefaultValues.js]
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
var _a = __read(robotA, 2), _b = _a[1], nameA = _b === void 0 ? "noName" : _b;
var _c = __read(robotB, 1), _d = _c[0], numberB = _d === void 0 ? -1 : _d;
var _e = __read(robotA, 3), _f = _e[0], numberA2 = _f === void 0 ? -1 : _f, _g = _e[1], nameA2 = _g === void 0 ? "noName" : _g, _h = _e[2], skillA2 = _h === void 0 ? "noSkill" : _h;
var _j = [3, "edging", "Trimming edges"][0], numberC2 = _j === void 0 ? -1 : _j;
var _k = [3, "edging", "Trimming edges"], _l = _k[0], numberC = _l === void 0 ? -1 : _l, _m = _k[1], nameC = _m === void 0 ? "noName" : _m, _o = _k[2], skillC = _o === void 0 ? "noSkill" : _o;
var _p = __read(robotA), _q = _p[0], numberA3 = _q === void 0 ? -1 : _q, robotAInfo = _p.slice(1);
if (nameA == nameA2) {
    console.log(skillA2);
}
//# sourceMappingURL=sourceMapValidationDestructuringVariableStatementArrayBindingPatternDefaultValues.js.map