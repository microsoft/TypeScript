//// [commentOnClassMethod1.ts]
class WebControls {
    /**
     * Render a control
     */
    createControl(): any {
    }
}

//// [commentOnClassMethod1.js]
var WebControls = (function () {
    function WebControls() {
    }
    /**
     * Render a control
     */
    WebControls.prototype.createControl = function () {
    };
    return WebControls;
}());
