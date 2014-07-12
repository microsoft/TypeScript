//// [privacyTypeParametersOfInterface.js]
var privateClass = (function () {
    function privateClass() {
    }
    return privateClass;
})();

var publicClass = (function () {
    function publicClass() {
    }
    return publicClass;
})();
exports.publicClass = publicClass;

var privateClassT = (function () {
    function privateClassT() {
    }
    return privateClassT;
})();

var publicClassT = (function () {
    function publicClassT() {
    }
    return publicClassT;
})();
exports.publicClassT = publicClassT;

