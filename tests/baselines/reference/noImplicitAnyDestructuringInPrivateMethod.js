//// [tests/cases/compiler/noImplicitAnyDestructuringInPrivateMethod.ts] ////

//// [noImplicitAnyDestructuringInPrivateMethod.ts]
type Arg = {
    a: number;
};
export class Bar {
    private bar({ a, }: Arg): number {
        return a;
    }
}
export declare class Bar2 {
    private bar({ a, });
}

//// [noImplicitAnyDestructuringInPrivateMethod.js]
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bar = void 0;
var Bar = /** @class */ (function () {
    function Bar() {
    }
    Bar.prototype.bar = function (_a) {
        var a = _a.a;
        return a;
    };
    return Bar;
}());
exports.Bar = Bar;


//// [noImplicitAnyDestructuringInPrivateMethod.d.ts]
export declare class Bar {
    private bar;
}
export declare class Bar2 {
    private bar;
}
