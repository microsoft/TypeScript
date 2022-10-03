// @target:es5
var f1 = () => { }
var f2 = (x: string, y: string) => { }
var f3 = (x: string, y: number, ...rest) => { }
var f4 = (x: string, y: number, z = 10) => { }
function foo(func: () => boolean) { }
foo(() => true);
foo(() => { return false; });