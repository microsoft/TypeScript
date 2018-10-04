//// [arrayFindIndex.ts]
// Tests fix for #27496, predicates should not have to return booleans
const foo = [
    { name: 'bar' },
    { name: null },
    { name: 'baz' }
];
const fizz = [
    { name: null }
];

foo.findIndex(x => {});
foo.findIndex(x => "");
foo.findIndex(x => { return; });
foo.findIndex(x => { return null; });
foo.findIndex(x => { return undefined; });
foo.findIndex(x => x.name);
fizz.findIndex(x => x.name);

//// [arrayFindIndex.js]
// Tests fix for #27496, predicates should not have to return booleans
var foo = [
    { name: 'bar' },
    { name: null },
    { name: 'baz' }
];
var fizz = [
    { name: null }
];
foo.findIndex(function (x) { });
foo.findIndex(function (x) { return ""; });
foo.findIndex(function (x) { return; });
foo.findIndex(function (x) { return null; });
foo.findIndex(function (x) { return undefined; });
foo.findIndex(function (x) { return x.name; });
fizz.findIndex(function (x) { return x.name; });
