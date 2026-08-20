// @target: es2015
// All should be allowed
function f(): any { }
var f2: () => any = () => { };
var f3 = (): any => { };