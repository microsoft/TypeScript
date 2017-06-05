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
var db = (function () {
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
var db_1 = require("./db"); // error no default export
function someDecorator(target) {
    return target;
}
var MyClass = (function () {
    function MyClass(db) {
        this.db = db;
        this.db.doSomething();
    }
    MyClass = __decorate([
        someDecorator,
        __metadata("design:paramtypes", [typeof (_a = (typeof db_1.default !== "undefined" && db_1.default).db) === "function" && _a || Object])
    ], MyClass);
    return MyClass;
    var _a;
}());
exports.MyClass = MyClass;
