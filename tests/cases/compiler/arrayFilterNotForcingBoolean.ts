
var a = [
    { name: 'bar' },
    { name: null },
    { name: 'baz' }
]

a.filter(x => x.name); //should accepted all possible types not only boolean!