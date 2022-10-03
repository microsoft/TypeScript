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
    Object.defineProperty(Employee.prototype, "p", {
        set: function (_) { },
        enumerable: false,
        configurable: true
    });
    Employee.prototype.m = function () {
        this.p = 0;
    };
    return Employee;
}());
