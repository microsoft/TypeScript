/// <reference path="checker.ts"/>

module ts {
    interface EmitTextWriterWithSymbolWriter extends EmitTextWriter, SymbolWriter {
        getSymbolAccessibilityDiagnostic: GetSymbolAccessibilityDiagnostic;
    }

    interface SymbolAccessibilityDiagnostic {
        errorNode: Node;
        diagnosticMessage: DiagnosticMessage;
        typeName?: DeclarationName;
    }

    type GetSymbolAccessibilityDiagnostic = (symbolAccesibilityResult: SymbolAccessiblityResult) => SymbolAccessibilityDiagnostic;

    interface AliasDeclarationEmitInfo {
        declaration: ImportEqualsDeclaration;
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

    export function getDeclarationDiagnostics(host: EmitHost, resolver: EmitResolver, targetSourceFile: SourceFile): Diagnostic[] {
        var diagnostics: Diagnostic[] = [];
        var jsFilePath = getOwnEmitOutputFilePath(targetSourceFile, host, ".js");
        emitDeclarations(host, resolver, diagnostics, jsFilePath, targetSourceFile);
        return diagnostics;
    }

    function emitDeclarations(host: EmitHost, resolver: EmitResolver, diagnostics: Diagnostic[], jsFilePath: string, root?: SourceFile): DeclarationEmit {
        var newLine = host.getNewLine();
        var compilerOptions = host.getCompilerOptions();
        var languageVersion = compilerOptions.target || ScriptTarget.ES3;

        var write: (s: string) => void;
        var writeLine: () => void;
        var increaseIndent: () => void;
        var decreaseIndent: () => void;
        var writeTextOfNode: (sourceFile: SourceFile, node: Node) => void;

        var writer = createAndSetNewTextWriterWithSymbolWriter();

        var enclosingDeclaration: Node;
        var currentSourceFile: SourceFile;
        var reportedDeclarationError = false;
        var emitJsDocComments = compilerOptions.removeComments ? function (declaration: Node) { } : writeJsDocComments;
        var emit = compilerOptions.stripInternal ? stripInternal : emitNode;

        var aliasDeclarationEmitInfo: AliasDeclarationEmitInfo[] = [];

        // Contains the reference paths that needs to go in the declaration file.
        // Collecting this separately because reference paths need to be first thing in the declaration file
        // and we could be collecting these paths from multiple files into single one with --out option
        var referencePathsOutput = "";

        if (root) {
            // Emitting just a single file, so emit references in this file only
            if (!compilerOptions.noResolve) {
                var addedGlobalFileReference = false;
                forEach(root.referencedFiles, fileReference => {
                    var referencedFile = tryResolveScriptReference(host, root, fileReference);

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
        }
        else {
            // Emit references corresponding to this file
            var emittedReferencedFiles: SourceFile[] = [];
            forEach(host.getSourceFiles(), sourceFile => {
                if (!isExternalModuleOrDeclarationFile(sourceFile)) {
                    // Check what references need to be added
                    if (!compilerOptions.noResolve) {
                        forEach(sourceFile.referencedFiles, fileReference => {
                            var referencedFile = tryResolveScriptReference(host, sourceFile, fileReference);

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
            aliasDeclarationEmitInfo,
            synchronousDeclarationOutput: writer.getText(),
            referencePathsOutput,
        }

        function hasInternalAnnotation(range: CommentRange) {
            var text = currentSourceFile.text;
            var comment = text.substring(range.pos, range.end);
            return comment.indexOf("@internal") >= 0;
        }

        function stripInternal(node: Node) {
            if (node) {
                var leadingCommentRanges = getLeadingCommentRanges(currentSourceFile.text, node.pos);
                if (forEach(leadingCommentRanges, hasInternalAnnotation)) {
                    return;
                }

                emitNode(node);
            }
        }

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

        function writeAsychronousImportEqualsDeclarations(importEqualsDeclarations: ImportEqualsDeclaration[]) {
            var oldWriter = writer;
            forEach(importEqualsDeclarations, aliasToWrite => {
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
                    writeImportEqualsDeclaration(aliasToWrite);
                    aliasEmitInfo.asynchronousOutput = writer.getText();
                }
            });
            setWriter(oldWriter);
        }

        function handleSymbolAccessibilityError(symbolAccesibilityResult: SymbolAccessiblityResult) {
            if (symbolAccesibilityResult.accessibility === SymbolAccessibility.Accessible) {
                // write the aliases
                if (symbolAccesibilityResult && symbolAccesibilityResult.aliasesToMakeVisible) {
                    writeAsychronousImportEqualsDeclarations(symbolAccesibilityResult.aliasesToMakeVisible);
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

        function writeTypeOfDeclaration(declaration: AccessorDeclaration | VariableLikeDeclaration, type: TypeNode | StringLiteralExpression, getSymbolAccessibilityDiagnostic: GetSymbolAccessibilityDiagnostic) {
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
            for (var i = 0, n = nodes.length; i < n; i++) {
                emit(nodes[i]);
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

        function writeJsDocComments(declaration: Node) {
            if (declaration) {
                var jsDocComments = getJsDocComments(declaration, currentSourceFile);
                emitNewLineBeforeLeadingComments(currentSourceFile, writer, declaration, jsDocComments);
                // jsDoc comments are emitted at /*leading comment1 */space/*leading comment*/space
                emitComments(currentSourceFile, writer, jsDocComments, /*trailingSeparator*/ true, newLine, writeCommentRange);
            }
        }

        function emitTypeWithNewGetSymbolAccessibilityDiagnostic(type: TypeNode | EntityName, getSymbolAccessibilityDiagnostic: GetSymbolAccessibilityDiagnostic) {
            writer.getSymbolAccessibilityDiagnostic = getSymbolAccessibilityDiagnostic;
            emitType(type);
        }

        function emitType(type: TypeNode | StringLiteralExpression | Identifier | QualifiedName) {
            switch (type.kind) {
                case SyntaxKind.AnyKeyword:
                case SyntaxKind.StringKeyword:
                case SyntaxKind.NumberKeyword:
                case SyntaxKind.BooleanKeyword:
                case SyntaxKind.SymbolKeyword:
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
                default:
                    Debug.fail("Unknown type annotation: " + type.kind);
            }

            function emitEntityName(entityName: EntityName) {
                var visibilityResult = resolver.isEntityNameVisible(entityName,
                    // Aliases can be written asynchronously so use correct enclosing declaration
                    entityName.parent.kind === SyntaxKind.ImportEqualsDeclaration ? entityName.parent : enclosingDeclaration);

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

        function emitExportAssignment(node: ExportAssignment) {
            write(node.isExportEquals ? "export = " : "export default ");
            writeTextOfNode(currentSourceFile, node.expression);
            write(";");
            writeLine();
        }

        function emitModuleElementDeclarationFlags(node: Node) {
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

        function emitImportEqualsDeclaration(node: ImportEqualsDeclaration) {
            var nodeEmitInfo = {
                declaration: node,
                outputPos: writer.getTextPos(),
                indent: writer.getIndent(),
                hasWritten: resolver.isDeclarationVisible(node)
            };
            aliasDeclarationEmitInfo.push(nodeEmitInfo);
            if (nodeEmitInfo.hasWritten) {
                writeImportEqualsDeclaration(node);
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
                emitLines((<ModuleBlock>node.body).statements);
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
                emitTypeWithNewGetSymbolAccessibilityDiagnostic(node.type, getTypeAliasDeclarationVisibilityError);
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
            var enumMemberValue = resolver.getConstantValue(node);
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

        function emitHeritageClause(typeReferences: TypeReferenceNode[], isImplementsList: boolean) {
            if (typeReferences) {
                write(isImplementsList ? " implements " : " extends ");
                emitCommaList(typeReferences, emitTypeOfTypeReference);
            }

            function emitTypeOfTypeReference(node: TypeReferenceNode) {
                emitTypeWithNewGetSymbolAccessibilityDiagnostic(node, getHeritageClauseVisibilityError);

                function getHeritageClauseVisibilityError(symbolAccesibilityResult: SymbolAccessiblityResult): SymbolAccessibilityDiagnostic {
                    var diagnosticMessage: DiagnosticMessage;
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
                var baseTypeNode = getClassBaseTypeNode(node);
                if (baseTypeNode) {
                    emitHeritageClause([baseTypeNode], /*isImplementsList*/ false);
                }
                emitHeritageClause(getClassImplementedTypeNodes(node), /*isImplementsList*/ true);
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
                else if (node.kind === SyntaxKind.PropertyDeclaration || node.kind === SyntaxKind.PropertySignature) {
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

        function emitTypeOfVariableDeclarationFromTypeLiteral(node: VariableLikeDeclaration) {
            // if this is property of type literal,
            // or is parameter of method/call/construct/index signature of type literal
            // emit only if type is specified
            if (node.type) {
                write(": ");
                emitType(node.type);
            }
        }

        function emitVariableStatement(node: VariableStatement) {
            var hasDeclarationWithEmit = forEach(node.declarationList.declarations, varDeclaration => resolver.isDeclarationVisible(varDeclaration));
            if (hasDeclarationWithEmit) {
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
                emitCommaList(node.declarationList.declarations, emitVariableDeclaration);
                write(";");
                writeLine();
            }
        }

        function emitAccessorDeclaration(node: AccessorDeclaration) {
            if (hasDynamicName(node)) {
                return;
            }

            var accessors = getAllAccessorDeclarations((<ClassDeclaration>node.parent).members, node);
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
                    writeTypeOfDeclaration(node, type, getAccessorDeclarationTypeVisibilityError);
                }
                write(";");
                writeLine();
            }

            function getTypeAnnotationFromAccessor(accessor: AccessorDeclaration): TypeNode | StringLiteralExpression {
                if (accessor) {
                    return accessor.kind === SyntaxKind.GetAccessor
                        ? accessor.type // Getter - return type
                        : accessor.parameters.length > 0
                            ? accessor.parameters[0].type // Setter parameter type
                            : undefined;
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
            if (hasDynamicName(node)) {
                return;
            }

            // If we are emitting Method/Constructor it isn't moduleElement and hence already determined to be emitting
            // so no need to verify if the declaration is visible
            if ((node.kind !== SyntaxKind.FunctionDeclaration || resolver.isDeclarationVisible(node)) &&
                !resolver.isImplementationOfOverload(node)) {
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
                    errorNode: <Node>node.name || node,
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
                write("_" + indexOf((<FunctionLikeDeclaration>node.parent).parameters, node));
            }
            else {
                writeTextOfNode(currentSourceFile, node.name);
            }
            if (node.initializer || hasQuestionToken(node)) {
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

                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.MethodSignature:
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
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
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
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
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
                case SyntaxKind.ImportEqualsDeclaration:
                    return emitImportEqualsDeclaration(<ImportEqualsDeclaration>node);
                case SyntaxKind.ExportAssignment:
                    return emitExportAssignment(<ExportAssignment>node);
                case SyntaxKind.SourceFile:
                    return emitSourceFile(<SourceFile>node);
            }
        }

        function writeReferencePath(referencedFile: SourceFile) {
            var declFileName = referencedFile.flags & NodeFlags.DeclarationFile
                ? referencedFile.fileName // Declaration file, use declaration file name
                : shouldEmitToOwnFile(referencedFile, compilerOptions)
                    ? getOwnEmitOutputFilePath(referencedFile, host, ".d.ts") // Own output file so get the .d.ts file
                    : removeFileExtension(compilerOptions.out) + ".d.ts";// Global out file

            declFileName = getRelativePathToDirectoryOrUrl(
                getDirectoryPath(normalizeSlashes(jsFilePath)),
                declFileName,
                host.getCurrentDirectory(),
                host.getCanonicalFileName,
            /*isAbsolutePathAnUrl*/ false);

            referencePathsOutput += "/// <reference path=\"" + declFileName + "\" />" + newLine;
        }
    }

    // @internal
    export function writeDeclarationFile(host: EmitHost, resolver: EmitResolver, diagnostics: Diagnostic[],  jsFilePath: string, sourceFile: SourceFile) {
        var emitDeclarationResult = emitDeclarations(host, resolver, diagnostics, jsFilePath, sourceFile);
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
            writeFile(host, diagnostics, removeFileExtension(jsFilePath) + ".d.ts", declarationOutput, host.getCompilerOptions().emitBOM);
        }
    }
}