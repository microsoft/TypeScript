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
    "use strict";
    exports.__esModule = true;
});
//// [exporter.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
});
//// [consumer.js]
define(["require", "exports"], function (require, exports) {
    "use strict";
    exports.__esModule = true;
    exports.w = void 0;
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
import e = require('./exporter');
export declare function w(): e.w;
