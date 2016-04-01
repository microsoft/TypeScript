//// [arrayFilterNotForcingBoolean.ts]

var a = [
    { name: 'bar' },
    { name: null },
    { name: 'baz' }
]

a.filter(x => x.name); //should accepted all possible types not only boolean!

//// [arrayFilterNotForcingBoolean.js]
var a = [
    { name: 'bar' },
    { name: null },
    { name: 'baz' }
];
a.filter(function (x) { return x.name; }); //should accepted all possible types not only boolean!
