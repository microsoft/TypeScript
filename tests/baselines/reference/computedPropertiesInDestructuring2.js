//// [tests/cases/compiler/computedPropertiesInDestructuring2.ts] ////

//// [computedPropertiesInDestructuring2.ts]
let foo2 = () => "bar";
let {[foo2()]: bar3} = {};

//// [computedPropertiesInDestructuring2.js]
let foo2 = () => "bar";
let { [foo2()]: bar3 } = {};
