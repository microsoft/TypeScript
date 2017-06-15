import * as ts from "../api";
import { TextDocument, isTypeScriptDocument, isJavaScriptDocument } from "../documents";
import { TextWriter } from "../textWriter";
import { splitLines, removeTestPathPrefixes } from "../utils";
import { assert } from "chai";

const leadingOrTrailingBraceRegExp = /^\s*[{}]\s*$/;
export function formatTypes(documents: TextDocument[], typesAndSymbols: Map<string, ts.TypesAndSymbols[]>) {
    const writer = new TextWriter();
    for (const document of documents) {
        if (!isTypeScriptDocument(document) && !isJavaScriptDocument(document)) continue;
        writer.writeln(`=== ${document.file} ===`);
        const results = typesAndSymbols.get(document.file);
        let lineMap: Map<number, string[]> | undefined;
        if (results) {
            for (const result of results) {
                assert.isDefined(result.type, "type doesn't exist");
                if (!lineMap) lineMap = new Map<number, string[]>();
                let lineInfo = lineMap.get(result.line);
                if (!lineInfo) lineMap.set(result.line, lineInfo = []);
                lineInfo.push(result.text.replace(/\r\n?|\n/g, "") + " : " + result.type);
            }
        }
        // TODO(rbuckton): We should consider switching to the following commented code below
        // to address the FIXME immediately below.
        // if (!lineMap) {
        //     writer.writeln("No type information for this code.");
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
                for (const type of lineInfo) {
                    writer.writeln(`>${removeTestPathPrefixes(type)}`);
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