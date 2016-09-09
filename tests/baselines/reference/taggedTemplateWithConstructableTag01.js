//// [taggedTemplateWithConstructableTag01.ts]
class CtorTag { }

CtorTag `Hello world!`;

//// [taggedTemplateWithConstructableTag01.js]
var CtorTag = (function () {
    function CtorTag() {
    }
    return CtorTag;
}());
(_a = ["Hello world!"], _a.raw = ["Hello world!"], CtorTag(_a));
var _a;
