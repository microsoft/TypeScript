import { convertToRelativePath } from "./path.ts";
import type { DiagnosticResponse as Diagnostic } from "./proto.generated.ts";

export interface FormatDiagnosticsHost {
    getCurrentDirectory(): string;
    getCanonicalFileName(fileName: string): string;
    getNewLine(): string;
}

const foregroundColorEscapeGrey = "\x1b[90m";
const foregroundColorEscapeRed = "\x1b[91m";
const foregroundColorEscapeYellow = "\x1b[93m";
const foregroundColorEscapeBlue = "\x1b[94m";
const foregroundColorEscapeCyan = "\x1b[96m";
const gutterStyleSequence = "\x1b[7m";
const gutterSeparator = " ";
const resetEscapeSequence = "\x1b[0m";
const ellipsis = "...";
const halfIndent = "  ";
const indent = "    ";
const fileAppearsToBeBinaryCode = 1490;

function diagnosticCategoryName(category: number): string {
    switch (category) {
        case 0:
            return "warning";
        case 1:
            return "error";
        case 2:
            return "suggestion";
        case 3:
            return "message";
        default:
            throw new Error(`Unknown diagnostic category: ${category}`);
    }
}

function getCategoryFormat(category: number): string {
    switch (category) {
        case 0:
            return foregroundColorEscapeYellow;
        case 1:
            return foregroundColorEscapeRed;
        case 2:
            return foregroundColorEscapeGrey;
        case 3:
            return foregroundColorEscapeBlue;
        default:
            throw new Error(`Unknown diagnostic category: ${category}`);
    }
}

function formatColorAndReset(text: string, formatStyle: string): string {
    return formatStyle + text + resetEscapeSequence;
}

function diagnosticPrefix(diagnostic: Diagnostic): string {
    return diagnostic.source || "TS";
}

/**
 * Flattens a diagnostic's message text and its message chain into a single string,
 * with each level of the chain on its own indented line.
 */
export function flattenDiagnosticMessageText(diagnostic: Diagnostic, newLine: string, indent = 0): string {
    let result = "";
    if (indent) {
        result += newLine + "  ".repeat(indent);
    }
    result += diagnostic.text;
    for (const child of diagnostic.messageChain ?? []) {
        result += flattenDiagnosticMessageText(child, newLine, indent + 1);
    }
    return result;
}

function relativeFileName(fileName: string, host: FormatDiagnosticsHost): string {
    return convertToRelativePath(
        fileName,
        host.getCurrentDirectory(),
        name => host.getCanonicalFileName(name),
    );
}

function formatLocation(diagnostic: Diagnostic, host: FormatDiagnosticsHost): string {
    if (!diagnostic.fileName || !diagnostic.startPosition) return "";
    const fileName = relativeFileName(diagnostic.fileName, host);
    const { line, character } = diagnostic.startPosition;
    return formatColorAndReset(fileName, foregroundColorEscapeCyan) +
        ":" +
        formatColorAndReset(`${line + 1}`, foregroundColorEscapeYellow) +
        ":" +
        formatColorAndReset(`${character + 1}`, foregroundColorEscapeYellow);
}

function formatCodeSpan(
    diagnostic: Diagnostic,
    lineIndent: string,
    squiggleColor: string,
    host: FormatDiagnosticsHost,
): string {
    const { startPosition, endPosition, sourceLines } = diagnostic;
    if (!startPosition || !endPosition || !sourceLines?.length) return "";

    const endCharacter = startPosition.line === endPosition.line &&
            startPosition.character === endPosition.character
        ? endPosition.character + 1
        : endPosition.character;
    const hasMoreThanFiveLines = endPosition.line - startPosition.line >= 4;
    const gutterWidth = hasMoreThanFiveLines
        ? Math.max(ellipsis.length, `${endPosition.line + 1}`.length)
        : `${endPosition.line + 1}`.length;
    let context = "";
    let previousLine: number | undefined;

    for (const sourceLine of sourceLines) {
        if (previousLine !== undefined && sourceLine.line > previousLine + 1) {
            context += host.getNewLine();
            context += lineIndent +
                formatColorAndReset(ellipsis.padStart(gutterWidth), gutterStyleSequence) +
                gutterSeparator;
        }

        const lineContent = sourceLine.text.trimEnd().replace(/\t/g, " ");
        context += host.getNewLine();
        context += lineIndent +
            formatColorAndReset(`${sourceLine.line + 1}`.padStart(gutterWidth), gutterStyleSequence) +
            gutterSeparator +
            lineContent +
            host.getNewLine();
        context += lineIndent +
            formatColorAndReset("".padStart(gutterWidth), gutterStyleSequence) +
            gutterSeparator +
            squiggleColor;

        if (sourceLine.line === startPosition.line) {
            const lastCharacter = sourceLine.line === endPosition.line
                ? endCharacter
                : lineContent.length;
            context += " ".repeat(startPosition.character);
            context += "~".repeat(Math.max(0, lastCharacter - startPosition.character));
        }
        else if (sourceLine.line === endPosition.line) {
            context += "~".repeat(endCharacter);
        }
        else {
            context += "~".repeat(lineContent.length);
        }
        context += resetEscapeSequence;
        previousLine = sourceLine.line;
    }

    return context;
}

export function formatDiagnostic(diagnostic: Diagnostic, host: FormatDiagnosticsHost): string {
    const errorMessage = `${diagnosticCategoryName(diagnostic.category)} ${diagnosticPrefix(diagnostic)}${diagnostic.code}: ${flattenDiagnosticMessageText(diagnostic, host.getNewLine())}${host.getNewLine()}`;
    if (diagnostic.fileName && diagnostic.startPosition) {
        const { line, character } = diagnostic.startPosition;
        return `${relativeFileName(diagnostic.fileName, host)}(${line + 1},${character + 1}): ${errorMessage}`;
    }
    return errorMessage;
}

export function formatDiagnostics(diagnostics: readonly Diagnostic[], host: FormatDiagnosticsHost): string {
    let output = "";
    for (const diagnostic of diagnostics) {
        output += formatDiagnostic(diagnostic, host);
    }
    return output;
}

export function formatDiagnosticsWithColorAndContext(
    diagnostics: readonly Diagnostic[],
    host: FormatDiagnosticsHost,
): string {
    let output = "";
    for (let i = 0; i < diagnostics.length; i++) {
        if (i > 0) {
            output += host.getNewLine();
        }
        const diagnostic = diagnostics[i];
        if (diagnostic.fileName && diagnostic.startPosition) {
            output += formatLocation(diagnostic, host) + " - ";
        }
        output += formatColorAndReset(diagnosticCategoryName(diagnostic.category), getCategoryFormat(diagnostic.category));
        output += formatColorAndReset(` ${diagnosticPrefix(diagnostic)}${diagnostic.code}: `, foregroundColorEscapeGrey);
        output += flattenDiagnosticMessageText(diagnostic, host.getNewLine());

        if (diagnostic.fileName && diagnostic.code !== fileAppearsToBeBinaryCode) {
            output += host.getNewLine();
            output += formatCodeSpan(diagnostic, "", getCategoryFormat(diagnostic.category), host);
            output += host.getNewLine();
        }

        if (diagnostic.relatedInformation?.length) {
            for (const related of diagnostic.relatedInformation) {
                if (related.fileName && related.startPosition) {
                    output += host.getNewLine();
                    output += halfIndent + formatLocation(related, host);
                    output += " - " + flattenDiagnosticMessageText(related, host.getNewLine());
                    output += formatCodeSpan(related, indent, foregroundColorEscapeCyan, host);
                }
                output += host.getNewLine();
            }
        }
    }
    return output;
}
