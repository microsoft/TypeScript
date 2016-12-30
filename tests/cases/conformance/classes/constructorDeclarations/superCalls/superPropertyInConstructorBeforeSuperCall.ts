class B {
    constructor(x?: string) {}
    x(): string { return ""; }
}
class C1 extends B {
    constructor() {
        super.x();
        super();
    }
}
class C2 extends B {
    constructor() {
        super(super.x());
    }
}