// @declaration: true
// @noImplicitOverride: true
abstract class AB {
    abstract foo(v: string): void;

    abstract bar(v: string): void;
    abstract baz(v: string): void;
}

abstract class AD1 extends AB {

}

abstract class AD2 extends AB {
    abstract foo(v: ''): void // need override?
}

abstract class AD3 extends AB {
    override foo(v: ''): void { } // need override?
    abstract bar(): void;
    baz(): void { }
}

class D4 extends AB {
    override foo(v: ''): void {}
    override bar(v: ''): void {}
    baz(): void { }
}