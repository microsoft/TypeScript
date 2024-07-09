//// [tests/cases/compiler/parameterDestructuringObjectLiteral.ts] ////

//// [parameterDestructuringObjectLiteral.ts]
// Repro from #22644

const fn1 = (options: { headers?: {} }) => { };
fn1({ headers: { foo: 1 } });

const fn2 = ({ headers = {} }) => { };
fn2({ headers: { foo: 1 } });


//// [parameterDestructuringObjectLiteral.js]
// Repro from #22644
var fn1 = function (options) { };
fn1({ headers: { foo: 1 } });
var fn2 = function (_a) {
    var _b = _a.headers, headers = _b === void 0 ? {} : _b;
};
fn2({ headers: { foo: 1 } });


//// [parameterDestructuringObjectLiteral.d.ts]
declare const fn1: (options: {
    headers?: {};
}) => void;
declare const fn2: ({ headers }: {
    headers?: {};
}) => void;
