//@module: amd
// @Filename: propertyIdentityWithPrivacyMismatch_0.ts
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

// @Filename: propertyIdentityWithPrivacyMismatch_1.ts
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