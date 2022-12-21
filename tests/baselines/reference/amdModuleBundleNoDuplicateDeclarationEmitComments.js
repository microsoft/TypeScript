//// [tests/cases/compiler/amdModuleBundleNoDuplicateDeclarationEmitComments.ts] ////

//// [file1.ts]
/// <amd-module name="mynamespace::SomeModuleA" />
export class Foo {}
//// [file2.ts]
/// <amd-module name="mynamespace::SomeModuleB" />
export class Bar {}

//// [out.js]
define("mynamespace::SomeModuleA", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Foo = void 0;
    /// <amd-module name="mynamespace::SomeModuleA" />
    var Foo = /** @class */ (function () {
        function Foo() {
        }
        return Foo;
    }());
    exports.Foo = Foo;
});
define("mynamespace::SomeModuleB", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Bar = void 0;
    /// <amd-module name="mynamespace::SomeModuleB" />
    var Bar = /** @class */ (function () {
        function Bar() {
        }
        return Bar;
    }());
    exports.Bar = Bar;
});


//// [out.d.ts]
/// <amd-module name="mynamespace::SomeModuleA" />
declare module "mynamespace::SomeModuleA" {
    export class Foo {
    }
}
/// <amd-module name="mynamespace::SomeModuleB" />
declare module "mynamespace::SomeModuleB" {
    export class Bar {
    }
}
