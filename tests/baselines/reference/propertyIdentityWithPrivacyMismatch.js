//// [tests/cases/compiler/propertyIdentityWithPrivacyMismatch.ts] ////

//// [propertyIdentityWithPrivacyMismatch_0.ts]
declare module 'mod1' {
    class Foo {
        private n;
    }
}
declare module 'mod2' {
    class Foo {
        private n;
    }
}

//// [propertyIdentityWithPrivacyMismatch_1.ts]
///<reference path='propertyIdentityWithPrivacyMismatch_0.ts'/>
import m1 = require('mod1');
import m2 = require('mod2');
var x: m1.Foo;
var x: m2.Foo; // Should be error (mod1.Foo !== mod2.Foo)
class Foo1 {
    private n;
}
class Foo2 {
    private n;
}
var y: Foo1;
var y: Foo2;

//// [propertyIdentityWithPrivacyMismatch_0.js]
//// [propertyIdentityWithPrivacyMismatch_1.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    var x;
    var x; // Should be error (mod1.Foo !== mod2.Foo)
    var Foo1 = /** @class */ (function () {
        function Foo1() {
        }
        return Foo1;
    }());
    var Foo2 = /** @class */ (function () {
        function Foo2() {
        }
        return Foo2;
    }());
    var y;
    var y;
});
