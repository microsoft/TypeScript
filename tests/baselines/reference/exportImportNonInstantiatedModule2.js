//// [tests/cases/compiler/exportImportNonInstantiatedModule2.ts] ////

//// [w1.ts]

export = Widget1
interface Widget1 { name: string; }

//// [exporter.ts]
export import w = require('./w1');

//// [consumer.ts]
import e = require('./exporter');

export function w(): e.w { // Should be OK
    return {name: 'value' };
}

//// [w1.js]
define(["require", "exports"], function (require, exports) {
});
//// [exporter.js]
define(["require", "exports"], function (require, exports) {
});
//// [consumer.js]
define(["require", "exports"], function (require, exports) {
    function w() {
        return { name: 'value' };
    }
    exports.w = w;
});


//// [w1.d.ts]
export = Widget1;
interface Widget1 {
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
    interface Widget1 {
        name: string;
    }
    
==== tests/cases/compiler/exporter.d.ts (0 errors) ====
    export import w = require('./w1');
    