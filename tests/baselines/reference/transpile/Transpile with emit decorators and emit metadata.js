"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = require("./db");
function someDecorator(target) {
    return target;
}
var MyClass = (function () {
    function MyClass(db) {
        this.db = db;
        this.db.doSomething();
    }
    return MyClass;
}());
MyClass = __decorate([
    someDecorator,
    __metadata("design:paramtypes", [typeof (_a = typeof db_1.db !== "undefined" && db_1.db) === "function" && _a || Object])
], MyClass);
exports.MyClass = MyClass;
var _a;
//# sourceMappingURL=file.js.map