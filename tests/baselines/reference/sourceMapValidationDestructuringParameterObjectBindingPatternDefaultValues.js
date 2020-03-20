//// [sourceMapValidationDestructuringParameterObjectBindingPatternDefaultValues.ts]
interface Robot {
    name?: string;
    skill?: string;
}
declare var console: {
    log(msg: string): void;
}
var hello = "hello";
var robotA: Robot = { name: "mower", skill: "mowing" };

function foo1({ name: nameA = "<NoName>" }: Robot = { }) {
    console.log(nameA);
}
function foo2({ name: nameB = "<NoName>", skill: skillB = "noSkill" }: Robot = {}) {
    console.log(nameB);
}
function foo3({ name = "<NoName>" }: Robot = {}) {
    console.log(name);
}

foo1(robotA);
foo1({ name: "Edger", skill: "cutting edges" });

foo2(robotA);
foo2({ name: "Edger", skill: "cutting edges" });

foo3(robotA);
foo3({ name: "Edger", skill: "cutting edges" });


//// [sourceMapValidationDestructuringParameterObjectBindingPatternDefaultValues.js]
var hello = "hello";
var robotA = { name: "mower", skill: "mowing" };
function foo1(_a) {
    var _b = (_a === void 0 ? {} : _a).name, nameA = _b === void 0 ? "<NoName>" : _b;
    console.log(nameA);
}
function foo2(_c) {
    var _d = _c === void 0 ? {} : _c, _e = _d.name, nameB = _e === void 0 ? "<NoName>" : _e, _f = _d.skill, skillB = _f === void 0 ? "noSkill" : _f;
    console.log(nameB);
}
function foo3(_g) {
    var _h = (_g === void 0 ? {} : _g).name, name = _h === void 0 ? "<NoName>" : _h;
    console.log(name);
}
foo1(robotA);
foo1({ name: "Edger", skill: "cutting edges" });
foo2(robotA);
foo2({ name: "Edger", skill: "cutting edges" });
foo3(robotA);
foo3({ name: "Edger", skill: "cutting edges" });
//# sourceMappingURL=sourceMapValidationDestructuringParameterObjectBindingPatternDefaultValues.js.map