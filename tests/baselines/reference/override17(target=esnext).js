//// [override17.ts]
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


//// [override17.js]
class A {
    m1() {
        return 0;
    }
    m2() {
        return 0;
    }
    m3() { }
}
class B extends A {
    m1() {
        return 10;
    }
    m2() {
        return 30;
    }
    m3() { }
}
