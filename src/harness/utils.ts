namespace utils {
    export function identity<T>(v: T) { return v; }

    export function getByteOrderMarkLength(text: string) {
        if (text.length >= 2) {
            const ch0 = text.charCodeAt(0);
            const ch1 = text.charCodeAt(1);
            if ((ch0 === 0xff && ch1 === 0xfe) ||
                (ch0 === 0xfe && ch1 === 0xff)) {
                return 2;
            }
            if (text.length >= 3 && ch0 === 0xef && ch1 === 0xbb && text.charCodeAt(2) === 0xbf) {
                return 3;
            }
        }
        return 0;
    }

    export function removeByteOrderMark(text: string) {
        const length = getByteOrderMarkLength(text);
        return length ? text.slice(length) : text;
    }

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