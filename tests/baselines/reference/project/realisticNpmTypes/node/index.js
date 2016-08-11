"use strict";
var m1 = require("m1");
exports.m1 = m1;
var val = m1("works", 42);
void (m1.name + ": " + val);
