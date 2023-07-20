//// [tests/cases/conformance/parser/ecmascript5/Statements/parserForInStatement8.ts] ////

//// [parserForInStatement8.ts]
// repro from https://github.com/microsoft/TypeScript/issues/54769

for (let [x = 'a' in {}] in { '': 0 }) console.log(x)
for (let {x = 'a' in {}} in { '': 0 }) console.log(x)


//// [parserForInStatement8.js]
// repro from https://github.com/microsoft/TypeScript/issues/54769
for (var key_1 in { '': 0 }) {
    var _a = key_1[0], x = _a === void 0 ? 'a' in {} : _a;
    console.log(x);
}
for (var key_2 in { '': 0 }) {
    var _b = key_2.x, x = _b === void 0 ? 'a' in {} : _b;
    console.log(x);
}
