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
    var _b = _a === void 0 ? {} : _a, _c = _b.name, nameA = _c === void 0 ? "<NoName>" : _c;
    console.log(nameA);
}
function foo2(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.name, nameB = _c === void 0 ? "<NoName>" : _c, _d = _b.skill, skillB = _d === void 0 ? "noSkill" : _d;
    console.log(nameB);
}
function foo3(_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.name, name = _c === void 0 ? "<NoName>" : _c;
    console.log(name);
}
foo1(robotA);
foo1({ name: "Edger", skill: "cutting edges" });
foo2(robotA);
foo2({ name: "Edger", skill: "cutting edges" });
foo3(robotA);
foo3({ name: "Edger", skill: "cutting edges" });
//# sourceMappingURL=sourceMapValidationDestructuringParameterObjectBindingPatternDefaultValues.js.map