import * as ts from "../api";
import * as vpath from "../vpath";
import { TextDocument, isTypeScriptDocument, isJavaScriptDocument } from "../documents";
import { TextWriter } from "../textWriter";
import { splitLines, removeTestPathPrefixes } from "../utils";

const leadingOrTrailingBraceRegExp = /^\s*[{}]\s*$/;
export function formatSymbols(documents: TextDocument[], typesAndSymbols: Map<string, ts.TypesAndSymbols[]>) {
    const writer = new TextWriter();
    for (const document of documents) {
        if (!isTypeScriptDocument(document) && !isJavaScriptDocument(document)) continue;
        writer.writeln(`=== ${document.file} ===`);
        const results = typesAndSymbols.get(document.file);
        let lineMap: Map<number, string[]> | undefined;
        if (results) {
            for (const result of results) {
                if (!result.symbol) continue;
                if (!lineMap) lineMap = new Map<number, string[]>();
                let lineInfo = lineMap.get(result.line);
                if (!lineInfo) lineMap.set(result.line, lineInfo = []);
                lineInfo.push(result.text.replace(/\r\n?|\n/g, "") + " : " + formatSymbol(result.symbol, result.declarations));
            }
        }
        // TODO(rbuckton): We should consider switching to the following commented code below
        // to address the FIXME immediately below.
        // if (!lineMap) {
        //     writer.writeln("No symbol information for this code.");
        //     continue;
        // }
        const lines = splitLines(document.text);
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            writer.writeln(line);
            if (!lineMap) {
                // FIXME(rbuckton): The old harness writes this over and over. We may want to prefer the 
                // commented version above instead.
                writer.write("No type information for this code.");
                continue;
            }
            const lineInfo = lineMap.get(i);
            if (lineInfo) {
                for (const symbol of lineInfo) {
                    writer.writeln(`>${removeTestPathPrefixes(symbol)}`);
                }
                const nextLine = i < lines.length - 1 ? lines[i + 1] : undefined;
                if (nextLine === undefined || (!leadingOrTrailingBraceRegExp.test(nextLine) && nextLine.trim())) {
                    writer.writeln();
                }
            }
        }
    }
    return writer.toString();
}

function formatSymbol(symbol: string, declarations: { fileName: string, line: number, character: number }[] | undefined) {
    const writer = new TextWriter();
    writer.write("Symbol(");
    writer.write(symbol);
    if (declarations) {
        for (const decl of declarations) {
            const basename = vpath.basename(decl.fileName);
            // FIXME(rbuckton): The following incorrectly catches `tslib.d.ts`. We should consider 
            // switching to the commented line below.
            const isLibFile = /lib(.*)\.d\.ts/i.test(basename);
            // const isLibFile = isDefaultLibraryFile(basename);
            writer.write(`, Decl(${basename}, ${isLibFile ? "--" : decl.line}, ${isLibFile ? "--" : decl.character})`);
        }
    }
    writer.write(")");
    return writer.toString();
}