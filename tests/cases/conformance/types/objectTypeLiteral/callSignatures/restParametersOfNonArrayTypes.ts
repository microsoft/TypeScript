// Rest parameters must be an array type if they have a type annotation, so all these are errors

function foo(...x: string) { }
var f = function foo(...x: number) { }
var f2 = (...x: Date, ...y: boolean) => { }

class C {
    foo(...x: C) { }
}

interface I {
    (...x: string);
    foo(...x: number, ...y: number);
}

var a: {
    (...x: string);
    foo(...x: string);
}

var b = {
    foo(...x: string) { },
    a: function foo(...x: number, ...y: Date) { },
    b: (...x: string) => { }
}