//// [classSideInheritance2.ts]
interface IText {
    foo: number;
}

interface TextSpan {}

class TextBase implements IText {
    public foo: number;
    public subText(span: TextSpan): IText {

        return new SubText(this, span);
    }
}

class SubText extends TextBase {

        constructor(text: IText, span: TextSpan) {
            super();
        }
}

//// [classSideInheritance2.js]
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TextBase = (function () {
    function TextBase() {
    }
    TextBase.prototype.subText = function (span) {
        return new SubText(this, span);
    };
    return TextBase;
})();
var SubText = (function (_super) {
    __extends(SubText, _super);
    function SubText(text, span) {
        _super.call(this);
    }
    return SubText;
})(TextBase);
