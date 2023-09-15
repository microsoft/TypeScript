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
function foo1(_a) {
    var r = (_a === void 0 ? null : _a).slice(0);
}
function foo2(_a) {
    var _b = _a === void 0 ? undefined : _a, r = _b.slice(0);
}
function foo3(_a) {
    var _b = _a === void 0 ? {} : _a, r = _b.slice(0);
}
function foo4(_a) {
    var _b = _a === void 0 ? [] : _a, r = _b.slice(0);
}
