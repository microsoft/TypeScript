//// [tests/cases/conformance/parser/ecmascript5/Statements/parserForStatement9.ts] ////

//// [parserForStatement9.ts]
// repro from https://github.com/microsoft/TypeScript/issues/54769

for (let [x = 'a' in {}] = []; !x; x = !x) console.log(x)
for (let {x = 'a' in {}} = {}; !x; x = !x) console.log(x)


//// [parserForStatement9.js]
// repro from https://github.com/microsoft/TypeScript/issues/54769
for (var _a = [][0], x = _a === void 0 ? 'a' in {} : _a; !x; x = !x)
    console.log(x);
for (var _b = {}.x, x = _b === void 0 ? 'a' in {} : _b; !x; x = !x)
    console.log(x);
