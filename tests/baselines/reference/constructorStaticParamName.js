//// [constructorStaticParamName.ts]
// static as constructor parameter name should only give error if 'use strict'

class test {
    constructor (static) { }
}


//// [constructorStaticParamName.js]
var test = (function () {
    function test(static) {
    }
    return test;
})();
