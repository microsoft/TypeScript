// @noemithelpers: true
// @experimentaldecorators: true
// @emitdecoratormetadata: true
// @target: es5
// @module: commonjs
// @filename: db.ts
export class db {
    public doSomething() {
    }
}

// @filename: service.ts
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
