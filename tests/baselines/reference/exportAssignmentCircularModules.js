//// [foo_2.ts]
import foo0 = require("./foo_0");
module Foo {
	export var x = foo0.x;
}
export = Foo;


//// [foo_1.js]
define(["require", "exports", "./foo_2"], function(require, exports, foo2) {
    var Foo;
    (function (Foo) {
        Foo.x = foo2.x;
    })(Foo || (Foo = {}));
    
    return Foo;
});
//// [foo_0.js]
define(["require", "exports", './foo_1'], function(require, exports, foo1) {
    var Foo;
    (function (Foo) {
        Foo.x = foo1.x;
    })(Foo || (Foo = {}));
    
    return Foo;
});
//// [foo_2.js]
define(["require", "exports", "./foo_0"], function(require, exports, foo0) {
    var Foo;
    (function (Foo) {
        Foo.x = foo0.x;
    })(Foo || (Foo = {}));
    
    return Foo;
});
