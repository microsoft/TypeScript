//// [tests/cases/compiler/copyrightWithNewLine1.ts] ////

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
"use strict";
/*****************************
* (c) Copyright - Important
****************************/
Object.defineProperty(exports, "__esModule", { value: true });
const model = require("./greeter");
var el = document.getElementById('content');
var greeter = new model.Greeter(el);
/** things */
greeter.start();
