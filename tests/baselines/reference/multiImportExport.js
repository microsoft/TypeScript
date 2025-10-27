//// [tests/cases/compiler/multiImportExport.ts] ////

//// [consumer.ts]
import Drawing = require('./Drawing');
var addr = new Drawing.Math.Adder();

//// [Drawing.ts]
export import Math = require('./Math/Math')

//// [Math.ts]
import Adder = require('./Adder');

var Math = {
    Adder:Adder
};

export = Math

//// [Adder.ts]
class Adder {
    add(a: number, b: number) {
        
    }
}

export = Adder;

//// [Adder.js]
"use strict";
class Adder {
    add(a, b) {
    }
}
module.exports = Adder;
//// [Math.js]
"use strict";
const Adder = require("./Adder");
var Math = {
    Adder: Adder
};
module.exports = Math;
//// [Drawing.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Math = require("./Math/Math");
//// [consumer.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Drawing = require("./Drawing");
var addr = new Drawing.Math.Adder();


//// [Adder.d.ts]
declare class Adder {
    add(a: number, b: number): void;
}
export = Adder;
//// [Math.d.ts]
import Adder = require('./Adder');
declare var Math: {
    Adder: typeof Adder;
};
export = Math;
//// [Drawing.d.ts]
export import Math = require('./Math/Math');
//// [consumer.d.ts]
export {};
