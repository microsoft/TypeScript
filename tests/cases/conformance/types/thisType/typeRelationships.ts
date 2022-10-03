class C {
    self = this;
    c = new C();
    foo() {
        return this;
    }
    f1() {
        this.c = this.self;
        this.self = this.c;  // Error
    }
    f2() {
        var a: C[];
        var a = [this, this.c];  // C[] since this is subtype of C
        var b: this[];
        var b = [this, this.self, null, undefined];
    }
    f3(b: boolean) {
        return b ? this.c : this.self;  // Should be C
    }
}

class D extends C {
    self1 = this;
    self2 = this.self;
    self3 = this.foo();
    d = new D();
    bar() {
        this.self = this.self1;
        this.self = this.self2;
        this.self = this.self3;
        this.self1 = this.self;
        this.self2 = this.self;
        this.self3 = this.self;
        this.d = this.self;
        this.d = this.c;  // Error
        this.self = this.d;  // Error
        this.c = this.d;
    }
}
