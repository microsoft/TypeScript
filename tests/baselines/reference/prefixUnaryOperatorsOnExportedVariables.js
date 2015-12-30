//// [prefixUnaryOperatorsOnExportedVariables.ts]

export var x = false;
export var y = 1;
if (!x) {
    
}

if (+x) {
    
}

if (-x) {
    
}

if (~x) {
    
}

if (void x) {
    
}

if (typeof x) {
    
}

if (++y) {
    
}

//// [prefixUnaryOperatorsOnExportedVariables.js]
System.register([], function(exports_1) {
    "use strict";
    var x, y;
    return {
        setters:[],
        execute: function() {
            exports_1("x", x = false);
            exports_1("y", y = 1);
            if (!x) {
            }
            if (+x) {
            }
            if (-x) {
            }
            if (~x) {
            }
            if (void x) {
            }
            if (typeof x) {
            }
            if (exports_1("y", ++y)) {
            }
        }
    }
});
