/// <reference path="checker.ts"/>
/// <reference path="declarationEmitter.ts"/>
/* @internal */
var ts;
(function (ts) {
    function isExternalModuleOrDeclarationFile(sourceFile) {
        return ts.isExternalModule(sourceFile) || ts.isDeclarationFile(sourceFile);
    }
    ts.isExternalModuleOrDeclarationFile = isExternalModuleOrDeclarationFile;
    // targetSourceFile is when users only want one file in entire project to be emitted. This is used in compileOnSave feature
    function emitFiles(resolver, host, targetSourceFile) {
        // emit output for the __extends helper function
        var extendsHelper = "\nvar __extends = this.__extends || function (d, b) {\n    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];\n    function __() { this.constructor = d; }\n    __.prototype = b.prototype;\n    d.prototype = new __();\n};";
        // emit output for the __decorate helper function
        var decorateHelper = "\nvar __decorate = this.__decorate || (typeof Reflect === \"object\" && Reflect.decorate) || function (decorators, target, key, desc) {\n    switch (arguments.length) {\n        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);\n        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);\n        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);\n    }\n};";
        // emit output for the __metadata helper function
        var metadataHelper = "\nvar __metadata = this.__metadata || (typeof Reflect === \"object\" && Reflect.metadata) || function () { };";
        // emit output for the __param helper function
        var paramHelper = "\nvar __param = this.__param || function(index, decorator) { return function (target, key) { decorator(target, key, index); } };";
        var compilerOptions = host.getCompilerOptions();
        var languageVersion = compilerOptions.target || 0 /* ES3 */;
        var sourceMapDataList = compilerOptions.sourceMap ? [] : undefined;
        var diagnostics = [];
        var newLine = host.getNewLine();
        if (targetSourceFile === undefined) {
            ts.forEach(host.getSourceFiles(), function (sourceFile) {
                if (ts.shouldEmitToOwnFile(sourceFile, compilerOptions)) {
                    var jsFilePath = ts.getOwnEmitOutputFilePath(sourceFile, host, ".js");
                    emitFile(jsFilePath, sourceFile);
                }
            });
            if (compilerOptions.out) {
                emitFile(compilerOptions.out);
            }
        }
        else {
            // targetSourceFile is specified (e.g calling emitter from language service or calling getSemanticDiagnostic from language service)
            if (ts.shouldEmitToOwnFile(targetSourceFile, compilerOptions)) {
                var jsFilePath = ts.getOwnEmitOutputFilePath(targetSourceFile, host, ".js");
                emitFile(jsFilePath, targetSourceFile);
            }
            else if (!ts.isDeclarationFile(targetSourceFile) && compilerOptions.out) {
                emitFile(compilerOptions.out);
            }
        }
        // Sort and make the unique list of diagnostics
        diagnostics = ts.sortAndDeduplicateDiagnostics(diagnostics);
        return {
            emitSkipped: false,
            diagnostics: diagnostics,
            sourceMaps: sourceMapDataList
        };
        function isNodeDescendentOf(node, ancestor) {
            while (node) {
                if (node === ancestor)
                    return true;
                node = node.parent;
            }
            return false;
        }
        function isUniqueLocalName(name, container) {
            for (var node = container; isNodeDescendentOf(node, container); node = node.nextContainer) {
                if (node.locals && ts.hasProperty(node.locals, name)) {
                    // We conservatively include alias symbols to cover cases where they're emitted as locals
                    if (node.locals[name].flags & (107455 /* Value */ | 1048576 /* ExportValue */ | 8388608 /* Alias */)) {
                        return false;
                    }
                }
            }
            return true;
        }
        function emitJavaScript(jsFilePath, root) {
            var writer = ts.createTextWriter(newLine);
            var write = writer.write;
            var writeTextOfNode = writer.writeTextOfNode;
            var writeLine = writer.writeLine;
            var increaseIndent = writer.increaseIndent;
            var decreaseIndent = writer.decreaseIndent;
            var currentSourceFile;
            // name of an exporter function if file is a System external module
            // System.register([...], function (<exporter>) {...})
            // exporting in System modules looks like:
            // export var x; ... x = 1
            // =>
            // var x;... exporter("x", x = 1)
            var exportFunctionForFile;
            var generatedNameSet = {};
            var nodeToGeneratedName = [];
            var blockScopedVariableToGeneratedName;
            var computedPropertyNamesToGeneratedNames;
            var extendsEmitted = false;
            var decorateEmitted = false;
            var paramEmitted = false;
            var tempFlags = 0;
            var tempVariables;
            var tempParameters;
            var externalImports;
            var exportSpecifiers;
            var exportEquals;
            var hasExportStars;
            /** write emitted output to disk*/
            var writeEmittedFiles = writeJavaScriptFile;
            var detachedCommentsInfo;
            var writeComment = ts.writeCommentRange;
            /** Emit a node */
            var emit = emitNodeWithoutSourceMap;
            /** Called just before starting emit of a node */
            var emitStart = function (node) { };
            /** Called once the emit of the node is done */
            var emitEnd = function (node) { };
            /** Emit the text for the given token that comes after startPos
              * This by default writes the text provided with the given tokenKind
              * but if optional emitFn callback is provided the text is emitted using the callback instead of default text
              * @param tokenKind the kind of the token to search and emit
              * @param startPos the position in the source to start searching for the token
              * @param emitFn if given will be invoked to emit the text instead of actual token emit */
            var emitToken = emitTokenText;
            /** Called to before starting the lexical scopes as in function/class in the emitted code because of node
              * @param scopeDeclaration node that starts the lexical scope
              * @param scopeName Optional name of this scope instead of deducing one from the declaration node */
            var scopeEmitStart = function (scopeDeclaration, scopeName) { };
            /** Called after coming out of the scope */
            var scopeEmitEnd = function () { };
            /** Sourcemap data that will get encoded */
            var sourceMapData;
            if (compilerOptions.sourceMap) {
                initializeEmitterWithSourceMaps();
            }
            if (root) {
                // Do not call emit directly. It does not set the currentSourceFile.
                emitSourceFile(root);
            }
            else {
                ts.forEach(host.getSourceFiles(), function (sourceFile) {
                    if (!isExternalModuleOrDeclarationFile(sourceFile)) {
                        emitSourceFile(sourceFile);
                    }
                });
            }
            writeLine();
            writeEmittedFiles(writer.getText(), compilerOptions.emitBOM);
            return;
            function emitSourceFile(sourceFile) {
                currentSourceFile = sourceFile;
                exportFunctionForFile = undefined;
                emit(sourceFile);
            }
            function isUniqueName(name) {
                return !resolver.hasGlobalName(name) &&
                    !ts.hasProperty(currentSourceFile.identifiers, name) &&
                    !ts.hasProperty(generatedNameSet, name);
            }
            // Return the next available name in the pattern _a ... _z, _0, _1, ...
            // TempFlags._i or TempFlags._n may be used to express a preference for that dedicated name.
            // Note that names generated by makeTempVariableName and makeUniqueName will never conflict.
            function makeTempVariableName(flags) {
                if (flags && !(tempFlags & flags)) {
                    var name = flags === 268435456 /* _i */ ? "_i" : "_n";
                    if (isUniqueName(name)) {
                        tempFlags |= flags;
                        return name;
                    }
                }
                while (true) {
                    var count = tempFlags & 268435455 /* CountMask */;
                    tempFlags++;
                    // Skip over 'i' and 'n'
                    if (count !== 8 && count !== 13) {
                        var name_1 = count < 26 ? "_" + String.fromCharCode(97 /* a */ + count) : "_" + (count - 26);
                        if (isUniqueName(name_1)) {
                            return name_1;
                        }
                    }
                }
            }
            // Generate a name that is unique within the current file and doesn't conflict with any names
            // in global scope. The name is formed by adding an '_n' suffix to the specified base name,
            // where n is a positive integer. Note that names generated by makeTempVariableName and
            // makeUniqueName are guaranteed to never conflict.
            function makeUniqueName(baseName) {
                // Find the first unique 'name_n', where n is a positive number
                if (baseName.charCodeAt(baseName.length - 1) !== 95 /* _ */) {
                    baseName += "_";
                }
                var i = 1;
                while (true) {
                    var generatedName = baseName + i;
                    if (isUniqueName(generatedName)) {
                        return generatedNameSet[generatedName] = generatedName;
                    }
                    i++;
                }
            }
            function assignGeneratedName(node, name) {
                nodeToGeneratedName[ts.getNodeId(node)] = ts.unescapeIdentifier(name);
            }
            function generateNameForFunctionOrClassDeclaration(node) {
                if (!node.name) {
                    assignGeneratedName(node, makeUniqueName("default"));
                }
            }
            function generateNameForModuleOrEnum(node) {
                if (node.name.kind === 65 /* Identifier */) {
                    var name_2 = node.name.text;
                    // Use module/enum name itself if it is unique, otherwise make a unique variation
                    assignGeneratedName(node, isUniqueLocalName(name_2, node) ? name_2 : makeUniqueName(name_2));
                }
            }
            function generateNameForImportOrExportDeclaration(node) {
                var expr = ts.getExternalModuleName(node);
                var baseName = expr.kind === 8 /* StringLiteral */ ?
                    ts.escapeIdentifier(ts.makeIdentifierFromModuleName(expr.text)) : "module";
                assignGeneratedName(node, makeUniqueName(baseName));
            }
            function generateNameForImportDeclaration(node) {
                if (node.importClause) {
                    generateNameForImportOrExportDeclaration(node);
                }
            }
            function generateNameForExportDeclaration(node) {
                if (node.moduleSpecifier) {
                    generateNameForImportOrExportDeclaration(node);
                }
            }
            function generateNameForExportAssignment(node) {
                if (node.expression && node.expression.kind !== 65 /* Identifier */) {
                    assignGeneratedName(node, makeUniqueName("default"));
                }
            }
            function generateNameForNode(node) {
                switch (node.kind) {
                    case 200 /* FunctionDeclaration */:
                    case 201 /* ClassDeclaration */:
                    case 174 /* ClassExpression */:
                        generateNameForFunctionOrClassDeclaration(node);
                        break;
                    case 205 /* ModuleDeclaration */:
                        generateNameForModuleOrEnum(node);
                        generateNameForNode(node.body);
                        break;
                    case 204 /* EnumDeclaration */:
                        generateNameForModuleOrEnum(node);
                        break;
                    case 209 /* ImportDeclaration */:
                        generateNameForImportDeclaration(node);
                        break;
                    case 215 /* ExportDeclaration */:
                        generateNameForExportDeclaration(node);
                        break;
                    case 214 /* ExportAssignment */:
                        generateNameForExportAssignment(node);
                        break;
                }
            }
            function getGeneratedNameForNode(node) {
                var nodeId = ts.getNodeId(node);
                if (!nodeToGeneratedName[nodeId]) {
                    generateNameForNode(node);
                }
                return nodeToGeneratedName[nodeId];
            }
            function initializeEmitterWithSourceMaps() {
                var sourceMapDir; // The directory in which sourcemap will be
                // Current source map file and its index in the sources list
                var sourceMapSourceIndex = -1;
                // Names and its index map
                var sourceMapNameIndexMap = {};
                var sourceMapNameIndices = [];
                function getSourceMapNameIndex() {
                    return sourceMapNameIndices.length ? sourceMapNameIndices[sourceMapNameIndices.length - 1] : -1;
                }
                // Last recorded and encoded spans
                var lastRecordedSourceMapSpan;
                var lastEncodedSourceMapSpan = {
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
                    // Line/Comma delimiters
                    if (lastEncodedSourceMapSpan.emittedLine == lastRecordedSourceMapSpan.emittedLine) {
                        // Emit comma to separate the entry
                        if (sourceMapData.sourceMapMappings) {
                            sourceMapData.sourceMapMappings += ",";
                        }
                    }
                    else {
                        // Emit line delimiters
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
                    function base64VLQFormatEncode(inValue) {
                        function base64FormatEncode(inValue) {
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
                function recordSourceMapSpan(pos) {
                    var sourceLinePos = ts.getLineAndCharacterOfPosition(currentSourceFile, pos);
                    // Convert the location to be one-based.
                    sourceLinePos.line++;
                    sourceLinePos.character++;
                    var emittedLine = writer.getLine();
                    var emittedColumn = writer.getColumn();
                    // If this location wasn't recorded or the location in source is going backwards, record the span
                    if (!lastRecordedSourceMapSpan ||
                        lastRecordedSourceMapSpan.emittedLine != emittedLine ||
                        lastRecordedSourceMapSpan.emittedColumn != emittedColumn ||
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
                function recordEmitNodeStartSpan(node) {
                    // Get the token pos after skipping to the token (ignoring the leading trivia)
                    recordSourceMapSpan(ts.skipTrivia(currentSourceFile.text, node.pos));
                }
                function recordEmitNodeEndSpan(node) {
                    recordSourceMapSpan(node.end);
                }
                function writeTextWithSpanRecord(tokenKind, startPos, emitFn) {
                    var tokenStartPos = ts.skipTrivia(currentSourceFile.text, startPos);
                    recordSourceMapSpan(tokenStartPos);
                    var tokenEndPos = emitTokenText(tokenKind, tokenStartPos, emitFn);
                    recordSourceMapSpan(tokenEndPos);
                    return tokenEndPos;
                }
                function recordNewSourceFileStart(node) {
                    // Add the file to tsFilePaths
                    // If sourceroot option: Use the relative path corresponding to the common directory path
                    // otherwise source locations relative to map file location
                    var sourcesDirectoryPath = compilerOptions.sourceRoot ? host.getCommonSourceDirectory() : sourceMapDir;
                    sourceMapData.sourceMapSources.push(ts.getRelativePathToDirectoryOrUrl(sourcesDirectoryPath, node.fileName, host.getCurrentDirectory(), host.getCanonicalFileName, 
                    /*isAbsolutePathAnUrl*/ true));
                    sourceMapSourceIndex = sourceMapData.sourceMapSources.length - 1;
                    // The one that can be used from program to get the actual source file
                    sourceMapData.inputSourceFileNames.push(node.fileName);
                }
                function recordScopeNameOfNode(node, scopeName) {
                    function recordScopeNameIndex(scopeNameIndex) {
                        sourceMapNameIndices.push(scopeNameIndex);
                    }
                    function recordScopeNameStart(scopeName) {
                        var scopeNameIndex = -1;
                        if (scopeName) {
                            var parentIndex = getSourceMapNameIndex();
                            if (parentIndex !== -1) {
                                // Child scopes are always shown with a dot (even if they have no name),
                                // unless it is a computed property. Then it is shown with brackets,
                                // but the brackets are included in the name.
                                var name_3 = node.name;
                                if (!name_3 || name_3.kind !== 127 /* ComputedPropertyName */) {
                                    scopeName = "." + scopeName;
                                }
                                scopeName = sourceMapData.sourceMapNames[parentIndex] + scopeName;
                            }
                            scopeNameIndex = ts.getProperty(sourceMapNameIndexMap, scopeName);
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
                    else if (node.kind === 200 /* FunctionDeclaration */ ||
                        node.kind === 162 /* FunctionExpression */ ||
                        node.kind === 134 /* MethodDeclaration */ ||
                        node.kind === 133 /* MethodSignature */ ||
                        node.kind === 136 /* GetAccessor */ ||
                        node.kind === 137 /* SetAccessor */ ||
                        node.kind === 205 /* ModuleDeclaration */ ||
                        node.kind === 201 /* ClassDeclaration */ ||
                        node.kind === 204 /* EnumDeclaration */) {
                        // Declaration and has associated name use it
                        if (node.name) {
                            var name_4 = node.name;
                            // For computed property names, the text will include the brackets
                            scopeName = name_4.kind === 127 /* ComputedPropertyName */
                                ? ts.getTextOfNode(name_4)
                                : node.name.text;
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
                }
                ;
                function writeCommentRangeWithMap(curentSourceFile, writer, comment, newLine) {
                    recordSourceMapSpan(comment.pos);
                    ts.writeCommentRange(currentSourceFile, writer, comment, newLine);
                    recordSourceMapSpan(comment.end);
                }
                function serializeSourceMapContents(version, file, sourceRoot, sources, names, mappings) {
                    if (typeof JSON !== "undefined") {
                        return JSON.stringify({
                            version: version,
                            file: file,
                            sourceRoot: sourceRoot,
                            sources: sources,
                            names: names,
                            mappings: mappings
                        });
                    }
                    return "{\"version\":" + version + ",\"file\":\"" + ts.escapeString(file) + "\",\"sourceRoot\":\"" + ts.escapeString(sourceRoot) + "\",\"sources\":[" + serializeStringArray(sources) + "],\"names\":[" + serializeStringArray(names) + "],\"mappings\":\"" + ts.escapeString(mappings) + "\"}";
                    function serializeStringArray(list) {
                        var output = "";
                        for (var i = 0, n = list.length; i < n; i++) {
                            if (i) {
                                output += ",";
                            }
                            output += "\"" + ts.escapeString(list[i]) + "\"";
                        }
                        return output;
                    }
                }
                function writeJavaScriptAndSourceMapFile(emitOutput, writeByteOrderMark) {
                    // Write source map file
                    encodeLastRecordedSourceMapSpan();
                    ts.writeFile(host, diagnostics, sourceMapData.sourceMapFilePath, serializeSourceMapContents(3, sourceMapData.sourceMapFile, sourceMapData.sourceMapSourceRoot, sourceMapData.sourceMapSources, sourceMapData.sourceMapNames, sourceMapData.sourceMapMappings), false);
                    sourceMapDataList.push(sourceMapData);
                    // Write sourcemap url to the js file and write the js file
                    writeJavaScriptFile(emitOutput + "//# sourceMappingURL=" + sourceMapData.jsSourceMappingURL, writeByteOrderMark);
                }
                // Initialize source map data
                var sourceMapJsFile = ts.getBaseFileName(ts.normalizeSlashes(jsFilePath));
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
                if (sourceMapData.sourceMapSourceRoot.length && sourceMapData.sourceMapSourceRoot.charCodeAt(sourceMapData.sourceMapSourceRoot.length - 1) !== 47 /* slash */) {
                    sourceMapData.sourceMapSourceRoot += ts.directorySeparator;
                }
                if (compilerOptions.mapRoot) {
                    sourceMapDir = ts.normalizeSlashes(compilerOptions.mapRoot);
                    if (root) {
                        // For modules or multiple emit files the mapRoot will have directory structure like the sources
                        // So if src\a.ts and src\lib\b.ts are compiled together user would be moving the maps into mapRoot\a.js.map and mapRoot\lib\b.js.map
                        sourceMapDir = ts.getDirectoryPath(ts.getSourceFilePathInNewDir(root, host, sourceMapDir));
                    }
                    if (!ts.isRootedDiskPath(sourceMapDir) && !ts.isUrl(sourceMapDir)) {
                        // The relative paths are relative to the common directory
                        sourceMapDir = ts.combinePaths(host.getCommonSourceDirectory(), sourceMapDir);
                        sourceMapData.jsSourceMappingURL = ts.getRelativePathToDirectoryOrUrl(ts.getDirectoryPath(ts.normalizePath(jsFilePath)), ts.combinePaths(sourceMapDir, sourceMapData.jsSourceMappingURL), host.getCurrentDirectory(), host.getCanonicalFileName, 
                        /*isAbsolutePathAnUrl*/ true);
                    }
                    else {
                        sourceMapData.jsSourceMappingURL = ts.combinePaths(sourceMapDir, sourceMapData.jsSourceMappingURL);
                    }
                }
                else {
                    sourceMapDir = ts.getDirectoryPath(ts.normalizePath(jsFilePath));
                }
                function emitNodeWithSourceMap(node, allowGeneratedIdentifiers) {
                    if (node) {
                        if (ts.nodeIsSynthesized(node)) {
                            return emitNodeWithoutSourceMap(node, false);
                        }
                        if (node.kind != 227 /* SourceFile */) {
                            recordEmitNodeStartSpan(node);
                            emitNodeWithoutSourceMap(node, allowGeneratedIdentifiers);
                            recordEmitNodeEndSpan(node);
                        }
                        else {
                            recordNewSourceFileStart(node);
                            emitNodeWithoutSourceMap(node, false);
                        }
                    }
                }
                writeEmittedFiles = writeJavaScriptAndSourceMapFile;
                emit = emitNodeWithSourceMap;
                emitStart = recordEmitNodeStartSpan;
                emitEnd = recordEmitNodeEndSpan;
                emitToken = writeTextWithSpanRecord;
                scopeEmitStart = recordScopeNameOfNode;
                scopeEmitEnd = recordScopeNameEnd;
                writeComment = writeCommentRangeWithMap;
            }
            function writeJavaScriptFile(emitOutput, writeByteOrderMark) {
                ts.writeFile(host, diagnostics, jsFilePath, emitOutput, writeByteOrderMark);
            }
            // Create a temporary variable with a unique unused name.
            function createTempVariable(flags) {
                var result = ts.createSynthesizedNode(65 /* Identifier */);
                result.text = makeTempVariableName(flags);
                return result;
            }
            function recordTempDeclaration(name) {
                if (!tempVariables) {
                    tempVariables = [];
                }
                tempVariables.push(name);
            }
            function createAndRecordTempVariable(flags) {
                var temp = createTempVariable(flags);
                recordTempDeclaration(temp);
                return temp;
            }
            function emitTempDeclarations(newLine) {
                if (tempVariables) {
                    if (newLine) {
                        writeLine();
                    }
                    else {
                        write(" ");
                    }
                    write("var ");
                    emitCommaList(tempVariables);
                    write(";");
                }
            }
            function emitTokenText(tokenKind, startPos, emitFn) {
                var tokenString = ts.tokenToString(tokenKind);
                if (emitFn) {
                    emitFn();
                }
                else {
                    write(tokenString);
                }
                return startPos + tokenString.length;
            }
            function emitOptional(prefix, node) {
                if (node) {
                    write(prefix);
                    emit(node);
                }
            }
            function emitParenthesizedIf(node, parenthesized) {
                if (parenthesized) {
                    write("(");
                }
                emit(node);
                if (parenthesized) {
                    write(")");
                }
            }
            function emitTrailingCommaIfPresent(nodeList) {
                if (nodeList.hasTrailingComma) {
                    write(",");
                }
            }
            function emitLinePreservingList(parent, nodes, allowTrailingComma, spacesBetweenBraces) {
                ts.Debug.assert(nodes.length > 0);
                increaseIndent();
                if (nodeStartPositionsAreOnSameLine(parent, nodes[0])) {
                    if (spacesBetweenBraces) {
                        write(" ");
                    }
                }
                else {
                    writeLine();
                }
                for (var i = 0, n = nodes.length; i < n; i++) {
                    if (i) {
                        if (nodeEndIsOnSameLineAsNodeStart(nodes[i - 1], nodes[i])) {
                            write(", ");
                        }
                        else {
                            write(",");
                            writeLine();
                        }
                    }
                    emit(nodes[i]);
                }
                if (nodes.hasTrailingComma && allowTrailingComma) {
                    write(",");
                }
                decreaseIndent();
                if (nodeEndPositionsAreOnSameLine(parent, ts.lastOrUndefined(nodes))) {
                    if (spacesBetweenBraces) {
                        write(" ");
                    }
                }
                else {
                    writeLine();
                }
            }
            function emitList(nodes, start, count, multiLine, trailingComma, leadingComma, noTrailingNewLine, emitNode) {
                if (!emitNode) {
                    emitNode = emit;
                }
                for (var i = 0; i < count; i++) {
                    if (multiLine) {
                        if (i || leadingComma) {
                            write(",");
                        }
                        writeLine();
                    }
                    else {
                        if (i || leadingComma) {
                            write(", ");
                        }
                    }
                    emitNode(nodes[start + i]);
                    leadingComma = true;
                }
                if (trailingComma) {
                    write(",");
                }
                if (multiLine && !noTrailingNewLine) {
                    writeLine();
                }
                return count;
            }
            function emitCommaList(nodes) {
                if (nodes) {
                    emitList(nodes, 0, nodes.length, false, false);
                }
            }
            function emitLines(nodes) {
                emitLinesStartingAt(nodes, 0);
            }
            function emitLinesStartingAt(nodes, startIndex) {
                for (var i = startIndex; i < nodes.length; i++) {
                    writeLine();
                    emit(nodes[i]);
                }
            }
            function isBinaryOrOctalIntegerLiteral(node, text) {
                if (node.kind === 7 /* NumericLiteral */ && text.length > 1) {
                    switch (text.charCodeAt(1)) {
                        case 98 /* b */:
                        case 66 /* B */:
                        case 111 /* o */:
                        case 79 /* O */:
                            return true;
                    }
                }
                return false;
            }
            function emitLiteral(node) {
                var text = getLiteralText(node);
                if (compilerOptions.sourceMap && (node.kind === 8 /* StringLiteral */ || ts.isTemplateLiteralKind(node.kind))) {
                    writer.writeLiteral(text);
                }
                else if (languageVersion < 2 /* ES6 */ && isBinaryOrOctalIntegerLiteral(node, text)) {
                    write(node.text);
                }
                else {
                    write(text);
                }
            }
            function getLiteralText(node) {
                // Any template literal or string literal with an extended escape
                // (e.g. "\u{0067}") will need to be downleveled as a escaped string literal.
                if (languageVersion < 2 /* ES6 */ && (ts.isTemplateLiteralKind(node.kind) || node.hasExtendedUnicodeEscape)) {
                    return getQuotedEscapedLiteralText('"', node.text, '"');
                }
                // If we don't need to downlevel and we can reach the original source text using
                // the node's parent reference, then simply get the text as it was originally written.
                if (node.parent) {
                    return ts.getSourceTextOfNodeFromSourceFile(currentSourceFile, node);
                }
                // If we can't reach the original source text, use the canonical form if it's a number,
                // or an escaped quoted form of the original text if it's string-like.
                switch (node.kind) {
                    case 8 /* StringLiteral */:
                        return getQuotedEscapedLiteralText('"', node.text, '"');
                    case 10 /* NoSubstitutionTemplateLiteral */:
                        return getQuotedEscapedLiteralText('`', node.text, '`');
                    case 11 /* TemplateHead */:
                        return getQuotedEscapedLiteralText('`', node.text, '${');
                    case 12 /* TemplateMiddle */:
                        return getQuotedEscapedLiteralText('}', node.text, '${');
                    case 13 /* TemplateTail */:
                        return getQuotedEscapedLiteralText('}', node.text, '`');
                    case 7 /* NumericLiteral */:
                        return node.text;
                }
                ts.Debug.fail("Literal kind '" + node.kind + "' not accounted for.");
            }
            function getQuotedEscapedLiteralText(leftQuote, text, rightQuote) {
                return leftQuote + ts.escapeNonAsciiCharacters(ts.escapeString(text)) + rightQuote;
            }
            function emitDownlevelRawTemplateLiteral(node) {
                // Find original source text, since we need to emit the raw strings of the tagged template.
                // The raw strings contain the (escaped) strings of what the user wrote.
                // Examples: `\n` is converted to "\\n", a template string with a newline to "\n".
                var text = ts.getSourceTextOfNodeFromSourceFile(currentSourceFile, node);
                // text contains the original source, it will also contain quotes ("`"), dolar signs and braces ("${" and "}"),
                // thus we need to remove those characters.
                // First template piece starts with "`", others with "}"
                // Last template piece ends with "`", others with "${"
                var isLast = node.kind === 10 /* NoSubstitutionTemplateLiteral */ || node.kind === 13 /* TemplateTail */;
                text = text.substring(1, text.length - (isLast ? 1 : 2));
                // Newline normalization:
                // ES6 Spec 11.8.6.1 - Static Semantics of TV's and TRV's
                // <CR><LF> and <CR> LineTerminatorSequences are normalized to <LF> for both TV and TRV.
                text = text.replace(/\r\n?/g, "\n");
                text = ts.escapeString(text);
                write('"' + text + '"');
            }
            function emitDownlevelTaggedTemplateArray(node, literalEmitter) {
                write("[");
                if (node.template.kind === 10 /* NoSubstitutionTemplateLiteral */) {
                    literalEmitter(node.template);
                }
                else {
                    literalEmitter(node.template.head);
                    ts.forEach(node.template.templateSpans, function (child) {
                        write(", ");
                        literalEmitter(child.literal);
                    });
                }
                write("]");
            }
            function emitDownlevelTaggedTemplate(node) {
                var tempVariable = createAndRecordTempVariable(0 /* Auto */);
                write("(");
                emit(tempVariable);
                write(" = ");
                emitDownlevelTaggedTemplateArray(node, emit);
                write(", ");
                emit(tempVariable);
                write(".raw = ");
                emitDownlevelTaggedTemplateArray(node, emitDownlevelRawTemplateLiteral);
                write(", ");
                emitParenthesizedIf(node.tag, needsParenthesisForPropertyAccessOrInvocation(node.tag));
                write("(");
                emit(tempVariable);
                // Now we emit the expressions
                if (node.template.kind === 171 /* TemplateExpression */) {
                    ts.forEach(node.template.templateSpans, function (templateSpan) {
                        write(", ");
                        var needsParens = templateSpan.expression.kind === 169 /* BinaryExpression */
                            && templateSpan.expression.operatorToken.kind === 23 /* CommaToken */;
                        emitParenthesizedIf(templateSpan.expression, needsParens);
                    });
                }
                write("))");
            }
            function emitTemplateExpression(node) {
                // In ES6 mode and above, we can simply emit each portion of a template in order, but in
                // ES3 & ES5 we must convert the template expression into a series of string concatenations.
                if (languageVersion >= 2 /* ES6 */) {
                    ts.forEachChild(node, emit);
                    return;
                }
                var emitOuterParens = ts.isExpression(node.parent)
                    && templateNeedsParens(node, node.parent);
                if (emitOuterParens) {
                    write("(");
                }
                var headEmitted = false;
                if (shouldEmitTemplateHead()) {
                    emitLiteral(node.head);
                    headEmitted = true;
                }
                for (var i = 0, n = node.templateSpans.length; i < n; i++) {
                    var templateSpan = node.templateSpans[i];
                    // Check if the expression has operands and binds its operands less closely than binary '+'.
                    // If it does, we need to wrap the expression in parentheses. Otherwise, something like
                    //    `abc${ 1 << 2 }`
                    // becomes
                    //    "abc" + 1 << 2 + ""
                    // which is really
                    //    ("abc" + 1) << (2 + "")
                    // rather than
                    //    "abc" + (1 << 2) + ""
                    var needsParens = templateSpan.expression.kind !== 161 /* ParenthesizedExpression */
                        && comparePrecedenceToBinaryPlus(templateSpan.expression) !== 1 /* GreaterThan */;
                    if (i > 0 || headEmitted) {
                        // If this is the first span and the head was not emitted, then this templateSpan's
                        // expression will be the first to be emitted. Don't emit the preceding ' + ' in that
                        // case.
                        write(" + ");
                    }
                    emitParenthesizedIf(templateSpan.expression, needsParens);
                    // Only emit if the literal is non-empty.
                    // The binary '+' operator is left-associative, so the first string concatenation
                    // with the head will force the result up to this point to be a string.
                    // Emitting a '+ ""' has no semantic effect for middles and tails.
                    if (templateSpan.literal.text.length !== 0) {
                        write(" + ");
                        emitLiteral(templateSpan.literal);
                    }
                }
                if (emitOuterParens) {
                    write(")");
                }
                function shouldEmitTemplateHead() {
                    // If this expression has an empty head literal and the first template span has a non-empty
                    // literal, then emitting the empty head literal is not necessary.
                    //     `${ foo } and ${ bar }`
                    // can be emitted as
                    //     foo + " and " + bar
                    // This is because it is only required that one of the first two operands in the emit
                    // output must be a string literal, so that the other operand and all following operands
                    // are forced into strings.
                    //
                    // If the first template span has an empty literal, then the head must still be emitted.
                    //     `${ foo }${ bar }`
                    // must still be emitted as
                    //     "" + foo + bar
                    // There is always atleast one templateSpan in this code path, since
                    // NoSubstitutionTemplateLiterals are directly emitted via emitLiteral()
                    ts.Debug.assert(node.templateSpans.length !== 0);
                    return node.head.text.length !== 0 || node.templateSpans[0].literal.text.length === 0;
                }
                function templateNeedsParens(template, parent) {
                    switch (parent.kind) {
                        case 157 /* CallExpression */:
                        case 158 /* NewExpression */:
                            return parent.expression === template;
                        case 159 /* TaggedTemplateExpression */:
                        case 161 /* ParenthesizedExpression */:
                            return false;
                        default:
                            return comparePrecedenceToBinaryPlus(parent) !== -1 /* LessThan */;
                    }
                }
                /**
                 * Returns whether the expression has lesser, greater,
                 * or equal precedence to the binary '+' operator
                 */
                function comparePrecedenceToBinaryPlus(expression) {
                    // All binary expressions have lower precedence than '+' apart from '*', '/', and '%'
                    // which have greater precedence and '-' which has equal precedence.
                    // All unary operators have a higher precedence apart from yield.
                    // Arrow functions and conditionals have a lower precedence,
                    // although we convert the former into regular function expressions in ES5 mode,
                    // and in ES6 mode this function won't get called anyway.
                    //
                    // TODO (drosen): Note that we need to account for the upcoming 'yield' and
                    //                spread ('...') unary operators that are anticipated for ES6.
                    switch (expression.kind) {
                        case 169 /* BinaryExpression */:
                            switch (expression.operatorToken.kind) {
                                case 35 /* AsteriskToken */:
                                case 36 /* SlashToken */:
                                case 37 /* PercentToken */:
                                    return 1 /* GreaterThan */;
                                case 33 /* PlusToken */:
                                case 34 /* MinusToken */:
                                    return 0 /* EqualTo */;
                                default:
                                    return -1 /* LessThan */;
                            }
                        case 172 /* YieldExpression */:
                        case 170 /* ConditionalExpression */:
                            return -1 /* LessThan */;
                        default:
                            return 1 /* GreaterThan */;
                    }
                }
            }
            function emitTemplateSpan(span) {
                emit(span.expression);
                emit(span.literal);
            }
            // This function specifically handles numeric/string literals for enum and accessor 'identifiers'.
            // In a sense, it does not actually emit identifiers as much as it declares a name for a specific property.
            // For example, this is utilized when feeding in a result to Object.defineProperty.
            function emitExpressionForPropertyName(node) {
                ts.Debug.assert(node.kind !== 152 /* BindingElement */);
                if (node.kind === 8 /* StringLiteral */) {
                    emitLiteral(node);
                }
                else if (node.kind === 127 /* ComputedPropertyName */) {
                    // if this is a decorated computed property, we will need to capture the result
                    // of the property expression so that we can apply decorators later. This is to ensure 
                    // we don't introduce unintended side effects:
                    //
                    //   class C {
                    //     [_a = x]() { }
                    //   }
                    //
                    // The emit for the decorated computed property decorator is:
                    //
                    //   Object.defineProperty(C.prototype, _a, __decorate([dec], C.prototype, _a, Object.getOwnPropertyDescriptor(C.prototype, _a)));
                    //
                    if (ts.nodeIsDecorated(node.parent)) {
                        if (!computedPropertyNamesToGeneratedNames) {
                            computedPropertyNamesToGeneratedNames = [];
                        }
                        var generatedName = computedPropertyNamesToGeneratedNames[ts.getNodeId(node)];
                        if (generatedName) {
                            // we have already generated a variable for this node, write that value instead.
                            write(generatedName);
                            return;
                        }
                        generatedName = createAndRecordTempVariable(0 /* Auto */).text;
                        computedPropertyNamesToGeneratedNames[ts.getNodeId(node)] = generatedName;
                        write(generatedName);
                        write(" = ");
                    }
                    emit(node.expression);
                }
                else {
                    write("\"");
                    if (node.kind === 7 /* NumericLiteral */) {
                        write(node.text);
                    }
                    else {
                        writeTextOfNode(currentSourceFile, node);
                    }
                    write("\"");
                }
            }
            function isNotExpressionIdentifier(node) {
                var parent = node.parent;
                switch (parent.kind) {
                    case 129 /* Parameter */:
                    case 198 /* VariableDeclaration */:
                    case 152 /* BindingElement */:
                    case 132 /* PropertyDeclaration */:
                    case 131 /* PropertySignature */:
                    case 224 /* PropertyAssignment */:
                    case 225 /* ShorthandPropertyAssignment */:
                    case 226 /* EnumMember */:
                    case 134 /* MethodDeclaration */:
                    case 133 /* MethodSignature */:
                    case 200 /* FunctionDeclaration */:
                    case 136 /* GetAccessor */:
                    case 137 /* SetAccessor */:
                    case 162 /* FunctionExpression */:
                    case 201 /* ClassDeclaration */:
                    case 202 /* InterfaceDeclaration */:
                    case 204 /* EnumDeclaration */:
                    case 205 /* ModuleDeclaration */:
                    case 208 /* ImportEqualsDeclaration */:
                    case 210 /* ImportClause */:
                    case 211 /* NamespaceImport */:
                        return parent.name === node;
                    case 213 /* ImportSpecifier */:
                    case 217 /* ExportSpecifier */:
                        return parent.name === node || parent.propertyName === node;
                    case 190 /* BreakStatement */:
                    case 189 /* ContinueStatement */:
                    case 214 /* ExportAssignment */:
                        return false;
                    case 194 /* LabeledStatement */:
                        return node.parent.label === node;
                }
            }
            function emitExpressionIdentifier(node) {
                var substitution = resolver.getExpressionNameSubstitution(node, getGeneratedNameForNode);
                if (substitution) {
                    write(substitution);
                }
                else {
                    writeTextOfNode(currentSourceFile, node);
                }
            }
            function getGeneratedNameForIdentifier(node) {
                if (ts.nodeIsSynthesized(node) || !blockScopedVariableToGeneratedName) {
                    return undefined;
                }
                var variableId = resolver.getBlockScopedVariableId(node);
                if (variableId === undefined) {
                    return undefined;
                }
                return blockScopedVariableToGeneratedName[variableId];
            }
            function emitIdentifier(node, allowGeneratedIdentifiers) {
                if (allowGeneratedIdentifiers) {
                    var generatedName = getGeneratedNameForIdentifier(node);
                    if (generatedName) {
                        write(generatedName);
                        return;
                    }
                }
                if (!node.parent) {
                    write(node.text);
                }
                else if (!isNotExpressionIdentifier(node)) {
                    emitExpressionIdentifier(node);
                }
                else {
                    writeTextOfNode(currentSourceFile, node);
                }
            }
            function emitThis(node) {
                if (resolver.getNodeCheckFlags(node) & 2 /* LexicalThis */) {
                    write("_this");
                }
                else {
                    write("this");
                }
            }
            function emitSuper(node) {
                if (languageVersion >= 2 /* ES6 */) {
                    write("super");
                }
                else {
                    var flags = resolver.getNodeCheckFlags(node);
                    if (flags & 16 /* SuperInstance */) {
                        write("_super.prototype");
                    }
                    else {
                        write("_super");
                    }
                }
            }
            function emitObjectBindingPattern(node) {
                write("{ ");
                var elements = node.elements;
                emitList(elements, 0, elements.length, false, elements.hasTrailingComma);
                write(" }");
            }
            function emitArrayBindingPattern(node) {
                write("[");
                var elements = node.elements;
                emitList(elements, 0, elements.length, false, elements.hasTrailingComma);
                write("]");
            }
            function emitBindingElement(node) {
                if (node.propertyName) {
                    emit(node.propertyName, false);
                    write(": ");
                }
                if (node.dotDotDotToken) {
                    write("...");
                }
                if (ts.isBindingPattern(node.name)) {
                    emit(node.name);
                }
                else {
                    emitModuleMemberName(node);
                }
                emitOptional(" = ", node.initializer);
            }
            function emitSpreadElementExpression(node) {
                write("...");
                emit(node.expression);
            }
            function emitYieldExpression(node) {
                write(ts.tokenToString(110 /* YieldKeyword */));
                if (node.asteriskToken) {
                    write("*");
                }
                if (node.expression) {
                    write(" ");
                    emit(node.expression);
                }
            }
            function needsParenthesisForPropertyAccessOrInvocation(node) {
                switch (node.kind) {
                    case 65 /* Identifier */:
                    case 153 /* ArrayLiteralExpression */:
                    case 155 /* PropertyAccessExpression */:
                    case 156 /* ElementAccessExpression */:
                    case 157 /* CallExpression */:
                    case 161 /* ParenthesizedExpression */:
                        // This list is not exhaustive and only includes those cases that are relevant
                        // to the check in emitArrayLiteral. More cases can be added as needed.
                        return false;
                }
                return true;
            }
            function emitListWithSpread(elements, multiLine, trailingComma) {
                var pos = 0;
                var group = 0;
                var length = elements.length;
                while (pos < length) {
                    // Emit using the pattern <group0>.concat(<group1>, <group2>, ...)
                    if (group === 1) {
                        write(".concat(");
                    }
                    else if (group > 1) {
                        write(", ");
                    }
                    var e = elements[pos];
                    if (e.kind === 173 /* SpreadElementExpression */) {
                        e = e.expression;
                        emitParenthesizedIf(e, group === 0 && needsParenthesisForPropertyAccessOrInvocation(e));
                        pos++;
                    }
                    else {
                        var i = pos;
                        while (i < length && elements[i].kind !== 173 /* SpreadElementExpression */) {
                            i++;
                        }
                        write("[");
                        if (multiLine) {
                            increaseIndent();
                        }
                        emitList(elements, pos, i - pos, multiLine, trailingComma && i === length);
                        if (multiLine) {
                            decreaseIndent();
                        }
                        write("]");
                        pos = i;
                    }
                    group++;
                }
                if (group > 1) {
                    write(")");
                }
            }
            function isSpreadElementExpression(node) {
                return node.kind === 173 /* SpreadElementExpression */;
            }
            function emitArrayLiteral(node) {
                var elements = node.elements;
                if (elements.length === 0) {
                    write("[]");
                }
                else if (languageVersion >= 2 /* ES6 */ || !ts.forEach(elements, isSpreadElementExpression)) {
                    write("[");
                    emitLinePreservingList(node, node.elements, elements.hasTrailingComma, false);
                    write("]");
                }
                else {
                    emitListWithSpread(elements, (node.flags & 512 /* MultiLine */) !== 0, 
                    /*trailingComma*/ elements.hasTrailingComma);
                }
            }
            function emitObjectLiteralBody(node, numElements) {
                if (numElements === 0) {
                    write("{}");
                    return;
                }
                write("{");
                if (numElements > 0) {
                    var properties = node.properties;
                    // If we are not doing a downlevel transformation for object literals,
                    // then try to preserve the original shape of the object literal.
                    // Otherwise just try to preserve the formatting.
                    if (numElements === properties.length) {
                        emitLinePreservingList(node, properties, languageVersion >= 1 /* ES5 */, true);
                    }
                    else {
                        var multiLine = (node.flags & 512 /* MultiLine */) !== 0;
                        if (!multiLine) {
                            write(" ");
                        }
                        else {
                            increaseIndent();
                        }
                        emitList(properties, 0, numElements, multiLine, false);
                        if (!multiLine) {
                            write(" ");
                        }
                        else {
                            decreaseIndent();
                        }
                    }
                }
                write("}");
            }
            function emitDownlevelObjectLiteralWithComputedProperties(node, firstComputedPropertyIndex) {
                var multiLine = (node.flags & 512 /* MultiLine */) !== 0;
                var properties = node.properties;
                write("(");
                if (multiLine) {
                    increaseIndent();
                }
                // For computed properties, we need to create a unique handle to the object
                // literal so we can modify it without risking internal assignments tainting the object.
                var tempVar = createAndRecordTempVariable(0 /* Auto */);
                // Write out the first non-computed properties
                // (or all properties if none of them are computed),
                // then emit the rest through indexing on the temp variable.
                emit(tempVar);
                write(" = ");
                emitObjectLiteralBody(node, firstComputedPropertyIndex);
                for (var i = firstComputedPropertyIndex, n = properties.length; i < n; i++) {
                    writeComma();
                    var property = properties[i];
                    emitStart(property);
                    if (property.kind === 136 /* GetAccessor */ || property.kind === 137 /* SetAccessor */) {
                        // TODO (drosen): Reconcile with 'emitMemberFunctions'.
                        var accessors = ts.getAllAccessorDeclarations(node.properties, property);
                        if (property !== accessors.firstAccessor) {
                            continue;
                        }
                        write("Object.defineProperty(");
                        emit(tempVar);
                        write(", ");
                        emitStart(node.name);
                        emitExpressionForPropertyName(property.name);
                        emitEnd(property.name);
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
                            emitTrailingComments(accessors.getAccessor);
                            write(",");
                        }
                        if (accessors.setAccessor) {
                            writeLine();
                            emitLeadingComments(accessors.setAccessor);
                            write("set: ");
                            emitStart(accessors.setAccessor);
                            write("function ");
                            emitSignatureAndBody(accessors.setAccessor);
                            emitEnd(accessors.setAccessor);
                            emitTrailingComments(accessors.setAccessor);
                            write(",");
                        }
                        writeLine();
                        write("enumerable: true,");
                        writeLine();
                        write("configurable: true");
                        decreaseIndent();
                        writeLine();
                        write("})");
                        emitEnd(property);
                    }
                    else {
                        emitLeadingComments(property);
                        emitStart(property.name);
                        emit(tempVar);
                        emitMemberAccessForPropertyName(property.name);
                        emitEnd(property.name);
                        write(" = ");
                        if (property.kind === 224 /* PropertyAssignment */) {
                            emit(property.initializer);
                        }
                        else if (property.kind === 225 /* ShorthandPropertyAssignment */) {
                            emitExpressionIdentifier(property.name);
                        }
                        else if (property.kind === 134 /* MethodDeclaration */) {
                            emitFunctionDeclaration(property);
                        }
                        else {
                            ts.Debug.fail("ObjectLiteralElement type not accounted for: " + property.kind);
                        }
                    }
                    emitEnd(property);
                }
                writeComma();
                emit(tempVar);
                if (multiLine) {
                    decreaseIndent();
                    writeLine();
                }
                write(")");
                function writeComma() {
                    if (multiLine) {
                        write(",");
                        writeLine();
                    }
                    else {
                        write(", ");
                    }
                }
            }
            function emitObjectLiteral(node) {
                var properties = node.properties;
                if (languageVersion < 2 /* ES6 */) {
                    var numProperties = properties.length;
                    // Find the first computed property.
                    // Everything until that point can be emitted as part of the initial object literal.
                    var numInitialNonComputedProperties = numProperties;
                    for (var i = 0, n = properties.length; i < n; i++) {
                        if (properties[i].name.kind === 127 /* ComputedPropertyName */) {
                            numInitialNonComputedProperties = i;
                            break;
                        }
                    }
                    var hasComputedProperty = numInitialNonComputedProperties !== properties.length;
                    if (hasComputedProperty) {
                        emitDownlevelObjectLiteralWithComputedProperties(node, numInitialNonComputedProperties);
                        return;
                    }
                }
                // Ordinary case: either the object has no computed properties
                // or we're compiling with an ES6+ target.
                emitObjectLiteralBody(node, properties.length);
            }
            function createBinaryExpression(left, operator, right, startsOnNewLine) {
                var result = ts.createSynthesizedNode(169 /* BinaryExpression */, startsOnNewLine);
                result.operatorToken = ts.createSynthesizedNode(operator);
                result.left = left;
                result.right = right;
                return result;
            }
            function createPropertyAccessExpression(expression, name) {
                var result = ts.createSynthesizedNode(155 /* PropertyAccessExpression */);
                result.expression = parenthesizeForAccess(expression);
                result.dotToken = ts.createSynthesizedNode(20 /* DotToken */);
                result.name = name;
                return result;
            }
            function createElementAccessExpression(expression, argumentExpression) {
                var result = ts.createSynthesizedNode(156 /* ElementAccessExpression */);
                result.expression = parenthesizeForAccess(expression);
                result.argumentExpression = argumentExpression;
                return result;
            }
            function parenthesizeForAccess(expr) {
                // isLeftHandSideExpression is almost the correct criterion for when it is not necessary
                // to parenthesize the expression before a dot. The known exceptions are:
                //
                //    NewExpression:
                //       new C.x        -> not the same as (new C).x
                //    NumberLiteral
                //       1.x            -> not the same as (1).x
                //
                if (ts.isLeftHandSideExpression(expr) && expr.kind !== 158 /* NewExpression */ && expr.kind !== 7 /* NumericLiteral */) {
                    return expr;
                }
                var node = ts.createSynthesizedNode(161 /* ParenthesizedExpression */);
                node.expression = expr;
                return node;
            }
            function emitComputedPropertyName(node) {
                write("[");
                emitExpressionForPropertyName(node);
                write("]");
            }
            function emitMethod(node) {
                if (languageVersion >= 2 /* ES6 */ && node.asteriskToken) {
                    write("*");
                }
                emit(node.name, false);
                if (languageVersion < 2 /* ES6 */) {
                    write(": function ");
                }
                emitSignatureAndBody(node);
            }
            function emitPropertyAssignment(node) {
                emit(node.name, false);
                write(": ");
                emit(node.initializer);
            }
            function emitShorthandPropertyAssignment(node) {
                emit(node.name, false);
                // If short-hand property has a prefix, then regardless of the target version, we will emit it as normal property assignment. For example:
                //  module m {
                //      export let y;
                //  }
                //  module m {
                //      export let obj = { y };
                //  }
                //  The short-hand property in obj need to emit as such ... = { y : m.y } regardless of the TargetScript version
                if (languageVersion < 2 /* ES6 */) {
                    // Emit identifier as an identifier
                    write(": ");
                    var generatedName = getGeneratedNameForIdentifier(node.name);
                    if (generatedName) {
                        write(generatedName);
                    }
                    else {
                        // Even though this is stored as identifier treat it as an expression
                        // Short-hand, { x }, is equivalent of normal form { x: x }
                        emitExpressionIdentifier(node.name);
                    }
                }
                else if (resolver.getExpressionNameSubstitution(node.name, getGeneratedNameForNode)) {
                    // Emit identifier as an identifier
                    write(": ");
                    // Even though this is stored as identifier treat it as an expression
                    // Short-hand, { x }, is equivalent of normal form { x: x }
                    emitExpressionIdentifier(node.name);
                }
            }
            function tryEmitConstantValue(node) {
                if (compilerOptions.separateCompilation) {
                    // do not inline enum values in separate compilation mode
                    return false;
                }
                var constantValue = resolver.getConstantValue(node);
                if (constantValue !== undefined) {
                    write(constantValue.toString());
                    if (!compilerOptions.removeComments) {
                        var propertyName = node.kind === 155 /* PropertyAccessExpression */ ? ts.declarationNameToString(node.name) : ts.getTextOfNode(node.argumentExpression);
                        write(" /* " + propertyName + " */");
                    }
                    return true;
                }
                return false;
            }
            // Returns 'true' if the code was actually indented, false otherwise. 
            // If the code is not indented, an optional valueToWriteWhenNotIndenting will be 
            // emitted instead.
            function indentIfOnDifferentLines(parent, node1, node2, valueToWriteWhenNotIndenting) {
                var realNodesAreOnDifferentLines = !ts.nodeIsSynthesized(parent) && !nodeEndIsOnSameLineAsNodeStart(node1, node2);
                // Always use a newline for synthesized code if the synthesizer desires it.
                var synthesizedNodeIsOnDifferentLine = synthesizedNodeStartsOnNewLine(node2);
                if (realNodesAreOnDifferentLines || synthesizedNodeIsOnDifferentLine) {
                    increaseIndent();
                    writeLine();
                    return true;
                }
                else {
                    if (valueToWriteWhenNotIndenting) {
                        write(valueToWriteWhenNotIndenting);
                    }
                    return false;
                }
            }
            function emitPropertyAccess(node) {
                if (tryEmitConstantValue(node)) {
                    return;
                }
                emit(node.expression);
                var indentedBeforeDot = indentIfOnDifferentLines(node, node.expression, node.dotToken);
                write(".");
                var indentedAfterDot = indentIfOnDifferentLines(node, node.dotToken, node.name);
                emit(node.name, false);
                decreaseIndentIf(indentedBeforeDot, indentedAfterDot);
            }
            function emitQualifiedName(node) {
                emit(node.left);
                write(".");
                emit(node.right);
            }
            function emitIndexedAccess(node) {
                if (tryEmitConstantValue(node)) {
                    return;
                }
                emit(node.expression);
                write("[");
                emit(node.argumentExpression);
                write("]");
            }
            function hasSpreadElement(elements) {
                return ts.forEach(elements, function (e) { return e.kind === 173 /* SpreadElementExpression */; });
            }
            function skipParentheses(node) {
                while (node.kind === 161 /* ParenthesizedExpression */ || node.kind === 160 /* TypeAssertionExpression */) {
                    node = node.expression;
                }
                return node;
            }
            function emitCallTarget(node) {
                if (node.kind === 65 /* Identifier */ || node.kind === 93 /* ThisKeyword */ || node.kind === 91 /* SuperKeyword */) {
                    emit(node);
                    return node;
                }
                var temp = createAndRecordTempVariable(0 /* Auto */);
                write("(");
                emit(temp);
                write(" = ");
                emit(node);
                write(")");
                return temp;
            }
            function emitCallWithSpread(node) {
                var target;
                var expr = skipParentheses(node.expression);
                if (expr.kind === 155 /* PropertyAccessExpression */) {
                    // Target will be emitted as "this" argument
                    target = emitCallTarget(expr.expression);
                    write(".");
                    emit(expr.name);
                }
                else if (expr.kind === 156 /* ElementAccessExpression */) {
                    // Target will be emitted as "this" argument
                    target = emitCallTarget(expr.expression);
                    write("[");
                    emit(expr.argumentExpression);
                    write("]");
                }
                else if (expr.kind === 91 /* SuperKeyword */) {
                    target = expr;
                    write("_super");
                }
                else {
                    emit(node.expression);
                }
                write(".apply(");
                if (target) {
                    if (target.kind === 91 /* SuperKeyword */) {
                        // Calls of form super(...) and super.foo(...)
                        emitThis(target);
                    }
                    else {
                        // Calls of form obj.foo(...)
                        emit(target);
                    }
                }
                else {
                    // Calls of form foo(...)
                    write("void 0");
                }
                write(", ");
                emitListWithSpread(node.arguments, false, false);
                write(")");
            }
            function emitCallExpression(node) {
                if (languageVersion < 2 /* ES6 */ && hasSpreadElement(node.arguments)) {
                    emitCallWithSpread(node);
                    return;
                }
                var superCall = false;
                if (node.expression.kind === 91 /* SuperKeyword */) {
                    emitSuper(node.expression);
                    superCall = true;
                }
                else {
                    emit(node.expression);
                    superCall = node.expression.kind === 155 /* PropertyAccessExpression */ && node.expression.expression.kind === 91 /* SuperKeyword */;
                }
                if (superCall && languageVersion < 2 /* ES6 */) {
                    write(".call(");
                    emitThis(node.expression);
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
            function emitNewExpression(node) {
                write("new ");
                emit(node.expression);
                if (node.arguments) {
                    write("(");
                    emitCommaList(node.arguments);
                    write(")");
                }
            }
            function emitTaggedTemplateExpression(node) {
                if (languageVersion >= 2 /* ES6 */) {
                    emit(node.tag);
                    write(" ");
                    emit(node.template);
                }
                else {
                    emitDownlevelTaggedTemplate(node);
                }
            }
            function emitParenExpression(node) {
                if (!node.parent || node.parent.kind !== 163 /* ArrowFunction */) {
                    if (node.expression.kind === 160 /* TypeAssertionExpression */) {
                        var operand = node.expression.expression;
                        // Make sure we consider all nested cast expressions, e.g.:
                        // (<any><number><any>-A).x;
                        while (operand.kind == 160 /* TypeAssertionExpression */) {
                            operand = operand.expression;
                        }
                        // We have an expression of the form: (<Type>SubExpr)
                        // Emitting this as (SubExpr) is really not desirable. We would like to emit the subexpr as is.
                        // Omitting the parentheses, however, could cause change in the semantics of the generated
                        // code if the casted expression has a lower precedence than the rest of the expression, e.g.:
                        //      (<any>new A).foo should be emitted as (new A).foo and not new A.foo
                        //      (<any>typeof A).toString() should be emitted as (typeof A).toString() and not typeof A.toString()
                        //      new (<any>A()) should be emitted as new (A()) and not new A()
                        //      (<any>function foo() { })() should be emitted as an IIF (function foo(){})() and not declaration function foo(){} ()
                        if (operand.kind !== 167 /* PrefixUnaryExpression */ &&
                            operand.kind !== 166 /* VoidExpression */ &&
                            operand.kind !== 165 /* TypeOfExpression */ &&
                            operand.kind !== 164 /* DeleteExpression */ &&
                            operand.kind !== 168 /* PostfixUnaryExpression */ &&
                            operand.kind !== 158 /* NewExpression */ &&
                            !(operand.kind === 157 /* CallExpression */ && node.parent.kind === 158 /* NewExpression */) &&
                            !(operand.kind === 162 /* FunctionExpression */ && node.parent.kind === 157 /* CallExpression */)) {
                            emit(operand);
                            return;
                        }
                    }
                }
                write("(");
                emit(node.expression);
                write(")");
            }
            function emitDeleteExpression(node) {
                write(ts.tokenToString(74 /* DeleteKeyword */));
                write(" ");
                emit(node.expression);
            }
            function emitVoidExpression(node) {
                write(ts.tokenToString(99 /* VoidKeyword */));
                write(" ");
                emit(node.expression);
            }
            function emitTypeOfExpression(node) {
                write(ts.tokenToString(97 /* TypeOfKeyword */));
                write(" ");
                emit(node.expression);
            }
            function isNameOfExportedSourceLevelDeclarationInSystemExternalModule(node) {
                if (!isCurrentFileSystemExternalModule() || node.kind !== 65 /* Identifier */ || ts.nodeIsSynthesized(node)) {
                    return false;
                }
                var isVariableDeclarationOrBindingElement = node.parent && (node.parent.kind === 198 /* VariableDeclaration */ || node.parent.kind === 152 /* BindingElement */);
                var targetDeclaration = isVariableDeclarationOrBindingElement
                    ? node.parent
                    : resolver.getReferencedValueDeclaration(node);
                return isSourceFileLevelDeclarationInSystemExternalModule(targetDeclaration, true);
            }
            function emitPrefixUnaryExpression(node) {
                var exportChanged = isNameOfExportedSourceLevelDeclarationInSystemExternalModule(node.operand);
                if (exportChanged) {
                    // emit
                    // ++x
                    // as
                    // exports('x', ++x)
                    write(exportFunctionForFile + "(\"");
                    emitNodeWithoutSourceMap(node.operand);
                    write("\", ");
                }
                write(ts.tokenToString(node.operator));
                // In some cases, we need to emit a space between the operator and the operand. One obvious case
                // is when the operator is an identifier, like delete or typeof. We also need to do this for plus
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
                if (node.operand.kind === 167 /* PrefixUnaryExpression */) {
                    var operand = node.operand;
                    if (node.operator === 33 /* PlusToken */ && (operand.operator === 33 /* PlusToken */ || operand.operator === 38 /* PlusPlusToken */)) {
                        write(" ");
                    }
                    else if (node.operator === 34 /* MinusToken */ && (operand.operator === 34 /* MinusToken */ || operand.operator === 39 /* MinusMinusToken */)) {
                        write(" ");
                    }
                }
                emit(node.operand);
                if (exportChanged) {
                    write(")");
                }
            }
            function emitPostfixUnaryExpression(node) {
                var exportChanged = isNameOfExportedSourceLevelDeclarationInSystemExternalModule(node.operand);
                if (exportChanged) {
                    // export function returns the value that was passes as the second argument
                    // however for postfix unary expressions result value should be the value before modification.
                    // emit 'x++' as '(export('x', ++x) - 1)' and 'x--' as '(export('x', --x) + 1)'
                    write("(" + exportFunctionForFile + "(\"");
                    emitNodeWithoutSourceMap(node.operand);
                    write("\", ");
                    write(ts.tokenToString(node.operator));
                    emit(node.operand);
                    if (node.operator === 38 /* PlusPlusToken */) {
                        write(") - 1)");
                    }
                    else {
                        write(") + 1)");
                    }
                }
                else {
                    emit(node.operand);
                    write(ts.tokenToString(node.operator));
                }
            }
            /*
             * Checks if given node is a source file level declaration (not nested in module/function).
             * If 'isExported' is true - then declaration must also be exported.
             * This function is used in two cases:
             * - check if node is a exported source file level value to determine
             *   if we should also export the value after its it changed
             * - check if node is a source level declaration to emit it differently,
             *   i.e non-exported variable statement 'var x = 1' is hoisted so
             *   we we emit variable statement 'var' should be dropped.
             */
            function isSourceFileLevelDeclarationInSystemExternalModule(node, isExported) {
                if (!node || languageVersion >= 2 /* ES6 */ || !isCurrentFileSystemExternalModule()) {
                    return false;
                }
                var current = node;
                while (current) {
                    if (current.kind === 227 /* SourceFile */) {
                        return !isExported || ((ts.getCombinedNodeFlags(node) & 1 /* Export */) !== 0);
                    }
                    else if (ts.isFunctionLike(current) || current.kind === 206 /* ModuleBlock */) {
                        return false;
                    }
                    else {
                        current = current.parent;
                    }
                }
            }
            function emitBinaryExpression(node) {
                if (languageVersion < 2 /* ES6 */ && node.operatorToken.kind === 53 /* EqualsToken */ &&
                    (node.left.kind === 154 /* ObjectLiteralExpression */ || node.left.kind === 153 /* ArrayLiteralExpression */)) {
                    emitDestructuring(node, node.parent.kind === 182 /* ExpressionStatement */);
                }
                else {
                    var exportChanged = node.operatorToken.kind >= 53 /* FirstAssignment */ &&
                        node.operatorToken.kind <= 64 /* LastAssignment */ &&
                        isNameOfExportedSourceLevelDeclarationInSystemExternalModule(node.left);
                    if (exportChanged) {
                        // emit assignment 'x <op> y' as 'exports("x", x <op> y)'
                        write(exportFunctionForFile + "(\"");
                        emitNodeWithoutSourceMap(node.left);
                        write("\", ");
                    }
                    emit(node.left);
                    var indentedBeforeOperator = indentIfOnDifferentLines(node, node.left, node.operatorToken, node.operatorToken.kind !== 23 /* CommaToken */ ? " " : undefined);
                    write(ts.tokenToString(node.operatorToken.kind));
                    var indentedAfterOperator = indentIfOnDifferentLines(node, node.operatorToken, node.right, " ");
                    emit(node.right);
                    decreaseIndentIf(indentedBeforeOperator, indentedAfterOperator);
                    if (exportChanged) {
                        write(")");
                    }
                }
            }
            function synthesizedNodeStartsOnNewLine(node) {
                return ts.nodeIsSynthesized(node) && node.startsOnNewLine;
            }
            function emitConditionalExpression(node) {
                emit(node.condition);
                var indentedBeforeQuestion = indentIfOnDifferentLines(node, node.condition, node.questionToken, " ");
                write("?");
                var indentedAfterQuestion = indentIfOnDifferentLines(node, node.questionToken, node.whenTrue, " ");
                emit(node.whenTrue);
                decreaseIndentIf(indentedBeforeQuestion, indentedAfterQuestion);
                var indentedBeforeColon = indentIfOnDifferentLines(node, node.whenTrue, node.colonToken, " ");
                write(":");
                var indentedAfterColon = indentIfOnDifferentLines(node, node.colonToken, node.whenFalse, " ");
                emit(node.whenFalse);
                decreaseIndentIf(indentedBeforeColon, indentedAfterColon);
            }
            // Helper function to decrease the indent if we previously indented.  Allows multiple 
            // previous indent values to be considered at a time.  This also allows caller to just
            // call this once, passing in all their appropriate indent values, instead of needing
            // to call this helper function multiple times.
            function decreaseIndentIf(value1, value2) {
                if (value1) {
                    decreaseIndent();
                }
                if (value2) {
                    decreaseIndent();
                }
            }
            function isSingleLineEmptyBlock(node) {
                if (node && node.kind === 179 /* Block */) {
                    var block = node;
                    return block.statements.length === 0 && nodeEndIsOnSameLineAsNodeStart(block, block);
                }
            }
            function emitBlock(node) {
                if (isSingleLineEmptyBlock(node)) {
                    emitToken(14 /* OpenBraceToken */, node.pos);
                    write(" ");
                    emitToken(15 /* CloseBraceToken */, node.statements.end);
                    return;
                }
                emitToken(14 /* OpenBraceToken */, node.pos);
                increaseIndent();
                scopeEmitStart(node.parent);
                if (node.kind === 206 /* ModuleBlock */) {
                    ts.Debug.assert(node.parent.kind === 205 /* ModuleDeclaration */);
                    emitCaptureThisForNodeIfNecessary(node.parent);
                }
                emitLines(node.statements);
                if (node.kind === 206 /* ModuleBlock */) {
                    emitTempDeclarations(true);
                }
                decreaseIndent();
                writeLine();
                emitToken(15 /* CloseBraceToken */, node.statements.end);
                scopeEmitEnd();
            }
            function emitEmbeddedStatement(node) {
                if (node.kind === 179 /* Block */) {
                    write(" ");
                    emit(node);
                }
                else {
                    increaseIndent();
                    writeLine();
                    emit(node);
                    decreaseIndent();
                }
            }
            function emitExpressionStatement(node) {
                emitParenthesizedIf(node.expression, node.expression.kind === 163 /* ArrowFunction */);
                write(";");
            }
            function emitIfStatement(node) {
                var endPos = emitToken(84 /* IfKeyword */, node.pos);
                write(" ");
                endPos = emitToken(16 /* OpenParenToken */, endPos);
                emit(node.expression);
                emitToken(17 /* CloseParenToken */, node.expression.end);
                emitEmbeddedStatement(node.thenStatement);
                if (node.elseStatement) {
                    writeLine();
                    emitToken(76 /* ElseKeyword */, node.thenStatement.end);
                    if (node.elseStatement.kind === 183 /* IfStatement */) {
                        write(" ");
                        emit(node.elseStatement);
                    }
                    else {
                        emitEmbeddedStatement(node.elseStatement);
                    }
                }
            }
            function emitDoStatement(node) {
                write("do");
                emitEmbeddedStatement(node.statement);
                if (node.statement.kind === 179 /* Block */) {
                    write(" ");
                }
                else {
                    writeLine();
                }
                write("while (");
                emit(node.expression);
                write(");");
            }
            function emitWhileStatement(node) {
                write("while (");
                emit(node.expression);
                write(")");
                emitEmbeddedStatement(node.statement);
            }
            /* Returns true if start of variable declaration list was emitted.
             * Return false if nothing was written - this can happen for source file level variable declarations
             * in system modules - such variable declarations are hoisted.
             */
            function tryEmitStartOfVariableDeclarationList(decl, startPos) {
                if (shouldHoistVariable(decl, true)) {
                    // variables in variable declaration list were already hoisted
                    return false;
                }
                var tokenKind = 98 /* VarKeyword */;
                if (decl && languageVersion >= 2 /* ES6 */) {
                    if (ts.isLet(decl)) {
                        tokenKind = 104 /* LetKeyword */;
                    }
                    else if (ts.isConst(decl)) {
                        tokenKind = 70 /* ConstKeyword */;
                    }
                }
                if (startPos !== undefined) {
                    emitToken(tokenKind, startPos);
                    write(" ");
                }
                else {
                    switch (tokenKind) {
                        case 98 /* VarKeyword */:
                            write("var ");
                            break;
                        case 104 /* LetKeyword */:
                            write("let ");
                            break;
                        case 70 /* ConstKeyword */:
                            write("const ");
                            break;
                    }
                }
                return true;
            }
            function emitVariableDeclarationListSkippingUninitializedEntries(list) {
                var started = false;
                for (var _i = 0, _a = list.declarations; _i < _a.length; _i++) {
                    var decl = _a[_i];
                    if (!decl.initializer) {
                        continue;
                    }
                    if (!started) {
                        started = true;
                    }
                    else {
                        write(", ");
                    }
                    emit(decl);
                }
                return started;
            }
            function emitForStatement(node) {
                var endPos = emitToken(82 /* ForKeyword */, node.pos);
                write(" ");
                endPos = emitToken(16 /* OpenParenToken */, endPos);
                if (node.initializer && node.initializer.kind === 199 /* VariableDeclarationList */) {
                    var variableDeclarationList = node.initializer;
                    var startIsEmitted = tryEmitStartOfVariableDeclarationList(variableDeclarationList, endPos);
                    if (startIsEmitted) {
                        emitCommaList(variableDeclarationList.declarations);
                    }
                    else {
                        emitVariableDeclarationListSkippingUninitializedEntries(variableDeclarationList);
                    }
                }
                else if (node.initializer) {
                    emit(node.initializer);
                }
                write(";");
                emitOptional(" ", node.condition);
                write(";");
                emitOptional(" ", node.iterator);
                write(")");
                emitEmbeddedStatement(node.statement);
            }
            function emitForInOrForOfStatement(node) {
                if (languageVersion < 2 /* ES6 */ && node.kind === 188 /* ForOfStatement */) {
                    return emitDownLevelForOfStatement(node);
                }
                var endPos = emitToken(82 /* ForKeyword */, node.pos);
                write(" ");
                endPos = emitToken(16 /* OpenParenToken */, endPos);
                if (node.initializer.kind === 199 /* VariableDeclarationList */) {
                    var variableDeclarationList = node.initializer;
                    if (variableDeclarationList.declarations.length >= 1) {
                        tryEmitStartOfVariableDeclarationList(variableDeclarationList, endPos);
                        emit(variableDeclarationList.declarations[0]);
                    }
                }
                else {
                    emit(node.initializer);
                }
                if (node.kind === 187 /* ForInStatement */) {
                    write(" in ");
                }
                else {
                    write(" of ");
                }
                emit(node.expression);
                emitToken(17 /* CloseParenToken */, node.expression.end);
                emitEmbeddedStatement(node.statement);
            }
            function emitDownLevelForOfStatement(node) {
                // The following ES6 code:
                //
                //    for (let v of expr) { }
                //
                // should be emitted as
                //
                //    for (let _i = 0, _a = expr; _i < _a.length; _i++) {
                //        let v = _a[_i];
                //    }
                //
                // where _a and _i are temps emitted to capture the RHS and the counter,
                // respectively.
                // When the left hand side is an expression instead of a let declaration,
                // the "let v" is not emitted.
                // When the left hand side is a let/const, the v is renamed if there is
                // another v in scope.
                // Note that all assignments to the LHS are emitted in the body, including
                // all destructuring.
                // Note also that because an extra statement is needed to assign to the LHS,
                // for-of bodies are always emitted as blocks.
                var endPos = emitToken(82 /* ForKeyword */, node.pos);
                write(" ");
                endPos = emitToken(16 /* OpenParenToken */, endPos);
                // Do not emit the LHS let declaration yet, because it might contain destructuring.
                // Do not call recordTempDeclaration because we are declaring the temps
                // right here. Recording means they will be declared later.
                // In the case where the user wrote an identifier as the RHS, like this:
                //
                //     for (let v of arr) { }
                //
                // we don't want to emit a temporary variable for the RHS, just use it directly.
                var rhsIsIdentifier = node.expression.kind === 65 /* Identifier */;
                var counter = createTempVariable(268435456 /* _i */);
                var rhsReference = rhsIsIdentifier ? node.expression : createTempVariable(0 /* Auto */);
                // This is the let keyword for the counter and rhsReference. The let keyword for
                // the LHS will be emitted inside the body.
                emitStart(node.expression);
                write("var ");
                // _i = 0
                emitNodeWithoutSourceMap(counter);
                write(" = 0");
                emitEnd(node.expression);
                if (!rhsIsIdentifier) {
                    // , _a = expr
                    write(", ");
                    emitStart(node.expression);
                    emitNodeWithoutSourceMap(rhsReference);
                    write(" = ");
                    emitNodeWithoutSourceMap(node.expression);
                    emitEnd(node.expression);
                }
                write("; ");
                // _i < _a.length;
                emitStart(node.initializer);
                emitNodeWithoutSourceMap(counter);
                write(" < ");
                emitNodeWithoutSourceMap(rhsReference);
                write(".length");
                emitEnd(node.initializer);
                write("; ");
                // _i++)
                emitStart(node.initializer);
                emitNodeWithoutSourceMap(counter);
                write("++");
                emitEnd(node.initializer);
                emitToken(17 /* CloseParenToken */, node.expression.end);
                // Body
                write(" {");
                writeLine();
                increaseIndent();
                // Initialize LHS
                // let v = _a[_i];
                var rhsIterationValue = createElementAccessExpression(rhsReference, counter);
                emitStart(node.initializer);
                if (node.initializer.kind === 199 /* VariableDeclarationList */) {
                    write("var ");
                    var variableDeclarationList = node.initializer;
                    if (variableDeclarationList.declarations.length > 0) {
                        var declaration = variableDeclarationList.declarations[0];
                        if (ts.isBindingPattern(declaration.name)) {
                            // This works whether the declaration is a var, let, or const.
                            // It will use rhsIterationValue _a[_i] as the initializer.
                            emitDestructuring(declaration, false, rhsIterationValue);
                        }
                        else {
                            // The following call does not include the initializer, so we have
                            // to emit it separately.
                            emitNodeWithoutSourceMap(declaration);
                            write(" = ");
                            emitNodeWithoutSourceMap(rhsIterationValue);
                        }
                    }
                    else {
                        // It's an empty declaration list. This can only happen in an error case, if the user wrote
                        //     for (let of []) {}
                        emitNodeWithoutSourceMap(createTempVariable(0 /* Auto */));
                        write(" = ");
                        emitNodeWithoutSourceMap(rhsIterationValue);
                    }
                }
                else {
                    // Initializer is an expression. Emit the expression in the body, so that it's
                    // evaluated on every iteration.
                    var assignmentExpression = createBinaryExpression(node.initializer, 53 /* EqualsToken */, rhsIterationValue, false);
                    if (node.initializer.kind === 153 /* ArrayLiteralExpression */ || node.initializer.kind === 154 /* ObjectLiteralExpression */) {
                        // This is a destructuring pattern, so call emitDestructuring instead of emit. Calling emit will not work, because it will cause
                        // the BinaryExpression to be passed in instead of the expression statement, which will cause emitDestructuring to crash.
                        emitDestructuring(assignmentExpression, true, undefined);
                    }
                    else {
                        emitNodeWithoutSourceMap(assignmentExpression);
                    }
                }
                emitEnd(node.initializer);
                write(";");
                if (node.statement.kind === 179 /* Block */) {
                    emitLines(node.statement.statements);
                }
                else {
                    writeLine();
                    emit(node.statement);
                }
                writeLine();
                decreaseIndent();
                write("}");
            }
            function emitBreakOrContinueStatement(node) {
                emitToken(node.kind === 190 /* BreakStatement */ ? 66 /* BreakKeyword */ : 71 /* ContinueKeyword */, node.pos);
                emitOptional(" ", node.label);
                write(";");
            }
            function emitReturnStatement(node) {
                emitToken(90 /* ReturnKeyword */, node.pos);
                emitOptional(" ", node.expression);
                write(";");
            }
            function emitWithStatement(node) {
                write("with (");
                emit(node.expression);
                write(")");
                emitEmbeddedStatement(node.statement);
            }
            function emitSwitchStatement(node) {
                var endPos = emitToken(92 /* SwitchKeyword */, node.pos);
                write(" ");
                emitToken(16 /* OpenParenToken */, endPos);
                emit(node.expression);
                endPos = emitToken(17 /* CloseParenToken */, node.expression.end);
                write(" ");
                emitCaseBlock(node.caseBlock, endPos);
            }
            function emitCaseBlock(node, startPos) {
                emitToken(14 /* OpenBraceToken */, startPos);
                increaseIndent();
                emitLines(node.clauses);
                decreaseIndent();
                writeLine();
                emitToken(15 /* CloseBraceToken */, node.clauses.end);
            }
            function nodeStartPositionsAreOnSameLine(node1, node2) {
                return ts.getLineOfLocalPosition(currentSourceFile, ts.skipTrivia(currentSourceFile.text, node1.pos)) ===
                    ts.getLineOfLocalPosition(currentSourceFile, ts.skipTrivia(currentSourceFile.text, node2.pos));
            }
            function nodeEndPositionsAreOnSameLine(node1, node2) {
                return ts.getLineOfLocalPosition(currentSourceFile, node1.end) ===
                    ts.getLineOfLocalPosition(currentSourceFile, node2.end);
            }
            function nodeEndIsOnSameLineAsNodeStart(node1, node2) {
                return ts.getLineOfLocalPosition(currentSourceFile, node1.end) ===
                    ts.getLineOfLocalPosition(currentSourceFile, ts.skipTrivia(currentSourceFile.text, node2.pos));
            }
            function emitCaseOrDefaultClause(node) {
                if (node.kind === 220 /* CaseClause */) {
                    write("case ");
                    emit(node.expression);
                    write(":");
                }
                else {
                    write("default:");
                }
                if (node.statements.length === 1 && nodeStartPositionsAreOnSameLine(node, node.statements[0])) {
                    write(" ");
                    emit(node.statements[0]);
                }
                else {
                    increaseIndent();
                    emitLines(node.statements);
                    decreaseIndent();
                }
            }
            function emitThrowStatement(node) {
                write("throw ");
                emit(node.expression);
                write(";");
            }
            function emitTryStatement(node) {
                write("try ");
                emit(node.tryBlock);
                emit(node.catchClause);
                if (node.finallyBlock) {
                    writeLine();
                    write("finally ");
                    emit(node.finallyBlock);
                }
            }
            function emitCatchClause(node) {
                writeLine();
                var endPos = emitToken(68 /* CatchKeyword */, node.pos);
                write(" ");
                emitToken(16 /* OpenParenToken */, endPos);
                emit(node.variableDeclaration);
                emitToken(17 /* CloseParenToken */, node.variableDeclaration ? node.variableDeclaration.end : endPos);
                write(" ");
                emitBlock(node.block);
            }
            function emitDebuggerStatement(node) {
                emitToken(72 /* DebuggerKeyword */, node.pos);
                write(";");
            }
            function emitLabelledStatement(node) {
                emit(node.label);
                write(": ");
                emit(node.statement);
            }
            function getContainingModule(node) {
                do {
                    node = node.parent;
                } while (node && node.kind !== 205 /* ModuleDeclaration */);
                return node;
            }
            function emitContainingModuleName(node) {
                var container = getContainingModule(node);
                write(container ? getGeneratedNameForNode(container) : "exports");
            }
            function emitModuleMemberName(node) {
                emitStart(node.name);
                if (ts.getCombinedNodeFlags(node) & 1 /* Export */) {
                    var container = getContainingModule(node);
                    if (container) {
                        write(getGeneratedNameForNode(container));
                        write(".");
                    }
                    else if (languageVersion < 2 /* ES6 */ && compilerOptions.module !== 3 /* System */) {
                        write("exports.");
                    }
                }
                emitNodeWithoutSourceMap(node.name);
                emitEnd(node.name);
            }
            function createVoidZero() {
                var zero = ts.createSynthesizedNode(7 /* NumericLiteral */);
                zero.text = "0";
                var result = ts.createSynthesizedNode(166 /* VoidExpression */);
                result.expression = zero;
                return result;
            }
            function emitExportMemberAssignment(node) {
                if (node.flags & 1 /* Export */) {
                    writeLine();
                    emitStart(node);
                    if (compilerOptions.module === 3 /* System */) {
                        // emit export default <smth> as
                        // export("default", <smth>)
                        write(exportFunctionForFile + "(\"");
                        if (node.flags & 256 /* Default */) {
                            write("default");
                        }
                        else {
                            emitNodeWithoutSourceMap(node.name);
                        }
                        write("\", ");
                        emitDeclarationName(node);
                        write(")");
                    }
                    else {
                        if (node.flags & 256 /* Default */) {
                            if (languageVersion === 0 /* ES3 */) {
                                write("exports[\"default\"]");
                            }
                            else {
                                write("exports.default");
                            }
                        }
                        else {
                            emitModuleMemberName(node);
                        }
                        write(" = ");
                        emitDeclarationName(node);
                    }
                    emitEnd(node);
                    write(";");
                }
            }
            function emitExportMemberAssignments(name) {
                if (!exportEquals && exportSpecifiers && ts.hasProperty(exportSpecifiers, name.text)) {
                    for (var _i = 0, _a = exportSpecifiers[name.text]; _i < _a.length; _i++) {
                        var specifier = _a[_i];
                        writeLine();
                        emitStart(specifier.name);
                        if (compilerOptions.module === 3 /* System */) {
                            write(exportFunctionForFile + "(\"");
                            emitNodeWithoutSourceMap(specifier.name);
                            write("\", ");
                            emitExpressionIdentifier(name);
                            write(")");
                        }
                        else {
                            emitContainingModuleName(specifier);
                            write(".");
                            emitNodeWithoutSourceMap(specifier.name);
                            emitEnd(specifier.name);
                            write(" = ");
                            emitExpressionIdentifier(name);
                        }
                        write(";");
                    }
                }
            }
            function emitDestructuring(root, isAssignmentExpressionStatement, value) {
                var emitCount = 0;
                // An exported declaration is actually emitted as an assignment (to a property on the module object), so
                // temporary variables in an exported declaration need to have real declarations elsewhere
                // Also temporary variables should be explicitly allocated for source level declarations when module target is system
                // because actual variable declarations are hoisted
                var canDefineTempVariablesInPlace = false;
                if (root.kind === 198 /* VariableDeclaration */) {
                    var isExported = ts.getCombinedNodeFlags(root) & 1 /* Export */;
                    var isSourceLevelForSystemModuleKind = isSourceFileLevelDeclarationInSystemExternalModule(root, false);
                    canDefineTempVariablesInPlace = !isExported && !isSourceLevelForSystemModuleKind;
                }
                else if (root.kind === 129 /* Parameter */) {
                    canDefineTempVariablesInPlace = true;
                }
                if (root.kind === 169 /* BinaryExpression */) {
                    emitAssignmentExpression(root);
                }
                else {
                    ts.Debug.assert(!isAssignmentExpressionStatement);
                    emitBindingElement(root, value);
                }
                function emitAssignment(name, value) {
                    if (emitCount++) {
                        write(", ");
                    }
                    renameNonTopLevelLetAndConst(name);
                    var isVariableDeclarationOrBindingElement = name.parent && (name.parent.kind === 198 /* VariableDeclaration */ || name.parent.kind === 152 /* BindingElement */);
                    var exportChanged = isNameOfExportedSourceLevelDeclarationInSystemExternalModule(name);
                    if (exportChanged) {
                        write(exportFunctionForFile + "(\"");
                        emitNodeWithoutSourceMap(name);
                        write("\", ");
                    }
                    if (isVariableDeclarationOrBindingElement) {
                        emitModuleMemberName(name.parent);
                    }
                    else {
                        emit(name);
                    }
                    write(" = ");
                    emit(value);
                    if (exportChanged) {
                        write(")");
                    }
                }
                function ensureIdentifier(expr) {
                    if (expr.kind !== 65 /* Identifier */) {
                        var identifier = createTempVariable(0 /* Auto */);
                        if (!canDefineTempVariablesInPlace) {
                            recordTempDeclaration(identifier);
                        }
                        emitAssignment(identifier, expr);
                        expr = identifier;
                    }
                    return expr;
                }
                function createDefaultValueCheck(value, defaultValue) {
                    // The value expression will be evaluated twice, so for anything but a simple identifier
                    // we need to generate a temporary variable
                    value = ensureIdentifier(value);
                    // Return the expression 'value === void 0 ? defaultValue : value'
                    var equals = ts.createSynthesizedNode(169 /* BinaryExpression */);
                    equals.left = value;
                    equals.operatorToken = ts.createSynthesizedNode(30 /* EqualsEqualsEqualsToken */);
                    equals.right = createVoidZero();
                    return createConditionalExpression(equals, defaultValue, value);
                }
                function createConditionalExpression(condition, whenTrue, whenFalse) {
                    var cond = ts.createSynthesizedNode(170 /* ConditionalExpression */);
                    cond.condition = condition;
                    cond.questionToken = ts.createSynthesizedNode(50 /* QuestionToken */);
                    cond.whenTrue = whenTrue;
                    cond.colonToken = ts.createSynthesizedNode(51 /* ColonToken */);
                    cond.whenFalse = whenFalse;
                    return cond;
                }
                function createNumericLiteral(value) {
                    var node = ts.createSynthesizedNode(7 /* NumericLiteral */);
                    node.text = "" + value;
                    return node;
                }
                function createPropertyAccessForDestructuringProperty(object, propName) {
                    if (propName.kind !== 65 /* Identifier */) {
                        return createElementAccessExpression(object, propName);
                    }
                    return createPropertyAccessExpression(object, propName);
                }
                function createSliceCall(value, sliceIndex) {
                    var call = ts.createSynthesizedNode(157 /* CallExpression */);
                    var sliceIdentifier = ts.createSynthesizedNode(65 /* Identifier */);
                    sliceIdentifier.text = "slice";
                    call.expression = createPropertyAccessExpression(value, sliceIdentifier);
                    call.arguments = ts.createSynthesizedNodeArray();
                    call.arguments[0] = createNumericLiteral(sliceIndex);
                    return call;
                }
                function emitObjectLiteralAssignment(target, value) {
                    var properties = target.properties;
                    if (properties.length !== 1) {
                        // For anything but a single element destructuring we need to generate a temporary
                        // to ensure value is evaluated exactly once.
                        value = ensureIdentifier(value);
                    }
                    for (var _i = 0; _i < properties.length; _i++) {
                        var p = properties[_i];
                        if (p.kind === 224 /* PropertyAssignment */ || p.kind === 225 /* ShorthandPropertyAssignment */) {
                            // TODO(andersh): Computed property support
                            var propName = (p.name);
                            emitDestructuringAssignment(p.initializer || propName, createPropertyAccessForDestructuringProperty(value, propName));
                        }
                    }
                }
                function emitArrayLiteralAssignment(target, value) {
                    var elements = target.elements;
                    if (elements.length !== 1) {
                        // For anything but a single element destructuring we need to generate a temporary
                        // to ensure value is evaluated exactly once.
                        value = ensureIdentifier(value);
                    }
                    for (var i = 0; i < elements.length; i++) {
                        var e = elements[i];
                        if (e.kind !== 175 /* OmittedExpression */) {
                            if (e.kind !== 173 /* SpreadElementExpression */) {
                                emitDestructuringAssignment(e, createElementAccessExpression(value, createNumericLiteral(i)));
                            }
                            else if (i === elements.length - 1) {
                                emitDestructuringAssignment(e.expression, createSliceCall(value, i));
                            }
                        }
                    }
                }
                function emitDestructuringAssignment(target, value) {
                    if (target.kind === 169 /* BinaryExpression */ && target.operatorToken.kind === 53 /* EqualsToken */) {
                        value = createDefaultValueCheck(value, target.right);
                        target = target.left;
                    }
                    if (target.kind === 154 /* ObjectLiteralExpression */) {
                        emitObjectLiteralAssignment(target, value);
                    }
                    else if (target.kind === 153 /* ArrayLiteralExpression */) {
                        emitArrayLiteralAssignment(target, value);
                    }
                    else {
                        emitAssignment(target, value);
                    }
                }
                function emitAssignmentExpression(root) {
                    var target = root.left;
                    var value = root.right;
                    if (isAssignmentExpressionStatement) {
                        emitDestructuringAssignment(target, value);
                    }
                    else {
                        if (root.parent.kind !== 161 /* ParenthesizedExpression */) {
                            write("(");
                        }
                        value = ensureIdentifier(value);
                        emitDestructuringAssignment(target, value);
                        write(", ");
                        emit(value);
                        if (root.parent.kind !== 161 /* ParenthesizedExpression */) {
                            write(")");
                        }
                    }
                }
                function emitBindingElement(target, value) {
                    if (target.initializer) {
                        // Combine value and initializer
                        value = value ? createDefaultValueCheck(value, target.initializer) : target.initializer;
                    }
                    else if (!value) {
                        // Use 'void 0' in absence of value and initializer
                        value = createVoidZero();
                    }
                    if (ts.isBindingPattern(target.name)) {
                        var pattern = target.name;
                        var elements = pattern.elements;
                        if (elements.length !== 1) {
                            // For anything but a single element destructuring we need to generate a temporary
                            // to ensure value is evaluated exactly once.
                            value = ensureIdentifier(value);
                        }
                        for (var i = 0; i < elements.length; i++) {
                            var element = elements[i];
                            if (pattern.kind === 150 /* ObjectBindingPattern */) {
                                // Rewrite element to a declaration with an initializer that fetches property
                                var propName = element.propertyName || element.name;
                                emitBindingElement(element, createPropertyAccessForDestructuringProperty(value, propName));
                            }
                            else if (element.kind !== 175 /* OmittedExpression */) {
                                if (!element.dotDotDotToken) {
                                    // Rewrite element to a declaration that accesses array element at index i
                                    emitBindingElement(element, createElementAccessExpression(value, createNumericLiteral(i)));
                                }
                                else if (i === elements.length - 1) {
                                    emitBindingElement(element, createSliceCall(value, i));
                                }
                            }
                        }
                    }
                    else {
                        emitAssignment(target.name, value);
                    }
                }
            }
            function emitVariableDeclaration(node) {
                if (ts.isBindingPattern(node.name)) {
                    if (languageVersion < 2 /* ES6 */) {
                        emitDestructuring(node, false);
                    }
                    else {
                        emit(node.name);
                        emitOptional(" = ", node.initializer);
                    }
                }
                else {
                    renameNonTopLevelLetAndConst(node.name);
                    var initializer = node.initializer;
                    if (!initializer && languageVersion < 2 /* ES6 */) {
                        // downlevel emit for non-initialized let bindings defined in loops
                        // for (...) {  let x; }
                        // should be
                        // for (...) { var <some-uniqie-name> = void 0; }
                        // this is necessary to preserve ES6 semantic in scenarios like
                        // for (...) { let x; console.log(x); x = 1 } // assignment on one iteration should not affect other iterations
                        var isUninitializedLet = (resolver.getNodeCheckFlags(node) & 256 /* BlockScopedBindingInLoop */) &&
                            (getCombinedFlagsForIdentifier(node.name) & 4096 /* Let */);
                        // NOTE: default initialization should not be added to let bindings in for-in\for-of statements
                        if (isUninitializedLet &&
                            node.parent.parent.kind !== 187 /* ForInStatement */ &&
                            node.parent.parent.kind !== 188 /* ForOfStatement */) {
                            initializer = createVoidZero();
                        }
                    }
                    var exportChanged = isNameOfExportedSourceLevelDeclarationInSystemExternalModule(node.name);
                    if (exportChanged) {
                        write(exportFunctionForFile + "(\"");
                        emitNodeWithoutSourceMap(node.name);
                        write("\", ");
                    }
                    emitModuleMemberName(node);
                    emitOptional(" = ", initializer);
                    if (exportChanged) {
                        write(")");
                    }
                }
            }
            function emitExportVariableAssignments(node) {
                if (node.kind === 175 /* OmittedExpression */) {
                    return;
                }
                var name = node.name;
                if (name.kind === 65 /* Identifier */) {
                    emitExportMemberAssignments(name);
                }
                else if (ts.isBindingPattern(name)) {
                    ts.forEach(name.elements, emitExportVariableAssignments);
                }
            }
            function getCombinedFlagsForIdentifier(node) {
                if (!node.parent || (node.parent.kind !== 198 /* VariableDeclaration */ && node.parent.kind !== 152 /* BindingElement */)) {
                    return 0;
                }
                return ts.getCombinedNodeFlags(node.parent);
            }
            function renameNonTopLevelLetAndConst(node) {
                // do not rename if
                // - language version is ES6+
                // - node is synthesized
                // - node is not identifier (can happen when tree is malformed)
                // - node is definitely not name of variable declaration. 
                // it still can be part of parameter declaration, this check will be done next
                if (languageVersion >= 2 /* ES6 */ ||
                    ts.nodeIsSynthesized(node) ||
                    node.kind !== 65 /* Identifier */ ||
                    (node.parent.kind !== 198 /* VariableDeclaration */ && node.parent.kind !== 152 /* BindingElement */)) {
                    return;
                }
                var combinedFlags = getCombinedFlagsForIdentifier(node);
                if (((combinedFlags & 12288 /* BlockScoped */) === 0) || combinedFlags & 1 /* Export */) {
                    // do not rename exported or non-block scoped variables
                    return;
                }
                // here it is known that node is a block scoped variable
                var list = ts.getAncestor(node, 199 /* VariableDeclarationList */);
                if (list.parent.kind === 180 /* VariableStatement */) {
                    var isSourceFileLevelBinding = list.parent.parent.kind === 227 /* SourceFile */;
                    var isModuleLevelBinding = list.parent.parent.kind === 206 /* ModuleBlock */;
                    var isFunctionLevelBinding = list.parent.parent.kind === 179 /* Block */ && ts.isFunctionLike(list.parent.parent.parent);
                    if (isSourceFileLevelBinding || isModuleLevelBinding || isFunctionLevelBinding) {
                        return;
                    }
                }
                var blockScopeContainer = ts.getEnclosingBlockScopeContainer(node);
                var parent = blockScopeContainer.kind === 227 /* SourceFile */
                    ? blockScopeContainer
                    : blockScopeContainer.parent;
                if (resolver.resolvesToSomeValue(parent, node.text)) {
                    var variableId = resolver.getBlockScopedVariableId(node);
                    if (!blockScopedVariableToGeneratedName) {
                        blockScopedVariableToGeneratedName = [];
                    }
                    var generatedName = makeUniqueName(node.text);
                    blockScopedVariableToGeneratedName[variableId] = generatedName;
                }
            }
            function isES6ExportedDeclaration(node) {
                return !!(node.flags & 1 /* Export */) &&
                    languageVersion >= 2 /* ES6 */ &&
                    node.parent.kind === 227 /* SourceFile */;
            }
            function emitVariableStatement(node) {
                var startIsEmitted = true;
                if (!(node.flags & 1 /* Export */)) {
                    startIsEmitted = tryEmitStartOfVariableDeclarationList(node.declarationList);
                }
                else if (isES6ExportedDeclaration(node)) {
                    // Exported ES6 module member
                    write("export ");
                    startIsEmitted = tryEmitStartOfVariableDeclarationList(node.declarationList);
                }
                if (startIsEmitted) {
                    emitCommaList(node.declarationList.declarations);
                    write(";");
                }
                else {
                    var atLeastOneItem = emitVariableDeclarationListSkippingUninitializedEntries(node.declarationList);
                    if (atLeastOneItem) {
                        write(";");
                    }
                }
                if (languageVersion < 2 /* ES6 */ && node.parent === currentSourceFile) {
                    ts.forEach(node.declarationList.declarations, emitExportVariableAssignments);
                }
            }
            function emitParameter(node) {
                if (languageVersion < 2 /* ES6 */) {
                    if (ts.isBindingPattern(node.name)) {
                        var name_5 = createTempVariable(0 /* Auto */);
                        if (!tempParameters) {
                            tempParameters = [];
                        }
                        tempParameters.push(name_5);
                        emit(name_5);
                    }
                    else {
                        emit(node.name);
                    }
                }
                else {
                    if (node.dotDotDotToken) {
                        write("...");
                    }
                    emit(node.name);
                    emitOptional(" = ", node.initializer);
                }
            }
            function emitDefaultValueAssignments(node) {
                if (languageVersion < 2 /* ES6 */) {
                    var tempIndex = 0;
                    ts.forEach(node.parameters, function (p) {
                        // A rest parameter cannot have a binding pattern or an initializer,
                        // so let's just ignore it.
                        if (p.dotDotDotToken) {
                            return;
                        }
                        if (ts.isBindingPattern(p.name)) {
                            writeLine();
                            write("var ");
                            emitDestructuring(p, false, tempParameters[tempIndex]);
                            write(";");
                            tempIndex++;
                        }
                        else if (p.initializer) {
                            writeLine();
                            emitStart(p);
                            write("if (");
                            emitNodeWithoutSourceMap(p.name);
                            write(" === void 0)");
                            emitEnd(p);
                            write(" { ");
                            emitStart(p);
                            emitNodeWithoutSourceMap(p.name);
                            write(" = ");
                            emitNodeWithoutSourceMap(p.initializer);
                            emitEnd(p);
                            write("; }");
                        }
                    });
                }
            }
            function emitRestParameter(node) {
                if (languageVersion < 2 /* ES6 */ && ts.hasRestParameters(node)) {
                    var restIndex = node.parameters.length - 1;
                    var restParam = node.parameters[restIndex];
                    // A rest parameter cannot have a binding pattern, so let's just ignore it if it does.
                    if (ts.isBindingPattern(restParam.name)) {
                        return;
                    }
                    var tempName = createTempVariable(268435456 /* _i */).text;
                    writeLine();
                    emitLeadingComments(restParam);
                    emitStart(restParam);
                    write("var ");
                    emitNodeWithoutSourceMap(restParam.name);
                    write(" = [];");
                    emitEnd(restParam);
                    emitTrailingComments(restParam);
                    writeLine();
                    write("for (");
                    emitStart(restParam);
                    write("var " + tempName + " = " + restIndex + ";");
                    emitEnd(restParam);
                    write(" ");
                    emitStart(restParam);
                    write(tempName + " < arguments.length;");
                    emitEnd(restParam);
                    write(" ");
                    emitStart(restParam);
                    write(tempName + "++");
                    emitEnd(restParam);
                    write(") {");
                    increaseIndent();
                    writeLine();
                    emitStart(restParam);
                    emitNodeWithoutSourceMap(restParam.name);
                    write("[" + tempName + " - " + restIndex + "] = arguments[" + tempName + "];");
                    emitEnd(restParam);
                    decreaseIndent();
                    writeLine();
                    write("}");
                }
            }
            function emitAccessor(node) {
                write(node.kind === 136 /* GetAccessor */ ? "get " : "set ");
                emit(node.name, false);
                emitSignatureAndBody(node);
            }
            function shouldEmitAsArrowFunction(node) {
                return node.kind === 163 /* ArrowFunction */ && languageVersion >= 2 /* ES6 */;
            }
            function emitDeclarationName(node) {
                if (node.name) {
                    emitNodeWithoutSourceMap(node.name);
                }
                else {
                    write(getGeneratedNameForNode(node));
                }
            }
            function shouldEmitFunctionName(node) {
                if (node.kind === 162 /* FunctionExpression */) {
                    // Emit name if one is present
                    return !!node.name;
                }
                if (node.kind === 200 /* FunctionDeclaration */) {
                    // Emit name if one is present, or emit generated name in down-level case (for export default case)
                    return !!node.name || languageVersion < 2 /* ES6 */;
                }
            }
            function emitFunctionDeclaration(node) {
                if (ts.nodeIsMissing(node.body)) {
                    return emitOnlyPinnedOrTripleSlashComments(node);
                }
                if (node.kind !== 134 /* MethodDeclaration */ && node.kind !== 133 /* MethodSignature */) {
                    // Methods will emit the comments as part of emitting method declaration
                    emitLeadingComments(node);
                }
                // For targeting below es6, emit functions-like declaration including arrow function using function keyword.
                // When targeting ES6, emit arrow function natively in ES6 by omitting function keyword and using fat arrow instead
                if (!shouldEmitAsArrowFunction(node)) {
                    if (isES6ExportedDeclaration(node)) {
                        write("export ");
                        if (node.flags & 256 /* Default */) {
                            write("default ");
                        }
                    }
                    write("function");
                    if (languageVersion >= 2 /* ES6 */ && node.asteriskToken) {
                        write("*");
                    }
                    write(" ");
                }
                if (shouldEmitFunctionName(node)) {
                    emitDeclarationName(node);
                }
                emitSignatureAndBody(node);
                if (languageVersion < 2 /* ES6 */ && node.kind === 200 /* FunctionDeclaration */ && node.parent === currentSourceFile && node.name) {
                    emitExportMemberAssignments(node.name);
                }
                if (node.kind !== 134 /* MethodDeclaration */ && node.kind !== 133 /* MethodSignature */) {
                    emitTrailingComments(node);
                }
            }
            function emitCaptureThisForNodeIfNecessary(node) {
                if (resolver.getNodeCheckFlags(node) & 4 /* CaptureThis */) {
                    writeLine();
                    emitStart(node);
                    write("var _this = this;");
                    emitEnd(node);
                }
            }
            function emitSignatureParameters(node) {
                increaseIndent();
                write("(");
                if (node) {
                    var parameters = node.parameters;
                    var omitCount = languageVersion < 2 /* ES6 */ && ts.hasRestParameters(node) ? 1 : 0;
                    emitList(parameters, 0, parameters.length - omitCount, false, false);
                }
                write(")");
                decreaseIndent();
            }
            function emitSignatureParametersForArrow(node) {
                // Check whether the parameter list needs parentheses and preserve no-parenthesis
                if (node.parameters.length === 1 && node.pos === node.parameters[0].pos) {
                    emit(node.parameters[0]);
                    return;
                }
                emitSignatureParameters(node);
            }
            function emitSignatureAndBody(node) {
                var saveTempFlags = tempFlags;
                var saveTempVariables = tempVariables;
                var saveTempParameters = tempParameters;
                tempFlags = 0;
                tempVariables = undefined;
                tempParameters = undefined;
                // When targeting ES6, emit arrow function natively in ES6
                if (shouldEmitAsArrowFunction(node)) {
                    emitSignatureParametersForArrow(node);
                    write(" =>");
                }
                else {
                    emitSignatureParameters(node);
                }
                if (!node.body) {
                    // There can be no body when there are parse errors.  Just emit an empty block 
                    // in that case.
                    write(" { }");
                }
                else if (node.body.kind === 179 /* Block */) {
                    emitBlockFunctionBody(node, node.body);
                }
                else {
                    emitExpressionFunctionBody(node, node.body);
                }
                if (!isES6ExportedDeclaration(node)) {
                    emitExportMemberAssignment(node);
                }
                tempFlags = saveTempFlags;
                tempVariables = saveTempVariables;
                tempParameters = saveTempParameters;
            }
            // Returns true if any preamble code was emitted.
            function emitFunctionBodyPreamble(node) {
                emitCaptureThisForNodeIfNecessary(node);
                emitDefaultValueAssignments(node);
                emitRestParameter(node);
            }
            function emitExpressionFunctionBody(node, body) {
                if (languageVersion < 2 /* ES6 */) {
                    emitDownLevelExpressionFunctionBody(node, body);
                    return;
                }
                // For es6 and higher we can emit the expression as is.  However, in the case 
                // where the expression might end up looking like a block when emitted, we'll
                // also wrap it in parentheses first.  For example if you have: a => <foo>{}
                // then we need to generate: a => ({})
                write(" ");
                // Unwrap all type assertions.
                var current = body;
                while (current.kind === 160 /* TypeAssertionExpression */) {
                    current = current.expression;
                }
                emitParenthesizedIf(body, current.kind === 154 /* ObjectLiteralExpression */);
            }
            function emitDownLevelExpressionFunctionBody(node, body) {
                write(" {");
                scopeEmitStart(node);
                increaseIndent();
                var outPos = writer.getTextPos();
                emitDetachedComments(node.body);
                emitFunctionBodyPreamble(node);
                var preambleEmitted = writer.getTextPos() !== outPos;
                decreaseIndent();
                // If we didn't have to emit any preamble code, then attempt to keep the arrow
                // function on one line.
                if (!preambleEmitted && nodeStartPositionsAreOnSameLine(node, body)) {
                    write(" ");
                    emitStart(body);
                    write("return ");
                    emit(body);
                    emitEnd(body);
                    write(";");
                    emitTempDeclarations(false);
                    write(" ");
                }
                else {
                    increaseIndent();
                    writeLine();
                    emitLeadingComments(node.body);
                    write("return ");
                    emit(body);
                    write(";");
                    emitTrailingComments(node.body);
                    emitTempDeclarations(true);
                    decreaseIndent();
                    writeLine();
                }
                emitStart(node.body);
                write("}");
                emitEnd(node.body);
                scopeEmitEnd();
            }
            function emitBlockFunctionBody(node, body) {
                write(" {");
                scopeEmitStart(node);
                var initialTextPos = writer.getTextPos();
                increaseIndent();
                emitDetachedComments(body.statements);
                // Emit all the directive prologues (like "use strict").  These have to come before
                // any other preamble code we write (like parameter initializers).
                var startIndex = emitDirectivePrologues(body.statements, true);
                emitFunctionBodyPreamble(node);
                decreaseIndent();
                var preambleEmitted = writer.getTextPos() !== initialTextPos;
                if (!preambleEmitted && nodeEndIsOnSameLineAsNodeStart(body, body)) {
                    for (var _i = 0, _a = body.statements; _i < _a.length; _i++) {
                        var statement = _a[_i];
                        write(" ");
                        emit(statement);
                    }
                    emitTempDeclarations(false);
                    write(" ");
                    emitLeadingCommentsOfPosition(body.statements.end);
                }
                else {
                    increaseIndent();
                    emitLinesStartingAt(body.statements, startIndex);
                    emitTempDeclarations(true);
                    writeLine();
                    emitLeadingCommentsOfPosition(body.statements.end);
                    decreaseIndent();
                }
                emitToken(15 /* CloseBraceToken */, body.statements.end);
                scopeEmitEnd();
            }
            function findInitialSuperCall(ctor) {
                if (ctor.body) {
                    var statement = ctor.body.statements[0];
                    if (statement && statement.kind === 182 /* ExpressionStatement */) {
                        var expr = statement.expression;
                        if (expr && expr.kind === 157 /* CallExpression */) {
                            var func = expr.expression;
                            if (func && func.kind === 91 /* SuperKeyword */) {
                                return statement;
                            }
                        }
                    }
                }
            }
            function emitParameterPropertyAssignments(node) {
                ts.forEach(node.parameters, function (param) {
                    if (param.flags & 112 /* AccessibilityModifier */) {
                        writeLine();
                        emitStart(param);
                        emitStart(param.name);
                        write("this.");
                        emitNodeWithoutSourceMap(param.name);
                        emitEnd(param.name);
                        write(" = ");
                        emit(param.name);
                        write(";");
                        emitEnd(param);
                    }
                });
            }
            function emitMemberAccessForPropertyName(memberName) {
                // TODO: (jfreeman,drosen): comment on why this is emitNodeWithoutSourceMap instead of emit here.
                if (memberName.kind === 8 /* StringLiteral */ || memberName.kind === 7 /* NumericLiteral */) {
                    write("[");
                    emitNodeWithoutSourceMap(memberName);
                    write("]");
                }
                else if (memberName.kind === 127 /* ComputedPropertyName */) {
                    emitComputedPropertyName(memberName);
                }
                else {
                    write(".");
                    emitNodeWithoutSourceMap(memberName);
                }
            }
            function getInitializedProperties(node, static) {
                var properties = [];
                for (var _i = 0, _a = node.members; _i < _a.length; _i++) {
                    var member = _a[_i];
                    if (member.kind === 132 /* PropertyDeclaration */ && static === ((member.flags & 128 /* Static */) !== 0) && member.initializer) {
                        properties.push(member);
                    }
                }
                return properties;
            }
            function emitPropertyDeclarations(node, properties) {
                for (var _i = 0; _i < properties.length; _i++) {
                    var property = properties[_i];
                    emitPropertyDeclaration(node, property);
                }
            }
            function emitPropertyDeclaration(node, property, receiver, isExpression) {
                writeLine();
                emitLeadingComments(property);
                emitStart(property);
                emitStart(property.name);
                if (receiver) {
                    emit(receiver);
                }
                else {
                    if (property.flags & 128 /* Static */) {
                        emitDeclarationName(node);
                    }
                    else {
                        write("this");
                    }
                }
                emitMemberAccessForPropertyName(property.name);
                emitEnd(property.name);
                write(" = ");
                emit(property.initializer);
                if (!isExpression) {
                    write(";");
                }
                emitEnd(property);
                emitTrailingComments(property);
            }
            function emitMemberFunctionsForES5AndLower(node) {
                ts.forEach(node.members, function (member) {
                    if (member.kind === 178 /* SemicolonClassElement */) {
                        writeLine();
                        write(";");
                    }
                    else if (member.kind === 134 /* MethodDeclaration */ || node.kind === 133 /* MethodSignature */) {
                        if (!member.body) {
                            return emitOnlyPinnedOrTripleSlashComments(member);
                        }
                        writeLine();
                        emitLeadingComments(member);
                        emitStart(member);
                        emitStart(member.name);
                        emitClassMemberPrefix(node, member);
                        emitMemberAccessForPropertyName(member.name);
                        emitEnd(member.name);
                        write(" = ");
                        emitStart(member);
                        emitFunctionDeclaration(member);
                        emitEnd(member);
                        emitEnd(member);
                        write(";");
                        emitTrailingComments(member);
                    }
                    else if (member.kind === 136 /* GetAccessor */ || member.kind === 137 /* SetAccessor */) {
                        var accessors = ts.getAllAccessorDeclarations(node.members, member);
                        if (member === accessors.firstAccessor) {
                            writeLine();
                            emitStart(member);
                            write("Object.defineProperty(");
                            emitStart(member.name);
                            emitClassMemberPrefix(node, member);
                            write(", ");
                            emitExpressionForPropertyName(member.name);
                            emitEnd(member.name);
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
                                emitTrailingComments(accessors.getAccessor);
                                write(",");
                            }
                            if (accessors.setAccessor) {
                                writeLine();
                                emitLeadingComments(accessors.setAccessor);
                                write("set: ");
                                emitStart(accessors.setAccessor);
                                write("function ");
                                emitSignatureAndBody(accessors.setAccessor);
                                emitEnd(accessors.setAccessor);
                                emitTrailingComments(accessors.setAccessor);
                                write(",");
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
            function emitMemberFunctionsForES6AndHigher(node) {
                for (var _i = 0, _a = node.members; _i < _a.length; _i++) {
                    var member = _a[_i];
                    if ((member.kind === 134 /* MethodDeclaration */ || node.kind === 133 /* MethodSignature */) && !member.body) {
                        emitOnlyPinnedOrTripleSlashComments(member);
                    }
                    else if (member.kind === 134 /* MethodDeclaration */ ||
                        member.kind === 136 /* GetAccessor */ ||
                        member.kind === 137 /* SetAccessor */) {
                        writeLine();
                        emitLeadingComments(member);
                        emitStart(member);
                        if (member.flags & 128 /* Static */) {
                            write("static ");
                        }
                        if (member.kind === 136 /* GetAccessor */) {
                            write("get ");
                        }
                        else if (member.kind === 137 /* SetAccessor */) {
                            write("set ");
                        }
                        if (member.asteriskToken) {
                            write("*");
                        }
                        emit(member.name);
                        emitSignatureAndBody(member);
                        emitEnd(member);
                        emitTrailingComments(member);
                    }
                    else if (member.kind === 178 /* SemicolonClassElement */) {
                        writeLine();
                        write(";");
                    }
                }
            }
            function emitConstructor(node, baseTypeElement) {
                var saveTempFlags = tempFlags;
                var saveTempVariables = tempVariables;
                var saveTempParameters = tempParameters;
                tempFlags = 0;
                tempVariables = undefined;
                tempParameters = undefined;
                emitConstructorWorker(node, baseTypeElement);
                tempFlags = saveTempFlags;
                tempVariables = saveTempVariables;
                tempParameters = saveTempParameters;
            }
            function emitConstructorWorker(node, baseTypeElement) {
                // Check if we have property assignment inside class declaration.
                // If there is property assignment, we need to emit constructor whether users define it or not
                // If there is no property assignment, we can omit constructor if users do not define it
                var hasInstancePropertyWithInitializer = false;
                // Emit the constructor overload pinned comments
                ts.forEach(node.members, function (member) {
                    if (member.kind === 135 /* Constructor */ && !member.body) {
                        emitOnlyPinnedOrTripleSlashComments(member);
                    }
                    // Check if there is any non-static property assignment
                    if (member.kind === 132 /* PropertyDeclaration */ && member.initializer && (member.flags & 128 /* Static */) === 0) {
                        hasInstancePropertyWithInitializer = true;
                    }
                });
                var ctor = ts.getFirstConstructorWithBody(node);
                // For target ES6 and above, if there is no user-defined constructor and there is no property assignment
                // do not emit constructor in class declaration.
                if (languageVersion >= 2 /* ES6 */ && !ctor && !hasInstancePropertyWithInitializer) {
                    return;
                }
                if (ctor) {
                    emitLeadingComments(ctor);
                }
                emitStart(ctor || node);
                if (languageVersion < 2 /* ES6 */) {
                    write("function ");
                    emitDeclarationName(node);
                    emitSignatureParameters(ctor);
                }
                else {
                    write("constructor");
                    if (ctor) {
                        emitSignatureParameters(ctor);
                    }
                    else {
                        // Based on EcmaScript6 section 14.5.14: Runtime Semantics: ClassDefinitionEvaluation.
                        // If constructor is empty, then,
                        //      If ClassHeritageopt is present, then
                        //          Let constructor be the result of parsing the String "constructor(... args){ super (...args);}" using the syntactic grammar with the goal symbol MethodDefinition.
                        //      Else,
                        //          Let constructor be the result of parsing the String "constructor( ){ }" using the syntactic grammar with the goal symbol MethodDefinition
                        if (baseTypeElement) {
                            write("(...args)");
                        }
                        else {
                            write("()");
                        }
                    }
                }
                write(" {");
                scopeEmitStart(node, "constructor");
                increaseIndent();
                if (ctor) {
                    emitDetachedComments(ctor.body.statements);
                }
                emitCaptureThisForNodeIfNecessary(node);
                if (ctor) {
                    emitDefaultValueAssignments(ctor);
                    emitRestParameter(ctor);
                    if (baseTypeElement) {
                        var superCall = findInitialSuperCall(ctor);
                        if (superCall) {
                            writeLine();
                            emit(superCall);
                        }
                    }
                    emitParameterPropertyAssignments(ctor);
                }
                else {
                    if (baseTypeElement) {
                        writeLine();
                        emitStart(baseTypeElement);
                        if (languageVersion < 2 /* ES6 */) {
                            write("_super.apply(this, arguments);");
                        }
                        else {
                            write("super(...args);");
                        }
                        emitEnd(baseTypeElement);
                    }
                }
                emitPropertyDeclarations(node, getInitializedProperties(node, false));
                if (ctor) {
                    var statements = ctor.body.statements;
                    if (superCall) {
                        statements = statements.slice(1);
                    }
                    emitLines(statements);
                }
                emitTempDeclarations(true);
                writeLine();
                if (ctor) {
                    emitLeadingCommentsOfPosition(ctor.body.statements.end);
                }
                decreaseIndent();
                emitToken(15 /* CloseBraceToken */, ctor ? ctor.body.statements.end : node.members.end);
                scopeEmitEnd();
                emitEnd(ctor || node);
                if (ctor) {
                    emitTrailingComments(ctor);
                }
            }
            function emitClassExpression(node) {
                return emitClassLikeDeclaration(node);
            }
            function emitClassDeclaration(node) {
                return emitClassLikeDeclaration(node);
            }
            function emitClassLikeDeclaration(node) {
                if (languageVersion < 2 /* ES6 */) {
                    emitClassLikeDeclarationBelowES6(node);
                }
                else {
                    emitClassLikeDeclarationForES6AndHigher(node);
                }
            }
            function emitClassLikeDeclarationForES6AndHigher(node) {
                var thisNodeIsDecorated = ts.nodeIsDecorated(node);
                if (node.kind === 201 /* ClassDeclaration */) {
                    if (thisNodeIsDecorated) {
                        // To preserve the correct runtime semantics when decorators are applied to the class,
                        // the emit needs to follow one of the following rules:
                        //
                        // * For a local class declaration:
                        //
                        //     @dec class C {
                        //     }
                        //
                        //   The emit should be:
                        //
                        //     let C = class {
                        //     };
                        //     Object.defineProperty(C, "name", { value: "C", configurable: true });
                        //     C = __decorate([dec], C);
                        //
                        // * For an exported class declaration:
                        //
                        //     @dec export class C {
                        //     }
                        //
                        //   The emit should be:
                        //
                        //     export let C = class {
                        //     };
                        //     Object.defineProperty(C, "name", { value: "C", configurable: true });
                        //     C = __decorate([dec], C);
                        //
                        // * For a default export of a class declaration with a name:
                        //
                        //     @dec default export class C {
                        //     }
                        //
                        //   The emit should be:
                        //
                        //     let C = class {
                        //     }
                        //     Object.defineProperty(C, "name", { value: "C", configurable: true });
                        //     C = __decorate([dec], C);
                        //     export default C;
                        //
                        // * For a default export of a class declaration without a name:
                        //
                        //     @dec default export class {
                        //     }
                        //
                        //   The emit should be:
                        //
                        //     let _default = class {
                        //     }
                        //     _default = __decorate([dec], _default);
                        //     export default _default;
                        //
                        if (isES6ExportedDeclaration(node) && !(node.flags & 256 /* Default */)) {
                            write("export ");
                        }
                        write("let ");
                        emitDeclarationName(node);
                        write(" = ");
                    }
                    else if (isES6ExportedDeclaration(node)) {
                        write("export ");
                        if (node.flags & 256 /* Default */) {
                            write("default ");
                        }
                    }
                }
                // If the class has static properties, and it's a class expression, then we'll need
                // to specialize the emit a bit.  for a class expression of the form: 
                //
                //      class C { static a = 1; static b = 2; ... } 
                //
                // We'll emit:
                //
                //      (_temp = class C { ... }, _temp.a = 1, _temp.b = 2, _temp)
                //
                // This keeps the expression as an expression, while ensuring that the static parts
                // of it have been initialized by the time it is used.
                var staticProperties = getInitializedProperties(node, true);
                var isClassExpressionWithStaticProperties = staticProperties.length > 0 && node.kind === 174 /* ClassExpression */;
                var tempVariable;
                if (isClassExpressionWithStaticProperties) {
                    tempVariable = createAndRecordTempVariable(0 /* Auto */);
                    write("(");
                    increaseIndent();
                    emit(tempVariable);
                    write(" = ");
                }
                write("class");
                // check if this is an "export default class" as it may not have a name. Do not emit the name if the class is decorated.
                if ((node.name || !(node.flags & 256 /* Default */)) && !thisNodeIsDecorated) {
                    write(" ");
                    emitDeclarationName(node);
                }
                var baseTypeNode = ts.getClassExtendsHeritageClauseElement(node);
                if (baseTypeNode) {
                    write(" extends ");
                    emit(baseTypeNode.expression);
                }
                write(" {");
                increaseIndent();
                scopeEmitStart(node);
                writeLine();
                emitConstructor(node, baseTypeNode);
                emitMemberFunctionsForES6AndHigher(node);
                decreaseIndent();
                writeLine();
                emitToken(15 /* CloseBraceToken */, node.members.end);
                scopeEmitEnd();
                // For a decorated class, we need to assign its name (if it has one). This is because we emit
                // the class as a class expression to avoid the double-binding of the identifier:
                //
                //   let C = class {
                //   }
                //   Object.defineProperty(C, "name", { value: "C", configurable: true });
                //
                if (thisNodeIsDecorated) {
                    write(";");
                    if (node.name) {
                        writeLine();
                        write("Object.defineProperty(");
                        emitDeclarationName(node);
                        write(", \"name\", { value: \"");
                        emitDeclarationName(node);
                        write("\", configurable: true });");
                        writeLine();
                    }
                }
                // Emit static property assignment. Because classDeclaration is lexically evaluated,
                // it is safe to emit static property assignment after classDeclaration
                // From ES6 specification:
                //      HasLexicalDeclaration (N) : Determines if the argument identifier has a binding in this environment record that was created using
                //                                  a lexical declaration such as a LexicalDeclaration or a ClassDeclaration.
                if (isClassExpressionWithStaticProperties) {
                    for (var _i = 0; _i < staticProperties.length; _i++) {
                        var property = staticProperties[_i];
                        write(",");
                        writeLine();
                        emitPropertyDeclaration(node, property, tempVariable, true);
                    }
                    write(",");
                    writeLine();
                    emit(tempVariable);
                    decreaseIndent();
                    write(")");
                }
                else {
                    writeLine();
                    emitPropertyDeclarations(node, staticProperties);
                    emitDecoratorsOfClass(node);
                }
                // If this is an exported class, but not on the top level (i.e. on an internal
                // module), export it
                if (!isES6ExportedDeclaration(node) && (node.flags & 1 /* Export */)) {
                    writeLine();
                    emitStart(node);
                    emitModuleMemberName(node);
                    write(" = ");
                    emitDeclarationName(node);
                    emitEnd(node);
                    write(";");
                }
                else if (isES6ExportedDeclaration(node) && (node.flags & 256 /* Default */) && thisNodeIsDecorated) {
                    // if this is a top level default export of decorated class, write the export after the declaration.
                    writeLine();
                    write("export default ");
                    emitDeclarationName(node);
                    write(";");
                }
            }
            function emitClassLikeDeclarationBelowES6(node) {
                if (node.kind === 201 /* ClassDeclaration */) {
                    // source file level classes in system modules are hoisted so 'var's for them are already defined
                    if (!isSourceFileLevelDeclarationInSystemExternalModule(node, false)) {
                        write("var ");
                    }
                    emitDeclarationName(node);
                    write(" = ");
                }
                write("(function (");
                var baseTypeNode = ts.getClassExtendsHeritageClauseElement(node);
                if (baseTypeNode) {
                    write("_super");
                }
                write(") {");
                var saveTempFlags = tempFlags;
                var saveTempVariables = tempVariables;
                var saveTempParameters = tempParameters;
                var saveComputedPropertyNamesToGeneratedNames = computedPropertyNamesToGeneratedNames;
                tempFlags = 0;
                tempVariables = undefined;
                tempParameters = undefined;
                computedPropertyNamesToGeneratedNames = undefined;
                increaseIndent();
                scopeEmitStart(node);
                if (baseTypeNode) {
                    writeLine();
                    emitStart(baseTypeNode);
                    write("__extends(");
                    emitDeclarationName(node);
                    write(", _super);");
                    emitEnd(baseTypeNode);
                }
                writeLine();
                emitConstructor(node, baseTypeNode);
                emitMemberFunctionsForES5AndLower(node);
                emitPropertyDeclarations(node, getInitializedProperties(node, true));
                writeLine();
                emitDecoratorsOfClass(node);
                writeLine();
                emitToken(15 /* CloseBraceToken */, node.members.end, function () {
                    write("return ");
                    emitDeclarationName(node);
                });
                write(";");
                emitTempDeclarations(true);
                tempFlags = saveTempFlags;
                tempVariables = saveTempVariables;
                tempParameters = saveTempParameters;
                computedPropertyNamesToGeneratedNames = saveComputedPropertyNamesToGeneratedNames;
                decreaseIndent();
                writeLine();
                emitToken(15 /* CloseBraceToken */, node.members.end);
                scopeEmitEnd();
                emitStart(node);
                write(")(");
                if (baseTypeNode) {
                    emit(baseTypeNode.expression);
                }
                write(")");
                if (node.kind === 201 /* ClassDeclaration */) {
                    write(";");
                }
                emitEnd(node);
                if (node.kind === 201 /* ClassDeclaration */) {
                    emitExportMemberAssignment(node);
                }
                if (languageVersion < 2 /* ES6 */ && node.parent === currentSourceFile && node.name) {
                    emitExportMemberAssignments(node.name);
                }
            }
            function emitClassMemberPrefix(node, member) {
                emitDeclarationName(node);
                if (!(member.flags & 128 /* Static */)) {
                    write(".prototype");
                }
            }
            function emitDecoratorsOfClass(node) {
                emitDecoratorsOfMembers(node, 0);
                emitDecoratorsOfMembers(node, 128 /* Static */);
                emitDecoratorsOfConstructor(node);
            }
            function emitDecoratorsOfConstructor(node) {
                var decorators = node.decorators;
                var constructor = ts.getFirstConstructorWithBody(node);
                var hasDecoratedParameters = constructor && ts.forEach(constructor.parameters, ts.nodeIsDecorated);
                // skip decoration of the constructor if neither it nor its parameters are decorated
                if (!decorators && !hasDecoratedParameters) {
                    return;
                }
                // Emit the call to __decorate. Given the class:
                //
                //   @dec
                //   class C {
                //   }
                //
                // The emit for the class is:
                //
                //   C = __decorate([dec], C);
                //
                writeLine();
                emitStart(node);
                emitDeclarationName(node);
                write(" = __decorate([");
                increaseIndent();
                writeLine();
                var decoratorCount = decorators ? decorators.length : 0;
                var argumentsWritten = emitList(decorators, 0, decoratorCount, true, false, false, true, function (decorator) {
                    emitStart(decorator);
                    emit(decorator.expression);
                    emitEnd(decorator);
                });
                argumentsWritten += emitDecoratorsOfParameters(constructor, argumentsWritten > 0);
                emitSerializedTypeMetadata(node, argumentsWritten >= 0);
                decreaseIndent();
                writeLine();
                write("], ");
                emitDeclarationName(node);
                write(");");
                emitEnd(node);
                writeLine();
            }
            function emitDecoratorsOfMembers(node, staticFlag) {
                for (var _i = 0, _a = node.members; _i < _a.length; _i++) {
                    var member = _a[_i];
                    // only emit members in the correct group
                    if ((member.flags & 128 /* Static */) !== staticFlag) {
                        continue;
                    }
                    // skip members that cannot be decorated (such as the constructor)
                    if (!ts.nodeCanBeDecorated(member)) {
                        continue;
                    }
                    // skip a member if it or any of its parameters are not decorated
                    if (!ts.nodeOrChildIsDecorated(member)) {
                        continue;
                    }
                    // skip an accessor declaration if it is not the first accessor
                    var decorators = void 0;
                    var functionLikeMember = void 0;
                    if (ts.isAccessor(member)) {
                        var accessors = ts.getAllAccessorDeclarations(node.members, member);
                        if (member !== accessors.firstAccessor) {
                            continue;
                        }
                        // get the decorators from the first accessor with decorators
                        decorators = accessors.firstAccessor.decorators;
                        if (!decorators && accessors.secondAccessor) {
                            decorators = accessors.secondAccessor.decorators;
                        }
                        // we only decorate parameters of the set accessor
                        functionLikeMember = accessors.setAccessor;
                    }
                    else {
                        decorators = member.decorators;
                        // we only decorate the parameters here if this is a method
                        if (member.kind === 134 /* MethodDeclaration */) {
                            functionLikeMember = member;
                        }
                    }
                    // Emit the call to __decorate. Given the following:
                    //
                    //   class C {
                    //     @dec method(@dec2 x) {}
                    //     @dec get accessor() {}
                    //     @dec prop;
                    //   }
                    //
                    // The emit for a method is:
                    //
                    //   Object.defineProperty(C.prototype, "method", 
                    //       __decorate([
                    //           dec,
                    //           __param(0, dec2),
                    //           __metadata("design:type", Function),
                    //           __metadata("design:paramtypes", [Object]),
                    //           __metadata("design:returntype", void 0)
                    //       ], C.prototype, "method", Object.getOwnPropertyDescriptor(C.prototype, "method")));
                    // 
                    // The emit for an accessor is:
                    //
                    //   Object.defineProperty(C.prototype, "accessor", 
                    //       __decorate([
                    //           dec
                    //       ], C.prototype, "accessor", Object.getOwnPropertyDescriptor(C.prototype, "accessor")));
                    //
                    // The emit for a property is:
                    //
                    //   __decorate([
                    //       dec
                    //   ], C.prototype, "prop");
                    //
                    writeLine();
                    emitStart(member);
                    if (member.kind !== 132 /* PropertyDeclaration */) {
                        write("Object.defineProperty(");
                        emitStart(member.name);
                        emitClassMemberPrefix(node, member);
                        write(", ");
                        emitExpressionForPropertyName(member.name);
                        emitEnd(member.name);
                        write(",");
                        increaseIndent();
                        writeLine();
                    }
                    write("__decorate([");
                    increaseIndent();
                    writeLine();
                    var decoratorCount = decorators ? decorators.length : 0;
                    var argumentsWritten = emitList(decorators, 0, decoratorCount, true, false, false, true, function (decorator) {
                        emitStart(decorator);
                        emit(decorator.expression);
                        emitEnd(decorator);
                    });
                    argumentsWritten += emitDecoratorsOfParameters(functionLikeMember, argumentsWritten > 0);
                    emitSerializedTypeMetadata(member, argumentsWritten > 0);
                    decreaseIndent();
                    writeLine();
                    write("], ");
                    emitStart(member.name);
                    emitClassMemberPrefix(node, member);
                    write(", ");
                    emitExpressionForPropertyName(member.name);
                    emitEnd(member.name);
                    if (member.kind !== 132 /* PropertyDeclaration */) {
                        write(", Object.getOwnPropertyDescriptor(");
                        emitStart(member.name);
                        emitClassMemberPrefix(node, member);
                        write(", ");
                        emitExpressionForPropertyName(member.name);
                        emitEnd(member.name);
                        write("))");
                        decreaseIndent();
                    }
                    write(");");
                    emitEnd(member);
                    writeLine();
                }
            }
            function emitDecoratorsOfParameters(node, leadingComma) {
                var argumentsWritten = 0;
                if (node) {
                    var parameterIndex = 0;
                    for (var _i = 0, _a = node.parameters; _i < _a.length; _i++) {
                        var parameter = _a[_i];
                        if (ts.nodeIsDecorated(parameter)) {
                            var decorators = parameter.decorators;
                            argumentsWritten += emitList(decorators, 0, decorators.length, true, false, leadingComma, true, function (decorator) {
                                emitStart(decorator);
                                write("__param(" + parameterIndex + ", ");
                                emit(decorator.expression);
                                write(")");
                                emitEnd(decorator);
                            });
                            leadingComma = true;
                        }
                        ++parameterIndex;
                    }
                }
                return argumentsWritten;
            }
            function shouldEmitTypeMetadata(node) {
                // This method determines whether to emit the "design:type" metadata based on the node's kind.
                // The caller should have already tested whether the node has decorators and whether the emitDecoratorMetadata 
                // compiler option is set.
                switch (node.kind) {
                    case 134 /* MethodDeclaration */:
                    case 136 /* GetAccessor */:
                    case 137 /* SetAccessor */:
                    case 132 /* PropertyDeclaration */:
                        return true;
                }
                return false;
            }
            function shouldEmitReturnTypeMetadata(node) {
                // This method determines whether to emit the "design:returntype" metadata based on the node's kind.
                // The caller should have already tested whether the node has decorators and whether the emitDecoratorMetadata 
                // compiler option is set.
                switch (node.kind) {
                    case 134 /* MethodDeclaration */:
                        return true;
                }
                return false;
            }
            function shouldEmitParamTypesMetadata(node) {
                // This method determines whether to emit the "design:paramtypes" metadata based on the node's kind.
                // The caller should have already tested whether the node has decorators and whether the emitDecoratorMetadata 
                // compiler option is set.
                switch (node.kind) {
                    case 201 /* ClassDeclaration */:
                    case 134 /* MethodDeclaration */:
                    case 137 /* SetAccessor */:
                        return true;
                }
                return false;
            }
            function emitSerializedTypeMetadata(node, writeComma) {
                // This method emits the serialized type metadata for a decorator target.
                // The caller should have already tested whether the node has decorators.
                var argumentsWritten = 0;
                if (compilerOptions.emitDecoratorMetadata) {
                    if (shouldEmitTypeMetadata(node)) {
                        var serializedType = resolver.serializeTypeOfNode(node, getGeneratedNameForNode);
                        if (serializedType) {
                            if (writeComma) {
                                write(", ");
                            }
                            writeLine();
                            write("__metadata('design:type', ");
                            emitSerializedType(node, serializedType);
                            write(")");
                            argumentsWritten++;
                        }
                    }
                    if (shouldEmitParamTypesMetadata(node)) {
                        var serializedTypes = resolver.serializeParameterTypesOfNode(node, getGeneratedNameForNode);
                        if (serializedTypes) {
                            if (writeComma || argumentsWritten) {
                                write(", ");
                            }
                            writeLine();
                            write("__metadata('design:paramtypes', [");
                            for (var i = 0; i < serializedTypes.length; ++i) {
                                if (i > 0) {
                                    write(", ");
                                }
                                emitSerializedType(node, serializedTypes[i]);
                            }
                            write("])");
                            argumentsWritten++;
                        }
                    }
                    if (shouldEmitReturnTypeMetadata(node)) {
                        var serializedType = resolver.serializeReturnTypeOfNode(node, getGeneratedNameForNode);
                        if (serializedType) {
                            if (writeComma || argumentsWritten) {
                                write(", ");
                            }
                            writeLine();
                            write("__metadata('design:returntype', ");
                            emitSerializedType(node, serializedType);
                            write(")");
                            argumentsWritten++;
                        }
                    }
                }
                return argumentsWritten;
            }
            function serializeTypeNameSegment(location, path, index) {
                switch (index) {
                    case 0:
                        return "typeof " + path[index] + " !== 'undefined' && " + path[index];
                    case 1:
                        return serializeTypeNameSegment(location, path, index - 1) + "." + path[index];
                    default:
                        var temp = createAndRecordTempVariable(0 /* Auto */).text;
                        return "(" + temp + " = " + serializeTypeNameSegment(location, path, index - 1) + ") && " + temp + "." + path[index];
                }
            }
            function emitSerializedType(location, name) {
                if (typeof name === "string") {
                    write(name);
                    return;
                }
                else {
                    ts.Debug.assert(name.length > 0, "Invalid serialized type name");
                    write("(" + serializeTypeNameSegment(location, name, name.length - 1) + ") || Object");
                }
            }
            function emitInterfaceDeclaration(node) {
                emitOnlyPinnedOrTripleSlashComments(node);
            }
            function shouldEmitEnumDeclaration(node) {
                var isConstEnum = ts.isConst(node);
                return !isConstEnum || compilerOptions.preserveConstEnums || compilerOptions.separateCompilation;
            }
            function emitEnumDeclaration(node) {
                // const enums are completely erased during compilation.
                if (!shouldEmitEnumDeclaration(node)) {
                    return;
                }
                if (!(node.flags & 1 /* Export */) || isES6ExportedDeclaration(node)) {
                    emitStart(node);
                    if (isES6ExportedDeclaration(node)) {
                        write("export ");
                    }
                    write("var ");
                    emit(node.name);
                    emitEnd(node);
                    write(";");
                }
                writeLine();
                emitStart(node);
                write("(function (");
                emitStart(node.name);
                write(getGeneratedNameForNode(node));
                emitEnd(node.name);
                write(") {");
                increaseIndent();
                scopeEmitStart(node);
                emitLines(node.members);
                decreaseIndent();
                writeLine();
                emitToken(15 /* CloseBraceToken */, node.members.end);
                scopeEmitEnd();
                write(")(");
                emitModuleMemberName(node);
                write(" || (");
                emitModuleMemberName(node);
                write(" = {}));");
                emitEnd(node);
                if (!isES6ExportedDeclaration(node) && node.flags & 1 /* Export */) {
                    writeLine();
                    emitStart(node);
                    write("var ");
                    emit(node.name);
                    write(" = ");
                    emitModuleMemberName(node);
                    emitEnd(node);
                    write(";");
                }
                if (languageVersion < 2 /* ES6 */ && node.parent === currentSourceFile) {
                    emitExportMemberAssignments(node.name);
                }
            }
            function emitEnumMember(node) {
                var enumParent = node.parent;
                emitStart(node);
                write(getGeneratedNameForNode(enumParent));
                write("[");
                write(getGeneratedNameForNode(enumParent));
                write("[");
                emitExpressionForPropertyName(node.name);
                write("] = ");
                writeEnumMemberDeclarationValue(node);
                write("] = ");
                emitExpressionForPropertyName(node.name);
                emitEnd(node);
                write(";");
            }
            function writeEnumMemberDeclarationValue(member) {
                var value = resolver.getConstantValue(member);
                if (value !== undefined) {
                    write(value.toString());
                    return;
                }
                else if (member.initializer) {
                    emit(member.initializer);
                }
                else {
                    write("undefined");
                }
            }
            function getInnerMostModuleDeclarationFromDottedModule(moduleDeclaration) {
                if (moduleDeclaration.body.kind === 205 /* ModuleDeclaration */) {
                    var recursiveInnerModule = getInnerMostModuleDeclarationFromDottedModule(moduleDeclaration.body);
                    return recursiveInnerModule || moduleDeclaration.body;
                }
            }
            function shouldEmitModuleDeclaration(node) {
                return ts.isInstantiatedModule(node, compilerOptions.preserveConstEnums || compilerOptions.separateCompilation);
            }
            function isModuleMergedWithES6Class(node) {
                return languageVersion === 2 /* ES6 */ && !!(resolver.getNodeCheckFlags(node) & 2048 /* LexicalModuleMergesWithClass */);
            }
            function emitModuleDeclaration(node) {
                // Emit only if this module is non-ambient.
                var shouldEmit = shouldEmitModuleDeclaration(node);
                if (!shouldEmit) {
                    return emitOnlyPinnedOrTripleSlashComments(node);
                }
                var hoistedInDeclarationScope = isSourceFileLevelDeclarationInSystemExternalModule(node, false);
                var emitVarForModule = !hoistedInDeclarationScope && !isModuleMergedWithES6Class(node);
                if (emitVarForModule) {
                    emitStart(node);
                    if (isES6ExportedDeclaration(node)) {
                        write("export ");
                    }
                    write("var ");
                    emit(node.name);
                    write(";");
                    emitEnd(node);
                    writeLine();
                }
                emitStart(node);
                write("(function (");
                emitStart(node.name);
                write(getGeneratedNameForNode(node));
                emitEnd(node.name);
                write(") ");
                if (node.body.kind === 206 /* ModuleBlock */) {
                    var saveTempFlags = tempFlags;
                    var saveTempVariables = tempVariables;
                    tempFlags = 0;
                    tempVariables = undefined;
                    emit(node.body);
                    tempFlags = saveTempFlags;
                    tempVariables = saveTempVariables;
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
                    var moduleBlock = getInnerMostModuleDeclarationFromDottedModule(node).body;
                    emitToken(15 /* CloseBraceToken */, moduleBlock.statements.end);
                    scopeEmitEnd();
                }
                write(")(");
                // write moduleDecl = containingModule.m only if it is not exported es6 module member
                if ((node.flags & 1 /* Export */) && !isES6ExportedDeclaration(node)) {
                    emit(node.name);
                    write(" = ");
                }
                emitModuleMemberName(node);
                write(" || (");
                emitModuleMemberName(node);
                write(" = {}));");
                emitEnd(node);
                if (!isES6ExportedDeclaration(node) && node.name.kind === 65 /* Identifier */ && node.parent === currentSourceFile) {
                    if (compilerOptions.module === 3 /* System */ && (node.flags & 1 /* Export */)) {
                        writeLine();
                        write(exportFunctionForFile + "(\"");
                        emitDeclarationName(node);
                        write("\", ");
                        emitDeclarationName(node);
                        write(")");
                    }
                    emitExportMemberAssignments(node.name);
                }
            }
            function emitRequire(moduleName) {
                if (moduleName.kind === 8 /* StringLiteral */) {
                    write("require(");
                    emitStart(moduleName);
                    emitLiteral(moduleName);
                    emitEnd(moduleName);
                    emitToken(17 /* CloseParenToken */, moduleName.end);
                }
                else {
                    write("require()");
                }
            }
            function getNamespaceDeclarationNode(node) {
                if (node.kind === 208 /* ImportEqualsDeclaration */) {
                    return node;
                }
                var importClause = node.importClause;
                if (importClause && importClause.namedBindings && importClause.namedBindings.kind === 211 /* NamespaceImport */) {
                    return importClause.namedBindings;
                }
            }
            function isDefaultImport(node) {
                return node.kind === 209 /* ImportDeclaration */ && node.importClause && !!node.importClause.name;
            }
            function emitExportImportAssignments(node) {
                if (ts.isAliasSymbolDeclaration(node) && resolver.isValueAliasDeclaration(node)) {
                    emitExportMemberAssignments(node.name);
                }
                ts.forEachChild(node, emitExportImportAssignments);
            }
            function emitImportDeclaration(node) {
                if (languageVersion < 2 /* ES6 */) {
                    return emitExternalImportDeclaration(node);
                }
                // ES6 import
                if (node.importClause) {
                    var shouldEmitDefaultBindings = resolver.isReferencedAliasDeclaration(node.importClause);
                    var shouldEmitNamedBindings = node.importClause.namedBindings && resolver.isReferencedAliasDeclaration(node.importClause.namedBindings, true);
                    if (shouldEmitDefaultBindings || shouldEmitNamedBindings) {
                        write("import ");
                        emitStart(node.importClause);
                        if (shouldEmitDefaultBindings) {
                            emit(node.importClause.name);
                            if (shouldEmitNamedBindings) {
                                write(", ");
                            }
                        }
                        if (shouldEmitNamedBindings) {
                            emitLeadingComments(node.importClause.namedBindings);
                            emitStart(node.importClause.namedBindings);
                            if (node.importClause.namedBindings.kind === 211 /* NamespaceImport */) {
                                write("* as ");
                                emit(node.importClause.namedBindings.name);
                            }
                            else {
                                write("{ ");
                                emitExportOrImportSpecifierList(node.importClause.namedBindings.elements, resolver.isReferencedAliasDeclaration);
                                write(" }");
                            }
                            emitEnd(node.importClause.namedBindings);
                            emitTrailingComments(node.importClause.namedBindings);
                        }
                        emitEnd(node.importClause);
                        write(" from ");
                        emit(node.moduleSpecifier);
                        write(";");
                    }
                }
                else {
                    write("import ");
                    emit(node.moduleSpecifier);
                    write(";");
                }
            }
            function emitExternalImportDeclaration(node) {
                if (ts.contains(externalImports, node)) {
                    var isExportedImport = node.kind === 208 /* ImportEqualsDeclaration */ && (node.flags & 1 /* Export */) !== 0;
                    var namespaceDeclaration = getNamespaceDeclarationNode(node);
                    if (compilerOptions.module !== 2 /* AMD */) {
                        emitLeadingComments(node);
                        emitStart(node);
                        if (namespaceDeclaration && !isDefaultImport(node)) {
                            // import x = require("foo")
                            // import * as x from "foo"
                            if (!isExportedImport)
                                write("var ");
                            emitModuleMemberName(namespaceDeclaration);
                            write(" = ");
                        }
                        else {
                            // import "foo"
                            // import x from "foo"
                            // import { x, y } from "foo"
                            // import d, * as x from "foo"
                            // import d, { x, y } from "foo"
                            var isNakedImport = 209 /* ImportDeclaration */ && !node.importClause;
                            if (!isNakedImport) {
                                write("var ");
                                write(getGeneratedNameForNode(node));
                                write(" = ");
                            }
                        }
                        emitRequire(ts.getExternalModuleName(node));
                        if (namespaceDeclaration && isDefaultImport(node)) {
                            // import d, * as x from "foo"
                            write(", ");
                            emitModuleMemberName(namespaceDeclaration);
                            write(" = ");
                            write(getGeneratedNameForNode(node));
                        }
                        write(";");
                        emitEnd(node);
                        emitExportImportAssignments(node);
                        emitTrailingComments(node);
                    }
                    else {
                        if (isExportedImport) {
                            emitModuleMemberName(namespaceDeclaration);
                            write(" = ");
                            emit(namespaceDeclaration.name);
                            write(";");
                        }
                        else if (namespaceDeclaration && isDefaultImport(node)) {
                            // import d, * as x from "foo"
                            write("var ");
                            emitModuleMemberName(namespaceDeclaration);
                            write(" = ");
                            write(getGeneratedNameForNode(node));
                            write(";");
                        }
                        emitExportImportAssignments(node);
                    }
                }
            }
            function emitImportEqualsDeclaration(node) {
                if (ts.isExternalModuleImportEqualsDeclaration(node)) {
                    emitExternalImportDeclaration(node);
                    return;
                }
                // preserve old compiler's behavior: emit 'var' for import declaration (even if we do not consider them referenced) when
                // - current file is not external module
                // - import declaration is top level and target is value imported by entity name
                if (resolver.isReferencedAliasDeclaration(node) ||
                    (!ts.isExternalModule(currentSourceFile) && resolver.isTopLevelValueImportEqualsWithEntityName(node))) {
                    emitLeadingComments(node);
                    emitStart(node);
                    if (isES6ExportedDeclaration(node)) {
                        write("export ");
                        write("var ");
                    }
                    else if (!(node.flags & 1 /* Export */)) {
                        write("var ");
                    }
                    emitModuleMemberName(node);
                    write(" = ");
                    emit(node.moduleReference);
                    write(";");
                    emitEnd(node);
                    emitExportImportAssignments(node);
                    emitTrailingComments(node);
                }
            }
            function emitExportDeclaration(node) {
                ts.Debug.assert(compilerOptions.module !== 3 /* System */);
                if (languageVersion < 2 /* ES6 */) {
                    if (node.moduleSpecifier && (!node.exportClause || resolver.isValueAliasDeclaration(node))) {
                        emitStart(node);
                        var generatedName = getGeneratedNameForNode(node);
                        if (node.exportClause) {
                            // export { x, y, ... } from "foo"
                            if (compilerOptions.module !== 2 /* AMD */) {
                                write("var ");
                                write(generatedName);
                                write(" = ");
                                emitRequire(ts.getExternalModuleName(node));
                                write(";");
                            }
                            for (var _i = 0, _a = node.exportClause.elements; _i < _a.length; _i++) {
                                var specifier = _a[_i];
                                if (resolver.isValueAliasDeclaration(specifier)) {
                                    writeLine();
                                    emitStart(specifier);
                                    emitContainingModuleName(specifier);
                                    write(".");
                                    emitNodeWithoutSourceMap(specifier.name);
                                    write(" = ");
                                    write(generatedName);
                                    write(".");
                                    emitNodeWithoutSourceMap(specifier.propertyName || specifier.name);
                                    write(";");
                                    emitEnd(specifier);
                                }
                            }
                        }
                        else {
                            // export * from "foo"
                            writeLine();
                            write("__export(");
                            if (compilerOptions.module !== 2 /* AMD */) {
                                emitRequire(ts.getExternalModuleName(node));
                            }
                            else {
                                write(generatedName);
                            }
                            write(");");
                        }
                        emitEnd(node);
                    }
                }
                else {
                    if (!node.exportClause || resolver.isValueAliasDeclaration(node)) {
                        emitStart(node);
                        write("export ");
                        if (node.exportClause) {
                            // export { x, y, ... }
                            write("{ ");
                            emitExportOrImportSpecifierList(node.exportClause.elements, resolver.isValueAliasDeclaration);
                            write(" }");
                        }
                        else {
                            write("*");
                        }
                        if (node.moduleSpecifier) {
                            write(" from ");
                            emitNodeWithoutSourceMap(node.moduleSpecifier);
                        }
                        write(";");
                        emitEnd(node);
                    }
                }
            }
            function emitExportOrImportSpecifierList(specifiers, shouldEmit) {
                ts.Debug.assert(languageVersion >= 2 /* ES6 */);
                var needsComma = false;
                for (var _i = 0; _i < specifiers.length; _i++) {
                    var specifier = specifiers[_i];
                    if (shouldEmit(specifier)) {
                        if (needsComma) {
                            write(", ");
                        }
                        emitStart(specifier);
                        if (specifier.propertyName) {
                            emitNodeWithoutSourceMap(specifier.propertyName);
                            write(" as ");
                        }
                        emitNodeWithoutSourceMap(specifier.name);
                        emitEnd(specifier);
                        needsComma = true;
                    }
                }
            }
            function emitExportAssignment(node) {
                if (!node.isExportEquals && resolver.isValueAliasDeclaration(node)) {
                    if (languageVersion >= 2 /* ES6 */) {
                        writeLine();
                        emitStart(node);
                        write("export default ");
                        var expression = node.expression;
                        emit(expression);
                        if (expression.kind !== 200 /* FunctionDeclaration */ &&
                            expression.kind !== 201 /* ClassDeclaration */) {
                            write(";");
                        }
                        emitEnd(node);
                    }
                    else {
                        writeLine();
                        emitStart(node);
                        if (compilerOptions.module === 3 /* System */) {
                            write(exportFunctionForFile + "(\"default\",");
                            emit(node.expression);
                            write(")");
                        }
                        else {
                            emitContainingModuleName(node);
                            if (languageVersion === 0 /* ES3 */) {
                                write("[\"default\"] = ");
                            }
                            else {
                                write(".default = ");
                            }
                            emit(node.expression);
                        }
                        write(";");
                        emitEnd(node);
                    }
                }
            }
            function collectExternalModuleInfo(sourceFile) {
                externalImports = [];
                exportSpecifiers = {};
                exportEquals = undefined;
                hasExportStars = false;
                for (var _i = 0, _a = sourceFile.statements; _i < _a.length; _i++) {
                    var node = _a[_i];
                    switch (node.kind) {
                        case 209 /* ImportDeclaration */:
                            if (!node.importClause ||
                                resolver.isReferencedAliasDeclaration(node.importClause, true)) {
                                // import "mod"
                                // import x from "mod" where x is referenced
                                // import * as x from "mod" where x is referenced
                                // import { x, y } from "mod" where at least one import is referenced
                                externalImports.push(node);
                            }
                            break;
                        case 208 /* ImportEqualsDeclaration */:
                            if (node.moduleReference.kind === 219 /* ExternalModuleReference */ && resolver.isReferencedAliasDeclaration(node)) {
                                // import x = require("mod") where x is referenced
                                externalImports.push(node);
                            }
                            break;
                        case 215 /* ExportDeclaration */:
                            if (node.moduleSpecifier) {
                                if (!node.exportClause) {
                                    // export * from "mod"
                                    externalImports.push(node);
                                    hasExportStars = true;
                                }
                                else if (resolver.isValueAliasDeclaration(node)) {
                                    // export { x, y } from "mod" where at least one export is a value symbol
                                    externalImports.push(node);
                                }
                            }
                            else {
                                // export { x, y }
                                for (var _b = 0, _c = node.exportClause.elements; _b < _c.length; _b++) {
                                    var specifier = _c[_b];
                                    var name_6 = (specifier.propertyName || specifier.name).text;
                                    (exportSpecifiers[name_6] || (exportSpecifiers[name_6] = [])).push(specifier);
                                }
                            }
                            break;
                        case 214 /* ExportAssignment */:
                            if (node.isExportEquals && !exportEquals) {
                                // export = x
                                exportEquals = node;
                            }
                            break;
                    }
                }
            }
            function emitExportStarHelper() {
                if (hasExportStars) {
                    writeLine();
                    write("function __export(m) {");
                    increaseIndent();
                    writeLine();
                    write("for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];");
                    decreaseIndent();
                    writeLine();
                    write("}");
                }
            }
            function getLocalNameForExternalImport(importNode) {
                var namespaceDeclaration = getNamespaceDeclarationNode(importNode);
                if (namespaceDeclaration && !isDefaultImport(importNode)) {
                    return ts.getSourceTextOfNodeFromSourceFile(currentSourceFile, namespaceDeclaration.name);
                }
                else {
                    return getGeneratedNameForNode(importNode);
                }
            }
            function getExternalModuleNameText(importNode) {
                var moduleName = ts.getExternalModuleName(importNode);
                if (moduleName.kind === 8 /* StringLiteral */) {
                    return getLiteralText(moduleName);
                }
                return undefined;
            }
            function emitVariableDeclarationsForImports() {
                if (externalImports.length === 0) {
                    return;
                }
                writeLine();
                var started = false;
                for (var _i = 0; _i < externalImports.length; _i++) {
                    var importNode = externalImports[_i];
                    // do not create variable declaration for exports and imports that lack import clause
                    var skipNode = importNode.kind === 215 /* ExportDeclaration */ ||
                        (importNode.kind === 209 /* ImportDeclaration */ && !importNode.importClause);
                    if (skipNode) {
                        continue;
                    }
                    if (!started) {
                        write("var ");
                        started = true;
                    }
                    else {
                        write(", ");
                    }
                    write(getLocalNameForExternalImport(importNode));
                }
                if (started) {
                    write(";");
                }
            }
            function hoistTopLevelVariableAndFunctionDeclarations(node) {
                // per ES6 spec: 
                // 15.2.1.16.4 ModuleDeclarationInstantiation() Concrete Method
                // - var declarations are initialized to undefined - 14.a.ii
                // - function/generator declarations are instantiated - 16.a.iv
                // this means that after module is instantiated but before its evaluation
                // exported functions are already accessible at import sites
                // in theory we should hoist only exported functions and its dependencies
                // in practice to simplify things we'll hoist all source level functions and variable declaration
                // including variables declarations for module and class declarations
                var hoistedVars;
                var hoistedFunctionDeclarations;
                visit(node);
                if (hoistedVars) {
                    writeLine();
                    write("var ");
                    for (var i = 0; i < hoistedVars.length; ++i) {
                        var local = hoistedVars[i];
                        if (i !== 0) {
                            write(", ");
                        }
                        if (local.kind === 201 /* ClassDeclaration */ || local.kind === 205 /* ModuleDeclaration */) {
                            emitDeclarationName(local);
                        }
                        else {
                            emit(local);
                        }
                    }
                    write(";");
                }
                if (hoistedFunctionDeclarations) {
                    for (var _i = 0; _i < hoistedFunctionDeclarations.length; _i++) {
                        var f = hoistedFunctionDeclarations[_i];
                        writeLine();
                        emit(f);
                    }
                }
                function visit(node) {
                    if (node.kind === 200 /* FunctionDeclaration */) {
                        if (!hoistedFunctionDeclarations) {
                            hoistedFunctionDeclarations = [];
                        }
                        hoistedFunctionDeclarations.push(node);
                        return;
                    }
                    if (node.kind === 201 /* ClassDeclaration */) {
                        // TODO: rename block scoped classes
                        if (!hoistedVars) {
                            hoistedVars = [];
                        }
                        hoistedVars.push(node);
                        return;
                    }
                    if (node.kind === 205 /* ModuleDeclaration */ && shouldEmitModuleDeclaration(node)) {
                        if (!hoistedVars) {
                            hoistedVars = [];
                        }
                        hoistedVars.push(node);
                        return;
                    }
                    if (node.kind === 198 /* VariableDeclaration */ || node.kind === 152 /* BindingElement */) {
                        if (shouldHoistVariable(node, false)) {
                            var name_7 = node.name;
                            if (name_7.kind === 65 /* Identifier */) {
                                if (!hoistedVars) {
                                    hoistedVars = [];
                                }
                                hoistedVars.push(name_7);
                            }
                            else {
                                ts.forEachChild(name_7, visit);
                            }
                        }
                        return;
                    }
                    if (ts.isBindingPattern(node)) {
                        ts.forEach(node.elements, visit);
                        return;
                    }
                    if (!ts.isDeclaration(node)) {
                        ts.forEachChild(node, visit);
                    }
                }
            }
            function shouldHoistVariable(node, checkIfSourceFileLevelDecl) {
                if (checkIfSourceFileLevelDecl && !isSourceFileLevelDeclarationInSystemExternalModule(node, false)) {
                    return false;
                }
                // hoist variable if
                // - it is not block scoped
                // - it is top level block scoped
                // if block scoped variables are nested in some another block then 
                // no other functions can use them except ones that are defined at least in the same block
                return (ts.getCombinedNodeFlags(node) & 12288 /* BlockScoped */) === 0 ||
                    ts.getEnclosingBlockScopeContainer(node).kind === 227 /* SourceFile */;
            }
            function isCurrentFileSystemExternalModule() {
                return compilerOptions.module === 3 /* System */ && ts.isExternalModule(currentSourceFile);
            }
            function emitSystemModuleBody(node, startIndex) {
                // shape of the body in system modules:
                // function (exports) {
                //     <list of local aliases for imports>
                //     <hoisted function declarations>
                //     <hoisted variable declarations>
                //     return {
                //         setters: [
                //             <list of setter function for imports>
                //         ],
                //         execute: function() {
                //             <module statements>
                //         }
                //     }
                //     <temp declarations>
                // }
                // I.e:
                // import {x} from 'file1'
                // var y = 1;
                // export function foo() { return y + x(); }
                // console.log(y);
                // will be transformed to
                // function(exports) {
                //     var file1; // local alias
                //     var y;
                //     function foo() { return y + file1.x(); }
                //     exports("foo", foo);
                //     return {
                //         setters: [
                //             function(v) { file1 = v }
                //         ],
                //         execute(): function() {
                //             y = 1;
                //             console.log(y);
                //         }
                //     };
                // }
                emitVariableDeclarationsForImports();
                writeLine();
                hoistTopLevelVariableAndFunctionDeclarations(node);
                writeLine();
                write("return {");
                increaseIndent();
                writeLine();
                emitSetters();
                writeLine();
                emitExecute(node, startIndex);
                emitTempDeclarations(true);
                decreaseIndent();
                writeLine();
                write("}"); // return
            }
            function emitSetters() {
                write("setters:[");
                for (var i = 0; i < externalImports.length; ++i) {
                    if (i !== 0) {
                        write(",");
                    }
                    writeLine();
                    increaseIndent();
                    var importNode = externalImports[i];
                    var importVariableName = getLocalNameForExternalImport(importNode) || "";
                    var parameterName = "_" + importVariableName;
                    write("function (" + parameterName + ") {");
                    switch (importNode.kind) {
                        case 209 /* ImportDeclaration */:
                            if (!importNode.importClause) {
                                // 'import "..."' case
                                // module is imported only for side-effects, setter body will be empty
                                break;
                            }
                        // fall-through
                        case 208 /* ImportEqualsDeclaration */:
                            ts.Debug.assert(importVariableName !== "");
                            increaseIndent();
                            writeLine();
                            // save import into the local
                            write(importVariableName + " = " + parameterName);
                            writeLine();
                            var defaultName = importNode.kind === 209 /* ImportDeclaration */
                                ? importNode.importClause.name
                                : importNode.name;
                            if (defaultName) {
                                // emit re-export for imported default name
                                // import n1 from 'foo1'
                                // import n2 = require('foo2')
                                // export {n1}
                                // export {n2}
                                emitExportMemberAssignments(defaultName);
                                writeLine();
                            }
                            if (importNode.kind === 209 /* ImportDeclaration */ &&
                                importNode.importClause.namedBindings) {
                                var namedBindings = importNode.importClause.namedBindings;
                                if (namedBindings.kind === 211 /* NamespaceImport */) {
                                    // emit re-export for namespace
                                    // import * as n from 'foo'
                                    // export {n}
                                    emitExportMemberAssignments(namedBindings.name);
                                    writeLine();
                                }
                                else {
                                    // emit re-exports for named imports
                                    // import {a, b} from 'foo'
                                    // export {a, b as c}
                                    for (var _i = 0, _a = namedBindings.elements; _i < _a.length; _i++) {
                                        var element = _a[_i];
                                        emitExportMemberAssignments(element.name || element.propertyName);
                                        writeLine();
                                    }
                                }
                            }
                            decreaseIndent();
                            break;
                        case 215 /* ExportDeclaration */:
                            ts.Debug.assert(importVariableName !== "");
                            increaseIndent();
                            if (importNode.exportClause) {
                                // export {a, b as c} from 'foo'
                                // emit as:
                                // exports('a', _foo["a"])
                                // exports('c', _foo["b"])
                                for (var _b = 0, _c = importNode.exportClause.elements; _b < _c.length; _b++) {
                                    var e = _c[_b];
                                    writeLine();
                                    write(exportFunctionForFile + "(\"");
                                    emitNodeWithoutSourceMap(e.name);
                                    write("\", " + parameterName + "[\"");
                                    emitNodeWithoutSourceMap(e.propertyName || e.name);
                                    write("\"]);");
                                }
                            }
                            else {
                                writeLine();
                                // export * from 'foo'
                                // emit as:
                                // for (var n in _foo) exports(n, _foo[n]);
                                // NOTE: it is safe to use name 'n' since parameter name always starts with '_'
                                write("for (var n in " + parameterName + ") " + exportFunctionForFile + "(n, " + parameterName + "[n]);");
                            }
                            writeLine();
                            decreaseIndent();
                            break;
                    }
                    write("}");
                    decreaseIndent();
                }
                write("],");
            }
            function emitExecute(node, startIndex) {
                write("execute: function() {");
                increaseIndent();
                writeLine();
                for (var i = startIndex; i < node.statements.length; ++i) {
                    var statement = node.statements[i];
                    // - imports/exports are not emitted for system modules
                    // - function declarations are not emitted because they were already hoisted
                    switch (statement.kind) {
                        case 215 /* ExportDeclaration */:
                        case 209 /* ImportDeclaration */:
                        case 208 /* ImportEqualsDeclaration */:
                        case 200 /* FunctionDeclaration */:
                            continue;
                    }
                    writeLine();
                    emit(statement);
                }
                decreaseIndent();
                writeLine();
                write("}"); // execute
            }
            function emitSystemModule(node, startIndex) {
                collectExternalModuleInfo(node);
                // System modules has the following shape
                // System.register(['dep-1', ... 'dep-n'], function(exports) {/* module body function */})
                // 'exports' here is a function 'exports<T>(name: string, value: T): T' that is used to publish exported values.
                // 'exports' returns its 'value' argument so in most cases expressions 
                // that mutate exported values can be rewritten as:
                // expr -> exports('name', expr). 
                // The only exception in this rule is postfix unary operators, 
                // see comment to 'emitPostfixUnaryExpression' for more details
                ts.Debug.assert(!exportFunctionForFile);
                // make sure that  name of 'exports' function does not conflict with existing identifiers
                exportFunctionForFile = makeUniqueName("exports");
                write("System.register([");
                for (var i = 0; i < externalImports.length; ++i) {
                    var text = getExternalModuleNameText(externalImports[i]);
                    if (i !== 0) {
                        write(", ");
                    }
                    write(text);
                }
                write("], function(" + exportFunctionForFile + ") {");
                writeLine();
                increaseIndent();
                emitCaptureThisForNodeIfNecessary(node);
                emitSystemModuleBody(node, startIndex);
                decreaseIndent();
                writeLine();
                write("});");
            }
            function emitAMDModule(node, startIndex) {
                collectExternalModuleInfo(node);
                // An AMD define function has the following shape:
                //     define(id?, dependencies?, factory);
                //
                // This has the shape of
                //     define(name, ["module1", "module2"], function (module1Alias) {
                // The location of the alias in the parameter list in the factory function needs to 
                // match the position of the module name in the dependency list.
                //
                // To ensure this is true in cases of modules with no aliases, e.g.: 
                // `import "module"` or `<amd-dependency path= "a.css" />` 
                // we need to add modules without alias names to the end of the dependencies list
                var aliasedModuleNames = []; // names of modules with corresponding parameter in the 
                // factory function.
                var unaliasedModuleNames = []; // names of modules with no corresponding parameters in
                // factory function.
                var importAliasNames = []; // names of the parameters in the factory function; these 
                // parameters need to match the indexes of the corresponding 
                // module names in aliasedModuleNames.
                // Fill in amd-dependency tags
                for (var _i = 0, _a = node.amdDependencies; _i < _a.length; _i++) {
                    var amdDependency = _a[_i];
                    if (amdDependency.name) {
                        aliasedModuleNames.push("\"" + amdDependency.path + "\"");
                        importAliasNames.push(amdDependency.name);
                    }
                    else {
                        unaliasedModuleNames.push("\"" + amdDependency.path + "\"");
                    }
                }
                for (var _b = 0; _b < externalImports.length; _b++) {
                    var importNode = externalImports[_b];
                    // Find the name of the external module
                    var externalModuleName = getExternalModuleNameText(importNode);
                    // Find the name of the module alias, if there is one
                    var importAliasName = getLocalNameForExternalImport(importNode);
                    if (importAliasName) {
                        aliasedModuleNames.push(externalModuleName);
                        importAliasNames.push(importAliasName);
                    }
                    else {
                        unaliasedModuleNames.push(externalModuleName);
                    }
                }
                writeLine();
                write("define(");
                if (node.amdModuleName) {
                    write("\"" + node.amdModuleName + "\", ");
                }
                write("[\"require\", \"exports\"");
                if (aliasedModuleNames.length) {
                    write(", ");
                    write(aliasedModuleNames.join(", "));
                }
                if (unaliasedModuleNames.length) {
                    write(", ");
                    write(unaliasedModuleNames.join(", "));
                }
                write("], function (require, exports");
                if (importAliasNames.length) {
                    write(", ");
                    write(importAliasNames.join(", "));
                }
                write(") {");
                increaseIndent();
                emitExportStarHelper();
                emitCaptureThisForNodeIfNecessary(node);
                emitLinesStartingAt(node.statements, startIndex);
                emitTempDeclarations(true);
                emitExportEquals(true);
                decreaseIndent();
                writeLine();
                write("});");
            }
            function emitCommonJSModule(node, startIndex) {
                collectExternalModuleInfo(node);
                emitExportStarHelper();
                emitCaptureThisForNodeIfNecessary(node);
                emitLinesStartingAt(node.statements, startIndex);
                emitTempDeclarations(true);
                emitExportEquals(false);
            }
            function emitES6Module(node, startIndex) {
                externalImports = undefined;
                exportSpecifiers = undefined;
                exportEquals = undefined;
                hasExportStars = false;
                emitCaptureThisForNodeIfNecessary(node);
                emitLinesStartingAt(node.statements, startIndex);
                emitTempDeclarations(true);
                // Emit exportDefault if it exists will happen as part 
                // or normal statement emit.
            }
            function emitExportEquals(emitAsReturn) {
                if (exportEquals && resolver.isValueAliasDeclaration(exportEquals)) {
                    writeLine();
                    emitStart(exportEquals);
                    write(emitAsReturn ? "return " : "module.exports = ");
                    emit(exportEquals.expression);
                    write(";");
                    emitEnd(exportEquals);
                }
            }
            function emitDirectivePrologues(statements, startWithNewLine) {
                for (var i = 0; i < statements.length; ++i) {
                    if (ts.isPrologueDirective(statements[i])) {
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
            function writeLines(text) {
                var lines = text.split(/\r\n|\r|\n/g);
                for (var i = 0; i < lines.length; ++i) {
                    var line = lines[i];
                    if (line.length) {
                        writeLine();
                        write(line);
                    }
                }
            }
            function emitSourceFileNode(node) {
                // Start new file on new line
                writeLine();
                emitDetachedComments(node);
                // emit prologue directives prior to __extends
                var startIndex = emitDirectivePrologues(node.statements, false);
                // Only Emit __extends function when target ES5.
                // For target ES6 and above, we can emit classDeclaration as is.
                if ((languageVersion < 2 /* ES6 */) && (!extendsEmitted && resolver.getNodeCheckFlags(node) & 8 /* EmitExtends */)) {
                    writeLines(extendsHelper);
                    extendsEmitted = true;
                }
                if (!decorateEmitted && resolver.getNodeCheckFlags(node) & 512 /* EmitDecorate */) {
                    writeLines(decorateHelper);
                    if (compilerOptions.emitDecoratorMetadata) {
                        writeLines(metadataHelper);
                    }
                    decorateEmitted = true;
                }
                if (!paramEmitted && resolver.getNodeCheckFlags(node) & 1024 /* EmitParam */) {
                    writeLines(paramHelper);
                    paramEmitted = true;
                }
                if (ts.isExternalModule(node)) {
                    if (languageVersion >= 2 /* ES6 */) {
                        emitES6Module(node, startIndex);
                    }
                    else if (compilerOptions.module === 2 /* AMD */) {
                        emitAMDModule(node, startIndex);
                    }
                    else if (compilerOptions.module === 3 /* System */) {
                        emitSystemModule(node, startIndex);
                    }
                    else {
                        emitCommonJSModule(node, startIndex);
                    }
                }
                else {
                    externalImports = undefined;
                    exportSpecifiers = undefined;
                    exportEquals = undefined;
                    hasExportStars = false;
                    emitCaptureThisForNodeIfNecessary(node);
                    emitLinesStartingAt(node.statements, startIndex);
                    emitTempDeclarations(true);
                }
                emitLeadingComments(node.endOfFileToken);
            }
            function emitNodeWithoutSourceMap(node, allowGeneratedIdentifiers) {
                if (!node) {
                    return;
                }
                if (node.flags & 2 /* Ambient */) {
                    return emitOnlyPinnedOrTripleSlashComments(node);
                }
                var emitComments = shouldEmitLeadingAndTrailingComments(node);
                if (emitComments) {
                    emitLeadingComments(node);
                }
                emitJavaScriptWorker(node, allowGeneratedIdentifiers);
                if (emitComments) {
                    emitTrailingComments(node);
                }
            }
            function shouldEmitLeadingAndTrailingComments(node) {
                switch (node.kind) {
                    // All of these entities are emitted in a specialized fashion.  As such, we allow
                    // the specialized methods for each to handle the comments on the nodes.
                    case 202 /* InterfaceDeclaration */:
                    case 200 /* FunctionDeclaration */:
                    case 209 /* ImportDeclaration */:
                    case 208 /* ImportEqualsDeclaration */:
                    case 203 /* TypeAliasDeclaration */:
                    case 214 /* ExportAssignment */:
                        return false;
                    case 205 /* ModuleDeclaration */:
                        // Only emit the leading/trailing comments for a module if we're actually
                        // emitting the module as well.
                        return shouldEmitModuleDeclaration(node);
                    case 204 /* EnumDeclaration */:
                        // Only emit the leading/trailing comments for an enum if we're actually
                        // emitting the module as well.
                        return shouldEmitEnumDeclaration(node);
                }
                // If this is the expression body of an arrow function that we're down-leveling, 
                // then we don't want to emit comments when we emit the body.  It will have already
                // been taken care of when we emitted the 'return' statement for the function
                // expression body.
                if (node.kind !== 179 /* Block */ &&
                    node.parent &&
                    node.parent.kind === 163 /* ArrowFunction */ &&
                    node.parent.body === node &&
                    compilerOptions.target <= 1 /* ES5 */) {
                    return false;
                }
                // Emit comments for everything else.
                return true;
            }
            function emitJavaScriptWorker(node, allowGeneratedIdentifiers) {
                if (allowGeneratedIdentifiers === void 0) { allowGeneratedIdentifiers = true; }
                // Check if the node can be emitted regardless of the ScriptTarget
                switch (node.kind) {
                    case 65 /* Identifier */:
                        return emitIdentifier(node, allowGeneratedIdentifiers);
                    case 129 /* Parameter */:
                        return emitParameter(node);
                    case 134 /* MethodDeclaration */:
                    case 133 /* MethodSignature */:
                        return emitMethod(node);
                    case 136 /* GetAccessor */:
                    case 137 /* SetAccessor */:
                        return emitAccessor(node);
                    case 93 /* ThisKeyword */:
                        return emitThis(node);
                    case 91 /* SuperKeyword */:
                        return emitSuper(node);
                    case 89 /* NullKeyword */:
                        return write("null");
                    case 95 /* TrueKeyword */:
                        return write("true");
                    case 80 /* FalseKeyword */:
                        return write("false");
                    case 7 /* NumericLiteral */:
                    case 8 /* StringLiteral */:
                    case 9 /* RegularExpressionLiteral */:
                    case 10 /* NoSubstitutionTemplateLiteral */:
                    case 11 /* TemplateHead */:
                    case 12 /* TemplateMiddle */:
                    case 13 /* TemplateTail */:
                        return emitLiteral(node);
                    case 171 /* TemplateExpression */:
                        return emitTemplateExpression(node);
                    case 176 /* TemplateSpan */:
                        return emitTemplateSpan(node);
                    case 126 /* QualifiedName */:
                        return emitQualifiedName(node);
                    case 150 /* ObjectBindingPattern */:
                        return emitObjectBindingPattern(node);
                    case 151 /* ArrayBindingPattern */:
                        return emitArrayBindingPattern(node);
                    case 152 /* BindingElement */:
                        return emitBindingElement(node);
                    case 153 /* ArrayLiteralExpression */:
                        return emitArrayLiteral(node);
                    case 154 /* ObjectLiteralExpression */:
                        return emitObjectLiteral(node);
                    case 224 /* PropertyAssignment */:
                        return emitPropertyAssignment(node);
                    case 225 /* ShorthandPropertyAssignment */:
                        return emitShorthandPropertyAssignment(node);
                    case 127 /* ComputedPropertyName */:
                        return emitComputedPropertyName(node);
                    case 155 /* PropertyAccessExpression */:
                        return emitPropertyAccess(node);
                    case 156 /* ElementAccessExpression */:
                        return emitIndexedAccess(node);
                    case 157 /* CallExpression */:
                        return emitCallExpression(node);
                    case 158 /* NewExpression */:
                        return emitNewExpression(node);
                    case 159 /* TaggedTemplateExpression */:
                        return emitTaggedTemplateExpression(node);
                    case 160 /* TypeAssertionExpression */:
                        return emit(node.expression);
                    case 161 /* ParenthesizedExpression */:
                        return emitParenExpression(node);
                    case 200 /* FunctionDeclaration */:
                    case 162 /* FunctionExpression */:
                    case 163 /* ArrowFunction */:
                        return emitFunctionDeclaration(node);
                    case 164 /* DeleteExpression */:
                        return emitDeleteExpression(node);
                    case 165 /* TypeOfExpression */:
                        return emitTypeOfExpression(node);
                    case 166 /* VoidExpression */:
                        return emitVoidExpression(node);
                    case 167 /* PrefixUnaryExpression */:
                        return emitPrefixUnaryExpression(node);
                    case 168 /* PostfixUnaryExpression */:
                        return emitPostfixUnaryExpression(node);
                    case 169 /* BinaryExpression */:
                        return emitBinaryExpression(node);
                    case 170 /* ConditionalExpression */:
                        return emitConditionalExpression(node);
                    case 173 /* SpreadElementExpression */:
                        return emitSpreadElementExpression(node);
                    case 172 /* YieldExpression */:
                        return emitYieldExpression(node);
                    case 175 /* OmittedExpression */:
                        return;
                    case 179 /* Block */:
                    case 206 /* ModuleBlock */:
                        return emitBlock(node);
                    case 180 /* VariableStatement */:
                        return emitVariableStatement(node);
                    case 181 /* EmptyStatement */:
                        return write(";");
                    case 182 /* ExpressionStatement */:
                        return emitExpressionStatement(node);
                    case 183 /* IfStatement */:
                        return emitIfStatement(node);
                    case 184 /* DoStatement */:
                        return emitDoStatement(node);
                    case 185 /* WhileStatement */:
                        return emitWhileStatement(node);
                    case 186 /* ForStatement */:
                        return emitForStatement(node);
                    case 188 /* ForOfStatement */:
                    case 187 /* ForInStatement */:
                        return emitForInOrForOfStatement(node);
                    case 189 /* ContinueStatement */:
                    case 190 /* BreakStatement */:
                        return emitBreakOrContinueStatement(node);
                    case 191 /* ReturnStatement */:
                        return emitReturnStatement(node);
                    case 192 /* WithStatement */:
                        return emitWithStatement(node);
                    case 193 /* SwitchStatement */:
                        return emitSwitchStatement(node);
                    case 220 /* CaseClause */:
                    case 221 /* DefaultClause */:
                        return emitCaseOrDefaultClause(node);
                    case 194 /* LabeledStatement */:
                        return emitLabelledStatement(node);
                    case 195 /* ThrowStatement */:
                        return emitThrowStatement(node);
                    case 196 /* TryStatement */:
                        return emitTryStatement(node);
                    case 223 /* CatchClause */:
                        return emitCatchClause(node);
                    case 197 /* DebuggerStatement */:
                        return emitDebuggerStatement(node);
                    case 198 /* VariableDeclaration */:
                        return emitVariableDeclaration(node);
                    case 174 /* ClassExpression */:
                        return emitClassExpression(node);
                    case 201 /* ClassDeclaration */:
                        return emitClassDeclaration(node);
                    case 202 /* InterfaceDeclaration */:
                        return emitInterfaceDeclaration(node);
                    case 204 /* EnumDeclaration */:
                        return emitEnumDeclaration(node);
                    case 226 /* EnumMember */:
                        return emitEnumMember(node);
                    case 205 /* ModuleDeclaration */:
                        return emitModuleDeclaration(node);
                    case 209 /* ImportDeclaration */:
                        return emitImportDeclaration(node);
                    case 208 /* ImportEqualsDeclaration */:
                        return emitImportEqualsDeclaration(node);
                    case 215 /* ExportDeclaration */:
                        return emitExportDeclaration(node);
                    case 214 /* ExportAssignment */:
                        return emitExportAssignment(node);
                    case 227 /* SourceFile */:
                        return emitSourceFileNode(node);
                }
            }
            function hasDetachedComments(pos) {
                return detachedCommentsInfo !== undefined && detachedCommentsInfo[detachedCommentsInfo.length - 1].nodePos === pos;
            }
            function getLeadingCommentsWithoutDetachedComments() {
                // get the leading comments from detachedPos
                var leadingComments = ts.getLeadingCommentRanges(currentSourceFile.text, detachedCommentsInfo[detachedCommentsInfo.length - 1].detachedCommentEndPos);
                if (detachedCommentsInfo.length - 1) {
                    detachedCommentsInfo.pop();
                }
                else {
                    detachedCommentsInfo = undefined;
                }
                return leadingComments;
            }
            function filterComments(ranges, onlyPinnedOrTripleSlashComments) {
                // If we're removing comments, then we want to strip out all but the pinned or
                // triple slash comments.
                if (ranges && onlyPinnedOrTripleSlashComments) {
                    ranges = ts.filter(ranges, isPinnedOrTripleSlashComment);
                    if (ranges.length === 0) {
                        return undefined;
                    }
                }
                return ranges;
            }
            function getLeadingCommentsToEmit(node) {
                // Emit the leading comments only if the parent's pos doesn't match because parent should take care of emitting these comments
                if (node.parent) {
                    if (node.parent.kind === 227 /* SourceFile */ || node.pos !== node.parent.pos) {
                        if (hasDetachedComments(node.pos)) {
                            // get comments without detached comments
                            return getLeadingCommentsWithoutDetachedComments();
                        }
                        else {
                            // get the leading comments from the node
                            return ts.getLeadingCommentRangesOfNode(node, currentSourceFile);
                        }
                    }
                }
            }
            function getTrailingCommentsToEmit(node) {
                // Emit the trailing comments only if the parent's pos doesn't match because parent should take care of emitting these comments
                if (node.parent) {
                    if (node.parent.kind === 227 /* SourceFile */ || node.end !== node.parent.end) {
                        return ts.getTrailingCommentRanges(currentSourceFile.text, node.end);
                    }
                }
            }
            function emitOnlyPinnedOrTripleSlashComments(node) {
                emitLeadingCommentsWorker(node, true);
            }
            function emitLeadingComments(node) {
                return emitLeadingCommentsWorker(node, compilerOptions.removeComments);
            }
            function emitLeadingCommentsWorker(node, onlyPinnedOrTripleSlashComments) {
                // If the caller only wants pinned or triple slash comments, then always filter
                // down to that set.  Otherwise, filter based on the current compiler options.
                var leadingComments = filterComments(getLeadingCommentsToEmit(node), onlyPinnedOrTripleSlashComments);
                ts.emitNewLineBeforeLeadingComments(currentSourceFile, writer, node, leadingComments);
                // Leading comments are emitted at /*leading comment1 */space/*leading comment*/space
                ts.emitComments(currentSourceFile, writer, leadingComments, true, newLine, writeComment);
            }
            function emitTrailingComments(node) {
                // Emit the trailing comments only if the parent's end doesn't match
                var trailingComments = filterComments(getTrailingCommentsToEmit(node), compilerOptions.removeComments);
                // trailing comments are emitted at space/*trailing comment1 */space/*trailing comment*/
                ts.emitComments(currentSourceFile, writer, trailingComments, false, newLine, writeComment);
            }
            function emitLeadingCommentsOfPosition(pos) {
                var leadingComments;
                if (hasDetachedComments(pos)) {
                    // get comments without detached comments
                    leadingComments = getLeadingCommentsWithoutDetachedComments();
                }
                else {
                    // get the leading comments from the node
                    leadingComments = ts.getLeadingCommentRanges(currentSourceFile.text, pos);
                }
                leadingComments = filterComments(leadingComments, compilerOptions.removeComments);
                ts.emitNewLineBeforeLeadingComments(currentSourceFile, writer, { pos: pos, end: pos }, leadingComments);
                // Leading comments are emitted at /*leading comment1 */space/*leading comment*/space
                ts.emitComments(currentSourceFile, writer, leadingComments, true, newLine, writeComment);
            }
            function emitDetachedComments(node) {
                var leadingComments = ts.getLeadingCommentRanges(currentSourceFile.text, node.pos);
                if (leadingComments) {
                    var detachedComments = [];
                    var lastComment;
                    ts.forEach(leadingComments, function (comment) {
                        if (lastComment) {
                            var lastCommentLine = ts.getLineOfLocalPosition(currentSourceFile, lastComment.end);
                            var commentLine = ts.getLineOfLocalPosition(currentSourceFile, comment.pos);
                            if (commentLine >= lastCommentLine + 2) {
                                // There was a blank line between the last comment and this comment.  This
                                // comment is not part of the copyright comments.  Return what we have so
                                // far.
                                return detachedComments;
                            }
                        }
                        detachedComments.push(comment);
                        lastComment = comment;
                    });
                    if (detachedComments.length) {
                        // All comments look like they could have been part of the copyright header.  Make
                        // sure there is at least one blank line between it and the node.  If not, it's not
                        // a copyright header.
                        var lastCommentLine = ts.getLineOfLocalPosition(currentSourceFile, detachedComments[detachedComments.length - 1].end);
                        var nodeLine = ts.getLineOfLocalPosition(currentSourceFile, ts.skipTrivia(currentSourceFile.text, node.pos));
                        if (nodeLine >= lastCommentLine + 2) {
                            // Valid detachedComments
                            ts.emitNewLineBeforeLeadingComments(currentSourceFile, writer, node, leadingComments);
                            ts.emitComments(currentSourceFile, writer, detachedComments, true, newLine, writeComment);
                            var currentDetachedCommentInfo = { nodePos: node.pos, detachedCommentEndPos: detachedComments[detachedComments.length - 1].end };
                            if (detachedCommentsInfo) {
                                detachedCommentsInfo.push(currentDetachedCommentInfo);
                            }
                            else {
                                detachedCommentsInfo = [currentDetachedCommentInfo];
                            }
                        }
                    }
                }
            }
            function isPinnedOrTripleSlashComment(comment) {
                if (currentSourceFile.text.charCodeAt(comment.pos + 1) === 42 /* asterisk */) {
                    return currentSourceFile.text.charCodeAt(comment.pos + 2) === 33 /* exclamation */;
                }
                else if (currentSourceFile.text.charCodeAt(comment.pos + 1) === 47 /* slash */ &&
                    comment.pos + 2 < comment.end &&
                    currentSourceFile.text.charCodeAt(comment.pos + 2) === 47 /* slash */ &&
                    currentSourceFile.text.substring(comment.pos, comment.end).match(ts.fullTripleSlashReferencePathRegEx)) {
                    return true;
                }
            }
        }
        function emitFile(jsFilePath, sourceFile) {
            emitJavaScript(jsFilePath, sourceFile);
            if (compilerOptions.declaration) {
                ts.writeDeclarationFile(jsFilePath, sourceFile, host, resolver, diagnostics);
            }
        }
    }
    ts.emitFiles = emitFiles;
})(ts || (ts = {}));
