//// [tests/cases/compiler/decoratorMetadataWithImportDeclarationNameCollision8.ts] ////

//// [db.ts]
export class db {
    public doSomething() {
    }
}

//// [service.ts]
import database = require('./db');
function someDecorator(target) {
    return target;
}
@someDecorator
class MyClass {
    db: database.db;

    constructor(db: database.db) { // no collision
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
var database = require("./db");
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
        __metadata("design:paramtypes", [database.db])
    ], MyClass);
    return MyClass;
}());
exports.MyClass = MyClass;
