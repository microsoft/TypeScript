//// [unusedDestructuringParameters.ts]
const f = ([a]) => { };
f([1]);
const f2 = ({a}) => { };
f2({ a: 10 });
const f3 = ([_]) => { };
f3([10]);

//// [unusedDestructuringParameters.js]
var f = function (_a) {
    var a = _a[0];
};
f([1]);
var f2 = function (_a) {
    var a = _a.a;
};
f2({ a: 10 });
var f3 = function (_a) {
    var _ = _a[0];
};
f3([10]);
