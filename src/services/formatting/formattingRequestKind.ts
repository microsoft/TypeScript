/// <reference path="references.ts"/>

/* @internal */
module ts.formatting {
    export const enum FormattingRequestKind {
        FormatDocument,
        FormatSelection,
        FormatOnEnter,
        FormatOnSemicolon,
        FormatOnClosingCurlyBrace
    }
}