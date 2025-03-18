//// [tests/cases/conformance/classes/members/accessibility/privateClassPropertyAccessibleWithinNestedClass.ts] ////

//// [privateClassPropertyAccessibleWithinNestedClass.ts]
// no errors

class C {
    private x: string;
    private get y() { return this.x; }
    private set y(x) { this.y = this.x; }
    private foo() { return this.foo; }

    private static x: string;
    private static get y() { return this.x; }
    private static set y(x) { this.y = this.x; }
    private static foo() { return this.foo; }
    private static bar() { this.foo(); }

    private bar() {
        class C2 {
            private foo() {
                let x: C;
                var x1 = x.foo;
                var x2 = x.bar;
                var x3 = x.x;
                var x4 = x.y;

                var sx1 = C.x;
                var sx2 = C.y;
                var sx3 = C.bar;
                var sx4 = C.foo;

                let y = new C();
                var y1 = y.foo;
                var y2 = y.bar;
                var y3 = y.x;
                var y4 = y.y;
            }
        }
    }
}

//// [privateClassPropertyAccessibleWithinNestedClass.js]
class C {
    x;
    get y() { return this.x; }
    set y(x) { this.y = this.x; }
    foo() { return this.foo; }
    static x;
    static get y() { return this.x; }
    static set y(x) { this.y = this.x; }
    static foo() { return this.foo; }
    static bar() { this.foo(); }
    bar() {
        class C2 {
            foo() {
                let x;
                var x1 = x.foo;
                var x2 = x.bar;
                var x3 = x.x;
                var x4 = x.y;
                var sx1 = C.x;
                var sx2 = C.y;
                var sx3 = C.bar;
                var sx4 = C.foo;
                let y = new C();
                var y1 = y.foo;
                var y2 = y.bar;
                var y3 = y.x;
                var y4 = y.y;
            }
        }
    }
}
