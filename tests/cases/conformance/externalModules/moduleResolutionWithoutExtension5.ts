// @moduleResolution: node12
// @module: node12

// @filename: /src/buzz.mts
// Extensionless relative path dynamic import in an ES module
import("./foo").then(x => x); // should error, ask for extension