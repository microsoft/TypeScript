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
"use strict";
class C {
    m() {
        this.m();
        function f() {
            this.m();
        }
    }
}
