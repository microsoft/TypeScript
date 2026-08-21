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

function flattenDiagnosticMessage(diagnostic: Diagnostic, newLine: string, indentLevel = 0): string {
    let result = "";
    if (indentLevel) {
        result += newLine + "  ".repeat(indentLevel);
    }
    result += diagnostic.text;
    for (const child of diagnostic.messageChain ?? []) {
        result += flattenDiagnosticMessage(child, newLine, indentLevel + 1);
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
                ? endPosition.character
                : lineContent.length;
            context += " ".repeat(startPosition.character);
            context += "~".repeat(Math.max(0, lastCharacter - startPosition.character));
        }
        else if (sourceLine.line === endPosition.line) {
            context += "~".repeat(endPosition.character);
        }
        else {
            context += "~".repeat(lineContent.length);
        }
        context += resetEscapeSequence;
        previousLine = sourceLine.line;
    }

    return context;
}

export function formatDiagnostics(diagnostics: readonly Diagnostic[], host: FormatDiagnosticsHost): string {
    let output = "";
    for (const diagnostic of diagnostics) {
        const errorMessage = `${diagnosticCategoryName(diagnostic.category)} ${diagnosticPrefix(diagnostic)}${diagnostic.code}: ${flattenDiagnosticMessage(diagnostic, host.getNewLine())}${host.getNewLine()}`;
        if (diagnostic.fileName && diagnostic.startPosition) {
            const { line, character } = diagnostic.startPosition;
            output += `${relativeFileName(diagnostic.fileName, host)}(${line + 1},${character + 1}): ${errorMessage}`;
        }
        else {
            output += errorMessage;
        }
    }
    return output;
}

export function formatDiagnosticsWithColorAndContext(
    diagnostics: readonly Diagnostic[],
    host: FormatDiagnosticsHost,
): string {
    let output = "";
    for (const diagnostic of diagnostics) {
        if (diagnostic.fileName && diagnostic.startPosition) {
            output += formatLocation(diagnostic, host) + " - ";
        }
        output += formatColorAndReset(diagnosticCategoryName(diagnostic.category), getCategoryFormat(diagnostic.category));
        output += formatColorAndReset(` ${diagnosticPrefix(diagnostic)}${diagnostic.code}: `, foregroundColorEscapeGrey);
        output += flattenDiagnosticMessage(diagnostic, host.getNewLine());

        if (diagnostic.fileName && diagnostic.code !== fileAppearsToBeBinaryCode) {
            output += host.getNewLine();
            output += formatCodeSpan(diagnostic, "", getCategoryFormat(diagnostic.category), host);
        }

        if (diagnostic.relatedInformation?.length) {
            output += host.getNewLine();
            for (const related of diagnostic.relatedInformation) {
                if (related.fileName && related.startPosition) {
                    output += host.getNewLine();
                    output += halfIndent + formatLocation(related, host);
                    output += formatCodeSpan(related, indent, foregroundColorEscapeCyan, host);
                }
                output += host.getNewLine();
                output += indent + flattenDiagnosticMessage(related, host.getNewLine());
            }
        }
        output += host.getNewLine();
    }
    return output;
}
