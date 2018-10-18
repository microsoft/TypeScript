//// [nonPrimitiveInGeneric.ts]
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


//// [nonPrimitiveInGeneric.js]
function generic(t) {
    var o = t; // expect error
}
var a = {};
var b = "42";
generic({});
generic(a);
generic(123); // expect error
generic(b); // expect error
function bound(t) {
    var o = t; // ok
}
bound({});
bound(a);
bound(123); // expect error
bound(b); // expect error
function bound2() { }
bound2();
bound2();
bound2(); // expect error
bound2(); // expect error
function bound3(t) {
    var o = t; // ok
}
var x; // error
var y; // ok
var z; // ok
var u; // ok


//// [nonPrimitiveInGeneric.d.ts]
declare function generic<T>(t: T): void;
declare var a: {};
declare var b: string;
declare function bound<T extends object>(t: T): void;
declare function bound2<T extends object>(): void;
declare function bound3<T extends {}>(t: T): void;
interface Proxy<T extends object> {
}
declare var x: Proxy<number>;
declare var y: Proxy<null>;
declare var z: Proxy<undefined>;
interface Blah {
    foo: number;
}
declare var u: Proxy<Blah>;
