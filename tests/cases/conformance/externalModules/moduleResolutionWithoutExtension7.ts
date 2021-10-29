// @moduleResolution: node12
// @module: node12

// @filename: /src/bar.cts
// Extensionless relative path cjs import in a cjs module
import foo = require("./foo"); // should error, should not ask for extension