// @target: es5

"use strict"
function f0(a, [a, [b]], {b}) { }
function f1([a, a]) { }
function f2({b}, {b}) { }
function f3([c, [c], [[c]]]) { }
function f4({d, d: {d}}) { }
function f5({e, e: {e}}, {e}, [d, e, [[e]]], ...e) { }
function f6([f, ...f]) { }
function f7(a, func = (a) => { return 1 }){ }  // not error