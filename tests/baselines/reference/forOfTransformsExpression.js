//// [forOfTransformsExpression.ts]
// https://github.com/Microsoft/TypeScript/issues/11024
let items = [{ name: "A" }, { name: "C" }, { name: "B" }];
for (var item of items.sort((a, b) => a.name.localeCompare(b.name))) {

}

//// [forOfTransformsExpression.js]
// https://github.com/Microsoft/TypeScript/issues/11024
var items = [{ name: "A" }, { name: "C" }, { name: "B" }];
for (var _i = 0, _a = items.sort(function (a, b) { return a.name.localeCompare(b.name); }); _i < _a.length; _i++) {
    var item = _a[_i];
}
