// @module: commonjs
// @declaration: true
// @Filename: consumer.ts
import Drawing = require('./Drawing');
var addr = new Drawing.Math.Adder();

// @Filename: Drawing.ts
export import Math = require('./Math/Math')

// @Filename: Math/Math.ts
import Adder = require('./Adder');

var Math = {
    Adder:Adder
};

export = Math

// @Filename: Math/Adder.ts
class Adder {
    add(a: number, b: number) {
        
    }
}

export = Adder;