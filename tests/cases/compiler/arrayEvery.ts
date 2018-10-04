// Tests fix for #27496, predicates should not have to return booleans
const foo = [
    { name: 'bar' },
    { name: null },
    { name: 'baz' }
];
const fizz = [
    { name: 'buzz' },
    { name: 'fizzbuzz' }
];

foo.every(x => {});
foo.every(x => "");
foo.every(x => { return; });
foo.every(x => { return null; });
foo.every(x => { return undefined; });
foo.every(x => x.name);
fizz.every(x => x.name);