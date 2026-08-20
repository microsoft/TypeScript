// @noImplicitOverride: true
// @useDefineForClassFields: true
// @target: es2015,esnext

class A {
    public m1(): number {
        return 0;
    }

    public m2(): number {
        return 0;
    }

    public m3(): void {}
}

class B extends A {
    override m1() {
        return 10;
    }

    override m2(): number {
        return 30;
    }

    override m3(): void {}
}
