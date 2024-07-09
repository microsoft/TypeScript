// @target: es5
// @declaration: true
// @downlevelIteration: true

var a: any;
let x, y, z, a1, a2, a3;

({} = { x, y, z } = a);
([] = [ a1, a2, a3] = a);