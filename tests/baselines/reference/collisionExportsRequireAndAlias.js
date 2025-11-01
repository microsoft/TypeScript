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
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bar = bar;
    function bar() {
    }
});
//// [collisionExportsRequireAndAlias_file3333.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.bar2 = bar2;
    function bar2() {
    }
});
//// [collisionExportsRequireAndAlias_file2.js]
define(["require", "exports", "collisionExportsRequireAndAlias_file1", "collisionExportsRequireAndAlias_file3333"], function (require, exports, require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.foo = foo;
    exports.foo2 = foo2;
    function foo() {
        require.bar();
    }
    function foo2() {
        exports.bar2();
    }
});
