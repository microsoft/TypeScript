// @lib: es5
var console : {
    log(message: any);
}
class Foo {
    x() {
        var _this = 10; // Local var. No this capture in x(), so no conflict.
        function inner() {
            console.log(_this); // Error as this doesnt not resolve to user defined _this
            return x => this;   // New scope.  So should inject new _this capture into function inner
        }
    }
}