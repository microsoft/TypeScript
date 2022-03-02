/**
 * Common utilities
 */
namespace Utils {
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
