//// [exportAssignClassAndModule_1.ts]
///<reference path='exportAssignClassAndModule_0.ts'/>
import Foo = require('exportAssignClassAndModule_0');

var z: Foo.Bar;
var zz: Foo;
zz.x;

//// [exportAssignClassAndModule_0.js]
var Foo = (function () {
    function Foo() {
    }
    return Foo;
})();

module.exports = Foo;
//// [exportAssignClassAndModule_1.js]
var z;
var zz;
zz.x;
