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
