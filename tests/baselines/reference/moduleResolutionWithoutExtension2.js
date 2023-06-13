//// [tests/cases/conformance/externalModules/moduleResolutionWithoutExtension2.ts] ////

//// [buzz.mts]
// Extensionless relative path cjs import in an ES module
import foo = require("./foo"); // should error, should not ask for extension

//// [buzz.mjs]
export {};
