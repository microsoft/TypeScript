//// [unusedGetterInClass.ts]
class Employee {
    private _fullName: string;

    get fullName(): string {
        return this._fullName;
    }
}

//// [unusedGetterInClass.js]
var Employee = (function () {
    function Employee() {
    }
    Object.defineProperty(Employee.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        enumerable: true,
        configurable: true
    });
    return Employee;
}());
