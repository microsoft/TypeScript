class A {
    protected x: string;
    protected f(): string {
        return "hello";
    }
}

class B extends A {
    protected y: string;
    g() {
        var t1 = this.x;
        var t2 = this.f();
        var t3 = this.y;
        var t4 = this.z;     // error

        var s1 = super.x;    // error
        var s2 = super.f();
        var s3 = super.y;    // error
        var s4 = super.z;    // error

        var a: A;
        var a1 = a.x;    // error
        var a2 = a.f();  // error
        var a3 = a.y;    // error
        var a4 = a.z;    // error

        var b: B;
        var b1 = b.x;
        var b2 = b.f();
        var b3 = b.y;
        var b4 = b.z;    // error

        var c: C;
        var c1 = c.x;    // error
        var c2 = c.f();  // error
        var c3 = c.y;    // error
        var c4 = c.z;    // error
    }
}

class C extends A {
    protected z: string;
}
