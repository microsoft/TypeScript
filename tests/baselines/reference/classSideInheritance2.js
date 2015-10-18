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
var __extends = (this && this.__extends) || function (d, b) {
    if (b) Object.setPrototypeOf ? Object.setPrototypeOf(d, b) : d.__proto__ = b;
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SubText = (function (_super) {
    __extends(SubText, _super);
    function SubText(text, span) {
        _super.call(this);
    }
    return SubText;
})(TextBase);
var TextBase = (function () {
    function TextBase() {
    }
    TextBase.prototype.subText = function (span) {
        return new SubText(this, span);
    };
    return TextBase;
})();
