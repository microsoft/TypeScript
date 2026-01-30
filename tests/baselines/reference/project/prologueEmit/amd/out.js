// Add a lambda to ensure global 'this' capture is triggered
(() => this.window);
// class inheritance to ensure __extends is emitted
var m;
(function (m) {
    class base {
    }
    m.base = base;
    class child extends base {
    }
    m.child = child;
})(m || (m = {}));
