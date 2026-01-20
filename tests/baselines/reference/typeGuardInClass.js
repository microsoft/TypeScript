//// [tests/cases/conformance/expressions/typeGuards/typeGuardInClass.ts] ////

//// [typeGuardInClass.ts]
declare var x: string | number;

if (typeof x === "string") {
    let n = class {
        constructor() {
            let y: string = x;
        }
    }
}
else {
    let m = class {
        constructor() {
            let y: number = x;
        }
    }
}


//// [typeGuardInClass.js]
if (typeof x === "string") {
    var n = /** @class */ (function () {
        function class_1() {
            var y = x;
        }
        return class_1;
    }());
}
else {
    var m = /** @class */ (function () {
        function class_2() {
            var y = x;
        }
        return class_2;
    }());
}
