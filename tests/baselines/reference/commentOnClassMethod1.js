//// [commentOnClassMethod1.ts]
class WebControls {
    /**
     * Render a control
     */
    createControl(): any {
    }
}

//// [commentOnClassMethod1.js]
var __names = (this && this.__names) || (function() {
    var name = Object.defineProperty ? (function(proto, name) {
        Object.defineProperty(proto[name], 'name', { 
            value: name, configurable: true, writable: false, enumerable: false
        });
    }) : (function(proto, name) {
        proto[name].name = name;
    });
    return function (proto, keys) {
        for (var i = keys.length - 1; i >= 0; i--) {
            name(proto, keys[i])
        }
    };
})();
var WebControls = (function () {
    function WebControls() {
    }
    /**
     * Render a control
     */
    WebControls.prototype.createControl = function () {
    };
    __names(WebControls.prototype, ["createControl"]);
    return WebControls;
}());
