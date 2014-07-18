//// [tests/cases/compiler/exportImport.ts] ////

//// [w1.ts]

export = Widget1
class Widget1 { name = 'one'; }

//// [exporter.ts]
export import w = require('./w1');

//// [consumer.ts]
import e = require('./exporter');

export function w(): e.w { // Should be OK
    return new e.w();
}

//// [w1.js]
define(["require", "exports"], function (require, exports) {
    var Widget1 = (function () {
        function Widget1() {
            this.name = 'one';
        }
        return Widget1;
    })();
    return Widget1;
});
//// [exporter.js]
define(["require", "exports", './w1'], function (require, exports, w) {
    exports.w = w;
});
//// [consumer.js]
define(["require", "exports", './exporter'], function (require, exports, e) {
    function w() {
        return new e.w();
    }
    exports.w = w;
});


//// [w1.d.ts]
export = Widget1;
declare class Widget1 {
    name: string;
}
//// [exporter.d.ts]
export import w = require('./w1');
//// [consumer.d.ts]
export declare function w(): Widget1;


//// [DtsFileErrors]


==== tests/cases/compiler/consumer.d.ts (1 errors) ====
    export declare function w(): Widget1;
                                 ~~~~~~~
!!! Cannot find name 'Widget1'.
    
==== tests/cases/compiler/w1.d.ts (0 errors) ====
    export = Widget1;
    declare class Widget1 {
        name: string;
    }
    
==== tests/cases/compiler/exporter.d.ts (0 errors) ====
    export import w = require('./w1');
    