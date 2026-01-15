// Rest parameters must be an array type if they have a type annotation, errors only for the functions with 2 rest params

function foo(...x: number[]) { }
var f = function foo(...x: number[]) { }
var f2 = (...x: number[], ...y: number[]) => { }

class C {
    foo(...x: number[]) { }
}

interface I {
    (...x: number[]);
    foo(...x: number[], ...y: number[]);
}

var a: {
    (...x: number[]);
    foo(...x: number[]);
}

var b = {
    foo(...x: number[]) { },
    a: function foo(...x: number[], ...y: number[]) { },
    b: (...x: number[]) => { }
}




function foo2(...x: Array<string>) { }
var f3 = function foo(...x: Array<string>) { }
var f4 = (...x: Array<string>, ...y: Array<string>) => { }

class C2 {
    foo(...x: Array<string>) { }
}

interface I2 {
    (...x: Array<string>);
    foo(...x: Array<string>, ...y: Array<string>);
}

var a2: {
    (...x: Array<string>);
    foo(...x: Array<string>);
}

var b2 = {
    foo(...x: Array<string>) { },
    a: function foo(...x: Array<string>, ...y: Array<string>) { },
    b: (...x: Array<string>) => { }
}