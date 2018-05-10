//// [systemJsForInNoException.ts]
export const obj = { a: 1 };
for (var key in obj)
    console.log(obj[key]);

//// [systemJsForInNoException.js]
System.register([], function (exports_1, context_1) {
    var obj, key;
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("obj", obj = { a: 1 });
            for (key in obj)
                console.log(obj[key]);
        }
    };
});
