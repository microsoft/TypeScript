//// [copyrightWithNewLine1.ts]
/*****************************
* (c) Copyright - Important
****************************/

import model = require("./greeter")
var el = document.getElementById('content');
var greeter = new model.Greeter(el);
/** things */
greeter.start();

//// [copyrightWithNewLine1.js]
/*****************************
* (c) Copyright - Important
****************************/
define(["require", "exports", "./greeter"], function (require, exports, model) {
    "use strict";
    exports.__esModule = true;
    var el = document.getElementById('content');
    var greeter = new model.Greeter(el);
    /** things */
    greeter.start();
});
