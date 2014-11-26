/// <reference path="types.ts"/>
/// <reference path="core.ts"/>
/// <reference path="scanner.ts"/>
/// <reference path="parser.ts"/>

module ts {
    interface EmitTextWriter {
        write(s: string): void;
        writeTextOfNode(sourceFile: SourceFile, node: Node): void;
        writeLine(): void;
        increaseIndent(): void;
        decreaseIndent(): void;
        getText(): string;
        rawWrite(s: string): void;
        writeLiteral(s: string): void;
        getTextPos(): number;
        getLine(): number;
        getColumn(): number;
        getIndent(): number;
    }

    interface SymbolAccessibilityDiagnostic {
        errorNode: Node;
        diagnosticMessage: DiagnosticMessage;
        typeName?: DeclarationName;
    }
    type GetSymbolAccessibilityDiagnostic = (symbolAccesibilityResult: SymbolAccessiblityResult) => SymbolAccessibilityDiagnostic;

    interface EmitTextWriterWithSymbolWriter extends EmitTextWriter, SymbolWriter {
        getSymbolAccessibilityDiagnostic: GetSymbolAccessibilityDiagnostic;
    }

    interface AliasDeclarationEmitInfo {
        declaration: ImportDeclaration;
        outputPos: number;
        indent: number;
        asynchronousOutput?: string; // If the output for alias was written asynchronously, the corresponding output
    }

    interface DeclarationEmit {
        reportedDeclarationError: boolean;
        aliasDeclarationEmitInfo: AliasDeclarationEmitInfo[];
        synchronousDeclarationOutput: string;
        referencePathsOutput: string;
    }

    var indentStrings: string[] = ["", "    "];
    export function getIndentString(level: number) {
        if (indentStrings[level] === undefined) {
            indentStrings[level] = getIndentString(level - 1) + indentStrings[1];
        }
        return indentStrings[level];
    }

    function getIndentSize() {
        return indentStrings[1].length;
    }

    export function shouldEmitToOwnFile(sourceFile: SourceFile, compilerOptions: CompilerOptions): boolean {
        if (!isDeclarationFile(sourceFile)) {
            if ((isExternalModule(sourceFile) || !compilerOptions.out) && !fileExtensionIs(sourceFile.filename, ".js")) {
                return true;
            }
            return false;
        }
        return false;
    }

    export function isExternalModuleOrDeclarationFile(sourceFile: SourceFile) {
        return isExternalModule(sourceFile) || isDeclarationFile(sourceFile);
    }

    function createTextWriter(newLine: String): EmitTextWriter {
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

        function rawWrite(s: string) {
            if (s !== undefined) {
                if (lineStart) {
                    lineStart = false;
                }
                output += s;
            }
        }

        function writeLiteral(s: string) {
            if (s && s.length) {
                write(s);
                var lineStartsOfS = computeLineStarts(s);
                if (lineStartsOfS.length > 1) {
                    lineCount = lineCount + lineStartsOfS.length - 1;
                    linePos = output.length - s.length + lineStartsOfS[lineStartsOfS.length - 1];
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

        function writeTextOfNode(sourceFile: SourceFile, node: Node) {
            write(getSourceTextOfNodeFromSourceFile(sourceFile, node));
        }

        return {
            write,
            rawWrite,
            writeTextOfNode,
            writeLiteral,
            writeLine,
            increaseIndent: () => indent++,
            decreaseIndent: () => indent--,
            getIndent: () => indent,
            getTextPos: () => output.length,
            getLine: () => lineCount + 1,
            getColumn: () => lineStart ? indent * getIndentSize() + 1 : output.length - linePos + 1,
            getText: () => output,
        };
    }

    function getLineOfLocalPosition(currentSourceFile: SourceFile, pos: number) {
        return currentSourceFile.getLineAndCharacterFromPosition(pos).line;
    }

    function emitNewLineBeforeLeadingComments(currentSourceFile: SourceFile, writer: EmitTextWriter, node: TextRange, leadingComments: CommentRange[]) {
        // If the leading comments start on different line than the start of node, write new line
        if (leadingComments && leadingComments.length && node.pos !== leadingComments[0].pos &&
            getLineOfLocalPosition(currentSourceFile, node.pos) !== getLineOfLocalPosition(currentSourceFile, leadingComments[0].pos)) {
            writer.writeLine();
        }
    }

    function emitComments(currentSourceFile: SourceFile, writer: EmitTextWriter, comments: CommentRange[], trailingSeparator: boolean, newLine: string,
                          writeComment: (currentSourceFile: SourceFile, writer: EmitTextWriter, comment: CommentRange, newLine: string) => void) {
        var emitLeadingSpace = !trailingSeparator;
        forEach(comments, comment => {
            if (emitLeadingSpace) {
                writer.write(" ");
                emitLeadingSpace = false;
            }
            writeComment(currentSourceFile, writer, comment, newLine);
            if (comment.hasTrailingNewLine) {
                writer.writeLine();
            }
            else if (trailingSeparator) {
                writer.write(" ");
            }
            else {
                // Emit leading space to separate comment during next comment emit
                emitLeadingSpace = true;
            }
        });
    }

    function writeCommentRange(currentSourceFile: SourceFile, writer: EmitTextWriter, comment: CommentRange, newLine: string){
        if (currentSourceFile.text.charCodeAt(comment.pos + 1) === CharacterCodes.asterisk) {
            var firstCommentLineAndCharacter = currentSourceFile.getLineAndCharacterFromPosition(comment.pos);
            var firstCommentLineIndent: number;
            for (var pos = comment.pos, currentLine = firstCommentLineAndCharacter.line; pos < comment.end; currentLine++) {
                var nextLineStart = currentSourceFile.getPositionFromLineAndCharacter(currentLine + 1, /*character*/1);

                if (pos !== comment.pos) {
                    // If we are not emitting first line, we need to write the spaces to adjust the alignment
                    if (firstCommentLineIndent === undefined) {
                        firstCommentLineIndent = calculateIndent(currentSourceFile.getPositionFromLineAndCharacter(firstCommentLineAndCharacter.line, /*character*/1),
                            comment.pos);
                    }

                    // These are number of spaces writer is going to write at current indent
                    var currentWriterIndentSpacing = writer.getIndent() * getIndentSize();

                    // Number of spaces we want to be writing
                    // eg: Assume writer indent
                    // module m {
                    //         /* starts at character 9 this is line 1
                    //    * starts at character pos 4 line                        --1  = 8 - 8 + 3
                    //   More left indented comment */                            --2  = 8 - 8 + 2
                    //     class c { }
                    // }
                    // module m {
                    //     /* this is line 1 -- Assume current writer indent 8
                    //      * line                                                --3 = 8 - 4 + 5 
                    //            More right indented comment */                  --4 = 8 - 4 + 11
                    //     class c { }
                    // }
                    var spacesToEmit = currentWriterIndentSpacing - firstCommentLineIndent + calculateIndent(pos, nextLineStart);
                    if (spacesToEmit > 0) {
                        var numberOfSingleSpacesToEmit = spacesToEmit % getIndentSize();
                        var indentSizeSpaceString = getIndentString((spacesToEmit - numberOfSingleSpacesToEmit) / getIndentSize());

                        // Write indent size string ( in eg 1: = "", 2: "" , 3: string with 8 spaces 4: string with 12 spaces
                        writer.rawWrite(indentSizeSpaceString);

                        // Emit the single spaces (in eg: 1: 3 spaces, 2: 2 spaces, 3: 1 space, 4: 3 spaces)
                        while (numberOfSingleSpacesToEmit) {
                            writer.rawWrite(" ");
                            numberOfSingleSpacesToEmit--;
                        }
                    }
                    else {
                        // No spaces to emit write empty string
                        writer.rawWrite("");
                    }
                }

                // Write the comment line text
                writeTrimmedCurrentLine(pos, nextLineStart);

                pos = nextLineStart;
            }
        }
        else {
            // Single line comment of style //....
            writer.write(currentSourceFile.text.substring(comment.pos, comment.end));
        }

        function writeTrimmedCurrentLine(pos: number, nextLineStart: number) {
            var end = Math.min(comment.end, nextLineStart - 1);
            var currentLineText = currentSourceFile.text.substring(pos, end).replace(/^\s+|\s+$/g, '');
            if (currentLineText) {
                // trimmed forward and ending spaces text
                writer.write(currentLineText);
                if (end !== comment.end) {
                    writer.writeLine();
                }
            }
            else {
                // Empty string - make sure we write empty line
                writer.writeLiteral(newLine);
            }
        }

        function calculateIndent(pos: number, end: number) {
            var currentLineIndent = 0;
            for (; pos < end && isWhiteSpace(currentSourceFile.text.charCodeAt(pos)); pos++) {
                if (currentSourceFile.text.charCodeAt(pos) === CharacterCodes.tab) {
                    // Tabs = TabSize = indent size and go to next tabStop
                    currentLineIndent += getIndentSize() - (currentLineIndent % getIndentSize());
                }
                else {
                    // Single space
                    currentLineIndent++;
                }
            }

            return currentLineIndent;
        }
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
            // TODO(jfreeman): Handle computed names for accessor matching
            if ((member.kind === SyntaxKind.GetAccessor || member.kind === SyntaxKind.SetAccessor) &&
                (<Identifier>member.name).text === (<Identifier>accessor.name).text &&
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
            firstAccessor,
            getAccessor,
            setAccessor
        };
    }

    function getSourceFilePathInNewDir(sourceFile: SourceFile, program: Program, newDirPath: string) {
        var compilerHost = program.getCompilerHost();
        var sourceFilePath = getNormalizedAbsolutePath(sourceFile.filename, compilerHost.getCurrentDirectory());
        sourceFilePath = sourceFilePath.replace(program.getCommonSourceDirectory(), "");
        return combinePaths(newDirPath, sourceFilePath);
    }

    function getOwnEmitOutputFilePath(sourceFile: SourceFile, program: Program, extension: string){
        var compilerOptions = program.getCompilerOptions();
        if (compilerOptions.outDir) {
            var emitOutputFilePathWithoutExtension = removeFileExtension(getSourceFilePathInNewDir(sourceFile, program, compilerOptions.outDir));
        }
        else {
            var emitOutputFilePathWithoutExtension = removeFileExtension(sourceFile.filename);
        }

        return emitOutputFilePathWithoutExtension + extension;
    }

    function writeFile(compilerHost: CompilerHost, diagnostics: Diagnostic[], filename: string, data: string, writeByteOrderMark: boolean) {
        compilerHost.writeFile(filename, data, writeByteOrderMark, hostErrorMessage => {
            diagnostics.push(createCompilerDiagnostic(Diagnostics.Could_not_write_file_0_Colon_1, filename, hostErrorMessage));
        });
    }

    function emitDeclarations(program: Program, resolver: EmitResolver, diagnostics: Diagnostic[], jsFilePath: string, root?: SourceFile): DeclarationEmit {
        var newLine = program.getCompilerHost().getNewLine();
        var compilerOptions = program.getCompilerOptions();
        var compilerHost = program.getCompilerHost();

        var write: (s: string) => void;
        var writeLine: () => void;
        var increaseIndent: () => void;
        var decreaseIndent: () => void;
        var writeTextOfNode: (sourceFile: SourceFile, node: Node) => void;

        var writer = createAndSetNewTextWriterWithSymbolWriter();

        var enclosingDeclaration: Node;
        var currentSourceFile: SourceFile;
        var reportedDeclarationError = false;

        var emitJsDocComments = compilerOptions.removeComments ? function (declaration: Declaration) { } : writeJsDocComments;

        var aliasDeclarationEmitInfo: AliasDeclarationEmitInfo[] = [];

        function createAndSetNewTextWriterWithSymbolWriter(): EmitTextWriterWithSymbolWriter {
            var writer = <EmitTextWriterWithSymbolWriter>createTextWriter(newLine);
            writer.trackSymbol = trackSymbol;
            writer.writeKeyword = writer.write;
            writer.writeOperator = writer.write;
            writer.writePunctuation = writer.write;
            writer.writeSpace = writer.write;
            writer.writeStringLiteral = writer.writeLiteral;
            writer.writeParameter = writer.write;
            writer.writeSymbol = writer.write;
            setWriter(writer);
            return writer;
        }

        function setWriter(newWriter: EmitTextWriterWithSymbolWriter) {
            writer = newWriter;
            write = newWriter.write;
            writeTextOfNode = newWriter.writeTextOfNode;
            writeLine = newWriter.writeLine;
            increaseIndent = newWriter.increaseIndent;
            decreaseIndent = newWriter.decreaseIndent;
        }

        function writeAsychronousImportDeclarations(importDeclarations: ImportDeclaration[]) {
            var oldWriter = writer;
            forEach(importDeclarations, aliasToWrite => {
                var aliasEmitInfo = forEach(aliasDeclarationEmitInfo, declEmitInfo => declEmitInfo.declaration === aliasToWrite ? declEmitInfo : undefined);
                // If the alias was marked as not visible when we saw its declaration, we would have saved the aliasEmitInfo, but if we haven't yet visited the alias declaration
                // then we don't need to write it at this point. We will write it when we actually see its declaration
                // Eg.
                // export function bar(a: foo.Foo) { }
                // import foo = require("foo");
                // Writing of function bar would mark alias declaration foo as visible but we haven't yet visited that declaration so do nothing, 
                // we would write alias foo declaration when we visit it since it would now be marked as visible
                if (aliasEmitInfo) {
                    createAndSetNewTextWriterWithSymbolWriter();
                    for (var declarationIndent = aliasEmitInfo.indent; declarationIndent; declarationIndent--) {
                        increaseIndent();
                    }
                    writeImportDeclaration(aliasToWrite);
                    aliasEmitInfo.asynchronousOutput = writer.getText();
                }
            });
            setWriter(oldWriter);
        }

        function handleSymbolAccessibilityError(symbolAccesibilityResult: SymbolAccessiblityResult) {
            if (symbolAccesibilityResult.accessibility === SymbolAccessibility.Accessible) {
                // write the aliases
                if (symbolAccesibilityResult && symbolAccesibilityResult.aliasesToMakeVisible) {
                    writeAsychronousImportDeclarations(symbolAccesibilityResult.aliasesToMakeVisible);
                }
            }
            else {
                // Report error
                reportedDeclarationError = true;
                var errorInfo = writer.getSymbolAccessibilityDiagnostic(symbolAccesibilityResult);
                if (errorInfo) {
                    if (errorInfo.typeName) {
                        diagnostics.push(createDiagnosticForNode(symbolAccesibilityResult.errorNode || errorInfo.errorNode,
                            errorInfo.diagnosticMessage,
                            getSourceTextOfNodeFromSourceFile(currentSourceFile, errorInfo.typeName),
                            symbolAccesibilityResult.errorSymbolName,
                            symbolAccesibilityResult.errorModuleName));
                    }
                    else {
                        diagnostics.push(createDiagnosticForNode(symbolAccesibilityResult.errorNode || errorInfo.errorNode,
                            errorInfo.diagnosticMessage,
                            symbolAccesibilityResult.errorSymbolName,
                            symbolAccesibilityResult.errorModuleName));
                    }
                }
            }
        }

        function trackSymbol(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags) {
            handleSymbolAccessibilityError(resolver.isSymbolAccessible(symbol, enclosingDeclaration, meaning));
        }

        function writeTypeAtLocation(location: Node, type: TypeNode, getSymbolAccessibilityDiagnostic: GetSymbolAccessibilityDiagnostic) {
            writer.getSymbolAccessibilityDiagnostic = getSymbolAccessibilityDiagnostic;
            write(": ");
            if (type) {
                // Write the type
                emitType(type);
            }
            else {
                resolver.writeTypeAtLocation(location, enclosingDeclaration, TypeFormatFlags.UseTypeOfFunction, writer);
            }
        }

        function writeReturnTypeAtSignature(signature: SignatureDeclaration, getSymbolAccessibilityDiagnostic: GetSymbolAccessibilityDiagnostic) {
            writer.getSymbolAccessibilityDiagnostic = getSymbolAccessibilityDiagnostic;
            write(": ");
            if (signature.type) {
                // Write the type
                emitType(signature.type);
            }
            else {
                resolver.writeReturnTypeOfSignatureDeclaration(signature, enclosingDeclaration, TypeFormatFlags.UseTypeOfFunction, writer);
            }
        }

        function emitLines(nodes: Node[]) {
            for (var i = 0, n = nodes.length; i < n; i++) {
                emitNode(nodes[i]);
            }
        }

        function emitSeparatedList(nodes: Node[], separator: string, eachNodeEmitFn: (node: Node) => void) {
            var currentWriterPos = writer.getTextPos();
            for (var i = 0, n = nodes.length; i < n; i++) {
                if (currentWriterPos !== writer.getTextPos()) {
                    write(separator);
                }
                currentWriterPos = writer.getTextPos();
                eachNodeEmitFn(nodes[i]);
            }
        }

        function emitCommaList(nodes: Node[], eachNodeEmitFn: (node: Node) => void) {
            emitSeparatedList(nodes, ", ", eachNodeEmitFn);
        }

        function writeJsDocComments(declaration: Declaration) {
            if (declaration) {
                var jsDocComments = getJsDocComments(declaration, currentSourceFile);
                emitNewLineBeforeLeadingComments(currentSourceFile, writer, declaration, jsDocComments);
                // jsDoc comments are emitted at /*leading comment1 */space/*leading comment*/space
                emitComments(currentSourceFile, writer, jsDocComments, /*trailingSeparator*/ true, newLine, writeCommentRange);
            }
        }

        function emitTypeWithNewGetSymbolAccessibilityDiangostic(type: TypeNode, getSymbolAccessibilityDiagnostic: GetSymbolAccessibilityDiagnostic) {
            writer.getSymbolAccessibilityDiagnostic = getSymbolAccessibilityDiagnostic;
            emitType(type);
        }

        function emitType(type: TypeNode) {
            switch (type.kind) {
                case SyntaxKind.AnyKeyword:
                case SyntaxKind.StringKeyword:
                case SyntaxKind.NumberKeyword:
                case SyntaxKind.BooleanKeyword:
                case SyntaxKind.VoidKeyword:
                case SyntaxKind.StringLiteral:
                    return writeTextOfNode(currentSourceFile, type);
                case SyntaxKind.TypeReference:
                    return emitTypeReference(<TypeReferenceNode>type);
                case SyntaxKind.TypeQuery:
                    return emitTypeQuery(<TypeQueryNode>type);
                case SyntaxKind.ArrayType:
                    return emitArrayType(<ArrayTypeNode>type);
                case SyntaxKind.TupleType:
                    return emitTupleType(<TupleTypeNode>type);
                case SyntaxKind.UnionType:
                    return emitUnionType(<UnionTypeNode>type);
                case SyntaxKind.ParenType:
                    return emitParenType(<ParenTypeNode>type);
                case SyntaxKind.FunctionType:
                case SyntaxKind.ConstructorType:
                    return emitSignatureDeclarationWithJsDocComments(<SignatureDeclaration>type);
                case SyntaxKind.TypeLiteral:
                    return emitTypeLiteral(<TypeLiteralNode>type);
                case SyntaxKind.Identifier:
                    return emitEntityName(<Identifier>type);
                case SyntaxKind.QualifiedName:
                    return emitEntityName(<QualifiedName>type);
                default:
                    Debug.fail("Unknown type annotation: " + type.kind);
            }

            function emitEntityName(entityName: EntityName) {
                var visibilityResult = resolver.isEntityNameVisible(entityName, 
                    // Aliases can be written asynchronously so use correct enclosing declaration
                    entityName.parent.kind === SyntaxKind.ImportDeclaration ? entityName.parent : enclosingDeclaration);

                handleSymbolAccessibilityError(visibilityResult);
                writeEntityName(entityName);

                function writeEntityName(entityName: EntityName) {
                    if (entityName.kind === SyntaxKind.Identifier) {
                        writeTextOfNode(currentSourceFile, entityName);
                    }
                    else {
                        var qualifiedName = <QualifiedName>entityName;
                        writeEntityName(qualifiedName.left);
                        write(".");
                        writeTextOfNode(currentSourceFile, qualifiedName.right);
                    }
                }
            }

            function emitTypeReference(type: TypeReferenceNode) {
                emitEntityName(type.typeName);
                if (type.typeArguments) {
                    write("<");
                    emitCommaList(type.typeArguments, emitType);
                    write(">");
                }
            }

            function emitTypeQuery(type: TypeQueryNode) {
                write("typeof ");
                emitEntityName(type.exprName);
            }

            function emitArrayType(type: ArrayTypeNode) {
                emitType(type.elementType);
                write("[]");
            }

            function emitTupleType(type: TupleTypeNode) {
                write("[");
                emitCommaList(type.elementTypes, emitType);
                write("]");
            }

            function emitUnionType(type: UnionTypeNode) {
                emitSeparatedList(type.types, " | ", emitType);
            }

            function emitParenType(type: ParenTypeNode) {
                write("(");
                emitType(type.type);
                write(")");
            }

            function emitTypeLiteral(type: TypeLiteralNode) {
                write("{");
                if (type.members.length) {
                    writeLine();
                    increaseIndent();
                    // write members
                    emitLines(type.members);
                    decreaseIndent();
                }
                write("}");
            }
        }

        function emitSourceFile(node: SourceFile) {
            currentSourceFile = node;
            enclosingDeclaration = node;
            emitLines(node.statements);
        }

        function emitExportAssignment(node: ExportAssignment) {
            write("export = ");
            writeTextOfNode(currentSourceFile, node.exportName);
            write(";");
            writeLine();
        }

        function emitModuleElementDeclarationFlags(node: Declaration) {
            // If the node is parented in the current source file we need to emit export declare or just export
            if (node.parent === currentSourceFile) {
                // If the node is exported 
                if (node.flags & NodeFlags.Export) {
                    write("export ");
                }

                if (node.kind !== SyntaxKind.InterfaceDeclaration) {
                    write("declare ");
                }
            }
        }

        function emitClassMemberDeclarationFlags(node: Declaration) {
            if (node.flags & NodeFlags.Private) {
                write("private ");
            }
            else if (node.flags & NodeFlags.Protected) {
                write("protected ");
            }

            if (node.flags & NodeFlags.Static) {
                write("static ");
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
                write("export ");
            }
            write("import ");
            writeTextOfNode(currentSourceFile, node.name);
            write(" = ");
            if (node.entityName) {
                emitTypeWithNewGetSymbolAccessibilityDiangostic(node.entityName, getImportEntityNameVisibilityError);
                write(";");
            }
            else {
                write("require(");
                writeTextOfNode(currentSourceFile, node.externalModuleName);
                write(");");
            }
            writer.writeLine();

            function getImportEntityNameVisibilityError(symbolAccesibilityResult: SymbolAccessiblityResult): SymbolAccessibilityDiagnostic {
                return {
                    diagnosticMessage: Diagnostics.Import_declaration_0_is_using_private_name_1,
                    errorNode: node,
                    typeName: node.name
                };
            }
        }

        function emitModuleDeclaration(node: ModuleDeclaration) {
            if (resolver.isDeclarationVisible(node)) {
                emitJsDocComments(node);
                emitModuleElementDeclarationFlags(node);
                write("module ");
                writeTextOfNode(currentSourceFile, node.name);
                while (node.body.kind !== SyntaxKind.ModuleBlock) {
                    node = <ModuleDeclaration>node.body;
                    write(".");
                    writeTextOfNode(currentSourceFile, node.name);
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

        function emitTypeAliasDeclaration(node: TypeAliasDeclaration) {
            if (resolver.isDeclarationVisible(node)) {
                emitJsDocComments(node);
                emitModuleElementDeclarationFlags(node);
                write("type ");
                writeTextOfNode(currentSourceFile, node.name);
                write(" = ");
                emitTypeWithNewGetSymbolAccessibilityDiangostic(node.type, getTypeAliasDeclarationVisibilityError);
                write(";");
                writeLine();
            }
            function getTypeAliasDeclarationVisibilityError(symbolAccesibilityResult: SymbolAccessiblityResult): SymbolAccessibilityDiagnostic {
                return {
                    diagnosticMessage: Diagnostics.Exported_type_alias_0_has_or_is_using_private_name_1,
                    errorNode: node.type,
                    typeName: node.name
                };
            }
        }

        function emitEnumDeclaration(node: EnumDeclaration) {
            if (resolver.isDeclarationVisible(node)) {
                emitJsDocComments(node);
                emitModuleElementDeclarationFlags(node);
                if (isConst(node)) {
                    write("const ")
                }
                write("enum ");
                writeTextOfNode(currentSourceFile, node.name);
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
            emitJsDocComments(node);
            writeTextOfNode(currentSourceFile, node.name);
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
                increaseIndent();
                emitJsDocComments(node);
                decreaseIndent();
                writeTextOfNode(currentSourceFile, node.name);
                // If there is constraint present and this is not a type parameter of the private method emit the constraint
                if (node.constraint && (node.parent.kind !== SyntaxKind.Method || !(node.parent.flags & NodeFlags.Private))) {
                    write(" extends ");
                    if (node.parent.kind === SyntaxKind.FunctionType ||
                        node.parent.kind === SyntaxKind.ConstructorType ||
                        (node.parent.parent && node.parent.parent.kind === SyntaxKind.TypeLiteral)) {
                        Debug.assert(node.parent.kind === SyntaxKind.Method ||
                            node.parent.kind === SyntaxKind.FunctionType ||
                            node.parent.kind === SyntaxKind.ConstructorType ||
                            node.parent.kind === SyntaxKind.CallSignature ||
                            node.parent.kind === SyntaxKind.ConstructSignature);
                        emitType(node.constraint);
                    }
                    else {
                        emitTypeWithNewGetSymbolAccessibilityDiangostic(node.constraint, getTypeParameterConstraintVisibilityError);
                    }
                }

                function getTypeParameterConstraintVisibilityError(symbolAccesibilityResult: SymbolAccessiblityResult): SymbolAccessibilityDiagnostic {
                    // Type parameter constraints are named by user so we should always be able to name it
                    var diagnosticMessage: DiagnosticMessage;
                    switch (node.parent.kind) {
                        case SyntaxKind.ClassDeclaration:
                            diagnosticMessage = Diagnostics.Type_parameter_0_of_exported_class_has_or_is_using_private_name_1;
                            break;

                        case SyntaxKind.InterfaceDeclaration:
                            diagnosticMessage = Diagnostics.Type_parameter_0_of_exported_interface_has_or_is_using_private_name_1;
                            break;

                        case SyntaxKind.ConstructSignature:
                            diagnosticMessage = Diagnostics.Type_parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1;
                            break;

                        case SyntaxKind.CallSignature:
                            diagnosticMessage = Diagnostics.Type_parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1;
                            break;

                        case SyntaxKind.Method:
                            if (node.parent.flags & NodeFlags.Static) {
                                diagnosticMessage = Diagnostics.Type_parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1;
                            }
                            else if (node.parent.parent.kind === SyntaxKind.ClassDeclaration) {
                                diagnosticMessage = Diagnostics.Type_parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1;
                            }
                            else {
                                diagnosticMessage = Diagnostics.Type_parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1;
                            }
                            break;

                        case SyntaxKind.FunctionDeclaration:
                            diagnosticMessage = Diagnostics.Type_parameter_0_of_exported_function_has_or_is_using_private_name_1;
                            break;

                        default:
                            Debug.fail("This is unknown parent for type parameter: " + node.parent.kind);
                    }

                    return {
                        diagnosticMessage,
                        errorNode: node,
                        typeName: node.name
                    };
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
                emitTypeWithNewGetSymbolAccessibilityDiangostic(node, getHeritageClauseVisibilityError);

                function getHeritageClauseVisibilityError(symbolAccesibilityResult: SymbolAccessiblityResult): SymbolAccessibilityDiagnostic {
                    var diagnosticMessage: DiagnosticMessage;
                    // Heritage clause is written by user so it can always be named
                    if (node.parent.kind === SyntaxKind.ClassDeclaration) {
                        // Class or Interface implemented/extended is inaccessible
                        diagnosticMessage = isImplementsList ?
                        Diagnostics.Implements_clause_of_exported_class_0_has_or_is_using_private_name_1 :
                        Diagnostics.Extends_clause_of_exported_class_0_has_or_is_using_private_name_1;
                    }
                    else {
                        // interface is inaccessible
                        diagnosticMessage = Diagnostics.Extends_clause_of_exported_interface_0_has_or_is_using_private_name_1;
                    }

                    return {
                        diagnosticMessage,
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
                        if (param.flags & NodeFlags.AccessibilityModifier) {
                            emitPropertyDeclaration(param);
                        }
                    });
                }
            }

            if (resolver.isDeclarationVisible(node)) {
                emitJsDocComments(node);
                emitModuleElementDeclarationFlags(node);
                write("class ");
                writeTextOfNode(currentSourceFile, node.name);
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
                emitJsDocComments(node);
                emitModuleElementDeclarationFlags(node);
                write("interface ");
                writeTextOfNode(currentSourceFile, node.name);
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
            emitJsDocComments(node);
            emitClassMemberDeclarationFlags(node);
            emitVariableDeclaration(<VariableDeclaration>node);
            write(";");
            writeLine();
        }

        // TODO(jfreeman): Factor out common part of property definition, but treat name differently
        function emitVariableDeclaration(node: VariableDeclaration) {
            // If we are emitting property it isn't moduleElement and hence we already know it needs to be emitted
            // so there is no check needed to see if declaration is visible
            if (node.kind !== SyntaxKind.VariableDeclaration || resolver.isDeclarationVisible(node)) {
                writeTextOfNode(currentSourceFile, node.name);
                // If optional property emit ?
                if (node.kind === SyntaxKind.Property && (node.flags & NodeFlags.QuestionMark)) {
                    write("?");
                }
                if (node.kind === SyntaxKind.Property && node.parent.kind === SyntaxKind.TypeLiteral) {
                    emitTypeOfVariableDeclarationFromTypeLiteral(node);
                }
                else if (!(node.flags & NodeFlags.Private)) {
                    writeTypeAtLocation(node, node.type, getVariableDeclarationTypeVisibilityError);
                }
            }

            function getVariableDeclarationTypeVisibilityError(symbolAccesibilityResult: SymbolAccessiblityResult): SymbolAccessibilityDiagnostic {
                var diagnosticMessage: DiagnosticMessage;
                if (node.kind === SyntaxKind.VariableDeclaration) {
                    diagnosticMessage = symbolAccesibilityResult.errorModuleName ?
                    symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                    Diagnostics.Exported_variable_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                    Diagnostics.Exported_variable_0_has_or_is_using_name_1_from_private_module_2 :
                    Diagnostics.Exported_variable_0_has_or_is_using_private_name_1;
                }
                // This check is to ensure we don't report error on constructor parameter property as that error would be reported during parameter emit
                else if (node.kind === SyntaxKind.Property) {
                    // TODO(jfreeman): Deal with computed properties in error reporting.
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
                    diagnosticMessage,
                    errorNode: node,
                    typeName: node.name
                } : undefined;
            }
        }

        function emitTypeOfVariableDeclarationFromTypeLiteral(node: VariableDeclaration) {
            // if this is property of type literal, 
            // or is parameter of method/call/construct/index signature of type literal
            // emit only if type is specified
            if (node.type) {
                write(": ");
                emitType(node.type);
            }
        }

        function emitVariableStatement(node: VariableStatement) {
            var hasDeclarationWithEmit = forEach(node.declarations, varDeclaration => resolver.isDeclarationVisible(varDeclaration));
            if (hasDeclarationWithEmit) {
                emitJsDocComments(node);
                emitModuleElementDeclarationFlags(node);
                if (isLet(node)) {
                    write("let ");
                }
                else if (isConst(node)) {
                    write("const ");
                }
                else {
                    write("var ");
                }
                emitCommaList(node.declarations, emitVariableDeclaration);
                write(";");
                writeLine();
            }
        }

        function emitAccessorDeclaration(node: AccessorDeclaration) {
            var accessors = getAllAccessorDeclarations(<ClassDeclaration>node.parent, node);
            if (node === accessors.firstAccessor) {
                emitJsDocComments(accessors.getAccessor);
                emitJsDocComments(accessors.setAccessor);
                emitClassMemberDeclarationFlags(node);
                writeTextOfNode(currentSourceFile, node.name);
                if (!(node.flags & NodeFlags.Private)) {
                    var accessorWithTypeAnnotation: AccessorDeclaration = node;
                    var type = getTypeAnnotationFromAccessor(node);
                    if (!type) {
                        // couldn't get type for the first accessor, try the another one
                        var anotherAccessor = node.kind === SyntaxKind.GetAccessor ? accessors.setAccessor : accessors.getAccessor;
                        type = getTypeAnnotationFromAccessor(anotherAccessor);
                        if (type) {
                            accessorWithTypeAnnotation = anotherAccessor;
                        }
                    }
                    writeTypeAtLocation(node, type, getAccessorDeclarationTypeVisibilityError);
                }
                write(";");
                writeLine();
            }

            function getTypeAnnotationFromAccessor(accessor: AccessorDeclaration): TypeNode {
                if (accessor) {
                    return accessor.kind === SyntaxKind.GetAccessor ?
                        accessor.type : // Getter - return type
                        accessor.parameters[0].type; // Setter parameter type
                }
            }

            function getAccessorDeclarationTypeVisibilityError(symbolAccesibilityResult: SymbolAccessiblityResult): SymbolAccessibilityDiagnostic {
                var diagnosticMessage: DiagnosticMessage;
                if (accessorWithTypeAnnotation.kind === SyntaxKind.SetAccessor) {
                    // Setters have to have type named and cannot infer it so, the type should always be named
                    if (accessorWithTypeAnnotation.parent.flags & NodeFlags.Static) {
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
                        diagnosticMessage,
                        errorNode: <Node>accessorWithTypeAnnotation.parameters[0],
                        // TODO(jfreeman): Investigate why we are passing node.name instead of node.parameters[0].name
                        typeName: accessorWithTypeAnnotation.name
                    };
                }
                else {
                    if (accessorWithTypeAnnotation.flags & NodeFlags.Static) {
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
                        diagnosticMessage,
                        errorNode: <Node>accessorWithTypeAnnotation.name,
                        typeName: undefined
                    };
                }
            }
        }

        function emitFunctionDeclaration(node: FunctionLikeDeclaration) {
            // If we are emitting Method/Constructor it isn't moduleElement and hence already determined to be emitting
            // so no need to verify if the declaration is visible
            if ((node.kind !== SyntaxKind.FunctionDeclaration || resolver.isDeclarationVisible(node)) &&
                !resolver.isImplementationOfOverload(node)) {
                emitJsDocComments(node);
                if (node.kind === SyntaxKind.FunctionDeclaration) {
                    emitModuleElementDeclarationFlags(node);
                }
                else if (node.kind === SyntaxKind.Method) {
                    emitClassMemberDeclarationFlags(node);
                }
                if (node.kind === SyntaxKind.FunctionDeclaration) {
                    write("function ");
                    writeTextOfNode(currentSourceFile, node.name);
                }
                else if (node.kind === SyntaxKind.Constructor) {
                    write("constructor");
                }
                else {
                    writeTextOfNode(currentSourceFile, node.name);
                    if (node.flags & NodeFlags.QuestionMark) {
                        write("?");
                    }
                }
                emitSignatureDeclaration(node);
            }
        }

        function emitSignatureDeclarationWithJsDocComments(node: SignatureDeclaration) {
            emitJsDocComments(node);
            emitSignatureDeclaration(node);
        }

        function emitSignatureDeclaration(node: SignatureDeclaration) {
            // Construct signature or constructor type write new Signature
            if (node.kind === SyntaxKind.ConstructSignature || node.kind === SyntaxKind.ConstructorType) {
                write("new ");
            }
            emitTypeParameters(node.typeParameters);
            if (node.kind === SyntaxKind.IndexSignature) {
                write("[");
            }
            else {
                write("(");
            }

            var prevEnclosingDeclaration = enclosingDeclaration;
            enclosingDeclaration = node;

            // Parameters
            emitCommaList(node.parameters, emitParameterDeclaration);

            if (node.kind === SyntaxKind.IndexSignature) {
                write("]");
            }
            else {
                write(")");
            }

            // If this is not a constructor and is not private, emit the return type
            var isFunctionTypeOrConstructorType = node.kind === SyntaxKind.FunctionType || node.kind === SyntaxKind.ConstructorType;
            if (isFunctionTypeOrConstructorType || node.parent.kind === SyntaxKind.TypeLiteral) {
                // Emit type literal signature return type only if specified
                if (node.type) {
                    write(isFunctionTypeOrConstructorType ? " => " : ": ");
                    emitType(node.type);
                }
            }
            else if (node.kind !== SyntaxKind.Constructor && !(node.flags & NodeFlags.Private)) {
                writeReturnTypeAtSignature(node, getReturnTypeVisibilityError);
            }

            enclosingDeclaration = prevEnclosingDeclaration;

            if (!isFunctionTypeOrConstructorType) {
                write(";");
                writeLine();
            }

            function getReturnTypeVisibilityError(symbolAccesibilityResult: SymbolAccessiblityResult): SymbolAccessibilityDiagnostic {
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
                        Debug.fail("This is unknown kind for signature: " + node.kind);
                }

                return {
                    diagnosticMessage,
                    errorNode: <Node>node.name || node,
                };
            }
        }

        function emitParameterDeclaration(node: ParameterDeclaration) {
            increaseIndent();
            emitJsDocComments(node);
            if (node.flags & NodeFlags.Rest) {
                write("...");
            }
            writeTextOfNode(currentSourceFile, node.name);
            if (node.initializer || (node.flags & NodeFlags.QuestionMark)) {
                write("?");
            }
            decreaseIndent();

            if (node.parent.kind === SyntaxKind.FunctionType ||
                node.parent.kind === SyntaxKind.ConstructorType ||
                node.parent.parent.kind === SyntaxKind.TypeLiteral) {
                emitTypeOfVariableDeclarationFromTypeLiteral(node);
            }
            else if (!(node.parent.flags & NodeFlags.Private)) {
                writeTypeAtLocation(node, node.type, getParameterDeclarationTypeVisibilityError);
            }

            function getParameterDeclarationTypeVisibilityError(symbolAccesibilityResult: SymbolAccessiblityResult): SymbolAccessibilityDiagnostic {
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
                        Debug.fail("This is unknown parent for parameter: " + node.parent.kind);
                }

                return {
                    diagnosticMessage,
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
                    return emitFunctionDeclaration(<FunctionLikeDeclaration>node);
                case SyntaxKind.ConstructSignature:
                case SyntaxKind.CallSignature:
                case SyntaxKind.IndexSignature:
                    return emitSignatureDeclarationWithJsDocComments(<SignatureDeclaration>node);
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
                case SyntaxKind.TypeAliasDeclaration:
                    return emitTypeAliasDeclaration(<TypeAliasDeclaration>node);
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

        // Contains the reference paths that needs to go in the declaration file. 
        // Collecting this separately because reference paths need to be first thing in the declaration file 
        // and we could be collecting these paths from multiple files into single one with --out option
        var referencePathsOutput = "";
        function writeReferencePath(referencedFile: SourceFile) {
            var declFileName = referencedFile.flags & NodeFlags.DeclarationFile
                ? referencedFile.filename // Declaration file, use declaration file name
                : shouldEmitToOwnFile(referencedFile, compilerOptions)
                ? getOwnEmitOutputFilePath(referencedFile, program, ".d.ts") // Own output file so get the .d.ts file
                : removeFileExtension(compilerOptions.out) + ".d.ts";// Global out file

            declFileName = getRelativePathToDirectoryOrUrl(
                getDirectoryPath(normalizeSlashes(jsFilePath)),
                declFileName,
                compilerHost.getCurrentDirectory(),
                compilerHost.getCanonicalFileName,
            /*isAbsolutePathAnUrl*/ false);

            referencePathsOutput += "/// <reference path=\"" + declFileName + "\" />" + newLine;
        }

        if (root) {
            // Emitting just a single file, so emit references in this file only
            if (!compilerOptions.noResolve) {
                var addedGlobalFileReference = false;
                forEach(root.referencedFiles, fileReference => {
                    var referencedFile = tryResolveScriptReference(program, root, fileReference);

                    // All the references that are not going to be part of same file
                    if (referencedFile && ((referencedFile.flags & NodeFlags.DeclarationFile) || // This is a declare file reference
                        shouldEmitToOwnFile(referencedFile, compilerOptions) || // This is referenced file is emitting its own js file
                        !addedGlobalFileReference)) { // Or the global out file corresponding to this reference was not added

                        writeReferencePath(referencedFile);
                        if (!isExternalModuleOrDeclarationFile(referencedFile)) {
                            addedGlobalFileReference = true;
                        }
                    }
                });
            }

            emitNode(root);
        }
        else {
            // Emit references corresponding to this file
            var emittedReferencedFiles: SourceFile[] = [];
            forEach(program.getSourceFiles(), sourceFile => {
                if (!isExternalModuleOrDeclarationFile(sourceFile)) {
                    // Check what references need to be added
                    if (!compilerOptions.noResolve) {
                        forEach(sourceFile.referencedFiles, fileReference => {
                            var referencedFile = tryResolveScriptReference(program, sourceFile, fileReference);

                            // If the reference file is a declaration file or an external module, emit that reference
                            if (referencedFile && (isExternalModuleOrDeclarationFile(referencedFile) &&
                                !contains(emittedReferencedFiles, referencedFile))) { // If the file reference was not already emitted

                                writeReferencePath(referencedFile);
                                emittedReferencedFiles.push(referencedFile);
                            }
                        });
                    }

                    emitNode(sourceFile);
                }
            });
        }

        return {
            reportedDeclarationError,
            aliasDeclarationEmitInfo,
            synchronousDeclarationOutput: writer.getText(),
            referencePathsOutput,
        }
    }

    export function getDeclarationDiagnostics(program: Program, resolver: EmitResolver, targetSourceFile: SourceFile): Diagnostic[] {
        var diagnostics: Diagnostic[] = [];
        var jsFilePath = getOwnEmitOutputFilePath(targetSourceFile, program, ".js");
        emitDeclarations(program, resolver, diagnostics, jsFilePath, targetSourceFile);
        return diagnostics;
    }

    // targetSourceFile is when users only want one file in entire project to be emitted. This is used in compilerOnSave feature
    export function emitFiles(resolver: EmitResolver, targetSourceFile?: SourceFile): EmitResult {
        var program = resolver.getProgram();
        var compilerHost = program.getCompilerHost();
        var compilerOptions = program.getCompilerOptions();
        var sourceMapDataList: SourceMapData[] = compilerOptions.sourceMap ? [] : undefined;
        var diagnostics: Diagnostic[] = [];
        var newLine = program.getCompilerHost().getNewLine();

        function emitJavaScript(jsFilePath: string, root?: SourceFile) {
            var writer = createTextWriter(newLine);
            var write = writer.write;
            var writeTextOfNode = writer.writeTextOfNode;
            var writeLine = writer.writeLine;
            var increaseIndent = writer.increaseIndent;
            var decreaseIndent = writer.decreaseIndent;

            var currentSourceFile: SourceFile;

            var extendsEmitted = false;

            /** write emitted output to disk*/
            var writeEmittedFiles = writeJavaScriptFile;

            /** Emit leading comments of the node */
            var emitLeadingComments = compilerOptions.removeComments ? (node: Node) => { } : emitLeadingDeclarationComments;

            /** Emit Trailing comments of the node */
            var emitTrailingComments = compilerOptions.removeComments ? (node: Node) => { } : emitTrailingDeclarationComments;

            var emitLeadingCommentsOfPosition = compilerOptions.removeComments ? (pos: number) => { } : emitLeadingCommentsOfLocalPosition;

            var detachedCommentsInfo: { nodePos: number; detachedCommentEndPos: number }[];
            /** Emit detached comments of the node */
            var emitDetachedComments = compilerOptions.removeComments ? (node: TextRange) => { } : emitDetachedCommentsAtPosition;

            /** Emits /// or pinned which is comment starting with /*! comments */
            var emitPinnedOrTripleSlashComments = compilerOptions.removeComments ? (node: Node) => { } : emitPinnedOrTripleSlashCommentsOfNode;

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

            /** Called to before starting the lexical scopes as in function/class in the emitted code because of node
              * @param scopeDeclaration node that starts the lexical scope
              * @param scopeName Optional name of this scope instead of deducing one from the declaration node */
            var scopeEmitStart = function (scopeDeclaration: Node, scopeName?: string) { }

            /** Called after coming out of the scope */
            var scopeEmitEnd = function () { }

            /** Sourcemap data that will get encoded */
            var sourceMapData: SourceMapData;

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

                function recordEmitNodeStartSpan(node: Node) {
                    // Get the token pos after skipping to the token (ignoring the leading trivia)
                    recordSourceMapSpan(skipTrivia(currentSourceFile.text, node.pos));
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
                    // Add the file to tsFilePaths
                    // If sourceroot option: Use the relative path corresponding to the common directory path 
                    // otherwise source locations relative to map file location
                    var sourcesDirectoryPath = compilerOptions.sourceRoot ? program.getCommonSourceDirectory() : sourceMapDir;

                    sourceMapData.sourceMapSources.push(getRelativePathToDirectoryOrUrl(sourcesDirectoryPath,
                        node.filename,
                        compilerHost.getCurrentDirectory(),
                        compilerHost.getCanonicalFileName,
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
                            // TODO(jfreeman): Ask shkamat about what this name should be for source maps
                            scopeName = (<Identifier>(<Declaration>node).name).text;
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

                function writeCommentRangeWithMap(curentSourceFile: SourceFile, writer: EmitTextWriter, comment: CommentRange, newLine: string) {
                    recordSourceMapSpan(comment.pos);
                    writeCommentRange(currentSourceFile, writer, comment, newLine);
                    recordSourceMapSpan(comment.end);
                }

                function serializeSourceMapContents(version: number, file: string, sourceRoot: string, sources: string[], names: string[], mappings: string) {
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

                    return "{\"version\":" + version + ",\"file\":\"" + escapeString(file) + "\",\"sourceRoot\":\"" + escapeString(sourceRoot) + "\",\"sources\":[" + serializeStringArray(sources) + "],\"names\":[" + serializeStringArray(names) + "],\"mappings\":\"" + escapeString(mappings) + "\"}";

                    function serializeStringArray(list: string[]): string {
                        var output = "";
                        for (var i = 0, n = list.length; i < n; i++) {
                            if (i) {
                                output += ",";
                            }
                            output += "\"" + escapeString(list[i]) + "\"";
                        }
                        return output;
                    }
                }

                function writeJavaScriptAndSourceMapFile(emitOutput: string, writeByteOrderMark: boolean) {
                    // Write source map file
                    encodeLastRecordedSourceMapSpan();
                    writeFile(compilerHost, diagnostics, sourceMapData.sourceMapFilePath, serializeSourceMapContents(
                        3,
                        sourceMapData.sourceMapFile,
                        sourceMapData.sourceMapSourceRoot,
                        sourceMapData.sourceMapSources,
                        sourceMapData.sourceMapNames,
                        sourceMapData.sourceMapMappings), /*writeByteOrderMark*/ false);
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
                        sourceMapDir = getDirectoryPath(getSourceFilePathInNewDir(root, program, sourceMapDir));
                    }

                    if (!isRootedDiskPath(sourceMapDir) && !isUrl(sourceMapDir)) {
                        // The relative paths are relative to the common directory
                        sourceMapDir = combinePaths(program.getCommonSourceDirectory(), sourceMapDir);
                        sourceMapData.jsSourceMappingURL = getRelativePathToDirectoryOrUrl(
                            getDirectoryPath(normalizePath(jsFilePath)), // get the relative sourceMapDir path based on jsFilePath
                            combinePaths(sourceMapDir, sourceMapData.jsSourceMappingURL), // this is where user expects to see sourceMap
                            compilerHost.getCurrentDirectory(),
                            compilerHost.getCanonicalFileName,
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
                scopeEmitStart = recordScopeNameOfNode;
                scopeEmitEnd = recordScopeNameEnd;
                writeComment = writeCommentRangeWithMap;
            }

            function writeJavaScriptFile(emitOutput: string, writeByteOrderMark: boolean) {
                writeFile(compilerHost, diagnostics, jsFilePath, emitOutput, writeByteOrderMark);
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

            function emitTrailingCommaIfPresent(nodeList: NodeArray<Node>, isMultiline: boolean): void {
                if (nodeList.hasTrailingComma) {
                    write(",");
                    if (isMultiline) {
                        writeLine();
                    }
                }
            }

            function emitCommaList(nodes: NodeArray<Node>, includeTrailingComma: boolean, count?: number) {
                if (!(count >= 0)) {
                    count = nodes.length;
                }
                if (nodes) {
                    for (var i = 0; i < count; i++) {
                        if (i) {
                            write(", ");
                        }
                        emit(nodes[i]);
                    }

                    if (includeTrailingComma) {
                        emitTrailingCommaIfPresent(nodes, /*isMultiline*/ false);
                    }
                }
            }

            function emitMultiLineList(nodes: NodeArray<Node>, includeTrailingComma: boolean) {
                if (nodes) {
                    for (var i = 0; i < nodes.length; i++) {
                        if (i) {
                            write(",");
                        }
                        writeLine();
                        emit(nodes[i]);
                    }

                    if (includeTrailingComma) {
                        emitTrailingCommaIfPresent(nodes, /*isMultiline*/ true);
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
                var text = getLiteralText();

                if (compilerOptions.sourceMap && (node.kind === SyntaxKind.StringLiteral || isTemplateLiteralKind(node.kind))) {
                    writer.writeLiteral(text);
                }
                else {
                    write(text);
                }

                function getLiteralText() {
                    if (compilerOptions.target < ScriptTarget.ES6 && isTemplateLiteralKind(node.kind)) {
                        return getTemplateLiteralAsStringLiteral(node)
                    }

                    return getSourceTextOfNodeFromSourceFile(currentSourceFile, node);
                }
            }

            function getTemplateLiteralAsStringLiteral(node: LiteralExpression): string {
                return '"' + escapeString(node.text) + '"';
            }

            function emitTemplateExpression(node: TemplateExpression): void {
                // In ES6 mode and above, we can simply emit each portion of a template in order, but in
                // ES3 & ES5 we must convert the template expression into a series of string concatenations.
                if (compilerOptions.target >= ScriptTarget.ES6) {
                    forEachChild(node, emit);
                    return;
                }

                Debug.assert(node.parent.kind !== SyntaxKind.TaggedTemplateExpression);

                var emitOuterParens = isExpression(node.parent)
                    && templateNeedsParens(node, <Expression>node.parent);

                if (emitOuterParens) {
                    write("(");
                }

                emitLiteral(node.head);

                forEach(node.templateSpans, templateSpan => {
                    // Check if the expression has operands and binds its operands less closely than binary '+'.
                    // If it does, we need to wrap the expression in parentheses. Otherwise, something like
                    //    `abc${ 1 << 2 }`
                    // becomes
                    //    "abc" + 1 << 2 + ""
                    // which is really
                    //    ("abc" + 1) << (2 + "")
                    // rather than
                    //    "abc" + (1 << 2) + ""
                    var needsParens = templateSpan.expression.kind !== SyntaxKind.ParenExpression
                        && comparePrecedenceToBinaryPlus(templateSpan.expression) !== Comparison.GreaterThan;

                    write(" + ");

                    if (needsParens) {
                        write("(");
                    }
                    emit(templateSpan.expression);
                    if (needsParens) {
                        write(")");
                    }

                    // Only emit if the literal is non-empty.
                    // The binary '+' operator is left-associative, so the first string concatenation
                    // with the head will force the result up to this point to be a string.
                    // Emitting a '+ ""' has no semantic effect for middles and tails.
                    if (templateSpan.literal.text.length !== 0) {
                        write(" + ")
                        emitLiteral(templateSpan.literal);
                    }
                });

                if (emitOuterParens) {
                    write(")");
                }

                function templateNeedsParens(template: TemplateExpression, parent: Expression) {
                    switch (parent.kind) {
                        case SyntaxKind.CallExpression:
                        case SyntaxKind.NewExpression:
                            return (<CallExpression>parent).func === template;
                        case SyntaxKind.ParenExpression:
                            return false;
                        case SyntaxKind.TaggedTemplateExpression:
                            Debug.fail("Path should be unreachable; tagged templates not supported pre-ES6.");
                        default:
                            return comparePrecedenceToBinaryPlus(parent) !== Comparison.LessThan;
                    }
                }

                /**
                 * Returns whether the expression has lesser, greater,
                 * or equal precedence to the binary '+' operator
                 */
                function comparePrecedenceToBinaryPlus(expression: Expression): Comparison {
                    // All binary expressions have lower precedence than '+' apart from '*', '/', and '%'.
                    // All unary operators have a higher precedence apart from yield.
                    // Arrow functions and conditionals have a lower precedence, 
                    // although we convert the former into regular function expressions in ES5 mode,
                    // and in ES6 mode this function won't get called anyway.
                    // 
                    // TODO (drosen): Note that we need to account for the upcoming 'yield' and
                    //                spread ('...') unary operators that are anticipated for ES6.
                    Debug.assert(compilerOptions.target <= ScriptTarget.ES5);
                    switch (expression.kind) {
                        case SyntaxKind.BinaryExpression:
                            switch ((<BinaryExpression>expression).operator) {
                                case SyntaxKind.AsteriskToken:
                                case SyntaxKind.SlashToken:
                                case SyntaxKind.PercentToken:
                                    return Comparison.GreaterThan;
                                case SyntaxKind.PlusToken:
                                    return Comparison.EqualTo;
                                default:
                                    return Comparison.LessThan;
                            }
                        case SyntaxKind.ConditionalExpression:
                            return Comparison.LessThan;
                        default:
                            return Comparison.GreaterThan;
                    }
                }
            }

            function emitTemplateSpan(span: TemplateSpan) {
                emit(span.expression);
                emit(span.literal);
            }

            // This function specifically handles numeric/string literals for enum and accessor 'identifiers'.
            // In a sense, it does not actually emit identifiers as much as it declares a name for a specific property.
            function emitExpressionForPropertyName(node: DeclarationName) {
                if (node.kind === SyntaxKind.StringLiteral) {
                    emitLiteral(<LiteralExpression>node);
                }
                else {
                    write("\"");

                    if (node.kind === SyntaxKind.NumericLiteral) {
                        write((<LiteralExpression>node).text);
                    }
                    else {
                        writeTextOfNode(currentSourceFile, node);
                    }

                    write("\"");
                }
            }

            function isNotExpressionIdentifier(node: Identifier) {
                var parent = node.parent;
                switch (parent.kind) {
                    case SyntaxKind.Parameter:
                    case SyntaxKind.VariableDeclaration:
                    case SyntaxKind.Property:
                    case SyntaxKind.PropertyAssignment:
                    case SyntaxKind.ShorthandPropertyAssignment:
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
                    case SyntaxKind.LabeledStatement:
                        return (<LabeledStatement>node.parent).label === node;
                    case SyntaxKind.CatchBlock:
                        return (<CatchBlock>node.parent).variable === node;
                }
            }

            function emitExpressionIdentifier(node: Identifier) {
                var prefix = resolver.getExpressionNamePrefix(node);
                if (prefix) {
                    write(prefix);
                    write(".");
                }
                writeTextOfNode(currentSourceFile, node);
            }

            function emitIdentifier(node: Identifier) {
                if (!isNotExpressionIdentifier(node)) {
                    emitExpressionIdentifier(node);
                }
                else {
                    writeTextOfNode(currentSourceFile, node);
                }
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
                    emitMultiLineList(node.elements, /*includeTrailingComma*/ true);
                    decreaseIndent();
                    writeLine();
                    write("]");
                }
                else {
                    write("[");
                    emitCommaList(node.elements, /*includeTrailingComma*/ true);
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
                    emitMultiLineList(node.properties, /*includeTrailingComma*/ compilerOptions.target >= ScriptTarget.ES5);
                    decreaseIndent();
                    writeLine();
                    write("}");
                }
                else {
                    write("{ ");
                    emitCommaList(node.properties, /*includeTrailingComma*/ compilerOptions.target >= ScriptTarget.ES5);
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

            function emitShortHandPropertyAssignment(node: ShortHandPropertyDeclaration) {
                function emitAsNormalPropertyAssignment() {
                    emitLeadingComments(node);
                    // Emit identifier as an identifier
                    emit(node.name);
                    write(": ");
                    // Even though this is stored as identified because it is in short-hand property assignment,
                    // treated it as expression 
                    emitExpressionIdentifier(node.name);
                    emitTrailingComments(node);
                }

                if (compilerOptions.target < ScriptTarget.ES6) {
                    emitAsNormalPropertyAssignment();
                }
                else if (compilerOptions.target >= ScriptTarget.ES6) {
                    // If short-hand property has a prefix, then regardless of the target version, we will emit it as normal property assignment
                    var prefix = resolver.getExpressionNamePrefix(node.name);
                    if (prefix) {
                        emitAsNormalPropertyAssignment();
                    }
                    // If short-hand property has no prefix, emit it as short-hand.
                    else {
                        emitLeadingComments(node);
                        emit(node.name);
                        emitTrailingComments(node);
                    }
                }
            }

            function tryEmitConstantValue(node: PropertyAccess | IndexedAccess): boolean {
                var constantValue = resolver.getConstantValue(node);
                if (constantValue !== undefined) {
                    var propertyName = node.kind === SyntaxKind.PropertyAccess ? declarationNameToString((<PropertyAccess>node).right) : getTextOfNode((<IndexedAccess>node).index);
                    write(constantValue.toString() + " /* " + propertyName + " */");
                    return true;
                }
                return false;
            }

            function emitPropertyAccess(node: PropertyAccess) {
                if (tryEmitConstantValue(node)) {
                    return;
                }
                emit(node.left);
                write(".");
                emit(node.right);
            }

            function emitIndexedAccess(node: IndexedAccess) {
                if (tryEmitConstantValue(node)) {
                    return;
                }
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
                        emitCommaList(node.arguments, /*includeTrailingComma*/ false);
                    }
                    write(")");
                }
                else {
                    write("(");
                    emitCommaList(node.arguments, /*includeTrailingComma*/ false);
                    write(")");
                }
            }

            function emitNewExpression(node: NewExpression) {
                write("new ");
                emit(node.func);
                if (node.arguments) {
                    write("(");
                    emitCommaList(node.arguments, /*includeTrailingComma*/ false);
                    write(")");
                }
            }

            function emitTaggedTemplateExpression(node: TaggedTemplateExpression): void {
                Debug.assert(compilerOptions.target >= ScriptTarget.ES6, "Trying to emit a tagged template in pre-ES6 mode.");
                emit(node.tag);
                write(" ");
                emit(node.template);
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
                emitLeadingComments(node);
                if (isArrowExpression) write("(");
                emit(node.expression);
                if (isArrowExpression) write(")");
                write(";");
                emitTrailingComments(node);
            }

            function emitIfStatement(node: IfStatement) {
                emitLeadingComments(node);
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
                emitTrailingComments(node);
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
                    if (node.declarations[0] && isLet(node.declarations[0])) {
                        emitToken(SyntaxKind.LetKeyword, endPos);
                    }
                    else if (node.declarations[0] && isConst(node.declarations[0])) {
                        emitToken(SyntaxKind.ConstKeyword, endPos);
                    }
                    else {
                        emitToken(SyntaxKind.VarKeyword, endPos);
                    }
                    write(" ");
                    emitCommaList(node.declarations, /*includeTrailingComma*/ false);
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
                if (node.declarations) {
                    if (node.declarations.length >= 1) {
                        var decl = node.declarations[0];
                        if (isLet(decl)) {
                            emitToken(SyntaxKind.LetKeyword, endPos);
                        }
                        else {
                            emitToken(SyntaxKind.VarKeyword, endPos);
                        }
                        write(" ");
                        emit(decl);
                    }
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
                emitLeadingComments(node);
                emitToken(SyntaxKind.ReturnKeyword, node.pos);
                emitOptional(" ", node.expression);
                write(";");
                emitTrailingComments(node);
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

            function isOnSameLine(node1: Node, node2: Node) {
                return getLineOfLocalPosition(currentSourceFile, skipTrivia(currentSourceFile.text, node1.pos)) ===
                getLineOfLocalPosition(currentSourceFile, skipTrivia(currentSourceFile.text, node2.pos));
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
                if (node.statements.length === 1 && isOnSameLine(node, node.statements[0])) {
                    write(" ");
                    emit(node.statements[0]);
                }
                else {
                    increaseIndent();
                    emitLines(node.statements);
                    decreaseIndent();
                }
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

            function emitLabelledStatement(node: LabeledStatement) {
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
                if (!(node.flags & NodeFlags.Export)) {
                    if (isLet(node)) {
                        write("let ");
                    }
                    else if (isConst(node)) {
                        write("const ");
                    }
                    else {
                        write("var ");
                    }
                }
                emitCommaList(node.declarations, /*includeTrailingComma*/ false);
                write(";");
                emitTrailingComments(node);
            }

            function emitParameter(node: ParameterDeclaration) {
                emitLeadingComments(node);
                emit(node.name);
                emitTrailingComments(node);
            }

            function emitDefaultValueAssignments(node: FunctionLikeDeclaration) {
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

            function emitRestParameter(node: FunctionLikeDeclaration) {
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

            function emitFunctionDeclaration(node: FunctionLikeDeclaration) {
                if (!node.body) {
                    return emitPinnedOrTripleSlashComments(node);
                }

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

            function emitSignatureParameters(node: FunctionLikeDeclaration) {
                increaseIndent();
                write("(");
                if (node) {
                    emitCommaList(node.parameters, /*includeTrailingComma*/ false, node.parameters.length - (hasRestParameters(node) ? 1 : 0));
                }
                write(")");
                decreaseIndent();
            }

            function emitSignatureAndBody(node: FunctionLikeDeclaration) {
                emitSignatureParameters(node);
                write(" {");
                scopeEmitStart(node);
                increaseIndent();

                emitDetachedComments(node.body.kind === SyntaxKind.FunctionBlock ? (<Block>node.body).statements : node.body);

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
                        emitLeadingComments(node.body);
                        write("return ");
                        emit(node.body);
                        write(";");
                        emitTrailingComments(node.body);
                    }
                    writeLine();
                    if (node.body.kind === SyntaxKind.FunctionBlock) {
                        emitLeadingCommentsOfPosition((<Block>node.body).statements.end);
                        decreaseIndent();
                        emitToken(SyntaxKind.CloseBraceToken, (<Block>node.body).statements.end);
                    }
                    else {
                        decreaseIndent();
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
                    if (param.flags & NodeFlags.AccessibilityModifier) {
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

            // TODO(jfreeman): Account for computed property name
            function emitMemberAccess(memberName: DeclarationName) {
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
                        if (!(<MethodDeclaration>member).body) {
                            return emitPinnedOrTripleSlashComments(member);
                        }

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
                            emitExpressionForPropertyName((<AccessorDeclaration>member).name);
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

            function emitClassDeclaration(node: ClassDeclaration) {
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
                emitConstructorOfClass();
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

                function emitConstructorOfClass() {
                    // Emit the constructor overload pinned comments
                    forEach(node.members, member => {
                        if (member.kind === SyntaxKind.Constructor && !(<ConstructorDeclaration>member).body) {
                            emitPinnedOrTripleSlashComments(member);
                        }
                    });

                    var ctor = getFirstConstructorWithBody(node);
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
                    if (ctor) {
                        emitDetachedComments((<Block>ctor.body).statements);
                    }
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
                    writeLine();
                    if (ctor) {
                        emitLeadingCommentsOfPosition((<Block>ctor.body).statements.end);
                    }
                    decreaseIndent();
                    emitToken(SyntaxKind.CloseBraceToken, ctor ? (<Block>ctor.body).statements.end : node.members.end);
                    scopeEmitEnd();
                    emitEnd(<Node>ctor || node);
                    if (ctor) {
                        emitTrailingComments(ctor);
                    }
                }
            }

            function emitInterfaceDeclaration(node: InterfaceDeclaration) {
                emitPinnedOrTripleSlashComments(node);
            }

            function emitEnumDeclaration(node: EnumDeclaration) {
                // const enums are completely erased during compilation.
                var isConstEnum = isConst(node);
                if (isConstEnum && !compilerOptions.preserveConstEnums) {
                    return;
                }
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
                emitEnumMemberDeclarations(isConstEnum);
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

                function emitEnumMemberDeclarations(isConstEnum: boolean) {
                    forEach(node.members, member => {
                        writeLine();
                        emitLeadingComments(member);
                        emitStart(member);
                        write(resolver.getLocalNameOfContainer(node));
                        write("[");
                        write(resolver.getLocalNameOfContainer(node));
                        write("[");
                        emitExpressionForPropertyName(member.name);
                        write("] = ");
                        if (member.initializer && !isConstEnum) {
                            emit(member.initializer);
                        }
                        else {
                            write(resolver.getEnumMemberValue(member).toString());
                        }
                        write("] = ");
                        emitExpressionForPropertyName(member.name);
                        emitEnd(member);
                        write(";");
                        emitTrailingComments(member);
                    });
                }
            }

            function getInnerMostModuleDeclarationFromDottedModule(moduleDeclaration: ModuleDeclaration): ModuleDeclaration {
                if (moduleDeclaration.body.kind === SyntaxKind.ModuleDeclaration) {
                    var recursiveInnerModule = getInnerMostModuleDeclarationFromDottedModule(<ModuleDeclaration>moduleDeclaration.body);
                    return recursiveInnerModule || <ModuleDeclaration>moduleDeclaration.body;
                }
            }

            function emitModuleDeclaration(node: ModuleDeclaration) {
                if (getModuleInstanceState(node) !== ModuleInstanceState.Instantiated) {
                    return emitPinnedOrTripleSlashComments(node);
                }
                emitLeadingComments(node);
                emitStart(node);
                write("var ");
                emit(node.name);
                write(";");
                emitEnd(node);
                writeLine();
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
                if (node.flags & NodeFlags.Export) {
                    emit(node.name);
                    write(" = ");
                }
                emitModuleMemberName(node);
                write(" || (");
                emitModuleMemberName(node);
                write(" = {}));");
                emitEnd(node);
                emitTrailingComments(node);
            }

            function emitImportDeclaration(node: ImportDeclaration) {
                var emitImportDeclaration = resolver.isReferencedImportDeclaration(node);

                if (!emitImportDeclaration) {
                    // preserve old compiler's behavior: emit 'var' for import declaration (even if we do not consider them referenced) when
                    // - current file is not external module
                    // - import declaration is top level and target is value imported by entity name
                    emitImportDeclaration = !isExternalModule(currentSourceFile) && resolver.isTopLevelValueImportWithEntityName(node);
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
                    if (stat.kind === SyntaxKind.ImportDeclaration
                        && (<ImportDeclaration>stat).externalModuleName
                        && resolver.isReferencedImportDeclaration(<ImportDeclaration>stat)) {

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
                write("define(");
                if (node.amdModuleName) {
                    write("\"" + node.amdModuleName + "\", ");
                }
                write("[\"require\", \"exports\"");
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
                // Start new file on new line
                writeLine();
                emitDetachedComments(node);
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

            function emitNode(node: Node): void {
                if (!node) {
                    return;
                }

                if (node.flags & NodeFlags.Ambient) {
                    return emitPinnedOrTripleSlashComments(node);
                }

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
                    case SyntaxKind.NoSubstitutionTemplateLiteral:
                    case SyntaxKind.TemplateHead:
                    case SyntaxKind.TemplateMiddle:
                    case SyntaxKind.TemplateTail:
                        return emitLiteral(<LiteralExpression>node);
                    case SyntaxKind.TemplateExpression:
                        return emitTemplateExpression(<TemplateExpression>node);
                    case SyntaxKind.TemplateSpan:
                        return emitTemplateSpan(<TemplateSpan>node);
                    case SyntaxKind.QualifiedName:
                        return emitPropertyAccess(<QualifiedName>node);
                    case SyntaxKind.ArrayLiteral:
                        return emitArrayLiteral(<ArrayLiteral>node);
                    case SyntaxKind.ObjectLiteral:
                        return emitObjectLiteral(<ObjectLiteral>node);
                    case SyntaxKind.PropertyAssignment:
                        return emitPropertyAssignment(<PropertyDeclaration>node);
                    case SyntaxKind.ShorthandPropertyAssignment:
                        return emitShortHandPropertyAssignment(<ShortHandPropertyDeclaration>node);
                    case SyntaxKind.PropertyAccess:
                        return emitPropertyAccess(<PropertyAccess>node);
                    case SyntaxKind.IndexedAccess:
                        return emitIndexedAccess(<IndexedAccess>node);
                    case SyntaxKind.CallExpression:
                        return emitCallExpression(<CallExpression>node);
                    case SyntaxKind.NewExpression:
                        return emitNewExpression(<NewExpression>node);
                    case SyntaxKind.TaggedTemplateExpression:
                        return emitTaggedTemplateExpression(<TaggedTemplateExpression>node);
                    case SyntaxKind.TypeAssertion:
                        return emit((<TypeAssertion>node).operand);
                    case SyntaxKind.ParenExpression:
                        return emitParenExpression(<ParenExpression>node);
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.ArrowFunction:
                        return emitFunctionDeclaration(<FunctionLikeDeclaration>node);
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
                    case SyntaxKind.LabeledStatement:
                        return emitLabelledStatement(<LabeledStatement>node);
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
                    case SyntaxKind.InterfaceDeclaration:
                        return emitInterfaceDeclaration(<InterfaceDeclaration>node);
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

            function hasDetachedComments(pos: number) {
                return detachedCommentsInfo !== undefined && detachedCommentsInfo[detachedCommentsInfo.length - 1].nodePos === pos;
            }

            function getLeadingCommentsWithoutDetachedComments() {
                // get the leading comments from detachedPos
                var leadingComments = getLeadingCommentRanges(currentSourceFile.text, detachedCommentsInfo[detachedCommentsInfo.length - 1].detachedCommentEndPos);
                if (detachedCommentsInfo.length - 1) {
                    detachedCommentsInfo.pop();
                }
                else {
                    detachedCommentsInfo = undefined;
                }

                return leadingComments;
            }


            function getLeadingCommentsToEmit(node: Node) {
                // Emit the leading comments only if the parent's pos doesn't match because parent should take care of emitting these comments
                if (node.parent.kind === SyntaxKind.SourceFile || node.pos !== node.parent.pos) {
                    var leadingComments: CommentRange[];
                    if (hasDetachedComments(node.pos)) {
                        // get comments without detached comments
                        leadingComments = getLeadingCommentsWithoutDetachedComments();
                    }
                    else {
                        // get the leading comments from the node
                        leadingComments = getLeadingCommentRangesOfNode(node, currentSourceFile);
                    }
                    return leadingComments;
                }
            }

            function emitLeadingDeclarationComments(node: Node) {
                var leadingComments = getLeadingCommentsToEmit(node);
                emitNewLineBeforeLeadingComments(currentSourceFile, writer, node, leadingComments);
                // Leading comments are emitted at /*leading comment1 */space/*leading comment*/space
                emitComments(currentSourceFile, writer, leadingComments, /*trailingSeparator*/ true, newLine, writeComment);
            }

            function emitTrailingDeclarationComments(node: Node) {
                // Emit the trailing comments only if the parent's end doesn't match
                if (node.parent.kind === SyntaxKind.SourceFile || node.end !== node.parent.end) {
                    var trailingComments = getTrailingCommentRanges(currentSourceFile.text, node.end);
                    // trailing comments are emitted at space/*trailing comment1 */space/*trailing comment*/
                    emitComments(currentSourceFile, writer, trailingComments, /*trailingSeparator*/ false, newLine, writeComment);                    
                }
            }

            function emitLeadingCommentsOfLocalPosition(pos: number) {
                var leadingComments: CommentRange[];
                if (hasDetachedComments(pos)) {
                    // get comments without detached comments
                    leadingComments = getLeadingCommentsWithoutDetachedComments();
                }
                else {
                    // get the leading comments from the node
                    leadingComments = getLeadingCommentRanges(currentSourceFile.text, pos);
                }
                emitNewLineBeforeLeadingComments(currentSourceFile, writer, { pos: pos, end: pos }, leadingComments);
                // Leading comments are emitted at /*leading comment1 */space/*leading comment*/space
                emitComments(currentSourceFile, writer, leadingComments, /*trailingSeparator*/ true, newLine, writeComment);                
            }

            function emitDetachedCommentsAtPosition(node: TextRange) {
                var leadingComments = getLeadingCommentRanges(currentSourceFile.text, node.pos);
                if (leadingComments) {
                    var detachedComments: CommentRange[] = [];
                    var lastComment: CommentRange;

                    forEach(leadingComments, comment => {
                        if (lastComment) {
                            var lastCommentLine = getLineOfLocalPosition(currentSourceFile, lastComment.end);
                            var commentLine = getLineOfLocalPosition(currentSourceFile, comment.pos);

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
                        var lastCommentLine = getLineOfLocalPosition(currentSourceFile, detachedComments[detachedComments.length - 1].end);
                        var astLine = getLineOfLocalPosition(currentSourceFile, skipTrivia(currentSourceFile.text, node.pos));
                        if (astLine >= lastCommentLine + 2) {
                            // Valid detachedComments
                            emitNewLineBeforeLeadingComments(currentSourceFile, writer, node, leadingComments);
                            emitComments(currentSourceFile, writer, detachedComments, /*trailingSeparator*/ true, newLine, writeComment);
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

            function emitPinnedOrTripleSlashCommentsOfNode(node: Node) {
                var pinnedComments = ts.filter(getLeadingCommentsToEmit(node), isPinnedOrTripleSlashComment);

                function isPinnedOrTripleSlashComment(comment: CommentRange) {
                    if (currentSourceFile.text.charCodeAt(comment.pos + 1) === CharacterCodes.asterisk) {
                        return currentSourceFile.text.charCodeAt(comment.pos + 2) === CharacterCodes.exclamation;
                    }
                    // Verify this is /// comment, but do the regexp match only when we first can find /// in the comment text 
                    // so that we don't end up computing comment string and doing match for all // comments
                    else if (currentSourceFile.text.charCodeAt(comment.pos + 1) === CharacterCodes.slash &&
                        comment.pos + 2 < comment.end &&
                        currentSourceFile.text.charCodeAt(comment.pos + 2) === CharacterCodes.slash &&
                        currentSourceFile.text.substring(comment.pos, comment.end).match(fullTripleSlashReferencePathRegEx)) {
                        return true;
                    }
                }

                emitNewLineBeforeLeadingComments(currentSourceFile, writer, node, pinnedComments);
                // Leading comments are emitted at /*leading comment1 */space/*leading comment*/space
                emitComments(currentSourceFile, writer, pinnedComments, /*trailingSeparator*/ true, newLine, writeComment);
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

        function writeDeclarationFile(jsFilePath: string, sourceFile: SourceFile) {
            var emitDeclarationResult = emitDeclarations(program, resolver, diagnostics, jsFilePath, sourceFile);
            // TODO(shkamat): Should we not write any declaration file if any of them can produce error, 
            // or should we just not write this file like we are doing now
            if (!emitDeclarationResult.reportedDeclarationError) {
                var declarationOutput = emitDeclarationResult.referencePathsOutput;
                // apply additions
                var appliedSyncOutputPos = 0;
                forEach(emitDeclarationResult.aliasDeclarationEmitInfo, aliasEmitInfo => {
                    if (aliasEmitInfo.asynchronousOutput) {
                        declarationOutput += emitDeclarationResult.synchronousDeclarationOutput.substring(appliedSyncOutputPos, aliasEmitInfo.outputPos);
                        declarationOutput += aliasEmitInfo.asynchronousOutput;
                        appliedSyncOutputPos = aliasEmitInfo.outputPos;
                    }
                });
                declarationOutput += emitDeclarationResult.synchronousDeclarationOutput.substring(appliedSyncOutputPos);
                writeFile(compilerHost, diagnostics, removeFileExtension(jsFilePath) + ".d.ts", declarationOutput, compilerOptions.emitBOM);
            }
        }

        var hasSemanticErrors = resolver.hasSemanticErrors();
        var isEmitBlocked = resolver.isEmitBlocked(targetSourceFile);

        function emitFile(jsFilePath: string, sourceFile?: SourceFile) {
            if (!isEmitBlocked) {
                emitJavaScript(jsFilePath, sourceFile);
                if (!hasSemanticErrors && compilerOptions.declaration) {
                    writeDeclarationFile(jsFilePath, sourceFile);
                }
            }
        }

        if (targetSourceFile === undefined) {
            // No targetSourceFile is specified (e.g. calling emitter from batch compiler)
            forEach(program.getSourceFiles(), sourceFile => {
                if (shouldEmitToOwnFile(sourceFile, compilerOptions)) {
                    var jsFilePath = getOwnEmitOutputFilePath(sourceFile, program, ".js");
                    emitFile(jsFilePath, sourceFile);
                }
            });

            if (compilerOptions.out) {
                emitFile(compilerOptions.out);
            }
        }
        else {
            // targetSourceFile is specified (e.g calling emitter from language service or calling getSemanticDiagnostic from language service)
            if (shouldEmitToOwnFile(targetSourceFile, compilerOptions)) {
                // If shouldEmitToOwnFile returns true or targetSourceFile is an external module file, then emit targetSourceFile in its own output file
                var jsFilePath = getOwnEmitOutputFilePath(targetSourceFile, program, ".js");
                emitFile(jsFilePath, targetSourceFile);
            }
            else if (!isDeclarationFile(targetSourceFile) && compilerOptions.out) {
                // Otherwise, if --out is specified and targetSourceFile is not a declaration file,
                // Emit all, non-external-module file, into one single output file
                emitFile(compilerOptions.out);
            }
        }
       
        // Sort and make the unique list of diagnostics
        diagnostics.sort(compareDiagnostics);
        diagnostics = deduplicateSortedDiagnostics(diagnostics);

        // Update returnCode if there is any EmitterError
        var hasEmitterError = forEach(diagnostics, diagnostic => diagnostic.category === DiagnosticCategory.Error);

        // Check and update returnCode for syntactic and semantic
        var emitResultStatus: EmitReturnStatus;
        if (isEmitBlocked) {
            emitResultStatus = EmitReturnStatus.AllOutputGenerationSkipped;
        } else if (hasEmitterError) {
            emitResultStatus = EmitReturnStatus.EmitErrorsEncountered;
        } else if (hasSemanticErrors && compilerOptions.declaration) {
            emitResultStatus = EmitReturnStatus.DeclarationGenerationSkipped;
        } else if (hasSemanticErrors && !compilerOptions.declaration) {
            emitResultStatus = EmitReturnStatus.JSGeneratedWithSemanticErrors;
        } else {
            emitResultStatus = EmitReturnStatus.Succeeded;
        }

        return {
            emitResultStatus,
            diagnostics,
            sourceMaps: sourceMapDataList
        };
    }
}
