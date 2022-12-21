//// [tests/cases/compiler/declarationEmitAmdModuleNameDirective.ts] ////

//// [foo.ts]
/// <amd-module name="name_of_foo"/>
export const foo = 1;
//// [bar.ts]
/// <amd-dependency name="name_of_foo" path="./foo" />
import {foo} from './foo';
void foo;

//// [foo.js]
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("name_of_foo", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.foo = void 0;
    /// <amd-module name="name_of_foo"/>
    exports.foo = 1;
});
//// [bar.js]
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./foo", "name_of_foo"], factory);
    }
})(function (require, exports, name_of_foo) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /// <amd-dependency name="name_of_foo" path="./foo" />
    var foo_1 = require("name_of_foo");
    void foo_1.foo;
});


//// [foo.d.ts]
/// <amd-module name="name_of_foo" />
export declare const foo = 1;
//// [bar.d.ts]
/// <amd-dependency name="name_of_foo" path="./foo" />
export {};
