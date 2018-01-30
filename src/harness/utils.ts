/// <reference path="./core.ts" />

// NOTE: The contents of this file are all exported from the namespace 'utils'. This is to
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

    /**
     * SameValueZero (from ECMAScript spec), which has stricter equality sematics than "==" or "===".
     */
    export function is(x: any, y: any) {
        return (x === y) ? (x !== 0 || 1 / x === 1 / y) : (x !== x && y !== y);
    }

    export interface Theory {
        title: string;
        args: any[];
    }

    export function theory(name: string, data: (Theory | any[])[], callback: (...args: any[]) => any) {
        describe(name, () => {
            for (const theory of data) {
                const title = Array.isArray(theory) ? theory.toString() : theory.title;
                const args = Array.isArray(theory) ? theory : theory.args;
                it(title, () => callback(...args));
            }
        });
    }

    /**
     * Removes leading indentation from a template literal string.
     */
    export function dedent(array: TemplateStringsArray, ...args: any[]) {
        let text = array[0];
        for (let i = 0; i < args.length; i++) {
            text += args[i];
            text += array[i + 1];
        }

        const lineTerminatorRegExp = /\r\n?|\n/g;
        const lines: string[] = [];
        const lineTerminators: string[] = [];
        let match: RegExpExecArray | null;
        let lineStart = 0;
        while (match = lineTerminatorRegExp.exec(text)) {
            lines.push(text.slice(lineStart, match.index));
            lineTerminators.push(match[0]);
            lineStart = match.index + match[0].length;
        }

        const indentation = guessIndentation(lines);

        let result = "";
        for (let i = 0; i < lines.length; i++) {
            const lineText = lines[i];
            const line = indentation ? lineText.slice(indentation) : lineText;
            result += line;
            result += lineTerminators[i];
        }
        return result;
    }

    function guessIndentation(lines: string[]) {
        let indentation: number;
        for (const line of lines) {
            for (let i = 0; i < line.length && (indentation === undefined || i < indentation); i++) {
                if (!ts.isWhiteSpaceLike(line.charCodeAt(i))) {
                    if (indentation === undefined || i < indentation) {
                        indentation = i;
                        break;
                    }
                }
            }
        }
        return indentation;
    }

    export function checkFileNames(caption: string, actualFileNames: ReadonlyArray<string>, expectedFileNames: string[]) {
        assert.equal(actualFileNames.length, expectedFileNames.length, `${caption}: incorrect actual number of files, expected ${expectedFileNames}, got ${actualFileNames}`);
        for (const f of expectedFileNames) {
            assert.isTrue(actualFileNames.indexOf(f) >= 0, `${caption}: expected to find ${f} in ${actualFileNames}`);
        }
    }

    export function toUtf8(text: string): string {
        return new Buffer(text).toString("utf8");
    }
}