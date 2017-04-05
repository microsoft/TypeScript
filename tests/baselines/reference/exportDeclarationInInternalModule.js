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
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Bbb = (function () {
    function Bbb() {
    }
    return Bbb;
}());
var Aaa = (function (_super) {
    __extends(Aaa, _super);
    function Aaa() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Aaa;
}(Bbb));
(function (Aaa) {
    var SomeType = (function () {
        function SomeType() {
        }
        return SomeType;
    }());
    Aaa.SomeType = SomeType;
})(Aaa || (Aaa = {}));
(function (Bbb) {
    var SomeType = (function () {
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
declare module Aaa {
    class SomeType {
    }
}
declare module Bbb {
    class SomeType {
    }
    export * from Aaa;
}
declare var a: Bbb.SomeType;
