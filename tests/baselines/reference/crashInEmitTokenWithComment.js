//// [crashInEmitTokenWithComment.ts]
// GH#32358
const fn = (param: string) => undefined;

const foo = {bar: 'a'};
fn(({[foo.bar]: c}) => undefined);

//// [crashInEmitTokenWithComment.js]
// GH#32358
var fn = function (param) { return undefined; };
var foo = { bar: 'a' };
fn(function (_a) {
    var _b = foo.bar, c = _a[_b];
    return undefined;
});
