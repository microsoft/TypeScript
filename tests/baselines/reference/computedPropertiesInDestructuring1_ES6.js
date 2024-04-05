//// [tests/cases/compiler/computedPropertiesInDestructuring1_ES6.ts] ////

//// [computedPropertiesInDestructuring1_ES6.ts]
// destructuring in variable declarations
let foo = "bar";
let {[foo]: bar} = {bar: "bar"};

let {["bar"]: bar2} = {bar: "bar"};
let {[11]: bar2_1} = {11: "bar"};

let foo2 = () => "bar";
let {[foo2()]: bar3} = {bar: "bar"};

let [{[foo]: bar4}] = [{bar: "bar"}];
let [{[foo2()]: bar5}] = [{bar: "bar"}];

function f1({["bar"]: x}: { bar: number }) {}
function f2({[foo]: x}: { bar: number }) {}
function f3({[foo2()]: x}: { bar: number }) {}
function f4([{[foo]: x}]: [{ bar: number }]) {}
function f5([{[foo2()]: x}]: [{ bar: number }]) {}

// report errors on type errors in computed properties used in destructuring
let [{[foo()]: bar6}] = [{bar: "bar"}];
let [{[foo.toExponential()]: bar7}] = [{bar: "bar"}];

// destructuring assignment
({[foo]: bar} = {bar: "bar"});

({["bar"]: bar2} = {bar: "bar"});

({[foo2()]: bar3} = {bar: "bar"});

[{[foo]: bar4}] = [{bar: "bar"}];
[{[foo2()]: bar5}] = [{bar: "bar"}];

[{[foo()]: bar4}] = [{bar: "bar"}];
[{[(1 + {})]: bar4}] = [{bar: "bar"}];


//// [computedPropertiesInDestructuring1_ES6.js]
// destructuring in variable declarations
let foo = "bar";
let { [foo]: bar } = { bar: "bar" };
let { ["bar"]: bar2 } = { bar: "bar" };
let { [11]: bar2_1 } = { 11: "bar" };
let foo2 = () => "bar";
let { [foo2()]: bar3 } = { bar: "bar" };
let [{ [foo]: bar4 }] = [{ bar: "bar" }];
let [{ [foo2()]: bar5 }] = [{ bar: "bar" }];
function f1({ ["bar"]: x }) { }
function f2({ [foo]: x }) { }
function f3({ [foo2()]: x }) { }
function f4([{ [foo]: x }]) { }
function f5([{ [foo2()]: x }]) { }
// report errors on type errors in computed properties used in destructuring
let [{ [foo()]: bar6 }] = [{ bar: "bar" }];
let [{ [foo.toExponential()]: bar7 }] = [{ bar: "bar" }];
// destructuring assignment
({ [foo]: bar } = { bar: "bar" });
({ ["bar"]: bar2 } = { bar: "bar" });
({ [foo2()]: bar3 } = { bar: "bar" });
[{ [foo]: bar4 }] = [{ bar: "bar" }];
[{ [foo2()]: bar5 }] = [{ bar: "bar" }];
[{ [foo()]: bar4 }] = [{ bar: "bar" }];
[{ [(1 + {})]: bar4 }] = [{ bar: "bar" }];
