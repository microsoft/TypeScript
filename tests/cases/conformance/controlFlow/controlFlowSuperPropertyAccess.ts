// @strictNullChecks: true
class B {
    protected m?(): void;
}
class C extends B {
    body() {
        super.m && super.m();
    }
}
