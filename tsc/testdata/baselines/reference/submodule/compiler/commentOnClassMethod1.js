//// [tests/cases/compiler/commentOnClassMethod1.ts] ////

//// [commentOnClassMethod1.ts]
class WebControls {
    /**
     * Render a control
     */
    createControl(): any {
    }
}

//// [commentOnClassMethod1.js]
"use strict";
class WebControls {
    /**
     * Render a control
     */
    createControl() {
    }
}
