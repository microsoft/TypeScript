//// [tests/cases/compiler/decoratorMetadataWithImportDeclarationNameCollision7.ts] ////

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
    db: db.db; //error

    constructor(db: db.db) { // error
        this.db = db;
        this.db.doSomething();
    }
}
export {MyClass};


//// [db.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class db {
    doSomething() {
    }
}
exports.default = db;
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
