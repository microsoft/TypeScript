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
    WebControls.prototype.createControl = function () {
    };
    return WebControls;
})();
