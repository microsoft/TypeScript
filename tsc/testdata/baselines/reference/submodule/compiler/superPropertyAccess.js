//// [tests/cases/compiler/superPropertyAccess.ts] ////

//// [superPropertyAccess.ts]
class MyBase {
    m1(a: string) { return a; }
    private p1() { }
    m2: () => void = function () { }
    d1: number = 42;
    private d2: number = 42;
    get value() {return 0 }
    set value(v: number) { }
}


class MyDerived extends MyBase {

    foo() {
        super.m1("hi");                                     // Should be allowed, method on base prototype

        var l2 = super.m1.bind(this);                       // Should be allowed, can access properties as well as invoke

        var x: (a: string) => string = super.m1;            // Should be allowed, can assign to var with compatible signature

        super.m2.bind(this);                                // Should error, instance property, not a public instance member function

        super.p1();                                         // Should error, private not public instance member function

        var l1 = super.d1;                                  // Should error, instance data property not a public instance member function

        var l1 = super.d2;                                  // Should error, instance data property not a public instance member function

        super.m1 = function (a: string) { return ""; };     // Should be allowed, we will not restrict assignment

        super.value = 0;                                    // Should error, instance data property not a public instance member function
        
        var z = super.value;                                // Should error, instance data property not a public instance member function
    }
}

//// [superPropertyAccess.js]
class MyBase {
    m1(a) { return a; }
    p1() { }
    m2 = function () { };
    d1 = 42;
    d2 = 42;
    get value() { return 0; }
    set value(v) { }
}
class MyDerived extends MyBase {
    foo() {
        super.m1("hi");
        var l2 = super.m1.bind(this);
        var x = super.m1;
        super.m2.bind(this);
        super.p1();
        var l1 = super.d1;
        var l1 = super.d2;
        super.m1 = function (a) { return ""; };
        super.value = 0;
        var z = super.value;
    }
}
