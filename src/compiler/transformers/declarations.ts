/*@internal*/
namespace ts {
    export function getDeclarationDiagnostics(host: EmitHost, resolver: EmitResolver, file: SourceFile | undefined): Diagnostic[] {
        if (file && isSourceFileJavaScript(file)) {
            return []; // No declaration diagnostics for js for now
        }
        const compilerOptions = host.getCompilerOptions();
        const result = transformNodes(resolver, host, compilerOptions, file ? [file] : filter(host.getSourceFiles(), isSourceFileNotJavaScript), [transformDeclarations], /*allowDtsFiles*/ false);
        return result.diagnostics;
    }

    const declarationEmitNodeBuilderFlags =
        NodeBuilderFlags.MultilineObjectLiterals |
        TypeFormatFlags.WriteClassExpressionAsTypeLiteral |
        NodeBuilderFlags.UseTypeOfFunction |
        NodeBuilderFlags.UseStructuralFallback |
        NodeBuilderFlags.AllowEmptyTuple |
        NodeBuilderFlags.GenerateNamesForShadowedTypeParams;

    /**
     * Transforms a ts file into a .d.ts file
     * This process requires type information, which is retrieved through the emit resolver. Because of this,
     * in many places this transformer assumes it will be operating on parse tree nodes directly.
     * This means that _no transforms should be allowed to occur before this one_.
     */
    export function transformDeclarations(context: TransformationContext) {
        const throwDiagnostic = () => Debug.fail("Diagnostic emitted without context");
        let getSymbolAccessibilityDiagnostic: GetSymbolAccessibilityDiagnostic = throwDiagnostic;
        let needsDeclare = true;
        let isBundledEmit = false;
        let resultHasExternalModuleIndicator = false;
        let needsScopeFixMarker = false;
        let resultHasScopeMarker = false;
        let enclosingDeclaration: Node;
        let necessaryTypeRefernces: Map<true>;
        let lateMarkedStatements: LateVisibilityPaintedStatement[];
        let lateStatementReplacementMap: Map<VisitResult<LateVisibilityPaintedStatement>>;
        let suppressNewDiagnosticContexts: boolean;

        const symbolTracker: SymbolTracker = {
            trackSymbol,
            reportInaccessibleThisError,
            reportInaccessibleUniqueSymbolError,
            reportPrivateInBaseOfClassExpression
        };
        let errorNameNode: DeclarationName | undefined;

        let currentSourceFile: SourceFile;
        const resolver = context.getEmitResolver();
        const options = context.getCompilerOptions();
        const newLine = getNewLineCharacter(options);
        const { noResolve, stripInternal } = options;
        const host = context.getEmitHost();
        return transformRoot;

        function recordTypeReferenceDirectivesIfNecessary(typeReferenceDirectives: string[]): void {
            if (!typeReferenceDirectives) {
                return;
            }
            necessaryTypeRefernces = necessaryTypeRefernces || createMap<true>();
            for (const ref of typeReferenceDirectives) {
                necessaryTypeRefernces.set(ref, true);
            }
        }

        function handleSymbolAccessibilityError(symbolAccessibilityResult: SymbolAccessibilityResult) {
            if (symbolAccessibilityResult.accessibility === SymbolAccessibility.Accessible) {
                // Add aliases back onto the possible imports list if they're not there so we can try them again with updated visibility info
                if (symbolAccessibilityResult && symbolAccessibilityResult.aliasesToMakeVisible) {
                    if (!lateMarkedStatements) {
                        lateMarkedStatements = symbolAccessibilityResult.aliasesToMakeVisible;
                    }
                    else {
                        for (const ref of symbolAccessibilityResult.aliasesToMakeVisible) {
                            pushIfUnique(lateMarkedStatements, ref);
                        }
                    }
                }

                // TODO: Do all these accessibility checks inside/after the first pass in the checker when declarations are enabled, if possible
            }
            else {
                // Report error
                const errorInfo = getSymbolAccessibilityDiagnostic(symbolAccessibilityResult);
                if (errorInfo) {
                    if (errorInfo.typeName) {
                        context.addDiagnostic(createDiagnosticForNode(symbolAccessibilityResult.errorNode || errorInfo.errorNode,
                            errorInfo.diagnosticMessage,
                            getTextOfNode(errorInfo.typeName),
                            symbolAccessibilityResult.errorSymbolName,
                            symbolAccessibilityResult.errorModuleName));
                    }
                    else {
                        context.addDiagnostic(createDiagnosticForNode(symbolAccessibilityResult.errorNode || errorInfo.errorNode,
                            errorInfo.diagnosticMessage,
                            symbolAccessibilityResult.errorSymbolName,
                            symbolAccessibilityResult.errorModuleName));
                    }
                }
            }
        }

        function trackSymbol(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags) {
            if (symbol.flags & SymbolFlags.TypeParameter) return;
            handleSymbolAccessibilityError(resolver.isSymbolAccessible(symbol, enclosingDeclaration, meaning, /*shouldComputeAliasesToMakeVisible*/ true));
            recordTypeReferenceDirectivesIfNecessary(resolver.getTypeReferenceDirectivesForSymbol(symbol, meaning));
        }

        function reportPrivateInBaseOfClassExpression(propertyName: string) {
            if (errorNameNode) {
                context.addDiagnostic(
                    createDiagnosticForNode(errorNameNode, Diagnostics.Property_0_of_exported_class_expression_may_not_be_private_or_protected, propertyName));
            }
        }

        function reportInaccessibleUniqueSymbolError() {
            if (errorNameNode) {
                context.addDiagnostic(createDiagnosticForNode(errorNameNode, Diagnostics.The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary,
                    declarationNameToString(errorNameNode),
                    "unique symbol"));
            }
        }

        function reportInaccessibleThisError() {
            if (errorNameNode) {
                context.addDiagnostic(createDiagnosticForNode(errorNameNode, Diagnostics.The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary,
                    declarationNameToString(errorNameNode),
                    "this"));
            }
        }

        function transformRoot(node: Bundle): Bundle;
        function transformRoot(node: SourceFile): SourceFile;
        function transformRoot(node: SourceFile | Bundle): SourceFile | Bundle;
        function transformRoot(node: SourceFile | Bundle) {
            if (node.kind === SyntaxKind.SourceFile && (node.isDeclarationFile || isSourceFileJavaScript(node))) {
                return node;
            }

            if (node.kind === SyntaxKind.Bundle) {
                isBundledEmit = true;
                const refs = createMap<SourceFile>();
                let hasNoDefaultLib = false;
                const bundle = createBundle(map(node.sourceFiles,
                    sourceFile => {
                        if (sourceFile.isDeclarationFile || isSourceFileJavaScript(sourceFile)) return; // Omit declaration files from bundle results, too
                        hasNoDefaultLib = hasNoDefaultLib || sourceFile.hasNoDefaultLib;
                        currentSourceFile = sourceFile;
                        enclosingDeclaration = sourceFile;
                        lateMarkedStatements = undefined;
                        suppressNewDiagnosticContexts = false;
                        lateStatementReplacementMap = createMap();
                        getSymbolAccessibilityDiagnostic = throwDiagnostic;
                        needsScopeFixMarker = false;
                        resultHasScopeMarker = false;
                        collectReferences(sourceFile, refs);
                        if (isExternalModule(sourceFile)) {
                            resultHasExternalModuleIndicator = false; // unused in external module bundle emit (all external modules are within module blocks, therefore are known to be modules)
                            needsDeclare = false;
                            const statements = visitNodes(sourceFile.statements, visitDeclarationStatements);
                            const newFile = updateSourceFileNode(sourceFile, [createModuleDeclaration(
                                [],
                                [createModifier(SyntaxKind.DeclareKeyword)],
                                createLiteral(getResolvedExternalModuleName(context.getEmitHost(), sourceFile)),
                                createModuleBlock(setTextRange(createNodeArray(transformAndReplaceLatePaintedStatements(statements)), sourceFile.statements))
                            )], /*isDeclarationFile*/ true, /*referencedFiles*/ [], /*typeReferences*/ [], /*hasNoDefaultLib*/ false);
                            return newFile;
                        }
                        needsDeclare = true;
                        const updated = visitNodes(sourceFile.statements, visitDeclarationStatements);
                        return updateSourceFileNode(sourceFile, transformAndReplaceLatePaintedStatements(updated), /*isDeclarationFile*/ true, /*referencedFiles*/ [], /*typeReferences*/ [], /*hasNoDefaultLib*/ false);
                    }
                ), mapDefined(node.prepends, prepend => {
                    if (prepend.kind === SyntaxKind.InputFiles) {
                        return createUnparsedSourceFile(prepend.declarationText);
                    }
                }));
                bundle.syntheticFileReferences = [];
                bundle.syntheticTypeReferences = getFileReferencesForUsedTypeReferences();
                bundle.hasNoDefaultLib = hasNoDefaultLib;
                const outputFilePath = getDirectoryPath(normalizeSlashes(getOutputPathsFor(node, host, /*forceDtsPaths*/ true).declarationFilePath));
                const referenceVisitor = mapReferencesIntoArray(bundle.syntheticFileReferences as FileReference[], outputFilePath);
                refs.forEach(referenceVisitor);
                return bundle;
            }

            // Single source file
            needsDeclare = true;
            needsScopeFixMarker = false;
            resultHasScopeMarker = false;
            enclosingDeclaration = node;
            currentSourceFile = node;
            getSymbolAccessibilityDiagnostic = throwDiagnostic;
            isBundledEmit = false;
            resultHasExternalModuleIndicator = false;
            suppressNewDiagnosticContexts = false;
            lateMarkedStatements = undefined;
            lateStatementReplacementMap = createMap();
            necessaryTypeRefernces = undefined;
            const refs = collectReferences(currentSourceFile, createMap());
            const references: FileReference[] = [];
            const outputFilePath = getDirectoryPath(normalizeSlashes(getOutputPathsFor(node, host, /*forceDtsPaths*/ true).declarationFilePath));
            const referenceVisitor = mapReferencesIntoArray(references, outputFilePath);
            refs.forEach(referenceVisitor);
            const statements = visitNodes(node.statements, visitDeclarationStatements);
            let combinedStatements = setTextRange(createNodeArray(transformAndReplaceLatePaintedStatements(statements)), node.statements);
            const emittedImports = filter(combinedStatements, isAnyImportSyntax);
            if (isExternalModule(node) && (!resultHasExternalModuleIndicator || (needsScopeFixMarker && !resultHasScopeMarker))) {
                combinedStatements = setTextRange(createNodeArray([...combinedStatements, createExportDeclaration(/*decorators*/ undefined, /*modifiers*/ undefined, createNamedExports([]), /*moduleSpecifier*/ undefined)]), combinedStatements);
            }
            const updated = updateSourceFileNode(node, combinedStatements, /*isDeclarationFile*/ true, references, getFileReferencesForUsedTypeReferences(), node.hasNoDefaultLib);
            return updated;

            function getFileReferencesForUsedTypeReferences() {
                return necessaryTypeRefernces ? mapDefined(arrayFrom(necessaryTypeRefernces.keys()), getFileReferenceForTypeName) : [];
            }

            function getFileReferenceForTypeName(typeName: string): FileReference | undefined {
                // Elide type references for which we have imports
                for (const importStatement of emittedImports) {
                    if (isImportEqualsDeclaration(importStatement) && isExternalModuleReference(importStatement.moduleReference)) {
                        const expr = importStatement.moduleReference.expression;
                        if (isStringLiteralLike(expr) && expr.text === typeName) {
                            return undefined;
                        }
                    }
                    else if (isImportDeclaration(importStatement) && isStringLiteral(importStatement.moduleSpecifier) && importStatement.moduleSpecifier.text === typeName) {
                        return undefined;
                    }
                }
                return { fileName: typeName, pos: -1, end: -1 };
            }

            function mapReferencesIntoArray(references: FileReference[], outputFilePath: string): (file: SourceFile) => void {
                return file => {
                    let declFileName: string;
                    if (file.isDeclarationFile) { // Neither decl files or js should have their refs changed
                        declFileName = file.fileName;
                    }
                    else {
                        if (isBundledEmit && contains((node as Bundle).sourceFiles, file)) return; // Omit references to files which are being merged
                        const paths = getOutputPathsFor(file, host, /*forceDtsPaths*/ true);
                        declFileName = paths.declarationFilePath || paths.jsFilePath;
                    }

                    if (declFileName) {
                        let fileName = getRelativePathToDirectoryOrUrl(
                            outputFilePath,
                            declFileName,
                            host.getCurrentDirectory(),
                            host.getCanonicalFileName,
                            /*isAbsolutePathAnUrl*/ false
                        );
                        if (startsWith(fileName, "./") && hasExtension(fileName)) {
                            fileName = fileName.substring(2);
                        }
                        references.push({ pos: -1, end: -1, fileName });
                    }
                };
            }
        }

        function collectReferences(sourceFile: SourceFile, ret: Map<SourceFile>) {
            if (noResolve || isSourceFileJavaScript(sourceFile)) return ret;
            forEach(sourceFile.referencedFiles, f => {
                const elem = tryResolveScriptReference(host, sourceFile, f);
                if (elem) {
                    ret.set("" + getOriginalNodeId(elem), elem);
                }
            });
            return ret;
        }

        function filterBindingPatternInitializers(name: BindingName) {
            if (name.kind === SyntaxKind.Identifier) {
                return name;
            }
            else {
                if (name.kind === SyntaxKind.ArrayBindingPattern) {
                    return updateArrayBindingPattern(name, visitNodes(name.elements, visitBindingElement));
                }
                else {
                    return updateObjectBindingPattern(name, visitNodes(name.elements, visitBindingElement));
                }
            }

            function visitBindingElement<T extends ArrayBindingElement>(elem: T): T;
            function visitBindingElement(elem: ArrayBindingElement): ArrayBindingElement {
                if (elem.kind === SyntaxKind.OmittedExpression) {
                    return elem;
                }
                return updateBindingElement(elem, elem.dotDotDotToken, elem.propertyName, filterBindingPatternInitializers(elem.name), shouldPrintWithInitializer(elem) ? elem.initializer : undefined);
            }
        }

        function ensureParameter(p: ParameterDeclaration, modifierMask?: ModifierFlags): ParameterDeclaration {
            let oldDiag: typeof getSymbolAccessibilityDiagnostic;
            if (!suppressNewDiagnosticContexts) {
                oldDiag = getSymbolAccessibilityDiagnostic;
                getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(p);
            }
            const newParam = updateParameter(
                p,
                /*decorators*/ undefined,
                maskModifiers(p, modifierMask),
                p.dotDotDotToken,
                filterBindingPatternInitializers(p.name),
                resolver.isOptionalParameter(p) ? (p.questionToken || createToken(SyntaxKind.QuestionToken)) : undefined,
                ensureType(p, p.type, /*ignorePrivate*/ true), // Ignore private param props, since this type is going straight back into a param
                ensureNoInitializer(p)
            );
            if (!suppressNewDiagnosticContexts) {
                getSymbolAccessibilityDiagnostic = oldDiag;
            }
            return newParam;
        }

        function shouldPrintWithInitializer(node: Node) {
            return canHaveLiteralInitializer(node) && resolver.isLiteralConstDeclaration(getParseTreeNode(node) as CanHaveLiteralInitializer); // TODO: Make safe
        }

        function ensureNoInitializer(node: CanHaveLiteralInitializer) {
            if (shouldPrintWithInitializer(node)) {
                return resolver.createLiteralConstValue(getParseTreeNode(node) as CanHaveLiteralInitializer); // TODO: Make safe
            }
            return undefined;
        }

        type HasInferredType =
            | FunctionDeclaration
            | MethodDeclaration
            | GetAccessorDeclaration
            | SetAccessorDeclaration
            | BindingElement
            | ConstructSignatureDeclaration
            | VariableDeclaration
            | MethodSignature
            | CallSignatureDeclaration
            | ParameterDeclaration
            | PropertyDeclaration
            | PropertySignature;

        function ensureType(node: HasInferredType, type: TypeNode, ignorePrivate?: boolean): TypeNode {
            if (!ignorePrivate && hasModifier(node, ModifierFlags.Private)) {
                // Private nodes emit no types (except private parameter properties, whose parameter types are actually visible)
                return;
            }
            if (shouldPrintWithInitializer(node)) {
                // Literal const declarations will have an initializer ensured rather than a type
                return;
            }
            const shouldUseResolverType = node.kind === SyntaxKind.Parameter &&
                (resolver.isRequiredInitializedParameter(node) ||
                 resolver.isOptionalUninitializedParameterProperty(node));
            if (type && !shouldUseResolverType) {
                return visitNode(type, visitDeclarationSubtree);
            }
            if (!getParseTreeNode(node)) {
                return type ? visitNode(type, visitDeclarationSubtree) : createKeywordTypeNode(SyntaxKind.AnyKeyword);
            }
            if (node.kind === SyntaxKind.SetAccessor) {
                // Set accessors with no associated type node (from it's param or get accessor return) are `any` since they are never contextually typed right now
                // (The inferred type here will be void, but the old declaration emitter printed `any`, so this replicates that)
                return createKeywordTypeNode(SyntaxKind.AnyKeyword);
            }
            errorNameNode = node.name;
            let oldDiag: typeof getSymbolAccessibilityDiagnostic;
            if (!suppressNewDiagnosticContexts) {
                oldDiag = getSymbolAccessibilityDiagnostic;
                getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(node);
            }
            if (node.kind === SyntaxKind.VariableDeclaration || node.kind === SyntaxKind.BindingElement) {
                return cleanup(resolver.createTypeOfDeclaration(node, enclosingDeclaration, declarationEmitNodeBuilderFlags, symbolTracker));
            }
            if (node.kind === SyntaxKind.Parameter
                || node.kind === SyntaxKind.PropertyDeclaration
                || node.kind === SyntaxKind.PropertySignature) {
                if (!node.initializer) return cleanup(resolver.createTypeOfDeclaration(node, enclosingDeclaration, declarationEmitNodeBuilderFlags, symbolTracker, shouldUseResolverType));
                return cleanup(resolver.createTypeOfDeclaration(node, enclosingDeclaration, declarationEmitNodeBuilderFlags, symbolTracker, shouldUseResolverType) || resolver.createTypeOfExpression(node.initializer, enclosingDeclaration, declarationEmitNodeBuilderFlags, symbolTracker));
            }
            return cleanup(resolver.createReturnTypeOfSignatureDeclaration(node, enclosingDeclaration, declarationEmitNodeBuilderFlags, symbolTracker));

            function cleanup(returnValue: TypeNode | undefined) {
                errorNameNode = undefined;
                if (!suppressNewDiagnosticContexts) {
                    getSymbolAccessibilityDiagnostic = oldDiag;
                }
                return returnValue || createKeywordTypeNode(SyntaxKind.AnyKeyword);
            }
        }

        function isDeclarationAndNotVisible(node: NamedDeclaration) {
            node = getParseTreeNode(node) as NamedDeclaration;
            switch (node.kind) {
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.TypeAliasDeclaration:
                case SyntaxKind.EnumDeclaration:
                    return !resolver.isDeclarationVisible(node);
                // The following should be doing their own visibility checks based on filtering their members
                case SyntaxKind.VariableDeclaration:
                    return !getBindingNameVisible(node as VariableDeclaration);
                case SyntaxKind.ImportEqualsDeclaration:
                case SyntaxKind.ImportDeclaration:
                case SyntaxKind.ExportDeclaration:
                case SyntaxKind.ExportAssignment:
                    return false;
            }
            return false;
        }

        function getBindingNameVisible(elem: BindingElement | VariableDeclaration | OmittedExpression): boolean {
            if (isOmittedExpression(elem)) {
                return false;
            }
            if (isBindingPattern(elem.name)) {
                // If any child binding pattern element has been marked visible (usually by collect linked aliases), then this is visible
                return forEach(elem.name.elements, getBindingNameVisible);
            }
            else {
                return resolver.isDeclarationVisible(elem);
            }
        }

        function updateParamsList(node: Node, params: NodeArray<ParameterDeclaration>, modifierMask?: ModifierFlags) {
            if (hasModifier(node, ModifierFlags.Private)) {
                return undefined;
            }
            const newParams = map(params, p => ensureParameter(p, modifierMask));
            if (!newParams) {
                return undefined;
            }
            return createNodeArray(newParams, params.hasTrailingComma);
        }

        function ensureTypeParams(node: Node, params: NodeArray<TypeParameterDeclaration>) {
            return hasModifier(node, ModifierFlags.Private) ? undefined : visitNodes(params, visitDeclarationSubtree);
        }

        function isEnclosingDeclaration(node: Node) {
            return isSourceFile(node)
                || isTypeAliasDeclaration(node)
                || isModuleDeclaration(node)
                || isClassDeclaration(node)
                || isInterfaceDeclaration(node)
                || isFunctionLike(node)
                || isIndexSignatureDeclaration(node)
                || isMappedTypeNode(node);
        }

        function checkEntityNameVisibility(entityName: EntityNameOrEntityNameExpression, enclosingDeclaration: Node) {
            const visibilityResult = resolver.isEntityNameVisible(entityName, enclosingDeclaration);
            handleSymbolAccessibilityError(visibilityResult);
            recordTypeReferenceDirectivesIfNecessary(resolver.getTypeReferenceDirectivesForEntityName(entityName));
        }

        function preserveJsDoc<T extends Node>(updated: T, original: Node): T {
            if (hasJSDocNodes(updated) && hasJSDocNodes(original)) {
                updated.jsDoc = original.jsDoc;
            }
            return setCommentRange(updated, getCommentRange(original));
        }

        function rewriteModuleSpecifier<T extends Node>(parent: ImportEqualsDeclaration | ImportDeclaration | ExportDeclaration | ModuleDeclaration | ImportTypeNode, input: T): T | StringLiteral {
            if (!input) return;
            resultHasExternalModuleIndicator = resultHasExternalModuleIndicator || (parent.kind !== SyntaxKind.ModuleDeclaration && parent.kind !== SyntaxKind.ImportType);
            if (input.kind === SyntaxKind.StringLiteral && isBundledEmit) {
                const newName = getExternalModuleNameFromDeclaration(context.getEmitHost(), resolver, parent);
                if (newName) {
                    return createLiteral(newName);
                }
            }
            return input;
        }

        function transformImportEqualsDeclaration(decl: ImportEqualsDeclaration) {
            if (!resolver.isDeclarationVisible(decl)) return;
            if (decl.moduleReference.kind === SyntaxKind.ExternalModuleReference) {
                // Rewrite external module names if necessary
                const specifier = getExternalModuleImportEqualsDeclarationExpression(decl);
                return updateImportEqualsDeclaration(
                    decl,
                    /*decorators*/ undefined,
                    decl.modifiers,
                    decl.name,
                    updateExternalModuleReference(decl.moduleReference, rewriteModuleSpecifier(decl, specifier))
                );
            }
            else {
                const oldDiag = getSymbolAccessibilityDiagnostic;
                getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(decl);
                checkEntityNameVisibility(decl.moduleReference, enclosingDeclaration);
                getSymbolAccessibilityDiagnostic = oldDiag;
                return decl;
            }
        }

        function transformImportDeclaration(decl: ImportDeclaration) {
            if (!decl.importClause) {
                // import "mod" - possibly needed for side effects? (global interface patches, module augmentations, etc)
                return updateImportDeclaration(
                    decl,
                    /*decorators*/ undefined,
                    decl.modifiers,
                    decl.importClause,
                    rewriteModuleSpecifier(decl, decl.moduleSpecifier)
                );
            }
            // The `importClause` visibility corresponds to the default's visibility.
            const visibleDefaultBinding = decl.importClause && decl.importClause.name && resolver.isDeclarationVisible(decl.importClause) ? decl.importClause.name : undefined;
            if (!decl.importClause.namedBindings) {
                // No named bindings (either namespace or list), meaning the import is just default or should be elided
                return visibleDefaultBinding && updateImportDeclaration(decl, /*decorators*/ undefined, decl.modifiers, updateImportClause(
                    decl.importClause,
                    visibleDefaultBinding,
                    /*namedBindings*/ undefined
                ), rewriteModuleSpecifier(decl, decl.moduleSpecifier));
            }
            if (decl.importClause.namedBindings.kind === SyntaxKind.NamespaceImport) {
                // Namespace import (optionally with visible default)
                const namedBindings = resolver.isDeclarationVisible(decl.importClause.namedBindings) ? decl.importClause.namedBindings : /*namedBindings*/ undefined;
                return visibleDefaultBinding || namedBindings ? updateImportDeclaration(decl, /*decorators*/ undefined, decl.modifiers, updateImportClause(
                        decl.importClause,
                        visibleDefaultBinding,
                        namedBindings
                    ), rewriteModuleSpecifier(decl, decl.moduleSpecifier)) : undefined;
            }
            // Named imports (optionally with visible default)
            const bindingList = mapDefined(decl.importClause.namedBindings.elements, b => resolver.isDeclarationVisible(b) ? b : undefined);
            if ((bindingList && bindingList.length) || visibleDefaultBinding) {
                return updateImportDeclaration(
                    decl,
                    /*decorators*/ undefined,
                    decl.modifiers,
                    updateImportClause(
                        decl.importClause,
                        visibleDefaultBinding,
                        bindingList && bindingList.length ? updateNamedImports(decl.importClause.namedBindings, bindingList) : undefined
                    ),
                    rewriteModuleSpecifier(decl, decl.moduleSpecifier)
                );
            }
            // Nothing visible
        }

        function transformAndReplaceLatePaintedStatements(statements: NodeArray<Statement>): NodeArray<Statement> {
            // This is a `while` loop because `handleSymbolAccessibilityError` can see additional import aliases marked as visible during
            // error handling which must now be included in the output and themselves checked for errors.
            // For example:
            // ```
            // module A {
            //   export module Q {}
            //   import B = Q;
            //   import C = B;
            //   export import D = C;
            // }
            // ```
            // In such a scenario, only Q and D are initially visible, but we don't consider imports as private names - instead we say they if they are referenced they must
            // be recorded. So while checking D's visibility we mark C as visible, then we must check C which in turn marks B, completing the chain of
            // dependent imports and allowing a valid declaration file output. Today, this dependent alias marking only happens for internal import aliases.
            while (length(lateMarkedStatements)) {
                const i = lateMarkedStatements.shift();
                if (!isLateVisibilityPaintedStatement(i)) {
                    return Debug.fail(`Late replaced statement was found which is not handled by the declaration transformer!: ${(ts as any).SyntaxKind ? (ts as any).SyntaxKind[(i as any).kind] : (i as any).kind}`);
                }
                const result = transformTopLevelDeclaration(i, /*privateDeclaration*/ true);
                lateStatementReplacementMap.set("" + getOriginalNodeId(i), result);
            }

            // And lastly, we need to get the final form of all those indetermine import declarations from before and add them to the output list
            // (and remove them from the set to examine for outter declarations)
            return visitNodes(statements, visitLateVisibilityMarkedStatements);

            function visitLateVisibilityMarkedStatements(statement: Statement) {
                if (isLateVisibilityPaintedStatement(statement)) {
                    const key = "" + getOriginalNodeId(statement);
                    if (lateStatementReplacementMap.has(key)) {
                        const result = lateStatementReplacementMap.get(key);
                        lateStatementReplacementMap.delete(key);
                        if (result && isSourceFile(statement.parent)) {
                            if (isArray(result) ? some(result, needsScopeMarker) : needsScopeMarker(result)) {
                                // Top-level declarations in .d.ts files are always considered exported even without a modifier unless there's an export assignment or specifier
                                needsScopeFixMarker = true;
                            }
                            if (isArray(result) ? some(result, isExternalModuleIndicator) : isExternalModuleIndicator(result)) {
                                resultHasExternalModuleIndicator = true;
                            }
                        }
                        return result;
                    }
                }
                return statement;
            }
        }

        function isExternalModuleIndicator(result: LateVisibilityPaintedStatement) {
            // Exported top-level member indicates moduleness
            return isAnyImportOrReExport(result) || isExportAssignment(result) || hasModifier(result, ModifierFlags.Export);
        }

        function needsScopeMarker(result: LateVisibilityPaintedStatement) {
            return !isAnyImportOrReExport(result) && !isExportAssignment(result) && !hasModifier(result, ModifierFlags.Export) && !isAmbientModule(result);
        }

        function visitDeclarationSubtree(input: Node): VisitResult<Node> {
            if (shouldStripInternal(input)) return;
            if (isDeclaration(input)) {
                if (isDeclarationAndNotVisible(input)) return;
                if (hasDynamicName(input) && !resolver.isLateBound(getParseTreeNode(input) as Declaration)) {
                    return;
                }
            }

            // Elide implementation signatures from overload sets
            if (isFunctionLike(input) && resolver.isImplementationOfOverload(input)) return;

            // Elide semicolon class statements
            if (isSemicolonClassElement(input)) return;

            let previousEnclosingDeclaration: typeof enclosingDeclaration;
            if (isEnclosingDeclaration(input)) {
                previousEnclosingDeclaration = enclosingDeclaration;
                enclosingDeclaration = input as Declaration;
            }
            const oldDiag = getSymbolAccessibilityDiagnostic;

            // Emit methods which are private as properties with no type information
            if (isMethodDeclaration(input) || isMethodSignature(input)) {
                if (hasModifier(input, ModifierFlags.Private)) {
                    if (input.symbol && input.symbol.declarations && input.symbol.declarations[0] !== input) return; // Elide all but the first overload
                    return cleanup(createProperty(/*decorators*/undefined, ensureModifiers(input), input.name, /*questionToken*/ undefined, /*type*/ undefined, /*initializer*/ undefined));
                }
            }

            const canProdiceDiagnostic = canProduceDiagnostics(input);
            if (canProdiceDiagnostic && !suppressNewDiagnosticContexts) {
                getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(input as DeclarationDiagnosticProducing);
            }

            if (isTypeQueryNode(input)) {
                checkEntityNameVisibility(input.exprName, enclosingDeclaration);
            }

            const oldWithinObjectLiteralType = suppressNewDiagnosticContexts;
            let shouldEnterSuppressNewDiagnosticsContextContext = ((input.kind === SyntaxKind.TypeLiteral || input.kind === SyntaxKind.MappedType) && input.parent.kind !== SyntaxKind.TypeAliasDeclaration);
            if (shouldEnterSuppressNewDiagnosticsContextContext) {
                // We stop making new diagnostic contexts within object literal types. Unless it's an object type on the RHS of a type alias declaration. Then we do.
                suppressNewDiagnosticContexts = true;
            }

            if (isProcessedComponent(input)) {
                switch (input.kind) {
                    case SyntaxKind.ExpressionWithTypeArguments: {
                        if ((isEntityName(input.expression) || isEntityNameExpression(input.expression))) {
                            checkEntityNameVisibility(input.expression, enclosingDeclaration);
                        }
                        const node = visitEachChild(input, visitDeclarationSubtree, context);
                        return cleanup(updateExpressionWithTypeArguments(node, parenthesizeTypeParameters(node.typeArguments), node.expression));
                    }
                    case SyntaxKind.TypeReference: {
                        checkEntityNameVisibility(input.typeName, enclosingDeclaration);
                        const node = visitEachChild(input, visitDeclarationSubtree, context);
                        return cleanup(updateTypeReferenceNode(node, node.typeName, parenthesizeTypeParameters(node.typeArguments)));
                    }
                    case SyntaxKind.ConstructSignature:
                        return cleanup(updateConstructSignature(
                            input,
                            ensureTypeParams(input, input.typeParameters),
                            updateParamsList(input, input.parameters),
                            ensureType(input, input.type)
                        ));
                    case SyntaxKind.Constructor: {
                        const isPrivate = hasModifier(input, ModifierFlags.Private);
                        // A constructor declaration may not have a type annotation
                        const ctor = createSignatureDeclaration(
                            SyntaxKind.Constructor,
                            isPrivate ? undefined : ensureTypeParams(input, input.typeParameters),
                            isPrivate ? undefined : updateParamsList(input, input.parameters, ModifierFlags.None),
                            /*type*/ undefined
                        );
                        ctor.modifiers = createNodeArray(ensureModifiers(input));
                        return cleanup(ctor);
                    }
                    case SyntaxKind.MethodDeclaration: {
                        const sig = createSignatureDeclaration(
                            SyntaxKind.MethodSignature,
                            ensureTypeParams(input, input.typeParameters),
                            updateParamsList(input, input.parameters),
                            ensureType(input, input.type)
                        ) as MethodSignature;
                        sig.name = input.name;
                        sig.modifiers = createNodeArray(ensureModifiers(input));
                        sig.questionToken = input.questionToken;
                        return cleanup(sig);
                    }
                    case SyntaxKind.GetAccessor: {
                        const newNode = ensureAccessor(input);
                        return cleanup(newNode);
                    }
                    case SyntaxKind.SetAccessor: {
                        const newNode = ensureAccessor(input);
                        return cleanup(newNode);
                    }
                    case SyntaxKind.PropertyDeclaration:
                        return cleanup(updateProperty(
                            input,
                            /*decorators*/ undefined,
                            ensureModifiers(input),
                            input.name,
                            input.questionToken,
                            !hasModifier(input, ModifierFlags.Private) ? ensureType(input, input.type) : undefined,
                            ensureNoInitializer(input)
                        ));
                    case SyntaxKind.PropertySignature:
                        return cleanup(updatePropertySignature(
                            input,
                            ensureModifiers(input),
                            input.name,
                            input.questionToken,
                            !hasModifier(input, ModifierFlags.Private) ? ensureType(input, input.type) : undefined,
                            ensureNoInitializer(input)
                        ));
                    case SyntaxKind.MethodSignature: {
                        return cleanup(updateMethodSignature(
                            input,
                            ensureTypeParams(input, input.typeParameters),
                            updateParamsList(input, input.parameters),
                            ensureType(input, input.type),
                            input.name,
                            input.questionToken
                        ));
                    }
                    case SyntaxKind.CallSignature: {
                        return cleanup(updateCallSignature(
                            input,
                            ensureTypeParams(input, input.typeParameters),
                            updateParamsList(input, input.parameters),
                            ensureType(input, input.type)
                        ));
                    }
                    case SyntaxKind.IndexSignature: {
                        return cleanup(updateIndexSignature(
                            input,
                            /*decorators*/ undefined,
                            ensureModifiers(input),
                            updateParamsList(input, input.parameters),
                            visitNode(input.type, visitDeclarationSubtree) || createKeywordTypeNode(SyntaxKind.AnyKeyword)
                        ));
                    }
                    case SyntaxKind.VariableDeclaration: {
                        if (isBindingPattern(input.name)) {
                            return recreateBindingPattern(input.name);
                        }
                        shouldEnterSuppressNewDiagnosticsContextContext = true;
                        suppressNewDiagnosticContexts = true; // Variable declaration types also suppress new diagnostic contexts, provided the contexts wouldn't be made for binding pattern types
                        return cleanup(updateVariableDeclaration(input, input.name, ensureType(input, input.type), ensureNoInitializer(input)));
                    }
                    case SyntaxKind.TypeParameter: {
                        if (isPrivateMethodTypeParameter(input) && (input.default || input.constraint)) {
                            return cleanup(updateTypeParameterDeclaration(input, input.name, /*constraint*/ undefined, /*defaultType*/ undefined));
                        }
                        return cleanup(visitEachChild(input, visitDeclarationSubtree, context));
                    }
                    case SyntaxKind.ConditionalType: {
                        // We have to process conditional types in a special way because for visibility purposes we need to push a new enclosingDeclaration
                        // just for the `infer` types in the true branch. It's an implicit declaration scope that only applies to _part_ of the type.
                        const checkType = visitNode(input.checkType, visitDeclarationSubtree);
                        const extendsType = visitNode(input.extendsType, visitDeclarationSubtree);
                        const oldEnclosingDecl = enclosingDeclaration;
                        enclosingDeclaration = input.trueType;
                        const trueType = visitNode(input.trueType, visitDeclarationSubtree);
                        enclosingDeclaration = oldEnclosingDecl;
                        const falseType = visitNode(input.falseType, visitDeclarationSubtree);
                        return cleanup(updateConditionalTypeNode(input, checkType, extendsType, trueType, falseType));
                    }
                    case SyntaxKind.FunctionType: {
                        return cleanup(updateFunctionTypeNode(input, visitNodes(input.typeParameters, visitDeclarationSubtree), updateParamsList(input, input.parameters), visitNode(input.type, visitDeclarationSubtree)));
                    }
                    case SyntaxKind.ConstructorType: {
                        return cleanup(updateConstructorTypeNode(input, visitNodes(input.typeParameters, visitDeclarationSubtree), updateParamsList(input, input.parameters), visitNode(input.type, visitDeclarationSubtree)));
                    }
                    case SyntaxKind.ImportType: {
                        if (!isLiteralImportTypeNode(input)) return cleanup(input);
                        return cleanup(updateImportTypeNode(
                            input,
                            updateLiteralTypeNode(input.argument, rewriteModuleSpecifier(input, input.argument.literal)),
                            input.qualifier,
                            visitNodes(input.typeArguments, visitDeclarationSubtree, isTypeNode),
                            input.isTypeOf
                        ));
                    }
                    default: Debug.assertNever(input, `Attempted to process unhandled node kind: ${(ts as any).SyntaxKind[(input as any).kind]}`);
                }
            }

            return cleanup(visitEachChild(input, visitDeclarationSubtree, context));

            function cleanup<T extends Node>(returnValue: T | undefined): T {
                if (returnValue && canProdiceDiagnostic && hasDynamicName(input as Declaration)) {
                    checkName(input as DeclarationDiagnosticProducing);
                }
                if (isEnclosingDeclaration(input)) {
                    enclosingDeclaration = previousEnclosingDeclaration;
                }
                if (canProdiceDiagnostic && !suppressNewDiagnosticContexts) {
                    getSymbolAccessibilityDiagnostic = oldDiag;
                }
                if (shouldEnterSuppressNewDiagnosticsContextContext) {
                    suppressNewDiagnosticContexts = oldWithinObjectLiteralType;
                }
                if (returnValue === input) {
                    return returnValue;
                }
                return returnValue && setOriginalNode(preserveJsDoc(returnValue, input), input);
            }
        }

        function isPrivateMethodTypeParameter(node: TypeParameterDeclaration) {
            return node.parent.kind === SyntaxKind.MethodDeclaration && hasModifier(node.parent, ModifierFlags.Private);
        }

        function visitDeclarationStatements(input: Node): VisitResult<Node> {
            if (!isPreservedDeclarationStatement(input)) {
                // return undefined for unmatched kinds to omit them from the tree
                return;
            }
            if (shouldStripInternal(input)) return;

            switch (input.kind) {
                case SyntaxKind.ExportDeclaration: {
                    if (isSourceFile(input.parent)) {
                        resultHasExternalModuleIndicator = true;
                        resultHasScopeMarker = true;
                    }
                    // Always visible if the parent node isn't dropped for being not visible
                    // Rewrite external module names if necessary
                    return updateExportDeclaration(input, /*decorators*/ undefined, input.modifiers, input.exportClause, rewriteModuleSpecifier(input, input.moduleSpecifier));
                }
                case SyntaxKind.ExportAssignment: {
                    // Always visible if the parent node isn't dropped for being not visible
                    if (isSourceFile(input.parent)) {
                        resultHasExternalModuleIndicator = true;
                        resultHasScopeMarker = true;
                    }
                    if (input.expression.kind === SyntaxKind.Identifier) {
                        return input;
                    }
                    else {
                        const newId = createOptimisticUniqueName("_default");
                        getSymbolAccessibilityDiagnostic = () => ({
                            diagnosticMessage: Diagnostics.Default_export_of_the_module_has_or_is_using_private_name_0,
                            errorNode: input
                        });
                        const varDecl = createVariableDeclaration(newId, resolver.createTypeOfExpression(input.expression, input, declarationEmitNodeBuilderFlags, symbolTracker), /*initializer*/ undefined);
                        const statement = createVariableStatement(needsDeclare ? [createModifier(SyntaxKind.DeclareKeyword)] : [], createVariableDeclarationList([varDecl], NodeFlags.Const));
                        return [statement, updateExportAssignment(input, input.decorators, input.modifiers, newId)];
                    }
                }
            }

            const result = transformTopLevelDeclaration(input);
            // Don't actually transform yet; just leave as original node - will be elided/swapped by late pass
            lateStatementReplacementMap.set("" + getOriginalNodeId(input), result);
            return input;
        }

        function transformTopLevelDeclaration(input: LateVisibilityPaintedStatement, isPrivate?: boolean) {
            if (shouldStripInternal(input)) return;
            switch (input.kind) {
                case SyntaxKind.ImportEqualsDeclaration: {
                    return transformImportEqualsDeclaration(input);
                }
                case SyntaxKind.ImportDeclaration: {
                    return transformImportDeclaration(input);
                }
            }
            if (isDeclaration(input) && isDeclarationAndNotVisible(input)) return;

            // Elide implementation signatures from overload sets
            if (isFunctionLike(input) && resolver.isImplementationOfOverload(input)) return;

            let previousEnclosingDeclaration: typeof enclosingDeclaration;
            if (isEnclosingDeclaration(input)) {
                previousEnclosingDeclaration = enclosingDeclaration;
                enclosingDeclaration = input as Declaration;
            }

            const canProdiceDiagnostic = canProduceDiagnostics(input);
            const oldDiag = getSymbolAccessibilityDiagnostic;
            if (canProdiceDiagnostic) {
                getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(input as DeclarationDiagnosticProducing);
            }

            const previousNeedsDeclare = needsDeclare;
            switch (input.kind) {
                case SyntaxKind.TypeAliasDeclaration: // Type aliases get `declare`d if need be (for legacy support), but that's all
                    return cleanup(updateTypeAliasDeclaration(
                        input,
                        /*decorators*/ undefined,
                        ensureModifiers(input, isPrivate),
                        input.name,
                        visitNodes(input.typeParameters, visitDeclarationSubtree, isTypeParameterDeclaration),
                        visitNode(input.type, visitDeclarationSubtree, isTypeNode)
                    ));
                case SyntaxKind.InterfaceDeclaration: {
                    return cleanup(updateInterfaceDeclaration(
                        input,
                        /*decorators*/ undefined,
                        ensureModifiers(input, isPrivate),
                        input.name,
                        ensureTypeParams(input, input.typeParameters),
                        transformHeritageClauses(input.heritageClauses),
                        visitNodes(input.members, visitDeclarationSubtree)
                    ));
                }
                case SyntaxKind.FunctionDeclaration: {
                    // Generators lose their generator-ness, excepting their return type
                    return cleanup(updateFunctionDeclaration(
                        input,
                        /*decorators*/ undefined,
                        ensureModifiers(input, isPrivate),
                        /*asteriskToken*/ undefined,
                        input.name,
                        ensureTypeParams(input, input.typeParameters),
                        updateParamsList(input, input.parameters),
                        ensureType(input, input.type),
                        /*body*/ undefined
                    ));
                }
                case SyntaxKind.ModuleDeclaration: {
                    needsDeclare = false;
                    const inner = input.body;
                    if (inner && inner.kind === SyntaxKind.ModuleBlock) {
                        const statements = visitNodes(inner.statements, visitDeclarationStatements);
                        const body = updateModuleBlock(inner, transformAndReplaceLatePaintedStatements(statements));
                        needsDeclare = previousNeedsDeclare;
                        const mods = ensureModifiers(input, isPrivate);
                        return cleanup(updateModuleDeclaration(
                            input,
                            /*decorators*/ undefined,
                            mods,
                            isExternalModuleAugmentation(input) ? rewriteModuleSpecifier(input, input.name) : input.name,
                            body
                        ));
                    }
                    else {
                        needsDeclare = previousNeedsDeclare;
                        const mods = ensureModifiers(input, isPrivate);
                        needsDeclare = false;
                        visitNode(inner, visitDeclarationStatements);
                        // eagerly transform nested namespaces (the nesting doesn't need any elision or painting done)
                        const id = "" + getOriginalNodeId(inner);
                        const body = lateStatementReplacementMap.get(id);
                        lateStatementReplacementMap.delete(id);
                        return cleanup(updateModuleDeclaration(
                            input,
                            /*decorators*/ undefined,
                            mods,
                            input.name,
                            body as ModuleBody
                        ));
                    }
                }
                case SyntaxKind.ClassDeclaration: {
                    const modifiers = createNodeArray(ensureModifiers(input, isPrivate));
                    const typeParameters = ensureTypeParams(input, input.typeParameters);
                    const ctor = getFirstConstructorWithBody(input);
                    let parameterProperties: PropertyDeclaration[];
                    if (ctor) {
                        const oldDiag = getSymbolAccessibilityDiagnostic;
                        parameterProperties = compact(flatMap(ctor.parameters, param => {
                            if (!hasModifier(param, ModifierFlags.ParameterPropertyModifier)) return;
                            getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(param);
                            if (param.name.kind === SyntaxKind.Identifier) {
                                return preserveJsDoc(createProperty(
                                    /*decorators*/ undefined,
                                    ensureModifiers(param),
                                    param.name,
                                    param.questionToken,
                                    ensureType(param, param.type),
                                    ensureNoInitializer(param)), param);
                            }
                            else {
                                // Pattern - this is currently an error, but we emit declarations for it somewhat correctly
                                return walkBindingPattern(param.name);
                            }

                            function walkBindingPattern(pattern: BindingPattern) {
                                let elems: PropertyDeclaration[];
                                for (const elem of pattern.elements) {
                                    if (isOmittedExpression(elem)) continue;
                                    if (isBindingPattern(elem.name)) {
                                        elems = concatenate(elems, walkBindingPattern(elem.name));
                                    }
                                    elems = elems || [];
                                    elems.push(createProperty(
                                        /*decorators*/ undefined,
                                        ensureModifiers(param),
                                        elem.name as Identifier,
                                        /*questionToken*/ undefined,
                                        ensureType(elem, /*type*/ undefined),
                                        /*initializer*/ undefined
                                    ));
                                }
                                return elems;
                            }
                        }));
                        getSymbolAccessibilityDiagnostic = oldDiag;
                    }
                    const members = createNodeArray(concatenate(parameterProperties, visitNodes(input.members, visitDeclarationSubtree)));

                    const extendsClause = getClassExtendsHeritageClauseElement(input);
                    if (extendsClause && !isEntityNameExpression(extendsClause.expression) && extendsClause.expression.kind !== SyntaxKind.NullKeyword) {
                        // We must add a temporary declaration for the extends clause expression

                        const newId = createOptimisticUniqueName(`${unescapeLeadingUnderscores(input.name.escapedText)}_base`);
                        getSymbolAccessibilityDiagnostic = () => ({
                            diagnosticMessage: Diagnostics.extends_clause_of_exported_class_0_has_or_is_using_private_name_1,
                            errorNode: extendsClause,
                            typeName: input.name
                        });
                        const varDecl = createVariableDeclaration(newId, resolver.createTypeOfExpression(extendsClause.expression, input, declarationEmitNodeBuilderFlags, symbolTracker), /*initializer*/ undefined);
                        const statement = createVariableStatement(needsDeclare ? [createModifier(SyntaxKind.DeclareKeyword)] : [], createVariableDeclarationList([varDecl], NodeFlags.Const));
                        const heritageClauses = createNodeArray(map(input.heritageClauses, clause => {
                            if (clause.token === SyntaxKind.ExtendsKeyword) {
                                const oldDiag = getSymbolAccessibilityDiagnostic;
                                getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(clause.types[0]);
                                const newClause = updateHeritageClause(clause, map(clause.types, t => updateExpressionWithTypeArguments(t, visitNodes(t.typeArguments, visitDeclarationSubtree), newId)));
                                getSymbolAccessibilityDiagnostic = oldDiag;
                                return newClause;
                            }
                            return updateHeritageClause(clause, visitNodes(createNodeArray(filter(clause.types, t => isEntityNameExpression(t.expression) || t.expression.kind === SyntaxKind.NullKeyword)), visitDeclarationSubtree));
                        }));
                        return [statement, cleanup(updateClassDeclaration(
                            input,
                            /*decorators*/ undefined,
                            modifiers,
                            input.name,
                            typeParameters,
                            heritageClauses,
                            members
                        ))];
                    }
                    else {
                        const heritageClauses = transformHeritageClauses(input.heritageClauses);
                        return cleanup(updateClassDeclaration(
                            input,
                            /*decorators*/ undefined,
                            modifiers,
                            input.name,
                            typeParameters,
                            heritageClauses,
                            members
                        ));
                    }
                }
                case SyntaxKind.VariableStatement: {
                    return cleanup(transformVariableStatement(input, isPrivate));
                }
                case SyntaxKind.EnumDeclaration: {
                    return cleanup(updateEnumDeclaration(input, /*decorators*/ undefined, createNodeArray(ensureModifiers(input, isPrivate)), input.name, createNodeArray(mapDefined(input.members, m => {
                        if (shouldStripInternal(m)) return;
                        // Rewrite enum values to their constants, if available
                        const constValue = resolver.getConstantValue(m);
                        return preserveJsDoc(updateEnumMember(m, m.name, constValue !== undefined ? createLiteral(constValue) : undefined), m);
                    }))));
                }
            }
            // Anything left unhandled is an error, so this should be unreachable
            return Debug.assertNever(input, `Unhandled top-level node in declaration emit: ${(ts as any).SyntaxKind[(input as any).kind]}`);

            function cleanup<T extends Node>(node: T | undefined): T {
                if (isEnclosingDeclaration(input)) {
                    enclosingDeclaration = previousEnclosingDeclaration;
                }
                if (canProdiceDiagnostic) {
                    getSymbolAccessibilityDiagnostic = oldDiag;
                }
                if (input.kind === SyntaxKind.ModuleDeclaration) {
                    needsDeclare = previousNeedsDeclare;
                }
                if (node as Node === input) {
                    return node;
                }
                return node && setOriginalNode(preserveJsDoc(node, input), input);
            }
        }

        function transformVariableStatement(input: VariableStatement, privateDeclaration?: boolean) {
            if (!forEach(input.declarationList.declarations, getBindingNameVisible)) return;
            const nodes = visitNodes(input.declarationList.declarations, visitDeclarationSubtree);
            if (!length(nodes)) return;
            return updateVariableStatement(input, createNodeArray(ensureModifiers(input, privateDeclaration)), updateVariableDeclarationList(input.declarationList, nodes));
        }

        function recreateBindingPattern(d: BindingPattern): VariableDeclaration[] {
            return flatten<VariableDeclaration>(mapDefined(d.elements, e => recreateBindingElement(e)));
        }

        function recreateBindingElement(e: ArrayBindingElement) {
            if (e.kind === SyntaxKind.OmittedExpression) {
                return;
            }
            if (e.name) {
                if (!getBindingNameVisible(e)) return;
                if (isBindingPattern(e.name)) {
                    return recreateBindingPattern(e.name);
                }
                else {
                    return createVariableDeclaration(e.name, ensureType(e, /*type*/ undefined), /*initializer*/ undefined);
                }
            }
        }

        function checkName(node: DeclarationDiagnosticProducing) {
            let oldDiag: typeof getSymbolAccessibilityDiagnostic;
            if (!suppressNewDiagnosticContexts) {
                oldDiag = getSymbolAccessibilityDiagnostic;
                getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNodeName(node);
            }
            errorNameNode = (node as NamedDeclaration).name;
            Debug.assert(resolver.isLateBound(getParseTreeNode(node) as Declaration)); // Should only be called with dynamic names
            const decl = node as NamedDeclaration as LateBoundDeclaration;
            const entityName = decl.name.expression;
            checkEntityNameVisibility(entityName, enclosingDeclaration);
            if (!suppressNewDiagnosticContexts) {
                getSymbolAccessibilityDiagnostic = oldDiag;
            }
            errorNameNode = undefined;
        }

        function hasInternalAnnotation(range: CommentRange) {
            const comment = currentSourceFile.text.substring(range.pos, range.end);
            return stringContains(comment, "@internal");
        }

        function shouldStripInternal(node: Node) {
            if (stripInternal && node) {
                const leadingCommentRanges = getLeadingCommentRangesOfNode(getParseTreeNode(node), currentSourceFile);
                if (forEach(leadingCommentRanges, hasInternalAnnotation)) {
                    return true;
                }
            }
            return false;
        }

        function ensureModifiers(node: Node, privateDeclaration?: boolean): ReadonlyArray<Modifier> {
            const currentFlags = getModifierFlags(node);
            const newFlags = ensureModifierFlags(node, privateDeclaration);
            if (currentFlags === newFlags) {
                return node.modifiers;
            }
            return createModifiersFromModifierFlags(newFlags);
        }

        function ensureModifierFlags(node: Node, privateDeclaration?: boolean): ModifierFlags {
            let mask = ModifierFlags.All ^ (ModifierFlags.Public | ModifierFlags.Async); // No async modifiers in declaration files
            let additions = (needsDeclare && !isAlwaysType(node)) ? ModifierFlags.Ambient : ModifierFlags.None;
            const parentIsFile = node.parent.kind === SyntaxKind.SourceFile;
            if (!parentIsFile || (isBundledEmit && parentIsFile && isExternalModule(node.parent as SourceFile))) {
                mask ^= ((privateDeclaration || (isBundledEmit && parentIsFile) ? 0 : ModifierFlags.Export) | ModifierFlags.Default | ModifierFlags.Ambient);
                additions = ModifierFlags.None;
            }
            return maskModifierFlags(node, mask, additions);
        }

        function ensureAccessor(node: AccessorDeclaration): PropertyDeclaration | undefined {
            const accessors = resolver.getAllAccessorDeclarations(node);
            if (node.kind !== accessors.firstAccessor.kind) {
                return;
            }
            let accessorType = getTypeAnnotationFromAccessor(node);
            if (!accessorType && accessors.secondAccessor) {
                accessorType = getTypeAnnotationFromAccessor(accessors.secondAccessor);
                // If we end up pulling the type from the second accessor, we also need to change the diagnostic context to get the expected error message
                getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(accessors.secondAccessor);
            }
            const prop = createProperty(/*decorators*/ undefined, maskModifiers(node, /*mask*/ undefined, (!accessors.setAccessor) ? ModifierFlags.Readonly : ModifierFlags.None), node.name, node.questionToken, ensureType(node, accessorType), /*initializer*/ undefined);
            const leadingsSyntheticCommentRanges = accessors.secondAccessor && getLeadingCommentRangesOfNode(accessors.secondAccessor, currentSourceFile);
            if (leadingsSyntheticCommentRanges) {
                for (const range of leadingsSyntheticCommentRanges) {
                    if (range.kind === SyntaxKind.MultiLineCommentTrivia) {
                        let text = currentSourceFile.text.slice(range.pos + 2, range.end - 2);
                        const lines = text.split(/\r\n?|\n/g);
                        if (lines.length > 1) {
                            const lastLines = lines.slice(1);
                            const indentation = guessIndentation(lastLines);
                            text = [lines[0], ...map(lastLines, l => l.slice(indentation))].join(newLine);
                        }
                        addSyntheticLeadingComment(
                            prop,
                            range.kind,
                            text,
                            range.hasTrailingNewLine
                        );
                    }
                }
            }
            return prop;
        }

        function transformHeritageClauses(nodes: NodeArray<HeritageClause>) {
            return createNodeArray(filter(map(nodes, clause => updateHeritageClause(clause, visitNodes(createNodeArray(filter(clause.types, t => {
                return isEntityNameExpression(t.expression) || (clause.token === SyntaxKind.ExtendsKeyword && t.expression.kind === SyntaxKind.NullKeyword);
            })), visitDeclarationSubtree))), clause => clause.types && !!clause.types.length));
        }
    }

    function isAlwaysType(node: Node) {
        if (node.kind === SyntaxKind.InterfaceDeclaration) {
            return true;
        }
        return false;
    }

    // Elide "public" modifier, as it is the default
    function maskModifiers(node: Node, modifierMask?: ModifierFlags, modifierAdditions?: ModifierFlags): Modifier[] {
        return createModifiersFromModifierFlags(maskModifierFlags(node, modifierMask, modifierAdditions));
    }

    function maskModifierFlags(node: Node, modifierMask: ModifierFlags = ModifierFlags.All ^ ModifierFlags.Public, modifierAdditions: ModifierFlags = ModifierFlags.None): ModifierFlags {
        let flags = (getModifierFlags(node) & modifierMask) | modifierAdditions;
        if (flags & ModifierFlags.Default && flags & ModifierFlags.Ambient) {
            flags ^= ModifierFlags.Ambient; // `declare` is never required alongside `default` (and would be an error if printed)
        }
        return flags;
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

    type CanHaveLiteralInitializer = VariableDeclaration | PropertyDeclaration | PropertySignature | ParameterDeclaration;
    function canHaveLiteralInitializer(node: Node): node is CanHaveLiteralInitializer {
        switch (node.kind) {
            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.Parameter:
                return true;
        }
        return false;
    }

    type ProcessedDeclarationStatement =
        | FunctionDeclaration
        | ModuleDeclaration
        | ImportEqualsDeclaration
        | InterfaceDeclaration
        | ClassDeclaration
        | TypeAliasDeclaration
        | EnumDeclaration
        | VariableStatement
        | ImportDeclaration
        | ExportDeclaration
        | ExportAssignment;

    function isPreservedDeclarationStatement(node: Node): node is ProcessedDeclarationStatement {
        switch (node.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.ImportEqualsDeclaration:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.TypeAliasDeclaration:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.VariableStatement:
            case SyntaxKind.ImportDeclaration:
            case SyntaxKind.ExportDeclaration:
            case SyntaxKind.ExportAssignment:
                return true;
        }
        return false;
    }

    type ProcessedComponent =
        | ConstructSignatureDeclaration
        | ConstructorDeclaration
        | MethodDeclaration
        | GetAccessorDeclaration
        | SetAccessorDeclaration
        | PropertyDeclaration
        | PropertySignature
        | MethodSignature
        | CallSignatureDeclaration
        | IndexSignatureDeclaration
        | VariableDeclaration
        | TypeParameterDeclaration
        | ExpressionWithTypeArguments
        | TypeReferenceNode
        | ConditionalTypeNode
        | FunctionTypeNode
        | ConstructorTypeNode
        | ImportTypeNode;

    function isProcessedComponent(node: Node): node is ProcessedComponent {
        switch (node.kind) {
            case SyntaxKind.ConstructSignature:
            case SyntaxKind.Constructor:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.MethodSignature:
            case SyntaxKind.CallSignature:
            case SyntaxKind.IndexSignature:
            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.TypeParameter:
            case SyntaxKind.ExpressionWithTypeArguments:
            case SyntaxKind.TypeReference:
            case SyntaxKind.ConditionalType:
            case SyntaxKind.FunctionType:
            case SyntaxKind.ConstructorType:
            case SyntaxKind.ImportType:
            return true;
        }
        return false;
    }
}