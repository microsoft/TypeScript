//// [tests/cases/conformance/controlFlow/controlFlowSuperPropertyAccess.ts] ////

//// [controlFlowSuperPropertyAccess.ts]
class B {
    protected m?(): void;
}
class C extends B {
    body() {
        super.m && super.m();
    }
}


//// [controlFlowSuperPropertyAccess.js]
class B {
}
class C extends B {
    body() {
        super.m && super.m();
    }
}
