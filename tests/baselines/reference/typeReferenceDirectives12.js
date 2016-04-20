//// [tests/cases/compiler/typeReferenceDirectives12.ts] ////

//// [index.d.ts]


interface Lib { x }

//// [main.ts]
export class Cls {
    x
}

//// [mod1.ts]
/// <reference types="lib" />

import {Cls} from "./main";
Cls.prototype.foo = function() { return undefined; }

declare module "./main" {
    interface Cls {
        foo(): Lib;
    }
    namespace Cls {
        function bar(): Lib;
    }
}

//// [mod2.ts]
import { Cls } from "./main";
import "./mod1";

export const cls = Cls;
export const foo = new Cls().foo();
export const bar = Cls.bar();

//// [output.js]
define("main", ["require", "exports"], function (require, exports) {
    "use strict";
    var Cls = (function () {
        function Cls() {
        }
        return Cls;
    }());
    exports.Cls = Cls;
});
/// <reference types="lib" />
define("mod1", ["require", "exports", "main"], function (require, exports, main_1) {
    "use strict";
    main_1.Cls.prototype.foo = function () { return undefined; };
});
define("mod2", ["require", "exports", "main", "mod1"], function (require, exports, main_2) {
    "use strict";
    exports.cls = main_2.Cls;
    exports.foo = new main_2.Cls().foo();
    exports.bar = main_2.Cls.bar();
});


//// [output.d.ts]
/// <reference types="lib" />
declare module "main" {
    export class Cls {
        x: any;
    }
}
declare module "mod1" {
    module "main" {
        interface Cls {
            foo(): Lib;
        }
        namespace Cls {
            function bar(): Lib;
        }
    }
}
declare module "mod2" {
    import { Cls } from "main";
    import "mod1";
    export const cls: typeof Cls;
    export const foo: Lib;
    export const bar: Lib;
}
