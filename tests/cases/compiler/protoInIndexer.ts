class X {
    constructor() {
        this['__proto__'] = null; // used to cause ICE
    }
}