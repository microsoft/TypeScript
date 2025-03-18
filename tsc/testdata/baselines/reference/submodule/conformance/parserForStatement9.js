//// [tests/cases/conformance/parser/ecmascript5/Statements/parserForStatement9.ts] ////

//// [parserForStatement9.ts]
// repro from https://github.com/microsoft/TypeScript/issues/54769

for (let [x = 'a' in {}] = []; !x; x = !x) console.log(x)
for (let {x = 'a' in {}} = {}; !x; x = !x) console.log(x)


//// [parserForStatement9.js]
for (let [x = 'a' in {}] = []; !x; x = !x)
    console.log(x);
for (let { x = 'a' in {} } = {}; !x; x = !x)
    console.log(x);
