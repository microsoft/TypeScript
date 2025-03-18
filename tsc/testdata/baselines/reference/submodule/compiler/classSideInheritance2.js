//// [tests/cases/compiler/classSideInheritance2.ts] ////

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
class SubText extends TextBase {
    constructor(text, span) {
        super();
    }
}
class TextBase {
    foo;
    subText(span) {
        return new SubText(this, span);
    }
}
