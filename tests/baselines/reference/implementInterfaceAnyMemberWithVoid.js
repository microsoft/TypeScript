//// [implementInterfaceAnyMemberWithVoid.ts]
interface I {
    foo(value: number);
}

class Bug implements I {
    public foo(value: number) {
    }
}


//// [implementInterfaceAnyMemberWithVoid.js]
var Bug = (function () {
    function Bug() {
    }
    var proto_1 = Bug.prototype;
    proto_1.foo = function (value) {
    };
    return Bug;
}());
