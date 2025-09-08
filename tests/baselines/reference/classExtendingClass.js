//// [tests/cases/conformance/classes/classDeclarations/classHeritageSpecification/classExtendingClass.ts] ////

//// [classExtendingClass.ts]
class C {
    foo: string;
    thing() { }
    static other() { }
}

class D extends C {
    bar: string;
}

var d: D;
var r = d.foo;
var r2 = d.bar;
var r3 = d.thing();
var r4 = D.other();

class C2<T> {
    foo: T;
    thing(x: T) { }
    static other<T>(x: T) { }
}

class D2<T> extends C2<T> {
    bar: string;
}

var d2: D2<string>;
var r5 = d2.foo;
var r6 = d2.bar;
var r7 = d2.thing('');
var r8 = D2.other(1);

//// [classExtendingClass.js]
class C {
    foo;
    thing() { }
    static other() { }
}
class D extends C {
    bar;
}
var d;
var r = d.foo;
var r2 = d.bar;
var r3 = d.thing();
var r4 = D.other();
class C2 {
    foo;
    thing(x) { }
    static other(x) { }
}
class D2 extends C2 {
    bar;
}
var d2;
var r5 = d2.foo;
var r6 = d2.bar;
var r7 = d2.thing('');
var r8 = D2.other(1);
