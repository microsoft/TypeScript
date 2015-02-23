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
function foo1(_a) {
}
function foo2(_a) {
}
function foo3(_a) {
}
function foo4(_a) {
}
