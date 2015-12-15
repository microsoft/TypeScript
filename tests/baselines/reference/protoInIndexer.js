//// [protoInIndexer.ts]
class X {
    constructor() {
        this['__proto__'] = null; // used to cause ICE
    }
}

//// [protoInIndexer.js]
var X = (function () {
    function X() {
        this['__proto__'] = null; // used to cause ICE
    }
    return X;
}());
