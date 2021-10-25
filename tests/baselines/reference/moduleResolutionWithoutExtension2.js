//// [buzz.mts]
// Extensionless relative path cjs import in an ES module
import foo = require("./foo"); // should error
foo;

//// [buzz.mjs]
import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
// Extensionless relative path cjs import in an ES module
const foo = __require("./foo"); // should error
foo;
