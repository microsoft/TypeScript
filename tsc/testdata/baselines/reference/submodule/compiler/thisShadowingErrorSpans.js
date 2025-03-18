//// [tests/cases/compiler/thisShadowingErrorSpans.ts] ////

//// [thisShadowingErrorSpans.ts]
class C {
    m() {
        this.m();
        function f() {
            this.m();
        }
    }
}


//// [thisShadowingErrorSpans.js]
class C {
    m() {
        this.m();
        function f() {
            this.m();
        }
    }
}
