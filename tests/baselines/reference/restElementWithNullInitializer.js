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
function foo2(_b) {
    var r = (_b === void 0 ? undefined : _b).slice(0);
}
function foo3(_c) {
    var r = (_c === void 0 ? {} : _c).slice(0);
}
function foo4(_d) {
    var r = (_d === void 0 ? [] : _d).slice(0);
}
