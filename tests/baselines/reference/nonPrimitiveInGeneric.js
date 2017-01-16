//// [nonPrimitiveInGeneric.ts]
function generic<T>(t: T) {}
var a = {};
var b = "42";

generic<object>({});
generic<object>(a);
generic<object>(123); // expect error
generic<object>(b); // expect error

function bound<T extends object>(t: T) {}

bound({});
bound(a);
bound(123); // expect error
bound(b); // expect error

function bound2<T extends object>() {}

bound2<{}>();
bound2<Object>();
bound2<number>(); // expect error
bound2<string>(); // expect error

interface Proxy<T extends object> {}

var x: Proxy<number>; // error
var y: Proxy<null>; // ok
var z: Proxy<undefined> ; // ok


interface Blah {
  foo: number;
}

var u: Proxy<Blah>; // ok


//// [nonPrimitiveInGeneric.js]
function generic(t) { }
var a = {};
var b = "42";
generic({});
generic(a);
generic(123); // expect error
generic(b); // expect error
function bound(t) { }
bound({});
bound(a);
bound(123); // expect error
bound(b); // expect error
function bound2() { }
bound2();
bound2();
bound2(); // expect error
bound2(); // expect error
var x; // error
var y; // ok
var z; // ok
var u; // ok
