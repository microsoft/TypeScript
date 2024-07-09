// Rest parameters without type annotations are 'any', errors only for the functions with 2 rest params

function foo(...x) { }
var f = function foo(...x) { }
var f2 = (...x, ...y) => { }

class C {
    foo(...x) { }
}

interface I {
    (...x);
    foo(...x, ...y);
}

var a: {
    (...x);
    foo(...x);
}

var b = {
    foo(...x) { },
    a: function foo(...x, ...y) { },
    b: (...x) => { }
}
