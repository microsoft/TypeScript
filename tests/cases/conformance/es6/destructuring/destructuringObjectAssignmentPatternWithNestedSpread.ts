// @target: es5, es2015, es2018
// @noTypesAndSymbols: true
let a: any, b: any, c: any = {x: {a: 1, y: 2}}, d: any;
({x: {a, ...b} = d} = c);
