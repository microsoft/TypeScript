//// [tests/cases/conformance/controlFlow/controlFlowParameter.ts] ////

//// [controlFlowParameter.ts]
function f1(
  required: unknown = (() => {
    throw new Error("bad");
  })()
) {
  console.log("ok"); // should not trigger 'Unreachable code detected.'
}

function f2(
  a: number | string | undefined,
  required: unknown = (() => {
    a = 1;
  })()
) {
  a; // should be number | string | undefined
}

function f3(
  a: number | string | undefined = 1,
  required: unknown = (() => {
    a = "";
  })()
) {
  a; // should be number | string
}

function f4(
  a: number | string | undefined = 1,
  { [(a = "")]: b } = {} as any
) {
  a; // should be string
}


//// [controlFlowParameter.js]
function f1(required) {
    if (required === void 0) { required = (function () {
        throw new Error("bad");
    })(); }
    console.log("ok"); // should not trigger 'Unreachable code detected.'
}
function f2(a, required) {
    if (required === void 0) { required = (function () {
        a = 1;
    })(); }
    a; // should be number | string | undefined
}
function f3(a, required) {
    if (a === void 0) { a = 1; }
    if (required === void 0) { required = (function () {
        a = "";
    })(); }
    a; // should be number | string
}
function f4(a, _a) {
    if (a === void 0) { a = 1; }
    var _b = _a === void 0 ? {} : _a, _c = (a = ""), b = _b[_c];
    a; // should be string
}
