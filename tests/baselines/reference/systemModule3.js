//// [tests/cases/compiler/systemModule3.ts] ////

//// [file1.ts]


export default function() {}

//// [file2.ts]

export default function f() {}

//// [file3.ts]

export default class C {}

//// [file4.ts]

export default class {}

//// [file1.js]
System.register([], function(exports_1) {
    "use strict";
    function default_1() { }
    exports_1("default", default_1);
    return {
        setters:[],
        execute: function() {
        }
    }
});
//// [file2.js]
System.register([], function(exports_1) {
    "use strict";
    function f() { }
    exports_1("default", f);
    return {
        setters:[],
        execute: function() {
        }
    }
});
//// [file3.js]
System.register([], function(exports_1) {
    "use strict";
    var C;
    return {
        setters:[],
        execute: function() {
            C = (function () {
                function C() {
                }
                return C;
            })();
            exports_1("default", C);
        }
    }
});
//// [file4.js]
System.register([], function(exports_1) {
    "use strict";
    var default_1;
    return {
        setters:[],
        execute: function() {
            default_1 = (function () {
                function default_1() {
                }
                return default_1;
            })();
            exports_1("default", default_1);
        }
    }
});
