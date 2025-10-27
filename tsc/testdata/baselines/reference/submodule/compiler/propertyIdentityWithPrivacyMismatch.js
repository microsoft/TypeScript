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
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var x;
var x; // Should be error (mod1.Foo !== mod2.Foo)
class Foo1 {
    n;
}
class Foo2 {
    n;
}
var y;
var y;
