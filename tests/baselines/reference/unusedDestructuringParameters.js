//// [unusedDestructuringParameters.ts]
const f = ([a]) => { };
f([1]);
const f2 = ({a}) => { };
f2({ a: 10 });

//// [unusedDestructuringParameters.js]
var f = function (_a) {
    var a = _a[0];
};
f([1]);
var f2 = function (_a) {
    var a = _a.a;
};
f2({ a: 10 });
