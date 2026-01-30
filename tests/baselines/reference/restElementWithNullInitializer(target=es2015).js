//// [tests/cases/conformance/es6/destructuring/restElementWithNullInitializer.ts] ////

//// [restElementWithNullInitializer.ts]
function foo1([...r] = null) {
}

function foo2([...r] = undefined) {
}

function foo3([...r] = {}) {
}

function foo4([...r] = []) {
}


//// [restElementWithNullInitializer.js]
function foo1([...r] = null) {
}
function foo2([...r] = undefined) {
}
function foo3([...r] = {}) {
}
function foo4([...r] = []) {
}
