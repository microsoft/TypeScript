//// [tests/cases/compiler/nestedLoopTypeGuards.ts] ////

//// [nestedLoopTypeGuards.ts]
// Repros from #10378

function f1() {
    var a: boolean | number | string;
    if (typeof a !== 'boolean') {
        // a is narrowed to "number | string"
        for (var i = 0; i < 1; i++) {
            for (var j = 0; j < 1; j++) {}
            if (typeof a === 'string') {
                // a is narrowed to "string'
                for (var j = 0; j < 1; j++) {
                    a.length; // Should not error here
                }
            }
        }
    }
}

function f2() {
    var a: string | number;
    if (typeof a === 'string') {
        while (1) {
            while (1) {}
            if (typeof a === 'string') {
                while (1) {
                    a.length; // Should not error here
                }
            }
        }
    }
}

//// [nestedLoopTypeGuards.js]
// Repros from #10378
function f1() {
    var a;
    if (typeof a !== 'boolean') {
        // a is narrowed to "number | string"
        for (var i = 0; i < 1; i++) {
            for (var j = 0; j < 1; j++) { }
            if (typeof a === 'string') {
                // a is narrowed to "string'
                for (var j = 0; j < 1; j++) {
                    a.length; // Should not error here
                }
            }
        }
    }
}
function f2() {
    var a;
    if (typeof a === 'string') {
        while (1) {
            while (1) { }
            if (typeof a === 'string') {
                while (1) {
                    a.length; // Should not error here
                }
            }
        }
    }
}
