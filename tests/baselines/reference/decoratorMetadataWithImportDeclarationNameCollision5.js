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
class db {
    doSomething() {
    }
}
exports.default = db;
//// [service.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyClass = void 0;
var db_1 = __importDefault(require("./db"));
function someDecorator(target) {
    return target;
}
let MyClass = (() => {
    let MyClass = class MyClass {
        constructor(db) {
            this.db = db;
            this.db.doSomething();
        }
    };
    MyClass = __decorate([
        someDecorator,
        __metadata("design:paramtypes", [db_1.default])
    ], MyClass);
    return MyClass;
})();
exports.MyClass = MyClass;
