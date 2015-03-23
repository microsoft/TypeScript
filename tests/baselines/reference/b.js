//// [b.ts]
class D { }
export = D;


//// [b.js]
var D = (function () {
    function D() {
    }
    return D;
})();
module.exports = D;
