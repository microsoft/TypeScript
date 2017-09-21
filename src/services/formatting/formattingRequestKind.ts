/// <reference path="references.ts"/>

/* @internal */
namespace ts.formatting {
    export const enum FormattingRequestKind {
        FormatDocument,
        FormatSelection,
        FormatOnEnter,
        FormatOnSemicolon,
        FormatOnOpeningCurlyBrace,
        FormatOnClosingCurlyBrace
    }
}