// @module: amd
/*****************************
* (c) Copyright - Important
****************************/

import model = require("./greeter")
var el = document.getElementById('content');
var greeter = new model.Greeter(el);
/** things */
greeter.start();