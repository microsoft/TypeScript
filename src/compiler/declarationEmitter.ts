/// <reference path="checker.ts"/>

/* @internal */
namespace ts {
    interface ModuleElementDeclarationEmitInfo {
        node: Node;
        outputPos: number;
        indent: number;
        asynchronousOutput?: string; // If the output for alias was written asynchronously, the corresponding output
        subModuleElementDeclarationEmitInfo?: ModuleElementDeclarationEmitInfo[];
        isVisible?: boolean;
    }

    interface DeclarationEmit {
        reportedDeclarationError: boolean;
        moduleElementDeclarationEmitInfo: ModuleElementDeclarationEmitInfo[];
        synchronousDeclarationOutput: string;
        referencePathsOutput: string;
    }

    type GetSymbolAccessibilityDiagnostic = (symbolAccesibilityResult: SymbolAccessiblityResult) => SymbolAccessibilityDiagnostic;

    interface EmitTextWriterWithSymbolWriter extends EmitTextWriter, SymbolWriter {
        getSymbolAccessibilityDiagnostic: GetSymbolAccessibilityDiagnostic;
    }

    interface SymbolAccessibilityDiagnostic {
        errorNode: Node;
        diagnosticMessage: DiagnosticMessage;
        typeName?: DeclarationName;
    }

    export function getDeclarationDiagnostics(host: EmitHost, resolver: EmitResolver, targetSourceFile: SourceFile): Diagnostic[] {
        let diagnostics: Diagnostic[] = [];
        let jsFilePath = getOwnEmitOutputFilePath(targetSourceFile, host, ".js");
        emitDeclarations(host, resolver, diagnostics, jsFilePath, targetSourceFile);
        return diagnostics;
    }

    function emitDeclarations(host: EmitHost, resolver: EmitResolver, diagnostics: Diagnostic[], jsFilePath: string, root?: SourceFile): DeclarationEmit {
        let newLine = host.getNewLine();
        let compilerOptions = host.getCompilerOptions();

        let write: (s: string) => void;
        let writeLine: () => void;
        let increaseIndent: () => void;
        let decreaseIndent: () => void;
        let writeTextOfNode: (sourceFile: SourceFile, node: Node) => void;

        let writer = createAndSetNewTextWriterWithSymbolWriter();

        let enclosingDeclaration: Node;
        let currentSourceFile: SourceFile;
        let reportedDeclarationError = false;
        let emitJsDocComments = compilerOptions.removeComments ? function (declaration: Node) { } : writeJsDocComments;
        let emit = compilerOptions.stripInternal ? stripInternal : emitNode;

        let moduleElementDeclarationEmitInfo: ModuleElementDeclarationEmitInfo[] = [];
        let asynchronousSubModuleDeclarationEmitInfo: ModuleElementDeclarationEmitInfo[];

        // Contains the reference paths that needs to go in the declaration file.
        // Collecting this separately because reference paths need to be first thing in the declaration file
        // and we could be collecting these paths from multiple files into single one with --out option
        let referencePathsOutput = "";

        if (root) {
            // Emitting just a single file, so emit references in this file only
            if (!compilerOptions.noResolve) {
                let addedGlobalFileReference = false;
                forEach(root.referencedFiles, fileReference => {
                    let referencedFile = tryResolveScriptReference(host, root, fileReference);

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

            emitSourceFile(root);

            // create asynchronous output for the importDeclarations
            if (moduleElementDeclarationEmitInfo.length) {
                let oldWriter = writer;
                forEach(moduleElementDeclarationEmitInfo, aliasEmitInfo => {
                    if (aliasEmitInfo.isVisible) {
                        Debug.assert(aliasEmitInfo.node.kind === SyntaxKind.ImportDeclaration);
                        createAndSetNewTextWriterWithSymbolWriter();
                        Debug.assert(aliasEmitInfo.indent === 0);
                        writeImportDeclaration(<ImportDeclaration>aliasEmitInfo.node);
                        aliasEmitInfo.asynchronousOutput = writer.getText();
                    }
                });
                setWriter(oldWriter);
            }
        }
        else {
            // Emit references corresponding to this file
            let emittedReferencedFiles: SourceFile[] = [];
            forEach(host.getSourceFiles(), sourceFile => {
                if (!isExternalModuleOrDeclarationFile(sourceFile)) {
                    // Check what references need to be added
                    if (!compilerOptions.noResolve) {
                        forEach(sourceFile.referencedFiles, fileReference => {
                            let referencedFile = tryResolveScriptReference(host, sourceFile, fileReference);

                            // If the reference file is a declaration file or an external module, emit that reference
                            if (referencedFile && (isExternalModuleOrDeclarationFile(referencedFile) &&
                                !contains(emittedReferencedFiles, referencedFile))) { // If the file reference was not already emitted

                                writeReferencePath(referencedFile);
                                emittedReferencedFiles.push(referencedFile);
                            }
                        });
                    }

                    emitSourceFile(sourceFile);
                }
            });
        }

        return {
            reportedDeclarationError,
            moduleElementDeclarationEmitInfo,
            synchronousDeclarationOutput: writer.getText(),
            referencePathsOutput,
        };

        function hasInternalAnnotation(range: CommentRange) {
            let text = currentSourceFile.text;
            let comment = text.substring(range.pos, range.end);
            return comment.indexOf("@internal") >= 0;
        }

        function stripInternal(node: Node) {
            if (node) {
                let leadingCommentRanges = getLeadingCommentRanges(currentSourceFile.text, node.pos);
                if (forEach(leadingCommentRanges, hasInternalAnnotation)) {
                    return;
                }

                emitNode(node);
            }
        }

        function createAndSetNewTextWriterWithSymbolWriter(): EmitTextWriterWithSymbolWriter {
            let writer = <EmitTextWriterWithSymbolWriter>createTextWriter(newLine);
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

        function writeAsynchronousModuleElements(nodes: Node[]) {
            let oldWriter = writer;
            forEach(nodes, declaration => {
                let nodeToCheck: Node;
                if (declaration.kind === SyntaxKind.VariableDeclaration) {
                    nodeToCheck = declaration.parent.parent;
                } else if (declaration.kind === SyntaxKind.NamedImports || declaration.kind === SyntaxKind.ImportSpecifier || declaration.kind === SyntaxKind.ImportClause) {
                    Debug.fail("We should be getting ImportDeclaration instead to write");
                } else {
                    nodeToCheck = declaration;
                }

                let moduleElementEmitInfo = forEach(moduleElementDeclarationEmitInfo, declEmitInfo => declEmitInfo.node === nodeToCheck ? declEmitInfo : undefined);
                if (!moduleElementEmitInfo && asynchronousSubModuleDeclarationEmitInfo) {
                    moduleElementEmitInfo = forEach(asynchronousSubModuleDeclarationEmitInfo, declEmitInfo => declEmitInfo.node === nodeToCheck ? declEmitInfo : undefined);
                }

                // If the alias was marked as not visible when we saw its declaration, we would have saved the aliasEmitInfo, but if we haven't yet visited the alias declaration
                // then we don't need to write it at this point. We will write it when we actually see its declaration
                // Eg.
                // export function bar(a: foo.Foo) { }
                // import foo = require("foo");
                // Writing of function bar would mark alias declaration foo as visible but we haven't yet visited that declaration so do nothing,
                // we would write alias foo declaration when we visit it since it would now be marked as visible
                if (moduleElementEmitInfo) {
                    if (moduleElementEmitInfo.node.kind === SyntaxKind.ImportDeclaration) {
                        // we have to create asynchronous output only after we have collected complete information
                        // because it is possible to enable multiple bindings as asynchronously visible
                        moduleElementEmitInfo.isVisible = true;
                    }
                    else {
                        createAndSetNewTextWriterWithSymbolWriter();
                        for (let declarationIndent = moduleElementEmitInfo.indent; declarationIndent; declarationIndent--) {
                            increaseIndent();
                        }

                        if (nodeToCheck.kind === SyntaxKind.ModuleDeclaration) {
                            Debug.assert(asynchronousSubModuleDeclarationEmitInfo === undefined);
                            asynchronousSubModuleDeclarationEmitInfo = [];
                        }
                        writeModuleElement(nodeToCheck);
                        if (nodeToCheck.kind === SyntaxKind.ModuleDeclaration) {
                            moduleElementEmitInfo.subModuleElementDeclarationEmitInfo = asynchronousSubModuleDeclarationEmitInfo;
                            asynchronousSubModuleDeclarationEmitInfo = undefined;
                        }
                        moduleElementEmitInfo.asynchronousOutput = writer.getText();
                    }
                }
            });
            setWriter(oldWriter);
        }

        function handleSymbolAccessibilityError(symbolAccesibilityResult: SymbolAccessiblityResult) {
            if (symbolAccesibilityResult.accessibility === SymbolAccessibility.Accessible) {
                // write the aliases
                if (symbolAccesibilityResult && symbolAccesibilityResult.aliasesToMakeVisible) {
                    writeAsynchronousModuleElements(symbolAccesibilityResult.aliasesToMakeVisible);
                }
            }
            else {
                // Report error
                reportedDeclarationError = true;
                let errorInfo = writer.getSymbolAccessibilityDiagnostic(symbolAccesibilityResult);
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

        function writeTypeOfDeclaration(declaration: AccessorDeclaration | VariableLikeDeclaration, type: TypeNode, getSymbolAccessibilityDiagnostic: GetSymbolAccessibilityDiagnostic) {
            writer.getSymbolAccessibilityDiagnostic = getSymbolAccessibilityDiagnostic;
            write(": ");
            if (type) {
                // Write the type
                emitType(type);
            }
            else {
                resolver.writeTypeOfDeclaration(declaration, enclosingDeclaration, TypeFormatFlags.UseTypeOfFunction, writer);
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
            for (let node of nodes) {
                emit(node);
            }
        }

        function emitSeparatedList(nodes: Node[], separator: string, eachNodeEmitFn: (node: Node) => void, canEmitFn?: (node: Node) => boolean) {
            let currentWriterPos = writer.getTextPos();
            for (let node of nodes) {
                if (!canEmitFn || canEmitFn(node)) {
                    if (currentWriterPos !== writer.getTextPos()) {
                        write(separator);
                    }
                    currentWriterPos = writer.getTextPos();
                    eachNodeEmitFn(node);
                }
            }
        }

        function emitCommaList(nodes: Node[], eachNodeEmitFn: (node: Node) => void, canEmitFn?: (node: Node) => boolean) {
            emitSeparatedList(nodes, ", ", eachNodeEmitFn, canEmitFn);
        }

        function writeJsDocComments(declaration: Node) {
            if (declaration) {
                let jsDocComments = getJsDocComments(declaration, currentSourceFile);
                emitNewLineBeforeLeadingComments(currentSourceFile, writer, declaration, jsDocComments);
                // jsDoc comments are emitted at /*leading comment1 */space/*leading comment*/space
                emitComments(currentSourceFile, writer, jsDocComments, /*trailingSeparator*/ true, newLine, writeCommentRange);
            }
        }

        function emitTypeWithNewGetSymbolAccessibilityDiagnostic(type: TypeNode | EntityName, getSymbolAccessibilityDiagnostic: GetSymbolAccessibilityDiagnostic) {
            writer.getSymbolAccessibilityDiagnostic = getSymbolAccessibilityDiagnostic;
            emitType(type);
        }

        function emitType(type: TypeNode | Identifier | QualifiedName) {
            switch (type.kind) {
                case SyntaxKind.AnyKeyword:
                case SyntaxKind.StringKeyword:
                case SyntaxKind.NumberKeyword:
                case SyntaxKind.BooleanKeyword:
                case SyntaxKind.SymbolKeyword:
                case SyntaxKind.VoidKeyword:
                case SyntaxKind.StringLiteral:
                    return writeTextOfNode(currentSourceFile, type);
                case SyntaxKind.ExpressionWithTypeArguments:
                    return emitExpressionWithTypeArguments(<ExpressionWithTypeArguments>type);
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
                case SyntaxKind.IntersectionType:
                    return emitIntersectionType(<IntersectionTypeNode>type);
                case SyntaxKind.ParenthesizedType:
                    return emitParenType(<ParenthesizedTypeNode>type);
                case SyntaxKind.FunctionType:
                case SyntaxKind.ConstructorType:
                    return emitSignatureDeclarationWithJsDocComments(<FunctionOrConstructorTypeNode>type);
                case SyntaxKind.TypeLiteral:
                    return emitTypeLiteral(<TypeLiteralNode>type);
                case SyntaxKind.Identifier:
                    return emitEntityName(<Identifier>type);
                case SyntaxKind.QualifiedName:
                    return emitEntityName(<QualifiedName>type);
                case SyntaxKind.TypePredicate:
                    return emitTypePredicate(<TypePredicateNode>type);
            }

            function writeEntityName(entityName: EntityName | Expression) {
                if (entityName.kind === SyntaxKind.Identifier) {
                    writeTextOfNode(currentSourceFile, entityName);
                }
                else {
                    let left = entityName.kind === SyntaxKind.QualifiedName ? (<QualifiedName>entityName).left : (<PropertyAccessExpression>entityName).expression;
                    let right = entityName.kind === SyntaxKind.QualifiedName ? (<QualifiedName>entityName).right : (<PropertyAccessExpression>entityName).name;
                    writeEntityName(left);
                    write(".");
                    writeTextOfNode(currentSourceFile, right);
                }
            }

            function emitEntityName(entityName: EntityName | PropertyAccessExpression) {
                let visibilityResult = resolver.isEntityNameVisible(entityName,
                    // Aliases can be written asynchronously so use correct enclosing declaration
                    entityName.parent.kind === SyntaxKind.ImportEqualsDeclaration ? entityName.parent : enclosingDeclaration);

                handleSymbolAccessibilityError(visibilityResult);
                writeEntityName(entityName);
            }

            function emitExpressionWithTypeArguments(node: ExpressionWithTypeArguments) {
                if (isSupportedExpressionWithTypeArguments(node)) {
                    Debug.assert(node.expression.kind === SyntaxKind.Identifier || node.expression.kind === SyntaxKind.PropertyAccessExpression);
                    emitEntityName(<Identifier | PropertyAccessExpression>node.expression);
                    if (node.typeArguments) {
                        write("<");
                        emitCommaList(node.typeArguments, emitType);
                        write(">");
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

            function emitTypePredicate(type: TypePredicateNode) {
                writeTextOfNode(currentSourceFile, type.parameterName);
                write(" is ");
                emitType(type.type);
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

            function emitIntersectionType(type: IntersectionTypeNode) {
                emitSeparatedList(type.types, " & ", emitType);
            }

            function emitParenType(type: ParenthesizedTypeNode) {
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

        // Return a temp variable name to be used in `export default` statements.
        // The temp name will be of the form _default_counter.
        // Note that export default is only allowed at most once in a module, so we
        // do not need to keep track of created temp names.
        function getExportDefaultTempVariableName(): string {
            let baseName = "_default";
            if (!hasProperty(currentSourceFile.identifiers, baseName)) {
                return baseName;
            }
            let count = 0;
            while (true) {
                let name = baseName + "_" + (++count);
                if (!hasProperty(currentSourceFile.identifiers, name)) {
                    return name;
                }
            }
        }

        function emitExportAssignment(node: ExportAssignment) {
            if (node.expression.kind === SyntaxKind.Identifier) {
                write(node.isExportEquals ? "export = " : "export default ");
                writeTextOfNode(currentSourceFile, node.expression);
            }
            else {
                // Expression
                let tempVarName = getExportDefaultTempVariableName();
                write("declare var ");
                write(tempVarName);
                write(": ");
                writer.getSymbolAccessibilityDiagnostic = getDefaultExportAccessibilityDiagnostic;
                resolver.writeTypeOfExpression(node.expression, enclosingDeclaration, TypeFormatFlags.UseTypeOfFunction, writer);
                write(";");
                writeLine();
                write(node.isExportEquals ? "export = " : "export default ");
                write(tempVarName);
            }
            write(";");
            writeLine();

            // Make all the declarations visible for the export name
            if (node.expression.kind === SyntaxKind.Identifier) {
                let nodes = resolver.collectLinkedAliases(<Identifier>node.expression);

                // write each of these declarations asynchronously
                writeAsynchronousModuleElements(nodes);
            }

            function getDefaultExportAccessibilityDiagnostic(diagnostic: SymbolAccessiblityResult): SymbolAccessibilityDiagnostic {
                return {
                    diagnosticMessage: Diagnostics.Default_export_of_the_module_has_or_is_using_private_name_0,
                    errorNode: node
                };
            }
        }

        function isModuleElementVisible(node: Declaration) {
            return resolver.isDeclarationVisible(node);
        }

        function emitModuleElement(node: Node, isModuleElementVisible: boolean) {
            if (isModuleElementVisible) {
                writeModuleElement(node);
            }
            // Import equals declaration in internal module can become visible as part of any emit so lets make sure we add these irrespective
            else if (node.kind === SyntaxKind.ImportEqualsDeclaration ||
                (node.parent.kind === SyntaxKind.SourceFile && isExternalModule(currentSourceFile))) {
                let isVisible: boolean;
                if (asynchronousSubModuleDeclarationEmitInfo && node.parent.kind !== SyntaxKind.SourceFile) {
                    // Import declaration of another module that is visited async so lets put it in right spot
                    asynchronousSubModuleDeclarationEmitInfo.push({
                        node,
                        outputPos: writer.getTextPos(),
                        indent: writer.getIndent(),
                        isVisible
                    });
                }
                else {
                    if (node.kind === SyntaxKind.ImportDeclaration) {
                        let importDeclaration = <ImportDeclaration>node;
                        if (importDeclaration.importClause) {
                            isVisible = (importDeclaration.importClause.name && resolver.isDeclarationVisible(importDeclaration.importClause)) ||
                            isVisibleNamedBinding(importDeclaration.importClause.namedBindings);
                        }
                    }
                    moduleElementDeclarationEmitInfo.push({
                        node,
                        outputPos: writer.getTextPos(),
                        indent: writer.getIndent(),
                        isVisible
                    });
                }
            }
        }

        function writeModuleElement(node: Node) {
            switch (node.kind) {
                case SyntaxKind.FunctionDeclaration:
                    return writeFunctionDeclaration(<FunctionLikeDeclaration>node);
                case SyntaxKind.VariableStatement:
                    return writeVariableStatement(<VariableStatement>node);
                case SyntaxKind.InterfaceDeclaration:
                    return writeInterfaceDeclaration(<InterfaceDeclaration>node);
                case SyntaxKind.ClassDeclaration:
                    return writeClassDeclaration(<ClassDeclaration>node);
                case SyntaxKind.TypeAliasDeclaration:
                    return writeTypeAliasDeclaration(<TypeAliasDeclaration>node);
                case SyntaxKind.EnumDeclaration:
                    return writeEnumDeclaration(<EnumDeclaration>node);
                case SyntaxKind.ModuleDeclaration:
                    return writeModuleDeclaration(<ModuleDeclaration>node);
                case SyntaxKind.ImportEqualsDeclaration:
                    return writeImportEqualsDeclaration(<ImportEqualsDeclaration>node);
                case SyntaxKind.ImportDeclaration:
                    return writeImportDeclaration(<ImportDeclaration>node);
                default:
                    Debug.fail("Unknown symbol kind");
            }
        }

        function emitModuleElementDeclarationFlags(node: Node) {
            // If the node is parented in the current source file we need to emit export declare or just export
            if (node.parent === currentSourceFile) {
                // If the node is exported
                if (node.flags & NodeFlags.Export) {
                    write("export ");
                }

                if (node.flags & NodeFlags.Default) {
                    write("default ");
                }
                else if (node.kind !== SyntaxKind.InterfaceDeclaration) {
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
            if (node.flags & NodeFlags.Abstract) {
                write("abstract ");
            }
        }

        function writeImportEqualsDeclaration(node: ImportEqualsDeclaration) {
            // note usage of writer. methods instead of aliases created, just to make sure we are using
            // correct writer especially to handle asynchronous alias writing
            emitJsDocComments(node);
            if (node.flags & NodeFlags.Export) {
                write("export ");
            }
            write("import ");
            writeTextOfNode(currentSourceFile, node.name);
            write(" = ");
            if (isInternalModuleImportEqualsDeclaration(node)) {
                emitTypeWithNewGetSymbolAccessibilityDiagnostic(<EntityName>node.moduleReference, getImportEntityNameVisibilityError);
                write(";");
            }
            else {
                write("require(");
                writeTextOfNode(currentSourceFile, getExternalModuleImportEqualsDeclarationExpression(node));
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

        function isVisibleNamedBinding(namedBindings: NamespaceImport | NamedImports): boolean {
            if (namedBindings) {
                if (namedBindings.kind === SyntaxKind.NamespaceImport) {
                    return resolver.isDeclarationVisible(<NamespaceImport>namedBindings);
                }
                else {
                    return forEach((<NamedImports>namedBindings).elements, namedImport => resolver.isDeclarationVisible(namedImport));
                }
            }
        }

        function writeImportDeclaration(node: ImportDeclaration) {
            if (!node.importClause && !(node.flags & NodeFlags.Export)) {
                // do not write non-exported import declarations that don't have import clauses
                return;
            }
            emitJsDocComments(node);
            if (node.flags & NodeFlags.Export) {
                write("export ");
            }
            write("import ");
            if (node.importClause) {
                let currentWriterPos = writer.getTextPos();
                if (node.importClause.name && resolver.isDeclarationVisible(node.importClause)) {
                    writeTextOfNode(currentSourceFile, node.importClause.name);
                }
                if (node.importClause.namedBindings && isVisibleNamedBinding(node.importClause.namedBindings)) {
                    if (currentWriterPos !== writer.getTextPos()) {
                        // If the default binding was emitted, write the separated
                        write(", ");
                    }
                    if (node.importClause.namedBindings.kind === SyntaxKind.NamespaceImport) {
                        write("* as ");
                        writeTextOfNode(currentSourceFile, (<NamespaceImport>node.importClause.namedBindings).name);
                    }
                    else {
                        write("{ ");
                        emitCommaList((<NamedImports>node.importClause.namedBindings).elements, emitImportOrExportSpecifier, resolver.isDeclarationVisible);
                        write(" }");
                    }
                }
                write(" from ");
            }
            writeTextOfNode(currentSourceFile, node.moduleSpecifier);
            write(";");
            writer.writeLine();
        }

        function emitImportOrExportSpecifier(node: ImportOrExportSpecifier) {
            if (node.propertyName) {
                writeTextOfNode(currentSourceFile, node.propertyName);
                write(" as ");
            }
            writeTextOfNode(currentSourceFile, node.name);
        }

        function emitExportSpecifier(node: ExportSpecifier) {
            emitImportOrExportSpecifier(node);

            // Make all the declarations visible for the export name
            let nodes = resolver.collectLinkedAliases(node.propertyName || node.name);

            // write each of these declarations asynchronously
            writeAsynchronousModuleElements(nodes);
        }

        function emitExportDeclaration(node: ExportDeclaration) {
            emitJsDocComments(node);
            write("export ");
            if (node.exportClause) {
                write("{ ");
                emitCommaList(node.exportClause.elements, emitExportSpecifier);
                write(" }");
            }
            else {
                write("*");
            }
            if (node.moduleSpecifier) {
                write(" from ");
                writeTextOfNode(currentSourceFile, node.moduleSpecifier);
            }
            write(";");
            writer.writeLine();
        }

        function writeModuleDeclaration(node: ModuleDeclaration) {
            emitJsDocComments(node);
            emitModuleElementDeclarationFlags(node);
            if (node.flags & NodeFlags.Namespace) {
                write("namespace ");
            }
            else {
                write("module ");
            }
            writeTextOfNode(currentSourceFile, node.name);
            while (node.body.kind !== SyntaxKind.ModuleBlock) {
                node = <ModuleDeclaration>node.body;
                write(".");
                writeTextOfNode(currentSourceFile, node.name);
            }
            let prevEnclosingDeclaration = enclosingDeclaration;
            enclosingDeclaration = node;
            write(" {");
            writeLine();
            increaseIndent();
            emitLines((<ModuleBlock>node.body).statements);
            decreaseIndent();
            write("}");
            writeLine();
            enclosingDeclaration = prevEnclosingDeclaration;
        }

        function writeTypeAliasDeclaration(node: TypeAliasDeclaration) {
            let prevEnclosingDeclaration = enclosingDeclaration;
            enclosingDeclaration = node;
            emitJsDocComments(node);
            emitModuleElementDeclarationFlags(node);
            write("type ");
            writeTextOfNode(currentSourceFile, node.name);
            emitTypeParameters(node.typeParameters);
            write(" = ");
            emitTypeWithNewGetSymbolAccessibilityDiagnostic(node.type, getTypeAliasDeclarationVisibilityError);
            write(";");
            writeLine();
            enclosingDeclaration = prevEnclosingDeclaration;

            function getTypeAliasDeclarationVisibilityError(symbolAccesibilityResult: SymbolAccessiblityResult): SymbolAccessibilityDiagnostic {
                return {
                    diagnosticMessage: Diagnostics.Exported_type_alias_0_has_or_is_using_private_name_1,
                    errorNode: node.type,
                    typeName: node.name
                };
            }
        }

        function writeEnumDeclaration(node: EnumDeclaration) {
            emitJsDocComments(node);
            emitModuleElementDeclarationFlags(node);
            if (isConst(node)) {
                write("const ");
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

        function emitEnumMemberDeclaration(node: EnumMember) {
            emitJsDocComments(node);
            writeTextOfNode(currentSourceFile, node.name);
            let enumMemberValue = resolver.getConstantValue(node);
            if (enumMemberValue !== undefined) {
                write(" = ");
                write(enumMemberValue.toString());
            }
            write(",");
            writeLine();
        }

        function isPrivateMethodTypeParameter(node: TypeParameterDeclaration) {
            return node.parent.kind === SyntaxKind.MethodDeclaration && (node.parent.flags & NodeFlags.Private);
        }

        function emitTypeParameters(typeParameters: TypeParameterDeclaration[]) {
            function emitTypeParameter(node: TypeParameterDeclaration) {
                increaseIndent();
                emitJsDocComments(node);
                decreaseIndent();
                writeTextOfNode(currentSourceFile, node.name);
                // If there is constraint present and this is not a type parameter of the private method emit the constraint
                if (node.constraint && !isPrivateMethodTypeParameter(node)) {
                    write(" extends ");
                    if (node.parent.kind === SyntaxKind.FunctionType ||
                        node.parent.kind === SyntaxKind.ConstructorType ||
                        (node.parent.parent && node.parent.parent.kind === SyntaxKind.TypeLiteral)) {
                        Debug.assert(node.parent.kind === SyntaxKind.MethodDeclaration ||
                            node.parent.kind === SyntaxKind.MethodSignature ||
                            node.parent.kind === SyntaxKind.FunctionType ||
                            node.parent.kind === SyntaxKind.ConstructorType ||
                            node.parent.kind === SyntaxKind.CallSignature ||
                            node.parent.kind === SyntaxKind.ConstructSignature);
                        emitType(node.constraint);
                    }
                    else {
                        emitTypeWithNewGetSymbolAccessibilityDiagnostic(node.constraint, getTypeParameterConstraintVisibilityError);
                    }
                }

                function getTypeParameterConstraintVisibilityError(symbolAccesibilityResult: SymbolAccessiblityResult): SymbolAccessibilityDiagnostic {
                    // Type parameter constraints are named by user so we should always be able to name it
                    let diagnosticMessage: DiagnosticMessage;
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

                        case SyntaxKind.MethodDeclaration:
                        case SyntaxKind.MethodSignature:
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

        function emitHeritageClause(typeReferences: ExpressionWithTypeArguments[], isImplementsList: boolean) {
            if (typeReferences) {
                write(isImplementsList ? " implements " : " extends ");
                emitCommaList(typeReferences, emitTypeOfTypeReference);
            }

            function emitTypeOfTypeReference(node: ExpressionWithTypeArguments) {
                if (isSupportedExpressionWithTypeArguments(node)) {
                    emitTypeWithNewGetSymbolAccessibilityDiagnostic(node, getHeritageClauseVisibilityError);
                }
                else if (!isImplementsList && node.expression.kind === SyntaxKind.NullKeyword) {
                    write("null");
                }

                function getHeritageClauseVisibilityError(symbolAccesibilityResult: SymbolAccessiblityResult): SymbolAccessibilityDiagnostic {
                    let diagnosticMessage: DiagnosticMessage;
                    // Heritage clause is written by user so it can always be named
                    if (node.parent.parent.kind === SyntaxKind.ClassDeclaration) {
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
                        typeName: (<Declaration>node.parent.parent).name
                    };
                }
            }
        }

        function writeClassDeclaration(node: ClassDeclaration) {
            function emitParameterProperties(constructorDeclaration: ConstructorDeclaration) {
                if (constructorDeclaration) {
                    forEach(constructorDeclaration.parameters, param => {
                        if (param.flags & NodeFlags.AccessibilityModifier) {
                            emitPropertyDeclaration(param);
                        }
                    });
                }
            }

            emitJsDocComments(node);
            emitModuleElementDeclarationFlags(node);
            if (node.flags & NodeFlags.Abstract) {
                write("abstract ");
            }

            write("class ");
            writeTextOfNode(currentSourceFile, node.name);
            let prevEnclosingDeclaration = enclosingDeclaration;
            enclosingDeclaration = node;
            emitTypeParameters(node.typeParameters);
            let baseTypeNode = getClassExtendsHeritageClauseElement(node);
            if (baseTypeNode) {
                emitHeritageClause([baseTypeNode], /*isImplementsList*/ false);
            }
            emitHeritageClause(getClassImplementsHeritageClauseElements(node), /*isImplementsList*/ true);
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

        function writeInterfaceDeclaration(node: InterfaceDeclaration) {
            emitJsDocComments(node);
            emitModuleElementDeclarationFlags(node);
            write("interface ");
            writeTextOfNode(currentSourceFile, node.name);
            let prevEnclosingDeclaration = enclosingDeclaration;
            enclosingDeclaration = node;
            emitTypeParameters(node.typeParameters);
            emitHeritageClause(getInterfaceBaseTypeNodes(node), /*isImplementsList*/ false);
            write(" {");
            writeLine();
            increaseIndent();
            emitLines(node.members);
            decreaseIndent();
            write("}");
            writeLine();
            enclosingDeclaration = prevEnclosingDeclaration;
        }

        function emitPropertyDeclaration(node: Declaration) {
            if (hasDynamicName(node)) {
                return;
            }

            emitJsDocComments(node);
            emitClassMemberDeclarationFlags(node);
            emitVariableDeclaration(<VariableDeclaration>node);
            write(";");
            writeLine();
        }

        function emitVariableDeclaration(node: VariableDeclaration) {
            // If we are emitting property it isn't moduleElement and hence we already know it needs to be emitted
            // so there is no check needed to see if declaration is visible
            if (node.kind !== SyntaxKind.VariableDeclaration || resolver.isDeclarationVisible(node)) {
                if (isBindingPattern(node.name)) {
                    emitBindingPattern(<BindingPattern>node.name);
                }
                else {
                    // If this node is a computed name, it can only be a symbol, because we've already skipped
                    // it if it's not a well known symbol. In that case, the text of the name will be exactly
                    // what we want, namely the name expression enclosed in brackets.
                    writeTextOfNode(currentSourceFile, node.name);
                    // If optional property emit ?
                    if ((node.kind === SyntaxKind.PropertyDeclaration || node.kind === SyntaxKind.PropertySignature) && hasQuestionToken(node)) {
                        write("?");
                    }
                    if ((node.kind === SyntaxKind.PropertyDeclaration || node.kind === SyntaxKind.PropertySignature) && node.parent.kind === SyntaxKind.TypeLiteral) {
                        emitTypeOfVariableDeclarationFromTypeLiteral(node);
                    }
                    else if (!(node.flags & NodeFlags.Private)) {
                        writeTypeOfDeclaration(node, node.type, getVariableDeclarationTypeVisibilityError);
                    }
                }
            }

            function getVariableDeclarationTypeVisibilityDiagnosticMessage(symbolAccesibilityResult: SymbolAccessiblityResult) {
                if (node.kind === SyntaxKind.VariableDeclaration) {
                    return symbolAccesibilityResult.errorModuleName ?
                        symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                            Diagnostics.Exported_variable_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                            Diagnostics.Exported_variable_0_has_or_is_using_name_1_from_private_module_2 :
                        Diagnostics.Exported_variable_0_has_or_is_using_private_name_1;
                }
                // This check is to ensure we don't report error on constructor parameter property as that error would be reported during parameter emit
                else if (node.kind === SyntaxKind.PropertyDeclaration || node.kind === SyntaxKind.PropertySignature) {
                    // TODO(jfreeman): Deal with computed properties in error reporting.
                    if (node.flags & NodeFlags.Static) {
                        return symbolAccesibilityResult.errorModuleName ?
                            symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                                Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                                Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_private_name_1;
                    }
                    else if (node.parent.kind === SyntaxKind.ClassDeclaration) {
                        return symbolAccesibilityResult.errorModuleName ?
                            symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                                Diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                                Diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Public_property_0_of_exported_class_has_or_is_using_private_name_1;
                    }
                    else {
                        // Interfaces cannot have types that cannot be named
                        return symbolAccesibilityResult.errorModuleName ?
                            Diagnostics.Property_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Property_0_of_exported_interface_has_or_is_using_private_name_1;
                    }
                }
            }

            function getVariableDeclarationTypeVisibilityError(symbolAccesibilityResult: SymbolAccessiblityResult): SymbolAccessibilityDiagnostic {
                let diagnosticMessage = getVariableDeclarationTypeVisibilityDiagnosticMessage(symbolAccesibilityResult);
                return diagnosticMessage !== undefined ? {
                    diagnosticMessage,
                    errorNode: node,
                    typeName: node.name
                } : undefined;
            }

            function emitBindingPattern(bindingPattern: BindingPattern) {
                // Only select non-omitted expression from the bindingPattern's elements.
                // We have to do this to avoid emitting trailing commas.
                // For example:
                //      original: var [, c,,] = [ 2,3,4]
                //      emitted: declare var c: number; // instead of declare var c:number, ;
                let elements: Node[] = [];
                for (let element of bindingPattern.elements) {
                    if (element.kind !== SyntaxKind.OmittedExpression){
                        elements.push(element);
                    }
                }
                emitCommaList(elements, emitBindingElement);
            }

            function emitBindingElement(bindingElement: BindingElement) {
                function getBindingElementTypeVisibilityError(symbolAccesibilityResult: SymbolAccessiblityResult): SymbolAccessibilityDiagnostic {
                    let diagnosticMessage = getVariableDeclarationTypeVisibilityDiagnosticMessage(symbolAccesibilityResult);
                    return diagnosticMessage !== undefined ? {
                        diagnosticMessage,
                        errorNode: bindingElement,
                        typeName: bindingElement.name
                    } : undefined;
                }

                if (bindingElement.name) {
                    if (isBindingPattern(bindingElement.name)) {
                        emitBindingPattern(<BindingPattern>bindingElement.name);
                    }
                    else {
                        writeTextOfNode(currentSourceFile, bindingElement.name);
                        writeTypeOfDeclaration(bindingElement, /*type*/ undefined, getBindingElementTypeVisibilityError);
                    }
                }
            }
        }

        function emitTypeOfVariableDeclarationFromTypeLiteral(node: VariableLikeDeclaration) {
            // if this is property of type literal,
            // or is parameter of method/call/construct/index signature of type literal
            // emit only if type is specified
            if (node.type) {
                write(": ");
                emitType(node.type);
            }
        }

        function isVariableStatementVisible(node: VariableStatement) {
            return forEach(node.declarationList.declarations, varDeclaration => resolver.isDeclarationVisible(varDeclaration));
        }

        function writeVariableStatement(node: VariableStatement) {
            emitJsDocComments(node);
            emitModuleElementDeclarationFlags(node);
            if (isLet(node.declarationList)) {
                write("let ");
            }
            else if (isConst(node.declarationList)) {
                write("const ");
            }
            else {
                write("var ");
            }
            emitCommaList(node.declarationList.declarations, emitVariableDeclaration, resolver.isDeclarationVisible);
            write(";");
            writeLine();
        }

        function emitAccessorDeclaration(node: AccessorDeclaration) {
            if (hasDynamicName(node)) {
                return;
            }

            let accessors = getAllAccessorDeclarations((<ClassDeclaration>node.parent).members, node);
            let accessorWithTypeAnnotation: AccessorDeclaration;

            if (node === accessors.firstAccessor) {
                emitJsDocComments(accessors.getAccessor);
                emitJsDocComments(accessors.setAccessor);
                emitClassMemberDeclarationFlags(node);
                writeTextOfNode(currentSourceFile, node.name);
                if (!(node.flags & NodeFlags.Private)) {
                    accessorWithTypeAnnotation = node;
                    let type = getTypeAnnotationFromAccessor(node);
                    if (!type) {
                        // couldn't get type for the first accessor, try the another one
                        let anotherAccessor = node.kind === SyntaxKind.GetAccessor ? accessors.setAccessor : accessors.getAccessor;
                        type = getTypeAnnotationFromAccessor(anotherAccessor);
                        if (type) {
                            accessorWithTypeAnnotation = anotherAccessor;
                        }
                    }
                    writeTypeOfDeclaration(node, type, getAccessorDeclarationTypeVisibilityError);
                }
                write(";");
                writeLine();
            }

            function getTypeAnnotationFromAccessor(accessor: AccessorDeclaration): TypeNode {
                if (accessor) {
                    return accessor.kind === SyntaxKind.GetAccessor
                        ? accessor.type // Getter - return type
                        : accessor.parameters.length > 0
                            ? accessor.parameters[0].type // Setter parameter type
                            : undefined;
                }
            }

            function getAccessorDeclarationTypeVisibilityError(symbolAccesibilityResult: SymbolAccessiblityResult): SymbolAccessibilityDiagnostic {
                let diagnosticMessage: DiagnosticMessage;
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

        function writeFunctionDeclaration(node: FunctionLikeDeclaration) {
            if (hasDynamicName(node)) {
                return;
            }

            // If we are emitting Method/Constructor it isn't moduleElement and hence already determined to be emitting
            // so no need to verify if the declaration is visible
            if (!resolver.isImplementationOfOverload(node)) {
                emitJsDocComments(node);
                if (node.kind === SyntaxKind.FunctionDeclaration) {
                    emitModuleElementDeclarationFlags(node);
                }
                else if (node.kind === SyntaxKind.MethodDeclaration) {
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
                    if (hasQuestionToken(node)) {
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

            let prevEnclosingDeclaration = enclosingDeclaration;
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
            let isFunctionTypeOrConstructorType = node.kind === SyntaxKind.FunctionType || node.kind === SyntaxKind.ConstructorType;
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
                let diagnosticMessage: DiagnosticMessage;
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

                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.MethodSignature:
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
                    errorNode: <Node>node.name || node
                };
            }
        }

        function emitParameterDeclaration(node: ParameterDeclaration) {
            increaseIndent();
            emitJsDocComments(node);
            if (node.dotDotDotToken) {
                write("...");
            }
            if (isBindingPattern(node.name)) {
                // For bindingPattern, we can't simply writeTextOfNode from the source file
                // because we want to omit the initializer and using writeTextOfNode will result in initializer get emitted.
                // Therefore, we will have to recursively emit each element in the bindingPattern.
                emitBindingPattern(<BindingPattern>node.name);
            }
            else {
                writeTextOfNode(currentSourceFile, node.name);
            }
            if (resolver.isOptionalParameter(node)) {
                write("?");
            }
            decreaseIndent();

            if (node.parent.kind === SyntaxKind.FunctionType ||
                node.parent.kind === SyntaxKind.ConstructorType ||
                node.parent.parent.kind === SyntaxKind.TypeLiteral) {
                emitTypeOfVariableDeclarationFromTypeLiteral(node);
            }
            else if (!(node.parent.flags & NodeFlags.Private)) {
                writeTypeOfDeclaration(node, node.type, getParameterDeclarationTypeVisibilityError);
            }

            function getParameterDeclarationTypeVisibilityError(symbolAccesibilityResult: SymbolAccessiblityResult): SymbolAccessibilityDiagnostic {
                let diagnosticMessage: DiagnosticMessage = getParameterDeclarationTypeVisibilityDiagnosticMessage(symbolAccesibilityResult);
                return diagnosticMessage !== undefined ? {
                    diagnosticMessage,
                    errorNode: node,
                    typeName: node.name
                } : undefined;
            }

            function getParameterDeclarationTypeVisibilityDiagnosticMessage(symbolAccesibilityResult: SymbolAccessiblityResult): DiagnosticMessage {
                switch (node.parent.kind) {
                    case SyntaxKind.Constructor:
                        return symbolAccesibilityResult.errorModuleName ?
                            symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                                Diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                                Diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_private_name_1;

                    case SyntaxKind.ConstructSignature:
                        // Interfaces cannot have parameter types that cannot be named
                        return symbolAccesibilityResult.errorModuleName ?
                            Diagnostics.Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1;

                    case SyntaxKind.CallSignature:
                        // Interfaces cannot have parameter types that cannot be named
                        return symbolAccesibilityResult.errorModuleName ?
                            Diagnostics.Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1;

                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.MethodSignature:
                        if (node.parent.flags & NodeFlags.Static) {
                            return symbolAccesibilityResult.errorModuleName ?
                                symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                                    Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                                    Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_private_module_2 :
                                Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1;
                        }
                        else if (node.parent.parent.kind === SyntaxKind.ClassDeclaration) {
                             return symbolAccesibilityResult.errorModuleName ?
                                symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                                    Diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                                    Diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_private_module_2 :
                                Diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1;
                        }
                        else {
                            // Interfaces cannot have parameter types that cannot be named
                            return symbolAccesibilityResult.errorModuleName ?
                                Diagnostics.Parameter_0_of_method_from_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                                Diagnostics.Parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1;
                        }

                    case SyntaxKind.FunctionDeclaration:
                        return symbolAccesibilityResult.errorModuleName ?
                            symbolAccesibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                                Diagnostics.Parameter_0_of_exported_function_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                                Diagnostics.Parameter_0_of_exported_function_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Parameter_0_of_exported_function_has_or_is_using_private_name_1;

                    default:
                        Debug.fail("This is unknown parent for parameter: " + node.parent.kind);
                }
            }

            function emitBindingPattern(bindingPattern: BindingPattern) {
                // We have to explicitly emit square bracket and bracket because these tokens are not store inside the node.
                if (bindingPattern.kind === SyntaxKind.ObjectBindingPattern) {
                    write("{");
                    emitCommaList(bindingPattern.elements, emitBindingElement);
                    write("}");
                }
                else if (bindingPattern.kind === SyntaxKind.ArrayBindingPattern) {
                    write("[");
                    let elements = bindingPattern.elements;
                    emitCommaList(elements, emitBindingElement);
                    if (elements && elements.hasTrailingComma) {
                        write(", ");
                    }
                    write("]");
                }
            }

            function emitBindingElement(bindingElement: BindingElement) {
                function getBindingElementTypeVisibilityError(symbolAccesibilityResult: SymbolAccessiblityResult): SymbolAccessibilityDiagnostic {
                    let diagnosticMessage = getParameterDeclarationTypeVisibilityDiagnosticMessage(symbolAccesibilityResult);
                    return diagnosticMessage !== undefined ? {
                        diagnosticMessage,
                        errorNode: bindingElement,
                        typeName: bindingElement.name
                    } : undefined;
                }

                if (bindingElement.kind === SyntaxKind.OmittedExpression) {
                    // If bindingElement is an omittedExpression (i.e. containing elision),
                    // we will emit blank space (although this may differ from users' original code,
                    // it allows emitSeparatedList to write separator appropriately)
                    // Example:
                    //      original: function foo([, x, ,]) {}
                    //      emit    : function foo([ , x,  , ]) {}
                    write(" ");
                }
                else if (bindingElement.kind === SyntaxKind.BindingElement) {
                    if (bindingElement.propertyName) {
                        // bindingElement has propertyName property in the following case:
                        //      { y: [a,b,c] ...} -> bindingPattern will have a property called propertyName for "y"
                        // We have to explicitly emit the propertyName before descending into its binding elements.
                        // Example:
                        //      original: function foo({y: [a,b,c]}) {}
                        //      emit    : declare function foo({y: [a, b, c]}: { y: [any, any, any] }) void;
                        writeTextOfNode(currentSourceFile, bindingElement.propertyName);
                        write(": ");
                    }
                    if (bindingElement.name) {
                        if (isBindingPattern(bindingElement.name)) {
                            // If it is a nested binding pattern, we will recursively descend into each element and emit each one separately.
                            // In the case of rest element, we will omit rest element.
                            // Example:
                            //      original: function foo([a, [[b]], c] = [1,[["string"]], 3]) {}
                            //      emit    : declare function foo([a, [[b]], c]: [number, [[string]], number]): void;
                            //      original with rest: function foo([a, ...c]) {}
                            //      emit              : declare function foo([a, ...c]): void;
                            emitBindingPattern(<BindingPattern>bindingElement.name);
                        }
                        else {
                            Debug.assert(bindingElement.name.kind === SyntaxKind.Identifier);
                            // If the node is just an identifier, we will simply emit the text associated with the node's name
                            // Example:
                            //      original: function foo({y = 10, x}) {}
                            //      emit    : declare function foo({y, x}: {number, any}): void;
                            if (bindingElement.dotDotDotToken) {
                                write("...");
                            }
                            writeTextOfNode(currentSourceFile, bindingElement.name);
                        }
                    }
                }
            }
        }

        function emitNode(node: Node) {
            switch (node.kind) {
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.ImportEqualsDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.TypeAliasDeclaration:
                case SyntaxKind.EnumDeclaration:
                    return emitModuleElement(node, isModuleElementVisible(<Declaration>node));
                case SyntaxKind.VariableStatement:
                    return emitModuleElement(node, isVariableStatementVisible(<VariableStatement>node));
                case SyntaxKind.ImportDeclaration:
                    // Import declaration without import clause is visible, otherwise it is not visible
                    return emitModuleElement(node, /*isModuleElementVisible*/!(<ImportDeclaration>node).importClause);
                case SyntaxKind.ExportDeclaration:
                    return emitExportDeclaration(<ExportDeclaration>node);
                case SyntaxKind.Constructor:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                    return writeFunctionDeclaration(<FunctionLikeDeclaration>node);
                case SyntaxKind.ConstructSignature:
                case SyntaxKind.CallSignature:
                case SyntaxKind.IndexSignature:
                    return emitSignatureDeclarationWithJsDocComments(<SignatureDeclaration>node);
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    return emitAccessorDeclaration(<AccessorDeclaration>node);
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                    return emitPropertyDeclaration(<PropertyDeclaration>node);
                case SyntaxKind.EnumMember:
                    return emitEnumMemberDeclaration(<EnumMember>node);
                case SyntaxKind.ExportAssignment:
                    return emitExportAssignment(<ExportAssignment>node);
                case SyntaxKind.SourceFile:
                    return emitSourceFile(<SourceFile>node);
            }
        }

        function writeReferencePath(referencedFile: SourceFile) {
            let declFileName = referencedFile.flags & NodeFlags.DeclarationFile
                ? referencedFile.fileName // Declaration file, use declaration file name
                : shouldEmitToOwnFile(referencedFile, compilerOptions)
                    ? getOwnEmitOutputFilePath(referencedFile, host, ".d.ts") // Own output file so get the .d.ts file
                    : removeFileExtension(compilerOptions.outFile || compilerOptions.out) + ".d.ts"; // Global out file

            declFileName = getRelativePathToDirectoryOrUrl(
                getDirectoryPath(normalizeSlashes(jsFilePath)),
                declFileName,
                host.getCurrentDirectory(),
                host.getCanonicalFileName,
            /*isAbsolutePathAnUrl*/ false);

            referencePathsOutput += "/// <reference path=\"" + declFileName + "\" />" + newLine;
        }
    }

    /* @internal */
    export function writeDeclarationFile(jsFilePath: string, sourceFile: SourceFile, host: EmitHost, resolver: EmitResolver, diagnostics: Diagnostic[]) {
        let emitDeclarationResult = emitDeclarations(host, resolver, diagnostics, jsFilePath, sourceFile);
        // TODO(shkamat): Should we not write any declaration file if any of them can produce error,
        // or should we just not write this file like we are doing now
        if (!emitDeclarationResult.reportedDeclarationError) {
            let declarationOutput = emitDeclarationResult.referencePathsOutput
                + getDeclarationOutput(emitDeclarationResult.synchronousDeclarationOutput, emitDeclarationResult.moduleElementDeclarationEmitInfo);
            writeFile(host, diagnostics, removeFileExtension(jsFilePath) + ".d.ts", declarationOutput, host.getCompilerOptions().emitBOM);
        }

        function getDeclarationOutput(synchronousDeclarationOutput: string, moduleElementDeclarationEmitInfo: ModuleElementDeclarationEmitInfo[]) {
            let appliedSyncOutputPos = 0;
            let declarationOutput = "";
            // apply asynchronous additions to the synchronous output
            forEach(moduleElementDeclarationEmitInfo, aliasEmitInfo => {
                if (aliasEmitInfo.asynchronousOutput) {
                    declarationOutput += synchronousDeclarationOutput.substring(appliedSyncOutputPos, aliasEmitInfo.outputPos);
                    declarationOutput += getDeclarationOutput(aliasEmitInfo.asynchronousOutput, aliasEmitInfo.subModuleElementDeclarationEmitInfo);
                    appliedSyncOutputPos = aliasEmitInfo.outputPos;
                }
            });
            declarationOutput += synchronousDeclarationOutput.substring(appliedSyncOutputPos);
            return declarationOutput;
        }
    }
}
