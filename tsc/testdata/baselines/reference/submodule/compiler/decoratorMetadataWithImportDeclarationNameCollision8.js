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
exports.db = void 0;
class db {
    doSomething() {
    }
}
exports.db = db;
//// [service.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClass = void 0;
function someDecorator(target) {
    return target;
}
@someDecorator
class MyClass {
    db;
    constructor(db) {
        this.db = db;
        this.db.doSomething();
    }
}
exports.MyClass = MyClass;
