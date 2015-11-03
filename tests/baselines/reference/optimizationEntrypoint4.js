//// [tests/cases/compiler/optimizationEntrypoint4.ts] ////

//// [index.ts]

import Foo = require("./foo");

export class Bar {
	field2: typeof Foo.field;
}

//// [foo.ts]

class Foo {
	static field: {name: string}
}

namespace Foo {}

export = Foo;

//// [bundled.js]
define("tests/cases/compiler/foo", ["require", "exports"], function (require, exports) {
    var Foo = (function () {
        function Foo() {
        }
        return Foo;
    })();
    return Foo;
});
define("tests/cases/compiler/index", ["require", "exports"], function (require, exports) {
    var Bar = (function () {
        function Bar() {
        }
        return Bar;
    })();
    exports.Bar = Bar;
});


//// [bundled.d.ts]
declare class Foo_1 {
    static field: {
        name: string;
    };
}
declare namespace Foo_1 {
}
export declare class Bar {
    field2: typeof Foo_1.field;
}
export {
};


//// [DtsFileErrors]


bundled.d.ts(9,20): error TS4031: Public property 'field2' of exported class has or is using private name 'Foo_1'.


==== bundled.d.ts (1 errors) ====
    declare class Foo_1 {
        static field: {
            name: string;
        };
    }
    declare namespace Foo_1 {
    }
    export declare class Bar {
        field2: typeof Foo_1.field;
                       ~~~~~
!!! error TS4031: Public property 'field2' of exported class has or is using private name 'Foo_1'.
    }
    export {
    };
    