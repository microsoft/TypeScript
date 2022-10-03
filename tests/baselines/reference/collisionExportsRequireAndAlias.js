//// [tests/cases/compiler/collisionExportsRequireAndAlias.ts] ////

//// [collisionExportsRequireAndAlias_file1.ts]
export function bar() {
}

//// [collisionExportsRequireAndAlias_file3333.ts]
export function bar2() {
}
//// [collisionExportsRequireAndAlias_file2.ts]
import require = require('collisionExportsRequireAndAlias_file1'); // Error
import exports = require('collisionExportsRequireAndAlias_file3333'); // Error
export function foo() {
    require.bar();
}
export function foo2() {
    exports.bar2();
}

//// [collisionExportsRequireAndAlias_file1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.bar = void 0;
    function bar() {
    }
    exports.bar = bar;
});
//// [collisionExportsRequireAndAlias_file3333.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.bar2 = void 0;
    function bar2() {
    }
    exports.bar2 = bar2;
});
//// [collisionExportsRequireAndAlias_file2.js]
define(["require", "exports", "collisionExportsRequireAndAlias_file1", "collisionExportsRequireAndAlias_file3333"], function (require, exports, require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.foo2 = exports.foo = void 0;
    function foo() {
        require.bar();
    }
    exports.foo = foo;
    function foo2() {
        exports.bar2();
    }
    exports.foo2 = foo2;
});
