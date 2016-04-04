//// [pi.ts]

export default 3.14159;

//// [app.js]
System.register("pi", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    return {
        setters:[],
        execute: function() {
            exports_1("default",3.14159);
        }
    }
});


//// [app.d.ts]
declare module "pi" {
    declare var _default: number;
    export default _default;
}


//// [DtsFileErrors]


app.d.ts(2,5): error TS1038: A 'declare' modifier cannot be used in an already ambient context.


==== app.d.ts (1 errors) ====
    declare module "pi" {
        declare var _default: number;
        ~~~~~~~
!!! error TS1038: A 'declare' modifier cannot be used in an already ambient context.
        export default _default;
    }
    