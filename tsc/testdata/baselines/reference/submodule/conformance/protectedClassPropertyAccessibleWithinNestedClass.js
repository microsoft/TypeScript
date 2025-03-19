//// [tests/cases/conformance/classes/members/accessibility/protectedClassPropertyAccessibleWithinNestedClass.ts] ////

//// [protectedClassPropertyAccessibleWithinNestedClass.ts]
// no errors

class C {
    protected x: string;
    protected get y() { return this.x; }
    protected set y(x) { this.y = this.x; }
    protected foo() { return this.foo; }

    protected static x: string;
    protected static get y() { return this.x; }
    protected static set y(x) { this.y = this.x; }
    protected static foo() { return this.foo; }
    protected static bar() { this.foo(); }

    protected bar() {
        class C2 {
            protected foo() {
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

//// [protectedClassPropertyAccessibleWithinNestedClass.js]
// no errors
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
