// @module: commonjs
// @Filename: importAsBaseClass_0.ts
export class Greeter {
   greet() { return 'greet' }
}

// @Filename: importAsBaseClass_1.ts
import Greeter = require("./importAsBaseClass_0");
class Hello extends Greeter { }
