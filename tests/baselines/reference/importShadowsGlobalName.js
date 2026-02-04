//// [tests/cases/compiler/importShadowsGlobalName.ts] ////

//// [Foo.ts]
class Foo {}
export = Foo;

//// [Bar.ts]
import Error = require('Foo');
class Bar extends Error {}
export = Bar;

//// [Foo.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    class Foo {
    }
    return Foo;
});
//// [Bar.js]
define(["require", "exports", "Foo"], function (require, exports, Error) {
    "use strict";
    class Bar extends Error {
    }
    return Bar;
});
