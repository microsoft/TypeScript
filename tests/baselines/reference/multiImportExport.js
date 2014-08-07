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


//// [Adder.d.ts]
declare class Adder {
    add(a: number, b: number): void;
}
export = Adder;
//// [Math.d.ts]
import Adder = require('Math/Adder');
declare var Math: {
    Adder: typeof Adder;
};
export = Math;
//// [Drawing.d.ts]
export import Math = require('Math/Math');
//// [consumer.d.ts]


//// [DtsFileErrors]


==== tests/cases/compiler/consumer.d.ts (0 errors) ====
    
==== tests/cases/compiler/Drawing.d.ts (1 errors) ====
    export import Math = require('Math/Math');
                                 ~~~~~~~~~~~
!!! Cannot find external module 'Math/Math'.
    
==== tests/cases/compiler/Math.d.ts (1 errors) ====
    import Adder = require('Math/Adder');
                           ~~~~~~~~~~~~
!!! Cannot find external module 'Math/Adder'.
    declare var Math: {
        Adder: typeof Adder;
    };
    export = Math;
    
==== tests/cases/compiler/Adder.d.ts (0 errors) ====
    declare class Adder {
        add(a: number, b: number): void;
    }
    export = Adder;
    