// @skipDefaultLibCheck: false
class A {
    foo: string;
}

class B extends A {
    bar: string;
}

interface Object {
    data: A;
    [x: string]: Object;
}

class C {
    valueOf() { }
    data: B;
    [x: string]: any;
}

var c: C;
var r1: void = c.valueOf();
var r1b: B = c.data;
var r1c = r1b['hm']; // should be 'Object'
var r1d = c['hm']; // should be 'any'

interface I {
    valueOf(): void;
    data: B;
    [x: string]: any;
}

var i: I;
var r2: void = i.valueOf();
var r2b: B = i.data;
var r2c = r2b['hm']; // should be 'Object'
var r2d = i['hm']; // should be 'any'

var a = {
    valueOf: () => { },
    data: new B()
}

var r3: void = a.valueOf();
var r3b: B = a.data;
var r3c = r3b['hm']; // should be 'Object'
var r3d = i['hm'];

var b: {
    valueOf(): void;
    data: B;
    [x: string]: any;
}

var r4: void = b.valueOf();