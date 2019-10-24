//// [declarationEmitAccessorsAsProperties.ts]
export class Cls {
    get prop(): number {
        return 12;
    }

    set evt(x: number) {}

    get val(): number {
        return 42;
    }
    set val(_) {}
}

//// [declarationEmitAccessorsAsProperties.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cls = /** @class */ (function () {
    function Cls() {
    }
    Object.defineProperty(Cls.prototype, "prop", {
        get: function () {
            return 12;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cls.prototype, "evt", {
        set: function (x) { },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cls.prototype, "val", {
        get: function () {
            return 42;
        },
        set: function (_) { },
        enumerable: true,
        configurable: true
    });
    return Cls;
}());
exports.Cls = Cls;


//// [declarationEmitAccessorsAsProperties.d.ts]
export declare class Cls {
    readonly prop: number;
    evt: number;
    val: number;
}
