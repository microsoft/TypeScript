//// [classAbstractAsIdentifier.ts]
class abstract {
    foo() { return 1; }
}

new abstract;

//// [classAbstractAsIdentifier.js]
var abstract = (function () {
    function abstract() {
    }
    var proto_1 = abstract.prototype;
    proto_1.foo = function () { return 1; };
    return abstract;
}());
new abstract;
