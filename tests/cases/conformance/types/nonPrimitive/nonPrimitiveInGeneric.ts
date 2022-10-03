// @declaration: true
function generic<T>(t: T) {
    var o: object = t; // expect error
}
var a = {};
var b = "42";

generic<object>({});
generic<object>(a);
generic<object>(123); // expect error
generic<object>(b); // expect error

function bound<T extends object>(t: T) {
    var o: object = t; // ok
}

bound({});
bound(a);
bound(123); // expect error
bound(b); // expect error

function bound2<T extends object>() {}

bound2<{}>();
bound2<Object>();
bound2<number>(); // expect error
bound2<string>(); // expect error

function bound3<T extends {}>(t: T) {
    var o: object = t; // ok
}

interface Proxy<T extends object> {}

var x: Proxy<number>; // error
var y: Proxy<null>; // ok
var z: Proxy<undefined> ; // ok


interface Blah {
    foo: number;
}

var u: Proxy<Blah>; // ok
