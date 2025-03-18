//// [tests/cases/conformance/parser/ecmascript5/Statements/parserForInStatement8.ts] ////

//// [parserForInStatement8.ts]
// repro from https://github.com/microsoft/TypeScript/issues/54769

for (let [x = 'a' in {}] in { '': 0 }) console.log(x)
for (let {x = 'a' in {}} in { '': 0 }) console.log(x)


//// [parserForInStatement8.js]
for (let [x = 'a' in {}] in { '': 0 })
    console.log(x);
for (let { x = 'a' in {} } in { '': 0 })
    console.log(x);
