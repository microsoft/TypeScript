//// [privateNamesInNestedClasses.ts]
// @target es6

class A {
   #foo = "A's #foo";
   #bar = "A's #bar";
   method () {
       class B {
           #foo = "B's #foo";
           bar (a: any) {
               a.#foo; // OK, no compile-time error, don't know what `a` is
           }
           baz (a: A) {
               a.#foo; // compile-time error, shadowed
           }
           quux (b: B) {
               b.#foo; // OK
           }
       }
       const a = new A();
       new B().bar(a);
       new B().baz(a);
       const b = new B();
       new B().quux(b);
   }
}

new A().method();

//// [privateNamesInNestedClasses.js]
"use strict";
// @target es6
var A = /** @class */ (function () {
    function A() {
        this[] = "A's #foo";
        this[] = "A's #bar";
    }
    A.prototype.method = function () {
        var B = /** @class */ (function () {
            function B() {
                this[] = "B's #foo";
            }
            B.prototype.bar = function (a) {
                a.; // OK, no compile-time error, don't know what `a` is
            };
            B.prototype.baz = function (a) {
                a.; // compile-time error, shadowed
            };
            B.prototype.quux = function (b) {
                b.; // OK
            };
            return B;
        }());
        var a = new A();
        new B().bar(a);
        new B().baz(a);
        var b = new B();
        new B().quux(b);
    };
    return A;
}());
new A().method();
