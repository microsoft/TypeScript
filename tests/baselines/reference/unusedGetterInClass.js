//// [unusedGetterInClass.ts]
class Employee {
    private _fullName: string;

    private get fullName(): string {
        return this._fullName;
    }
    private set setter(_: string) {}
}

//// [unusedGetterInClass.js]
var Employee = /** @class */ (function () {
    function Employee() {
    }
    Object.defineProperty(Employee.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Employee.prototype, "setter", {
        set: function (_) { },
        enumerable: true,
        configurable: true
    });
    return Employee;
}());
