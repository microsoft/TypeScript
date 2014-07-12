// Index notation should resolve to the type of a declared property with that same name
class C {
    foo: string;
}

var c: C;
var r1 = c.toString();
var r2 = c['toString']();
var r3 = c.foo;
var r4 = c['foo'];

interface I {
    bar: string;
}
var i: I;
var r4 = i.toString();
var r5 = i['toString']();
var r6 = i.bar;
var r7 = i['bar'];

var a = {
    foo: ''
}

var r8 = a.toString();
var r9 = a['toString']();
var r10 = a.foo;
var r11 = a['foo'];
