// @module: commonjs
// @declaration: true
// @target: ES5

// @filename: server.ts
class c { }
export default c;

// @filename: client.ts
import defaultBinding from "./server";
export var x = new defaultBinding();
import defaultBinding2 from "./server"; // elide this import since defaultBinding2 is not used
