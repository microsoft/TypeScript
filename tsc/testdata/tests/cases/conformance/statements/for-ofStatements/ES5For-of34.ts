// @target: es5, es2015
//@sourcemap: true
//@downlevelIteration: true
function foo() {
    return { x: 0 };
}
for (foo().x of ['a', 'b', 'c']) {
    var p = foo().x;
}