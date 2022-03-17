//// [bar.cts]
// Extensionless relative path cjs import in a cjs module
import foo = require("./foo"); // should error, should not ask for extension

//// [bar.cjs]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
