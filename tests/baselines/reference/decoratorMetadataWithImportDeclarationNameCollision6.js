//// [tests/cases/compiler/decoratorMetadataWithImportDeclarationNameCollision6.ts] ////

//// [db.ts]
export default class db {
    public doSomething() {
    }
}

//// [service.ts]
import database from './db';
function someDecorator(target) {
    return target;
}
@someDecorator
class MyClass {
    db: database;

    constructor(db: database) { // no collision
        this.db = db;
        this.db.doSomething();
    }
}
export {MyClass};


//// [db.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var db = /** @class */ (function () {
    function db() {
    }
    db.prototype.doSomething = function () {
    };
    return db;
}());
exports.default = db;
//// [service.js]
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
    MyClass = __decorate([
        someDecorator,
        __metadata("design:paramtypes", [db_1.default])
    ], MyClass);
    return MyClass;
}());
exports.MyClass = MyClass;
