import * as vpath from "../vpath";
import { TextDocument } from "../documents";
import { TextWriter } from "../textWriter";
import { CompilationResult } from "../compiler";
import { formatDiagnostics } from "./diagnostics";

export function formatJavaScript(header: string, fullEmitPaths: boolean, documents: TextDocument[], result: CompilationResult, declarationDocuments: TextDocument[] | undefined, declarationResult: CompilationResult | undefined) {
    const writer = new TextWriter();

    // add header if needed
    if (documents.length > 1) writer.writeln(`//// [${header}] ////`);

    // add each input document
    for (const document of documents) {
        if (writer.size > 0) writer.writeln();
        writer.writeln(`//// [${vpath.basename(document.file)}]`);
        writer.write(document.text);
    }

    // add space between ts and js/dts emit
    if (result.js.size > 0 || result.dts.size > 0 || (declarationResult && declarationResult.diagnostics.length > 0)) {
        writer.writeln();
        writer.writeln();
    }

    // add each script output
    result.js.forEach(document => {
        const file = fullEmitPaths ? document.file : vpath.basename(document.file);
        writer.writeln(`//// [${file}]`);
        writer.write(document.text);
    });

    // Add space between js and dts emit
    if (result.js.size > 0 && result.dts.size > 0) {
        writer.writeln();
        writer.writeln();
    }

    // add each declaration output
    result.dts.forEach(document => {
        const file = fullEmitPaths ? document.file : vpath.basename(document.file);
        writer.writeln(`//// [${file}]`);
        writer.write(document.text);
    });

    // add declaration diagnostics
    if (declarationDocuments && declarationResult && declarationResult.diagnostics.length > 0) {
        writer.writeln();
        writer.writeln();
        writer.writeln(`//// [DtsFileErrors]`);
        writer.writeln();
        writer.writeln();
        writer.write(formatDiagnostics(declarationDocuments, declarationResult));
    }

    return writer.toString();
}