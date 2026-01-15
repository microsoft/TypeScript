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
import {db as Database} from './db';
function someDecorator(target) {
    return target;
}
@someDecorator
class MyClass {
    db: Database;

    constructor(db: Database) { // no collision
        this.db = db;
        this.db.doSomething();
    }
}
export {MyClass};
