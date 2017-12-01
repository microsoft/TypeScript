//// [pi.ts]
export default 3.14159;

//// [pi.js]
System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("default", 3.14159);
        }
    };
});


//// [pi.d.ts]
declare const _default: 3.14159;
export default _default;
