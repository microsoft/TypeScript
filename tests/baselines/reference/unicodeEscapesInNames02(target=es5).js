//// [tests/cases/compiler/unicodeEscapesInNames02.ts] ////

//// [extendedEscapesForAstralsInVarsAndClasses.ts]
// U+102A7 CARIAN LETTER A2
var 𐊧: string;
var \u{102A7}: string;

if (Math.random()) {
    𐊧 = "hello";
}
else {
    \u{102A7} = "hallo";
}

class Foo {
    \u{102A7}: string;
    constructor() {
        this.\u{102A7} = " world";
    }
    methodA() {
        return this.𐊧;
    }
}

export var _𐊧 = new Foo().\u{102A7} + new Foo().methodA();

_\u{102A7} += "!";

//// [astralAsSurrogatePair.ts]
import { _𐊧 as \uD800\uDEA7 } from "./extendedEscapesForAstralsInVarsAndClasses.js";


//// [extendedEscapesForAstralsInVarsAndClasses.js]
// U+102A7 CARIAN LETTER A2
var string;
var u, A7 = (void 0)[102];
if (Math.random()) {
    "hello";
}
else {
    u;
    {
        102;
        A7;
    }
    "hallo";
}
var Foo = /** @class */ (function () {
    function Foo() {
    }
    return Foo;
}());
{
    102;
    A7;
}
string;
constructor();
{
    this.𐊧 = " world";
}
methodA();
{
    return this.𐊧;
}
export var _;
new Foo().𐊧 + new Foo().methodA();
_;
u;
{
    102;
    A7;
}
"!";
//# sourceMappingURL=extendedEscapesForAstralsInVarsAndClasses.js.map
//// [astralAsSurrogatePair.js]
export {};
//# sourceMappingURL=astralAsSurrogatePair.js.map