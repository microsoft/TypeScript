/// <reference path="checker.ts"/>
/// <reference path="transform.ts" />
/// <reference path="declarationEmitter.ts"/>

/* @internal */
namespace ts {
    export interface SourceMapWriter {
        sourceMapData?: SourceMapData;
        setSourceFile(sourceFile: SourceFile): void;
        emitPos(pos: number, skipTrivia?: boolean): void;
        emitStart(range: TextRange): void;
        emitEnd(range: TextRange): void;
        pushScope(scopeDeclaration: Node, scopeName?: string): void;
        popScope(): void;
        getText(): string;
        getSourceMappingURL(): string;
    }

    let nop = <(...args: any[]) => any>Function.prototype;
    let nullSourceMapWriter: SourceMapWriter;

    export function getNullSourceMapWriter(): SourceMapWriter {
        if (nullSourceMapWriter === undefined) {
            nullSourceMapWriter = {
                setSourceFile: nop,
                emitStart: nop,
                emitEnd: nop,
                emitPos: nop,
                pushScope: nop,
                popScope: nop,
                getText: nop,
                getSourceMappingURL: nop
            };
        }

        return nullSourceMapWriter;
    }

    export function createSourceMapWriter(host: EmitHost, writer: EmitTextWriter, filePath: string, root?: SourceFile): SourceMapWriter {
        let compilerOptions = host.getCompilerOptions();
        let currentSourceFile: SourceFile;
        let sourceMapDir: string; // The directory in which sourcemap will be

        // Current source map file and its index in the sources list
        let sourceMapSourceIndex = -1;

        // Names and its index map
        let sourceMapNameIndexMap: Map<number> = {};
        let sourceMapNameIndices: number[] = [];

        // Last recorded and encoded spans
        let lastRecordedSourceMapSpan: SourceMapSpan;
        let lastEncodedSourceMapSpan: SourceMapSpan = {
            emittedLine: 1,
            emittedColumn: 1,
            sourceLine: 1,
            sourceColumn: 1,
            sourceIndex: 0
        };
        let lastEncodedNameIndex = 0;

        // Initialize source map data
        let sourceMapJsFile = getBaseFileName(normalizeSlashes(filePath));
        let sourceMapData: SourceMapData = {
            sourceMapFilePath: filePath + ".map",
            jsSourceMappingURL: sourceMapJsFile + ".map",
            sourceMapFile: sourceMapJsFile,
            sourceMapSourceRoot: compilerOptions.sourceRoot || "",
            sourceMapSources: [],
            inputSourceFileNames: [],
            sourceMapNames: [],
            sourceMapMappings: "",
            sourceMapSourcesContent: compilerOptions.inlineSources ? [] : undefined,
            sourceMapDecodedMappings: []
        };

        // Normalize source root and make sure it has trailing "/" so that it can be used to combine paths with the
        // relative paths of the sources list in the sourcemap
        sourceMapData.sourceMapSourceRoot = ts.normalizeSlashes(sourceMapData.sourceMapSourceRoot);
        if (sourceMapData.sourceMapSourceRoot.length && sourceMapData.sourceMapSourceRoot.charCodeAt(sourceMapData.sourceMapSourceRoot.length - 1) !== CharacterCodes.slash) {
            sourceMapData.sourceMapSourceRoot += directorySeparator;
        }

        if (compilerOptions.mapRoot) {
            sourceMapDir = normalizeSlashes(compilerOptions.mapRoot);
            if (root) { // emitting single module file
                // For modules or multiple emit files the mapRoot will have directory structure like the sources
                // So if src\a.ts and src\lib\b.ts are compiled together user would be moving the maps into mapRoot\a.js.map and mapRoot\lib\b.js.map
                sourceMapDir = getDirectoryPath(getSourceFilePathInNewDir(root, host, sourceMapDir));
            }

            if (!isRootedDiskPath(sourceMapDir) && !isUrl(sourceMapDir)) {
                // The relative paths are relative to the common directory
                sourceMapDir = combinePaths(host.getCommonSourceDirectory(), sourceMapDir);
                sourceMapData.jsSourceMappingURL = getRelativePathToDirectoryOrUrl(
                    getDirectoryPath(normalizePath(filePath)), // get the relative sourceMapDir path based on jsFilePath
                    combinePaths(sourceMapDir, sourceMapData.jsSourceMappingURL), // this is where user expects to see sourceMap
                    host.getCurrentDirectory(),
                    host.getCanonicalFileName,
                    /*isAbsolutePathAnUrl*/ true);
            }
            else {
                sourceMapData.jsSourceMappingURL = combinePaths(sourceMapDir, sourceMapData.jsSourceMappingURL);
            }
        }
        else {
            sourceMapDir = getDirectoryPath(normalizePath(filePath));
        }

        return {
            sourceMapData,
            setSourceFile: recordNewSourceFileStart,
            emitPos: recordSourceMapSpan,
            emitStart: recordEmitNodeStartSpan,
            emitEnd: recordEmitNodeEndSpan,
            pushScope: recordScopeNameOfNode,
            popScope: recordScopeNameEnd,
            getText,
            getSourceMappingURL,
        };

        function getSourceMapNameIndex() {
            return sourceMapNameIndices.length ? lastOrUndefined(sourceMapNameIndices) : -1;
        }

        // Encoding for sourcemap span
        function encodeLastRecordedSourceMapSpan() {
            if (!lastRecordedSourceMapSpan || lastRecordedSourceMapSpan === lastEncodedSourceMapSpan) {
                return;
            }

            let prevEncodedEmittedColumn = lastEncodedSourceMapSpan.emittedColumn;
            // Line/Comma delimiters
            if (lastEncodedSourceMapSpan.emittedLine === lastRecordedSourceMapSpan.emittedLine) {
                // Emit comma to separate the entry
                if (sourceMapData.sourceMapMappings) {
                    sourceMapData.sourceMapMappings += ",";
                }
            }
            else {
                // Emit line delimiters
                for (let encodedLine = lastEncodedSourceMapSpan.emittedLine; encodedLine < lastRecordedSourceMapSpan.emittedLine; encodedLine++) {
                    sourceMapData.sourceMapMappings += ";";
                }
                prevEncodedEmittedColumn = 1;
            }

            // 1. Relative Column 0 based
            sourceMapData.sourceMapMappings += base64VLQFormatEncode(lastRecordedSourceMapSpan.emittedColumn - prevEncodedEmittedColumn);

            // 2. Relative sourceIndex
            sourceMapData.sourceMapMappings += base64VLQFormatEncode(lastRecordedSourceMapSpan.sourceIndex - lastEncodedSourceMapSpan.sourceIndex);

            // 3. Relative sourceLine 0 based
            sourceMapData.sourceMapMappings += base64VLQFormatEncode(lastRecordedSourceMapSpan.sourceLine - lastEncodedSourceMapSpan.sourceLine);

            // 4. Relative sourceColumn 0 based
            sourceMapData.sourceMapMappings += base64VLQFormatEncode(lastRecordedSourceMapSpan.sourceColumn - lastEncodedSourceMapSpan.sourceColumn);

            // 5. Relative namePosition 0 based
            if (lastRecordedSourceMapSpan.nameIndex >= 0) {
                sourceMapData.sourceMapMappings += base64VLQFormatEncode(lastRecordedSourceMapSpan.nameIndex - lastEncodedNameIndex);
                lastEncodedNameIndex = lastRecordedSourceMapSpan.nameIndex;
            }

            lastEncodedSourceMapSpan = lastRecordedSourceMapSpan;
            sourceMapData.sourceMapDecodedMappings.push(lastEncodedSourceMapSpan);
        }

        function recordSourceMapSpan(pos: number, skipTrivia?: boolean) {
            if (pos === -1) {
                return;
            }

            if (skipTrivia) {
                pos = ts.skipTrivia(currentSourceFile.text, pos);
            }

            let sourceLinePos = getLineAndCharacterOfPosition(currentSourceFile, pos);

            // Convert the location to be one-based.
            sourceLinePos.line++;
            sourceLinePos.character++;

            let emittedLine = writer.getLine();
            let emittedColumn = writer.getColumn();

            // If this location wasn't recorded or the location in source is going backwards, record the span
            if (!lastRecordedSourceMapSpan ||
                lastRecordedSourceMapSpan.emittedLine !== emittedLine ||
                lastRecordedSourceMapSpan.emittedColumn !== emittedColumn ||
                (lastRecordedSourceMapSpan.sourceIndex === sourceMapSourceIndex &&
                    (lastRecordedSourceMapSpan.sourceLine > sourceLinePos.line ||
                        (lastRecordedSourceMapSpan.sourceLine === sourceLinePos.line && lastRecordedSourceMapSpan.sourceColumn > sourceLinePos.character)))) {

                // Encode the last recordedSpan before assigning new
                encodeLastRecordedSourceMapSpan();

                // New span
                lastRecordedSourceMapSpan = {
                    emittedLine: emittedLine,
                    emittedColumn: emittedColumn,
                    sourceLine: sourceLinePos.line,
                    sourceColumn: sourceLinePos.character,
                    nameIndex: getSourceMapNameIndex(),
                    sourceIndex: sourceMapSourceIndex
                };
            }
            else {
                // Take the new pos instead since there is no change in emittedLine and column since last location
                lastRecordedSourceMapSpan.sourceLine = sourceLinePos.line;
                lastRecordedSourceMapSpan.sourceColumn = sourceLinePos.character;
                lastRecordedSourceMapSpan.sourceIndex = sourceMapSourceIndex;
            }
        }

        function recordEmitNodeStartSpan(range: TextRange) {
            recordSourceMapSpan(range.pos, /*skipTrivia*/ true);
        }

        function recordEmitNodeEndSpan(range: TextRange) {
            recordSourceMapSpan(range.end, /*skipTrivia*/ false);
        }

        function recordNewSourceFileStart(sourceFile: SourceFile) {
            currentSourceFile = getOriginalNodeIf(sourceFile, isSourceFile);

            // Add the file to tsFilePaths
            // If sourceroot option: Use the relative path corresponding to the common directory path
            // otherwise source locations relative to map file location
            let sourcesDirectoryPath = compilerOptions.sourceRoot ? host.getCommonSourceDirectory() : sourceMapDir;

            let source = getRelativePathToDirectoryOrUrl(sourcesDirectoryPath,
                currentSourceFile.fileName,
                host.getCurrentDirectory(),
                host.getCanonicalFileName,
                /*isAbsolutePathAnUrl*/ true);

            sourceMapSourceIndex = indexOf(sourceMapData.sourceMapSources, source);
            if (sourceMapSourceIndex === -1) {
                sourceMapSourceIndex = sourceMapData.sourceMapSources.length;
                sourceMapData.sourceMapSources.push(source);

                // The one that can be used from program to get the actual source file
                sourceMapData.inputSourceFileNames.push(sourceFile.fileName);

                if (compilerOptions.inlineSources) {
                    sourceMapData.sourceMapSourcesContent.push(sourceFile.text);
                }
            }
        }

        function recordScopeNameIndex(scopeNameIndex: number) {
            sourceMapNameIndices.push(scopeNameIndex);
        }

        function recordScopeNameStart(scopeDeclaration: Node, scopeName: string) {
            let scopeNameIndex = -1;
            if (scopeName) {
                let parentIndex = getSourceMapNameIndex();
                if (parentIndex !== -1) {
                    // Child scopes are always shown with a dot (even if they have no name),
                    // unless it is a computed property. Then it is shown with brackets,
                    // but the brackets are included in the name.
                    let name = (<Declaration>scopeDeclaration).name;
                    if (!name || name.kind !== SyntaxKind.ComputedPropertyName) {
                        scopeName = "." + scopeName;
                    }
                    scopeName = sourceMapData.sourceMapNames[parentIndex] + scopeName;
                }

                scopeNameIndex = getProperty(sourceMapNameIndexMap, scopeName);
                if (scopeNameIndex === undefined) {
                    scopeNameIndex = sourceMapData.sourceMapNames.length;
                    sourceMapData.sourceMapNames.push(scopeName);
                    sourceMapNameIndexMap[scopeName] = scopeNameIndex;
                }
            }
            recordScopeNameIndex(scopeNameIndex);
        }

        function recordScopeNameOfNode(scopeDeclaration: Node, scopeName?: string) {
            if (scopeName) {
                // The scope was already given a name use it
                recordScopeNameStart(scopeDeclaration, scopeName);
            }
            else if (scopeDeclaration.kind === SyntaxKind.FunctionDeclaration ||
                scopeDeclaration.kind === SyntaxKind.FunctionExpression ||
                scopeDeclaration.kind === SyntaxKind.MethodDeclaration ||
                scopeDeclaration.kind === SyntaxKind.MethodSignature ||
                scopeDeclaration.kind === SyntaxKind.GetAccessor ||
                scopeDeclaration.kind === SyntaxKind.SetAccessor ||
                scopeDeclaration.kind === SyntaxKind.ModuleDeclaration ||
                scopeDeclaration.kind === SyntaxKind.ClassDeclaration ||
                scopeDeclaration.kind === SyntaxKind.EnumDeclaration) {
                // Declaration and has associated name use it
                if ((<Declaration>scopeDeclaration).name) {
                    let name = (<Declaration>scopeDeclaration).name;
                    // For computed property names, the text will include the brackets
                    scopeName = name.kind === SyntaxKind.ComputedPropertyName
                        ? getTextOfNode(name)
                        : (<Identifier>(<Declaration>scopeDeclaration).name).text;
                }

                recordScopeNameStart(scopeDeclaration, scopeName);
            }
            else {
                // Block just use the name from upper level scope
                recordScopeNameIndex(getSourceMapNameIndex());
            }
        }

        function recordScopeNameEnd() {
            sourceMapNameIndices.pop();
        }

        function getText() {
            encodeLastRecordedSourceMapSpan();

            return stringify({
                version: 3,
                file: sourceMapData.sourceMapFile,
                sourceRoot: sourceMapData.sourceMapSourceRoot,
                sources: sourceMapData.sourceMapSources,
                sourcesContent: sourceMapData.sourceMapSourcesContent,
                names: sourceMapData.sourceMapNames,
                mappings: sourceMapData.sourceMapMappings
            });
        }

        function getSourceMappingURL() {
            if (compilerOptions.inlineSourceMap) {
                // Encode the sourceMap into the sourceMap url
                let base64SourceMapText = convertToBase64(getText());
                return `data:application/json;base64,${base64SourceMapText}`;
            }
            else {
                return sourceMapData.jsSourceMappingURL;
            }
        }
    }

    const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

    function base64FormatEncode(inValue: number) {
        if (inValue < 64) {
            return base64Chars.charAt(inValue);
        }

        throw TypeError(inValue + ": not a 64 based value");
    }

    function base64VLQFormatEncode(inValue: number) {
        // Add a new least significant bit that has the sign of the value.
        // if negative number the least significant bit that gets added to the number has value 1
        // else least significant bit value that gets added is 0
        // eg. -1 changes to binary : 01 [1] => 3
        //     +1 changes to binary : 01 [0] => 2
        if (inValue < 0) {
            inValue = ((-inValue) << 1) + 1;
        }
        else {
            inValue = inValue << 1;
        }

        // Encode 5 bits at a time starting from least significant bits
        let encodedStr = "";
        do {
            let currentDigit = inValue & 31; // 11111
            inValue = inValue >> 5;
            if (inValue > 0) {
                // There are still more digits to decode, set the msb (6th bit)
                currentDigit = currentDigit | 32;
            }
            encodedStr = encodedStr + base64FormatEncode(currentDigit);
        } while (inValue > 0);

        return encodedStr;
    }

    var stringify = JSON && JSON.stringify ? JSON.stringify : function stringify(value: any): string {
        return value == null ? "null"
             : typeof value === "string" ? `"${escapeString(value)}"`
             : typeof value === "number" ? String(value)
             : typeof value === "boolean" ? value ? "true" : "false"
             : hasToJson(value) ? stringify(value.toJSON())
             : isArray(value) ? `[${reduceLeft(value, stringifyElement, "")}]`
             : typeof value === "object" ? `{${reduceProperties(value, stringifyProperty, "")}}`
             : "null";
    }

    function hasToJson(value: any) {
        return typeof value === "object" && typeof value.toJSON === "function";
    }

    function stringifyElement(memo: string, value: any) {
        return (memo ? memo + "," : memo) + stringify(value);
    }

    function stringifyProperty(memo: string, value: any, key: string) {
        return value === undefined ? memo
             : (memo ? memo + "," : memo) + `"${escapeString(key)}":${stringify(value)}`;
    }
}