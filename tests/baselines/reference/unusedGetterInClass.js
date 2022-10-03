//// [unusedGetterInClass.ts]
class Employee {
    private _fullName: string;

    private get fullName(): string {
        return this._fullName;
    }
    // Will not also error on the setter
    private set fullName(_: string) {}
}

//// [unusedGetterInClass.js]
var Employee = /** @class */ (function () {
    function Employee() {
    }
    Object.defineProperty(Employee.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        // Will not also error on the setter
        set: function (_) { },
        enumerable: false,
        configurable: true
    });
    return Employee;
}());
