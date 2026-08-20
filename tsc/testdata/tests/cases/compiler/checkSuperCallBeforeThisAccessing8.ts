// @target: es2015
class Base {
    constructor(...arg) {
    }
}
class Super extends Base {
    constructor() {
        var that = this;
        super();
    }
}