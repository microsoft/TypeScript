import * as vpath from "../vpath";
import { assert } from "chai";
import { TextWriter } from "../textWriter";
import { CompilationResult } from "../compiler";
import { SourceMap, Mapping } from "../sourceMaps";
import { TextDocument } from "../documents";
import { computeLineStarts, padRight, repeatString } from "../utils";

export function formatSourceMapData(result: CompilationResult) {
    const writer = new TextWriter();
    result.js.forEach(emittedDocument => {
        const sourceMap = result.getSourceMap(emittedDocument.file);
        if (sourceMap) {
            writer.writeln("===================================================================");
            writer.writeln("JsFile: " + vpath.basename(emittedDocument.file));
            const mapUrl = !result.options.inlineSourceMap ? SourceMap.getUrl(emittedDocument.text) : undefined;
            writer.writeln("mapUrl: " + mapUrl);
            writer.writeln("sourceRoot: " + sourceMap.sourceMap.sourceRoot);
            writer.writeln("sources: " + sourceMap.sourceMap.sources);
            if (sourceMap.sourceMap.sourcesContent) {
                writer.writeln("sourcesContent: " + JSON.stringify(sourceMap.sourceMap.sourcesContent));
            }
            writer.writeln("===================================================================");
            
            const sources = sourceMap.sources.map(source => {
                const file = vpath.combine(result.vfs.currentDirectory, result.commonSourceDirectory, source.file);
                const document = result.getInput(file)!;
                assert.isDefined(document);
                const lineStarts = computeLineStarts(document.text);
                return { document, lineStarts };
            });

            const emittedLineStarts = emittedDocument.lineStarts;
            for (let i = 0; i < emittedLineStarts.length; i++) {
                const lineStart = emittedLineStarts[i];
                const lineEnd = i < emittedLineStarts.length - 1 ? emittedLineStarts[i + 1] : emittedDocument.text.length;
                const line = emittedDocument.text.slice(lineStart, lineEnd);
                writer.write(`>>>${line}`);

                const mappings = sourceMap.getMappingsForEmittedLine(i);
                if (mappings) {
                    let column = 0;
                    for (let i = 0; i < mappings.length; i++) {
                        const mapping = mappings[i];
                        writer.write(`${padRight("" + (i + 1), 2)}>`);
                        writer.write(repeatString(" ", column));
                        writer.write(repeatString("^", mapping.emittedColumn - column));
                        writer.writeln();
                        column = mapping.emittedColumn;
                    }
                    
                    column = 0;
                    let sourceColumn = 0;
                    for (let i = 0; i < mappings.length; i++) {
                        const mapping = mappings[i];
                        const source = sources[mapping.sourceIndex];
                        const sourceLineStart = source.lineStarts[mapping.sourceLine];
                        const sourceLineEnd = mapping.sourceLine < source.lineStarts.length - 1 ? source.lineStarts[mapping.sourceLine + 1] : source.document.text.length;
                        const sourceLine = source.document.text.slice(sourceLineStart, sourceLineEnd);
                        writer.write(`${padRight("" + (i + 1), 2)}>`);
                        writer.write(repeatString(" ", column));
                        writer.write(sourceLine.slice(sourceColumn, mapping.sourceColumn));
                        writer.writeln();
                        sourceColumn = mapping.sourceColumn;
                        column = mapping.emittedColumn;
                    }

                    column = 0;
                    for (let i = 0; i < mappings.length; i++) {
                        const mapping = mappings[i];
                        writer.write(`${padRight("" + (i + 1), 2)}>`);
                        writer.write(`Emitted(${mapping.emittedLine + 1}, ${mapping.emittedColumn + 1}) Source(${mapping.sourceLine + 1}, ${mapping.sourceColumn + 1}) + SourceIndex(${mapping.sourceIndex})`);
                        if (mapping.name) {
                            writer.write(` name (${mapping.name})`);
                        }
                        else if (mapping.nameIndex !== undefined) {
                            writer.write(` nameIndex (${mapping.nameIndex})`);
                        }
                        writer.writeln();
                        column = mapping.emittedColumn;
                    }
                }
                // if (mappings && mappings.length) {
                //     for (const mapping of mappings) {
                //         if (mapping.sourceIndex !== currentSourceIndex) {
                //             const file = vpath.combine(result.vfs.currentDirectory, result.commonSourceDirectory, mapping.source.file);
                //             const source = result.getInput(file)!;
                //             assert.isDefined(source);
                //             writer.writeln("-------------------------------------------------------------------");
                //             writer.writeln("emittedFile:" + document.file);
                //             writer.writeln("sourceFile:" + mapping.source.file);
                //             writer.writeln("-------------------------------------------------------------------");
                //             currentSource = source;
                //             currentSourceIndex = mapping.sourceIndex;
                //             hasEmittedMappings = true;
                //         }
                //     }
                // }
                // if (hasEmittedMappings) {
                //     while (lastEmittedLine < i) {
                //         const lineStart = emittedLineStarts[lastEmittedLine];
                //         const lineEnd = lastEmittedLine < emittedLineStarts.length - 1 ? emittedLineStarts[lastEmittedLine + 1] : document.text.length;
                //         const line = document.text.slice(lineStart, lineEnd);
                //         writer.write(`>>>${line}`);
                //         lastEmittedLine++;
                //     }
                // }
            }
        }
    });

    return writer.toString();
}

export function formatSourceMaps(fullEmitPaths: boolean, result: CompilationResult) {
    const writer = new TextWriter();
    result.maps.forEach(document => {
        const file = fullEmitPaths ? document.file : vpath.basename(document.file);
        writer.writeln(`//// [${file}]`);
        writer.write(document.text);
    });
    return writer.toString();
}