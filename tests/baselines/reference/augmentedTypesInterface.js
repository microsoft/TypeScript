//// [augmentedTypesInterface.js]
// interface then interface


var i2 = (function () {
    function i2() {
    }
    i2.prototype.bar = function () {
        return 1;
    };
    return i2;
})();

var i3;
(function (i3) {
    i3[i3["One"] = 0] = "One";
})(i3 || (i3 = {}));
;

//import i4 = require('');  // error
