//// [tests/cases/compiler/forOfTransformsExpression.ts] ////

//// [forOfTransformsExpression.ts]
// https://github.com/Microsoft/TypeScript/issues/11024
let items = [{ name: "A" }, { name: "C" }, { name: "B" }];
for (var item of items.sort((a, b) => a.name.localeCompare(b.name))) {

}

//// [forOfTransformsExpression.js]
// https://github.com/Microsoft/TypeScript/issues/11024
let items = [{ name: "A" }, { name: "C" }, { name: "B" }];
for (var item of items.sort((a, b) => a.name.localeCompare(b.name))) {
}
