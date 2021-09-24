//// [computedPropertiesInDestructuring2.ts]
let foo2 = () => "bar";
let {[foo2()]: bar3} = {};

//// [computedPropertiesInDestructuring2.js]
var foo2 = function foo2() { return "bar"; };
var _a = {}, _b = foo2(), bar3 = _a[_b];
