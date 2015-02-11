// @module: commonjs
// @declaration: true

// @filename: server.ts
class c { }
export = c;

// @filename: client.ts
import defaultBinding from "server";
export var x = new defaultBinding();
import defaultBinding2 from "server"; // elide this import since defaultBinding2 is not used
