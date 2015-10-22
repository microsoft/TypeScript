//// [tests/cases/compiler/optimizationEntrypoint7.ts] ////

//// [index.d.ts]

export class Dependency {}

//// [index.d.ts]
export class Dependency {}

//// [main.ts]
export * from "./interop";
export class Baz {}

//// [index.ts]
export * from "./foodep";
export * from "./bardep";

//// [foodep.ts]
import {Dependency} from "foo";

export class FooDependency extends Dependency {}

//// [bardep.ts]
import {Dependency} from "bar";

export class BarDependency extends Dependency {}


//// [foodep.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "foo"], function (require, exports, foo_1) {
    var FooDependency = (function (_super) {
        __extends(FooDependency, _super);
        function FooDependency() {
            _super.apply(this, arguments);
        }
        return FooDependency;
    })(foo_1.Dependency);
    exports.FooDependency = FooDependency;
});
//// [bardep.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "bar"], function (require, exports, bar_1) {
    var BarDependency = (function (_super) {
        __extends(BarDependency, _super);
        function BarDependency() {
            _super.apply(this, arguments);
        }
        return BarDependency;
    })(bar_1.Dependency);
    exports.BarDependency = BarDependency;
});
//// [index.js]
define(["require", "exports", "./foodep", "./bardep"], function (require, exports, foodep_1, bardep_1) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(foodep_1);
    __export(bardep_1);
});
//// [main.js]
define(["require", "exports", "./interop"], function (require, exports, interop_1) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(interop_1);
    var Baz = (function () {
        function Baz() {
        }
        return Baz;
    })();
    exports.Baz = Baz;
});
//// [bundled.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define("tests/cases/compiler/node_modules/foo/index", ["require", "exports"], function (require, exports) {
    var Dependency = (function () {
        function Dependency() {
        }
        return Dependency;
    })();
    exports.Dependency = Dependency;
});
define("tests/cases/compiler/node_modules/bar/index", ["require", "exports"], function (require, exports) {
    var Dependency = (function () {
        function Dependency() {
        }
        return Dependency;
    })();
    exports.Dependency = Dependency;
});
define("tests/cases/compiler/interop/foodep", ["require", "exports", "foo"], function (require, exports, foo_1) {
    var FooDependency = (function (_super) {
        __extends(FooDependency, _super);
        function FooDependency() {
            _super.apply(this, arguments);
        }
        return FooDependency;
    })(foo_1.Dependency);
    exports.FooDependency = FooDependency;
});
define("tests/cases/compiler/interop/bardep", ["require", "exports", "bar"], function (require, exports, bar_1) {
    var BarDependency = (function (_super) {
        __extends(BarDependency, _super);
        function BarDependency() {
            _super.apply(this, arguments);
        }
        return BarDependency;
    })(bar_1.Dependency);
    exports.BarDependency = BarDependency;
});
define("tests/cases/compiler/interop/index", ["require", "exports", "tests/cases/compiler/interop/foodep", "tests/cases/compiler/interop/bardep"], function (require, exports, foodep_1, bardep_1) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(foodep_1);
    __export(bardep_1);
});
define("tests/cases/compiler/main", ["require", "exports", "tests/cases/compiler/interop/index"], function (require, exports, interop_1) {
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    __export(interop_1);
    var Baz = (function () {
        function Baz() {
        }
        return Baz;
    })();
    exports.Baz = Baz;
});


//// [foodep.d.ts]
import { Dependency } from "foo";
export declare class FooDependency extends Dependency {
}
//// [bardep.d.ts]
import { Dependency } from "bar";
export declare class BarDependency extends Dependency {
}
//// [index.d.ts]
export * from "./foodep";
export * from "./bardep";
//// [main.d.ts]
export * from "./interop";
export declare class Baz {
}
//// [bundled.d.ts]
import {
    Dependency,
} from "foo";
import {
    Dependency as Dependency_1,
} from "bar";
export declare class FooDependency extends Dependency {
}
export declare class BarDependency extends Dependency_1 {
}
export declare class Baz {
}


//// [DtsFileErrors]


bundled.d.ts(3,8): error TS2307: Cannot find module 'foo'.
bundled.d.ts(6,8): error TS2307: Cannot find module 'bar'.


==== tests/cases/compiler/node_modules/foo/index.d.ts (0 errors) ====
    
    export class Dependency {}
    
==== tests/cases/compiler/node_modules/bar/index.d.ts (0 errors) ====
    export class Dependency {}
    
==== tests/cases/compiler/main.d.ts (0 errors) ====
    export * from "./interop";
    export declare class Baz {
    }
    
==== tests/cases/compiler/interop/index.d.ts (0 errors) ====
    export * from "./foodep";
    export * from "./bardep";
    
==== tests/cases/compiler/interop/foodep.d.ts (0 errors) ====
    import { Dependency } from "foo";
    export declare class FooDependency extends Dependency {
    }
    
==== tests/cases/compiler/interop/bardep.d.ts (0 errors) ====
    import { Dependency } from "bar";
    export declare class BarDependency extends Dependency {
    }
    
==== bundled.d.ts (2 errors) ====
    import {
        Dependency,
    } from "foo";
           ~~~~~
!!! error TS2307: Cannot find module 'foo'.
    import {
        Dependency as Dependency_1,
    } from "bar";
           ~~~~~
!!! error TS2307: Cannot find module 'bar'.
    export declare class FooDependency extends Dependency {
    }
    export declare class BarDependency extends Dependency_1 {
    }
    export declare class Baz {
    }
    