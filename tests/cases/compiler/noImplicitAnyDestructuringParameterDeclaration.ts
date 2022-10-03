// @noimplicitany: true
function f1([a], {b}, c, d) { // error
}
function f2([a = undefined], {b = null}, c = undefined, d = null) { // error
}
function f3([a]: [any], {b}: { b: any }, c: any, d: any) {
}
function f4({b}: { b }, x: { b }) { // error in type instead
}
function f5([a1] = [undefined], {b1} = { b1: null }, c1 = undefined, d1 = null) { // error
}