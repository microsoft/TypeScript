// Rest parameters must be an array type if they have a type annotation, 
// user defined subtypes of array do not count, all of these are errors

interface MyThing extends Array<any> { }
interface MyThing2<T> extends Array<T> { }

function foo(...x: MyThing) { }
var f = function foo(...x: MyThing) { }
var f2 = (...x: MyThing, ...y: MyThing) => { }

class C {
    foo(...x: MyThing) { }
}

interface I {
    (...x: MyThing);
    foo(...x: MyThing, ...y: MyThing);
}

var a: {
    (...x: MyThing);
    foo(...x: MyThing);
}

var b = {
    foo(...x: MyThing) { },
    a: function foo(...x: MyThing, ...y: MyThing) { },
    b: (...x: MyThing) => { }
}




function foo2(...x: MyThing2<string>) { }
var f3 = function foo(...x: MyThing2<string>) { }
var f4 = (...x: MyThing2<string>, ...y: MyThing2<string>) => { }

class C2 {
    foo(...x: MyThing2<string>) { }
}

interface I2 {
    (...x: MyThing2<string>);
    foo(...x: MyThing2<string>, ...y: MyThing2<string>);
}

var a2: {
    (...x: MyThing2<string>);
    foo(...x: MyThing2<string>);
}

var b2 = {
    foo(...x: MyThing2<string>) { },
    a: function foo(...x: MyThing2<string>, ...y: MyThing2<string>) { },
    b: (...x: MyThing2<string>) => { }
}