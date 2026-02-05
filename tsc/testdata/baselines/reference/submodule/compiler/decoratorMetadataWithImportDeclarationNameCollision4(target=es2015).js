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
class db {
    doSomething() {
    }
}
exports.db = db;
//// [service.js]
"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClass = void 0;
const db_1 = __importDefault(require("./db")); // error no default export
function someDecorator(target) {
    return target;
}
let MyClass = class MyClass {
    db;
    constructor(db) {
        this.db = db;
        this.db.doSomething();
    }
};
exports.MyClass = MyClass;
exports.MyClass = MyClass = __decorate([
    someDecorator,
    __metadata("design:paramtypes", [typeof (_a = typeof db_1.default !== "undefined" && db_1.default.db) === "function" ? _a : Object])
], MyClass);
