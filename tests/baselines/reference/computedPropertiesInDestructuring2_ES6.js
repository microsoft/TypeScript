//// [computedPropertiesInDestructuring2_ES6.ts]
let foo2 = () => "bar";
let {[foo2()]: bar3} = {};

//// [computedPropertiesInDestructuring2_ES6.js]
let foo2 = () => "bar";
let { [foo2()]: bar3 } = {};
