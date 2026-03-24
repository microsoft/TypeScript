//// [tests/cases/compiler/copyrightWithoutNewLine1.ts] ////

//// [copyrightWithoutNewLine1.ts]
/*****************************
* (c) Copyright - Important
****************************/
import model = require("./greeter")
var el = document.getElementById('content');
var greeter = new model.Greeter(el);
/** things */
greeter.start();

//// [copyrightWithoutNewLine1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*****************************
* (c) Copyright - Important
****************************/
const model = require("./greeter");
var el = document.getElementById('content');
var greeter = new model.Greeter(el);
/** things */
greeter.start();
