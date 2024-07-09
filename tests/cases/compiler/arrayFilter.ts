var foo = [
    { name: 'bar' },
    { name: null },
    { name: 'baz' }
]

foo.filter(x => x.name); //should accepted all possible types not only boolean! 