//// [modulePrologueSystem.ts]
"use strict";

export class Foo {}

//// [modulePrologueSystem.js]
System.register([], function(exports_1) {
    "use strict";
    var Foo;
    return {
        setters:[],
        execute: function() {
            Foo = (function () {
                function Foo() {
                }
                return Foo;
            }());
            exports_1("Foo", Foo);
        }
    }
});
