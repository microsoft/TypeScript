//// [unusedSetterInClass2.ts]
// Unlike everything else, a setter without a getter is used by a write access.
class Employee {
    private set p(_: number) {}

    m() {
        this.p = 0;
    }
}

//// [unusedSetterInClass2.js]
// Unlike everything else, a setter without a getter is used by a write access.
var Employee = /** @class */ (function () {
    function Employee() {
    }
    var proto_1 = Employee.prototype;
    Object.defineProperty(proto_1, "p", {
        set: function (_) { },
        enumerable: false,
        configurable: true
    });
    proto_1.m = function () {
        this.p = 0;
    };
    return Employee;
}());
