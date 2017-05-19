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
        referencesOutput: string;
    }

    type GetSymbolAccessibilityDiagnostic = (symbolAccessibilityResult: SymbolAccessibilityResult) => SymbolAccessibilityDiagnostic;

    interface EmitTextWriterWithSymbolWriter extends EmitTextWriter, SymbolWriter {
        getSymbolAccessibilityDiagnostic: GetSymbolAccessibilityDiagnostic;
    }

    interface SymbolAccessibilityDiagnostic {
        errorNode: Node;
        diagnosticMessage: DiagnosticMessage;
        typeName?: DeclarationName;
    }

    export function getDeclarationDiagnostics(host: EmitHost, resolver: EmitResolver, targetSourceFile: SourceFile): Diagnostic[] {
        const declarationDiagnostics = createDiagnosticCollection();
        forEachEmittedFile(host, getDeclarationDiagnosticsFromFile, targetSourceFile);
        return declarationDiagnostics.getDiagnostics(targetSourceFile ? targetSourceFile.fileName : undefined);

        function getDeclarationDiagnosticsFromFile({ declarationFilePath }: EmitFileNames, sourceFileOrBundle: SourceFile | Bundle) {
            emitDeclarations(host, resolver, declarationDiagnostics, declarationFilePath, sourceFileOrBundle, /*emitOnlyDtsFiles*/ false);
        }
    }

    function emitDeclarations(host: EmitHost, resolver: EmitResolver, emitterDiagnostics: DiagnosticCollection, declarationFilePath: string,
        sourceFileOrBundle: SourceFile | Bundle, emitOnlyDtsFiles: boolean): DeclarationEmit {
        const sourceFiles = sourceFileOrBundle.kind === SyntaxKind.Bundle ? sourceFileOrBundle.sourceFiles : [sourceFileOrBundle];
        const isBundledEmit = sourceFileOrBundle.kind === SyntaxKind.Bundle;
        const newLine = host.getNewLine();
        const compilerOptions = host.getCompilerOptions();

        let write: (s: string) => void;
        let writeLine: () => void;
        let increaseIndent: () => void;
        let decreaseIndent: () => void;
        let writeTextOfNode: (text: string, node: Node) => void;

        let writer: EmitTextWriterWithSymbolWriter;

        createAndSetNewTextWriterWithSymbolWriter();

        let enclosingDeclaration: Node;
        let resultHasExternalModuleIndicator: boolean;
        let currentText: string;
        let currentLineMap: number[];
        let currentIdentifiers: Map<string>;
        let isCurrentFileExternalModule: boolean;
        let reportedDeclarationError = false;
        let errorNameNode: DeclarationName;
        const emitJsDocComments = compilerOptions.removeComments ? noop : writeJsDocComments;
        const emit = compilerOptions.stripInternal ? stripInternal : emitNode;
        let needsDeclare = true;

        let moduleElementDeclarationEmitInfo: ModuleElementDeclarationEmitInfo[] = [];
        let asynchronousSubModuleDeclarationEmitInfo: ModuleElementDeclarationEmitInfo[];

        // Contains the reference paths that needs to go in the declaration file.
        // Collecting this separately because reference paths need to be first thing in the declaration file
        // and we could be collecting these paths from multiple files into single one with --out option
        let referencesOutput = "";

        let usedTypeDirectiveReferences: Map<string>;

        // Emit references corresponding to each file
        const emittedReferencedFiles: SourceFile[] = [];
        let addedGlobalFileReference = false;
        let allSourcesModuleElementDeclarationEmitInfo: ModuleElementDeclarationEmitInfo[] = [];
        forEach(sourceFiles, sourceFile => {
            // Dont emit for javascript file
            if (isSourceFileJavaScript(sourceFile)) {
                return;
            }

            // Check what references need to be added
            if (!compilerOptions.noResolve) {
                forEach(sourceFile.referencedFiles, fileReference => {
                    const referencedFile = tryResolveScriptReference(host, sourceFile, fileReference);

                    // Emit reference in dts, if the file reference was not already emitted
                    if (referencedFile && !contains(emittedReferencedFiles, referencedFile)) {
                        // Add a reference to generated dts file,
                        // global file reference is added only
                        //  - if it is not bundled emit (because otherwise it would be self reference)
                        //  - and it is not already added
                        if (writeReferencePath(referencedFile, !isBundledEmit && !addedGlobalFileReference, emitOnlyDtsFiles)) {
                            addedGlobalFileReference = true;
                        }
                        emittedReferencedFiles.push(referencedFile);
                    }
                });
            }

            resultHasExternalModuleIndicator = false;
            if (!isBundledEmit || !isExternalModule(sourceFile)) {
                needsDeclare = true;
                emitSourceFile(sourceFile);
            }
            else if (isExternalModule(sourceFile)) {
                needsDeclare = false;
                write(`declare module "${getResolvedExternalModuleName(host, sourceFile)}" {`);
                writeLine();
                increaseIndent();
                emitSourceFile(sourceFile);
                decreaseIndent();
                write("}");
                writeLine();
            }

            // create asynchronous output for the importDeclarations
            if (moduleElementDeclarationEmitInfo.length) {
                const oldWriter = writer;
                forEach(moduleElementDeclarationEmitInfo, aliasEmitInfo => {
                    if (aliasEmitInfo.isVisible && !aliasEmitInfo.asynchronousOutput) {
                        Debug.assert(aliasEmitInfo.node.kind === SyntaxKind.ImportDeclaration);
                        createAndSetNewTextWriterWithSymbolWriter();
                        Debug.assert(aliasEmitInfo.indent === 0 || (aliasEmitInfo.indent === 1 && isBundledEmit));
                        for (let i = 0; i < aliasEmitInfo.indent; i++) {
                            increaseIndent();
                        }
                        writeImportDeclaration(<ImportDeclaration>aliasEmitInfo.node);
                        aliasEmitInfo.asynchronousOutput = writer.getText();
                        for (let i = 0; i < aliasEmitInfo.indent; i++) {
                            decreaseIndent();
                        }
                    }
                });
                setWriter(oldWriter);

                allSourcesModuleElementDeclarationEmitInfo = allSourcesModuleElementDeclarationEmitInfo.concat(moduleElementDeclarationEmitInfo);
                moduleElementDeclarationEmitInfo = [];
            }

            if (!isBundledEmit && isExternalModule(sourceFile) && sourceFile.moduleAugmentations.length && !resultHasExternalModuleIndicator) {
                // if file was external module with augmentations - this fact should be preserved in .d.ts as well.
                // in case if we didn't write any external module specifiers in .d.ts we need to emit something
                // that will force compiler to think that this file is an external module - 'export {}' is a reasonable choice here.
                write("export {};");
                writeLine();
            }
        });

        if (usedTypeDirectiveReferences) {
            forEachKey(usedTypeDirectiveReferences, directive => {
                referencesOutput += `/// <reference types="${directive}" />${newLine}`;
            });
        }

        return {
            reportedDeclarationError,
            moduleElementDeclarationEmitInfo: allSourcesModuleElementDeclarationEmitInfo,
            synchronousDeclarationOutput: writer.getText(),
            referencesOutput,
        };

        function hasInternalAnnotation(range: CommentRange) {
            const comment = currentText.substring(range.pos, range.end);
            return comment.indexOf("@internal") >= 0;
        }

        function stripInternal(node: Node) {
            if (node) {
                const leadingCommentRanges = getLeadingCommentRanges(currentText, node.pos);
                if (forEach(leadingCommentRanges, hasInternalAnnotation)) {
                    return;
                }

                emitNode(node);
            }
        }

        function createAndSetNewTextWriterWithSymbolWriter(): void {
            const writer = <EmitTextWriterWithSymbolWriter>createTextWriter(newLine);
            writer.trackSymbol = trackSymbol;
            writer.reportInaccessibleThisError = reportInaccessibleThisError;
            writer.reportIllegalExtends = reportIllegalExtends;
            writer.writeKeyword = writer.write;
            writer.writeOperator = writer.write;
            writer.writePunctuation = writer.write;
            writer.writeSpace = writer.write;
            writer.writeStringLiteral = writer.writeLiteral;
            writer.writeParameter = writer.write;
            writer.writeProperty = writer.write;
            writer.writeSymbol = writer.write;
            setWriter(writer);
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
            const oldWriter = writer;
            forEach(nodes, declaration => {
                let nodeToCheck: Node;
                if (declaration.kind === SyntaxKind.VariableDeclaration) {
                    nodeToCheck = declaration.parent.parent;
                }
                else if (declaration.kind === SyntaxKind.NamedImports || declaration.kind === SyntaxKind.ImportSpecifier || declaration.kind === SyntaxKind.ImportClause) {
                    Debug.fail("We should be getting ImportDeclaration instead to write");
                }
                else {
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

        function recordTypeReferenceDirectivesIfNecessary(typeReferenceDirectives: string[]): void {
            if (!typeReferenceDirectives) {
                return;
            }

            if (!usedTypeDirectiveReferences) {
                usedTypeDirectiveReferences = createMap<string>();
            }
            for (const directive of typeReferenceDirectives) {
                if (!usedTypeDirectiveReferences.has(directive)) {
                    usedTypeDirectiveReferences.set(directive, directive);
                }
            }
        }

        function handleSymbolAccessibilityError(symbolAccessibilityResult: SymbolAccessibilityResult) {
            if (symbolAccessibilityResult.accessibility === SymbolAccessibility.Accessible) {
                // write the aliases
                if (symbolAccessibilityResult && symbolAccessibilityResult.aliasesToMakeVisible) {
                    writeAsynchronousModuleElements(symbolAccessibilityResult.aliasesToMakeVisible);
                }
            }
            else {
                // Report error
                reportedDeclarationError = true;
                const errorInfo = writer.getSymbolAccessibilityDiagnostic(symbolAccessibilityResult);
                if (errorInfo) {
                    if (errorInfo.typeName) {
                        emitterDiagnostics.add(createDiagnosticForNode(symbolAccessibilityResult.errorNode || errorInfo.errorNode,
                            errorInfo.diagnosticMessage,
                            getTextOfNodeFromSourceText(currentText, errorInfo.typeName),
                            symbolAccessibilityResult.errorSymbolName,
                            symbolAccessibilityResult.errorModuleName));
                    }
                    else {
                        emitterDiagnostics.add(createDiagnosticForNode(symbolAccessibilityResult.errorNode || errorInfo.errorNode,
                            errorInfo.diagnosticMessage,
                            symbolAccessibilityResult.errorSymbolName,
                            symbolAccessibilityResult.errorModuleName));
                    }
                }
            }
        }

        function trackSymbol(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags) {
            handleSymbolAccessibilityError(resolver.isSymbolAccessible(symbol, enclosingDeclaration, meaning, /*shouldComputeAliasesToMakeVisible*/ true));
            recordTypeReferenceDirectivesIfNecessary(resolver.getTypeReferenceDirectivesForSymbol(symbol, meaning));
        }

        function reportIllegalExtends() {
            if (errorNameNode) {
                reportedDeclarationError = true;
                emitterDiagnostics.add(createDiagnosticForNode(errorNameNode, Diagnostics.extends_clause_of_exported_class_0_refers_to_a_type_whose_name_cannot_be_referenced,
                    declarationNameToString(errorNameNode)));
            }
        }

        function reportInaccessibleThisError() {
            if (errorNameNode) {
                reportedDeclarationError = true;
                emitterDiagnostics.add(createDiagnosticForNode(errorNameNode, Diagnostics.The_inferred_type_of_0_references_an_inaccessible_this_type_A_type_annotation_is_necessary,
                    declarationNameToString(errorNameNode)));
            }
        }

        function writeTypeOfDeclaration(declaration: AccessorDeclaration | VariableLikeDeclaration, type: TypeNode, getSymbolAccessibilityDiagnostic: GetSymbolAccessibilityDiagnostic) {
            writer.getSymbolAccessibilityDiagnostic = getSymbolAccessibilityDiagnostic;
            write(": ");

            // use the checker's type, not the declared type,
            // for non-optional initialized parameters that aren't a parameter property
            const shouldUseResolverType = declaration.kind === SyntaxKind.Parameter &&
                resolver.isRequiredInitializedParameter(declaration as ParameterDeclaration);
            if (type && !shouldUseResolverType) {
                // Write the type
                emitType(type);
            }
            else {
                errorNameNode = declaration.name;
                const format = TypeFormatFlags.UseTypeOfFunction | TypeFormatFlags.UseTypeAliasValue |
                    (shouldUseResolverType ? TypeFormatFlags.AddUndefined : 0);
                resolver.writeTypeOfDeclaration(declaration, enclosingDeclaration, format, writer);
                errorNameNode = undefined;
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
                errorNameNode = signature.name;
                resolver.writeReturnTypeOfSignatureDeclaration(signature, enclosingDeclaration, TypeFormatFlags.UseTypeOfFunction | TypeFormatFlags.UseTypeAliasValue, writer);
                errorNameNode = undefined;
            }
        }

        function emitLines(nodes: Node[]) {
            for (const node of nodes) {
                emit(node);
            }
        }

        function emitSeparatedList(nodes: Node[], separator: string, eachNodeEmitFn: (node: Node) => void, canEmitFn?: (node: Node) => boolean) {
            let currentWriterPos = writer.getTextPos();
            for (const node of nodes) {
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
                const jsDocComments = getJSDocCommentRanges(declaration, currentText);
                emitNewLineBeforeLeadingComments(currentLineMap, writer, declaration, jsDocComments);
                // jsDoc comments are emitted at /*leading comment1 */space/*leading comment*/space
                emitComments(currentText, currentLineMap, writer, jsDocComments, /*leadingSeparator*/ false, /*trailingSeparator*/ true, newLine, writeCommentRange);
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
                case SyntaxKind.ObjectKeyword:
                case SyntaxKind.SymbolKeyword:
                case SyntaxKind.VoidKeyword:
                case SyntaxKind.UndefinedKeyword:
                case SyntaxKind.NullKeyword:
                case SyntaxKind.NeverKeyword:
                case SyntaxKind.ThisType:
                case SyntaxKind.LiteralType:
                    return writeTextOfNode(currentText, type);
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
                case SyntaxKind.TypeOperator:
                    return emitTypeOperator(<TypeOperatorNode>type);
                case SyntaxKind.IndexedAccessType:
                    return emitIndexedAccessType(<IndexedAccessTypeNode>type);
                case SyntaxKind.MappedType:
                    return emitMappedType(<MappedTypeNode>type);
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
                    writeTextOfNode(currentText, entityName);
                }
                else {
                    const left = entityName.kind === SyntaxKind.QualifiedName ? (<QualifiedName>entityName).left : (<PropertyAccessExpression>entityName).expression;
                    const right = entityName.kind === SyntaxKind.QualifiedName ? (<QualifiedName>entityName).right : (<PropertyAccessExpression>entityName).name;
                    writeEntityName(left);
                    write(".");
                    writeTextOfNode(currentText, right);
                }
            }

            function emitEntityName(entityName: EntityNameOrEntityNameExpression) {
                const visibilityResult = resolver.isEntityNameVisible(entityName,
                    // Aliases can be written asynchronously so use correct enclosing declaration
                    entityName.parent.kind === SyntaxKind.ImportEqualsDeclaration ? entityName.parent : enclosingDeclaration);

                handleSymbolAccessibilityError(visibilityResult);
                recordTypeReferenceDirectivesIfNecessary(resolver.getTypeReferenceDirectivesForEntityName(entityName));
                writeEntityName(entityName);
            }

            function emitExpressionWithTypeArguments(node: ExpressionWithTypeArguments) {
                if (isEntityNameExpression(node.expression)) {
                    Debug.assert(node.expression.kind === SyntaxKind.Identifier || node.expression.kind === SyntaxKind.PropertyAccessExpression);
                    emitEntityName(node.expression);
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
                writeTextOfNode(currentText, type.parameterName);
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

            function emitTypeOperator(type: TypeOperatorNode) {
                write(tokenToString(type.operator));
                write(" ");
                emitType(type.type);
            }

            function emitIndexedAccessType(node: IndexedAccessTypeNode) {
                emitType(node.objectType);
                write("[");
                emitType(node.indexType);
                write("]");
            }

            function emitMappedType(node: MappedTypeNode) {
                const prevEnclosingDeclaration = enclosingDeclaration;
                enclosingDeclaration = node;
                write("{");
                writeLine();
                increaseIndent();
                if (node.readonlyToken) {
                    write("readonly ");
                }
                write("[");
                writeEntityName(node.typeParameter.name);
                write(" in ");
                emitType(node.typeParameter.constraint);
                write("]");
                if (node.questionToken) {
                    write("?");
                }
                write(": ");
                emitType(node.type);
                write(";");
                writeLine();
                decreaseIndent();
                write("}");
                enclosingDeclaration = prevEnclosingDeclaration;
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
            currentText = node.text;
            currentLineMap = getLineStarts(node);
            currentIdentifiers = node.identifiers;
            isCurrentFileExternalModule = isExternalModule(node);
            enclosingDeclaration = node;
            emitDetachedComments(currentText, currentLineMap, writer, writeCommentRange, node, newLine, /*removeComents*/ true);
            emitLines(node.statements);
        }

        // Return a temp variable name to be used in `export default`/`export class ... extends` statements.
        // The temp name will be of the form _default_counter.
        // Note that export default is only allowed at most once in a module, so we
        // do not need to keep track of created temp names.
        function getExportTempVariableName(baseName: string): string {
            if (!currentIdentifiers.has(baseName)) {
                return baseName;
            }
            let count = 0;
            while (true) {
                count++;
                const name = baseName + "_" + count;
                if (!currentIdentifiers.has(name)) {
                    return name;
                }
            }
        }

        function emitTempVariableDeclaration(expr: Expression, baseName: string, diagnostic: SymbolAccessibilityDiagnostic, needsDeclare: boolean): string {
            const tempVarName = getExportTempVariableName(baseName);
            if (needsDeclare) {
                write("declare ");
            }
            write("const ");
            write(tempVarName);
            write(": ");
            writer.getSymbolAccessibilityDiagnostic = () => diagnostic;
            resolver.writeTypeOfExpression(expr, enclosingDeclaration, TypeFormatFlags.UseTypeOfFunction | TypeFormatFlags.UseTypeAliasValue, writer);
            write(";");
            writeLine();
            return tempVarName;
        }

        function emitExportAssignment(node: ExportAssignment) {
            if (node.expression.kind === SyntaxKind.Identifier) {
                write(node.isExportEquals ? "export = " : "export default ");
                writeTextOfNode(currentText, node.expression);
            }
            else {
                const tempVarName = emitTempVariableDeclaration(node.expression, "_default", {
                    diagnosticMessage: Diagnostics.Default_export_of_the_module_has_or_is_using_private_name_0,
                    errorNode: node
                }, needsDeclare);
                write(node.isExportEquals ? "export = " : "export default ");
                write(tempVarName);
            }
            write(";");
            writeLine();

            // Make all the declarations visible for the export name
            if (node.expression.kind === SyntaxKind.Identifier) {
                const nodes = resolver.collectLinkedAliases(<Identifier>node.expression);

                // write each of these declarations asynchronously
                writeAsynchronousModuleElements(nodes);
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
                (node.parent.kind === SyntaxKind.SourceFile && isCurrentFileExternalModule)) {
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
                        const importDeclaration = <ImportDeclaration>node;
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
            if (node.parent.kind === SyntaxKind.SourceFile) {
                const modifiers = getModifierFlags(node);
                // If the node is exported
                if (modifiers & ModifierFlags.Export) {
                    write("export ");
                }

                if (modifiers & ModifierFlags.Default) {
                    write("default ");
                }
                else if (node.kind !== SyntaxKind.InterfaceDeclaration && needsDeclare) {
                    write("declare ");
                }
            }
        }

        function emitClassMemberDeclarationFlags(flags: ModifierFlags) {
            if (flags & ModifierFlags.Private) {
                write("private ");
            }
            else if (flags & ModifierFlags.Protected) {
                write("protected ");
            }

            if (flags & ModifierFlags.Static) {
                write("static ");
            }
            if (flags & ModifierFlags.Readonly) {
                write("readonly ");
            }
            if (flags & ModifierFlags.Abstract) {
                write("abstract ");
            }
        }

        function writeImportEqualsDeclaration(node: ImportEqualsDeclaration) {
            // note usage of writer. methods instead of aliases created, just to make sure we are using
            // correct writer especially to handle asynchronous alias writing
            emitJsDocComments(node);
            if (hasModifier(node, ModifierFlags.Export)) {
                write("export ");
            }
            write("import ");
            writeTextOfNode(currentText, node.name);
            write(" = ");
            if (isInternalModuleImportEqualsDeclaration(node)) {
                emitTypeWithNewGetSymbolAccessibilityDiagnostic(<EntityName>node.moduleReference, getImportEntityNameVisibilityError);
                write(";");
            }
            else {
                write("require(");
                emitExternalModuleSpecifier(node);
                write(");");
            }
            writer.writeLine();

            function getImportEntityNameVisibilityError(): SymbolAccessibilityDiagnostic {
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
            emitJsDocComments(node);
            if (hasModifier(node, ModifierFlags.Export)) {
                write("export ");
            }
            write("import ");
            if (node.importClause) {
                const currentWriterPos = writer.getTextPos();
                if (node.importClause.name && resolver.isDeclarationVisible(node.importClause)) {
                    writeTextOfNode(currentText, node.importClause.name);
                }
                if (node.importClause.namedBindings && isVisibleNamedBinding(node.importClause.namedBindings)) {
                    if (currentWriterPos !== writer.getTextPos()) {
                        // If the default binding was emitted, write the separated
                        write(", ");
                    }
                    if (node.importClause.namedBindings.kind === SyntaxKind.NamespaceImport) {
                        write("* as ");
                        writeTextOfNode(currentText, (<NamespaceImport>node.importClause.namedBindings).name);
                    }
                    else {
                        write("{ ");
                        emitCommaList((<NamedImports>node.importClause.namedBindings).elements, emitImportOrExportSpecifier, resolver.isDeclarationVisible);
                        write(" }");
                    }
                }
                write(" from ");
            }
            emitExternalModuleSpecifier(node);
            write(";");
            writer.writeLine();
        }

        function emitExternalModuleSpecifier(parent: ImportEqualsDeclaration | ImportDeclaration | ExportDeclaration | ModuleDeclaration) {
            // emitExternalModuleSpecifier is usually called when we emit something in the.d.ts file that will make it an external module (i.e. import/export declarations).
            // the only case when it is not true is when we call it to emit correct name for module augmentation - d.ts files with just module augmentations are not considered
            // external modules since they are indistinguishable from script files with ambient modules. To fix this in such d.ts files we'll emit top level 'export {}'
            // so compiler will treat them as external modules.
            resultHasExternalModuleIndicator = resultHasExternalModuleIndicator || parent.kind !== SyntaxKind.ModuleDeclaration;
            let moduleSpecifier: Node;
            if (parent.kind === SyntaxKind.ImportEqualsDeclaration) {
                const node = parent as ImportEqualsDeclaration;
                moduleSpecifier = getExternalModuleImportEqualsDeclarationExpression(node);
            }
            else if (parent.kind === SyntaxKind.ModuleDeclaration) {
                moduleSpecifier = (<ModuleDeclaration>parent).name;
            }
            else {
                const node = parent as (ImportDeclaration | ExportDeclaration);
                moduleSpecifier = node.moduleSpecifier;
            }

            if (moduleSpecifier.kind === SyntaxKind.StringLiteral && isBundledEmit && (compilerOptions.out || compilerOptions.outFile)) {
                const moduleName = getExternalModuleNameFromDeclaration(host, resolver, parent);
                if (moduleName) {
                    write('"');
                    write(moduleName);
                    write('"');
                    return;
                }
            }

            writeTextOfNode(currentText, moduleSpecifier);
        }

        function emitImportOrExportSpecifier(node: ImportOrExportSpecifier) {
            if (node.propertyName) {
                writeTextOfNode(currentText, node.propertyName);
                write(" as ");
            }
            writeTextOfNode(currentText, node.name);
        }

        function emitExportSpecifier(node: ExportSpecifier) {
            emitImportOrExportSpecifier(node);

            // Make all the declarations visible for the export name
            const nodes = resolver.collectLinkedAliases(node.propertyName || node.name);

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
                emitExternalModuleSpecifier(node);
            }
            write(";");
            writer.writeLine();
        }

        function writeModuleDeclaration(node: ModuleDeclaration) {
            emitJsDocComments(node);
            emitModuleElementDeclarationFlags(node);
            if (isGlobalScopeAugmentation(node)) {
                write("global ");
            }
            else {
                if (node.flags & NodeFlags.Namespace) {
                    write("namespace ");
                }
                else {
                    write("module ");
                }
                if (isExternalModuleAugmentation(node)) {
                    emitExternalModuleSpecifier(node);
                }
                else {
                    writeTextOfNode(currentText, node.name);
                }
            }
            while (node.body && node.body.kind !== SyntaxKind.ModuleBlock) {
                node = <ModuleDeclaration>node.body;
                write(".");
                writeTextOfNode(currentText, node.name);
            }
            const prevEnclosingDeclaration = enclosingDeclaration;
            if (node.body) {
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
            else {
                write(";");
            }
        }

        function writeTypeAliasDeclaration(node: TypeAliasDeclaration) {
            const prevEnclosingDeclaration = enclosingDeclaration;
            enclosingDeclaration = node;
            emitJsDocComments(node);
            emitModuleElementDeclarationFlags(node);
            write("type ");
            writeTextOfNode(currentText, node.name);
            emitTypeParameters(node.typeParameters);
            write(" = ");
            emitTypeWithNewGetSymbolAccessibilityDiagnostic(node.type, getTypeAliasDeclarationVisibilityError);
            write(";");
            writeLine();
            enclosingDeclaration = prevEnclosingDeclaration;

            function getTypeAliasDeclarationVisibilityError(): SymbolAccessibilityDiagnostic {
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
            writeTextOfNode(currentText, node.name);
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
            writeTextOfNode(currentText, node.name);
            const enumMemberValue = resolver.getConstantValue(node);
            if (enumMemberValue !== undefined) {
                write(" = ");
                write(getTextOfConstantValue(enumMemberValue));
            }
            write(",");
            writeLine();
        }

        function isPrivateMethodTypeParameter(node: TypeParameterDeclaration) {
            return node.parent.kind === SyntaxKind.MethodDeclaration && hasModifier(node.parent, ModifierFlags.Private);
        }

        function emitTypeParameters(typeParameters: TypeParameterDeclaration[]) {
            function emitTypeParameter(node: TypeParameterDeclaration) {
                increaseIndent();
                emitJsDocComments(node);
                decreaseIndent();
                writeTextOfNode(currentText, node.name);
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
                if (node.default && !isPrivateMethodTypeParameter(node)) {
                    write(" = ");
                    if (node.parent.kind === SyntaxKind.FunctionType ||
                        node.parent.kind === SyntaxKind.ConstructorType ||
                        (node.parent.parent && node.parent.parent.kind === SyntaxKind.TypeLiteral)) {
                        Debug.assert(node.parent.kind === SyntaxKind.MethodDeclaration ||
                            node.parent.kind === SyntaxKind.MethodSignature ||
                            node.parent.kind === SyntaxKind.FunctionType ||
                            node.parent.kind === SyntaxKind.ConstructorType ||
                            node.parent.kind === SyntaxKind.CallSignature ||
                            node.parent.kind === SyntaxKind.ConstructSignature);
                        emitType(node.default);
                    }
                    else {
                        emitTypeWithNewGetSymbolAccessibilityDiagnostic(node.default, getTypeParameterConstraintVisibilityError);
                    }
                }

                function getTypeParameterConstraintVisibilityError(): SymbolAccessibilityDiagnostic {
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
                            if (hasModifier(node.parent, ModifierFlags.Static)) {
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

                        case SyntaxKind.TypeAliasDeclaration:
                            diagnosticMessage = Diagnostics.Type_parameter_0_of_exported_type_alias_has_or_is_using_private_name_1;
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
                if (isEntityNameExpression(node.expression)) {
                    emitTypeWithNewGetSymbolAccessibilityDiagnostic(node, getHeritageClauseVisibilityError);
                }
                else if (!isImplementsList && node.expression.kind === SyntaxKind.NullKeyword) {
                    write("null");
                }

                function getHeritageClauseVisibilityError(): SymbolAccessibilityDiagnostic {
                    let diagnosticMessage: DiagnosticMessage;
                    // Heritage clause is written by user so it can always be named
                    if (node.parent.parent.kind === SyntaxKind.ClassDeclaration) {
                        // Class or Interface implemented/extended is inaccessible
                        diagnosticMessage = isImplementsList ?
                            Diagnostics.Implements_clause_of_exported_class_0_has_or_is_using_private_name_1 :
                            Diagnostics.extends_clause_of_exported_class_0_has_or_is_using_private_name_1;
                    }
                    else {
                        // interface is inaccessible
                        diagnosticMessage = Diagnostics.extends_clause_of_exported_interface_0_has_or_is_using_private_name_1;
                    }

                    return {
                        diagnosticMessage,
                        errorNode: node,
                        typeName: getNameOfDeclaration(node.parent.parent)
                    };
                }
            }
        }

        function writeClassDeclaration(node: ClassDeclaration) {
            function emitParameterProperties(constructorDeclaration: ConstructorDeclaration) {
                if (constructorDeclaration) {
                    forEach(constructorDeclaration.parameters, param => {
                        if (hasModifier(param, ModifierFlags.ParameterPropertyModifier)) {
                            emitPropertyDeclaration(param);
                        }
                    });
                }
            }

            const prevEnclosingDeclaration = enclosingDeclaration;
            enclosingDeclaration = node;
            const baseTypeNode = getClassExtendsHeritageClauseElement(node);
            let tempVarName: string;
            if (baseTypeNode && !isEntityNameExpression(baseTypeNode.expression)) {
                tempVarName = baseTypeNode.expression.kind === SyntaxKind.NullKeyword ?
                    "null" :
                    emitTempVariableDeclaration(baseTypeNode.expression, `${node.name.text}_base`, {
                        diagnosticMessage: Diagnostics.extends_clause_of_exported_class_0_has_or_is_using_private_name_1,
                        errorNode: baseTypeNode,
                        typeName: node.name
                    }, !findAncestor(node, n => n.kind === SyntaxKind.ModuleDeclaration));
            }

            emitJsDocComments(node);
            emitModuleElementDeclarationFlags(node);
            if (hasModifier(node, ModifierFlags.Abstract)) {
                write("abstract ");
            }
            write("class ");
            writeTextOfNode(currentText, node.name);
            emitTypeParameters(node.typeParameters);
            if (baseTypeNode) {
                if (!isEntityNameExpression(baseTypeNode.expression)) {
                    write(" extends ");
                    write(tempVarName);
                    if (baseTypeNode.typeArguments) {
                        write("<");
                        emitCommaList(baseTypeNode.typeArguments, emitType);
                        write(">");
                    }
                }
                else  {
                    emitHeritageClause([baseTypeNode], /*isImplementsList*/ false);
                }
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
            writeTextOfNode(currentText, node.name);
            const prevEnclosingDeclaration = enclosingDeclaration;
            enclosingDeclaration = node;
            emitTypeParameters(node.typeParameters);
            const interfaceExtendsTypes = filter(getInterfaceBaseTypeNodes(node), base => isEntityNameExpression(base.expression));
            if (interfaceExtendsTypes && interfaceExtendsTypes.length) {
                emitHeritageClause(interfaceExtendsTypes, /*isImplementsList*/ false);
            }
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
            emitClassMemberDeclarationFlags(getModifierFlags(node));
            emitVariableDeclaration(<VariableDeclaration>node);
            write(";");
            writeLine();
        }

        function emitVariableDeclaration(node: VariableDeclaration | PropertyDeclaration | PropertySignature | ParameterDeclaration) {
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
                    writeTextOfNode(currentText, node.name);
                    // If optional property emit ? but in the case of parameterProperty declaration with "?" indicating optional parameter for the constructor
                    // we don't want to emit property declaration with "?"
                    if ((node.kind === SyntaxKind.PropertyDeclaration || node.kind === SyntaxKind.PropertySignature ||
                        (node.kind === SyntaxKind.Parameter && !isParameterPropertyDeclaration(<ParameterDeclaration>node))) && hasQuestionToken(node)) {
                        write("?");
                    }
                    if ((node.kind === SyntaxKind.PropertyDeclaration || node.kind === SyntaxKind.PropertySignature) && node.parent.kind === SyntaxKind.TypeLiteral) {
                        emitTypeOfVariableDeclarationFromTypeLiteral(node);
                    }
                    else if (resolver.isLiteralConstDeclaration(node)) {
                        write(" = ");
                        resolver.writeLiteralConstValue(node, writer);
                    }
                    else if (!hasModifier(node, ModifierFlags.Private)) {
                        writeTypeOfDeclaration(node, node.type, getVariableDeclarationTypeVisibilityError);
                    }
                }
            }

            function getVariableDeclarationTypeVisibilityDiagnosticMessage(symbolAccessibilityResult: SymbolAccessibilityResult) {
                if (node.kind === SyntaxKind.VariableDeclaration) {
                    return symbolAccessibilityResult.errorModuleName ?
                        symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                            Diagnostics.Exported_variable_0_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                            Diagnostics.Exported_variable_0_has_or_is_using_name_1_from_private_module_2 :
                        Diagnostics.Exported_variable_0_has_or_is_using_private_name_1;
                }
                // This check is to ensure we don't report error on constructor parameter property as that error would be reported during parameter emit
                // The only exception here is if the constructor was marked as private. we are not emitting the constructor parameters at all.
                else if (node.kind === SyntaxKind.PropertyDeclaration || node.kind === SyntaxKind.PropertySignature ||
                    (node.kind === SyntaxKind.Parameter && hasModifier(node.parent, ModifierFlags.Private))) {
                    // TODO(jfreeman): Deal with computed properties in error reporting.
                    if (hasModifier(node, ModifierFlags.Static)) {
                        return symbolAccessibilityResult.errorModuleName ?
                            symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                                Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                                Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_private_name_1;
                    }
                    else if (node.parent.kind === SyntaxKind.ClassDeclaration || node.kind === SyntaxKind.Parameter) {
                        return symbolAccessibilityResult.errorModuleName ?
                            symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                                Diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                                Diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Public_property_0_of_exported_class_has_or_is_using_private_name_1;
                    }
                    else {
                        // Interfaces cannot have types that cannot be named
                        return symbolAccessibilityResult.errorModuleName ?
                            Diagnostics.Property_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Property_0_of_exported_interface_has_or_is_using_private_name_1;
                    }
                }
            }

            function getVariableDeclarationTypeVisibilityError(symbolAccessibilityResult: SymbolAccessibilityResult): SymbolAccessibilityDiagnostic {
                const diagnosticMessage = getVariableDeclarationTypeVisibilityDiagnosticMessage(symbolAccessibilityResult);
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
                const elements: Node[] = [];
                for (const element of bindingPattern.elements) {
                    if (element.kind !== SyntaxKind.OmittedExpression) {
                        elements.push(element);
                    }
                }
                emitCommaList(elements, emitBindingElement);
            }

            function emitBindingElement(bindingElement: BindingElement) {
                function getBindingElementTypeVisibilityError(symbolAccessibilityResult: SymbolAccessibilityResult): SymbolAccessibilityDiagnostic {
                    const diagnosticMessage = getVariableDeclarationTypeVisibilityDiagnosticMessage(symbolAccessibilityResult);
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
                        writeTextOfNode(currentText, bindingElement.name);
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

            const accessors = getAllAccessorDeclarations((<ClassDeclaration>node.parent).members, node);
            let accessorWithTypeAnnotation: AccessorDeclaration;

            if (node === accessors.firstAccessor) {
                emitJsDocComments(accessors.getAccessor);
                emitJsDocComments(accessors.setAccessor);
                emitClassMemberDeclarationFlags(getModifierFlags(node) | (accessors.setAccessor ? 0 : ModifierFlags.Readonly));
                writeTextOfNode(currentText, node.name);
                if (!hasModifier(node, ModifierFlags.Private)) {
                    accessorWithTypeAnnotation = node;
                    let type = getTypeAnnotationFromAccessor(node);
                    if (!type) {
                        // couldn't get type for the first accessor, try the another one
                        const anotherAccessor = node.kind === SyntaxKind.GetAccessor ? accessors.setAccessor : accessors.getAccessor;
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

            function getAccessorDeclarationTypeVisibilityError(symbolAccessibilityResult: SymbolAccessibilityResult): SymbolAccessibilityDiagnostic {
                let diagnosticMessage: DiagnosticMessage;
                if (accessorWithTypeAnnotation.kind === SyntaxKind.SetAccessor) {
                    // Setters have to have type named and cannot infer it so, the type should always be named
                    if (hasModifier(accessorWithTypeAnnotation.parent, ModifierFlags.Static)) {
                        diagnosticMessage = symbolAccessibilityResult.errorModuleName ?
                            Diagnostics.Parameter_0_of_public_static_property_setter_from_exported_class_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Parameter_0_of_public_static_property_setter_from_exported_class_has_or_is_using_private_name_1;
                    }
                    else {
                        diagnosticMessage = symbolAccessibilityResult.errorModuleName ?
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
                    if (hasModifier(accessorWithTypeAnnotation, ModifierFlags.Static)) {
                        diagnosticMessage = symbolAccessibilityResult.errorModuleName ?
                            symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                                Diagnostics.Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named :
                                Diagnostics.Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_name_0_from_private_module_1 :
                            Diagnostics.Return_type_of_public_static_property_getter_from_exported_class_has_or_is_using_private_name_0;
                    }
                    else {
                        diagnosticMessage = symbolAccessibilityResult.errorModuleName ?
                            symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
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
                else if (node.kind === SyntaxKind.MethodDeclaration || node.kind === SyntaxKind.Constructor) {
                    emitClassMemberDeclarationFlags(getModifierFlags(node));
                }
                if (node.kind === SyntaxKind.FunctionDeclaration) {
                    write("function ");
                    writeTextOfNode(currentText, node.name);
                }
                else if (node.kind === SyntaxKind.Constructor) {
                    write("constructor");
                }
                else {
                    writeTextOfNode(currentText, node.name);
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
            const prevEnclosingDeclaration = enclosingDeclaration;
            enclosingDeclaration = node;
            let closeParenthesizedFunctionType = false;

            if (node.kind === SyntaxKind.IndexSignature) {
                // Index signature can have readonly modifier
                emitClassMemberDeclarationFlags(getModifierFlags(node));
                write("[");
            }
            else {
                if (node.kind === SyntaxKind.Constructor && hasModifier(node, ModifierFlags.Private)) {
                    write("();");
                    writeLine();
                    return;
                }
                // Construct signature or constructor type write new Signature
                if (node.kind === SyntaxKind.ConstructSignature || node.kind === SyntaxKind.ConstructorType) {
                    write("new ");
                }
                else if (node.kind === SyntaxKind.FunctionType) {
                    const currentOutput = writer.getText();
                    // Do not generate incorrect type when function type with type parameters is type argument
                    // This could happen if user used space between two '<' making it error free
                    // e.g var x: A< <Tany>(a: Tany)=>Tany>;
                    if (node.typeParameters && currentOutput.charAt(currentOutput.length - 1) === "<") {
                        closeParenthesizedFunctionType = true;
                        write("(");
                    }
                }
                emitTypeParameters(node.typeParameters);
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
            const isFunctionTypeOrConstructorType = node.kind === SyntaxKind.FunctionType || node.kind === SyntaxKind.ConstructorType;
            if (isFunctionTypeOrConstructorType || node.parent.kind === SyntaxKind.TypeLiteral) {
                // Emit type literal signature return type only if specified
                if (node.type) {
                    write(isFunctionTypeOrConstructorType ? " => " : ": ");
                    emitType(node.type);
                }
            }
            else if (node.kind !== SyntaxKind.Constructor && !hasModifier(node, ModifierFlags.Private)) {
                writeReturnTypeAtSignature(node, getReturnTypeVisibilityError);
            }

            enclosingDeclaration = prevEnclosingDeclaration;

            if (!isFunctionTypeOrConstructorType) {
                write(";");
                writeLine();
            }
            else if (closeParenthesizedFunctionType) {
                write(")");
            }

            function getReturnTypeVisibilityError(symbolAccessibilityResult: SymbolAccessibilityResult): SymbolAccessibilityDiagnostic {
                let diagnosticMessage: DiagnosticMessage;
                switch (node.kind) {
                    case SyntaxKind.ConstructSignature:
                        // Interfaces cannot have return types that cannot be named
                        diagnosticMessage = symbolAccessibilityResult.errorModuleName ?
                            Diagnostics.Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1 :
                            Diagnostics.Return_type_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_0;
                        break;

                    case SyntaxKind.CallSignature:
                        // Interfaces cannot have return types that cannot be named
                        diagnosticMessage = symbolAccessibilityResult.errorModuleName ?
                            Diagnostics.Return_type_of_call_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1 :
                            Diagnostics.Return_type_of_call_signature_from_exported_interface_has_or_is_using_private_name_0;
                        break;

                    case SyntaxKind.IndexSignature:
                        // Interfaces cannot have return types that cannot be named
                        diagnosticMessage = symbolAccessibilityResult.errorModuleName ?
                            Diagnostics.Return_type_of_index_signature_from_exported_interface_has_or_is_using_name_0_from_private_module_1 :
                            Diagnostics.Return_type_of_index_signature_from_exported_interface_has_or_is_using_private_name_0;
                        break;

                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.MethodSignature:
                        if (hasModifier(node, ModifierFlags.Static)) {
                            diagnosticMessage = symbolAccessibilityResult.errorModuleName ?
                                symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                                    Diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named :
                                    Diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_name_0_from_private_module_1 :
                                Diagnostics.Return_type_of_public_static_method_from_exported_class_has_or_is_using_private_name_0;
                        }
                        else if (node.parent.kind === SyntaxKind.ClassDeclaration) {
                            diagnosticMessage = symbolAccessibilityResult.errorModuleName ?
                                symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                                    Diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_external_module_1_but_cannot_be_named :
                                    Diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_name_0_from_private_module_1 :
                                Diagnostics.Return_type_of_public_method_from_exported_class_has_or_is_using_private_name_0;
                        }
                        else {
                            // Interfaces cannot have return types that cannot be named
                            diagnosticMessage = symbolAccessibilityResult.errorModuleName ?
                                Diagnostics.Return_type_of_method_from_exported_interface_has_or_is_using_name_0_from_private_module_1 :
                                Diagnostics.Return_type_of_method_from_exported_interface_has_or_is_using_private_name_0;
                        }
                        break;

                    case SyntaxKind.FunctionDeclaration:
                        diagnosticMessage = symbolAccessibilityResult.errorModuleName ?
                            symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
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
                writeTextOfNode(currentText, node.name);
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
            else if (!hasModifier(node.parent, ModifierFlags.Private)) {
                writeTypeOfDeclaration(node, node.type, getParameterDeclarationTypeVisibilityError);
            }

            function getParameterDeclarationTypeVisibilityError(symbolAccessibilityResult: SymbolAccessibilityResult): SymbolAccessibilityDiagnostic {
                const diagnosticMessage: DiagnosticMessage = getParameterDeclarationTypeVisibilityDiagnosticMessage(symbolAccessibilityResult);
                return diagnosticMessage !== undefined ? {
                    diagnosticMessage,
                    errorNode: node,
                    typeName: node.name
                } : undefined;
            }

            function getParameterDeclarationTypeVisibilityDiagnosticMessage(symbolAccessibilityResult: SymbolAccessibilityResult): DiagnosticMessage {
                switch (node.parent.kind) {
                    case SyntaxKind.Constructor:
                        return symbolAccessibilityResult.errorModuleName ?
                            symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                                Diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                                Diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Parameter_0_of_constructor_from_exported_class_has_or_is_using_private_name_1;

                    case SyntaxKind.ConstructSignature:
                        // Interfaces cannot have parameter types that cannot be named
                        return symbolAccessibilityResult.errorModuleName ?
                            Diagnostics.Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Parameter_0_of_constructor_signature_from_exported_interface_has_or_is_using_private_name_1;

                    case SyntaxKind.CallSignature:
                        // Interfaces cannot have parameter types that cannot be named
                        return symbolAccessibilityResult.errorModuleName ?
                            Diagnostics.Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Parameter_0_of_call_signature_from_exported_interface_has_or_is_using_private_name_1;

                    case SyntaxKind.IndexSignature:
                        // Interfaces cannot have parameter types that cannot be named
                        return symbolAccessibilityResult.errorModuleName ?
                            Diagnostics.Parameter_0_of_index_signature_from_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                            Diagnostics.Parameter_0_of_index_signature_from_exported_interface_has_or_is_using_private_name_1;

                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.MethodSignature:
                        if (hasModifier(node.parent, ModifierFlags.Static)) {
                            return symbolAccessibilityResult.errorModuleName ?
                                symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                                    Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                                    Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_name_1_from_private_module_2 :
                                Diagnostics.Parameter_0_of_public_static_method_from_exported_class_has_or_is_using_private_name_1;
                        }
                        else if (node.parent.parent.kind === SyntaxKind.ClassDeclaration) {
                             return symbolAccessibilityResult.errorModuleName ?
                                symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                                    Diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                                    Diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_name_1_from_private_module_2 :
                                Diagnostics.Parameter_0_of_public_method_from_exported_class_has_or_is_using_private_name_1;
                        }
                        else {
                            // Interfaces cannot have parameter types that cannot be named
                            return symbolAccessibilityResult.errorModuleName ?
                                Diagnostics.Parameter_0_of_method_from_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                                Diagnostics.Parameter_0_of_method_from_exported_interface_has_or_is_using_private_name_1;
                        }

                    case SyntaxKind.FunctionDeclaration:
                        return symbolAccessibilityResult.errorModuleName ?
                            symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
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
                    const elements = bindingPattern.elements;
                    emitCommaList(elements, emitBindingElement);
                    if (elements && elements.hasTrailingComma) {
                        write(", ");
                    }
                    write("]");
                }
            }

            function emitBindingElement(bindingElement: BindingElement | OmittedExpression) {
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
                        writeTextOfNode(currentText, bindingElement.propertyName);
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
                            writeTextOfNode(currentText, bindingElement.name);
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

        /**
         * Adds the reference to referenced file, returns true if global file reference was emitted
         * @param referencedFile
         * @param addBundledFileReference Determines if global file reference corresponding to bundled file should be emitted or not
         */
        function writeReferencePath(referencedFile: SourceFile, addBundledFileReference: boolean, emitOnlyDtsFiles: boolean): boolean {
            let declFileName: string;
            let addedBundledEmitReference = false;
            if (referencedFile.isDeclarationFile) {
                // Declaration file, use declaration file name
                declFileName = referencedFile.fileName;
            }
            else {
                // Get the declaration file path
                forEachEmittedFile(host, getDeclFileName, referencedFile, emitOnlyDtsFiles);
            }

            if (declFileName) {
                declFileName = getRelativePathToDirectoryOrUrl(
                    getDirectoryPath(normalizeSlashes(declarationFilePath)),
                    declFileName,
                    host.getCurrentDirectory(),
                    host.getCanonicalFileName,
                    /*isAbsolutePathAnUrl*/ false);

                referencesOutput += `/// <reference path="${declFileName}" />${newLine}`;
            }
            return addedBundledEmitReference;

            function getDeclFileName(emitFileNames: EmitFileNames, sourceFileOrBundle: SourceFile | Bundle) {
                // Dont add reference path to this file if it is a bundled emit and caller asked not emit bundled file path
                const isBundledEmit = sourceFileOrBundle.kind === SyntaxKind.Bundle;
                if (isBundledEmit && !addBundledFileReference) {
                    return;
                }

                Debug.assert(!!emitFileNames.declarationFilePath || isSourceFileJavaScript(referencedFile), "Declaration file is not present only for javascript files");
                declFileName = emitFileNames.declarationFilePath || emitFileNames.jsFilePath;
                addedBundledEmitReference = isBundledEmit;
            }
        }
    }

    /* @internal */
    export function writeDeclarationFile(declarationFilePath: string, sourceFileOrBundle: SourceFile | Bundle, host: EmitHost, resolver: EmitResolver, emitterDiagnostics: DiagnosticCollection, emitOnlyDtsFiles: boolean) {
        const emitDeclarationResult = emitDeclarations(host, resolver, emitterDiagnostics, declarationFilePath, sourceFileOrBundle, emitOnlyDtsFiles);
        const emitSkipped = emitDeclarationResult.reportedDeclarationError || host.isEmitBlocked(declarationFilePath) || host.getCompilerOptions().noEmit;
        if (!emitSkipped) {
            const sourceFiles = sourceFileOrBundle.kind === SyntaxKind.Bundle ? sourceFileOrBundle.sourceFiles : [sourceFileOrBundle];
            const declarationOutput = emitDeclarationResult.referencesOutput
                + getDeclarationOutput(emitDeclarationResult.synchronousDeclarationOutput, emitDeclarationResult.moduleElementDeclarationEmitInfo);
            writeFile(host, emitterDiagnostics, declarationFilePath, declarationOutput, host.getCompilerOptions().emitBOM, sourceFiles);
        }
        return emitSkipped;

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
