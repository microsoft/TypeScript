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