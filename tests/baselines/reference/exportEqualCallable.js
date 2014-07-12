//// [exportEqualCallable_1.ts]
///<reference path='exportEqualCallable_0.ts'/>
import connect = require('exportEqualCallable_0');
connect();


//// [exportEqualCallable_0.js]
define(["require", "exports"], function(require, exports) {
    var server;
    
    return server;
});
//// [exportEqualCallable_1.js]
define(["require", "exports", 'exportEqualCallable_0'], function(require, exports, connect) {
    connect();
});
