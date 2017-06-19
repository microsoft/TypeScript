//// [classAbstractAsIdentifier.ts]
class abstract {
    foo() { return 1; }
}

new abstract;

//// [classAbstractAsIdentifier.js]
var abstract = /** @class */ (function () {
    function abstract() {
    }
    abstract.prototype.foo = function () { return 1; };
    return abstract;
}());
new abstract;
