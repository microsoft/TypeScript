//// [narrowedConstInMethod.ts]

function f() {
    const x: string | null = <any>{};
    if (x !== null) {
        return {
            bar() { return x.length; }  // Error: possibly null x
        };
    }
}

function f2() {
    const x: string | null = <any>{};
    if (x !== null) {
        return class {
            bar() { return x.length; }  // Error: possibly null x
        };
    }
}

//// [narrowedConstInMethod.js]
function f() {
    var x = {};
    if (x !== null) {
        return {
            bar: function () { return x.length; } // Error: possibly null x
        };
    }
}
function f2() {
    var x = {};
    if (x !== null) {
        return (function () {
            function class_1() {
            }
            class_1.prototype.bar = function () { return x.length; }; // Error: possibly null x
            return class_1;
        }());
    }
}
