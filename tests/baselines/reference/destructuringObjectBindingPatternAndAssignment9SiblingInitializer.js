//// [tests/cases/conformance/es6/destructuring/destructuringObjectBindingPatternAndAssignment9SiblingInitializer.ts] ////

//// [destructuringObjectBindingPatternAndAssignment9SiblingInitializer.ts]
// To be inferred as `number`
function f1() {
    const { a1, b1 = a1 } = { a1: 1 };
    const { a2, b2 = 1 + a2 } = { a2: 1 };
}

// To be inferred as `string`
function f2() {
    const { a1, b1 = a1 } = { a1: 'hi' };
    const { a2, b2 = a2 + '!' } = { a2: 'hi' };
}

// To be inferred as `string | number`
function f3() {
    const { a1, b1 = a1 } = { a1: 'hi', b1: 1 };
    const { a2, b2 = a2 + '!' } = { a2: 'hi', b2: 1 };
}

// Based on comment:
//   - https://github.com/microsoft/TypeScript/issues/49989#issuecomment-1852694486
declare const yadda: { a?: number, b?: number } | undefined
function f4() {
    const { a, b = a } = yadda ?? {};
}


//// [destructuringObjectBindingPatternAndAssignment9SiblingInitializer.js]
// To be inferred as `number`
function f1() {
    var _a = { a1: 1 }, a1 = _a.a1, _b = _a.b1, b1 = _b === void 0 ? a1 : _b;
    var _c = { a2: 1 }, a2 = _c.a2, _d = _c.b2, b2 = _d === void 0 ? 1 + a2 : _d;
}
// To be inferred as `string`
function f2() {
    var _a = { a1: 'hi' }, a1 = _a.a1, _b = _a.b1, b1 = _b === void 0 ? a1 : _b;
    var _c = { a2: 'hi' }, a2 = _c.a2, _d = _c.b2, b2 = _d === void 0 ? a2 + '!' : _d;
}
// To be inferred as `string | number`
function f3() {
    var _a = { a1: 'hi', b1: 1 }, a1 = _a.a1, _b = _a.b1, b1 = _b === void 0 ? a1 : _b;
    var _c = { a2: 'hi', b2: 1 }, a2 = _c.a2, _d = _c.b2, b2 = _d === void 0 ? a2 + '!' : _d;
}
function f4() {
    var _a = yadda !== null && yadda !== void 0 ? yadda : {}, a = _a.a, _b = _a.b, b = _b === void 0 ? a : _b;
}
