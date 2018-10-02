// @lib: es2015

// Tests fix for #27496, predicates should not have to return booleans
const foo = [
    { name: 'bar' },
    { name: null },
    { name: 'baz' }
];
const fizz = [
    { name: null }
];

foo.findIndex(x => x.name);
fizz.findIndex(x => x.name);