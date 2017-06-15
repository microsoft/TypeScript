import * as ts from "../api";
import * as vpath from "../vpath";
import { TextDocument } from "../documents";
import { TextWriter } from "../textWriter";
import { isDefaultLibraryFile, repeatString, isBuiltFile, splitLines, compareValues, removeTestPathPrefixes, getLinesAndLineStarts } from "../utils";
import { assert } from "chai";
import { CompilationResult } from "../compiler";

function compareDiagnostics(a: ts.Diagnostic, b: ts.Diagnostic) {
    if (a.file && b.file) {
        return compareValues(!isDefaultLibraryFile(a.file.fileName), !isDefaultLibraryFile(b.file.fileName))
            || ts.compareDiagnostics(a, b);
    }
    return ts.compareDiagnostics(a, b);
}

export function formatDiagnostics(documents: TextDocument[], result: CompilationResult) {
    const diagnostics = result.diagnostics;
    diagnostics.sort(compareDiagnostics);

    let numNonLibraryDiagnostics = 0;
    let numLibraryDiagnostics = 0;
    let numTest262HarnessDiagnostics = 0;

    const writer = new TextWriter(removeTestPathPrefixes(ts.formatDiagnostics(diagnostics, {
        getCanonicalFileName: path => path,
        getCurrentDirectory: () => "",
        getNewLine: () => "\r\n"
    })));

    writer.writeln();

    // write global diagnostics first
    for (const diagnostic of diagnostics) {
        if (!diagnostic.file) {
            writeDiagnostic(diagnostic);
        }
        else if (isDefaultLibraryFile(diagnostic.file.fileName) || isBuiltFile(diagnostic.file.fileName)) {
            numLibraryDiagnostics++;
        }
        else if (diagnostic.file.fileName.includes("test262-harness")) {
            numTest262HarnessDiagnostics++;
        }
    }

    // write file diagnostics
    for (const document of documents) {
        const path = vpath.resolve(result.vfs.currentDirectory, document.file);
        const fileDiagnostics = diagnostics.filter(diagnostic => {
            const file = diagnostic.file;
            return file !== undefined && result.vfs.sameName(file.fileName, path);
        });

        writer.writeln().write(`==== ${document.file} (${fileDiagnostics.length} errors) ====`);
        let numMarkedDiagnostics = 0;

        // For each line, emit the line followed by any error squiggles matching this line
        const { lines, lineStarts } = getLinesAndLineStarts(document.text);
        for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
            const line = lines[lineIndex];
            const thisLineStart = lineStarts[lineIndex];
            const nextLineStart = lineIndex === lines.length - 1 ? document.text.length : lineStarts[lineIndex + 1];
            // Emit this line from the original file
            writer.writeln().write(`    ${line}`);
            for (const diagnostic of fileDiagnostics) {
                if (diagnostic.start === undefined || diagnostic.length === undefined) continue;
                const end = diagnostic.start + diagnostic.length;
                // Does any error start or continue on to this line? Emit squiggles
                if (end >= thisLineStart && (diagnostic.start < nextLineStart || lineIndex === lines.length - 1)) {
                    // How many characters from the start of this line the error starts at (could be positive or negative)
                    const relativeOffset = diagnostic.start - thisLineStart;
                    // How many characters of the error are on this line (might be longer than this line in reality)
                    const length = diagnostic.length - Math.max(0, thisLineStart - diagnostic.start);
                    // Calculate the start of the squiggle
                    const squiggleStart = Math.max(0, relativeOffset);
                    const squiggleLength = Math.min(length, line.length - squiggleStart);
                    const prefix = line.slice(0, squiggleStart).replace(/\S/g, " ");
                    const squiggle = repeatString("~", squiggleLength);
                    writer.writeln().write(`    ${prefix}${squiggle}`);

                    // If the error ended here, or we're at the end of the file, emit its message
                    if ((lineIndex === lines.length - 1) || nextLineStart > end) {
                        writeDiagnostic(diagnostic);
                        numMarkedDiagnostics++;
                    }
                }
            }
        }

        assert.lengthOf(fileDiagnostics, numMarkedDiagnostics, `Incorrect number of marked errors in ${document.file}`);
    }

    assert.lengthOf(diagnostics, numNonLibraryDiagnostics + numLibraryDiagnostics + numTest262HarnessDiagnostics, "total number of errors");
    return writer.toString();

    function writeDiagnostic(diagnostic: ts.Diagnostic) {
        writer.writeln().write(formatDiagnostic(/*ts,*/ diagnostic));
        if (!diagnostic.file || !isDefaultLibraryFile(diagnostic.file.fileName)) {
            numNonLibraryDiagnostics++;
        }
    }
}

function formatDiagnostic(diagnostic: ts.Diagnostic) {
    const category = ts.DiagnosticCategory[diagnostic.category];
    return splitLines(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\r\n"), /*removeEmptyElements*/ true)
        .map(line => `!!! ${category ? category.toLowerCase() : ""} TS${diagnostic.code}: ${line}`)
        .join("\r\n")
        .replace(/\/\.test\//g, "");
}