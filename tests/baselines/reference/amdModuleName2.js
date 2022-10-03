//// [amdModuleName2.ts]
///<amd-module name='FirstModuleName'/>
///<amd-module name='SecondModuleName'/>
class Foo {
    x: number;
    constructor() {
        this.x = 5;
    }
}
export = Foo;


//// [amdModuleName2.js]
define("SecondModuleName", ["require", "exports"], function (require, exports) {
    "use strict";
    ///<amd-module name='FirstModuleName'/>
    ///<amd-module name='SecondModuleName'/>
    var Foo = /** @class */ (function () {
        function Foo() {
            this.x = 5;
        }
        return Foo;
    }());
    return Foo;
});
