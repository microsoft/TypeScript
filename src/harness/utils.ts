/// <reference path="./core.ts" />

// NOTE: The contents of this file are all exported from the namespace 'core'. This is to
//       support the eventual conversion of harness into a modular system.

namespace utils {
    const leadingCommentRegExp = /^(\s*\/\*[^]*?\*\/\s*|\s*\/\/[^\r\n\u2028\u2029]*[\r\n\u2028\u2029]*)+/;
    const trailingCommentRegExp = /(\s*\/\*[^]*?\*\/\s*|\s*\/\/[^\r\n\u2028\u2029]*[\r\n\u2028\u2029]*)+$/;
    const leadingAndTrailingCommentRegExp = /^(\s*\/\*[^]*?\*\/\s*|\s*\/\/[^\r\n\u2028\u2029]*[\r\n\u2028\u2029]*)+|(\s*\/\*[^]*?\*\/\s*|\s*\/\/[^\r\n\u2028\u2029]*[\r\n\u2028\u2029]*)+$/g;
    const allCommentRegExp = /(['"])(?:(?!\1).|\\[^])*\1|(\/\*[^]*?\*\/|\/\/[^\r\n\u2028\u2029]*[\r\n\u2028\u2029]*)/g;

    export const enum CommentRemoval {
        leading,
        trailing,
        leadingAndTrailing,
        all
    }

    export function removeComments(text: string, removal: CommentRemoval) {
        switch (removal) {
            case CommentRemoval.leading:
                return text.replace(leadingCommentRegExp, "");
            case CommentRemoval.trailing:
                return text.replace(trailingCommentRegExp, "");
            case CommentRemoval.leadingAndTrailing:
                return text.replace(leadingAndTrailingCommentRegExp, "");
            case CommentRemoval.all:
                return text.replace(allCommentRegExp, (match, quote) => quote ? match : "");
        }
    }

    const testPathPrefixRegExp = /\/\.(ts|lib|src)\//g;
    export function removeTestPathPrefixes(text: string) {
        return text !== undefined ? text.replace(testPathPrefixRegExp, "") : undefined;
    }
}