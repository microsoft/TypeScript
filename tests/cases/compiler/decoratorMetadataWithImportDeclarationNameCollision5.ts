// @strict: false
// @noemithelpers: true
// @experimentaldecorators: true
// @emitdecoratormetadata: true
// @target: es5, es2015
// @module: commonjs
// @filename: db.ts
export default class db {
    public doSomething() {
    }
}

// @filename: service.ts
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
