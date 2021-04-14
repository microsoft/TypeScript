//// [classSideInheritance2.ts]
interface IText {
    foo: number;
}

interface TextSpan {}

class SubText extends TextBase {

        constructor(text: IText, span: TextSpan) {
            super();
        }
}

class TextBase implements IText {
        public foo: number;
        public subText(span: TextSpan): IText {

            return new SubText(this, span);
        }
}

//// [classSideInheritance2.js]
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
var SubText = /** @class */ (function (_super) {
    __extends(SubText, _super);
    function SubText(text, span) {
        return _super.call(this) || this;
    }
    return SubText;
}(TextBase));
var TextBase = /** @class */ (function () {
    function TextBase() {
    }
    TextBase.prototype.subText = function (span) {
        return new SubText(this, span);
    };
    return TextBase;
}());
