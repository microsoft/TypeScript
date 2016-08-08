//// [strictNullChecksAndDestrcturingDeclaration.ts]

// Repro from #10078

class A {
    f({x}: { x?: boolean } = {}) { };
}
class B extends A {
    f({x, y}: { x?: boolean, y?: boolean } = {}) { };
}

//// [strictNullChecksAndDestrcturingDeclaration.js]
// Repro from #10078
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var A = (function () {
    function A() {
    }
    A.prototype.f = function (_a) {
        var x = (_a === void 0 ? {} : _a).x;
    };
    ;
    return A;
}());
var B = (function (_super) {
    __extends(B, _super);
    function B() {
        _super.apply(this, arguments);
    }
    B.prototype.f = function (_a) {
        var _b = _a === void 0 ? {} : _a, x = _b.x, y = _b.y;
    };
    ;
    return B;
}(A));


//// [strictNullChecksAndDestrcturingDeclaration.d.ts]
declare class A {
    f({x}?: {
        x?: boolean;
    }): void;
}
declare class B extends A {
    f({x, y}?: {
        x?: boolean;
        y?: boolean;
    }): void;
}


//// [DtsFileErrors]


tests/cases/compiler/strictNullChecksAndDestrcturingDeclaration.d.ts(7,8): error TS2459: Type '{ x?: boolean | undefined; y?: boolean | undefined; } | undefined' has no property 'x' and no string index signature.
tests/cases/compiler/strictNullChecksAndDestrcturingDeclaration.d.ts(7,11): error TS2459: Type '{ x?: boolean | undefined; y?: boolean | undefined; } | undefined' has no property 'y' and no string index signature.


==== tests/cases/compiler/strictNullChecksAndDestrcturingDeclaration.d.ts (2 errors) ====
    declare class A {
        f({x}?: {
            x?: boolean;
        }): void;
    }
    declare class B extends A {
        f({x, y}?: {
           ~
!!! error TS2459: Type '{ x?: boolean | undefined; y?: boolean | undefined; } | undefined' has no property 'x' and no string index signature.
              ~
!!! error TS2459: Type '{ x?: boolean | undefined; y?: boolean | undefined; } | undefined' has no property 'y' and no string index signature.
            x?: boolean;
            y?: boolean;
        }): void;
    }
    