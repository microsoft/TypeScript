// @strict: false
// @target: es2015
class Base {
    constructor(...arg) {
    }
}
class Super extends Base {
    constructor() {
        (() => this);  // No Error
        super();
    }
}