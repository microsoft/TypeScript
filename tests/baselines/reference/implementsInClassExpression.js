//// [implementsInClassExpression.ts]
interface Foo {
    doThing(): void;
}

let cls = class implements Foo {
    doThing() { }
}

//// [implementsInClassExpression.js]
var cls = (function () {
    function class_1() {
    }
    var proto_1 = class_1.prototype;
    proto_1.doThing = function () { };
    return class_1;
}());
