/*@internal*/
namespace ts {
export function getDeclarationDiagnostics(host: ts.EmitHost, resolver: ts.EmitResolver, file: ts.SourceFile | undefined): ts.DiagnosticWithLocation[] | undefined {
    const compilerOptions = host.getCompilerOptions();
    const result = ts.transformNodes(resolver, host, ts.factory, compilerOptions, file ? [file] : ts.filter(host.getSourceFiles(), ts.isSourceFileNotJson), [transformDeclarations], /*allowDtsFiles*/ false);
    return result.diagnostics;
}

function hasInternalAnnotation(range: ts.CommentRange, currentSourceFile: ts.SourceFile) {
    const comment = currentSourceFile.text.substring(range.pos, range.end);
    return ts.stringContains(comment, "@internal");
}

export function isInternalDeclaration(node: ts.Node, currentSourceFile: ts.SourceFile) {
    const parseTreeNode = ts.getParseTreeNode(node);
    if (parseTreeNode && parseTreeNode.kind === ts.SyntaxKind.Parameter) {
        const paramIdx = (parseTreeNode.parent as ts.SignatureDeclaration).parameters.indexOf(parseTreeNode as ts.ParameterDeclaration);
        const previousSibling = paramIdx > 0 ? (parseTreeNode.parent as ts.SignatureDeclaration).parameters[paramIdx - 1] : undefined;
        const text = currentSourceFile.text;
        const commentRanges = previousSibling
            ? ts.concatenate(
                // to handle
                // ... parameters, /* @internal */
                // public param: string
                ts.getTrailingCommentRanges(text, ts.skipTrivia(text, previousSibling.end + 1, /* stopAfterLineBreak */ false, /* stopAtComments */ true)),
                ts.getLeadingCommentRanges(text, node.pos)
            )
            : ts.getTrailingCommentRanges(text, ts.skipTrivia(text, node.pos, /* stopAfterLineBreak */ false, /* stopAtComments */ true));
        return commentRanges && commentRanges.length && hasInternalAnnotation(ts.last(commentRanges), currentSourceFile);
    }
    const leadingCommentRanges = parseTreeNode && ts.getLeadingCommentRangesOfNode(parseTreeNode, currentSourceFile);
    return !!ts.forEach(leadingCommentRanges, range => {
        return hasInternalAnnotation(range, currentSourceFile);
    });
}

const declarationEmitNodeBuilderFlags =
    ts.NodeBuilderFlags.MultilineObjectLiterals |
    ts.NodeBuilderFlags.WriteClassExpressionAsTypeLiteral |
    ts.NodeBuilderFlags.UseTypeOfFunction |
    ts.NodeBuilderFlags.UseStructuralFallback |
    ts.NodeBuilderFlags.AllowEmptyTuple |
    ts.NodeBuilderFlags.GenerateNamesForShadowedTypeParams |
    ts.NodeBuilderFlags.NoTruncation;

/**
 * Transforms a ts file into a .d.ts file
 * This process requires type information, which is retrieved through the emit resolver. Because of this,
 * in many places this transformer assumes it will be operating on parse tree nodes directly.
 * This means that _no transforms should be allowed to occur before this one_.
 */
export function transformDeclarations(context: ts.TransformationContext) {
    const throwDiagnostic = () => ts.Debug.fail("Diagnostic emitted without context");
    let getSymbolAccessibilityDiagnostic: ts.GetSymbolAccessibilityDiagnostic = throwDiagnostic;
    let needsDeclare = true;
    let isBundledEmit = false;
    let resultHasExternalModuleIndicator = false;
    let needsScopeFixMarker = false;
    let resultHasScopeMarker = false;
    let enclosingDeclaration: ts.Node;
    let necessaryTypeReferences: ts.Set<[specifier: string, mode: ts.SourceFile["impliedNodeFormat"] | undefined]> | undefined;
    let lateMarkedStatements: ts.LateVisibilityPaintedStatement[] | undefined;
    let lateStatementReplacementMap: ts.ESMap<ts.NodeId, ts.VisitResult<ts.LateVisibilityPaintedStatement | ts.ExportAssignment>>;
    let suppressNewDiagnosticContexts: boolean;
    let exportedModulesFromDeclarationEmit: ts.Symbol[] | undefined;

    const { factory } = context;
    const host = context.getEmitHost();
    const symbolTracker: ts.SymbolTracker = {
        trackSymbol,
        reportInaccessibleThisError,
        reportInaccessibleUniqueSymbolError,
        reportCyclicStructureError,
        reportPrivateInBaseOfClassExpression,
        reportLikelyUnsafeImportRequiredError,
        reportTruncationError,
        moduleResolverHost: host,
        trackReferencedAmbientModule,
        trackExternalModuleSymbolOfImportTypeNode,
        reportNonlocalAugmentation,
        reportNonSerializableProperty,
        reportImportTypeNodeResolutionModeOverride,
    };
    let errorNameNode: ts.DeclarationName | undefined;
    let errorFallbackNode: ts.Declaration | undefined;

    let currentSourceFile: ts.SourceFile;
    let refs: ts.ESMap<ts.NodeId, ts.SourceFile>;
    let libs: ts.ESMap<string, boolean>;
    let emittedImports: readonly ts.AnyImportSyntax[] | undefined; // must be declared in container so it can be `undefined` while transformer's first pass
    const resolver = context.getEmitResolver();
    const options = context.getCompilerOptions();
    const { noResolve, stripInternal } = options;
    return transformRoot;

    function recordTypeReferenceDirectivesIfNecessary(typeReferenceDirectives: readonly [specifier: string, mode: ts.SourceFile["impliedNodeFormat"] | undefined][] | undefined): void {
        if (!typeReferenceDirectives) {
            return;
        }
        necessaryTypeReferences = necessaryTypeReferences || new ts.Set();
        for (const ref of typeReferenceDirectives) {
            necessaryTypeReferences.add(ref);
        }
    }

    function trackReferencedAmbientModule(node: ts.ModuleDeclaration, symbol: ts.Symbol) {
        // If it is visible via `// <reference types="..."/>`, then we should just use that
        const directives = resolver.getTypeReferenceDirectivesForSymbol(symbol, ts.SymbolFlags.All);
        if (ts.length(directives)) {
            return recordTypeReferenceDirectivesIfNecessary(directives);
        }
        // Otherwise we should emit a path-based reference
        const container = ts.getSourceFileOfNode(node);
        refs.set(ts.getOriginalNodeId(container), container);
    }

    function handleSymbolAccessibilityError(symbolAccessibilityResult: ts.SymbolAccessibilityResult) {
        if (symbolAccessibilityResult.accessibility === ts.SymbolAccessibility.Accessible) {
            // Add aliases back onto the possible imports list if they're not there so we can try them again with updated visibility info
            if (symbolAccessibilityResult && symbolAccessibilityResult.aliasesToMakeVisible) {
                if (!lateMarkedStatements) {
                    lateMarkedStatements = symbolAccessibilityResult.aliasesToMakeVisible;
                }
                else {
                    for (const ref of symbolAccessibilityResult.aliasesToMakeVisible) {
                        ts.pushIfUnique(lateMarkedStatements, ref);
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
                    context.addDiagnostic(ts.createDiagnosticForNode(symbolAccessibilityResult.errorNode || errorInfo.errorNode,
                        errorInfo.diagnosticMessage,
                        ts.getTextOfNode(errorInfo.typeName),
                        symbolAccessibilityResult.errorSymbolName,
                        symbolAccessibilityResult.errorModuleName));
                }
                else {
                    context.addDiagnostic(ts.createDiagnosticForNode(symbolAccessibilityResult.errorNode || errorInfo.errorNode,
                        errorInfo.diagnosticMessage,
                        symbolAccessibilityResult.errorSymbolName,
                        symbolAccessibilityResult.errorModuleName));
                }
                return true;
            }
        }
        return false;
    }

    function trackExternalModuleSymbolOfImportTypeNode(symbol: ts.Symbol) {
        if (!isBundledEmit) {
            (exportedModulesFromDeclarationEmit || (exportedModulesFromDeclarationEmit = [])).push(symbol);
        }
    }

    function trackSymbol(symbol: ts.Symbol, enclosingDeclaration?: ts.Node, meaning?: ts.SymbolFlags) {
        if (symbol.flags & ts.SymbolFlags.TypeParameter) return false;
        const issuedDiagnostic = handleSymbolAccessibilityError(resolver.isSymbolAccessible(symbol, enclosingDeclaration, meaning, /*shouldComputeAliasesToMakeVisible*/ true));
        recordTypeReferenceDirectivesIfNecessary(resolver.getTypeReferenceDirectivesForSymbol(symbol, meaning));
        return issuedDiagnostic;
    }

    function reportPrivateInBaseOfClassExpression(propertyName: string) {
        if (errorNameNode || errorFallbackNode) {
            context.addDiagnostic(
                ts.createDiagnosticForNode((errorNameNode || errorFallbackNode)!, ts.Diagnostics.Property_0_of_exported_class_expression_may_not_be_private_or_protected, propertyName));
        }
    }

    function errorDeclarationNameWithFallback() {
        return errorNameNode ? ts.declarationNameToString(errorNameNode) :
            errorFallbackNode && ts.getNameOfDeclaration(errorFallbackNode) ? ts.declarationNameToString(ts.getNameOfDeclaration(errorFallbackNode)) :
            errorFallbackNode && ts.isExportAssignment(errorFallbackNode) ? errorFallbackNode.isExportEquals ? "export=" : "default" :
            "(Missing)"; // same fallback declarationNameToString uses when node is zero-width (ie, nameless)
    }

    function reportInaccessibleUniqueSymbolError() {
        if (errorNameNode || errorFallbackNode) {
            context.addDiagnostic(ts.createDiagnosticForNode((errorNameNode || errorFallbackNode)!, ts.Diagnostics.The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary,
                errorDeclarationNameWithFallback(),
                "unique symbol"));
        }
    }

    function reportCyclicStructureError() {
        if (errorNameNode || errorFallbackNode) {
            context.addDiagnostic(ts.createDiagnosticForNode((errorNameNode || errorFallbackNode)!, ts.Diagnostics.The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialized_A_type_annotation_is_necessary,
                errorDeclarationNameWithFallback()));
        }
    }

    function reportInaccessibleThisError() {
        if (errorNameNode || errorFallbackNode) {
            context.addDiagnostic(ts.createDiagnosticForNode((errorNameNode || errorFallbackNode)!, ts.Diagnostics.The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary,
                errorDeclarationNameWithFallback(),
                "this"));
        }
    }

    function reportLikelyUnsafeImportRequiredError(specifier: string) {
        if (errorNameNode || errorFallbackNode) {
            context.addDiagnostic(ts.createDiagnosticForNode((errorNameNode || errorFallbackNode)!, ts.Diagnostics.The_inferred_type_of_0_cannot_be_named_without_a_reference_to_1_This_is_likely_not_portable_A_type_annotation_is_necessary,
                errorDeclarationNameWithFallback(),
                specifier));
        }
    }

    function reportTruncationError() {
        if (errorNameNode || errorFallbackNode) {
            context.addDiagnostic(ts.createDiagnosticForNode((errorNameNode || errorFallbackNode)!, ts.Diagnostics.The_inferred_type_of_this_node_exceeds_the_maximum_length_the_compiler_will_serialize_An_explicit_type_annotation_is_needed));
        }
    }

    function reportNonlocalAugmentation(containingFile: ts.SourceFile, parentSymbol: ts.Symbol, symbol: ts.Symbol) {
        const primaryDeclaration = parentSymbol.declarations?.find(d => ts.getSourceFileOfNode(d) === containingFile);
        const augmentingDeclarations = ts.filter(symbol.declarations, d => ts.getSourceFileOfNode(d) !== containingFile);
        if (primaryDeclaration && augmentingDeclarations) {
            for (const augmentations of augmentingDeclarations) {
                context.addDiagnostic(ts.addRelatedInfo(
                    ts.createDiagnosticForNode(augmentations, ts.Diagnostics.Declaration_augments_declaration_in_another_file_This_cannot_be_serialized),
                    ts.createDiagnosticForNode(primaryDeclaration, ts.Diagnostics.This_is_the_declaration_being_augmented_Consider_moving_the_augmenting_declaration_into_the_same_file)
                ));
            }
        }
    }

    function reportNonSerializableProperty(propertyName: string) {
        if (errorNameNode || errorFallbackNode) {
            context.addDiagnostic(ts.createDiagnosticForNode((errorNameNode || errorFallbackNode)!, ts.Diagnostics.The_type_of_this_node_cannot_be_serialized_because_its_property_0_cannot_be_serialized, propertyName));
        }
    }

    function reportImportTypeNodeResolutionModeOverride() {
        if (!ts.isNightly() && (errorNameNode || errorFallbackNode)) {
            context.addDiagnostic(ts.createDiagnosticForNode((errorNameNode || errorFallbackNode)!, ts.Diagnostics.The_type_of_this_expression_cannot_be_named_without_a_resolution_mode_assertion_which_is_an_unstable_feature_Use_nightly_TypeScript_to_silence_this_error_Try_updating_with_npm_install_D_typescript_next));
        }
    }

    function transformDeclarationsForJS(sourceFile: ts.SourceFile, bundled?: boolean) {
        const oldDiag = getSymbolAccessibilityDiagnostic;
        getSymbolAccessibilityDiagnostic = (s) => (s.errorNode && ts.canProduceDiagnostics(s.errorNode) ? ts.createGetSymbolAccessibilityDiagnosticForNode(s.errorNode)(s) : ({
            diagnosticMessage: s.errorModuleName
                ? ts.Diagnostics.Declaration_emit_for_this_file_requires_using_private_name_0_from_module_1_An_explicit_type_annotation_may_unblock_declaration_emit
                : ts.Diagnostics.Declaration_emit_for_this_file_requires_using_private_name_0_An_explicit_type_annotation_may_unblock_declaration_emit,
            errorNode: s.errorNode || sourceFile
        }));
        const result = resolver.getDeclarationStatementsForSourceFile(sourceFile, declarationEmitNodeBuilderFlags, symbolTracker, bundled);
        getSymbolAccessibilityDiagnostic = oldDiag;
        return result;
    }

    function transformRoot(node: ts.Bundle): ts.Bundle;
    function transformRoot(node: ts.SourceFile): ts.SourceFile;
    function transformRoot(node: ts.SourceFile | ts.Bundle): ts.SourceFile | ts.Bundle;
    function transformRoot(node: ts.SourceFile | ts.Bundle) {
        if (node.kind === ts.SyntaxKind.SourceFile && node.isDeclarationFile) {
            return node;
        }

        if (node.kind === ts.SyntaxKind.Bundle) {
            isBundledEmit = true;
            refs = new ts.Map();
            libs = new ts.Map();
            let hasNoDefaultLib = false;
            const bundle = factory.createBundle(ts.map(node.sourceFiles,
                sourceFile => {
                    if (sourceFile.isDeclarationFile) return undefined!; // Omit declaration files from bundle results, too // TODO: GH#18217
                    hasNoDefaultLib = hasNoDefaultLib || sourceFile.hasNoDefaultLib;
                    currentSourceFile = sourceFile;
                    enclosingDeclaration = sourceFile;
                    lateMarkedStatements = undefined;
                    suppressNewDiagnosticContexts = false;
                    lateStatementReplacementMap = new ts.Map();
                    getSymbolAccessibilityDiagnostic = throwDiagnostic;
                    needsScopeFixMarker = false;
                    resultHasScopeMarker = false;
                    collectReferences(sourceFile, refs);
                    collectLibs(sourceFile, libs);
                    if (ts.isExternalOrCommonJsModule(sourceFile) || ts.isJsonSourceFile(sourceFile)) {
                        resultHasExternalModuleIndicator = false; // unused in external module bundle emit (all external modules are within module blocks, therefore are known to be modules)
                        needsDeclare = false;
                        const statements = ts.isSourceFileJS(sourceFile) ? factory.createNodeArray(transformDeclarationsForJS(sourceFile, /*bundled*/ true)) : ts.visitNodes(sourceFile.statements, visitDeclarationStatements);
                        const newFile = factory.updateSourceFile(sourceFile, [factory.createModuleDeclaration(
                            [factory.createModifier(ts.SyntaxKind.DeclareKeyword)],
                            factory.createStringLiteral(ts.getResolvedExternalModuleName(context.getEmitHost(), sourceFile)),
                            factory.createModuleBlock(ts.setTextRange(factory.createNodeArray(transformAndReplaceLatePaintedStatements(statements)), sourceFile.statements))
                        )], /*isDeclarationFile*/ true, /*referencedFiles*/ [], /*typeReferences*/ [], /*hasNoDefaultLib*/ false, /*libReferences*/ []);
                        return newFile;
                    }
                    needsDeclare = true;
                    const updated = ts.isSourceFileJS(sourceFile) ? factory.createNodeArray(transformDeclarationsForJS(sourceFile)) : ts.visitNodes(sourceFile.statements, visitDeclarationStatements);
                    return factory.updateSourceFile(sourceFile, transformAndReplaceLatePaintedStatements(updated), /*isDeclarationFile*/ true, /*referencedFiles*/ [], /*typeReferences*/ [], /*hasNoDefaultLib*/ false, /*libReferences*/ []);
                }
            ), ts.mapDefined(node.prepends, prepend => {
                if (prepend.kind === ts.SyntaxKind.InputFiles) {
                    const sourceFile = ts.createUnparsedSourceFile(prepend, "dts", stripInternal);
                    hasNoDefaultLib = hasNoDefaultLib || !!sourceFile.hasNoDefaultLib;
                    collectReferences(sourceFile, refs);
                    recordTypeReferenceDirectivesIfNecessary(ts.map(sourceFile.typeReferenceDirectives, ref => [ref.fileName, ref.resolutionMode]));
                    collectLibs(sourceFile, libs);
                    return sourceFile;
                }
                return prepend;
            }));
            bundle.syntheticFileReferences = [];
            bundle.syntheticTypeReferences = getFileReferencesForUsedTypeReferences();
            bundle.syntheticLibReferences = getLibReferences();
            bundle.hasNoDefaultLib = hasNoDefaultLib;
            const outputFilePath = ts.getDirectoryPath(ts.normalizeSlashes(ts.getOutputPathsFor(node, host, /*forceDtsPaths*/ true).declarationFilePath!));
            const referenceVisitor = mapReferencesIntoArray(bundle.syntheticFileReferences as ts.FileReference[], outputFilePath);
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
        lateStatementReplacementMap = new ts.Map();
        necessaryTypeReferences = undefined;
        refs = collectReferences(currentSourceFile, new ts.Map());
        libs = collectLibs(currentSourceFile, new ts.Map());
        const references: ts.FileReference[] = [];
        const outputFilePath = ts.getDirectoryPath(ts.normalizeSlashes(ts.getOutputPathsFor(node, host, /*forceDtsPaths*/ true).declarationFilePath!));
        const referenceVisitor = mapReferencesIntoArray(references, outputFilePath);
        let combinedStatements: ts.NodeArray<ts.Statement>;
        if (ts.isSourceFileJS(currentSourceFile)) {
            combinedStatements = factory.createNodeArray(transformDeclarationsForJS(node));
            refs.forEach(referenceVisitor);
            emittedImports = ts.filter(combinedStatements, ts.isAnyImportSyntax);
        }
        else {
            const statements = ts.visitNodes(node.statements, visitDeclarationStatements);
            combinedStatements = ts.setTextRange(factory.createNodeArray(transformAndReplaceLatePaintedStatements(statements)), node.statements);
            refs.forEach(referenceVisitor);
            emittedImports = ts.filter(combinedStatements, ts.isAnyImportSyntax);
            if (ts.isExternalModule(node) && (!resultHasExternalModuleIndicator || (needsScopeFixMarker && !resultHasScopeMarker))) {
                combinedStatements = ts.setTextRange(factory.createNodeArray([...combinedStatements, ts.createEmptyExports(factory)]), combinedStatements);
            }
        }
        const updated = factory.updateSourceFile(node, combinedStatements, /*isDeclarationFile*/ true, references, getFileReferencesForUsedTypeReferences(), node.hasNoDefaultLib, getLibReferences());
        updated.exportedModulesFromDeclarationEmit = exportedModulesFromDeclarationEmit;
        return updated;

        function getLibReferences() {
            return ts.map(ts.arrayFrom(libs.keys()), lib => ({ fileName: lib, pos: -1, end: -1 }));
        }

        function getFileReferencesForUsedTypeReferences() {
            return necessaryTypeReferences ? ts.mapDefined(ts.arrayFrom(necessaryTypeReferences.keys()), getFileReferenceForSpecifierModeTuple) : [];
        }

        function getFileReferenceForSpecifierModeTuple([typeName, mode]: [specifier: string, mode: ts.SourceFile["impliedNodeFormat"] | undefined]): ts.FileReference | undefined {
            // Elide type references for which we have imports
            if (emittedImports) {
                for (const importStatement of emittedImports) {
                    if (ts.isImportEqualsDeclaration(importStatement) && ts.isExternalModuleReference(importStatement.moduleReference)) {
                        const expr = importStatement.moduleReference.expression;
                        if (ts.isStringLiteralLike(expr) && expr.text === typeName) {
                            return undefined;
                        }
                    }
                    else if (ts.isImportDeclaration(importStatement) && ts.isStringLiteral(importStatement.moduleSpecifier) && importStatement.moduleSpecifier.text === typeName) {
                        return undefined;
                    }
                }
            }
            return { fileName: typeName, pos: -1, end: -1, ...(mode ? { resolutionMode: mode } : undefined) };
        }

        function mapReferencesIntoArray(references: ts.FileReference[], outputFilePath: string): (file: ts.SourceFile) => void {
            return file => {
                let declFileName: string;
                if (file.isDeclarationFile) { // Neither decl files or js should have their refs changed
                    declFileName = file.fileName;
                }
                else {
                    if (isBundledEmit && ts.contains((node as ts.Bundle).sourceFiles, file)) return; // Omit references to files which are being merged
                    const paths = ts.getOutputPathsFor(file, host, /*forceDtsPaths*/ true);
                    declFileName = paths.declarationFilePath || paths.jsFilePath || file.fileName;
                }

                if (declFileName) {
                    const specifier = ts.moduleSpecifiers.getModuleSpecifier(
                        options,
                        currentSourceFile,
                        ts.toPath(outputFilePath, host.getCurrentDirectory(), host.getCanonicalFileName),
                        ts.toPath(declFileName, host.getCurrentDirectory(), host.getCanonicalFileName),
                        host,
                    );
                    if (!ts.pathIsRelative(specifier)) {
                        // If some compiler option/symlink/whatever allows access to the file containing the ambient module declaration
                        // via a non-relative name, emit a type reference directive to that non-relative name, rather than
                        // a relative path to the declaration file
                        recordTypeReferenceDirectivesIfNecessary([[specifier, /*mode*/ undefined]]);
                        return;
                    }

                    let fileName = ts.getRelativePathToDirectoryOrUrl(
                        outputFilePath,
                        declFileName,
                        host.getCurrentDirectory(),
                        host.getCanonicalFileName,
                        /*isAbsolutePathAnUrl*/ false
                    );
                    if (ts.startsWith(fileName, "./") && ts.hasExtension(fileName)) {
                        fileName = fileName.substring(2);
                    }

                    // omit references to files from node_modules (npm may disambiguate module
                    // references when installing this package, making the path is unreliable).
                    if (ts.startsWith(fileName, "node_modules/") || ts.pathContainsNodeModules(fileName)) {
                        return;
                    }

                    references.push({ pos: -1, end: -1, fileName });
                }
            };
        }
    }

    function collectReferences(sourceFile: ts.SourceFile | ts.UnparsedSource, ret: ts.ESMap<ts.NodeId, ts.SourceFile>) {
        if (noResolve || (!ts.isUnparsedSource(sourceFile) && ts.isSourceFileJS(sourceFile))) return ret;
        ts.forEach(sourceFile.referencedFiles, f => {
            const elem = host.getSourceFileFromReference(sourceFile, f);
            if (elem) {
                ret.set(ts.getOriginalNodeId(elem), elem);
            }
        });
        return ret;
    }

    function collectLibs(sourceFile: ts.SourceFile | ts.UnparsedSource, ret: ts.ESMap<string, boolean>) {
        ts.forEach(sourceFile.libReferenceDirectives, ref => {
            const lib = host.getLibFileFromReference(ref);
            if (lib) {
                ret.set(ts.toFileNameLowerCase(ref.fileName), true);
            }
        });
        return ret;
    }

    function filterBindingPatternInitializersAndRenamings(name: ts.BindingName) {
        if (name.kind === ts.SyntaxKind.Identifier) {
            return name;
        }
        else {
            if (name.kind === ts.SyntaxKind.ArrayBindingPattern) {
                return factory.updateArrayBindingPattern(name, ts.visitNodes(name.elements, visitBindingElement));
            }
            else {
                return factory.updateObjectBindingPattern(name, ts.visitNodes(name.elements, visitBindingElement));
            }
        }

        function visitBindingElement<T extends ts.ArrayBindingElement>(elem: T): T;
        function visitBindingElement(elem: ts.ArrayBindingElement): ts.ArrayBindingElement {
            if (elem.kind === ts.SyntaxKind.OmittedExpression) {
                return elem;
            }
            if (elem.propertyName && ts.isIdentifier(elem.propertyName) && ts.isIdentifier(elem.name) && !elem.symbol.isReferenced) {
               // Unnecessary property renaming is forbidden in types, so remove renaming
                return factory.updateBindingElement(
                    elem,
                    elem.dotDotDotToken,
                    /* propertyName */ undefined,
                    elem.propertyName,
                    shouldPrintWithInitializer(elem) ? elem.initializer : undefined
                );
            }
            return factory.updateBindingElement(
                elem,
                elem.dotDotDotToken,
                elem.propertyName,
                filterBindingPatternInitializersAndRenamings(elem.name),
                shouldPrintWithInitializer(elem) ? elem.initializer : undefined
            );
        }
    }

    function ensureParameter(p: ts.ParameterDeclaration, modifierMask?: ts.ModifierFlags, type?: ts.TypeNode): ts.ParameterDeclaration {
        let oldDiag: typeof getSymbolAccessibilityDiagnostic | undefined;
        if (!suppressNewDiagnosticContexts) {
            oldDiag = getSymbolAccessibilityDiagnostic;
            getSymbolAccessibilityDiagnostic = ts.createGetSymbolAccessibilityDiagnosticForNode(p);
        }
        const newParam = factory.updateParameterDeclaration(
            p,
            maskModifiers(p, modifierMask),
            p.dotDotDotToken,
            filterBindingPatternInitializersAndRenamings(p.name),
            resolver.isOptionalParameter(p) ? (p.questionToken || factory.createToken(ts.SyntaxKind.QuestionToken)) : undefined,
            ensureType(p, type || p.type, /*ignorePrivate*/ true), // Ignore private param props, since this type is going straight back into a param
            ensureNoInitializer(p)
        );
        if (!suppressNewDiagnosticContexts) {
            getSymbolAccessibilityDiagnostic = oldDiag!;
        }
        return newParam;
    }

    function shouldPrintWithInitializer(node: ts.Node) {
        return canHaveLiteralInitializer(node) && resolver.isLiteralConstDeclaration(ts.getParseTreeNode(node) as CanHaveLiteralInitializer); // TODO: Make safe
    }

    function ensureNoInitializer(node: CanHaveLiteralInitializer) {
        if (shouldPrintWithInitializer(node)) {
            return resolver.createLiteralConstValue(ts.getParseTreeNode(node) as CanHaveLiteralInitializer, symbolTracker); // TODO: Make safe
        }
        return undefined;
    }

    type HasInferredType =
        | ts.FunctionDeclaration
        | ts.MethodDeclaration
        | ts.GetAccessorDeclaration
        | ts.SetAccessorDeclaration
        | ts.BindingElement
        | ts.ConstructSignatureDeclaration
        | ts.VariableDeclaration
        | ts.MethodSignature
        | ts.CallSignatureDeclaration
        | ts.ParameterDeclaration
        | ts.PropertyDeclaration
        | ts.PropertySignature;

    function ensureType(node: HasInferredType, type: ts.TypeNode | undefined, ignorePrivate?: boolean): ts.TypeNode | undefined {
        if (!ignorePrivate && ts.hasEffectiveModifier(node, ts.ModifierFlags.Private)) {
            // Private nodes emit no types (except private parameter properties, whose parameter types are actually visible)
            return;
        }
        if (shouldPrintWithInitializer(node)) {
            // Literal const declarations will have an initializer ensured rather than a type
            return;
        }
        const shouldUseResolverType = node.kind === ts.SyntaxKind.Parameter &&
            (resolver.isRequiredInitializedParameter(node) ||
             resolver.isOptionalUninitializedParameterProperty(node));
        if (type && !shouldUseResolverType) {
            return ts.visitNode(type, visitDeclarationSubtree);
        }
        if (!ts.getParseTreeNode(node)) {
            return type ? ts.visitNode(type, visitDeclarationSubtree) : factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
        }
        if (node.kind === ts.SyntaxKind.SetAccessor) {
            // Set accessors with no associated type node (from it's param or get accessor return) are `any` since they are never contextually typed right now
            // (The inferred type here will be void, but the old declaration emitter printed `any`, so this replicates that)
            return factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
        }
        errorNameNode = node.name;
        let oldDiag: typeof getSymbolAccessibilityDiagnostic;
        if (!suppressNewDiagnosticContexts) {
            oldDiag = getSymbolAccessibilityDiagnostic;
            getSymbolAccessibilityDiagnostic = ts.createGetSymbolAccessibilityDiagnosticForNode(node);
        }
        if (node.kind === ts.SyntaxKind.VariableDeclaration || node.kind === ts.SyntaxKind.BindingElement) {
            return cleanup(resolver.createTypeOfDeclaration(node, enclosingDeclaration, declarationEmitNodeBuilderFlags, symbolTracker));
        }
        if (node.kind === ts.SyntaxKind.Parameter
            || node.kind === ts.SyntaxKind.PropertyDeclaration
            || node.kind === ts.SyntaxKind.PropertySignature) {
            if (ts.isPropertySignature(node) || !node.initializer) return cleanup(resolver.createTypeOfDeclaration(node, enclosingDeclaration, declarationEmitNodeBuilderFlags, symbolTracker, shouldUseResolverType));
            return cleanup(resolver.createTypeOfDeclaration(node, enclosingDeclaration, declarationEmitNodeBuilderFlags, symbolTracker, shouldUseResolverType) || resolver.createTypeOfExpression(node.initializer, enclosingDeclaration, declarationEmitNodeBuilderFlags, symbolTracker));
        }
        return cleanup(resolver.createReturnTypeOfSignatureDeclaration(node, enclosingDeclaration, declarationEmitNodeBuilderFlags, symbolTracker));

        function cleanup(returnValue: ts.TypeNode | undefined) {
            errorNameNode = undefined;
            if (!suppressNewDiagnosticContexts) {
                getSymbolAccessibilityDiagnostic = oldDiag;
            }
            return returnValue || factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
        }
    }

    function isDeclarationAndNotVisible(node: ts.NamedDeclaration) {
        node = ts.getParseTreeNode(node) as ts.NamedDeclaration;
        switch (node.kind) {
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.ModuleDeclaration:
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.TypeAliasDeclaration:
            case ts.SyntaxKind.EnumDeclaration:
                return !resolver.isDeclarationVisible(node);
            // The following should be doing their own visibility checks based on filtering their members
            case ts.SyntaxKind.VariableDeclaration:
                return !getBindingNameVisible(node as ts.VariableDeclaration);
            case ts.SyntaxKind.ImportEqualsDeclaration:
            case ts.SyntaxKind.ImportDeclaration:
            case ts.SyntaxKind.ExportDeclaration:
            case ts.SyntaxKind.ExportAssignment:
                return false;
            case ts.SyntaxKind.ClassStaticBlockDeclaration:
                return true;
        }
        return false;
    }

    // If the ExpandoFunctionDeclaration have multiple overloads, then we only need to emit properties for the last one.
    function shouldEmitFunctionProperties(input: ts.FunctionDeclaration) {
        if (input.body) {
            return true;
        }

        const overloadSignatures = input.symbol.declarations?.filter(decl => ts.isFunctionDeclaration(decl) && !decl.body);
        return !overloadSignatures || overloadSignatures.indexOf(input) === overloadSignatures.length - 1;
    }

    function getBindingNameVisible(elem: ts.BindingElement | ts.VariableDeclaration | ts.OmittedExpression): boolean {
        if (ts.isOmittedExpression(elem)) {
            return false;
        }
        if (ts.isBindingPattern(elem.name)) {
            // If any child binding pattern element has been marked visible (usually by collect linked aliases), then this is visible
            return ts.some(elem.name.elements, getBindingNameVisible);
        }
        else {
            return resolver.isDeclarationVisible(elem);
        }
    }

    function updateParamsList(node: ts.Node, params: ts.NodeArray<ts.ParameterDeclaration>, modifierMask?: ts.ModifierFlags) {
        if (ts.hasEffectiveModifier(node, ts.ModifierFlags.Private)) {
            return undefined!; // TODO: GH#18217
        }
        const newParams = ts.map(params, p => ensureParameter(p, modifierMask));
        if (!newParams) {
            return undefined!; // TODO: GH#18217
        }
        return factory.createNodeArray(newParams, params.hasTrailingComma);
    }

    function updateAccessorParamsList(input: ts.AccessorDeclaration, isPrivate: boolean) {
        let newParams: ts.ParameterDeclaration[] | undefined;
        if (!isPrivate) {
            const thisParameter = ts.getThisParameter(input);
            if (thisParameter) {
                newParams = [ensureParameter(thisParameter)];
            }
        }
        if (ts.isSetAccessorDeclaration(input)) {
            let newValueParameter: ts.ParameterDeclaration | undefined;
            if (!isPrivate) {
                const valueParameter = ts.getSetAccessorValueParameter(input);
                if (valueParameter) {
                    const accessorType = getTypeAnnotationFromAllAccessorDeclarations(input, resolver.getAllAccessorDeclarations(input));
                    newValueParameter = ensureParameter(valueParameter, /*modifierMask*/ undefined, accessorType);
                }
            }
            if (!newValueParameter) {
                newValueParameter = factory.createParameterDeclaration(
                    /*modifiers*/ undefined,
                    /*dotDotDotToken*/ undefined,
                    "value"
                );
            }
            newParams = ts.append(newParams, newValueParameter);
        }
        return factory.createNodeArray(newParams || ts.emptyArray);
    }

    function ensureTypeParams(node: ts.Node, params: ts.NodeArray<ts.TypeParameterDeclaration> | undefined) {
        return ts.hasEffectiveModifier(node, ts.ModifierFlags.Private) ? undefined : ts.visitNodes(params, visitDeclarationSubtree);
    }

    function isEnclosingDeclaration(node: ts.Node) {
        return ts.isSourceFile(node)
            || ts.isTypeAliasDeclaration(node)
            || ts.isModuleDeclaration(node)
            || ts.isClassDeclaration(node)
            || ts.isInterfaceDeclaration(node)
            || ts.isFunctionLike(node)
            || ts.isIndexSignatureDeclaration(node)
            || ts.isMappedTypeNode(node);
    }

    function checkEntityNameVisibility(entityName: ts.EntityNameOrEntityNameExpression, enclosingDeclaration: ts.Node) {
        const visibilityResult = resolver.isEntityNameVisible(entityName, enclosingDeclaration);
        handleSymbolAccessibilityError(visibilityResult);
        recordTypeReferenceDirectivesIfNecessary(resolver.getTypeReferenceDirectivesForEntityName(entityName));
    }

    function preserveJsDoc<T extends ts.Node>(updated: T, original: ts.Node): T {
        if (ts.hasJSDocNodes(updated) && ts.hasJSDocNodes(original)) {
            updated.jsDoc = original.jsDoc;
        }
        return ts.setCommentRange(updated, ts.getCommentRange(original));
    }

    function rewriteModuleSpecifier<T extends ts.Node>(parent: ts.ImportEqualsDeclaration | ts.ImportDeclaration | ts.ExportDeclaration | ts.ModuleDeclaration | ts.ImportTypeNode, input: T | undefined): T | ts.StringLiteral {
        if (!input) return undefined!; // TODO: GH#18217
        resultHasExternalModuleIndicator = resultHasExternalModuleIndicator || (parent.kind !== ts.SyntaxKind.ModuleDeclaration && parent.kind !== ts.SyntaxKind.ImportType);
        if (ts.isStringLiteralLike(input)) {
            if (isBundledEmit) {
                const newName = ts.getExternalModuleNameFromDeclaration(context.getEmitHost(), resolver, parent);
                if (newName) {
                    return factory.createStringLiteral(newName);
                }
            }
            else {
                const symbol = resolver.getSymbolOfExternalModuleSpecifier(input);
                if (symbol) {
                    (exportedModulesFromDeclarationEmit || (exportedModulesFromDeclarationEmit = [])).push(symbol);
                }
            }
        }
        return input;
    }

    function transformImportEqualsDeclaration(decl: ts.ImportEqualsDeclaration) {
        if (!resolver.isDeclarationVisible(decl)) return;
        if (decl.moduleReference.kind === ts.SyntaxKind.ExternalModuleReference) {
            // Rewrite external module names if necessary
            const specifier = ts.getExternalModuleImportEqualsDeclarationExpression(decl);
            return factory.updateImportEqualsDeclaration(
                decl,
                decl.modifiers,
                decl.isTypeOnly,
                decl.name,
                factory.updateExternalModuleReference(decl.moduleReference, rewriteModuleSpecifier(decl, specifier))
            );
        }
        else {
            const oldDiag = getSymbolAccessibilityDiagnostic;
            getSymbolAccessibilityDiagnostic = ts.createGetSymbolAccessibilityDiagnosticForNode(decl);
            checkEntityNameVisibility(decl.moduleReference, enclosingDeclaration);
            getSymbolAccessibilityDiagnostic = oldDiag;
            return decl;
        }
    }

    function transformImportDeclaration(decl: ts.ImportDeclaration) {
        if (!decl.importClause) {
            // import "mod" - possibly needed for side effects? (global interface patches, module augmentations, etc)
            return factory.updateImportDeclaration(
                decl,
                decl.modifiers,
                decl.importClause,
                rewriteModuleSpecifier(decl, decl.moduleSpecifier),
                getResolutionModeOverrideForClauseInNightly(decl.assertClause)
            );
        }
        // The `importClause` visibility corresponds to the default's visibility.
        const visibleDefaultBinding = decl.importClause && decl.importClause.name && resolver.isDeclarationVisible(decl.importClause) ? decl.importClause.name : undefined;
        if (!decl.importClause.namedBindings) {
            // No named bindings (either namespace or list), meaning the import is just default or should be elided
            return visibleDefaultBinding && factory.updateImportDeclaration(decl, decl.modifiers, factory.updateImportClause(
                decl.importClause,
                decl.importClause.isTypeOnly,
                visibleDefaultBinding,
                /*namedBindings*/ undefined,
            ), rewriteModuleSpecifier(decl, decl.moduleSpecifier), getResolutionModeOverrideForClauseInNightly(decl.assertClause));
        }
        if (decl.importClause.namedBindings.kind === ts.SyntaxKind.NamespaceImport) {
            // Namespace import (optionally with visible default)
            const namedBindings = resolver.isDeclarationVisible(decl.importClause.namedBindings) ? decl.importClause.namedBindings : /*namedBindings*/ undefined;
            return visibleDefaultBinding || namedBindings ? factory.updateImportDeclaration(decl, decl.modifiers, factory.updateImportClause(
                decl.importClause,
                decl.importClause.isTypeOnly,
                visibleDefaultBinding,
                namedBindings,
            ), rewriteModuleSpecifier(decl, decl.moduleSpecifier), getResolutionModeOverrideForClauseInNightly(decl.assertClause)) : undefined;
        }
        // Named imports (optionally with visible default)
        const bindingList = ts.mapDefined(decl.importClause.namedBindings.elements, b => resolver.isDeclarationVisible(b) ? b : undefined);
        if ((bindingList && bindingList.length) || visibleDefaultBinding) {
            return factory.updateImportDeclaration(
                decl,
                decl.modifiers,
                factory.updateImportClause(
                    decl.importClause,
                    decl.importClause.isTypeOnly,
                    visibleDefaultBinding,
                    bindingList && bindingList.length ? factory.updateNamedImports(decl.importClause.namedBindings, bindingList) : undefined,
                ),
                rewriteModuleSpecifier(decl, decl.moduleSpecifier),
                getResolutionModeOverrideForClauseInNightly(decl.assertClause)
            );
        }
        // Augmentation of export depends on import
        if (resolver.isImportRequiredByAugmentation(decl)) {
            return factory.updateImportDeclaration(
                decl,
                decl.modifiers,
                /*importClause*/ undefined,
                rewriteModuleSpecifier(decl, decl.moduleSpecifier),
                getResolutionModeOverrideForClauseInNightly(decl.assertClause)
            );
        }
        // Nothing visible
    }

    function getResolutionModeOverrideForClauseInNightly(assertClause: ts.AssertClause | undefined) {
        const mode = ts.getResolutionModeOverrideForClause(assertClause);
        if (mode !== undefined) {
            if (!ts.isNightly()) {
                context.addDiagnostic(ts.createDiagnosticForNode(assertClause!, ts.Diagnostics.resolution_mode_assertions_are_unstable_Use_nightly_TypeScript_to_silence_this_error_Try_updating_with_npm_install_D_typescript_next));
            }
            return assertClause;
        }
        return undefined;
    }

    function transformAndReplaceLatePaintedStatements(statements: ts.NodeArray<ts.Statement>): ts.NodeArray<ts.Statement> {
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
        while (ts.length(lateMarkedStatements)) {
            const i = lateMarkedStatements!.shift()!;
            if (!ts.isLateVisibilityPaintedStatement(i)) {
                return ts.Debug.fail(`Late replaced statement was found which is not handled by the declaration transformer!: ${ts.Debug.formatSyntaxKind((i as ts.Node).kind)}`);
            }
            const priorNeedsDeclare = needsDeclare;
            needsDeclare = i.parent && ts.isSourceFile(i.parent) && !(ts.isExternalModule(i.parent) && isBundledEmit);
            const result = transformTopLevelDeclaration(i);
            needsDeclare = priorNeedsDeclare;
            lateStatementReplacementMap.set(ts.getOriginalNodeId(i), result);
        }

        // And lastly, we need to get the final form of all those indetermine import declarations from before and add them to the output list
        // (and remove them from the set to examine for outter declarations)
        return ts.visitNodes(statements, visitLateVisibilityMarkedStatements);

        function visitLateVisibilityMarkedStatements(statement: ts.Statement) {
            if (ts.isLateVisibilityPaintedStatement(statement)) {
                const key = ts.getOriginalNodeId(statement);
                if (lateStatementReplacementMap.has(key)) {
                    const result = lateStatementReplacementMap.get(key);
                    lateStatementReplacementMap.delete(key);
                    if (result) {
                        if (ts.isArray(result) ? ts.some(result, ts.needsScopeMarker) : ts.needsScopeMarker(result)) {
                            // Top-level declarations in .d.ts files are always considered exported even without a modifier unless there's an export assignment or specifier
                            needsScopeFixMarker = true;
                        }
                        if (ts.isSourceFile(statement.parent) && (ts.isArray(result) ? ts.some(result, ts.isExternalModuleIndicator) : ts.isExternalModuleIndicator(result))) {
                            resultHasExternalModuleIndicator = true;
                        }
                    }
                    return result;
                }
            }
            return statement;
        }
    }

    function visitDeclarationSubtree(input: ts.Node): ts.VisitResult<ts.Node> {
        if (shouldStripInternal(input)) return;
        if (ts.isDeclaration(input)) {
            if (isDeclarationAndNotVisible(input)) return;
            if (ts.hasDynamicName(input) && !resolver.isLateBound(ts.getParseTreeNode(input) as ts.Declaration)) {
                return;
            }
        }

        // Elide implementation signatures from overload sets
        if (ts.isFunctionLike(input) && resolver.isImplementationOfOverload(input)) return;

        // Elide semicolon class statements
        if (ts.isSemicolonClassElement(input)) return;

        let previousEnclosingDeclaration: typeof enclosingDeclaration;
        if (isEnclosingDeclaration(input)) {
            previousEnclosingDeclaration = enclosingDeclaration;
            enclosingDeclaration = input as ts.Declaration;
        }
        const oldDiag = getSymbolAccessibilityDiagnostic;

        // Setup diagnostic-related flags before first potential `cleanup` call, otherwise
        // We'd see a TDZ violation at runtime
        const canProduceDiagnostic = ts.canProduceDiagnostics(input);
        const oldWithinObjectLiteralType = suppressNewDiagnosticContexts;
        let shouldEnterSuppressNewDiagnosticsContextContext = ((input.kind === ts.SyntaxKind.TypeLiteral || input.kind === ts.SyntaxKind.MappedType) && input.parent.kind !== ts.SyntaxKind.TypeAliasDeclaration);

        // Emit methods which are private as properties with no type information
        if (ts.isMethodDeclaration(input) || ts.isMethodSignature(input)) {
            if (ts.hasEffectiveModifier(input, ts.ModifierFlags.Private)) {
                if (input.symbol && input.symbol.declarations && input.symbol.declarations[0] !== input) return; // Elide all but the first overload
                return cleanup(factory.createPropertyDeclaration(ensureModifiers(input), input.name, /*questionToken*/ undefined, /*type*/ undefined, /*initializer*/ undefined));
            }
        }

        if (canProduceDiagnostic && !suppressNewDiagnosticContexts) {
            getSymbolAccessibilityDiagnostic = ts.createGetSymbolAccessibilityDiagnosticForNode(input);
        }

        if (ts.isTypeQueryNode(input)) {
            checkEntityNameVisibility(input.exprName, enclosingDeclaration);
        }

        if (shouldEnterSuppressNewDiagnosticsContextContext) {
            // We stop making new diagnostic contexts within object literal types. Unless it's an object type on the RHS of a type alias declaration. Then we do.
            suppressNewDiagnosticContexts = true;
        }

        if (isProcessedComponent(input)) {
            switch (input.kind) {
                case ts.SyntaxKind.ExpressionWithTypeArguments: {
                    if ((ts.isEntityName(input.expression) || ts.isEntityNameExpression(input.expression))) {
                        checkEntityNameVisibility(input.expression, enclosingDeclaration);
                    }
                    const node = ts.visitEachChild(input, visitDeclarationSubtree, context);
                    return cleanup(factory.updateExpressionWithTypeArguments(node, node.expression, node.typeArguments));
                }
                case ts.SyntaxKind.TypeReference: {
                    checkEntityNameVisibility(input.typeName, enclosingDeclaration);
                    const node = ts.visitEachChild(input, visitDeclarationSubtree, context);
                    return cleanup(factory.updateTypeReferenceNode(node, node.typeName, node.typeArguments));
                }
                case ts.SyntaxKind.ConstructSignature:
                    return cleanup(factory.updateConstructSignature(
                        input,
                        ensureTypeParams(input, input.typeParameters),
                        updateParamsList(input, input.parameters),
                        ensureType(input, input.type)
                    ));
                case ts.SyntaxKind.Constructor: {
                    // A constructor declaration may not have a type annotation
                    const ctor = factory.createConstructorDeclaration(
                        /*modifiers*/ ensureModifiers(input),
                        updateParamsList(input, input.parameters, ts.ModifierFlags.None),
                        /*body*/ undefined
                    );
                    return cleanup(ctor);
                }
                case ts.SyntaxKind.MethodDeclaration: {
                    if (ts.isPrivateIdentifier(input.name)) {
                        return cleanup(/*returnValue*/ undefined);
                    }
                    const sig = factory.createMethodDeclaration(
                        ensureModifiers(input),
                        /*asteriskToken*/ undefined,
                        input.name,
                        input.questionToken,
                        ensureTypeParams(input, input.typeParameters),
                        updateParamsList(input, input.parameters),
                        ensureType(input, input.type),
                        /*body*/ undefined
                    );
                    return cleanup(sig);
                }
                case ts.SyntaxKind.GetAccessor: {
                    if (ts.isPrivateIdentifier(input.name)) {
                        return cleanup(/*returnValue*/ undefined);
                    }
                    const accessorType = getTypeAnnotationFromAllAccessorDeclarations(input, resolver.getAllAccessorDeclarations(input));
                    return cleanup(factory.updateGetAccessorDeclaration(
                        input,
                        ensureModifiers(input),
                        input.name,
                        updateAccessorParamsList(input, ts.hasEffectiveModifier(input, ts.ModifierFlags.Private)),
                        ensureType(input, accessorType),
                        /*body*/ undefined));
                }
                case ts.SyntaxKind.SetAccessor: {
                    if (ts.isPrivateIdentifier(input.name)) {
                        return cleanup(/*returnValue*/ undefined);
                    }
                    return cleanup(factory.updateSetAccessorDeclaration(
                        input,
                        ensureModifiers(input),
                        input.name,
                        updateAccessorParamsList(input, ts.hasEffectiveModifier(input, ts.ModifierFlags.Private)),
                        /*body*/ undefined));
                }
                case ts.SyntaxKind.PropertyDeclaration:
                    if (ts.isPrivateIdentifier(input.name)) {
                        return cleanup(/*returnValue*/ undefined);
                    }
                    return cleanup(factory.updatePropertyDeclaration(
                        input,
                        ensureModifiers(input),
                        input.name,
                        input.questionToken,
                        ensureType(input, input.type),
                        ensureNoInitializer(input)
                    ));
                case ts.SyntaxKind.PropertySignature:
                    if (ts.isPrivateIdentifier(input.name)) {
                        return cleanup(/*returnValue*/ undefined);
                    }
                    return cleanup(factory.updatePropertySignature(
                        input,
                        ensureModifiers(input),
                        input.name,
                        input.questionToken,
                        ensureType(input, input.type)
                    ));
                case ts.SyntaxKind.MethodSignature: {
                    if (ts.isPrivateIdentifier(input.name)) {
                        return cleanup(/*returnValue*/ undefined);
                    }
                    return cleanup(factory.updateMethodSignature(
                        input,
                        ensureModifiers(input),
                        input.name,
                        input.questionToken,
                        ensureTypeParams(input, input.typeParameters),
                        updateParamsList(input, input.parameters),
                        ensureType(input, input.type)
                    ));
                }
                case ts.SyntaxKind.CallSignature: {
                    return cleanup(factory.updateCallSignature(
                        input,
                        ensureTypeParams(input, input.typeParameters),
                        updateParamsList(input, input.parameters),
                        ensureType(input, input.type)
                    ));
                }
                case ts.SyntaxKind.IndexSignature: {
                    return cleanup(factory.updateIndexSignature(
                        input,
                        ensureModifiers(input),
                        updateParamsList(input, input.parameters),
                        ts.visitNode(input.type, visitDeclarationSubtree) || factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword)
                    ));
                }
                case ts.SyntaxKind.VariableDeclaration: {
                    if (ts.isBindingPattern(input.name)) {
                        return recreateBindingPattern(input.name);
                    }
                    shouldEnterSuppressNewDiagnosticsContextContext = true;
                    suppressNewDiagnosticContexts = true; // Variable declaration types also suppress new diagnostic contexts, provided the contexts wouldn't be made for binding pattern types
                    return cleanup(factory.updateVariableDeclaration(input, input.name, /*exclamationToken*/ undefined, ensureType(input, input.type), ensureNoInitializer(input)));
                }
                case ts.SyntaxKind.TypeParameter: {
                    if (isPrivateMethodTypeParameter(input) && (input.default || input.constraint)) {
                        return cleanup(factory.updateTypeParameterDeclaration(input, input.modifiers, input.name, /*constraint*/ undefined, /*defaultType*/ undefined));
                    }
                    return cleanup(ts.visitEachChild(input, visitDeclarationSubtree, context));
                }
                case ts.SyntaxKind.ConditionalType: {
                    // We have to process conditional types in a special way because for visibility purposes we need to push a new enclosingDeclaration
                    // just for the `infer` types in the true branch. It's an implicit declaration scope that only applies to _part_ of the type.
                    const checkType = ts.visitNode(input.checkType, visitDeclarationSubtree);
                    const extendsType = ts.visitNode(input.extendsType, visitDeclarationSubtree);
                    const oldEnclosingDecl = enclosingDeclaration;
                    enclosingDeclaration = input.trueType;
                    const trueType = ts.visitNode(input.trueType, visitDeclarationSubtree);
                    enclosingDeclaration = oldEnclosingDecl;
                    const falseType = ts.visitNode(input.falseType, visitDeclarationSubtree);
                    return cleanup(factory.updateConditionalTypeNode(input, checkType, extendsType, trueType, falseType));
                }
                case ts.SyntaxKind.FunctionType: {
                    return cleanup(factory.updateFunctionTypeNode(input, ts.visitNodes(input.typeParameters, visitDeclarationSubtree), updateParamsList(input, input.parameters), ts.visitNode(input.type, visitDeclarationSubtree)));
                }
                case ts.SyntaxKind.ConstructorType: {
                    return cleanup(factory.updateConstructorTypeNode(input, ensureModifiers(input), ts.visitNodes(input.typeParameters, visitDeclarationSubtree), updateParamsList(input, input.parameters), ts.visitNode(input.type, visitDeclarationSubtree)));
                }
                case ts.SyntaxKind.ImportType: {
                    if (!ts.isLiteralImportTypeNode(input)) return cleanup(input);
                    return cleanup(factory.updateImportTypeNode(
                        input,
                        factory.updateLiteralTypeNode(input.argument, rewriteModuleSpecifier(input, input.argument.literal)),
                        input.assertions,
                        input.qualifier,
                        ts.visitNodes(input.typeArguments, visitDeclarationSubtree, ts.isTypeNode),
                        input.isTypeOf
                    ));
                }
                default: ts.Debug.assertNever(input, `Attempted to process unhandled node kind: ${ts.Debug.formatSyntaxKind((input as ts.Node).kind)}`);
            }
        }

        if (ts.isTupleTypeNode(input) && (ts.getLineAndCharacterOfPosition(currentSourceFile, input.pos).line === ts.getLineAndCharacterOfPosition(currentSourceFile, input.end).line)) {
            ts.setEmitFlags(input, ts.EmitFlags.SingleLine);
        }

        return cleanup(ts.visitEachChild(input, visitDeclarationSubtree, context));

        function cleanup<T extends ts.Node>(returnValue: T | undefined): T | undefined {
            if (returnValue && canProduceDiagnostic && ts.hasDynamicName(input as ts.Declaration)) {
                checkName(input);
            }
            if (isEnclosingDeclaration(input)) {
                enclosingDeclaration = previousEnclosingDeclaration;
            }
            if (canProduceDiagnostic && !suppressNewDiagnosticContexts) {
                getSymbolAccessibilityDiagnostic = oldDiag;
            }
            if (shouldEnterSuppressNewDiagnosticsContextContext) {
                suppressNewDiagnosticContexts = oldWithinObjectLiteralType;
            }
            if (returnValue === input) {
                return returnValue;
            }
            return returnValue && ts.setOriginalNode(preserveJsDoc(returnValue, input), input);
        }
    }

    function isPrivateMethodTypeParameter(node: ts.TypeParameterDeclaration) {
        return node.parent.kind === ts.SyntaxKind.MethodDeclaration && ts.hasEffectiveModifier(node.parent, ts.ModifierFlags.Private);
    }

    function visitDeclarationStatements(input: ts.Node): ts.VisitResult<ts.Node> {
        if (!isPreservedDeclarationStatement(input)) {
            // return undefined for unmatched kinds to omit them from the tree
            return;
        }
        if (shouldStripInternal(input)) return;

        switch (input.kind) {
            case ts.SyntaxKind.ExportDeclaration: {
                if (ts.isSourceFile(input.parent)) {
                    resultHasExternalModuleIndicator = true;
                }
                resultHasScopeMarker = true;
                // Always visible if the parent node isn't dropped for being not visible
                // Rewrite external module names if necessary
                return factory.updateExportDeclaration(
                    input,
                    input.modifiers,
                    input.isTypeOnly,
                    input.exportClause,
                    rewriteModuleSpecifier(input, input.moduleSpecifier),
                    ts.getResolutionModeOverrideForClause(input.assertClause) ? input.assertClause : undefined
                );
            }
            case ts.SyntaxKind.ExportAssignment: {
                // Always visible if the parent node isn't dropped for being not visible
                if (ts.isSourceFile(input.parent)) {
                    resultHasExternalModuleIndicator = true;
                }
                resultHasScopeMarker = true;
                if (input.expression.kind === ts.SyntaxKind.Identifier) {
                    return input;
                }
                else {
                    const newId = factory.createUniqueName("_default", ts.GeneratedIdentifierFlags.Optimistic);
                    getSymbolAccessibilityDiagnostic = () => ({
                        diagnosticMessage: ts.Diagnostics.Default_export_of_the_module_has_or_is_using_private_name_0,
                        errorNode: input
                    });
                    errorFallbackNode = input;
                    const varDecl = factory.createVariableDeclaration(newId, /*exclamationToken*/ undefined, resolver.createTypeOfExpression(input.expression, input, declarationEmitNodeBuilderFlags, symbolTracker), /*initializer*/ undefined);
                    errorFallbackNode = undefined;
                    const statement = factory.createVariableStatement(needsDeclare ? [factory.createModifier(ts.SyntaxKind.DeclareKeyword)] : [], factory.createVariableDeclarationList([varDecl], ts.NodeFlags.Const));

                    preserveJsDoc(statement, input);
                    ts.removeAllComments(input);
                    return [statement, factory.updateExportAssignment(input, input.modifiers, newId)];
                }
            }
        }

        const result = transformTopLevelDeclaration(input);
        // Don't actually transform yet; just leave as original node - will be elided/swapped by late pass
        lateStatementReplacementMap.set(ts.getOriginalNodeId(input), result);
        return input;
    }

    function stripExportModifiers(statement: ts.Statement): ts.Statement {
        if (ts.isImportEqualsDeclaration(statement) || ts.hasEffectiveModifier(statement, ts.ModifierFlags.Default) || !ts.canHaveModifiers(statement)) {
            // `export import` statements should remain as-is, as imports are _not_ implicitly exported in an ambient namespace
            // Likewise, `export default` classes and the like and just be `default`, so we preserve their `export` modifiers, too
            return statement;
        }

        const modifiers = factory.createModifiersFromModifierFlags(ts.getEffectiveModifierFlags(statement) & (ts.ModifierFlags.All ^ ts.ModifierFlags.Export));
        return factory.updateModifiers(statement, modifiers);
    }

    function transformTopLevelDeclaration(input: ts.LateVisibilityPaintedStatement) {
        if (lateMarkedStatements) {
            while (ts.orderedRemoveItem(lateMarkedStatements, input));
        }
        if (shouldStripInternal(input)) return;
        switch (input.kind) {
            case ts.SyntaxKind.ImportEqualsDeclaration: {
                return transformImportEqualsDeclaration(input);
            }
            case ts.SyntaxKind.ImportDeclaration: {
                return transformImportDeclaration(input);
            }
        }
        if (ts.isDeclaration(input) && isDeclarationAndNotVisible(input)) return;

        // Elide implementation signatures from overload sets
        if (ts.isFunctionLike(input) && resolver.isImplementationOfOverload(input)) return;

        let previousEnclosingDeclaration: typeof enclosingDeclaration;
        if (isEnclosingDeclaration(input)) {
            previousEnclosingDeclaration = enclosingDeclaration;
            enclosingDeclaration = input as ts.Declaration;
        }

        const canProdiceDiagnostic = ts.canProduceDiagnostics(input);
        const oldDiag = getSymbolAccessibilityDiagnostic;
        if (canProdiceDiagnostic) {
            getSymbolAccessibilityDiagnostic = ts.createGetSymbolAccessibilityDiagnosticForNode(input as ts.DeclarationDiagnosticProducing);
        }

        const previousNeedsDeclare = needsDeclare;
        switch (input.kind) {
            case ts.SyntaxKind.TypeAliasDeclaration: {
                needsDeclare = false;
                const clean = cleanup(factory.updateTypeAliasDeclaration(
                    input,
                    ensureModifiers(input),
                    input.name,
                    ts.visitNodes(input.typeParameters, visitDeclarationSubtree, ts.isTypeParameterDeclaration),
                    ts.visitNode(input.type, visitDeclarationSubtree, ts.isTypeNode)
                ));
                needsDeclare = previousNeedsDeclare;
                return clean;
            }
            case ts.SyntaxKind.InterfaceDeclaration: {
                return cleanup(factory.updateInterfaceDeclaration(
                    input,
                    ensureModifiers(input),
                    input.name,
                    ensureTypeParams(input, input.typeParameters),
                    transformHeritageClauses(input.heritageClauses),
                    ts.visitNodes(input.members, visitDeclarationSubtree)
                ));
            }
            case ts.SyntaxKind.FunctionDeclaration: {
                // Generators lose their generator-ness, excepting their return type
                const clean = cleanup(factory.updateFunctionDeclaration(
                    input,
                    ensureModifiers(input),
                    /*asteriskToken*/ undefined,
                    input.name,
                    ensureTypeParams(input, input.typeParameters),
                    updateParamsList(input, input.parameters),
                    ensureType(input, input.type),
                    /*body*/ undefined
                ));
                if (clean && resolver.isExpandoFunctionDeclaration(input) && shouldEmitFunctionProperties(input)) {
                    const props = resolver.getPropertiesOfContainerFunction(input);
                    // Use parseNodeFactory so it is usable as an enclosing declaration
                    const fakespace = ts.parseNodeFactory.createModuleDeclaration(/*modifiers*/ undefined, clean.name || factory.createIdentifier("_default"), factory.createModuleBlock([]), ts.NodeFlags.Namespace);
                    ts.setParent(fakespace, enclosingDeclaration as ts.SourceFile | ts.NamespaceDeclaration);
                    fakespace.locals = ts.createSymbolTable(props);
                    fakespace.symbol = props[0].parent!;
                    const exportMappings: [ts.Identifier, string][] = [];
                    let declarations: (ts.VariableStatement | ts.ExportDeclaration)[] = ts.mapDefined(props, p => {
                        if (!p.valueDeclaration || !ts.isPropertyAccessExpression(p.valueDeclaration)) {
                            return undefined; // TODO GH#33569: Handle element access expressions that created late bound names (rather than silently omitting them)
                        }
                        getSymbolAccessibilityDiagnostic = ts.createGetSymbolAccessibilityDiagnosticForNode(p.valueDeclaration);
                        const type = resolver.createTypeOfDeclaration(p.valueDeclaration, fakespace, declarationEmitNodeBuilderFlags, symbolTracker);
                        getSymbolAccessibilityDiagnostic = oldDiag;
                        const nameStr = ts.unescapeLeadingUnderscores(p.escapedName);
                        const isNonContextualKeywordName = ts.isStringANonContextualKeyword(nameStr);
                        const name = isNonContextualKeywordName ? factory.getGeneratedNameForNode(p.valueDeclaration) : factory.createIdentifier(nameStr);
                        if (isNonContextualKeywordName) {
                            exportMappings.push([name, nameStr]);
                        }
                        const varDecl = factory.createVariableDeclaration(name, /*exclamationToken*/ undefined, type, /*initializer*/ undefined);
                        return factory.createVariableStatement(isNonContextualKeywordName ? undefined : [factory.createToken(ts.SyntaxKind.ExportKeyword)], factory.createVariableDeclarationList([varDecl]));
                    });
                    if (!exportMappings.length) {
                        declarations = ts.mapDefined(declarations, declaration => factory.updateModifiers(declaration, ts.ModifierFlags.None));
                    }
                    else {
                        declarations.push(factory.createExportDeclaration(
                            /*modifiers*/ undefined,
                            /*isTypeOnly*/ false,
                            factory.createNamedExports(ts.map(exportMappings, ([gen, exp]) => {
                                return factory.createExportSpecifier(/*isTypeOnly*/ false, gen, exp);
                            }))
                        ));
                    }
                    const namespaceDecl = factory.createModuleDeclaration(ensureModifiers(input), input.name!, factory.createModuleBlock(declarations), ts.NodeFlags.Namespace);
                    if (!ts.hasEffectiveModifier(clean, ts.ModifierFlags.Default)) {
                        return [clean, namespaceDecl];
                    }

                    const modifiers = factory.createModifiersFromModifierFlags((ts.getEffectiveModifierFlags(clean) & ~ts.ModifierFlags.ExportDefault) | ts.ModifierFlags.Ambient);
                    const cleanDeclaration = factory.updateFunctionDeclaration(
                        clean,
                        modifiers,
                        /*asteriskToken*/ undefined,
                        clean.name,
                        clean.typeParameters,
                        clean.parameters,
                        clean.type,
                        /*body*/ undefined
                    );

                    const namespaceDeclaration = factory.updateModuleDeclaration(
                        namespaceDecl,
                        modifiers,
                        namespaceDecl.name,
                        namespaceDecl.body
                    );

                    const exportDefaultDeclaration = factory.createExportAssignment(
                        /*modifiers*/ undefined,
                        /*isExportEquals*/ false,
                        namespaceDecl.name
                    );

                    if (ts.isSourceFile(input.parent)) {
                        resultHasExternalModuleIndicator = true;
                    }
                    resultHasScopeMarker = true;

                    return [cleanDeclaration, namespaceDeclaration, exportDefaultDeclaration];
                }
                else {
                    return clean;
                }
            }
            case ts.SyntaxKind.ModuleDeclaration: {
                needsDeclare = false;
                const inner = input.body;
                if (inner && inner.kind === ts.SyntaxKind.ModuleBlock) {
                    const oldNeedsScopeFix = needsScopeFixMarker;
                    const oldHasScopeFix = resultHasScopeMarker;
                    resultHasScopeMarker = false;
                    needsScopeFixMarker = false;
                    const statements = ts.visitNodes(inner.statements, visitDeclarationStatements);
                    let lateStatements = transformAndReplaceLatePaintedStatements(statements);
                    if (input.flags & ts.NodeFlags.Ambient) {
                        needsScopeFixMarker = false; // If it was `declare`'d everything is implicitly exported already, ignore late printed "privates"
                    }
                    // With the final list of statements, there are 3 possibilities:
                    // 1. There's an export assignment or export declaration in the namespace - do nothing
                    // 2. Everything is exported and there are no export assignments or export declarations - strip all export modifiers
                    // 3. Some things are exported, some are not, and there's no marker - add an empty marker
                    if (!ts.isGlobalScopeAugmentation(input) && !hasScopeMarker(lateStatements) && !resultHasScopeMarker) {
                        if (needsScopeFixMarker) {
                            lateStatements = factory.createNodeArray([...lateStatements, ts.createEmptyExports(factory)]);
                        }
                        else {
                            lateStatements = ts.visitNodes(lateStatements, stripExportModifiers);
                        }
                    }
                    const body = factory.updateModuleBlock(inner, lateStatements);
                    needsDeclare = previousNeedsDeclare;
                    needsScopeFixMarker = oldNeedsScopeFix;
                    resultHasScopeMarker = oldHasScopeFix;
                    const mods = ensureModifiers(input);
                    return cleanup(factory.updateModuleDeclaration(
                        input,
                        mods,
                        ts.isExternalModuleAugmentation(input) ? rewriteModuleSpecifier(input, input.name) : input.name,
                        body
                    ));
                }
                else {
                    needsDeclare = previousNeedsDeclare;
                    const mods = ensureModifiers(input);
                    needsDeclare = false;
                    ts.visitNode(inner, visitDeclarationStatements);
                    // eagerly transform nested namespaces (the nesting doesn't need any elision or painting done)
                    const id = ts.getOriginalNodeId(inner!); // TODO: GH#18217
                    const body = lateStatementReplacementMap.get(id);
                    lateStatementReplacementMap.delete(id);
                    return cleanup(factory.updateModuleDeclaration(
                        input,
                        mods,
                        input.name,
                        body as ts.ModuleBody
                    ));
                }
            }
            case ts.SyntaxKind.ClassDeclaration: {
                errorNameNode = input.name;
                errorFallbackNode = input;
                const modifiers = factory.createNodeArray(ensureModifiers(input));
                const typeParameters = ensureTypeParams(input, input.typeParameters);
                const ctor = ts.getFirstConstructorWithBody(input);
                let parameterProperties: readonly ts.PropertyDeclaration[] | undefined;
                if (ctor) {
                    const oldDiag = getSymbolAccessibilityDiagnostic;
                    parameterProperties = ts.compact(ts.flatMap(ctor.parameters, (param) => {
                        if (!ts.hasSyntacticModifier(param, ts.ModifierFlags.ParameterPropertyModifier) || shouldStripInternal(param)) return;
                        getSymbolAccessibilityDiagnostic = ts.createGetSymbolAccessibilityDiagnosticForNode(param);
                        if (param.name.kind === ts.SyntaxKind.Identifier) {
                            return preserveJsDoc(factory.createPropertyDeclaration(
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

                        function walkBindingPattern(pattern: ts.BindingPattern) {
                            let elems: ts.PropertyDeclaration[] | undefined;
                            for (const elem of pattern.elements) {
                                if (ts.isOmittedExpression(elem)) continue;
                                if (ts.isBindingPattern(elem.name)) {
                                    elems = ts.concatenate(elems, walkBindingPattern(elem.name));
                                }
                                elems = elems || [];
                                elems.push(factory.createPropertyDeclaration(
                                    ensureModifiers(param),
                                    elem.name as ts.Identifier,
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

                const hasPrivateIdentifier = ts.some(input.members, member => !!member.name && ts.isPrivateIdentifier(member.name));
                // When the class has at least one private identifier, create a unique constant identifier to retain the nominal typing behavior
                // Prevents other classes with the same public members from being used in place of the current class
                const privateIdentifier = hasPrivateIdentifier ? [
                    factory.createPropertyDeclaration(
                        /*modifiers*/ undefined,
                        factory.createPrivateIdentifier("#private"),
                        /*questionToken*/ undefined,
                        /*type*/ undefined,
                        /*initializer*/ undefined
                    )
                ] : undefined;
                const memberNodes = ts.concatenate(ts.concatenate(privateIdentifier, parameterProperties), ts.visitNodes(input.members, visitDeclarationSubtree));
                const members = factory.createNodeArray(memberNodes);

                const extendsClause = ts.getEffectiveBaseTypeNode(input);
                if (extendsClause && !ts.isEntityNameExpression(extendsClause.expression) && extendsClause.expression.kind !== ts.SyntaxKind.NullKeyword) {
                    // We must add a temporary declaration for the extends clause expression

                    const oldId = input.name ? ts.unescapeLeadingUnderscores(input.name.escapedText) : "default";
                    const newId = factory.createUniqueName(`${oldId}_base`, ts.GeneratedIdentifierFlags.Optimistic);
                    getSymbolAccessibilityDiagnostic = () => ({
                        diagnosticMessage: ts.Diagnostics.extends_clause_of_exported_class_0_has_or_is_using_private_name_1,
                        errorNode: extendsClause,
                        typeName: input.name
                    });
                    const varDecl = factory.createVariableDeclaration(newId, /*exclamationToken*/ undefined, resolver.createTypeOfExpression(extendsClause.expression, input, declarationEmitNodeBuilderFlags, symbolTracker), /*initializer*/ undefined);
                    const statement = factory.createVariableStatement(needsDeclare ? [factory.createModifier(ts.SyntaxKind.DeclareKeyword)] : [], factory.createVariableDeclarationList([varDecl], ts.NodeFlags.Const));
                    const heritageClauses = factory.createNodeArray(ts.map(input.heritageClauses, clause => {
                        if (clause.token === ts.SyntaxKind.ExtendsKeyword) {
                            const oldDiag = getSymbolAccessibilityDiagnostic;
                            getSymbolAccessibilityDiagnostic = ts.createGetSymbolAccessibilityDiagnosticForNode(clause.types[0]);
                            const newClause = factory.updateHeritageClause(clause, ts.map(clause.types, t => factory.updateExpressionWithTypeArguments(t, newId, ts.visitNodes(t.typeArguments, visitDeclarationSubtree))));
                            getSymbolAccessibilityDiagnostic = oldDiag;
                            return newClause;
                        }
                        return factory.updateHeritageClause(clause, ts.visitNodes(factory.createNodeArray(ts.filter(clause.types, t => ts.isEntityNameExpression(t.expression) || t.expression.kind === ts.SyntaxKind.NullKeyword)), visitDeclarationSubtree));
                    }));
                    return [statement, cleanup(factory.updateClassDeclaration(
                        input,
                        modifiers,
                        input.name,
                        typeParameters,
                        heritageClauses,
                        members
                    ))!]; // TODO: GH#18217
                }
                else {
                    const heritageClauses = transformHeritageClauses(input.heritageClauses);
                    return cleanup(factory.updateClassDeclaration(
                        input,
                        modifiers,
                        input.name,
                        typeParameters,
                        heritageClauses,
                        members
                    ));
                }
            }
            case ts.SyntaxKind.VariableStatement: {
                return cleanup(transformVariableStatement(input));
            }
            case ts.SyntaxKind.EnumDeclaration: {
                return cleanup(factory.updateEnumDeclaration(input, factory.createNodeArray(ensureModifiers(input)), input.name, factory.createNodeArray(ts.mapDefined(input.members, m => {
                    if (shouldStripInternal(m)) return;
                    // Rewrite enum values to their constants, if available
                    const constValue = resolver.getConstantValue(m);
                    return preserveJsDoc(factory.updateEnumMember(m, m.name, constValue !== undefined ? typeof constValue === "string" ? factory.createStringLiteral(constValue) : factory.createNumericLiteral(constValue) : undefined), m);
                }))));
            }
        }
        // Anything left unhandled is an error, so this should be unreachable
        return ts.Debug.assertNever(input, `Unhandled top-level node in declaration emit: ${ts.Debug.formatSyntaxKind((input as ts.Node).kind)}`);

        function cleanup<T extends ts.Node>(node: T | undefined): T | undefined {
            if (isEnclosingDeclaration(input)) {
                enclosingDeclaration = previousEnclosingDeclaration;
            }
            if (canProdiceDiagnostic) {
                getSymbolAccessibilityDiagnostic = oldDiag;
            }
            if (input.kind === ts.SyntaxKind.ModuleDeclaration) {
                needsDeclare = previousNeedsDeclare;
            }
            if (node as ts.Node === input) {
                return node;
            }
            errorFallbackNode = undefined;
            errorNameNode = undefined;
            return node && ts.setOriginalNode(preserveJsDoc(node, input), input);
        }
    }

    function transformVariableStatement(input: ts.VariableStatement) {
        if (!ts.forEach(input.declarationList.declarations, getBindingNameVisible)) return;
        const nodes = ts.visitNodes(input.declarationList.declarations, visitDeclarationSubtree);
        if (!ts.length(nodes)) return;
        return factory.updateVariableStatement(input, factory.createNodeArray(ensureModifiers(input)), factory.updateVariableDeclarationList(input.declarationList, nodes));
    }

    function recreateBindingPattern(d: ts.BindingPattern): ts.VariableDeclaration[] {
        return ts.flatten<ts.VariableDeclaration>(ts.mapDefined(d.elements, e => recreateBindingElement(e)));
    }

    function recreateBindingElement(e: ts.ArrayBindingElement) {
        if (e.kind === ts.SyntaxKind.OmittedExpression) {
            return;
        }
        if (e.name) {
            if (!getBindingNameVisible(e)) return;
            if (ts.isBindingPattern(e.name)) {
                return recreateBindingPattern(e.name);
            }
            else {
                return factory.createVariableDeclaration(e.name, /*exclamationToken*/ undefined, ensureType(e, /*type*/ undefined), /*initializer*/ undefined);
            }
        }
    }

    function checkName(node: ts.DeclarationDiagnosticProducing) {
        let oldDiag: typeof getSymbolAccessibilityDiagnostic | undefined;
        if (!suppressNewDiagnosticContexts) {
            oldDiag = getSymbolAccessibilityDiagnostic;
            getSymbolAccessibilityDiagnostic = ts.createGetSymbolAccessibilityDiagnosticForNodeName(node);
        }
        errorNameNode = (node as ts.NamedDeclaration).name;
        ts.Debug.assert(resolver.isLateBound(ts.getParseTreeNode(node) as ts.Declaration)); // Should only be called with dynamic names
        const decl = node as ts.NamedDeclaration as ts.LateBoundDeclaration;
        const entityName = decl.name.expression;
        checkEntityNameVisibility(entityName, enclosingDeclaration);
        if (!suppressNewDiagnosticContexts) {
            getSymbolAccessibilityDiagnostic = oldDiag!;
        }
        errorNameNode = undefined;
    }

    function shouldStripInternal(node: ts.Node) {
        return !!stripInternal && !!node && isInternalDeclaration(node, currentSourceFile);
    }

    function isScopeMarker(node: ts.Node) {
        return ts.isExportAssignment(node) || ts.isExportDeclaration(node);
    }

    function hasScopeMarker(statements: readonly ts.Statement[]) {
        return ts.some(statements, isScopeMarker);
    }

    function ensureModifiers<T extends ts.HasModifiers>(node: T): readonly ts.Modifier[] | undefined {
        const currentFlags = ts.getEffectiveModifierFlags(node);
        const newFlags = ensureModifierFlags(node);
        if (currentFlags === newFlags) {
            return ts.visitArray(node.modifiers, n => ts.tryCast(n, ts.isModifier), ts.isModifier);
        }
        return factory.createModifiersFromModifierFlags(newFlags);
    }

    function ensureModifierFlags(node: ts.Node): ts.ModifierFlags {
        let mask = ts.ModifierFlags.All ^ (ts.ModifierFlags.Public | ts.ModifierFlags.Async | ts.ModifierFlags.Override); // No async and override modifiers in declaration files
        let additions = (needsDeclare && !isAlwaysType(node)) ? ts.ModifierFlags.Ambient : ts.ModifierFlags.None;
        const parentIsFile = node.parent.kind === ts.SyntaxKind.SourceFile;
        if (!parentIsFile || (isBundledEmit && parentIsFile && ts.isExternalModule(node.parent as ts.SourceFile))) {
            mask ^= ts.ModifierFlags.Ambient;
            additions = ts.ModifierFlags.None;
        }
        return maskModifierFlags(node, mask, additions);
    }

    function getTypeAnnotationFromAllAccessorDeclarations(node: ts.AccessorDeclaration, accessors: ts.AllAccessorDeclarations) {
        let accessorType = getTypeAnnotationFromAccessor(node);
        if (!accessorType && node !== accessors.firstAccessor) {
            accessorType = getTypeAnnotationFromAccessor(accessors.firstAccessor);
            // If we end up pulling the type from the second accessor, we also need to change the diagnostic context to get the expected error message
            getSymbolAccessibilityDiagnostic = ts.createGetSymbolAccessibilityDiagnosticForNode(accessors.firstAccessor);
        }
        if (!accessorType && accessors.secondAccessor && node !== accessors.secondAccessor) {
            accessorType = getTypeAnnotationFromAccessor(accessors.secondAccessor);
            // If we end up pulling the type from the second accessor, we also need to change the diagnostic context to get the expected error message
            getSymbolAccessibilityDiagnostic = ts.createGetSymbolAccessibilityDiagnosticForNode(accessors.secondAccessor);
        }
        return accessorType;
    }

    function transformHeritageClauses(nodes: ts.NodeArray<ts.HeritageClause> | undefined) {
        return factory.createNodeArray(ts.filter(ts.map(nodes, clause => factory.updateHeritageClause(clause, ts.visitNodes(factory.createNodeArray(ts.filter(clause.types, t => {
            return ts.isEntityNameExpression(t.expression) || (clause.token === ts.SyntaxKind.ExtendsKeyword && t.expression.kind === ts.SyntaxKind.NullKeyword);
        })), visitDeclarationSubtree))), clause => clause.types && !!clause.types.length));
    }
}

function isAlwaysType(node: ts.Node) {
    if (node.kind === ts.SyntaxKind.InterfaceDeclaration) {
        return true;
    }
    return false;
}

// Elide "public" modifier, as it is the default
function maskModifiers(node: ts.Node, modifierMask?: ts.ModifierFlags, modifierAdditions?: ts.ModifierFlags): ts.Modifier[] | undefined {
    return ts.factory.createModifiersFromModifierFlags(maskModifierFlags(node, modifierMask, modifierAdditions));
}

function maskModifierFlags(node: ts.Node, modifierMask: ts.ModifierFlags = ts.ModifierFlags.All ^ ts.ModifierFlags.Public, modifierAdditions: ts.ModifierFlags = ts.ModifierFlags.None): ts.ModifierFlags {
    let flags = (ts.getEffectiveModifierFlags(node) & modifierMask) | modifierAdditions;
    if (flags & ts.ModifierFlags.Default && !(flags & ts.ModifierFlags.Export)) {
        // A non-exported default is a nonsequitor - we usually try to remove all export modifiers
        // from statements in ambient declarations; but a default export must retain its export modifier to be syntactically valid
        flags ^= ts.ModifierFlags.Export;
    }
    if (flags & ts.ModifierFlags.Default && flags & ts.ModifierFlags.Ambient) {
        flags ^= ts.ModifierFlags.Ambient; // `declare` is never required alongside `default` (and would be an error if printed)
    }
    return flags;
}

function getTypeAnnotationFromAccessor(accessor: ts.AccessorDeclaration): ts.TypeNode | undefined {
    if (accessor) {
        return accessor.kind === ts.SyntaxKind.GetAccessor
            ? accessor.type // Getter - return type
            : accessor.parameters.length > 0
                ? accessor.parameters[0].type // Setter parameter type
                : undefined;
    }
}

type CanHaveLiteralInitializer = ts.VariableDeclaration | ts.PropertyDeclaration | ts.PropertySignature | ts.ParameterDeclaration;
function canHaveLiteralInitializer(node: ts.Node): boolean {
    switch (node.kind) {
        case ts.SyntaxKind.PropertyDeclaration:
        case ts.SyntaxKind.PropertySignature:
            return !ts.hasEffectiveModifier(node, ts.ModifierFlags.Private);
        case ts.SyntaxKind.Parameter:
        case ts.SyntaxKind.VariableDeclaration:
            return true;
    }
    return false;
}

type ProcessedDeclarationStatement =
    | ts.FunctionDeclaration
    | ts.ModuleDeclaration
    | ts.ImportEqualsDeclaration
    | ts.InterfaceDeclaration
    | ts.ClassDeclaration
    | ts.TypeAliasDeclaration
    | ts.EnumDeclaration
    | ts.VariableStatement
    | ts.ImportDeclaration
    | ts.ExportDeclaration
    | ts.ExportAssignment;

function isPreservedDeclarationStatement(node: ts.Node): node is ProcessedDeclarationStatement {
    switch (node.kind) {
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.ModuleDeclaration:
        case ts.SyntaxKind.ImportEqualsDeclaration:
        case ts.SyntaxKind.InterfaceDeclaration:
        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.TypeAliasDeclaration:
        case ts.SyntaxKind.EnumDeclaration:
        case ts.SyntaxKind.VariableStatement:
        case ts.SyntaxKind.ImportDeclaration:
        case ts.SyntaxKind.ExportDeclaration:
        case ts.SyntaxKind.ExportAssignment:
            return true;
    }
    return false;
}

type ProcessedComponent =
    | ts.ConstructSignatureDeclaration
    | ts.ConstructorDeclaration
    | ts.MethodDeclaration
    | ts.GetAccessorDeclaration
    | ts.SetAccessorDeclaration
    | ts.PropertyDeclaration
    | ts.PropertySignature
    | ts.MethodSignature
    | ts.CallSignatureDeclaration
    | ts.IndexSignatureDeclaration
    | ts.VariableDeclaration
    | ts.TypeParameterDeclaration
    | ts.ExpressionWithTypeArguments
    | ts.TypeReferenceNode
    | ts.ConditionalTypeNode
    | ts.FunctionTypeNode
    | ts.ConstructorTypeNode
    | ts.ImportTypeNode;

function isProcessedComponent(node: ts.Node): node is ProcessedComponent {
    switch (node.kind) {
        case ts.SyntaxKind.ConstructSignature:
        case ts.SyntaxKind.Constructor:
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.GetAccessor:
        case ts.SyntaxKind.SetAccessor:
        case ts.SyntaxKind.PropertyDeclaration:
        case ts.SyntaxKind.PropertySignature:
        case ts.SyntaxKind.MethodSignature:
        case ts.SyntaxKind.CallSignature:
        case ts.SyntaxKind.IndexSignature:
        case ts.SyntaxKind.VariableDeclaration:
        case ts.SyntaxKind.TypeParameter:
        case ts.SyntaxKind.ExpressionWithTypeArguments:
        case ts.SyntaxKind.TypeReference:
        case ts.SyntaxKind.ConditionalType:
        case ts.SyntaxKind.FunctionType:
        case ts.SyntaxKind.ConstructorType:
        case ts.SyntaxKind.ImportType:
            return true;
    }
    return false;
}
}
