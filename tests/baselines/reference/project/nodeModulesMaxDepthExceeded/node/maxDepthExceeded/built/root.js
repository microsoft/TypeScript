"use strict";
exports.__esModule = true;
var m1 = require("m1");
m1.f1("test");
m1.f2.a = "10"; // Error: Should be number
m1.rel = 42; // Error: Should be boolean
m1.f2.person.age = "10"; // OK if stopped at 2 modules: person will be "any".
