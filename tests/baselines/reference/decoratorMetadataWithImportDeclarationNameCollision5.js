//// [tests/cases/compiler/decoratorMetadataWithImportDeclarationNameCollision5.ts] ////

//// [db.ts]
export default class db {
    public doSomething() {
    }
}

//// [service.ts]
import db from './db';
function someDecorator(target) {
    return target;
}
@someDecorator
class MyClass {
    db: db;

    constructor(db: db) { // collision
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
exports.default = db;
//// [service.js]
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
    __metadata("design:paramtypes", [db_1.default])
], MyClass);
exports.MyClass = MyClass;
