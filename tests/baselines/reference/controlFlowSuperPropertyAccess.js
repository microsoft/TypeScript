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
"use strict";
class B {
}
class C extends B {
    body() {
        super.m && super.m();
    }
}
