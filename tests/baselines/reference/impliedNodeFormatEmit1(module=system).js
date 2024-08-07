//// [tests/cases/compiler/impliedNodeFormatEmit1.ts] ////

//// [a.ts]
export const _ = 0;

//// [b.mts]
export const _ = 0;

//// [c.cts]
export const _ = 0;

//// [d.js]
export const _ = 0;

//// [e.mjs]
export const _ = 0;

//// [f.mjs]
export const _ = 0;

//// [g.ts]
import {} from "./a";
import a = require("./a");

//// [h.mts]
import {} from "./a";
import a = require("./a");

//// [i.cts]
import {} from "./a";
import a = require("./a");

//// [dummy.ts]
export {};


//// [a.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var _;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("_", _ = 0);
        }
    };
});
//// [b.mjs]
System.register([], function (exports_1, context_1) {
    "use strict";
    var _;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("_", _ = 0);
        }
    };
});
//// [c.cjs]
System.register([], function (exports_1, context_1) {
    "use strict";
    var _;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("_", _ = 0);
        }
    };
});
//// [d.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var _;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("_", _ = 0);
        }
    };
});
//// [e.mjs]
System.register([], function (exports_1, context_1) {
    "use strict";
    var _;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("_", _ = 0);
        }
    };
});
//// [f.mjs]
System.register([], function (exports_1, context_1) {
    "use strict";
    var _;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("_", _ = 0);
        }
    };
});
//// [g.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
//// [h.mjs]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
//// [i.cjs]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
//// [dummy.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
