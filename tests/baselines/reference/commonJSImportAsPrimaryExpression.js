//// [foo_1.ts]
import foo = require("./foo_0");
if(foo.C1.s1){
	// Should cause runtime import
}


//// [foo_0.js]
var C1 = (function () {
    function C1() {
        this.m1 = 42;
    }
    C1.s1 = true;
    return C1;
})();
exports.C1 = C1;
//// [foo_1.js]
var foo = require("./foo_0");
if (foo.C1.s1) {
    // Should cause runtime import
}
