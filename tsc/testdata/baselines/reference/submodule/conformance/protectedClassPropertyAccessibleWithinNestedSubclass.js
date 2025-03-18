//// [tests/cases/conformance/classes/members/accessibility/protectedClassPropertyAccessibleWithinNestedSubclass.ts] ////

//// [protectedClassPropertyAccessibleWithinNestedSubclass.ts]
class B {
    protected x: string;
    protected static x: string;
}

class C extends B {
    protected get y() { return this.x; }
    protected set y(x) { this.y = this.x; }
    protected foo() { return this.x; }

    protected static get y() { return this.x; }
    protected static set y(x) { this.y = this.x; }
    protected static foo() { return this.x; }
    protected static bar() { this.foo(); }
    
    protected bar() { 
        class D {
            protected foo() {
                var c = new C();
                var c1 = c.y;
                var c2 = c.x;
                var c3 = c.foo;
                var c4 = c.bar;
                var c5 = c.z; // error
                
                var sc1 = C.x;
                var sc2 = C.y;
                var sc3 = C.foo;
                var sc4 = C.bar;
            }
        }
    }
}

class E extends C {
    protected z: string;
}

//// [protectedClassPropertyAccessibleWithinNestedSubclass.js]
class B {
    x;
    static x;
}
class C extends B {
    get y() { return this.x; }
    set y(x) { this.y = this.x; }
    foo() { return this.x; }
    static get y() { return this.x; }
    static set y(x) { this.y = this.x; }
    static foo() { return this.x; }
    static bar() { this.foo(); }
    bar() {
        class D {
            foo() {
                var c = new C();
                var c1 = c.y;
                var c2 = c.x;
                var c3 = c.foo;
                var c4 = c.bar;
                var c5 = c.z;
                var sc1 = C.x;
                var sc2 = C.y;
                var sc3 = C.foo;
                var sc4 = C.bar;
            }
        }
    }
}
class E extends C {
    z;
}
