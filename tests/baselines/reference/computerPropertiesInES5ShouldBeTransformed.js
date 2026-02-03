//// [tests/cases/compiler/computerPropertiesInES5ShouldBeTransformed.ts] ////

//// [computerPropertiesInES5ShouldBeTransformed.ts]
const b = ({ [`key`]: renamed }) => renamed;

//// [computerPropertiesInES5ShouldBeTransformed.js]
var b = function (_a) {
    var _b = "key", renamed = _a[_b];
    return renamed;
};
