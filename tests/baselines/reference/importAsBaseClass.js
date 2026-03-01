//// [tests/cases/compiler/importAsBaseClass.ts] ////

//// [importAsBaseClass_0.ts]
export class Greeter {
   greet() { return 'greet' }
}

//// [importAsBaseClass_1.ts]
import Greeter = require("./importAsBaseClass_0");
class Hello extends Greeter { }


//// [importAsBaseClass_0.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Greeter = void 0;
class Greeter {
    greet() { return 'greet'; }
}
exports.Greeter = Greeter;
//// [importAsBaseClass_1.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Greeter = require("./importAsBaseClass_0");
class Hello extends Greeter {
}
