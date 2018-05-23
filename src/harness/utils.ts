/**
 * Common utilities
 */
namespace utils {
    const testPathPrefixRegExp = /(?:(file:\/{3})|\/)\.(ts|lib|src)\//g;
    export function removeTestPathPrefixes(text: string, retainTrailingDirectorySeparator?: boolean) {
        return text !== undefined ? text.replace(testPathPrefixRegExp, (_, scheme) => scheme || (retainTrailingDirectorySeparator ? "/" : "")) : undefined;
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
            if (lineStart !== match.index || lines.length > 0) {
                lines.push(text.slice(lineStart, match.index));
                lineTerminators.push(match[0]);
            }
            lineStart = match.index + match[0].length;
        }

        if (lineStart < text.length) {
            lines.push(text.slice(lineStart));
        }

        const indentation = guessIndentation(lines);

        let result = "";
        for (let i = 0; i < lines.length; i++) {
            const lineText = lines[i];
            const line = indentation ? lineText.slice(indentation) : lineText;
            result += line;
            if (i < lineTerminators.length) {
                result += lineTerminators[i];
            }
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

    export function toUtf8(text: string): string {
        return new Buffer(text).toString("utf8");
    }

    export function getByteOrderMarkLength(text: string): number {
        if (text.length >= 1) {
            const ch0 = text.charCodeAt(0);
            if (ch0 === 0xfeff) return 1;
            if (ch0 === 0xfe) return text.length >= 2 && text.charCodeAt(1) === 0xff ? 2 : 0;
            if (ch0 === 0xff) return text.length >= 2 && text.charCodeAt(1) === 0xfe ? 2 : 0;
            if (ch0 === 0xef) return text.length >= 3 && text.charCodeAt(1) === 0xbb && text.charCodeAt(2) === 0xbf ? 3 : 0;
        }
        return 0;
    }

    export function removeByteOrderMark(text: string): string {
        const length = getByteOrderMarkLength(text);
        return length ? text.slice(length) : text;
    }

    export function addUTF8ByteOrderMark(text: string) {
        return getByteOrderMarkLength(text) === 0 ? "\u00EF\u00BB\u00BF" + text : text;
    }
}