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
    var proto_1 = WebControls.prototype;
    /**
     * Render a control
     */
    proto_1.createControl = function () {
    };
    return WebControls;
}());
