// @target: es6
class Base {
}
class C extends Base {
    constructor() {
        super();
        var obj = {
            [(super(), "prop")]() { }
        };
    }
}