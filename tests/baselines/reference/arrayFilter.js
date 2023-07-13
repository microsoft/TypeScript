//// [tests/cases/compiler/arrayFilter.ts] ////

//// [arrayFilter.ts]
var foo = [
    { name: 'bar' },
    { name: null },
    { name: 'baz' }
]

foo.filter(x => x.name); //should accepted all possible types not only boolean! 

//// [arrayFilter.js]
var foo = [
    { name: 'bar' },
    { name: null },
    { name: 'baz' }
];
foo.filter(function (x) { return x.name; }); //should accepted all possible types not only boolean! 
