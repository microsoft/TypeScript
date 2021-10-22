//// [buzz.mts]
// Extensionless relative path cjs import in an ES module
import foo = require("./foo");
foo;

//// [buzz.mjs]
import { createRequire as _createRequire } from "module";
const __require = _createRequire(import.meta.url);
// Extensionless relative path cjs import in an ES module
const foo = __require("./foo");
foo;
