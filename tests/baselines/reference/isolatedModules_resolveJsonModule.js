//// [tests/cases/compiler/isolatedModules_resolveJsonModule.ts] ////

//// [a.ts]
import j = require("./j.json");

//// [j.json]
{}


//// [a.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
