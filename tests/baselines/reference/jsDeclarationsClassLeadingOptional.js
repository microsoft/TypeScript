//// [bar.js]
export class Z {
    f(x = 1, y) {
        return [x, y];
    }
}

//// [bar.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Z = void 0;
var Z = /** @class */ (function () {
    function Z() {
    }
    Z.prototype.f = function (x, y) {
        if (x === void 0) { x = 1; }
        return [x, y];
    };
    return Z;
}());
exports.Z = Z;


//// [bar.d.ts]
export class Z {
    f(x: number, y: any): any[];
}
