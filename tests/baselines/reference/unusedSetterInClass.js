//// [unusedSetterInClass.ts]
class Employee {
    private _fullName: string;

    set fullName(newName: string) {
        this._fullName = newName;
    }
}

//// [unusedSetterInClass.js]
var Employee = (function () {
    function Employee() {
    }
    Object.defineProperty(Employee.prototype, "fullName", {
        set: function (newName) {
            this._fullName = newName;
        },
        enumerable: true,
        configurable: true
    });
    return Employee;
}());
