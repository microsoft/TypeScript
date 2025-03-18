//// [tests/cases/compiler/noImplicitAnyDestructuringParameterDeclaration.ts] ////

//// [noImplicitAnyDestructuringParameterDeclaration.ts]
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

//// [noImplicitAnyDestructuringParameterDeclaration.js]
function f1([a], { b }, c, d) {
}
function f2([a = undefined], { b = null }, c = undefined, d = null) {
}
function f3([a], { b }, c, d) {
}
function f4({ b }, x) {
}
function f5([a1] = [undefined], { b1 } = { b1: null }, c1 = undefined, d1 = null) {
}
