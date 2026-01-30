// @target: es2015
// @strict: false
class X {
    constructor() {
        this['__proto__'] = null; // used to cause ICE
    }
}