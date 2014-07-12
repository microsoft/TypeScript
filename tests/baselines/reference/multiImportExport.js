//// [tests/cases/compiler/multiImportExport.ts] ////

//// [consumer.ts]
import Drawing = require('./Drawing');
var addr = new Drawing.Math.Adder();

//// [Drawing.ts]
export import Math = require('Math/Math')

//// [Math.ts]
import Adder = require('Math/Adder');

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
var Adder = (function () {
    function Adder() {
    }
    Adder.prototype.add = function (a, b) {
    };
    return Adder;
})();
module.exports = Adder;
//// [Math.js]
var Adder = require('Math/Adder');
var Math = {
    Adder: Adder
};
module.exports = Math;
//// [Drawing.js]
exports.Math = require('Math/Math');
//// [consumer.js]
var Drawing = require('./Drawing');
var addr = new Drawing.Math.Adder();
