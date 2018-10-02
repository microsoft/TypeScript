// Tests fix for #27496, predicates should not have to return booleans
const foo = [
    { name: 'bar' },
    { name: null },
    { name: 'baz' }
];
const fizz = [
    { name: null },
    { name: null }
];

foo.some(x => x.name);
fizz.some(x => x.name);