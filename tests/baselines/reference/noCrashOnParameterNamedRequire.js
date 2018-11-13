//// [index.js]
(function(require, module, exports){
    const mod = require("./mod");
    mod.foo;
})(null, null, null);

//// [index.js]
(function (require, module, exports) {
    var mod = require("./mod");
    mod.foo;
})(null, null, null);
