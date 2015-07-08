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
        synchronousDeclarationOutput: string;
        referencePathsOutput: string;
    }

    interface EmitTextWriterWithSymbolWriter extends EmitTextWriter, SymbolWriter {
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

        let writer = createNewTextWriterWithSymbolWriter();
        setWriter(writer);

        let enclosingDeclaration: Node;
        let currentSourceFile: SourceFile;
        let reportedDeclarationError = false;

        // Contains the reference paths that needs to go in the declaration file.
        // Collecting this separately because reference paths need to be first thing in the declaration file
        // and we could be collecting these paths from multiple files into single one with --out option
        let referencePathsOutput = "";

        interface NodeLinks {
            visibleChildren?: Node[];
            visited?: boolean;
            hasExportDeclarations?: boolean;
        }

        let nodeLinks: NodeLinks[] = [];
        function getNodeLinks(node: Node): NodeLinks {
            let nodeId = getNodeId(node);
            return nodeLinks[nodeId] || (nodeLinks[nodeId] = {});
        }

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

                        emitReferencePath(referencedFile);
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

                                emitReferencePath(referencedFile);
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
            synchronousDeclarationOutput: writer.getText(),
            referencePathsOutput,
        };

        function hasInternalAnnotation(range: CommentRange) {
            let text = currentSourceFile.text;
            let comment = text.substring(range.pos, range.end);
            return comment.indexOf("@internal") >= 0;
        }

        function isInternal(node: Node) {
            return forEach(getLeadingCommentRanges(currentSourceFile.text, node.pos), hasInternalAnnotation)
        }

        function createNewTextWriterWithSymbolWriter(): EmitTextWriterWithSymbolWriter {
            let writer = <EmitTextWriterWithSymbolWriter>createTextWriter(newLine);
            writer.trackSymbol = trackSymbol;
            writer.writeKeyword = writer.write;
            writer.writeOperator = writer.write;
            writer.writePunctuation = writer.write;
            writer.writeSpace = writer.write;
            writer.writeStringLiteral = writer.writeLiteral;
            writer.writeParameter = writer.write;
            writer.writeSymbol = writer.write;
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

        var currentErrorNode: Node;
        function trackSymbol(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags) {
            if (currentErrorNode) {
                collectDeclarations(symbol, currentErrorNode);
            }
        }

        function emitTypeOfDeclaration(declaration: AccessorDeclaration | VariableLikeDeclaration, type: TypeNode) {
            write(": ");
            if (type) {
                // Write the type
                emitType(type);
            }
            else {
                resolver.writeTypeOfDeclaration(declaration, enclosingDeclaration, TypeFormatFlags.UseTypeOfFunction, writer);
            }
        }

        function emitReturnTypeAtSignature(signature: SignatureDeclaration) {
            write(": ");
            if (signature.type) {
                // Write the type
                emitType(signature.type);
            }
            else {
                resolver.writeReturnTypeOfSignatureDeclaration(signature, enclosingDeclaration, TypeFormatFlags.UseTypeOfFunction, writer);
            }
        }

        function emitSeparatedList(nodes: Node[], separator: string, eachNodeEmitFn: (node: Node) => void) {
            let currentWriterPos = writer.getTextPos();
            for (let node of nodes) {
                if (currentWriterPos !== writer.getTextPos()) {
                    write(separator);
                }
                currentWriterPos = writer.getTextPos();
                eachNodeEmitFn(node);
            }
        }

        function emitCommaList(nodes: Node[], eachNodeEmitFn: (node: Node) => void) {
            emitSeparatedList(nodes, ", ", eachNodeEmitFn);
        }

        function emitJsDocComments(declaration: Node) {
            if (!compilerOptions.removeComments) {
                if (declaration) {
                    let jsDocComments = getJsDocComments(declaration, currentSourceFile);
                    emitNewLineBeforeLeadingComments(currentSourceFile, writer, declaration, jsDocComments);
                    // jsDoc comments are emitted at /*leading comment1 */space/*leading comment*/space
                    emitComments(currentSourceFile, writer, jsDocComments, /*trailingSeparator*/ true, newLine, writeCommentRange);
                }
            }
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

            function emitEntityName(entityName: EntityName | Expression) {

                if (entityName.kind === SyntaxKind.Identifier) {
                    writeTextOfNode(currentSourceFile, entityName);
                }
                else {
                    let left = entityName.kind === SyntaxKind.QualifiedName ? (<QualifiedName>entityName).left : (<PropertyAccessExpression>entityName).expression;
                    let right = entityName.kind === SyntaxKind.QualifiedName ? (<QualifiedName>entityName).right : (<PropertyAccessExpression>entityName).name;
                    emitEntityName(left);
                    write(".");
                    writeTextOfNode(currentSourceFile, right);
                }
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
                    forEach(type.members, emitNode);
                    decreaseIndent();
                }
                write("}");
            }
        }

        function emitSourceFile(node: SourceFile) {
            currentSourceFile = node;
            enclosingDeclaration = node;
            emitSourceFileDeclarations(node);
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
                resolver.writeTypeOfExpression(node.expression, enclosingDeclaration, TypeFormatFlags.UseTypeOfFunction, writer);
                write(";");
                writeLine();
                write(node.isExportEquals ? "export = " : "export default ");
                write(tempVarName);
            }
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

        function emitImportEqualsDeclaration(node: ImportEqualsDeclaration) {
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
                emitType(<EntityName>node.moduleReference);
                write(";");
            }
            else {
                write("require(");
                writeTextOfNode(currentSourceFile, getExternalModuleImportEqualsDeclarationExpression(node));
                write(");");
            }
            writer.writeLine();
        }

        function emitImportDeclaration(node: ImportDeclaration) {
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
                if (node.importClause.name) {
                    writeTextOfNode(currentSourceFile, node.importClause.name);
                }
                if (node.importClause.namedBindings) {
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
                        emitCommaList((<NamedImports>node.importClause.namedBindings).elements, emitImportOrExportSpecifier);
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

        function emitModuleDeclaration(node: ModuleDeclaration) {
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
            //emitLines((<ModuleBlock>node.body).statements);
            writeChildDeclarations(node);
            decreaseIndent();
            write("}");
            writeLine();
            enclosingDeclaration = prevEnclosingDeclaration;
        }

        function emitTypeAliasDeclaration(node: TypeAliasDeclaration) {
            emitJsDocComments(node);
            emitModuleElementDeclarationFlags(node);
            write("type ");
            writeTextOfNode(currentSourceFile, node.name);
            write(" = ");
            emitType(node.type);
            write(";");
            writeLine();
        }

        function emitEnumDeclaration(node: EnumDeclaration) {
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
            //emitLines(node.members);
            writeChildDeclarations(node);
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
                    emitType(node.constraint);
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
                    emitType(node);
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
            //emitLines(node.members);
            writeChildDeclarations(node);
            decreaseIndent();
            write("}");
            writeLine();
            enclosingDeclaration = prevEnclosingDeclaration;
        }

        function emitInterfaceDeclaration(node: InterfaceDeclaration) {
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
            //emitLines(node.members);
            writeChildDeclarations(node);
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
            //if (node.kind !== SyntaxKind.VariableDeclaration) {
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
                    emitTypeOfDeclaration(node, node.type);
                }
            }
            //}

            function emitBindingPattern(bindingPattern: BindingPattern) {
                // Only select non-omitted expression from the bindingPattern's elements.
                // We have to do this to avoid emitting trailing commas.
                // For example:
                //      original: var [, c,,] = [ 2,3,4]
                //      emitted: declare var c: number; // instead of declare var c:number, ;
                let elements: Node[] = [];
                for (let element of bindingPattern.elements) {
                    if (element.kind !== SyntaxKind.OmittedExpression) {
                        elements.push(element);
                    }
                }
                emitCommaList(elements, emitBindingElement);
            }

            function emitBindingElement(bindingElement: BindingElement) {
                if (bindingElement.name) {
                    if (isBindingPattern(bindingElement.name)) {
                        emitBindingPattern(<BindingPattern>bindingElement.name);
                    }
                    else {
                        writeTextOfNode(currentSourceFile, bindingElement.name);
                        emitTypeOfDeclaration(bindingElement, /*type*/ undefined);
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

        function emitVariableStatement(node: VariableStatement) {
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

        // TODO: we only should have either statement or declaration
        function emitVariableDeclarationWithoutStatement(node: VariableDeclaration) {
            emitJsDocComments(node);
            emitModuleElementDeclarationFlags(node);
            var declarationList = node.parent;
            if (isLet(declarationList)) {
                write("let ");
            }
            else if (isConst(declarationList)) {
                write("const ");
            }
            else {
                write("var ");
            }
            emitVariableDeclaration(node);
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
                    emitTypeOfDeclaration(node, type);
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
        }

        function emitFunctionDeclaration(node: FunctionLikeDeclaration) {
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
                emitReturnTypeAtSignature(node);
            }

            enclosingDeclaration = prevEnclosingDeclaration;

            if (!isFunctionTypeOrConstructorType) {
                write(";");
                writeLine();
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
                emitTypeOfDeclaration(node, node.type);
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

                        // If bindingElement has propertyName property, then its name must be another bindingPattern of SyntaxKind.ObjectBindingPattern
                        emitBindingPattern(<BindingPattern>bindingElement.name);
                    }
                    else if (bindingElement.name) {
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
            if (compilerOptions.stripInternal && isInternal(node)) {
                return;
            }

            switch (node.kind) {
                case SyntaxKind.FunctionDeclaration:
                    return emitFunctionDeclaration(<FunctionLikeDeclaration>node);

                case SyntaxKind.VariableStatement:
                    return emitVariableStatement(<VariableStatement>node);
                case SyntaxKind.VariableDeclaration:
                    return emitVariableDeclarationWithoutStatement(<VariableDeclaration>node);

                case SyntaxKind.InterfaceDeclaration:
                    return emitInterfaceDeclaration(<InterfaceDeclaration>node);
                case SyntaxKind.ClassDeclaration:
                    return emitClassDeclaration(<ClassDeclaration>node);
                case SyntaxKind.TypeAliasDeclaration:
                    return emitTypeAliasDeclaration(<TypeAliasDeclaration>node);
                case SyntaxKind.EnumDeclaration:
                    return emitEnumDeclaration(<EnumDeclaration>node);
                case SyntaxKind.ModuleDeclaration:
                    return emitModuleDeclaration(<ModuleDeclaration>node);
                case SyntaxKind.ImportEqualsDeclaration:
                    return emitImportEqualsDeclaration(<ImportEqualsDeclaration>node);
                case SyntaxKind.ImportDeclaration:
                    return emitImportDeclaration(<ImportDeclaration>node);

                case SyntaxKind.ExportDeclaration:
                    return emitExportDeclaration(<ExportDeclaration>node);
                case SyntaxKind.Constructor:
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

        function emitReferencePath(referencedFile: SourceFile) {
            let declFileName = referencedFile.flags & NodeFlags.DeclarationFile
                ? referencedFile.fileName // Declaration file, use declaration file name
                : shouldEmitToOwnFile(referencedFile, compilerOptions)
                    ? getOwnEmitOutputFilePath(referencedFile, host, ".d.ts") // Own output file so get the .d.ts file
                    : removeFileExtension(compilerOptions.out) + ".d.ts"; // Global out file

            declFileName = getRelativePathToDirectoryOrUrl(
                getDirectoryPath(normalizeSlashes(jsFilePath)),
                declFileName,
                host.getCurrentDirectory(),
                host.getCanonicalFileName,
            /*isAbsolutePathAnUrl*/ false);

            referencePathsOutput += "/// <reference path=\"" + declFileName + "\" />" + newLine;
        }


        function visitNode(node: Node): void {
            if (!node) return;

            switch (node.kind) {
                // import/export aliases
                case SyntaxKind.ExportDeclaration:
                    return visitExportDeclaration(<ExportDeclaration>node);
                case SyntaxKind.ImportEqualsDeclaration:
                    return visitImportEqualsDeclaration(<ImportEqualsDeclaration>node);
                case SyntaxKind.ExportAssignment:
                    return visitExportAssignment(<ExportAssignment>node);

                // declarations
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.Constructor:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.ConstructSignature:
                case SyntaxKind.CallSignature:
                case SyntaxKind.IndexSignature:
                    return visitSignatureDeclaration(<FunctionLikeDeclaration>node);

                //case SyntaxKind.GetAccessor:
                //case SyntaxKind.SetAccessor:
                //    return emitAccessorDeclaration(<AccessorDeclaration>node);

                case SyntaxKind.TypeParameter:
                    return visitNode((<TypeParameterDeclaration>node).constraint);

                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.ClassDeclaration:
                    return visitNodes((<InterfaceDeclaration|ClassDeclaration>node).typeParameters) ||
                        visitNodes((<InterfaceDeclaration|ClassDeclaration>node).heritageClauses);

                case SyntaxKind.TypeAliasDeclaration:
                    return visitNodes((<TypeAliasDeclaration>node).typeParameters) ||
                        visitNode((<TypeAliasDeclaration>node).type);

                case SyntaxKind.VariableStatement:
                    return visitNodes((<VariableStatement>node).declarationList.declarations);

                case SyntaxKind.Parameter:
                case SyntaxKind.VariableDeclaration:
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                    return visitPropertyDeclaration(<PropertyDeclaration>node);

                // TypeNodes
                case SyntaxKind.AnyKeyword:
                case SyntaxKind.StringKeyword:
                case SyntaxKind.NumberKeyword:
                case SyntaxKind.BooleanKeyword:
                case SyntaxKind.SymbolKeyword:
                case SyntaxKind.VoidKeyword:
                case SyntaxKind.StringLiteral:
                    // Nothing to visit
                    return;

                case SyntaxKind.TypePredicate:
                    return visitNode((<TypePredicateNode>node).type);
                case SyntaxKind.ArrayType:
                    return visitNode((<ArrayTypeNode>node).elementType);
                case SyntaxKind.TupleType:
                    return visitNodes((<TupleTypeNode>node).elementTypes);
                case SyntaxKind.UnionType:
                    return visitNodes((<UnionTypeNode>node).types);
                case SyntaxKind.ParenthesizedType:
                    return visitNode((<ParenthesizedTypeNode>node).type);
                case SyntaxKind.FunctionType:
                case SyntaxKind.ConstructorType:
                    return visitSignatureDeclaration(<FunctionOrConstructorTypeNode>node);
                case SyntaxKind.TypeLiteral:
                    return visitNodes((<TypeLiteralNode>node).members);
                case SyntaxKind.ExpressionWithTypeArguments:
                    return visitExpressionWithTypeArguments(<ExpressionWithTypeArguments>node);
                case SyntaxKind.TypeQuery:
                    return visitNode((<TypeQueryNode>node).exprName);
                case SyntaxKind.TypeReference:
                    return visitNode((<TypeReferenceNode>node).typeName) ||
                        visitNodes((<TypeReferenceNode>node).typeArguments);
                case SyntaxKind.QualifiedName:
                    return visitNode((<QualifiedName>node).left) ||
                        visitNode((<QualifiedName>node).right);
                case SyntaxKind.Identifier:
                    return visitTypeName(<Identifier|QualifiedName>node);
            }
        }

        function visitNodes(nodes: NodeArray<any>): void {
            forEach(nodes, visitNode);
        }

        function visitExportDeclaration(node: ExportDeclaration): void {
            if (!node.moduleSpecifier) {
                forEach(node.exportClause.elements, collectAliasDeclaration);
            }
        }

        function visitImportEqualsDeclaration(node: ImportEqualsDeclaration): void {
            if (node.moduleReference.kind !== SyntaxKind.ExternalModuleReference) {
                collectAliasDeclaration(node);
            }
        }

        function visitExportAssignment(node: ExportAssignment): void {
            if (node.expression.kind === SyntaxKind.Identifier) {
                collectAliasDeclaration(node);
            }
        }

        function visitSignatureDeclaration(node: SignatureDeclaration): void {
            if (hasDynamicName(node) || node.flags & NodeFlags.Private) {
                return;
            }

            visitNodes(node.typeParameters);
            visitNodes(node.parameters);

            if (node.type) {
                visitNode(node.type);
            }
            else if (node.kind !== SyntaxKind.Constructor) {
                // TODO: handel infered type
                // TODO: Cache the result
                let writer = createNewTextWriterWithSymbolWriter();
                let previousErrorNode = currentErrorNode;
                currentErrorNode = node;
                resolver.writeReturnTypeOfSignatureDeclaration(node, getEnclosingDeclaration(node), TypeFormatFlags.UseTypeOfFunction, writer);
                currentErrorNode = previousErrorNode;
            }
        }

        function visitPropertyDeclaration(node: PropertyDeclaration): void {
            if (hasDynamicName(node) || node.flags & NodeFlags.Private) {
                return;
            }

            if (node.type) {
                visitNode(node.type);
            }
            else {
                // TODO: handel infered type
                // TODO: Cache the result
                let writer = createNewTextWriterWithSymbolWriter();
                let previousErrorNode = currentErrorNode;
                currentErrorNode = node;
                resolver.writeTypeOfDeclaration(node, getEnclosingDeclaration(node), TypeFormatFlags.UseTypeOfFunction, writer);
                currentErrorNode = previousErrorNode;
            }
        }

        function visitExpressionWithTypeArguments(node: ExpressionWithTypeArguments): void {
            // TODO: handel infered type
            // TODO: Cache the result
            let writer = createNewTextWriterWithSymbolWriter();
            let previousErrorNode = currentErrorNode;
            currentErrorNode = node;
            resolver.writeTypeOfExpression(node.expression, getEnclosingDeclaration(node), TypeFormatFlags.UseTypeOfFunction, writer);
            currentErrorNode = previousErrorNode;

            visitNodes(node.typeArguments);
        }

        function visitTypeName(node: Identifier|QualifiedName): void {
            let symbol = resolver.getSymbolAtLocation(node);
            Debug.assert(!!symbol);
            collectDeclarations(symbol, node);
        }

        function collectAliasDeclaration(node: ImportOrExportSpecifier|ImportEqualsDeclaration|ExportAssignment) {
            let target = resolver.getLocalTargetOfAliasDeclaration(node);
            Debug.assert(!!target);
            collectDeclarations(target, node);
        }


        function isDeclarationVisible(node: Node): boolean {
            if (compilerOptions.stripInternal && isInternal(node)) {
                // TODO: this is the correct place for this check, enable this 
                // after updating the code to make internal on local declarations instead
                // of containers
                //return false;
            }

            switch (node.kind) {
                case SyntaxKind.TypeParameter:
                case SyntaxKind.Parameter:
                case SyntaxKind.PropertySignature:
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.Constructor:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.CallSignature:
                case SyntaxKind.ConstructSignature:
                case SyntaxKind.IndexSignature:
                case SyntaxKind.EnumMember:
                case SyntaxKind.ExportAssignment:
                case SyntaxKind.ExportDeclaration:
                    return true;

                case SyntaxKind.VariableStatement:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.ImportEqualsDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.TypeAliasDeclaration:
                    if (node.parent.kind === SyntaxKind.SourceFile && !isExternalModule(<SourceFile>node.parent)) {
                        return true;
                    }
                    else if ((node.flags & NodeFlags.Export) !== 0) {
                        return true;
                    }
                    else if (node.parent.kind === SyntaxKind.ModuleBlock && isInAmbientContext(node.parent)) {
                        return !hasExportDeclatations(node.parent);
                    }
                    break;

                case SyntaxKind.VariableDeclaration:
                    // TODO: do we need this
                    return isDeclarationVisible(node.parent.parent);
            }

            return false;
        }

        function forEachTopLevelDeclaration(node: Node, action: (node: Node) => void): void {
            switch (node.kind) {
                case SyntaxKind.SourceFile:
                    forEach((<SourceFile>node).statements, action);
                    break;
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.ClassDeclaration:
                    forEach((<InterfaceDeclaration|EnumDeclaration|ClassDeclaration>node).members, action);
                    break;
                case SyntaxKind.ModuleDeclaration:
                    if ((<ModuleDeclaration>node).body.kind === SyntaxKind.ModuleBlock) {
                        forEach((<ModuleBlock>(<ModuleDeclaration>node).body).statements, action);
                    }
                    else {
                        action((<ModuleDeclaration>node).body);
                    }
                    break;
            }
        }

        function getEnclosingDeclaration(node: Node): Node {
            while (node.parent) {
                switch (node.parent.kind) {
                    case SyntaxKind.SourceFile:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.ModuleDeclaration:
                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.InterfaceDeclaration:
                        return node.parent;
                    default:
                        node = node.parent;
                }
            }
            return undefined;
        }


        function collectDeclarations(symbol: Symbol, errorNode: Node): void {
            forEach(symbol.declarations, d => collectDeclaration(d, errorNode));
        }

        function hasExportDeclatations(node: Node): boolean {
            let links = getNodeLinks(node);
            if (typeof links.hasExportDeclarations === undefined) {
                let foundExportDeclarations = false;
                /// TODO: swithc this to return a value if truthy
                forEachTopLevelDeclaration(node, n => {
                    if (n.kind === SyntaxKind.ExportAssignment || n.kind === SyntaxKind.ExportDeclaration) {
                        foundExportDeclarations = true;
                    }
                });
                links.hasExportDeclarations = foundExportDeclarations
            }
            return links.hasExportDeclarations;
        }

        // TODO: find a better name
        function isDeclarationAccessible(node: Node) {
            if (isDeclarationVisible(node)) {
                return true;
            }

            let parent = getEnclosingDeclaration(node);
            if (parent && parent.kind === SyntaxKind.ModuleDeclaration) {
                return hasExportDeclatations(parent);
            }

            return false;
        }

        // TODO: remove this and update error messages to not use names
        function getNameText(node: ParameterDeclaration|PropertyDeclaration|VariableDeclaration):string {
            if (node.name.kind === SyntaxKind.Identifier) {
                return (<Identifier>node.name).text;
            }
            return "__bindingpattern";
        }

        function reportDeclarationAccessiblityMessage(referencedDeclaration: Declaration, errorNode: Node): void {
            Debug.assert(referencedDeclaration.name && referencedDeclaration.name.kind === SyntaxKind.Identifier);

            reportedDeclarationError = true;

            let referencedDeclarationName = (<Identifier>referencedDeclaration.name).text;
            let container = errorNode;

            while (true) {
                switch (container.kind) {
                    case SyntaxKind.ClassDeclaration:
                        diagnostics.push(createDiagnosticForNode(errorNode,
                            Diagnostics.Extends_clause_of_exported_class_0_has_or_is_using_private_name_1,
                            (<ClassDeclaration>container).name.text, referencedDeclarationName));
                        return;
                    case SyntaxKind.InterfaceDeclaration:
                        diagnostics.push(createDiagnosticForNode(errorNode,
                            Diagnostics.Extends_clause_of_exported_interface_0_has_or_is_using_private_name_1,
                            (<InterfaceDeclaration>container).name.text, referencedDeclarationName));
                        return;
                    case SyntaxKind.VariableDeclaration:
                        diagnostics.push(createDiagnosticForNode(errorNode,
                            Diagnostics.Exported_variable_0_has_or_is_using_private_name_1,
                            getNameText(<VariableDeclaration>container), referencedDeclarationName));
                        return;
                    case SyntaxKind.PropertySignature:
                        diagnostics.push(createDiagnosticForNode(errorNode,
                            Diagnostics.Public_property_0_of_exported_class_has_or_is_using_private_name_1,
                            getNameText(<PropertyDeclaration>container), referencedDeclarationName));
                        return;
                    case SyntaxKind.PropertyDeclaration:
                        diagnostics.push(createDiagnosticForNode(errorNode,
                            Diagnostics.Property_0_of_exported_interface_has_or_is_using_private_name_1,
                            getNameText(<PropertyDeclaration>container), referencedDeclarationName));
                        return;
                    case SyntaxKind.Parameter:
                        diagnostics.push(createDiagnosticForNode(errorNode,
                            Diagnostics.Parameter_0_of_exported_function_has_or_is_using_private_name_1,
                            getNameText(<ParameterDeclaration>container), referencedDeclarationName));
                        return;
                    case SyntaxKind.GetAccessor:
                        diagnostics.push(createDiagnosticForNode(errorNode,
                            Diagnostics.Return_type_of_public_property_getter_from_exported_class_has_or_is_using_private_name_0,
                            referencedDeclarationName));
                        return;
                    case SyntaxKind.ConstructSignature:
                        diagnostics.push(createDiagnosticForNode(errorNode,
                            Diagnostics.Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_0,
                            referencedDeclarationName));
                        return;
                    case SyntaxKind.CallSignature:
                        diagnostics.push(createDiagnosticForNode(errorNode,
                            Diagnostics.Return_type_of_call_signature_from_exported_interface_has_or_is_using_private_name_0,
                            referencedDeclarationName));
                        return;
                    case SyntaxKind.IndexSignature:
                        diagnostics.push(createDiagnosticForNode(errorNode,
                            Diagnostics.Return_type_of_index_signature_from_exported_interface_has_or_is_using_private_name_0,
                            referencedDeclarationName));
                        return;
                    case SyntaxKind.MethodDeclaration:
                        diagnostics.push(createDiagnosticForNode(errorNode,
                            Diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_private_name_0,
                            referencedDeclarationName));
                        return;
                    case SyntaxKind.MethodSignature:
                        diagnostics.push(createDiagnosticForNode(errorNode,
                            Diagnostics.Return_type_of_method_from_exported_interface_has_or_is_using_private_name_0,
                            referencedDeclarationName));
                        return;
                    case SyntaxKind.FunctionDeclaration:
                        diagnostics.push(createDiagnosticForNode(errorNode,
                            Diagnostics.Return_type_of_exported_function_has_or_is_using_private_name_0,
                            referencedDeclarationName));
                        return;
                    case SyntaxKind.TypeAliasDeclaration:
                        diagnostics.push(createDiagnosticForNode(errorNode,
                            Diagnostics.Exported_type_alias_0_has_or_is_using_private_name_1,
                            (<TypeAliasDeclaration>container).name.text, referencedDeclarationName));
                        return;
                    case SyntaxKind.ExportAssignment:
                        diagnostics.push(createDiagnosticForNode((<ExportAssignment>errorNode).expression,
                            Diagnostics.Default_export_of_the_module_has_or_is_using_private_name_0,
                            referencedDeclarationName));
                        return;
                    case SyntaxKind.TypeParameter:
                        diagnostics.push(createDiagnosticForNode((<TypeParameterDeclaration>errorNode).constraint,
                            Diagnostics.Type_parameter_0_of_exported_class_has_or_is_using_private_name_1,
                            (<TypeParameterDeclaration>container).name.text, referencedDeclarationName));
                        return;
                    case SyntaxKind.ImportEqualsDeclaration:
                        diagnostics.push(createDiagnosticForNode((<ImportEqualsDeclaration>errorNode).moduleReference,
                            Diagnostics.Import_declaration_0_is_using_private_name_1,
                            (<ImportEqualsDeclaration>container).name.text, referencedDeclarationName));
                        return;
                }
                container = container.parent;
            }
        }

        function collectDeclaration(node: Node, errorNode?:Node): void {
            let links = getNodeLinks(node);
            if (!links.visited) {
                links.visited = true;

                // Make the declaration visble by attaching it to its
                // parent's visible declarations.
                // also make sure the parent is reachable from a top-level
                // declaration
                let parent = getEnclosingDeclaration(node);
                if (parent) {
                    ensureDeclarationVisible(parent);
                    attachVisibleChild(parent, node);
                }

                visitNode(node);
            }

            if (errorNode) {
                if (!isDeclarationAccessible(node)) {
                    reportDeclarationAccessiblityMessage(<Declaration>node, errorNode);
                }
            }

            // Collect children as well
            switch (node.kind) {
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.EnumDeclaration:
                    forEachTopLevelDeclaration(node, child => {
                        if (isDeclarationVisible(child)) {
                            collectDeclaration(child);
                        }
                    });
                    break;
            }

        }

        function ensureDeclarationVisible(node: Node): void {
            let links = getNodeLinks(node);
            if (!links.visited) {
                links.visited = true;

                var parent = getEnclosingDeclaration(node);
                if (parent) {
                    ensureDeclarationVisible(parent);
                    attachVisibleChild(parent, node);
                }
            }
        }

        function attachVisibleChild(node: Node, child: Node): void {
            let links = getNodeLinks(node);
            if (!links.visibleChildren) {
                links.visibleChildren = [];
            }
            links.visibleChildren.push(child);
        }

        function compareDeclarations(d1: Node, d2: Node): Comparison {
            return compareValues(d1.pos, d2.pos) || Comparison.EqualTo;
        }

        function sortDeclarations(nodes: Node[]): Node[] {
            return nodes && nodes.sort(compareDeclarations);
        }

        function writeChildDeclarations(node: Node): void {
            forEach(sortDeclarations(getNodeLinks(node).visibleChildren), emitNode);
        }

        function emitSourceFileDeclarations(sourceFile: SourceFile): void {
            // Collect all visible declarations
            forEachTopLevelDeclaration(sourceFile, child => {
                if (isDeclarationVisible(child)) {
                    collectDeclaration(child);
                }
            });

            // write the declarations
            writeChildDeclarations(sourceFile);
        }
    }

    /* @internal */
    export function writeDeclarationFile(jsFilePath: string, sourceFile: SourceFile, host: EmitHost, resolver: EmitResolver, diagnostics: Diagnostic[]) {
        let emitDeclarationResult = emitDeclarations(host, resolver, diagnostics, jsFilePath, sourceFile);
        // TODO(shkamat): Should we not write any declaration file if any of them can produce error,
        // or should we just not write this file like we are doing now
       // if (!emitDeclarationResult.reportedDeclarationError) {
            let declarationOutput = emitDeclarationResult.referencePathsOutput
                + emitDeclarationResult.synchronousDeclarationOutput;
            writeFile(host, diagnostics, removeFileExtension(jsFilePath) + ".d.ts", declarationOutput, host.getCompilerOptions().emitBOM);
        //}
    }
}
