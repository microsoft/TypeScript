import * as ts from "./_namespaces/ts.js";

/**
 * Common utilities
 */

const testPathPrefixRegExp = /(?:(file:\/{3})|\/)\.(?:ts|lib|src)\//g;
export function removeTestPathPrefixes(text: string, retainTrailingDirectorySeparator?: boolean): string {
    return text !== undefined ? text.replace(testPathPrefixRegExp, (_, scheme) => scheme || (retainTrailingDirectorySeparator ? "/" : "")) : undefined!; // TODO: GH#18217
}

function createDiagnosticMessageReplacer<R extends (messageArgs: string[], ...args: string[]) => string[]>(diagnosticMessage: ts.DiagnosticMessage, replacer: R) {
    const messageParts = diagnosticMessage.message.split(/\{\d+\}/);
    const regExp = new RegExp(`^(?:${messageParts.map(ts.regExpEscape).join("(.*?)")})$`);
    type Args<R> = R extends (messageArgs: string[], ...args: infer A) => string[] ? A : [];
    return (text: string, ...args: Args<R>) => text.replace(regExp, (_, ...fixedArgs) => ts.formatStringFromArgs(diagnosticMessage.message, replacer(fixedArgs, ...args)));
}

const replaceTypesVersionsMessage = createDiagnosticMessageReplacer(
    ts.Diagnostics.package_json_has_a_typesVersions_entry_0_that_matches_compiler_version_1_looking_for_a_pattern_to_match_module_name_2,
    ([entry, , moduleName], compilerVersion) => [entry, compilerVersion, moduleName],
);

export function sanitizeTraceResolutionLogEntry(text: string): string {
    return text && replaceTypesVersionsMessage(text, "3.1.0-dev");
}

/**
 * Removes leading indentation from a template literal string.
 */
export function dedent(array: TemplateStringsArray, ...args: any[]): string {
    let text = array[0];
    for (let i = 0; i < args.length; i++) {
        text += args[i];
        text += array[i + 1];
    }

    const lineTerminatorRegExp = /\r\n?|\n/g;
    const lines: string[] = [];
    const lineTerminators: string[] = [];
    let match: RegExpExecArray | null; // eslint-disable-line no-restricted-syntax
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
    let indentation: number | undefined;
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

export function addUTF8ByteOrderMark(text: string): string {
    return getByteOrderMarkLength(text) === 0 ? "\u00EF\u00BB\u00BF" + text : text;
}

export function theory<T extends any[]>(name: string, cb: (...args: T) => void, data: T[]): void {
    for (const entry of data) {
        it(`${name}(${entry.map(formatTheoryDatum).join(", ")})`, () => cb(...entry));
    }
}

function formatTheoryDatum(value: any) {
    return typeof value === "function" ? value.name || "<anonymous function>" :
        value === undefined ? "undefined" :
        JSON.stringify(value);
}

export interface Deferred<T> {
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (reason: unknown) => void;
    promise: Promise<T>;
}

export function defer<T = void>(): Deferred<T> {
    let resolve!: (value: T | PromiseLike<T>) => void;
    let reject!: (reason: unknown) => void;
    const promise = new Promise<T>((_resolve, _reject) => {
        resolve = _resolve;
        reject = _reject;
    });
    return { resolve, reject, promise };
}
