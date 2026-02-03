//// [tests/cases/compiler/superAccess.ts] ////

//// [superAccess.ts]
class MyBase {
    static S1: number = 5;
    private S2: string = "test";
    f = () => 5;
}

class MyDerived extends MyBase {
    foo() {
        var l3 = super.S1;    // Expected => Error: Only public instance methods of the base class are accessible via the 'super' keyword
        var l4 = super.S2;    // Expected => Error: Only public instance methods of the base class are accessible via the 'super' keyword
        var l5 = super.f();   // Expected => Error: Only public instance methods of the base class are accessible via the 'super' keyword
    }
}

//// [superAccess.js]
let MyBase = (() => {
    class MyBase {
        constructor() {
            this.S2 = "test";
            this.f = () => 5;
        }
    }
    MyBase.S1 = 5;
    return MyBase;
})();
class MyDerived extends MyBase {
    foo() {
        var l3 = super.S1; // Expected => Error: Only public instance methods of the base class are accessible via the 'super' keyword
        var l4 = super.S2; // Expected => Error: Only public instance methods of the base class are accessible via the 'super' keyword
        var l5 = super.f(); // Expected => Error: Only public instance methods of the base class are accessible via the 'super' keyword
    }
}
