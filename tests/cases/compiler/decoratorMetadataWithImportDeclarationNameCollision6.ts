// @noemithelpers: true
// @experimentaldecorators: true
// @emitdecoratormetadata: true
// @target: es5
// @module: commonjs
// @filename: db.ts
export default class db {
    public doSomething() {
    }
}

// @filename: service.ts
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
