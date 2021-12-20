//// [buzz.mts]
// Extensionless relative path dynamic import in an ES module
import("./foo").then(x => x); // should error, ask for extension

//// [buzz.mjs]
// Extensionless relative path dynamic import in an ES module
import("./foo").then(x => x); // should error, ask for extension
