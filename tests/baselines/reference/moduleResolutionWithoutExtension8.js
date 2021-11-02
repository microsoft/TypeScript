//// [bar.cts]
// Extensionless relative path dynamic import in a cjs module
import("./foo").then(x => x); // should error, ask for extension

//// [bar.cjs]
// Extensionless relative path dynamic import in a cjs module
import("./foo").then(x => x); // should error, ask for extension
