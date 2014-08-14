/// <reference path="types.ts"/>
/// <reference path="core.ts"/>
/// <reference path="scanner.ts"/>
/// <reference path="parser.ts"/>

module ts {
    interface EmitTextWriter extends TextWriter {
        writeLiteral(s: string): void;
        getTextPos(): number;
        getLine(): number;
        getColumn(): number;
        getIndent(): number;
        isLineStart(): boolean;
    }

    var indentStrings: string[] = [];
    function getIndentString(level: number) {
        return indentStrings[level] || (indentStrings[level] = level === 0 ? "" : getIndentString(level - 1) + "    ");
    }

    export function emitFiles(resolver: EmitResolver): EmitResult {
        var program = resolver.getProgram();
        var compilerHost = program.getCompilerHost();
        var compilerOptions = program.getCompilerOptions();
        var sourceMapDataList: SourceMapData[] = compilerOptions.sourceMap ? [] : undefined;
        var diagnostics: Diagnostic[] = [];
        var newLine = program.getCompilerHost().getNewLine();

        function getSourceFilePathInNewDir(newDirPath: string, sourceFile: SourceFile) {
            var sourceFilePath = getNormalizedPathFromPathCompoments(getNormalizedPathComponents(sourceFile.filename, compilerHost.getCurrentDirectory()));
            sourceFilePath = sourceFilePath.replace(program.getCommonSourceDirectory(), "");
            return combinePaths(newDirPath, sourceFilePath);
        }

        function shouldEmitToOwnFile(sourceFile: SourceFile) {
            if (!(sourceFile.flags & NodeFlags.DeclarationFile)) {
                if ((isExternalModule(sourceFile) || !compilerOptions.out) && !fileExtensionIs(sourceFile.filename, ".js")) {
                    return true;
                }
            }
        }

        function getOwnEmitOutputFilePath(sourceFile: SourceFile, extension: string) {
            if (program.getCompilerOptions().outDir) {
                var emitOutputFilePathWithoutExtension = getModuleNameFromFilename(getSourceFilePathInNewDir(program.getCompilerOptions().outDir, sourceFile));
            }
            else {
                var emitOutputFilePathWithoutExtension = getModuleNameFromFilename(sourceFile.filename);
            }

            return emitOutputFilePathWithoutExtension + extension;
        }

        function isExternalModuleOrDeclarationFile(sourceFile: SourceFile) {
            return isExternalModule(sourceFile) || (sourceFile.flags & NodeFlags.DeclarationFile) !== 0;
        }

        function getFirstConstructorWithBody(node: ClassDeclaration): ConstructorDeclaration {
            return forEach(node.members, member => {
                if (member.kind === SyntaxKind.Constructor && (<ConstructorDeclaration>member).body) {
                    return <ConstructorDeclaration>member;
                }
            });
        }

        function getAllAccessorDeclarations(node: ClassDeclaration, accessor: AccessorDeclaration) {
            var firstAccessor: AccessorDeclaration;
            var getAccessor: AccessorDeclaration;
            var setAccessor: AccessorDeclaration;
            forEach(node.members, (member: Declaration) => {
                if ((member.kind === SyntaxKind.GetAccessor || member.kind === SyntaxKind.SetAccessor) &&
                    member.name.text === accessor.name.text &&
                    (member.flags & NodeFlags.Static) === (accessor.flags & NodeFlags.Static)) {
                    if (!firstAccessor) {
                        firstAccessor = <AccessorDeclaration>member;
                    }

                    if (member.kind === SyntaxKind.GetAccessor && !getAccessor) {
                        getAccessor = <AccessorDeclaration>member;
                    }

                    if (member.kind === SyntaxKind.SetAccessor && !setAccessor) {
                        setAccessor = <AccessorDeclaration>member;
                    }
                }
            });
            return {
                firstAccessor: firstAccessor,
                getAccessor: getAccessor,
                setAccessor: setAccessor
            };
        }

        function createTextWriter(writeSymbol: (symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags)=> void): EmitTextWriter {
            var output = "";
            var indent = 0;
            var lineStart = true;
            var lineCount = 0;
            var linePos = 0;

            function write(s: string) {
                if (s && s.length) {
                    if (lineStart) {
                        output += getIndentString(indent);
                        lineStart = false;
                    }
                    output += s;
                }
            }

            function writeLiteral(s: string) {
                if (s && s.length) {
                    write(s);
                    var pos = 0;
                    while (pos < s.length) {
                        switch (s.charCodeAt(pos++)) {
                            case CharacterCodes.carriageReturn:
                                if (pos < s.length && s.charCodeAt(pos) === CharacterCodes.lineFeed) {
                                    pos++;
                                }
                            case CharacterCodes.lineFeed:
                                lineCount++;
                                linePos = output.length - s.length + pos;
                                break;
                        }
                    }
                }
            }

            function writeLine() {
                if (!lineStart) {
                    output += newLine;
                    lineCount++;
                    linePos = output.length;
                    lineStart = true;
                }
            }

            return {
                write: write,
                writeSymbol: writeSymbol,
                writeLiteral: writeLiteral,
                writeLine: writeLine,
                increaseIndent: () => indent++,
                decreaseIndent: () => indent--,
                getIndent: () => indent,
                getTextPos: () => output.length,
                getLine: () => lineCount + 1,
                getColumn: () => lineStart ? indent * 4 + 1 : output.length - linePos + 1,
                getText: () => output,
                isLineStart: () => lineStart
            };
        }

        // Get source text of node in the current source file. Unlike getSourceTextOfNode this function
        // doesn't walk the parent chain to find the containing source file, rather it assumes the node is
        // in the source file currently being processed.
        var currentSourceFile: SourceFile;
        function getSourceTextOfLocalNode(node: Node): string {
            var text = currentSourceFile.text;
            return text.substring(skipTrivia(text, node.pos), node.end);
        }

        function writeFile(filename: string, data: string, writeByteOrderMark: boolean) {
            compilerHost.writeFile(filename, data, writeByteOrderMark, hostErrorMessage => {
                diagnostics.push(createCompilerDiagnostic(Diagnostics.Could_not_write_file_0_Colon_1, filename, hostErrorMessage));
            });
        }

        function emitComments(comments: Comment[], writer: EmitTextWriter, writeComment: (comment: Comment, writer: EmitTextWriter) => void) {
            forEach(comments, comment => {
                writeComment(comment, writer);
                if (comment.hasTrailingNewLine) {
                    writer.writeLine();
                } else {
                    writer.write(" ");
                }
            });
        }

        function writeCommentRange(comment: Comment, writer: EmitTextWriter) {
            writer.writeLiteral(currentSourceFile.text.substring(comment.pos, comment.end));
        }

        function emitJavaScript(jsFilePath: string, root?: SourceFile) {
            var writer = createTextWriter(writeSymbol);
            var write = writer.write;
            var writeLine = writer.writeLine;
            var increaseIndent = writer.increaseIndent;
            var decreaseIndent = writer.decreaseIndent;

            var extendsEmitted = false;

            /** write emitted output to disk*/
            var writeEmittedFiles = writeJavaScriptFile;

            /** Emit leading comments of the declaration */
            var emitLeadingComments = compilerOptions.removeComments ? function (declaration: Declaration) {
            } : emitLeadingDeclarationComments;

            /** Emit Trailing comments of the declaration */
            var emitTrailingComments = compilerOptions.removeComments ? function (declaration: Declaration) {
            } : emitTrailingDeclarationComments;

            var writeComment = writeCommentRange;

            /** Emit a node */
            var emit = emitNode;

            /** Called just before starting emit of a node */
            var emitStart = function (node: Node) { };

            /** Called once the emit of the node is done */
            var emitEnd = function (node: Node) { };

            /** Emit the text for the given token that comes after startPos
              * This by default writes the text provided with the given tokenKind 
              * but if optional emitFn callback is provided the text is emitted using the callback instead of default text
              * @param tokenKind the kind of the token to search and emit
              * @param startPos the position in the source to start searching for the token
              * @param emitFn if given will be invoked to emit the text instead of actual token emit */
            var emitToken = emitTokenText;

            /** Called to notify start of new source file emit */
            var emitNewSourceFileStart = function (node: SourceFile) { }

            /** Called to before starting the lexical scopes as in function/class in the emitted code because of node
              * @param scopeDeclaration node that starts the lexical scope
              * @param scopeName Optional name of this scope instead of deducing one from the declaration node */
            var scopeEmitStart = function (scopeDeclaration: Node, scopeName?: string) { }

            /** Called after coming out of the scope */
            var scopeEmitEnd = function () { }

            /** Sourcemap data that will get encoded */
            var sourceMapData: SourceMapData;

            function writeSymbol(symbol: Symbol, enclosingDeclaration: Node, meaning: SymbolFlags) { }

            function initializeEmitterWithSourceMaps() {
                var sourceMapDir: string; // The directory in which sourcemap will be

                // Current source map file and its index in the sources list
                var sourceMapSourceIndex = -1;

                // Names and its index map
                var sourceMapNameIndexMap: Map<number> = {};
                var sourceMapNameIndices: number[] = [];
                function getSourceMapNameIndex() {
                    return sourceMapNameIndices.length ? sourceMapNameIndices[sourceMapNameIndices.length - 1] : -1;
                }

                // Last recorded and encoded spans
                var lastRecordedSourceMapSpan: SourceMapSpan;
                var lastEncodedSourceMapSpan: SourceMapSpan = {
                    emittedLine: 1,
                    emittedColumn: 1,
                    sourceLine: 1,
                    sourceColumn: 1,
                    sourceIndex: 0
                };
                var lastEncodedNameIndex = 0;

                // Encoding for sourcemap span
                function encodeLastRecordedSourceMapSpan() {
                    if (!lastRecordedSourceMapSpan || lastRecordedSourceMapSpan === lastEncodedSourceMapSpan) {
                        return;
                    }

                    var prevEncodedEmittedColumn = lastEncodedSourceMapSpan.emittedColumn;
                    // Line/Comma deliminators
                    if (lastEncodedSourceMapSpan.emittedLine == lastRecordedSourceMapSpan.emittedLine) {
                        // Emit comma to separate the entry
                        if (sourceMapData.sourceMapMappings) {
                            sourceMapData.sourceMapMappings += ",";
                        }
                    }
                    else {
                        // Emit line deliminators
                        for (var encodedLine = lastEncodedSourceMapSpan.emittedLine; encodedLine < lastRecordedSourceMapSpan.emittedLine; encodedLine++) {
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

                    function base64VLQFormatEncode(inValue: number) {
                        function base64FormatEncode(inValue: number) {
                            if (inValue < 64) {
                                return 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(inValue);
                            }
                            throw TypeError(inValue + ": not a 64 based value");
                        }

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
                        var encodedStr = "";
                        do {
                            var currentDigit = inValue & 31; // 11111
                            inValue = inValue >> 5;
                            if (inValue > 0) {
                                // There are still more digits to decode, set the msb (6th bit)
                                currentDigit = currentDigit | 32;
                            }
                            encodedStr = encodedStr + base64FormatEncode(currentDigit);
                        } while (inValue > 0);

                        return encodedStr;
                    }
                }

                function recordSourceMapSpan(pos: number) {
                    var sourceLinePos = currentSourceFile.getLineAndCharacterFromPosition(pos);
                    var emittedLine = writer.getLine();
                    var emittedColumn = writer.getColumn();

                    // If this location wasnt recorded or the location in source is going backwards, record the span
                    if (!lastRecordedSourceMapSpan ||
                        lastRecordedSourceMapSpan.emittedLine != emittedLine ||
                        lastRecordedSourceMapSpan.emittedColumn != emittedColumn ||
                        lastRecordedSourceMapSpan.sourceLine > sourceLinePos.line ||
                        (lastRecordedSourceMapSpan.sourceLine === sourceLinePos.line && lastRecordedSourceMapSpan.sourceColumn > sourceLinePos.character)) {
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
                    }
                }

                function recordEmitNodeStartSpan(node: Node) {
                    // Get the token pos after skipping to the token (ignoring the leading trivia)
                    recordSourceMapSpan(ts.getTokenPosOfNode(node));
                }

                function recordEmitNodeEndSpan(node: Node) {
                    recordSourceMapSpan(node.end);
                }

                function writeTextWithSpanRecord(tokenKind: SyntaxKind, startPos: number, emitFn?: () => void) {
                    var tokenStartPos = ts.skipTrivia(currentSourceFile.text, startPos);
                    recordSourceMapSpan(tokenStartPos);
                    var tokenEndPos = emitTokenText(tokenKind, tokenStartPos, emitFn);
                    recordSourceMapSpan(tokenEndPos);
                    return tokenEndPos;
                }

                function recordNewSourceFileStart(node: SourceFile) {
                    // Add the the file to tsFilePaths
                    // If sourceroot option: Use the relative path corresponding to the common directory path 
                    // otherwise source locations relative to map file location
                    var sourcesDirectoryPath = compilerOptions.sourceRoot ? program.getCommonSourceDirectory() : sourceMapDir;

                    sourceMapData.sourceMapSources.push(getRelativePathToDirectoryOrUrl(sourcesDirectoryPath,
                        node.filename,
                        compilerHost.getCurrentDirectory(),
                    /*isAbsolutePathAnUrl*/ true));
                    sourceMapSourceIndex = sourceMapData.sourceMapSources.length - 1;

                    // The one that can be used from program to get the actual source file
                    sourceMapData.inputSourceFileNames.push(node.filename);
                }

                function recordScopeNameOfNode(node: Node, scopeName?: string) {
                    function recordScopeNameIndex(scopeNameIndex: number) {
                        sourceMapNameIndices.push(scopeNameIndex);
                    }

                    function recordScopeNameStart(scopeName: string) {
                        var scopeNameIndex = -1;
                        if (scopeName) {
                            var parentIndex = getSourceMapNameIndex();
                            if (parentIndex !== -1) {
                                scopeName = sourceMapData.sourceMapNames[parentIndex] + "." + scopeName;
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

                    if (scopeName) {
                        // The scope was already given a name  use it
                        recordScopeNameStart(scopeName);
                    }
                    else if (node.kind === SyntaxKind.FunctionDeclaration ||
                        node.kind === SyntaxKind.FunctionExpression ||
                        node.kind === SyntaxKind.Method ||
                        node.kind === SyntaxKind.GetAccessor ||
                        node.kind === SyntaxKind.SetAccessor ||
                        node.kind === SyntaxKind.ModuleDeclaration ||
                        node.kind === SyntaxKind.ClassDeclaration ||
                        node.kind === SyntaxKind.EnumDeclaration) {
                        // Declaration and has associated name use it
                        if ((<Declaration>node).name) {
                            scopeName = (<Declaration>node).name.text;
                        }
                        recordScopeNameStart(scopeName);
                    }
                    else {
                        // Block just use the name from upper level scope
                        recordScopeNameIndex(getSourceMapNameIndex());
                    }
                }

                function recordScopeNameEnd() {
                    sourceMapNameIndices.pop();
                };

                function writeCommentRangeWithMap(comment: Comment, writer: EmitTextWriter) {
                    recordSourceMapSpan(comment.pos);
                    writeCommentRange(comment, writer);
                    recordSourceMapSpan(comment.end);
                }

                function writeJavaScriptAndSourceMapFile(emitOutput: string, writeByteOrderMark: boolean) {
                    // Write source map file
                    encodeLastRecordedSourceMapSpan();
                    writeFile(sourceMapData.sourceMapFilePath, JSON.stringify({
                        version: 3,
                        file: sourceMapData.sourceMapFile,
                        sourceRoot: sourceMapData.sourceMapSourceRoot,
                        sources: sourceMapData.sourceMapSources,
                        names: sourceMapData.sourceMapNames,
                        mappings: sourceMapData.sourceMapMappings
                    }), /*writeByteOrderMark*/ false);
                    sourceMapDataList.push(sourceMapData);

                    // Write sourcemap url to the js file and write the js file
                    writeJavaScriptFile(emitOutput + "//# sourceMappingURL=" + sourceMapData.jsSourceMappingURL, writeByteOrderMark);
                }

                // Initialize source map data
                var sourceMapJsFile = getBaseFilename(normalizeSlashes(jsFilePath));
                sourceMapData = {
                    sourceMapFilePath: jsFilePath + ".map",
                    jsSourceMappingURL: sourceMapJsFile + ".map",
                    sourceMapFile: sourceMapJsFile,
                    sourceMapSourceRoot: compilerOptions.sourceRoot || "",
                    sourceMapSources: [],
                    inputSourceFileNames: [],
                    sourceMapNames: [],
                    sourceMapMappings: "",
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
                        sourceMapDir = getDirectoryPath(getSourceFilePathInNewDir(sourceMapDir, root));
                    }

                    if (!isRootedDiskPath(sourceMapDir) && !isUrl(sourceMapDir)) {
                        // The relative paths are relative to the common directory
                        sourceMapDir = combinePaths(program.getCommonSourceDirectory(), sourceMapDir);
                        sourceMapData.jsSourceMappingURL = getRelativePathToDirectoryOrUrl(
                            getDirectoryPath(normalizePath(jsFilePath)), // get the relative sourceMapDir path based on jsFilePath
                            combinePaths(sourceMapDir, sourceMapData.jsSourceMappingURL), // this is where user expects to see sourceMap
                            compilerHost.getCurrentDirectory(),
                        /*isAbsolutePathAnUrl*/ true);
                    }
                    else {
                        sourceMapData.jsSourceMappingURL = combinePaths(sourceMapDir, sourceMapData.jsSourceMappingURL);
                    }
                }
                else {
                    sourceMapDir = getDirectoryPath(normalizePath(jsFilePath));
                }

                function emitNodeWithMap(node: Node) {
                    if (node) {
                        if (node.kind != SyntaxKind.SourceFile) {
                            recordEmitNodeStartSpan(node);
                            emitNode(node);
                            recordEmitNodeEndSpan(node);
                        }
                        else {
                            recordNewSourceFileStart(<SourceFile>node);
                            emitNode(node);
                        }
                    }
                }

                writeEmittedFiles = writeJavaScriptAndSourceMapFile;
                emit = emitNodeWithMap;
                emitStart = recordEmitNodeStartSpan;
                emitEnd = recordEmitNodeEndSpan;
                emitToken = writeTextWithSpanRecord;
                emitNewSourceFileStart = recordNewSourceFileStart;
                scopeEmitStart = recordScopeNameOfNode;
                scopeEmitEnd = recordScopeNameEnd;
                writeComment = writeCommentRangeWithMap;
            }

            function writeJavaScriptFile(emitOutput: string, writeByteOrderMark: boolean) {
                writeFile(jsFilePath, emitOutput, writeByteOrderMark);
            }

            function emitTokenText(tokenKind: SyntaxKind, startPos: number, emitFn?: () => void) {
                var tokenString = tokenToString(tokenKind);
                if (emitFn) {
                    emitFn();
                }
                else {
                    write(tokenString);
                }
                return startPos + tokenString.length;
            }

            function emitOptional(prefix: string, node: Node) {
                if (node) {
                    write(prefix);
                    emit(node);
                }
            }

            function emitCommaList(nodes: Node[], count?: number) {
                if (!(count >= 0)) count = nodes.length;
                if (nodes) {
                    for (var i = 0; i < count; i++) {
                        if (i) write(", ");
                        emit(nodes[i]);
                    }
                }
            }

            function emitMultiLineList(nodes: Node[]) {
                if (nodes) {
                    for (var i = 0; i < nodes.length; i++) {
                        if (i) write(",");
                        writeLine();
                        emit(nodes[i]);
                    }
                }
            }

            function emitLines(nodes: Node[]) {
                emitLinesStartingAt(nodes, /*startIndex*/ 0);
            }

            function emitLinesStartingAt(nodes: Node[], startIndex: number): void {
                for (var i = startIndex; i < nodes.length; i++) {
                    writeLine();
                    emit(nodes[i]);
                }
            }

            function emitLiteral(node: LiteralExpression) {
                var text = getSourceTextOfLocalNode(node);
                if (node.kind === SyntaxKind.StringLiteral && compilerOptions.sourceMap) {
                    writer.writeLiteral(text);
                }
                else {
                    write(text);
                }
            }

            // This function specifically handles numeric/string literals for enum and accessor 'identifiers'.
            // In a sense, it does not actually emit identifiers as much as it declares a name for a specific property.
            function emitQuotedIdentifier(node: Identifier) {
                if (node.kind === SyntaxKind.StringLiteral) {
                    emitLiteral(node);
                }
                else {
                    write("\"");

                    if (node.kind === SyntaxKind.NumericLiteral) {
                        write(node.text);
                    }
                    else {
                        write(getSourceTextOfLocalNode(node));
                    }

                    write("\"");
                }
            }

            function isNonExpressionIdentifier(node: Identifier) {
                var parent = node.parent;
                switch (parent.kind) {
                    case SyntaxKind.Parameter:
                    case SyntaxKind.VariableDeclaration:
                    case SyntaxKind.Property:
                    case SyntaxKind.PropertyAssignment:
                    case SyntaxKind.EnumMember:
                    case SyntaxKind.Method:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.ModuleDeclaration:
                    case SyntaxKind.ImportDeclaration:
                        return (<Declaration>parent).name === node;
                    case SyntaxKind.BreakStatement:
                    case SyntaxKind.ContinueStatement:
                    case SyntaxKind.ExportAssignment:
                        return false;
                    case SyntaxKind.LabelledStatement:
                        return (<LabelledStatement>node.parent).label === node;
                    case SyntaxKind.CatchBlock:
                        return (<CatchBlock>node.parent).variable === node;
                }
            }

            function emitIdentifier(node: Identifier) {
                if (!isNonExpressionIdentifier(node)) {
                    var prefix = resolver.getExpressionNamePrefix(node);
                    if (prefix) {
                        write(prefix);
                        write(".");
                    }
                }
                write(getSourceTextOfLocalNode(node));
            }

            function emitThis(node: Node) {
                if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.LexicalThis) {
                    write("_this");
                }
                else {
                    write("this");
                }
            }

            function emitSuper(node: Node) {
                var flags = resolver.getNodeCheckFlags(node);
                if (flags & NodeCheckFlags.SuperInstance) {
                    write("_super.prototype");
                }
                else if (flags & NodeCheckFlags.SuperStatic) {
                    write("_super");
                }
                else {
                    write("super");
                }
            }

            function emitArrayLiteral(node: ArrayLiteral) {
                if (node.flags & NodeFlags.MultiLine) {
                    write("[");
                    increaseIndent();
                    emitMultiLineList(node.elements);
                    decreaseIndent();
                    writeLine();
                    write("]");
                }
                else {
                    write("[");
                    emitCommaList(node.elements);
                    write("]");
                }
            }

            function emitObjectLiteral(node: ObjectLiteral) {
                if (!node.properties.length) {
                    write("{}");
                }
                else if (node.flags & NodeFlags.MultiLine) {
                    write("{");
                    increaseIndent();
                    emitMultiLineList(node.properties);
                    decreaseIndent();
                    writeLine();
                    write("}");
                }
                else {
                    write("{ ");
                    emitCommaList(node.properties);
                    write(" }");
                }
            }

            function emitPropertyAssignment(node: PropertyDeclaration) {
                emitLeadingComments(node);
                emit(node.name);
                write(": ");
                emit(node.initializer);
                emitTrailingComments(node);
            }

            function emitPropertyAccess(node: PropertyAccess) {
                var text = resolver.getPropertyAccessSubstitution(node);
                if (text) {
                    write(text);
                    return;
                }
                emit(node.left);
                write(".");
                emit(node.right);
            }

            function emitIndexedAccess(node: IndexedAccess) {
                emit(node.object);
                write("[");
                emit(node.index);
                write("]");
            }

            function emitCallExpression(node: CallExpression) {
                var superCall = false;
                if (node.func.kind === SyntaxKind.SuperKeyword) {
                    write("_super");
                    superCall = true;
                }
                else {
                    emit(node.func);
                    superCall = node.func.kind === SyntaxKind.PropertyAccess && (<PropertyAccess>node.func).left.kind === SyntaxKind.SuperKeyword;
                }
                if (superCall) {
                    write(".call(");
                    emitThis(node.func);
                    if (node.arguments.length) {
                        write(", ");
                        emitCommaList(node.arguments);
                    }
                    write(")");
                }
                else {
                    write("(");
                    emitCommaList(node.arguments);
                    write(")");
                }
            }

            function emitNewExpression(node: NewExpression) {
                write("new ");
                emit(node.func);
                if (node.arguments) {
                    write("(");
                    emitCommaList(node.arguments);
                    write(")");
                }
            }

            function emitParenExpression(node: ParenExpression) {
                if (node.expression.kind === SyntaxKind.TypeAssertion) {
                    var operand = (<TypeAssertion>node.expression).operand;

                    // Make sure we consider all nested cast expressions, e.g.:
                    // (<any><number><any>-A).x; 
                    while (operand.kind == SyntaxKind.TypeAssertion) {
                        operand = (<TypeAssertion>operand).operand;
                    }

                    // We have an expression of the form: (<Type>SubExpr)
                    // Emitting this as (SubExpr) is really not desirable. We would like to emit the subexpr as is.
                    // Omitting the parentheses, however, could cause change in the semantics of the generated
                    // code if the casted expression has a lower precedence than the rest of the expression, e.g.: 
                    //      (<any>new A).foo should be emitted as (new A).foo and not new A.foo
                    //      (<any>typeof A).toString() should be emitted as (typeof A).toString() and not typeof A.toString()
                    //      new (<any>A()) should be emitted as new (A()) and not new A()
                    //      (<any>function foo() { })() should be emitted as an IIF (function foo(){})() and not declaration function foo(){} ()
                    if (operand.kind !== SyntaxKind.PrefixOperator && operand.kind !== SyntaxKind.PostfixOperator && operand.kind !== SyntaxKind.NewExpression &&
                        !(operand.kind === SyntaxKind.CallExpression && node.parent.kind === SyntaxKind.NewExpression) &&
                        !(operand.kind === SyntaxKind.FunctionExpression && node.parent.kind === SyntaxKind.CallExpression)) {
                        emit(operand);
                        return;
                    }
                }
                write("(");
                emit(node.expression);
                write(")");
            }

            function emitUnaryExpression(node: UnaryExpression) {
                if (node.kind === SyntaxKind.PrefixOperator) {
                    write(tokenToString(node.operator));
                }
                // In some cases, we need to emit a space between the operator and the operand. One obvious case
                // is when the operator is an identifer, like delete or typeof. We also need to do this for plus
                // and minus expressions in certain cases. Specifically, consider the following two cases (parens
                // are just for clarity of exposition, and not part of the source code):
                //
                //  (+(+1))
                //  (+(++1))
                //
                // We need to emit a space in both cases. In the first case, the absence of a space will make
                // the resulting expression a prefix increment operation. And in the second, it will make the resulting
                // expression a prefix increment whose operand is a plus expression - (++(+x))
                // The same is true of minus of course.
                if (node.operator >= SyntaxKind.Identifier) {
                    write(" ");
                }
                else if (node.kind === SyntaxKind.PrefixOperator && node.operand.kind === SyntaxKind.PrefixOperator) {
                    var operand = <UnaryExpression>node.operand;
                    if (node.operator === SyntaxKind.PlusToken && (operand.operator === SyntaxKind.PlusToken || operand.operator === SyntaxKind.PlusPlusToken)) {
                        write(" ");
                    }
                    else if (node.operator === SyntaxKind.MinusToken && (operand.operator === SyntaxKind.MinusToken || operand.operator === SyntaxKind.MinusMinusToken)) {
                        write(" ");
                    }
                }
                emit(node.operand);
                if (node.kind === SyntaxKind.PostfixOperator) {
                    write(tokenToString(node.operator));
                }
            }

            function emitBinaryExpression(node: BinaryExpression) {
                emit(node.left);
                if (node.operator !== SyntaxKind.CommaToken) write(" ");
                write(tokenToString(node.operator));
                write(" ");
                emit(node.right);
            }

            function emitConditionalExpression(node: ConditionalExpression) {
                emit(node.condition);
                write(" ? ");
                emit(node.whenTrue);
                write(" : ");
                emit(node.whenFalse);
            }

            function emitBlock(node: Block) {
                emitToken(SyntaxKind.OpenBraceToken, node.pos);
                increaseIndent();
                scopeEmitStart(node.parent);
                if (node.kind === SyntaxKind.ModuleBlock) {
                    Debug.assert(node.parent.kind === SyntaxKind.ModuleDeclaration);
                    emitCaptureThisForNodeIfNecessary(node.parent);
                }
                emitLines(node.statements);
                decreaseIndent();
                writeLine();
                emitToken(SyntaxKind.CloseBraceToken, node.statements.end);
                scopeEmitEnd();
            }

            function emitEmbeddedStatement(node: Node) {
                if (node.kind === SyntaxKind.Block) {
                    write(" ");
                    emit(<Block>node);
                }
                else {
                    increaseIndent();
                    writeLine();
                    emit(node);
                    decreaseIndent();
                }
            }

            function emitExpressionStatement(node: ExpressionStatement) {
                var isArrowExpression = node.expression.kind === SyntaxKind.ArrowFunction;
                if (isArrowExpression) write("(");
                emit(node.expression);
                if (isArrowExpression) write(")");
                write(";");
            }

            function emitIfStatement(node: IfStatement) {
                var endPos = emitToken(SyntaxKind.IfKeyword, node.pos);
                write(" ");
                endPos = emitToken(SyntaxKind.OpenParenToken, endPos);
                emit(node.expression);
                emitToken(SyntaxKind.CloseParenToken, node.expression.end);
                emitEmbeddedStatement(node.thenStatement);
                if (node.elseStatement) {
                    writeLine();
                    emitToken(SyntaxKind.ElseKeyword, node.thenStatement.end);
                    if (node.elseStatement.kind === SyntaxKind.IfStatement) {
                        write(" ");
                        emit(node.elseStatement);
                    }
                    else {
                        emitEmbeddedStatement(node.elseStatement);
                    }
                }
            }

            function emitDoStatement(node: DoStatement) {
                write("do");
                emitEmbeddedStatement(node.statement);
                if (node.statement.kind === SyntaxKind.Block) {
                    write(" ");
                }
                else {
                    writeLine();
                }
                write("while (");
                emit(node.expression);
                write(");");
            }

            function emitWhileStatement(node: WhileStatement) {
                write("while (");
                emit(node.expression);
                write(")");
                emitEmbeddedStatement(node.statement);
            }

            function emitForStatement(node: ForStatement) {
                var endPos = emitToken(SyntaxKind.ForKeyword, node.pos);
                write(" ");
                endPos = emitToken(SyntaxKind.OpenParenToken, endPos);
                if (node.declarations) {
                    emitToken(SyntaxKind.VarKeyword, endPos);
                    write(" ");
                    emitCommaList(node.declarations);
                }
                if (node.initializer) {
                    emit(node.initializer);
                }
                write(";");
                emitOptional(" ", node.condition);
                write(";");
                emitOptional(" ", node.iterator);
                write(")");
                emitEmbeddedStatement(node.statement);
            }

            function emitForInStatement(node: ForInStatement) {
                var endPos = emitToken(SyntaxKind.ForKeyword, node.pos);
                write(" ");
                endPos = emitToken(SyntaxKind.OpenParenToken, endPos);
                if (node.declaration) {
                    emitToken(SyntaxKind.VarKeyword, endPos);
                    write(" ");
                    emit(node.declaration);
                }
                else {
                    emit(node.variable);
                }
                write(" in ");
                emit(node.expression);
                emitToken(SyntaxKind.CloseParenToken, node.expression.end);
                emitEmbeddedStatement(node.statement);
            }

            function emitBreakOrContinueStatement(node: BreakOrContinueStatement) {
                emitToken(node.kind === SyntaxKind.BreakStatement ? SyntaxKind.BreakKeyword : SyntaxKind.ContinueKeyword, node.pos);
                emitOptional(" ", node.label);
                write(";");
            }

            function emitReturnStatement(node: ReturnStatement) {
                emitToken(SyntaxKind.ReturnKeyword, node.pos);
                emitOptional(" ", node.expression);
                write(";");
            }

            function emitWithStatement(node: WhileStatement) {
                write("with (");
                emit(node.expression);
                write(")");
                emitEmbeddedStatement(node.statement);
            }

            function emitSwitchStatement(node: SwitchStatement) {
                var endPos = emitToken(SyntaxKind.SwitchKeyword, node.pos);
                write(" ");
                emitToken(SyntaxKind.OpenParenToken, endPos);
                emit(node.expression);
                endPos = emitToken(SyntaxKind.CloseParenToken, node.expression.end);
                write(" ");
                emitToken(SyntaxKind.OpenBraceToken, endPos);
                increaseIndent();
                emitLines(node.clauses);
                decreaseIndent();
                writeLine();
                emitToken(SyntaxKind.CloseBraceToken, node.clauses.end);
            }

            function emitCaseOrDefaultClause(node: CaseOrDefaultClause) {
                if (node.kind === SyntaxKind.CaseClause) {
                    write("case ");
                    emit(node.expression);
                    write(":");
                }
                else {
                    write("default:");
                }
                increaseIndent();
                emitLines(node.statements);
                decreaseIndent();
            }

            function emitThrowStatement(node: ThrowStatement) {
                write("throw ");
                emit(node.expression);
                write(";");
            }

            function emitTryStatement(node: TryStatement) {
                write("try ");
                emit(node.tryBlock);
                emit(node.catchBlock);
                if (node.finallyBlock) {
                    writeLine();
                    write("finally ");
                    emit(node.finallyBlock);
                }
            }

            function emitCatchBlock(node: CatchBlock) {
                writeLine();
                var endPos = emitToken(SyntaxKind.CatchKeyword, node.pos);
                write(" ");
                emitToken(SyntaxKind.OpenParenToken, endPos);
                emit(node.variable);
                emitToken(SyntaxKind.CloseParenToken, node.variable.end);
                write(" ");
                emitBlock(node);
            }

            function emitDebuggerStatement(node: Node) {
                emitToken(SyntaxKind.DebuggerKeyword, node.pos);
                write(";");
            }

            function emitLabelledStatement(node: LabelledStatement) {
                emit(node.label);
                write(": ");
                emit(node.statement);
            }

            function getContainingModule(node: Node): ModuleDeclaration {
                do {
                    node = node.parent;
                } while (node && node.kind !== SyntaxKind.ModuleDeclaration);
                return <ModuleDeclaration>node;
            }

            function emitModuleMemberName(node: Declaration) {
                emitStart(node.name);
                if (node.flags & NodeFlags.Export) {
                    var container = getContainingModule(node);
                    write(container ? resolver.getLocalNameOfContainer(container) : "exports");
                    write(".");
                }
                emitNode(node.name);
                emitEnd(node.name);
            }

            function emitVariableDeclaration(node: VariableDeclaration) {
                emitLeadingComments(node);
                emitModuleMemberName(node);
                emitOptional(" = ", node.initializer);
                emitTrailingComments(node);
            }

            function emitVariableStatement(node: VariableStatement) {
                emitLeadingComments(node);
                if (!(node.flags & NodeFlags.Export)) write("var ");
                emitCommaList(node.declarations);
                write(";");
                emitTrailingComments(node);
            }

            function emitParameter(node: ParameterDeclaration) {
                emitLeadingComments(node);
                emit(node.name);
                emitTrailingComments(node);
            }

            function emitDefaultValueAssignments(node: FunctionDeclaration) {
                forEach(node.parameters, param => {
                    if (param.initializer) {
                        writeLine();
                        emitStart(param);
                        write("if (");
                        emitNode(param.name);
                        write(" === void 0)");
                        emitEnd(param);
                        write(" { ");
                        emitStart(param);
                        emitNode(param.name);
                        write(" = ");
                        emitNode(param.initializer);
                        emitEnd(param);
                        write("; }");
                    }
                });
            }

            function emitRestParameter(node: FunctionDeclaration) {
                if (hasRestParameters(node)) {
                    var restIndex = node.parameters.length - 1;
                    var restParam = node.parameters[restIndex];
                    writeLine();
                    emitLeadingComments(restParam);
                    emitStart(restParam);
                    write("var ");
                    emitNode(restParam.name);
                    write(" = [];");
                    emitEnd(restParam);
                    emitTrailingComments(restParam);
                    writeLine();
                    write("for (");
                    emitStart(restParam);
                    write("var _i = " + restIndex + ";");
                    emitEnd(restParam);
                    write(" ");
                    emitStart(restParam);
                    write("_i < arguments.length;");
                    emitEnd(restParam);
                    write(" ");
                    emitStart(restParam);
                    write("_i++");
                    emitEnd(restParam);
                    write(") {");
                    increaseIndent();
                    writeLine();
                    emitStart(restParam);
                    emitNode(restParam.name);
                    write("[_i - " + restIndex + "] = arguments[_i];");
                    emitEnd(restParam);
                    decreaseIndent();
                    writeLine();
                    write("}");
                }
            }

            function emitAccessor(node: AccessorDeclaration) {
                emitLeadingComments(node);
                write(node.kind === SyntaxKind.GetAccessor ? "get " : "set ");
                emit(node.name);
                emitSignatureAndBody(node);
                emitTrailingComments(node);
            }

            function emitFunctionDeclaration(node: FunctionDeclaration) {
                if (!node.body) return;
                if (node.kind !== SyntaxKind.Method) {
                    // Methods will emit the comments as part of emitting method declaration
                    emitLeadingComments(node);
                }
                write("function ");
                if (node.kind === SyntaxKind.FunctionDeclaration || (node.kind === SyntaxKind.FunctionExpression && node.name)) {
                    emit(node.name);
                }
                emitSignatureAndBody(node);
                if (node.kind !== SyntaxKind.Method) {
                    emitTrailingComments(node);
                }
            }

            function emitCaptureThisForNodeIfNecessary(node: Node): void {
                if (resolver.getNodeCheckFlags(node) & NodeCheckFlags.CaptureThis) {
                    writeLine();
                    emitStart(node);
                    write("var _this = this;");
                    emitEnd(node);
                }
            }

            function emitSignatureParameters(node: FunctionDeclaration) {
                write("(");
                if (node) {
                    increaseIndent();
                    emitCommaList(node.parameters, node.parameters.length - (hasRestParameters(node) ? 1 : 0));
                    decreaseIndent();
                }
                write(")");
            }

            function emitSignatureAndBody(node: FunctionDeclaration) {
                emitSignatureParameters(node);
                write(" {");
                scopeEmitStart(node);
                increaseIndent();

                var startIndex = 0;
                if (node.body.kind === SyntaxKind.FunctionBlock) {
                    startIndex = emitDirectivePrologues((<Block>node.body).statements, /*startWithNewLine*/ true);
                }
                var outPos = writer.getTextPos();
                emitCaptureThisForNodeIfNecessary(node);
                emitDefaultValueAssignments(node);
                emitRestParameter(node);
                if (node.body.kind !== SyntaxKind.FunctionBlock && outPos === writer.getTextPos()) {
                    decreaseIndent();
                    write(" ");
                    emitStart(node.body);
                    write("return ");
                    emitNode(node.body);
                    emitEnd(node.body);
                    write("; ");
                    emitStart(node.body);
                    write("}");
                    emitEnd(node.body);
                }
                else {
                    if (node.body.kind === SyntaxKind.FunctionBlock) {
                        emitLinesStartingAt((<Block>node.body).statements, startIndex);
                    }
                    else {
                        writeLine();
                        write("return ");
                        emit(node.body);
                        write(";");
                    }
                    decreaseIndent();
                    writeLine();
                    if (node.body.kind === SyntaxKind.FunctionBlock) {
                        emitToken(SyntaxKind.CloseBraceToken, (<Block>node.body).statements.end);
                    }
                    else {
                        emitStart(node.body);
                        write("}");
                        emitEnd(node.body);
                    }
                }
                scopeEmitEnd();
                if (node.flags & NodeFlags.Export) {
                    writeLine();
                    emitStart(node);
                    emitModuleMemberName(node);
                    write(" = ");
                    emit(node.name);
                    emitEnd(node);
                    write(";");
                }
            }

            function findInitialSuperCall(ctor: ConstructorDeclaration): ExpressionStatement {
                if (ctor.body) {
                    var statement = (<Block>ctor.body).statements[0];
                    if (statement && statement.kind === SyntaxKind.ExpressionStatement) {
                        var expr = (<ExpressionStatement>statement).expression;
                        if (expr && expr.kind === SyntaxKind.CallExpression) {
                            var func = (<CallExpression>expr).func;
                            if (func && func.kind === SyntaxKind.SuperKeyword) {
                                return <ExpressionStatement>statement;
                            }
                        }
                    }
                }
            }

            function emitParameterPropertyAssignments(node: ConstructorDeclaration) {
                forEach(node.parameters, param => {
                    if (param.flags & (NodeFlags.Public | NodeFlags.Private)) {
                        writeLine();
                        emitStart(param);
                        emitStart(param.name);
                        write("this.");
                        emitNode(param.name);
                        emitEnd(param.name);
                        write(" = ");
                        emit(param.name);
                        write(";");
                        emitEnd(param);
                    }
                });
            }

            function emitMemberAccess(memberName: Identifier) {
                if (memberName.kind === SyntaxKind.StringLiteral || memberName.kind === SyntaxKind.NumericLiteral) {
                    write("[");
                    emitNode(memberName);
                    write("]");
                }
                else {
                    write(".");
                    emitNode(memberName);
                }
            }

            function emitMemberAssignments(node: ClassDeclaration, staticFlag: NodeFlags) {
                forEach(node.members, member => {
                    if (member.kind === SyntaxKind.Property && (member.flags & NodeFlags.Static) === staticFlag && (<PropertyDeclaration>member).initializer) {
                        writeLine();
                        emitLeadingComments(member);
                        emitStart(member);
                        emitStart((<PropertyDeclaration>member).name);
                        if (staticFlag) {
                            emitNode(node.name);
                        }
                        else {
                            write("this");
                        }
                        emitMemberAccess((<PropertyDeclaration>member).name);
                        emitEnd((<PropertyDeclaration>member).name);
                        write(" = ");
                        emit((<PropertyDeclaration>member).initializer);
                        write(";");
                        emitEnd(member);
                        emitTrailingComments(member);
                    }
                });
            }

            function emitMemberFunctions(node: ClassDeclaration) {
                forEach(node.members, member => {
                    if (member.kind === SyntaxKind.Method) {
                        if (!(<MethodDeclaration>member).body) return;
                        writeLine();
                        emitLeadingComments(member);
                        emitStart(member);
                        emitStart((<MethodDeclaration>member).name);
                        emitNode(node.name);
                        if (!(member.flags & NodeFlags.Static)) {
                            write(".prototype");
                        }
                        emitMemberAccess((<MethodDeclaration>member).name);
                        emitEnd((<MethodDeclaration>member).name);
                        write(" = ");
                        emitStart(member);
                        emitFunctionDeclaration(<MethodDeclaration>member);
                        emitEnd(member);
                        emitEnd(member);
                        write(";");
                        emitTrailingComments(member);
                    }
                    else if (member.kind === SyntaxKind.GetAccessor || member.kind === SyntaxKind.SetAccessor) {
                        var accessors = getAllAccessorDeclarations(node, <AccessorDeclaration>member);
                        if (member === accessors.firstAccessor) {
                            writeLine();
                            emitStart(member);
                            write("Object.defineProperty(");
                            emitStart((<AccessorDeclaration>member).name);
                            emitNode(node.name);
                            if (!(member.flags & NodeFlags.Static)) {
                                write(".prototype");
                            }
                            write(", ");
                            emitQuotedIdentifier((<AccessorDeclaration>member).name);
                            emitEnd((<AccessorDeclaration>member).name);
                            write(", {");
                            increaseIndent();
                            if (accessors.getAccessor) {
                                writeLine();
                                emitLeadingComments(accessors.getAccessor);
                                write("get: ");
                                emitStart(accessors.getAccessor);
                                write("function ");
                                emitSignatureAndBody(accessors.getAccessor);
                                emitEnd(accessors.getAccessor);
                                write(",");
                                emitTrailingComments(accessors.getAccessor);
                            }
                            if (accessors.setAccessor) {
                                writeLine();
                                emitLeadingComments(accessors.setAccessor);
                                write("set: ");
                                emitStart(accessors.setAccessor);
                                write("function ");
                                emitSignatureAndBody(accessors.setAccessor);
                                emitEnd(accessors.setAccessor);
                                write(",");
                                emitTrailingComments(accessors.setAccessor);
                            }
                            writeLine();
                            write("enumerable: true,");
                            writeLine();
                            write("configurable: true");
                            decreaseIndent();
                            writeLine();
                            write("});");
                            emitEnd(member);
                        }
                    }
                });
            }

            function emitClassDeclaration(node: ClassDeclaration) {
                var ctor = getFirstConstructorWithBody(node);
                emitLeadingComments(node);
                write("var ");
                emit(node.name);
                write(" = (function (");
                if (node.baseType) {
                    write("_super");
                }
                write(") {");
                increaseIndent();
                scopeEmitStart(node);
                if (node.baseType) {
                    writeLine();
                    emitStart(node.baseType);
                    write("__extends(");
                    emit(node.name);
                    write(", _super);");
                    emitEnd(node.baseType);
                }
                writeLine();
                if (ctor) {
                    emitLeadingComments(ctor);
                }
                emitStart(<Node>ctor || node);
                write("function ");
                emit(node.name);
                emitSignatureParameters(ctor);
                write(" {");
                scopeEmitStart(node, "constructor");
                increaseIndent();
                emitCaptureThisForNodeIfNecessary(node);
                if (ctor) {
                    emitDefaultValueAssignments(ctor);
                    emitRestParameter(ctor);
                    if (node.baseType) {
                        var superCall = findInitialSuperCall(ctor);
                        if (superCall) {
                            writeLine();
                            emit(superCall);
                        }
                    }
                    emitParameterPropertyAssignments(ctor);
                }
                else {
                    if (node.baseType) {
                        writeLine();
                        emitStart(node.baseType);
                        write("_super.apply(this, arguments);");
                        emitEnd(node.baseType);
                    }
                }                
                emitMemberAssignments(node, /*nonstatic*/0);
                if (ctor) {
                    var statements: Node[] = (<Block>ctor.body).statements;
                    if (superCall) statements = statements.slice(1);
                    emitLines(statements);
                }
                decreaseIndent();
                writeLine();
                emitToken(SyntaxKind.CloseBraceToken, ctor ? (<Block>ctor.body).statements.end : node.members.end);
                scopeEmitEnd();
                emitEnd(<Node>ctor || node);
                if (ctor) {
                    emitTrailingComments(ctor);
                }
                emitMemberFunctions(node);
                emitMemberAssignments(node, NodeFlags.Static);
                writeLine();
                function emitClassReturnStatement() {
                    write("return ");
                    emitNode(node.name);
                }
                emitToken(SyntaxKind.CloseBraceToken, node.members.end, emitClassReturnStatement);
                write(";");
                decreaseIndent();
                writeLine();
                emitToken(SyntaxKind.CloseBraceToken, node.members.end);
                scopeEmitEnd();
                emitStart(node);
                write(")(");
                if (node.baseType) {
                    emit(node.baseType.typeName);
                }
                write(");");
                emitEnd(node);
                if (node.flags & NodeFlags.Export) {
                    writeLine();
                    emitStart(node);
                    emitModuleMemberName(node);
                    write(" = ");
                    emit(node.name);
                    emitEnd(node);
                    write(";");
                }
                emitTrailingComments(node);
            }

            function emitEnumDeclaration(node: EnumDeclaration) {
                emitLeadingComments(node);
                if (!(node.flags & NodeFlags.Export)) {
                    emitStart(node);
                    write("var ");
                    emit(node.name);
                    emitEnd(node);
                    write(";");
                }
                writeLine();
                emitStart(node);
                write("(function (");
                emitStart(node.name);
                write(resolver.getLocalNameOfContainer(node));
                emitEnd(node.name);
                write(") {");
                increaseIndent();
                scopeEmitStart(node);
                forEach(node.members, member => {
                    writeLine();
                    emitLeadingComments(member);
                    emitStart(member);
                    write(resolver.getLocalNameOfContainer(node));
                    write("[");
                    write(resolver.getLocalNameOfContainer(node));
                    write("[");
                    emitQuotedIdentifier(member.name);
                    write("] = ");
                    if (member.initializer) {
                        emit(member.initializer);
                    }
                    else {
                        write(resolver.getEnumMemberValue(member).toString());
                    }
                    write("] = ");
                    emitQuotedIdentifier(member.name);
                    emitEnd(member);
                    write(";");
                    emitTrailingComments(member);
                });
                decreaseIndent();
                writeLine();
                emitToken(SyntaxKind.CloseBraceToken, node.members.end);
                scopeEmitEnd();
                write(")(");
                emitModuleMemberName(node);
                write(" || (");
                emitModuleMemberName(node);
                write(" = {}));");
                emitEnd(node);
                if (node.flags & NodeFlags.Export) {
                    writeLine();
                    emitStart(node);
                    write("var ");
                    emit(node.name);
                    write(" = ");
                    emitModuleMemberName(node);
                    emitEnd(node);
                    write(";");
                }
                emitTrailingComments(node);
            }

            function getInnerMostModuleDeclarationFromDottedModule(moduleDeclaration: ModuleDeclaration): ModuleDeclaration {
                if (moduleDeclaration.body.kind === SyntaxKind.ModuleDeclaration) {
                    var recursiveInnerModule = getInnerMostModuleDeclarationFromDottedModule(<ModuleDeclaration>moduleDeclaration.body);
                    return recursiveInnerModule || <ModuleDeclaration>moduleDeclaration.body;
                }
            }

            function emitModuleDeclaration(node: ModuleDeclaration) {
                if (!isInstantiated(node)) return;
                emitLeadingComments(node);
                if (!(node.flags & NodeFlags.Export)) {
                    emitStart(node);
                    write("var ");
                    emit(node.name);
                    write(";");
                    emitEnd(node);
                    writeLine();
                }
                emitStart(node);
                write("(function (");
                emitStart(node.name);
                write(resolver.getLocalNameOfContainer(node));
                emitEnd(node.name);
                write(") ");
                if (node.body.kind === SyntaxKind.ModuleBlock) {
                    emit(node.body);
                }
                else {
                    write("{");
                    increaseIndent();
                    scopeEmitStart(node);
                    emitCaptureThisForNodeIfNecessary(node);
                    writeLine();
                    emit(node.body);
                    decreaseIndent();
                    writeLine();
                    var moduleBlock = <Block>getInnerMostModuleDeclarationFromDottedModule(node).body;
                    emitToken(SyntaxKind.CloseBraceToken, moduleBlock.statements.end);
                    scopeEmitEnd();
                }
                write(")(");
                emitModuleMemberName(node);
                write(" || (");
                emitModuleMemberName(node);
                write(" = {}));");
                emitEnd(node);
                if (node.flags & NodeFlags.Export) {
                    writeLine();
                    emitStart(node);
                    write("var ");
                    emit(node.name);
                    write(" = ");
                    emitModuleMemberName(node);
                    emitEnd(node);
                    write(";");
                }
                emitTrailingComments(node);
            }

            function emitImportDeclaration(node: ImportDeclaration) {
                var emitImportDeclaration = resolver.isReferencedImportDeclaration(node);

                if (!emitImportDeclaration) {
                    // preserve old compiler's behavior: emit 'var' for import declaration (even if we do not consider them referenced) when
                    // - current file is not external module
                    // - import declaration is top level and target is value imported by entity name
                    emitImportDeclaration = !isExternalModule(currentSourceFile) && resolver.isTopLevelValueImportedViaEntityName(node);
                }

                if (emitImportDeclaration) {
                    if (node.externalModuleName && node.parent.kind === SyntaxKind.SourceFile && compilerOptions.module === ModuleKind.AMD) {
                        if (node.flags & NodeFlags.Export) {
                            writeLine();
                            emitLeadingComments(node);
                            emitStart(node);
                            emitModuleMemberName(node);
                            write(" = ");
                            emit(node.name);
                            write(";");
                            emitEnd(node);
                            emitTrailingComments(node);
                        }
                    }
                    else {
                        writeLine();
                        emitLeadingComments(node);
                        emitStart(node);
                        if (!(node.flags & NodeFlags.Export)) write("var ");
                        emitModuleMemberName(node);
                        write(" = ");
                        if (node.entityName) {
                            emit(node.entityName);
                        }
                        else {
                            write("require(");
                            emitStart(node.externalModuleName);
                            emitLiteral(node.externalModuleName);
                            emitEnd(node.externalModuleName);
                            emitToken(SyntaxKind.CloseParenToken, node.externalModuleName.end);
                        }
                        write(";");
                        emitEnd(node);
                        emitTrailingComments(node);
                    }
                }
            }

            function getExternalImportDeclarations(node: SourceFile): ImportDeclaration[] {
                var result: ImportDeclaration[] = [];
                forEach(node.statements, stat => {
                    if (stat.kind === SyntaxKind.ImportDeclaration && (<ImportDeclaration>stat).externalModuleName && resolver.isReferencedImportDeclaration(stat)) {
                        result.push(<ImportDeclaration>stat);
                    }
                });
                return result;
            }

            function getFirstExportAssignment(sourceFile: SourceFile) {
                return forEach(sourceFile.statements, node => {
                    if (node.kind === SyntaxKind.ExportAssignment) {
                        return <ExportAssignment>node;
                    }
                });
            }

            function emitAMDModule(node: SourceFile, startIndex: number) {
                var imports = getExternalImportDeclarations(node);
                writeLine();
                write("define([\"require\", \"exports\"");
                forEach(imports, imp => {
                    write(", ");
                    emitLiteral(imp.externalModuleName);
                });
                forEach(node.amdDependencies, amdDependency => {
                    var text = "\"" + amdDependency + "\"";
                    write(", ");
                    write(text);
                });
                write("], function (require, exports");
                forEach(imports, imp => {
                    write(", ");
                    emit(imp.name);
                });
                write(") {");
                increaseIndent();
                emitCaptureThisForNodeIfNecessary(node);
                emitLinesStartingAt(node.statements, startIndex);
                var exportName = resolver.getExportAssignmentName(node);
                if (exportName) {
                    writeLine();
                    var exportAssignement = getFirstExportAssignment(node);
                    emitStart(exportAssignement);
                    write("return ");
                    emitStart(exportAssignement.exportName);
                    write(exportName);
                    emitEnd(exportAssignement.exportName);
                    write(";");
                    emitEnd(exportAssignement);
                }
                decreaseIndent();
                writeLine();
                write("});");
            }

            function emitCommonJSModule(node: SourceFile, startIndex: number) {
                emitCaptureThisForNodeIfNecessary(node);
                emitLinesStartingAt(node.statements, startIndex);
                var exportName = resolver.getExportAssignmentName(node);
                if (exportName) {
                    writeLine();
                    var exportAssignement = getFirstExportAssignment(node);
                    emitStart(exportAssignement);
                    write("module.exports = ");
                    emitStart(exportAssignement.exportName);
                    write(exportName);
                    emitEnd(exportAssignement.exportName);
                    write(";");
                    emitEnd(exportAssignement);
                }
            }

            function emitDirectivePrologues(statements: Statement[], startWithNewLine: boolean): number {
                for (var i = 0; i < statements.length; ++i) {
                    if (isPrologueDirective(statements[i])) {
                        if (startWithNewLine || i > 0) {
                            writeLine();
                        }
                        emit(statements[i]);
                    }
                    else {
                        // return index of the first non prologue directive
                        return i;
                    }
                }
                return statements.length;
            }

            function emitSourceFile(node: SourceFile) {
                currentSourceFile = node;
                // emit prologue directives prior to __extends
                var startIndex = emitDirectivePrologues(node.statements, /*startWithNewLine*/ false);
                if (!extendsEmitted && resolver.getNodeCheckFlags(node) & NodeCheckFlags.EmitExtends) {
                    writeLine();
                    write("var __extends = this.__extends || function (d, b) {");
                    increaseIndent();
                    writeLine();
                    write("for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];");
                    writeLine();
                    write("function __() { this.constructor = d; }");
                    writeLine();
                    write("__.prototype = b.prototype;");
                    writeLine();
                    write("d.prototype = new __();");
                    decreaseIndent();
                    writeLine();
                    write("};");
                    extendsEmitted = true;
                }
                if (isExternalModule(node)) {
                    if (compilerOptions.module === ModuleKind.AMD) {
                        emitAMDModule(node, startIndex);
                    }
                    else {
                        emitCommonJSModule(node, startIndex);
                    }
                }
                else {
                    emitCaptureThisForNodeIfNecessary(node);
                    emitLinesStartingAt(node.statements, startIndex);
                }
            }

            function emitNode(node: Node) {
                if (!node || node.flags & NodeFlags.Ambient) return;
                switch (node.kind) {
                    case SyntaxKind.Identifier:
                        return emitIdentifier(<Identifier>node);
                    case SyntaxKind.Parameter:
                        return emitParameter(<ParameterDeclaration>node);
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                        return emitAccessor(<AccessorDeclaration>node);
                    case SyntaxKind.ThisKeyword:
                        return emitThis(node);
                    case SyntaxKind.SuperKeyword:
                        return emitSuper(node);
                    case SyntaxKind.NullKeyword:
                        return write("null");
                    case SyntaxKind.TrueKeyword:
                        return write("true");
                    case SyntaxKind.FalseKeyword:
                        return write("false");
                    case SyntaxKind.NumericLiteral:
                    case SyntaxKind.StringLiteral:
                    case SyntaxKind.RegularExpressionLiteral:
                        return emitLiteral(<LiteralExpression>node);
                    case SyntaxKind.QualifiedName:
                        return emitPropertyAccess(<QualifiedName>node);
                    case SyntaxKind.ArrayLiteral:
                        return emitArrayLiteral(<ArrayLiteral>node);
                    case SyntaxKind.ObjectLiteral:
                        return emitObjectLiteral(<ObjectLiteral>node);
                    case SyntaxKind.PropertyAssignment:
                        return emitPropertyAssignment(<PropertyDeclaration>node);
                    case SyntaxKind.PropertyAccess:
                        return emitPropertyAccess(<PropertyAccess>node);
                    case SyntaxKind.IndexedAccess:
                        return emitIndexedAccess(<IndexedAccess>node);
                    case SyntaxKind.CallExpression:
                        return emitCallExpression(<CallExpression>node);
                    case SyntaxKind.NewExpression:
                        return emitNewExpression(<NewExpression>node);
                    case SyntaxKind.TypeAssertion:
                        return emit((<TypeAssertion>node).operand);
                    case SyntaxKind.ParenExpression:
                        return emitParenExpression(<ParenExpression>node);
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.ArrowFunction:
                        return emitFunctionDeclaration(<FunctionDeclaration>node);
                    case SyntaxKind.PrefixOperator:
                    case SyntaxKind.PostfixOperator:
                        return emitUnaryExpression(<UnaryExpression>node);
                    case SyntaxKind.BinaryExpression:
                        return emitBinaryExpression(<BinaryExpression>node);
                    case SyntaxKind.ConditionalExpression:
                        return emitConditionalExpression(<ConditionalExpression>node);
                    case SyntaxKind.OmittedExpression:
                        return;
                    case SyntaxKind.Block:
                    case SyntaxKind.TryBlock:
                    case SyntaxKind.FinallyBlock:
                    case SyntaxKind.FunctionBlock:
                    case SyntaxKind.ModuleBlock:
                        return emitBlock(<Block>node);
                    case SyntaxKind.VariableStatement:
                        return emitVariableStatement(<VariableStatement>node);
                    case SyntaxKind.EmptyStatement:
                        return write(";");
                    case SyntaxKind.ExpressionStatement:
                        return emitExpressionStatement(<ExpressionStatement>node);
                    case SyntaxKind.IfStatement:
                        return emitIfStatement(<IfStatement>node);
                    case SyntaxKind.DoStatement:
                        return emitDoStatement(<DoStatement>node);
                    case SyntaxKind.WhileStatement:
                        return emitWhileStatement(<WhileStatement>node);
                    case SyntaxKind.ForStatement:
                        return emitForStatement(<ForStatement>node);
                    case SyntaxKind.ForInStatement:
                        return emitForInStatement(<ForInStatement>node);
                    case SyntaxKind.ContinueStatement:
                    case SyntaxKind.BreakStatement:
                        return emitBreakOrContinueStatement(<BreakOrContinueStatement>node);
                    case SyntaxKind.ReturnStatement:
                        return emitReturnStatement(<ReturnStatement>node);
                    case SyntaxKind.WithStatement:
                        return emitWithStatement(<WithStatement>node);
                    case SyntaxKind.SwitchStatement:
                        return emitSwitchStatement(<SwitchStatement>node);
                    case SyntaxKind.CaseClause:
                    case SyntaxKind.DefaultClause:
                        return emitCaseOrDefaultClause(<CaseOrDefaultClause>node);
                    case SyntaxKind.LabelledStatement:
                        return emitLabelledStatement(<LabelledStatement>node);
                    case SyntaxKind.ThrowStatement:
                        return emitThrowStatement(<ThrowStatement>node);
                    case SyntaxKind.TryStatement:
                        return emitTryStatement(<TryStatement>node);
                    case SyntaxKind.CatchBlock:
                        return emitCatchBlock(<CatchBlock>node);
                    case SyntaxKind.DebuggerStatement:
                        return emitDebuggerStatement(node);
                    case SyntaxKind.VariableDeclaration:
                        return emitVariableDeclaration(<VariableDeclaration>node);
                    case SyntaxKind.ClassDeclaration:
                        return emitClassDeclaration(<ClassDeclaration>node);
                    case SyntaxKind.EnumDeclaration:
                        return emitEnumDeclaration(<EnumDeclaration>node);
                    case SyntaxKind.ModuleDeclaration:
                        return emitModuleDeclaration(<ModuleDeclaration>node);
                    case SyntaxKind.ImportDeclaration:
                        return emitImportDeclaration(<ImportDeclaration>node);
                    case SyntaxKind.SourceFile:
                        return emitSourceFile(<SourceFile>node);
                }
            }

            function emitLeadingDeclarationComments(node: Declaration) {
                var leadingComments = getLeadingComments(currentSourceFile.text, node.pos);
                emitComments(leadingComments, writer, writeComment);
            }

            function emitTrailingDeclarationComments(node: Declaration) {
                var trailingComments = getTrailingComments(currentSourceFile.text, node.end);
            }

            if (compilerOptions.sourceMap) {
                initializeEmitterWithSourceMaps();
            }

            if (root) {
                emit(root);
            }
            else {
                forEach(program.getSourceFiles(), sourceFile => {
                    if (!isExternalModuleOrDeclarationFile(sourceFile)) {
                        emit(sourceFile);
                    }
                });
            }

            writeLine();
            writeEmittedFiles(writer.getText(), /*writeByteOrderMark*/ compilerOptions.emitBOM);
        }

        function emitDeclarations(jsFilePath: string, root?: SourceFile) {
            var writer = createTextWriter(writeSymbol);
            var write = writer.write;
            var writeLine = writer.writeLine;
            var increaseIndent = writer.increaseIndent;
            var decreaseIndent = writer.decreaseIndent;

            var enclosingDeclaration: Node;
            var reportedDeclarationError = false;

            var emitJsDocComments = compilerOptions.removeComments ? function (declaration: Declaration) { } : writeJsDocComments;

            var aliasDeclarationEmitInfo: {
                declaration: ImportDeclaration;
                outputPos: number;
                indent: number;
                asynchronousOutput?: string; // If the output for alias was written asynchronously, the corresponding output
            }[] = [];

            var getSymbolVisibilityDiagnosticMessage: (symbolAccesibilityResult: SymbolAccessiblityResult) => {
                errorNode: Node;
                diagnosticMessage: DiagnosticMessage;
                typeName?: Identifier
            }

            function writeAsychronousImportDeclarations(importDeclarations: ImportDeclaration[]) {
                var oldWriter = writer;
                forEach(importDeclarations, aliasToWrite => {
                    var aliasEmitInfo = forEach(aliasDeclarationEmitInfo, declEmitInfo => declEmitInfo.declaration === aliasToWrite ? declEmitInfo : undefined);
                    writer = createTextWriter(writeSymbol);
                    for (var declarationIndent = aliasEmitInfo.indent; declarationIndent; declarationIndent--) {
                        writer.increaseIndent();
                    }

                    writeImportDeclaration(aliasToWrite);
                    aliasEmitInfo.asynchronousOutput = writer.getText();
                });
                writer = oldWriter;
            }

            function writeSymbol(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags) {
                var symbolAccesibilityResult = resolver.isSymbolAccessible(symbol, enclosingDeclaration, meaning);
                if (symbolAccesibilityResult.accessibility === SymbolAccessibility.Accessible) {
                    resolver.writeSymbol(symbol, enclosingDeclaration, meaning, writer);

                    // write the aliases
                    if (symbolAccesibilityResult && symbolAccesibilityResult.aliasesToMakeVisible) {
                        writeAsychronousImportDeclarations(symbolAccesibilityResult.aliasesToMakeVisible);
                    }
                }
                else {
                    // Report error
                    reportedDeclarationError = true;
                    var errorInfo = getSymbolVisibilityDiagnosticMessage(symbolAccesibilityResult);
                    if (errorInfo) {
                        if (errorInfo.typeName) {
                            diagnostics.push(createDiagnosticForNode(errorInfo.errorNode,
                                errorInfo.diagnosticMessage,
                                getSourceTextOfLocalNode(errorInfo.typeName),
                                symbolAccesibilityResult.errorSymbolName,
                                symbolAccesibilityResult.errorModuleName));
                        }
                        else {
                            diagnostics.push(createDiagnosticForNode(errorInfo.errorNode,
                                errorInfo.diagnosticMessage,
                                symbolAccesibilityResult.errorSymbolName,
                                symbolAccesibilityResult.errorModuleName));
                        }
                    }
                }
            }

            function emitLines(nodes: Node[]) {
                for (var i = 0, n = nodes.length; i < n; i++) {
                    emitNode(nodes[i]);
                }
            }

            function emitCommaList(nodes: Node[], eachNodeEmitFn: (node: Node) => void) {
                var currentWriterPos = writer.getTextPos();
                for (var i = 0, n = nodes.length; i < n; i++) {
                    if (currentWriterPos !== writer.getTextPos()) {
                        write(", ");
                    }
                    currentWriterPos = writer.getTextPos();
                    eachNodeEmitFn(nodes[i]);
                }
            }

            function writeJsDocComments(declaration: Declaration) {
                var jsDocComments = getJsDocComments(declaration, currentSourceFile);
                emitComments(jsDocComments, writer, writeCommentRange);
            }

            function emitSourceTextOfNode(node: Node) {
                write(getSourceTextOfLocalNode(node));
            }

            function emitSourceFile(node: SourceFile) {
                currentSourceFile = node;
                enclosingDeclaration = node;
                emitLines(node.statements);
            }

            function emitExportAssignment(node: ExportAssignment) {
                write("export = ");
                emitSourceTextOfNode(node.exportName);
                write(";");
                writeLine();
            }

            function emitDeclarationFlags(node: Declaration) {
                if (node.flags & NodeFlags.Static) {
                    if (node.flags & NodeFlags.Private) {
                        write("private ");
                    }
                    write("static ");
                }
                else {
                    if (node.flags & NodeFlags.Private) {
                        write("private ");
                    }
                    // If the node is parented in the current source file we need to emit export declare or just export
                    else if (node.parent === currentSourceFile) {
                        // If the node is exported 
                        if (node.flags & NodeFlags.Export) {
                            write("export ");
                        }

                        if (node.kind !== SyntaxKind.InterfaceDeclaration) {
                            write("declare ");
                        }
                    }
                }
            }

            function emitImportDeclaration(node: ImportDeclaration) {
                var nodeEmitInfo = {
                    declaration: node,
                    outputPos: writer.getTextPos(),
                    indent: writer.getIndent(),
                    hasWritten: resolver.isDeclarationVisible(node)
                };
                aliasDeclarationEmitInfo.push(nodeEmitInfo);
                if (nodeEmitInfo.hasWritten) {
                    writeImportDeclaration(node);
                }
            }

            function writeImportDeclaration(node: ImportDeclaration) {
                // note usage of writer. methods instead of aliases created, just to make sure we are using 
                // correct writer especially to handle asynchronous alias writing
                emitJsDocComments(node);
                if (node.flags & NodeFlags.Export) {
                    writer.write("export ");
                }
                writer.write("import ");
                writer.write(getSourceTextOfLocalNode(node.name));
                writer.write(" = ");
                if (node.entityName) {
                    checkEntityNameAccessible();
                    writer.write(getSourceTextOfLocalNode(node.entityName));
                    writer.write(";");
                }
                else {
                    writer.write("require(");
                    writer.write(getSourceTextOfLocalNode(node.externalModuleName));
                    writer.write(");");
                }
                writer.writeLine();

                function checkEntityNameAccessible() {
                    var symbolAccesibilityResult = resolver.isImportDeclarationEntityNameReferenceDeclarationVisibile(node.entityName);
                    if (symbolAccesibilityResult.accessibility === SymbolAccessibility.Accessible) {
                        // write the aliases
                        if (symbolAccesibilityResult.aliasesToMakeVisible) {
                            writeAsychronousImportDeclarations(symbolAccesibilityResult.aliasesToMakeVisible);
                        }
                    }
                    else {
                        // Report error
                        reportedDeclarationError = true;
                        diagnostics.push(createDiagnosticForNode(node,
                            Diagnostics.Import_declaration_0_is_using_private_name_1,
                            getSourceTextOfLocalNode(node.name),
                            symbolAccesibilityResult.errorSymbolName));
                    }
                }
            }

            function emitModuleDeclaration(node: ModuleDeclaration) {
                if (resolver.isDeclarationVisible(node)) {
                    emitJsDocComments(node);
                    emitDeclarationFlags(node);
                    write("module ");
                    emitSourceTextOfNode(node.name);
                    while (node.body.kind !== SyntaxKind.ModuleBlock) {
                        node = <ModuleDeclaration>node.body;
                        write(".");
                        emitSourceTextOfNode(node.name);
                    }
                    var prevEnclosingDeclaration = enclosingDeclaration;
                    enclosingDeclaration = node;
                    write(" {");
                    writeLine();
                    increaseIndent();
                    emitLines((<Block>node.body).statements);
                    decreaseIndent();
                    write("}");
                    writeLine();
                    enclosingDeclaration = prevEnclosingDeclaration;
                }
            }

            function emitEnumDeclaration(node: EnumDeclaration) {
                if (resolver.isDeclarationVisible(node)) {
                    emitJsDocComments(node);
                    emitDeclarationFlags(node);
                    write("enum ");
                    emitSourceTextOfNode(node.name);
                    write(" {");
                    writeLine();
                    increaseIndent();
                    emitLines(node.members);
                    decreaseIndent();
                    write("}");
                    writeLine();
                }
            }

            function emitEnumMemberDeclaration(node: EnumMember) {
                emitSourceTextOfNode(node.name);
                var enumMemberValue = resolver.getEnumMemberValue(node);
                if (enumMemberValue !== undefined) {
                    write(" = ");
                    write(enumMemberValue.toString());
                }
                write(",");
                writeLine();
            }

            function emitTypeParameters(typeParameters: TypeParameterDeclaration[]) {
                function emitTypeParameter(node: TypeParameterDeclaration) {
                    function getTypeParameterConstraintVisibilityError(symbolAccesibilityResult: SymbolAccessiblityResult) {
                        // Type parameter constraints are named by user so we should always be able to name it
                        var diagnosticMessage: DiagnosticMessage;
                        switch (node.parent.kind) {
                            case SyntaxKind.ClassDeclaration:
                                diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                                Diagnostics.Type_parameter_0_of_exported_class_has_or_is_using_name_1_from_private_module_2 :
                                Diagnostics.Type_parameter_0_of_exported_class_has_or_is_using_private_name_1;
                                break;

                            case SyntaxKind.InterfaceDeclaration:
                                diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                                Diagnostics.Type_parameter_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                                Diagnostics.Type_parameter_0_of_exported_interface_has_or_is_using_private_name_1;
                                break;

                            case SyntaxKind.ConstructSignature:
                                diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                                Diagnostics.Type_parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                                Diagnostics.Type_parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1;
                                break;

                            case SyntaxKind.CallSignature:
                                diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                                Diagnostics.Type_parameter_0_of_call_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                                Diagnostics.Type_parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1;
                                break;

                            case SyntaxKind.Method:
                                if (node.parent.flags & NodeFlags.Static) {
                                    diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                                    Diagnostics.Type_parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_private_module_2 :
                                    Diagnostics.Type_parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1;
                                }
                                else if (node.parent.parent.kind === SyntaxKind.ClassDeclaration) {
                                    diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                                    Diagnostics.Type_parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_private_module_2 :
                                    Diagnostics.Type_parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1;
                                }
                                else {
                                    diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                                    Diagnostics.Type_parameter_0_of_method_from_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                                    Diagnostics.Type_parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1;
                                }
                                break;

                            case SyntaxKind.FunctionDeclaration:
                                diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                                Diagnostics.Type_parameter_0_of_exported_function_has_or_is_using_name_1_from_private_module_2 :
                                Diagnostics.Type_parameter_0_of_exported_function_has_or_is_using_private_name_1;
                                break;

                            default:
                                Debug.fail("This is unknown parent for type parameter: " + SyntaxKind[node.parent.kind]);
                        }

                        return {
                            diagnosticMessage: diagnosticMessage,
                            errorNode: node,
                            typeName: node.name
                        };
                    }

                    emitSourceTextOfNode(node.name);
                    // If there is constraint present and this is not a type parameter of the private method emit the constraint
                    if (node.constraint && (node.parent.kind !== SyntaxKind.Method || !(node.parent.flags & NodeFlags.Private))) {
                        write(" extends ");
                        getSymbolVisibilityDiagnosticMessage = getTypeParameterConstraintVisibilityError;
                        resolver.writeTypeAtLocation(node.constraint, enclosingDeclaration, TypeFormatFlags.UseTypeOfFunction, writer);
                    }
                }

                if (typeParameters) {
                    write("<");
                    emitCommaList(typeParameters, emitTypeParameter);
                    write(">");
                }
            }

            function emitHeritageClause(typeReferences: TypeReferenceNode[], isImplementsList: boolean) {
                if (typeReferences) {
                    write(isImplementsList ? " implements " : " extends ");
                    emitCommaList(typeReferences, emitTypeOfTypeReference);
                }

                function emitTypeOfTypeReference(node: Node) {
                    getSymbolVisibilityDiagnosticMessage = getHeritageClauseVisibilityError;
                    resolver.writeTypeAtLocation(node, enclosingDeclaration, TypeFormatFlags.WriteArrayAsGenericType | TypeFormatFlags.UseTypeOfFunction, writer);

                    function getHeritageClauseVisibilityError(symbolAccesibilityResult: SymbolAccessiblityResult) {
                        var diagnosticMessage: DiagnosticMessage;
                        // Heritage clause is written by user so it can always be named
                        if (node.parent.kind === SyntaxKind.ClassDeclaration) {
                            // Class
                            if (symbolAccesibilityResult.errorModuleName) {
                                // Module is inaccessible
                                diagnosticMessage = isImplementsList ?
                                Diagnostics.Implements_clause_of_exported_class_0_has_or_is_using_name_1_from_private_module_2 :
                                Diagnostics.Extends_clause_of_exported_class_0_has_or_is_using_name_1_from_private_module_2;
                            }
                            else {
                                // Class or Interface implemented/extended is inaccessible
                                diagnosticMessage = isImplementsList ?
                                Diagnostics.Implements_clause_of_exported_class_0_has_or_is_using_private_name_1 :
                                Diagnostics.Extends_clause_of_exported_class_0_has_or_is_using_private_name_1;
                            }
                        }
                        else {
                            if (symbolAccesibilityResult.errorModuleName) {
                                // Module is inaccessible
                                diagnosticMessage = Diagnostics.Extends_clause_of_exported_interface_0_has_or_is_using_name_1_from_private_module_2;
                            }
                            else {
                                // interface is inaccessible
                                diagnosticMessage = Diagnostics.Extends_clause_of_exported_interface_0_has_or_is_using_private_name_1;
                            }
                        }

                        return {
                            diagnosticMessage: diagnosticMessage,
                            errorNode: node,
                            typeName: (<Declaration>node.parent).name
                        };
                    }
                }
            }

            function emitClassDeclaration(node: ClassDeclaration) {
                function emitParameterProperties(constructorDeclaration: ConstructorDeclaration) {
                    if (constructorDeclaration) {
                        forEach(constructorDeclaration.parameters, param => {
                            if (param.flags & (NodeFlags.Public | NodeFlags.Private)) {
                                emitPropertyDeclaration(param);
                            }
                        });
                    }
                }

                if (resolver.isDeclarationVisible(node)) {
                    emitDeclarationFlags(node);
                    write("class ");
                    emitSourceTextOfNode(node.name);
                    var prevEnclosingDeclaration = enclosingDeclaration;
                    enclosingDeclaration = node;
                    emitTypeParameters(node.typeParameters);
                    if (node.baseType) {
                        emitHeritageClause([node.baseType], /*isImplementsList*/ false);
                    }
                    emitHeritageClause(node.implementedTypes, /*isImplementsList*/ true);
                    write(" {");
                    writeLine();
                    increaseIndent();
                    emitParameterProperties(getFirstConstructorWithBody(node));
                    emitLines(node.members);
                    decreaseIndent();
                    write("}");
                    writeLine();
                    enclosingDeclaration = prevEnclosingDeclaration;
                }
            }

            function emitInterfaceDeclaration(node: InterfaceDeclaration) {
                if (resolver.isDeclarationVisible(node)) {
                    emitDeclarationFlags(node);
                    write("interface ");
                    emitSourceTextOfNode(node.name);
                    var prevEnclosingDeclaration = enclosingDeclaration;
                    enclosingDeclaration = node;
                    emitTypeParameters(node.typeParameters);
                    emitHeritageClause(node.baseTypes, /*isImplementsList*/ false);
                    write(" {");
                    writeLine();
                    increaseIndent();
                    emitLines(node.members);
                    decreaseIndent();
                    write("}");
                    writeLine();
                    enclosingDeclaration = prevEnclosingDeclaration;
                }
            }

            function emitPropertyDeclaration(node: PropertyDeclaration) {
                emitDeclarationFlags(node);
                emitVariableDeclaration(node);
                write(";");
                writeLine();
            }

            function emitVariableDeclaration(node: VariableDeclaration) {
                // If we are emitting property it isnt moduleElement and hence we already know it needs to be emitted
                // so there is no check needed to see if declaration is visible
                if (node.kind !== SyntaxKind.VariableDeclaration || resolver.isDeclarationVisible(node)) {
                    emitSourceTextOfNode(node.name);
                    // If optional property emit ?
                    if (node.kind === SyntaxKind.Property && (node.flags & NodeFlags.QuestionMark)) {
                        write("?");
                    }
                    if (!(node.flags & NodeFlags.Private)) {
                        write(": ");
                        getSymbolVisibilityDiagnosticMessage = getVariableDeclarationTypeVisibilityError;
                        resolver.writeTypeAtLocation(node, enclosingDeclaration, TypeFormatFlags.UseTypeOfFunction, writer);
                    }
                }

                function getVariableDeclarationTypeVisibilityError(symbolAccesibilityResult: SymbolAccessiblityResult) {
                    var diagnosticMessage: DiagnosticMessage;
                    if (node.kind === SyntaxKind.VariableDeclaration) {
                        diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                        symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                        Diagnostics.Exported_variable_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                        Diagnostics.Exported_variable_0_has_or_is_using_name_1_from_private_module_2 :
                        Diagnostics.Exported_variable_0_has_or_is_using_private_name_1;
                    }
                    // This check is to ensure we dont report error on constructor parameter property as that error would be reported during parameter emit
                    else if (node.kind === SyntaxKind.Property) {
                        if (node.flags & NodeFlags.Static) {
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                            symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                            Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                            Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_private_name_1;
                        }
                        else if (node.parent.kind === SyntaxKind.ClassDeclaration) {
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                            symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                            Diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                            Diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Public_property_0_of_exported_class_has_or_is_using_private_name_1;
                        }
                        else {
                            // Interfaces cannot have types that cannot be named
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                            Diagnostics.Property_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Property_0_of_exported_interface_has_or_is_using_private_name_1;
                        }
                    }

                    return diagnosticMessage !== undefined ? {
                        diagnosticMessage: diagnosticMessage,
                        errorNode: node,
                        typeName: node.name
                    } : undefined;
                }
            }

            function emitVariableStatement(node: VariableStatement) {
                var hasDeclarationWithEmit = forEach(node.declarations, varDeclaration => resolver.isDeclarationVisible(varDeclaration));
                if (hasDeclarationWithEmit) {
                    emitDeclarationFlags(node);
                    write("var ");
                    emitCommaList(node.declarations, emitVariableDeclaration);
                    write(";");
                    writeLine();
                }
            }

            function emitAccessorDeclaration(node: AccessorDeclaration) {
                var accessors = getAllAccessorDeclarations(<ClassDeclaration>node.parent, node);
                if (node === accessors.firstAccessor) {
                    emitDeclarationFlags(node);
                    emitSourceTextOfNode(node.name);
                    if (!(node.flags & NodeFlags.Private)) {
                        write(": ");
                        getSymbolVisibilityDiagnosticMessage = getAccessorDeclarationTypeVisibilityError;
                        resolver.writeTypeAtLocation(node, enclosingDeclaration, TypeFormatFlags.UseTypeOfFunction, writer);
                    }
                    write(";");
                    writeLine();
                }

                function getAccessorDeclarationTypeVisibilityError(symbolAccesibilityResult: SymbolAccessiblityResult) {
                    var diagnosticMessage: DiagnosticMessage;
                    if (node.kind === SyntaxKind.SetAccessor) {
                        // Setters have to have type named and cannot infer it so, the type should always be named
                        if (node.parent.flags & NodeFlags.Static) {
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                            Diagnostics.Parameter_0_of_public_static_property_setter_from_exported_class_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Parameter_0_of_public_static_property_setter_from_exported_class_has_or_is_using_private_name_1;
                        }
                        else {
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                            Diagnostics.Parameter_0_of_public_property_setter_from_exported_class_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Parameter_0_of_public_property_setter_from_exported_class_has_or_is_using_private_name_1;
                        }
                        return {
                            diagnosticMessage: diagnosticMessage,
                            errorNode: node.parameters[0],
                            typeName: node.name
                        };
                    }
                    else {
                        if (node.flags & NodeFlags.Static) {
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                            symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                            Diagnostics.Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named :
                            Diagnostics.Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_name_0_from_private_module_1 :
                            Diagnostics.Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_private_name_0;
                        }
                        else {
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                            symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                            Diagnostics.Return_type_of_public_property_getter_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named :
                            Diagnostics.Return_type_of_public_property_getter_from_exported_class_has_or_is_using_name_0_from_private_module_1 :
                            Diagnostics.Return_type_of_public_property_getter_from_exported_class_has_or_is_using_private_name_0;
                        }
                        return {
                            diagnosticMessage: diagnosticMessage,
                            errorNode: node.name,
                            typeName: undefined
                        };
                    }
                }
            }

            function emitFunctionDeclaration(node: FunctionDeclaration) {
                // If we are emitting Method/Constructor it isnt moduleElement and hence already determined to be emitting
                // so no need to verify if the declaration is visible
                if ((node.kind !== SyntaxKind.FunctionDeclaration || resolver.isDeclarationVisible(node)) &&
                    !resolver.isImplementationOfOverload(node)) {
                    emitDeclarationFlags(node);
                    if (node.kind === SyntaxKind.FunctionDeclaration) {
                        write("function ");
                        emitSourceTextOfNode(node.name);
                    }
                    else if (node.kind === SyntaxKind.Constructor) {
                        write("constructor");
                    }
                    else {
                        emitSourceTextOfNode(node.name);
                        if (node.flags & NodeFlags.QuestionMark) {
                            write("?");
                        }
                    }
                    emitSignatureDeclaration(node);
                }
            }

            function emitConstructSignatureDeclaration(node: SignatureDeclaration) {
                write("new ");
                emitSignatureDeclaration(node);
            }

            function emitSignatureDeclaration(node: SignatureDeclaration) {
                emitTypeParameters(node.typeParameters);
                if (node.kind === SyntaxKind.IndexSignature) {
                    write("[");
                }
                else {
                    write("(");
                }

                // Parameters
                emitCommaList(node.parameters, emitParameterDeclaration);

                if (node.kind === SyntaxKind.IndexSignature) {
                    write("]");
                }
                else {
                    write(")");
                }

                // If this is not a constructor and is not private, emit the return type
                if (node.kind !== SyntaxKind.Constructor && !(node.flags & NodeFlags.Private)) {
                    write(": ");
                    getSymbolVisibilityDiagnosticMessage = getReturnTypeVisibilityError;
                    resolver.writeReturnTypeOfSignatureDeclaration(node, enclosingDeclaration, TypeFormatFlags.UseTypeOfFunction, writer);
                }
                write(";");
                writeLine();

                function getReturnTypeVisibilityError(symbolAccesibilityResult: SymbolAccessiblityResult) {
                    var diagnosticMessage: DiagnosticMessage;
                    switch (node.kind) {
                        case SyntaxKind.ConstructSignature:
                            // Interfaces cannot have return types that cannot be named
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ? 
                            Diagnostics.Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1 :
                            Diagnostics.Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_0;
                            break;

                        case SyntaxKind.CallSignature:
                            // Interfaces cannot have return types that cannot be named
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                            Diagnostics.Return_type_of_call_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1 :
                            Diagnostics.Return_type_of_call_signature_from_exported_interface_has_or_is_using_private_name_0;
                            break;

                        case SyntaxKind.IndexSignature:
                            // Interfaces cannot have return types that cannot be named
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                            Diagnostics.Return_type_of_index_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1 :
                            Diagnostics.Return_type_of_index_signature_from_exported_interface_has_or_is_using_private_name_0;
                            break;

                        case SyntaxKind.Method:
                            if (node.flags & NodeFlags.Static) {
                                diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                                symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                                Diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named :
                                Diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_private_module_1 :
                                Diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_private_name_0;
                            }
                            else if (node.parent.kind === SyntaxKind.ClassDeclaration) {
                                diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                                symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                                Diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named :
                                Diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_private_module_1 :
                                Diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_private_name_0;
                            }
                            else {
                                // Interfaces cannot have return types that cannot be named
                                diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                                Diagnostics.Return_type_of_method_from_exported_interface_has_or_is_using_name_0_from_private_module_1 :
                                Diagnostics.Return_type_of_method_from_exported_interface_has_or_is_using_private_name_0;
                            }
                            break;

                        case SyntaxKind.FunctionDeclaration:
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                            symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                            Diagnostics.Return_type_of_exported_function_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named :
                            Diagnostics.Return_type_of_exported_function_has_or_is_using_name_0_from_private_module_1 :
                            Diagnostics.Return_type_of_exported_function_has_or_is_using_private_name_0;
                            break;

                        default:
                            Debug.fail("This is unknown kind for signature: " + SyntaxKind[node.kind]);
                    }

                    return {
                        diagnosticMessage: diagnosticMessage,
                        errorNode: <Node>node.name || node,
                    };
                }
            }

            function emitParameterDeclaration(node: ParameterDeclaration) {
                if (node.flags & NodeFlags.Rest) {
                    write("...");
                }
                emitSourceTextOfNode(node.name);
                if (node.initializer || (node.flags & NodeFlags.QuestionMark)) {
                    write("?");
                }

                if (!(node.parent.flags & NodeFlags.Private)) {
                    write(": ");
                    getSymbolVisibilityDiagnosticMessage = getParameterDeclarationTypeVisibilityError;
                    resolver.writeTypeAtLocation(node, enclosingDeclaration, TypeFormatFlags.UseTypeOfFunction, writer);
                }

                function getParameterDeclarationTypeVisibilityError(symbolAccesibilityResult: SymbolAccessiblityResult) {
                    var diagnosticMessage: DiagnosticMessage;
                    switch (node.parent.kind) {
                        case SyntaxKind.Constructor:
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                            symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                            Diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                            Diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_private_name_1;
                            break;

                        case SyntaxKind.ConstructSignature:
                            // Interfaces cannot have parameter types that cannot be named
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                            Diagnostics.Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1;
                            break;

                        case SyntaxKind.CallSignature:
                            // Interfaces cannot have parameter types that cannot be named
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                            Diagnostics.Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1;
                            break;

                        case SyntaxKind.Method:
                            if (node.parent.flags & NodeFlags.Static) {
                                diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                                symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                                Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                                Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_private_module_2 :
                                Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1;
                            }
                            else if (node.parent.parent.kind === SyntaxKind.ClassDeclaration) {
                                diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                                symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                                Diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                                Diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_private_module_2 :
                                Diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1;
                            }
                            else {
                                // Interfaces cannot have parameter types that cannot be named
                                diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                                Diagnostics.Parameter_0_of_method_from_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                                Diagnostics.Parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1;
                            }
                            break;

                        case SyntaxKind.FunctionDeclaration:
                            diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                            symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                            Diagnostics.Parameter_0_of_exported_function_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                            Diagnostics.Parameter_0_of_exported_function_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Parameter_0_of_exported_function_has_or_is_using_private_name_1;
                            break;

                        default:
                            Debug.fail("This is unknown parent for parameter: " + SyntaxKind[node.parent.kind]);
                    }

                    return {
                        diagnosticMessage: diagnosticMessage,
                        errorNode: node,
                        typeName: node.name
                    };
                }
            }

            function emitNode(node: Node) {
                switch (node.kind) {
                    case SyntaxKind.Constructor:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.Method:
                        return emitFunctionDeclaration(<FunctionDeclaration>node);
                    case SyntaxKind.ConstructSignature:
                        return emitConstructSignatureDeclaration(<SignatureDeclaration>node);
                    case SyntaxKind.CallSignature:
                    case SyntaxKind.IndexSignature:
                        return emitSignatureDeclaration(<SignatureDeclaration>node);
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                        return emitAccessorDeclaration(<AccessorDeclaration>node);
                    case SyntaxKind.VariableStatement:
                        return emitVariableStatement(<VariableStatement>node);
                    case SyntaxKind.Property:
                        return emitPropertyDeclaration(<PropertyDeclaration>node);
                    case SyntaxKind.InterfaceDeclaration:
                        return emitInterfaceDeclaration(<InterfaceDeclaration>node);
                    case SyntaxKind.ClassDeclaration:
                        return emitClassDeclaration(<ClassDeclaration>node);
                    case SyntaxKind.EnumMember:
                        return emitEnumMemberDeclaration(<EnumMember>node);
                    case SyntaxKind.EnumDeclaration:
                        return emitEnumDeclaration(<EnumDeclaration>node);
                    case SyntaxKind.ModuleDeclaration:
                        return emitModuleDeclaration(<ModuleDeclaration>node);
                    case SyntaxKind.ImportDeclaration:
                        return emitImportDeclaration(<ImportDeclaration>node);
                    case SyntaxKind.ExportAssignment:
                        return emitExportAssignment(<ExportAssignment>node);
                    case SyntaxKind.SourceFile:
                        return emitSourceFile(<SourceFile>node);
                }
            }

            function resolveScriptReference(sourceFile: SourceFile, reference: FileReference) {
                var referenceFileName = compilerOptions.noResolve
                    ? reference.filename
                    : normalizePath(combinePaths(getDirectoryPath(sourceFile.filename), reference.filename));
                return program.getSourceFile(referenceFileName);
            }

            // Contains the reference paths that needs to go in the declaration file. 
            // Collecting this separately because reference paths need to be first thing in the declaration file 
            // and we could be collecting these paths from multiple files into single one with --out option
            var referencePathsOutput = "";
            function writeReferencePath(referencedFile: SourceFile) {
                var declFileName = referencedFile.flags & NodeFlags.DeclarationFile
                    ? referencedFile.filename // Declaration file, use declaration file name
                    : shouldEmitToOwnFile(referencedFile)
                    ? getOwnEmitOutputFilePath(referencedFile, ".d.ts") // Own output file so get the .d.ts file
                    : getModuleNameFromFilename(compilerOptions.out) + ".d.ts";// Global out file

                declFileName = getRelativePathToDirectoryOrUrl(
                    getDirectoryPath(normalizeSlashes(jsFilePath)),
                    declFileName,
                    compilerHost.getCurrentDirectory(),
                /*isAbsolutePathAnUrl*/ false);

                referencePathsOutput += "/// <reference path='" + declFileName + "' />" + newLine;
            }

            if (root) {
                // Emiting single file so emit references in this file only
                var addedGlobalFileReference = false;
                forEach(root.referencedFiles, fileReference => {
                    var referencedFile = resolveScriptReference(root, fileReference);

                    // All the references that are not going to be part of same file
                    if ((referencedFile.flags & NodeFlags.DeclarationFile) || // This is a declare file reference
                        shouldEmitToOwnFile(referencedFile) || // This is referenced file is emitting its own js file
                        !addedGlobalFileReference) { // Or the global out file corresponding to this reference was not added

                        writeReferencePath(referencedFile);
                        if (!isExternalModuleOrDeclarationFile(referencedFile)) {
                            addedGlobalFileReference = true;
                        }
                    }
                });

                emitNode(root);
            }
            else {
                // Emit references corresponding to this file
                var emittedReferencedFiles: SourceFile[] = [];
                forEach(program.getSourceFiles(), sourceFile => {
                    if (!isExternalModuleOrDeclarationFile(sourceFile)) {
                        // Check what references need to be added
                        forEach(sourceFile.referencedFiles, fileReference => {
                            var referencedFile = resolveScriptReference(sourceFile, fileReference);

                            // If the reference file is declaration file or external module emit that reference
                            if (isExternalModuleOrDeclarationFile(referencedFile) &&
                                !contains(emittedReferencedFiles, referencedFile)) { // If the file refernece was not already emitted

                                writeReferencePath(referencedFile);
                                emittedReferencedFiles.push(referencedFile);
                            }
                        });

                        emitNode(sourceFile);
                    }
                });
            }

            // TODO(shkamat): Should we not write any declaration file if any of them can produce error, 
            // or should we just not write this file like we are doing now
            if (!reportedDeclarationError) {
                var declarationOutput = referencePathsOutput;
                var synchronousDeclarationOutput = writer.getText();
                // apply additions
                var appliedSyncOutputPos = 0;
                forEach(aliasDeclarationEmitInfo, aliasEmitInfo => {
                    if (aliasEmitInfo.asynchronousOutput) {
                        declarationOutput += synchronousDeclarationOutput.substring(appliedSyncOutputPos, aliasEmitInfo.outputPos);
                        declarationOutput += aliasEmitInfo.asynchronousOutput;
                        appliedSyncOutputPos = aliasEmitInfo.outputPos;
                    }
                });
                declarationOutput += synchronousDeclarationOutput.substring(appliedSyncOutputPos);
                writeFile(getModuleNameFromFilename(jsFilePath) + ".d.ts", declarationOutput, compilerOptions.emitBOM);
            }
        }

        var shouldEmitDeclarations = resolver.shouldEmitDeclarations();
        function emitFile(jsFilePath: string, sourceFile?: SourceFile) {
            emitJavaScript(jsFilePath, sourceFile);
            if (shouldEmitDeclarations) {
                emitDeclarations(jsFilePath, sourceFile);
            }
        }

        forEach(program.getSourceFiles(), sourceFile => {
            if (shouldEmitToOwnFile(sourceFile)) {
                var jsFilePath = getOwnEmitOutputFilePath(sourceFile, ".js");
                emitFile(jsFilePath, sourceFile);
            }
        });
        if (compilerOptions.out) {
            emitFile(compilerOptions.out);
        }

        // Sort and make the unique list of diagnostics
        diagnostics.sort(compareDiagnostics);
        diagnostics = deduplicateSortedDiagnostics(diagnostics);

        return {
            errors: diagnostics,
            sourceMaps: sourceMapDataList
        };
    }
}
