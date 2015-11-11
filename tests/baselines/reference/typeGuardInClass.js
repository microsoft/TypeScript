//// [typeGuardInClass.ts]
let x: string | number;

if (typeof x === "string") {
    let n = class {
        constructor() {
            x; // Should be "string"
        }
    }
}
else {
    let m = class {
        constructor() {
            x; // Should be "number"
        }
    }
}


//// [typeGuardInClass.js]
var x;
if (typeof x === "string") {
    var n = (function () {
        function class_1() {
            x; // Should be "string"
        }
        return class_1;
    })();
}
else {
    var m = (function () {
        function class_2() {
            x; // Should be "number"
        }
        return class_2;
    })();
}
