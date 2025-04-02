//// [tests/cases/compiler/recursiveClassInstantiationsWithDefaultConstructors.ts] ////

//// [recursiveClassInstantiationsWithDefaultConstructors.ts]
module TypeScript2 {
    export class MemberName {
        public prefix: string = "";
    }
    export class MemberNameArray extends MemberName {
    }
}

var a = new TypeScript2.MemberNameArray()

//// [recursiveClassInstantiationsWithDefaultConstructors.js]
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
var TypeScript2;
(function (TypeScript2) {
    var MemberName = /** @class */ (function () {
        function MemberName() {
            this.prefix = "";
        }
        return MemberName;
    }());
    TypeScript2.MemberName = MemberName;
    var MemberNameArray = /** @class */ (function (_super) {
        __extends(MemberNameArray, _super);
        function MemberNameArray() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return MemberNameArray;
    }(MemberName));
    TypeScript2.MemberNameArray = MemberNameArray;
})(TypeScript2 || (TypeScript2 = {}));
var a = new TypeScript2.MemberNameArray();
