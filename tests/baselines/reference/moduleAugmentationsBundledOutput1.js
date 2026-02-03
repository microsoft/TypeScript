//// [tests/cases/compiler/moduleAugmentationsBundledOutput1.ts] ////

//// [m1.ts]
export class Cls {
}

//// [m2.ts]
import {Cls} from "./m1";
(<any>Cls.prototype).foo = function() { return 1; };
(<any>Cls.prototype).bar = function() { return "1"; };

declare module "./m1" {
    interface Cls {
        foo(): number;
    }
}

declare module "./m1" {
    interface Cls {
        bar(): string;
    }
}

//// [m3.ts]
export class C1 { x: number }
export class C2 { x: string }

//// [m4.ts]
import {Cls} from "./m1";
import {C1, C2} from "./m3";
(<any>Cls.prototype).baz1 = function() { return undefined };
(<any>Cls.prototype).baz2 = function() { return undefined };

declare module "./m1" {
    interface Cls {
        baz1(): C1;
    }
}

declare module "./m1" {
    interface Cls {
        baz2(): C2;
    }
}

//// [test.ts]
import { Cls } from "./m1";
import "m2";
import "m4";
let c: Cls;
c.foo().toExponential();
c.bar().toLowerCase();
c.baz1().x.toExponential();
c.baz2().x.toLowerCase();


//// [out.js]
define("m1", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Cls = void 0;
    var Cls = /** @class */ (function () {
        function Cls() {
        }
        return Cls;
    }());
    exports.Cls = Cls;
});
define("m2", ["require", "exports", "m1"], function (require, exports, m1_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    m1_1.Cls.prototype.foo = function () { return 1; };
    m1_1.Cls.prototype.bar = function () { return "1"; };
});
define("m3", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.C2 = exports.C1 = void 0;
    var C1 = /** @class */ (function () {
        function C1() {
        }
        return C1;
    }());
    exports.C1 = C1;
    var C2 = /** @class */ (function () {
        function C2() {
        }
        return C2;
    }());
    exports.C2 = C2;
});
define("m4", ["require", "exports", "m1"], function (require, exports, m1_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    m1_2.Cls.prototype.baz1 = function () { return undefined; };
    m1_2.Cls.prototype.baz2 = function () { return undefined; };
});
define("test", ["require", "exports", "m2", "m4"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var c;
    c.foo().toExponential();
    c.bar().toLowerCase();
    c.baz1().x.toExponential();
    c.baz2().x.toLowerCase();
});


//// [out.d.ts]
declare module "m1" {
    export class Cls {
    }
}
declare module "m2" {
    module "m1" {
        interface Cls {
            foo(): number;
        }
    }
    module "m1" {
        interface Cls {
            bar(): string;
        }
    }
}
declare module "m3" {
    export class C1 {
        x: number;
    }
    export class C2 {
        x: string;
    }
}
declare module "m4" {
    import { C1, C2 } from "m3";
    module "m1" {
        interface Cls {
            baz1(): C1;
        }
    }
    module "m1" {
        interface Cls {
            baz2(): C2;
        }
    }
}
declare module "test" {
    import "m2";
    import "m4";
}
