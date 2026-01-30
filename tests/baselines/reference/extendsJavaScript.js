//// [tests/cases/compiler/extendsJavaScript.ts] ////

//// [extendsJavaScript.js]
/**
 * @extends {SomeBase}
 */
class MyClass {

}


//// [extendsJavaScript.js]
"use strict";
/**
 * @extends {SomeBase}
 */
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    return MyClass;
}());
