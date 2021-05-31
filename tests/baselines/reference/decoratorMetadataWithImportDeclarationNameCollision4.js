//// [tests/cases/compiler/decoratorMetadataWithImportDeclarationNameCollision4.ts] ////

//// [db.ts]
export class db {
    public doSomething() {
    }
}

//// [service.ts]
import db from './db'; // error no default export
function someDecorator(target) {
    return target;
}
@someDecorator
class MyClass {
    db: db.db;

    constructor(db: db.db) {
        this.db = db;
        this.db.doSomething();
    }
}
export {MyClass};


//// [db.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
var db = /** @class */ (function () {
    function db() {
    }
    db.prototype.doSomething = function () {
    };
    return db;
}());
exports.db = db;
//// [service.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClass = void 0;
var db_1 = require("./db"); // error no default export
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
        __metadata("design:paramtypes", [typeof (_a = typeof db_1.default !== "undefined" && db_1.default.db) === "function" ? _a : Object])
    ], MyClass);
    return MyClass;
}());
exports.MyClass = MyClass;
