//// [constructorStaticParamName.ts]
// static as constructor parameter name should only give error if 'use strict'

class test {
    constructor (static) { }
}


//// [constructorStaticParamName.js]
// static as constructor parameter name should only give error if 'use strict'
var test = /** @class */ (function () {
    function test(static) {
    }
    return test;
}());
