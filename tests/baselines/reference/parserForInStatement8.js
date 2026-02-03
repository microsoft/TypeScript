//// [tests/cases/conformance/parser/ecmascript5/Statements/parserForInStatement8.ts] ////

//// [parserForInStatement8.ts]
// repro from https://github.com/microsoft/TypeScript/issues/54769

for (let [x = 'a' in {}] in { '': 0 }) console.log(x)
for (let {x = 'a' in {}} in { '': 0 }) console.log(x)


//// [parserForInStatement8.js]
// repro from https://github.com/microsoft/TypeScript/issues/54769
for (var _a = (void 0)[0], x = _a === void 0 ? 'a' in {} : _a in { '': 0 })
    console.log(x);
for (var _b = (void 0).x, x = _b === void 0 ? 'a' in {} : _b in { '': 0 })
    console.log(x);
