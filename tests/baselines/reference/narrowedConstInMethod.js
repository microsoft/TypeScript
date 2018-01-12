//// [narrowedConstInMethod.ts]
// Fixes #10501, possibly null 'x'
function f() {
    const x: string | null = <any>{};
    if (x !== null) {
        return {
            bar() { return x.length; }  // ok
        };
    }
}

function f2() {
    const x: string | null = <any>{};
    if (x !== null) {
        return class {
            bar() { return x.length; }  // ok
        };
    }
}


//// [narrowedConstInMethod.js]
// Fixes #10501, possibly null 'x'
function f() {
    var x = {};
    if (x !== null) {
        return {
            bar: function () { return x.length; } // ok
        };
    }
}
function f2() {
    var x = {};
    if (x !== null) {
        return /** @class */ (function () {
            function class_1() {
            }
            class_1.prototype.bar = function () { return x.length; }; // ok
            return class_1;
        }());
    }
}
