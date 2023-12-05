//// [tests/cases/compiler/unusedSetterInClass.ts] ////

//// [unusedSetterInClass.ts]
class Employee {
    private _fullName: string;

    private set fullName(newName: string) {
        this._fullName = newName;
    }
}

//// [unusedSetterInClass.js]
var Employee = /** @class */ (function () {
    function Employee() {
    }
    Object.defineProperty(Employee.prototype, "fullName", {
        set: function (newName) {
            this._fullName = newName;
        },
        enumerable: false,
        configurable: true
    });
    return Employee;
}());
