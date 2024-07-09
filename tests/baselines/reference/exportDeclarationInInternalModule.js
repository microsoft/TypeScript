//// [tests/cases/compiler/exportDeclarationInInternalModule.ts] ////

//// [exportDeclarationInInternalModule.ts]
class Bbb {
}

class Aaa extends Bbb { }

module Aaa {
    export class SomeType { }
}

module Bbb {
    export class SomeType { }

    export * from Aaa;      // this line causes the nullref
}

var a: Bbb.SomeType;


//// [exportDeclarationInInternalModule.js]
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Bbb = /** @class */ (function () {
    function Bbb() {
    }
    return Bbb;
}());
var Aaa = /** @class */ (function (_super) {
    __extends(Aaa, _super);
    function Aaa() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Aaa;
}(Bbb));
(function (Aaa) {
    var SomeType = /** @class */ (function () {
        function SomeType() {
        }
        return SomeType;
    }());
    Aaa.SomeType = SomeType;
})(Aaa || (Aaa = {}));
(function (Bbb) {
    var SomeType = /** @class */ (function () {
        function SomeType() {
        }
        return SomeType;
    }());
    Bbb.SomeType = SomeType;
})(Bbb || (Bbb = {}));
var a;


//// [exportDeclarationInInternalModule.d.ts]
declare class Bbb {
}
declare class Aaa extends Bbb {
}
declare namespace Aaa {
    class SomeType {
    }
}
declare namespace Bbb {
    export class SomeType {
    }
    export * from Aaa;
}
declare var a: Bbb.SomeType;
