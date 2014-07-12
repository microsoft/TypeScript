//// [consumer.ts]

import host = require("host");
var hostVar = host;
var v = new hostVar.Host();
 

//// [host.js]
define(["require", "exports"], function(require, exports) {
    var Host = (function () {
        function Host() {
        }
        return Host;
    })();
    exports.Host = Host;
});
//// [consumer.js]
define(["require", "exports", "host"], function(require, exports, host) {
    var hostVar = host;
    var v = new hostVar.Host();
});
