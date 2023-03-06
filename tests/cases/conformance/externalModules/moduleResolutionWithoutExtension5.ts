// @moduleResolution: node16
// @module: node16

// @filename: /src/buzz.mts
// Extensionless relative path dynamic import in an ES module
import("./foo").then(x => x); // should error, ask for extension