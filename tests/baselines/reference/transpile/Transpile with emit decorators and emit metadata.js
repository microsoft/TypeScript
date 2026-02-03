"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClass = void 0;
var db_1 = require("./db");
function someDecorator(target) {
    return target;
}
var MyClass = /** @class */ (function () {
    function MyClass(db) {
        this.db = db;
        this.db.doSomething();
    }
    var _a;
    MyClass = __decorate([
        someDecorator,
        __metadata("design:paramtypes", [typeof (_a = typeof db_1.db !== "undefined" && db_1.db) === "function" ? _a : Object])
    ], MyClass);
    return MyClass;
}());
exports.MyClass = MyClass;
//# sourceMappingURL=file.js.map