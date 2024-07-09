//// [tests/cases/compiler/amdModuleName1.ts] ////

//// [amdModuleName1.ts]
///<amd-module name='NamedModule'/>
class Foo {
    x: number;
    constructor() {
        this.x = 5;
    }
}
export = Foo;


//// [amdModuleName1.js]
define("NamedModule", ["require", "exports"], function (require, exports) {
    "use strict";
    ///<amd-module name='NamedModule'/>
    var Foo = /** @class */ (function () {
        function Foo() {
            this.x = 5;
        }
        return Foo;
    }());
    return Foo;
});
