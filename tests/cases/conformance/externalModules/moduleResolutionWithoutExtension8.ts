// @moduleResolution: node16
// @module: node16

// @filename: /src/bar.cts
// Extensionless relative path dynamic import in a cjs module
import("./foo").then(x => x); // should error, ask for extension