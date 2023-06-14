import {
    __String,
    AccessorDeclaration,
    addRelatedInfo,
    AllAccessorDeclarations,
    AnyImportSyntax,
    append,
    ArrayBindingElement,
    arrayFrom,
    ArrayLiteralExpression,
    ArrowFunction,
    AsExpression,
    AssertClause,
    BindingElement,
    BindingName,
    BindingPattern,
    Bundle,
    CallExpression,
    CallSignatureDeclaration,
    canHaveModifiers,
    canProduceDiagnostics,
    ClassDeclaration,
    CommentRange,
    compact,
    concatenate,
    ConditionalExpression,
    ConditionalTypeNode,
    ConstructorDeclaration,
    ConstructorTypeNode,
    ConstructSignatureDeclaration,
    contains,
    createDiagnosticForNode,
    createEmptyExports,
    createGetSymbolAccessibilityDiagnosticForNode,
    createGetSymbolAccessibilityDiagnosticForNodeName,
    createSymbolTable,
    createUnparsedSourceFile,
    Debug,
    Declaration,
    DeclarationDiagnosticProducing,
    DeclarationName,
    declarationNameToString,
    Diagnostics,
    DiagnosticWithLocation,
    EmitFlags,
    EmitHost,
    EmitResolver,
    emptyArray,
    EntityName,
    EntityNameOrEntityNameExpression,
    EnumDeclaration,
    ExportAssignment,
    ExportDeclaration,
    ExpressionWithTypeArguments,
    factory,
    FileReference,
    filter,
    findIndex,
    flatMap,
    flatten,
    forEach,
    forEachChild,
    forEachChildRecursively,
    FunctionDeclaration,
    FunctionExpression,
    FunctionLikeDeclaration,
    FunctionTypeNode,
    GeneratedIdentifierFlags,
    GetAccessorDeclaration,
    getCommentRange,
    getDirectoryPath,
    getEffectiveBaseTypeNode,
    getEffectiveModifierFlags,
    getExternalModuleImportEqualsDeclarationExpression,
    getExternalModuleNameFromDeclaration,
    getFirstConstructorWithBody,
    getLeadingCommentRanges,
    getLeadingCommentRangesOfNode,
    getLineAndCharacterOfPosition,
    getNameOfDeclaration,
    getNodeId,
    getOriginalNodeId,
    getOutputPathsFor,
    getParseTreeNode,
    getRelativePathToDirectoryOrUrl,
    getResolutionModeOverrideForClause,
    getResolvedExternalModuleName,
    getSetAccessorValueParameter,
    getSourceFileOfNode,
    GetSymbolAccessibilityDiagnostic,
    getSyntacticModifierFlags,
    getTextOfNode,
    getThisParameter,
    getTokenPosOfNode,
    getTrailingCommentRanges,
    hasDynamicName,
    hasEffectiveModifier,
    hasExtension,
    hasIdentifierComputedName,
    hasJSDocNodes,
    HasModifiers,
    hasSyntacticModifier,
    HeritageClause,
    Identifier,
    ImportDeclaration,
    ImportEqualsDeclaration,
    ImportTypeNode,
    IndexSignatureDeclaration,
    InterfaceDeclaration,
    isAnyImportSyntax,
    isArray,
    isArrayBindingElement,
    isArrayTypeNode,
    isBinaryExpression,
    isBindingElement,
    isBindingPattern,
    isBlock,
    isClassDeclaration,
    isClassElement,
    isClassLike,
    isComputedPropertyName,
    isConstructorTypeNode,
    isDeclaration,
    isElementAccessExpression,
    isEntityName,
    isEntityNameExpression,
    isExportAssignment,
    isExportDeclaration,
    isExpressionStatement,
    isExpressionWithTypeArguments,
    isExternalModule,
    isExternalModuleAugmentation,
    isExternalModuleIndicator,
    isExternalModuleReference,
    isExternalOrCommonJsModule,
    isFunctionDeclaration,
    isFunctionLike,
    isFunctionTypeNode,
    isGetAccessorDeclaration,
    isGlobalScopeAugmentation,
    isIdentifier,
    isIdentifierANonContextualKeyword,
    isIdentifierText,
    isImportDeclaration,
    isImportEqualsDeclaration,
    isIndexSignatureDeclaration,
    isInterfaceDeclaration,
    isJsonSourceFile,
    isLateVisibilityPaintedStatement,
    isLiteralExpression,
    isLiteralImportTypeNode,
    isLiteralTypeNode,
    isMappedTypeNode,
    isMethodDeclaration,
    isMethodSignature,
    isModifier,
    isModuleDeclaration,
    isNightly,
    isNoSubstitutionTemplateLiteral,
    isNumericLiteral,
    isOmittedExpression,
    isParameter,
    isPrivateIdentifier,
    isPropertyAccessExpression,
    isPropertyAssignment,
    isPropertyDeclaration,
    isPropertyName,
    isPropertySignature,
    isQualifiedName,
    isReturnStatement,
    isSemicolonClassElement,
    isSetAccessorDeclaration,
    isShorthandPropertyAssignment,
    isSourceFile,
    isSourceFileJS,
    isSourceFileNotJson,
    isSpreadAssignment,
    isSpreadElement,
    isStatement,
    isStringANonContextualKeyword,
    isStringLiteral,
    isStringLiteralLike,
    isTupleTypeNode,
    isTypeAliasDeclaration,
    isTypeElement,
    isTypeLiteralNode,
    isTypeNode,
    isTypeParameterDeclaration,
    isTypeQueryNode,
    isTypeReferenceNode,
    isUnparsedSource,
    isVariableDeclaration,
    isVariableStatement,
    isYieldExpression,
    KeywordTypeSyntaxKind,
    last,
    LateBoundDeclaration,
    LateVisibilityPaintedStatement,
    length,
    LiteralExpression,
    LiteralTypeNode,
    map,
    mapDefined,
    MethodDeclaration,
    MethodSignature,
    Modifier,
    ModifierFlags,
    ModuleBody,
    ModuleDeclaration,
    NamedDeclaration,
    NamespaceDeclaration,
    needsScopeMarker,
    NewExpression,
    Node,
    NodeArray,
    NodeBuilderFlags,
    NodeFactory,
    NodeFlags,
    NodeId,
    NodeWithTypeArguments,
    normalizeSlashes,
    nullTransformationContext,
    ObjectLiteralElementLike,
    ObjectLiteralExpression,
    OmittedExpression,
    orderedRemoveItem,
    ParameterDeclaration,
    ParenthesizedExpression,
    parseNodeFactory,
    pathContainsNodeModules,
    pathIsRelative,
    PrefixUnaryExpression,
    PropertyDeclaration,
    PropertyName,
    PropertySignature,
    pushIfUnique,
    QualifiedName,
    removeAllComments,
    ResolutionMode,
    ReturnStatement,
    SatisfiesExpression,
    ScriptTarget,
    SetAccessorDeclaration,
    setCommentRange,
    setEmitFlags,
    setOriginalNode,
    setParent,
    setTextRange,
    SignatureDeclaration,
    skipTrivia,
    some,
    SourceFile,
    startsWith,
    Statement,
    stringContains,
    StringLiteral,
    Symbol,
    SymbolAccessibility,
    SymbolAccessibilityResult,
    SymbolFlags,
    SymbolTracker,
    SyntaxKind,
    TemplateExpression,
    TemplateLiteralTypeSpan,
    toFileNameLowerCase,
    toPath,
    TransformationContext,
    transformNodes,
    tryCast,
    TypeAliasDeclaration,
    TypeAssertion,
    TypeElement,
    TypeLiteralNode,
    TypeNode,
    TypeParameterDeclaration,
    TypeReferenceNode,
    unescapeLeadingUnderscores,
    UnparsedSource,
    VariableDeclaration,
    VariableStatement,
    visitArray,
    visitEachChild,
    visitNode,
    visitNodes,
    Visitor,
    VisitResult,
    YieldExpression,
} from "../_namespaces/ts";
import * as moduleSpecifiers from "../_namespaces/ts.moduleSpecifiers";


const NO_LOCAL_INFERENCE = !!process.env.NO_LOCAL_INFERENCE;
enum NarrowBehavior {
    None = 0,
    AsConst = 1,
    KeepLiterals = 2,
    AsConstOrKeepLiterals = AsConst | KeepLiterals,
    NotKeepLiterals = ~KeepLiterals,
}

enum LocalTypeInfoFlags {
    None = 0,
    Fresh = 1 << 0,
    ImplicitAny = 1<< 1,
    Invalid = 1 << 2,
    Optimistic = 1 << 3,
}

/** @internal */
export function getDeclarationDiagnostics(host: EmitHost, resolver: EmitResolver, file: SourceFile | undefined): DiagnosticWithLocation[] | undefined {
    const compilerOptions = host.getCompilerOptions();
    const result = transformNodes(resolver, host, factory, compilerOptions, file ? [file] : filter(host.getSourceFiles(), isSourceFileNotJson), [transformDeclarations], /*allowDtsFiles*/ false);
    return result.diagnostics;
}

function hasInternalAnnotation(range: CommentRange, currentSourceFile: SourceFile) {
    const comment = currentSourceFile.text.substring(range.pos, range.end);
    return stringContains(comment, "@internal");
}

/** @internal */
export function isInternalDeclaration(node: Node, currentSourceFile: SourceFile) {
    const parseTreeNode = getParseTreeNode(node);
    if (parseTreeNode && parseTreeNode.kind === SyntaxKind.Parameter) {
        const paramIdx = (parseTreeNode.parent as SignatureDeclaration).parameters.indexOf(parseTreeNode as ParameterDeclaration);
        const previousSibling = paramIdx > 0 ? (parseTreeNode.parent as SignatureDeclaration).parameters[paramIdx - 1] : undefined;
        const text = currentSourceFile.text;
        const commentRanges = previousSibling
            ? concatenate(
                // to handle
                // ... parameters, /** @internal */
                // public param: string
                getTrailingCommentRanges(text, skipTrivia(text, previousSibling.end + 1, /*stopAfterLineBreak*/ false, /*stopAtComments*/ true)),
                getLeadingCommentRanges(text, node.pos)
            )
            : getTrailingCommentRanges(text, skipTrivia(text, node.pos, /*stopAfterLineBreak*/ false, /*stopAtComments*/ true));
        return commentRanges && commentRanges.length && hasInternalAnnotation(last(commentRanges), currentSourceFile);
    }
    const leadingCommentRanges = parseTreeNode && getLeadingCommentRangesOfNode(parseTreeNode, currentSourceFile);
    return !!forEach(leadingCommentRanges, range => {
        return hasInternalAnnotation(range, currentSourceFile);
    });
}

const declarationEmitNodeBuilderFlags =
    NodeBuilderFlags.MultilineObjectLiterals |
    NodeBuilderFlags.WriteClassExpressionAsTypeLiteral |
    NodeBuilderFlags.UseTypeOfFunction |
    NodeBuilderFlags.UseStructuralFallback |
    NodeBuilderFlags.AllowEmptyTuple |
    NodeBuilderFlags.GenerateNamesForShadowedTypeParams |
    NodeBuilderFlags.NoTruncation;

/**
 * Transforms a ts file into a .d.ts file
 * This process requires type information, which is retrieved through the emit resolver. Because of this,
 * in many places this transformer assumes it will be operating on parse tree nodes directly.
 * This means that _no transforms should be allowed to occur before this one_.
 *
 * @internal
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
    let necessaryTypeReferences: Set<[specifier: string, mode: ResolutionMode]> | undefined;
    let lateMarkedStatements: LateVisibilityPaintedStatement[] | undefined;
    let lateStatementReplacementMap: Map<NodeId, VisitResult<LateVisibilityPaintedStatement | ExportAssignment | undefined>>;
    let suppressNewDiagnosticContexts: boolean;
    let exportedModulesFromDeclarationEmit: Symbol[] | undefined;
    let localInferenceTargetNode: Node | undefined = undefined;

    const { factory } = context;
    const host = context.getEmitHost();
    const symbolTracker: SymbolTracker = {
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
    let errorNameNode: DeclarationName | undefined;
    let errorFallbackNode: Declaration | undefined;

    let currentSourceFile: SourceFile;
    let refs: Map<NodeId, SourceFile>;
    let libs: Map<string, boolean>;
    let emittedImports: readonly AnyImportSyntax[] | undefined; // must be declared in container so it can be `undefined` while transformer's first pass
    const resolver = context.getEmitResolver();
    const options = context.getCompilerOptions();
    const { noResolve, stripInternal } = options;
    const isolatedDeclarations = options.isolatedDeclarations;
    const strictNullChecks = !!options.strict || !!options.strictNullChecks;
    return transformRoot;

    function reportIsolatedDeclarationError(node: Node) {
        const message = createDiagnosticForNode(
            node,
            Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit
        );
        context.addDiagnostic(message);
    }
    function recordTypeReferenceDirectivesIfNecessary(typeReferenceDirectives: readonly [specifier: string, mode: ResolutionMode][] | undefined): void {
        if (!typeReferenceDirectives) {
            return;
        }
        necessaryTypeReferences = necessaryTypeReferences || new Set();
        for (const ref of typeReferenceDirectives) {
            necessaryTypeReferences.add(ref);
        }
    }

    function trackReferencedAmbientModule(node: ModuleDeclaration, symbol: Symbol) {
        // If it is visible via `// <reference types="..."/>`, then we should just use that
        // TODO: isolatedDeclarations: see about .All flag
        const directives = resolver.getTypeReferenceDirectivesForSymbol(symbol, SymbolFlags.All);
        if (length(directives)) {
            return recordTypeReferenceDirectivesIfNecessary(directives);
        }
        // Otherwise we should emit a path-based reference
        const container = getSourceFileOfNode(node);
        refs.set(getOriginalNodeId(container), container);
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
            if(localInferenceTargetNode) {
                reportIsolatedDeclarationError(localInferenceTargetNode);
                return true;
            }
            // Report error
            const errorInfo = getSymbolAccessibilityDiagnostic(symbolAccessibilityResult);
            if (errorInfo) {
                if (errorInfo.typeName) {
                    context.addDiagnostic(createDiagnosticForNode(symbolAccessibilityResult.errorNode || errorInfo.errorNode,
                        errorInfo.diagnosticMessage,
                        getTextOfNode(errorInfo.typeName),
                        symbolAccessibilityResult.errorSymbolName!,
                        symbolAccessibilityResult.errorModuleName!));
                }
                else {
                    context.addDiagnostic(createDiagnosticForNode(symbolAccessibilityResult.errorNode || errorInfo.errorNode,
                        errorInfo.diagnosticMessage,
                        symbolAccessibilityResult.errorSymbolName!,
                        symbolAccessibilityResult.errorModuleName!));
                }
                return true;
            }
        }
        return false;
    }

    function trackExternalModuleSymbolOfImportTypeNode(symbol: Symbol) {
        if (!isBundledEmit) {
            (exportedModulesFromDeclarationEmit || (exportedModulesFromDeclarationEmit = [])).push(symbol);
        }
    }

    function trackSymbol(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags) {
        if (symbol.flags & SymbolFlags.TypeParameter) return false;
        const issuedDiagnostic = handleSymbolAccessibilityError(resolver.isSymbolAccessible(symbol, enclosingDeclaration, meaning, /*shouldComputeAliasToMarkVisible*/ true));
        recordTypeReferenceDirectivesIfNecessary(resolver.getTypeReferenceDirectivesForSymbol(symbol, meaning));
        return issuedDiagnostic;
    }

    function reportPrivateInBaseOfClassExpression(propertyName: string) {
        if (errorNameNode || errorFallbackNode) {
            context.addDiagnostic(
                createDiagnosticForNode((errorNameNode || errorFallbackNode)!, Diagnostics.Property_0_of_exported_class_expression_may_not_be_private_or_protected, propertyName));
        }
    }

    function errorDeclarationNameWithFallback() {
        return errorNameNode ? declarationNameToString(errorNameNode) :
            errorFallbackNode && getNameOfDeclaration(errorFallbackNode) ? declarationNameToString(getNameOfDeclaration(errorFallbackNode)) :
            errorFallbackNode && isExportAssignment(errorFallbackNode) ? errorFallbackNode.isExportEquals ? "export=" : "default" :
            "(Missing)"; // same fallback declarationNameToString uses when node is zero-width (ie, nameless)
    }

    function reportInaccessibleUniqueSymbolError() {
        if (errorNameNode || errorFallbackNode) {
            context.addDiagnostic(createDiagnosticForNode((errorNameNode || errorFallbackNode)!, Diagnostics.The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary,
                errorDeclarationNameWithFallback(),
                "unique symbol"));
        }
    }

    function reportCyclicStructureError() {
        if (errorNameNode || errorFallbackNode) {
            context.addDiagnostic(createDiagnosticForNode((errorNameNode || errorFallbackNode)!, Diagnostics.The_inferred_type_of_0_references_a_type_with_a_cyclic_structure_which_cannot_be_trivially_serialized_A_type_annotation_is_necessary,
                errorDeclarationNameWithFallback()));
        }
    }

    function reportInaccessibleThisError() {
        if (errorNameNode || errorFallbackNode) {
            context.addDiagnostic(createDiagnosticForNode((errorNameNode || errorFallbackNode)!, Diagnostics.The_inferred_type_of_0_references_an_inaccessible_1_type_A_type_annotation_is_necessary,
                errorDeclarationNameWithFallback(),
                "this"));
        }
    }

    function reportLikelyUnsafeImportRequiredError(specifier: string) {
        if (errorNameNode || errorFallbackNode) {
            context.addDiagnostic(createDiagnosticForNode((errorNameNode || errorFallbackNode)!, Diagnostics.The_inferred_type_of_0_cannot_be_named_without_a_reference_to_1_This_is_likely_not_portable_A_type_annotation_is_necessary,
                errorDeclarationNameWithFallback(),
                specifier));
        }
    }

    function reportTruncationError() {
        if (errorNameNode || errorFallbackNode) {
            context.addDiagnostic(createDiagnosticForNode((errorNameNode || errorFallbackNode)!, Diagnostics.The_inferred_type_of_this_node_exceeds_the_maximum_length_the_compiler_will_serialize_An_explicit_type_annotation_is_needed));
        }
    }

    function reportNonlocalAugmentation(containingFile: SourceFile, parentSymbol: Symbol, symbol: Symbol) {
        const primaryDeclaration = parentSymbol.declarations?.find(d => getSourceFileOfNode(d) === containingFile);
        const augmentingDeclarations = filter(symbol.declarations, d => getSourceFileOfNode(d) !== containingFile);
        if (primaryDeclaration && augmentingDeclarations) {
            for (const augmentations of augmentingDeclarations) {
                context.addDiagnostic(addRelatedInfo(
                    createDiagnosticForNode(augmentations, Diagnostics.Declaration_augments_declaration_in_another_file_This_cannot_be_serialized),
                    createDiagnosticForNode(primaryDeclaration, Diagnostics.This_is_the_declaration_being_augmented_Consider_moving_the_augmenting_declaration_into_the_same_file)
                ));
            }
        }
    }

    function reportNonSerializableProperty(propertyName: string) {
        if (errorNameNode || errorFallbackNode) {
            context.addDiagnostic(createDiagnosticForNode((errorNameNode || errorFallbackNode)!, Diagnostics.The_type_of_this_node_cannot_be_serialized_because_its_property_0_cannot_be_serialized, propertyName));
        }
    }

    function reportImportTypeNodeResolutionModeOverride() {
        if (!isNightly() && (errorNameNode || errorFallbackNode)) {
            context.addDiagnostic(createDiagnosticForNode((errorNameNode || errorFallbackNode)!, Diagnostics.The_type_of_this_expression_cannot_be_named_without_a_resolution_mode_assertion_which_is_an_unstable_feature_Use_nightly_TypeScript_to_silence_this_error_Try_updating_with_npm_install_D_typescript_next));
        }
    }

    function transformDeclarationsForJS(sourceFile: SourceFile, bundled?: boolean) {
        const oldDiag = getSymbolAccessibilityDiagnostic;
        getSymbolAccessibilityDiagnostic = (s) => (s.errorNode && canProduceDiagnostics(s.errorNode) ? createGetSymbolAccessibilityDiagnosticForNode(s.errorNode)(s) : ({
            diagnosticMessage: s.errorModuleName
                ? Diagnostics.Declaration_emit_for_this_file_requires_using_private_name_0_from_module_1_An_explicit_type_annotation_may_unblock_declaration_emit
                : Diagnostics.Declaration_emit_for_this_file_requires_using_private_name_0_An_explicit_type_annotation_may_unblock_declaration_emit,
            errorNode: s.errorNode || sourceFile
        }));
        const result = resolver.getDeclarationStatementsForSourceFile(sourceFile, declarationEmitNodeBuilderFlags, symbolTracker, bundled);
        getSymbolAccessibilityDiagnostic = oldDiag;
        return result;
    }

    function transformRoot(node: Bundle): Bundle;
    function transformRoot(node: SourceFile): SourceFile;
    function transformRoot(node: SourceFile | Bundle): SourceFile | Bundle;
    function transformRoot(node: SourceFile | Bundle) {
        if (node.kind === SyntaxKind.SourceFile && node.isDeclarationFile) {
            return node;
        }

        if (node.kind === SyntaxKind.Bundle) {
            isBundledEmit = true;
            refs = new Map();
            libs = new Map();
            let hasNoDefaultLib = false;
            const bundle = factory.createBundle(map(node.sourceFiles,
                sourceFile => {
                    if (sourceFile.isDeclarationFile) return undefined!; // Omit declaration files from bundle results, too // TODO: GH#18217
                    hasNoDefaultLib = hasNoDefaultLib || sourceFile.hasNoDefaultLib;
                    currentSourceFile = sourceFile;
                    enclosingDeclaration = sourceFile;
                    lateMarkedStatements = undefined;
                    suppressNewDiagnosticContexts = false;
                    lateStatementReplacementMap = new Map();
                    getSymbolAccessibilityDiagnostic = throwDiagnostic;
                    needsScopeFixMarker = false;
                    resultHasScopeMarker = false;
                    collectReferences(sourceFile, refs);
                    collectLibs(sourceFile, libs);
                    if (isExternalOrCommonJsModule(sourceFile) || isJsonSourceFile(sourceFile)) {
                        resultHasExternalModuleIndicator = false; // unused in external module bundle emit (all external modules are within module blocks, therefore are known to be modules)
                        needsDeclare = false;
                        const statements = isSourceFileJS(sourceFile) ? factory.createNodeArray(transformDeclarationsForJS(sourceFile, /*bundled*/ true)) : visitNodes(sourceFile.statements, visitDeclarationStatements, isStatement);
                        const newFile = factory.updateSourceFile(sourceFile, [factory.createModuleDeclaration(
                            [factory.createModifier(SyntaxKind.DeclareKeyword)],
                            factory.createStringLiteral(getResolvedExternalModuleName(context.getEmitHost(), sourceFile)),
                            factory.createModuleBlock(setTextRange(factory.createNodeArray(transformAndReplaceLatePaintedStatements(statements)), sourceFile.statements))
                        )], /*isDeclarationFile*/ true, /*referencedFiles*/ [], /*typeReferences*/ [], /*hasNoDefaultLib*/ false, /*libReferences*/ []);
                        return newFile;
                    }
                    needsDeclare = true;
                    const updated = isSourceFileJS(sourceFile) ? factory.createNodeArray(transformDeclarationsForJS(sourceFile)) : visitNodes(sourceFile.statements, visitDeclarationStatements, isStatement);
                    return factory.updateSourceFile(sourceFile, transformAndReplaceLatePaintedStatements(updated), /*isDeclarationFile*/ true, /*referencedFiles*/ [], /*typeReferences*/ [], /*hasNoDefaultLib*/ false, /*libReferences*/ []);
                }
            ), mapDefined(node.prepends, prepend => {
                if (prepend.kind === SyntaxKind.InputFiles) {
                    const sourceFile = createUnparsedSourceFile(prepend, "dts", stripInternal);
                    hasNoDefaultLib = hasNoDefaultLib || !!sourceFile.hasNoDefaultLib;
                    collectReferences(sourceFile, refs);
                    recordTypeReferenceDirectivesIfNecessary(map(sourceFile.typeReferenceDirectives, ref => [ref.fileName, ref.resolutionMode]));
                    collectLibs(sourceFile, libs);
                    return sourceFile;
                }
                return prepend;
            }));
            bundle.syntheticFileReferences = [];
            bundle.syntheticTypeReferences = getFileReferencesForUsedTypeReferences();
            bundle.syntheticLibReferences = getLibReferences();
            bundle.hasNoDefaultLib = hasNoDefaultLib;
            const outputFilePath = getDirectoryPath(normalizeSlashes(getOutputPathsFor(node, host, /*forceDtsPaths*/ true).declarationFilePath!));
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
        lateStatementReplacementMap = new Map();
        necessaryTypeReferences = undefined;
        refs = collectReferences(currentSourceFile, new Map());
        libs = collectLibs(currentSourceFile, new Map());
        const references: FileReference[] = [];
        const outputFilePath = getDirectoryPath(normalizeSlashes(getOutputPathsFor(node, host, /*forceDtsPaths*/ true).declarationFilePath!));
        const referenceVisitor = mapReferencesIntoArray(references, outputFilePath);
        let combinedStatements: NodeArray<Statement>;
        if (isSourceFileJS(currentSourceFile)) {
            combinedStatements = factory.createNodeArray(transformDeclarationsForJS(node));
            refs.forEach(referenceVisitor);
            emittedImports = filter(combinedStatements, isAnyImportSyntax);
        }
        else {
            const statements = visitNodes(node.statements, visitDeclarationStatements, isStatement);
            combinedStatements = setTextRange(factory.createNodeArray(transformAndReplaceLatePaintedStatements(statements)), node.statements);
            refs.forEach(referenceVisitor);
            emittedImports = filter(combinedStatements, isAnyImportSyntax);
            if (isExternalModule(node) && (!resultHasExternalModuleIndicator || (needsScopeFixMarker && !resultHasScopeMarker))) {
                combinedStatements = setTextRange(factory.createNodeArray([...combinedStatements, createEmptyExports(factory)]), combinedStatements);
            }
        }
        const typeReferences = isolatedDeclarations? node.typeReferenceDirectives: getFileReferencesForUsedTypeReferences();
        const updated = factory.updateSourceFile(node, combinedStatements, /*isDeclarationFile*/ true, references, typeReferences, node.hasNoDefaultLib, getLibReferences());
        updated.exportedModulesFromDeclarationEmit = exportedModulesFromDeclarationEmit;
        return updated;

        function getLibReferences() {
            return arrayFrom(libs.keys(), lib => ({ fileName: lib, pos: -1, end: -1 }));
        }

        function getFileReferencesForUsedTypeReferences() {
            return necessaryTypeReferences ? mapDefined(arrayFrom(necessaryTypeReferences.keys()), getFileReferenceForSpecifierModeTuple) : [];
        }

        function getFileReferenceForSpecifierModeTuple([typeName, mode]: [specifier: string, mode: ResolutionMode]): FileReference | undefined {
            // Elide type references for which we have imports
            if (emittedImports) {
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
            }
            return { fileName: typeName, pos: -1, end: -1, ...(mode ? { resolutionMode: mode } : undefined) };
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
                    declFileName = paths.declarationFilePath || paths.jsFilePath || file.fileName;
                }

                if (declFileName) {
                    const specifier = moduleSpecifiers.getModuleSpecifier(
                        options,
                        currentSourceFile,
                        toPath(outputFilePath, host.getCurrentDirectory(), host.getCanonicalFileName),
                        toPath(declFileName, host.getCurrentDirectory(), host.getCanonicalFileName),
                        host,
                    );
                    if (!pathIsRelative(specifier)) {
                        // If some compiler option/symlink/whatever allows access to the file containing the ambient module declaration
                        // via a non-relative name, emit a type reference directive to that non-relative name, rather than
                        // a relative path to the declaration file
                        recordTypeReferenceDirectivesIfNecessary([[specifier, /*mode*/ undefined]]);
                        return;
                    }

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

                    // omit references to files from node_modules (npm may disambiguate module
                    // references when installing this package, making the path is unreliable).
                    if (startsWith(fileName, "node_modules/") || pathContainsNodeModules(fileName)) {
                        return;
                    }

                    references.push({ pos: -1, end: -1, fileName });
                }
            };
        }
    }

    function collectReferences(sourceFile: SourceFile | UnparsedSource, ret: Map<NodeId, SourceFile>) {
        if (noResolve || (!isUnparsedSource(sourceFile) && isSourceFileJS(sourceFile))) return ret;
        forEach(sourceFile.referencedFiles, f => {
            const elem = host.getSourceFileFromReference(sourceFile, f);
            if (elem) {
                ret.set(getOriginalNodeId(elem), elem);
            }
        });
        return ret;
    }

    function collectLibs(sourceFile: SourceFile | UnparsedSource, ret: Map<string, boolean>) {
        forEach(sourceFile.libReferenceDirectives, ref => {
            const lib = host.getLibFileFromReference(ref);
            if (lib) {
                ret.set(toFileNameLowerCase(ref.fileName), true);
            }
        });
        return ret;
    }

    function filterBindingPatternInitializersAndRenamings(name: BindingName) {
        if (name.kind === SyntaxKind.Identifier) {
            return name;
        }
        else {
            if (name.kind === SyntaxKind.ArrayBindingPattern) {
                return factory.updateArrayBindingPattern(name, visitNodes(name.elements, visitBindingElement, isArrayBindingElement));
            }
            else {
                return factory.updateObjectBindingPattern(name, visitNodes(name.elements, visitBindingElement, isBindingElement));
            }
        }

        function visitBindingElement<T extends Node>(elem: T): T;
        function visitBindingElement(elem: ArrayBindingElement): ArrayBindingElement {
            if (elem.kind === SyntaxKind.OmittedExpression) {
                return elem;
            }
            if (elem.propertyName && isIdentifier(elem.propertyName) && isIdentifier(elem.name)
                // TODO: isolated declarations: find a better way for this since we don't actually do signature usage analysis
                && !isolatedDeclarations && !elem.symbol.isReferenced && !isIdentifierANonContextualKeyword(elem.propertyName)) {
                // Unnecessary property renaming is forbidden in types, so remove renaming
                return factory.updateBindingElement(
                    elem,
                    elem.dotDotDotToken,
                    /*propertyName*/ undefined,
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

    function ensureParameter(p: ParameterDeclaration, modifierMask?: ModifierFlags, type?: TypeNode): ParameterDeclaration {
        let oldDiag: typeof getSymbolAccessibilityDiagnostic | undefined;
        if (!suppressNewDiagnosticContexts) {
            oldDiag = getSymbolAccessibilityDiagnostic;
            getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(p);
        }
        const newParam = factory.updateParameterDeclaration(
            p,
            maskModifiers(factory, p, modifierMask),
            p.dotDotDotToken,
            filterBindingPatternInitializersAndRenamings(p.name),
            resolver.isOptionalParameter(p) ? (p.questionToken || factory.createToken(SyntaxKind.QuestionToken)) : undefined,
            ensureType(p, type || p.type, /*ignorePrivate*/ true), // Ignore private param props, since this type is going straight back into a param
            ensureNoInitializer(p)
        );
        if (!suppressNewDiagnosticContexts) {
            getSymbolAccessibilityDiagnostic = oldDiag!;
        }
        return newParam;
    }

    function shouldPrintWithInitializer(node: Node) {
        return canHaveLiteralInitializer(node) && resolver.isLiteralConstDeclaration(getParseTreeNode(node) as CanHaveLiteralInitializer); // TODO: Make safe
    }

    function ensureNoInitializer(node: CanHaveLiteralInitializer) {
        if (shouldPrintWithInitializer(node)) {
            if(isolatedDeclarations && node.initializer && isLiteralExpression(node.initializer)) {
                return node.initializer;
            }
            return resolver.createLiteralConstValue(getParseTreeNode(node) as CanHaveLiteralInitializer, symbolTracker); // TODO: Make safe
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
    function makeInvalidType() {
        return factory.createTypeReferenceNode("invalid");
    }

    interface LocalTypeInfo { typeNode: TypeNode, sourceNode: Node, flags: LocalTypeInfoFlags }
    // We need to see about getting the JSX element type.
    function getJSXElementType(_node: Node): EntityName {
        return factory.createQualifiedName(
            factory.createQualifiedName(
                factory.createIdentifier("React"),
                factory.createIdentifier("JSX"),
            ),
            factory.createIdentifier("Element"),
        );
    }
    function entityNameExpressionToQualifiedName(node:EntityNameOrEntityNameExpression): EntityName {
        if(isIdentifier(node)) {
            return setTextRange(factory.cloneNode(node), node);
        }
        else if(isPropertyAccessExpression(node)) {
            return setTextRange(factory.createQualifiedName(
                entityNameExpressionToQualifiedName(node.expression),
                factory.cloneNode(node.name)
            ), node);
        }
        else if(isQualifiedName(node)) {
            return setTextRange(factory.createQualifiedName(
                entityNameExpressionToQualifiedName(node),
                factory.cloneNode(node.right)
            ), node);
        }
        throw Error("Should not happen");
    }
    
    function isSyntheticTypeNode(node: Node): node is TypeNode {
        return isTypeNode(node) && !!(node.flags & NodeFlags.Synthesized);
    }
    function finalizeSyntheticTypeNode<T extends Node | undefined>(typeNode: T, parent: Node): T {
        if(typeNode && typeNode.parent !== parent) {
            setParent(typeNode, parent);
            // Ensure no non synthetic nodes make it in here
            Debug.assert(typeNode.flags & NodeFlags.Synthesized)
            forEachChildRecursively(typeNode, (child, parent) => {
                Debug.assert(typeNode.flags & NodeFlags.Synthesized);
                if(child.parent === parent) {
                    return "skip";
                }
                setParent(child, parent);
            });
        }
        return typeNode as T & { isSynthetic: true };
    }
    function visitSyntheticType(typeNode: TypeNode, node: Node) {
        const previousLocalInferenceTargetNode = localInferenceTargetNode;
        try {
            localInferenceTargetNode = node;
            let visitedNode = visitNode(finalizeSyntheticTypeNode(typeNode, node), visitDeclarationSubtree,  isSyntheticTypeNode);
            Debug.assert(visitedNode);
            return visitedNode;
        } finally {
            localInferenceTargetNode = previousLocalInferenceTargetNode;
        }
    }

    function mergeFlags(existing: LocalTypeInfoFlags, newFlags: LocalTypeInfoFlags): LocalTypeInfoFlags {
        return existing | (newFlags | LocalTypeInfoFlags.Optimistic);
    }
    function getAccessorInfo(properties: NodeArray<ObjectLiteralElementLike>, knownAccessor: SetAccessorDeclaration | GetAccessorDeclaration) {
        const nameKey = getMemberKey(knownAccessor);
        const knownIsGetAccessor = isGetAccessorDeclaration(knownAccessor);
        const otherAccessorTest =  knownIsGetAccessor ? isSetAccessorDeclaration: isGetAccessorDeclaration;
        const otherAccessorIndex = properties.findIndex(n => otherAccessorTest(n) && getMemberKey(n) === nameKey);
        const otherAccessor = properties[otherAccessorIndex] as SetAccessorDeclaration | GetAccessorDeclaration | undefined;
        
        
        const getAccessor = knownIsGetAccessor ? knownAccessor: 
            otherAccessor && isGetAccessorDeclaration(otherAccessor)? otherAccessor:
            undefined;
        const setAccessor = !knownIsGetAccessor ? knownAccessor: 
            otherAccessor && isSetAccessorDeclaration(otherAccessor)? otherAccessor:
            undefined;

        
        return { 
            otherAccessorIndex,
            otherAccessor,
            getAccessor,
            setAccessor,
        }
    }
    function inferAccessorType(getAccessor?: GetAccessorDeclaration, setAccessor?: SetAccessorDeclaration) {
        
        let accessorType = getAccessor?.type && deepClone(visitType(getAccessor?.type, getAccessor));
        
        if(!accessorType && setAccessor) {
            accessorType = setAccessor.parameters[0].type;
            accessorType = accessorType && deepClone(visitType(accessorType, setAccessor));
        }

        if(!accessorType && getAccessor) {
            const localPropType = inferReturnType(getAccessor)
            accessorType = localPropType.typeNode;
        }

        return accessorType ?? makeInvalidType();
    }
    function localInference(node: Node, inferenceFlags: NarrowBehavior = NarrowBehavior.None): LocalTypeInfo {
        const nextInferenceFlags = inferenceFlags & NarrowBehavior.NotKeepLiterals;
        switch(node.kind) {
            case SyntaxKind.ParenthesizedExpression:
                return localInference((node as ParenthesizedExpression).expression, inferenceFlags);
            case SyntaxKind.QualifiedName:
                const typeNode = visitSyntheticType(factory.createTypeQueryNode(
                    entityNameExpressionToQualifiedName(node as QualifiedName)
                ), node);
                
                return regular(
                    typeNode,
                    node,
                    LocalTypeInfoFlags.Optimistic
                )
            case SyntaxKind.PropertyAccessExpression:
                if(isEntityNameExpression(node)) {                    
                    const typeNode = visitSyntheticType(factory.createTypeQueryNode(
                        entityNameExpressionToQualifiedName(node)
                    ), node);
                    return regular(
                        typeNode,
                        node,
                        LocalTypeInfoFlags.Optimistic
                    )
                }
                break;
            case SyntaxKind.Identifier: {
                if((node as Identifier).escapedText === "undefined") {
                    return createUndefinedTypeNode(node);
                }
                const typeNode = visitSyntheticType(factory.createTypeQueryNode(
                    deepClone(node as Identifier)
                ), node)

                return regular(typeNode, node, LocalTypeInfoFlags.Optimistic)
            }
            case SyntaxKind.NullKeyword:
                if(strictNullChecks) {
                    return regular(factory.createLiteralTypeNode(factory.createNull()), node);
                }
                else {
                    return regular(factory.createKeywordTypeNode(SyntaxKind.AnyKeyword), node, LocalTypeInfoFlags.ImplicitAny);
                }
            case SyntaxKind.CallExpression:
                const callExpression = node as CallExpression;
                if(isIdentifier(callExpression.expression) && callExpression.expression.escapedText === "Symbol") {
                    if(inferenceFlags & NarrowBehavior.KeepLiterals) {
                        return regular(
                            factory.createTypeOperatorNode(
                                SyntaxKind.UniqueKeyword, 
                                factory.createKeywordTypeNode(SyntaxKind.SymbolKeyword)
                            ),
                            node
                        )
                    } else {
                        return regular(
                            factory.createKeywordTypeNode(SyntaxKind.SymbolKeyword),
                            node
                        )
                    }
                }
            case SyntaxKind.NewExpression:
                const newExpr = node as NewExpression;
                if(isEntityNameExpression(newExpr.expression)) {
                    
                    const typeNode = visitSyntheticType(factory.createTypeReferenceNode(
                        entityNameExpressionToQualifiedName(newExpr.expression),
                        visitNodes(newExpr.typeArguments, deepClone, isTypeNode)!
                    ), node);
                    // Optimistic since the constructor might not have the same name as the type
                    return regular(typeNode, node, LocalTypeInfoFlags.Optimistic);
                }
                return invalid(node);
            case SyntaxKind.ArrowFunction:
            case SyntaxKind.FunctionExpression:
                const fnNode = node as FunctionExpression | ArrowFunction;
                const oldEnclosingDeclaration = enclosingDeclaration;
                try {
                    enclosingDeclaration = node;
                    const returnType = inferReturnType(fnNode);
                    const fnTypeNode = factory.createFunctionTypeNode(
                        visitNodes(fnNode.typeParameters, visitDeclarationSubtree, isTypeParameterDeclaration)?.map(deepClone),
                        fnNode.parameters.map(p => deepClone(ensureParameter(p))),
                        returnType.typeNode,
                    );
                    // If the return type is optimistic, teh whole function type is optimistic
                    const flags = mergeFlags(LocalTypeInfoFlags.None, returnType.flags)
                    return regular(fnTypeNode, node, flags);
                }
                finally {
                    enclosingDeclaration = oldEnclosingDeclaration;
                }
            case SyntaxKind.SatisfiesExpression: {
                const typeNode = localInference((node as SatisfiesExpression).expression);
                return { ...typeNode, flags: typeNode.flags | LocalTypeInfoFlags.Optimistic }
            }
            case SyntaxKind.TypeAssertionExpression:
            case SyntaxKind.AsExpression:
                const asExpression = node as AsExpression | TypeAssertion;
                if(isTypeReferenceNode(asExpression.type) && isConst(asExpression.type)) {
                    return localInference(asExpression.expression, NarrowBehavior.AsConst);
                }
                else {
                    const type = visitType(asExpression.type, asExpression);
                    if(isLiteralTypeNode(type) &&
                        (isNoSubstitutionTemplateLiteral(type.literal) || isStringLiteral(type.literal))) {
                        return regular(
                            factory.createLiteralTypeNode(
                                normalizeLiteralValue(type.literal)
                            ), 
                            node
                        );
                    }
                    return regular(deepClone(type), node);
                }
            case SyntaxKind.PrefixUnaryExpression:
                const prefixOp = node as PrefixUnaryExpression;
                if(prefixOp.operator === SyntaxKind.MinusToken || prefixOp.operator === SyntaxKind.PlusToken) {
                    if (NarrowBehavior.AsConstOrKeepLiterals & inferenceFlags) {
                        switch (prefixOp.operand.kind) {
                            case SyntaxKind.NumericLiteral:
                                switch (prefixOp.operator) {
                                    case SyntaxKind.MinusToken:
                                        return fresh(factory.createLiteralTypeNode(deepClone(prefixOp)), node);
                                    case SyntaxKind.PlusToken:
                                        return fresh(factory.createLiteralTypeNode(deepClone(prefixOp)), node);;
                                }
                            case SyntaxKind.BigIntLiteral:
                                if (prefixOp.operator === SyntaxKind.MinusToken) {
                                    return fresh(factory.createLiteralTypeNode(deepClone(prefixOp)), node);;
                                }
                        }
                    }

                    const targetExpressionType = localInference(prefixOp.operand, inferenceFlags);
                    if(isLiteralTypeNode(targetExpressionType.typeNode)) {
                        return {
                            flags: targetExpressionType.flags,
                            typeNode: getWidenedType(targetExpressionType),
                            sourceNode: node
                        };
                    }
                    else if(targetExpressionType.typeNode.kind === SyntaxKind.NumberKeyword || targetExpressionType.typeNode.kind === SyntaxKind.BigIntKeyword) {
                        return targetExpressionType;
                    }
                }
                break;
            case SyntaxKind.NumericLiteral:
                return literal(node, SyntaxKind.NumberKeyword, inferenceFlags);
            case SyntaxKind.TemplateExpression:
                    if(!(inferenceFlags & NarrowBehavior.AsConst)) {
                        return fresh(factory.createKeywordTypeNode(SyntaxKind.StringKeyword), node);
                    }
                    const templateExpression = node as TemplateExpression;
                    const templateSpans: TemplateLiteralTypeSpan[] = [];
                    for(const span of templateExpression.templateSpans) {
                        const {typeNode} = localInference(span.expression, nextInferenceFlags);
                        const literalSpan = factory.createTemplateLiteralTypeSpan(
                            typeNode,
                            span.literal
                        );
                        templateSpans.push(literalSpan);
                    }
                    return regular(
                        factory.createTemplateLiteralType(deepClone(templateExpression.head), templateSpans),
                        node
                    );
            case SyntaxKind.NoSubstitutionTemplateLiteral:
            case SyntaxKind.StringLiteral:
                return literal(node, SyntaxKind.StringKeyword, inferenceFlags);
            case SyntaxKind.BigIntLiteral:
                return literal(node, SyntaxKind.BigIntKeyword, inferenceFlags);
            case SyntaxKind.RegularExpressionLiteral:
                return literal(node, "RegExp", inferenceFlags);
            case SyntaxKind.JsxSelfClosingElement:
            case SyntaxKind.JsxElement:
                const typeReference = finalizeSyntheticTypeNode(factory.createTypeReferenceNode(getJSXElementType(node)), node.parent);
                checkEntityNameVisibility(typeReference.typeName, enclosingDeclaration);
                return fresh(typeReference, node);
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.FalseKeyword:
                return literal(node, SyntaxKind.BooleanKeyword, inferenceFlags);
            case SyntaxKind.ArrayLiteralExpression:
                const arrayLiteral = node as ArrayLiteralExpression;
                const elementTypesInfo: LocalTypeInfo[] = [];
                for(const element of arrayLiteral.elements) {
                    if(isSpreadElement(element)) {
                        const spreadType = localInference(element.expression, nextInferenceFlags)
                        const elementTypeNode = inferenceFlags & NarrowBehavior.AsConst ?
                            factory.createRestTypeNode(spreadType.typeNode) :
                            factory.createIndexedAccessTypeNode(spreadType.typeNode, factory.createKeywordTypeNode(SyntaxKind.NumberKeyword));

                        elementTypesInfo.push(
                            { ...spreadType, typeNode: elementTypeNode }
                        );
                    }
                    else if(isOmittedExpression(element)) {
                        elementTypesInfo.push(
                            createUndefinedTypeNode(element)
                        );
                    } else {
                        elementTypesInfo.push(
                            localInference(element, nextInferenceFlags)
                        );
                    }
                }
                if(inferenceFlags & NarrowBehavior.AsConst) {
                    const tupleType = factory.createTupleTypeNode(
                        elementTypesInfo.map(lti => lti.typeNode)
                    );
                    tupleType.emitNode = { flags: 1, autoGenerate: undefined, internalFlags: 0 };
                    return regular(factory.createTypeOperatorNode(SyntaxKind.ReadonlyKeyword, tupleType), node);
                }
                else {
                    let itemType;
                    if(elementTypesInfo.length === 0) {
                        itemType = (strictNullChecks ? factory.createKeywordTypeNode(SyntaxKind.NeverKeyword) : factory.createKeywordTypeNode(SyntaxKind.AnyKeyword));
                    }
                    else {
                        itemType = makeUnionFromTypes(node, elementTypesInfo, /*widenSingle*/ false).typeNode;
                    }

                    return regular(factory.createArrayTypeNode(itemType), node);
                }
            case SyntaxKind.ObjectLiteralExpression: {
                const objectLiteral = node as ObjectLiteralExpression;
                const properties: TypeElement[] = [];
                let addedIntersections: TypeNode[] | undefined;

                for(let propIndex =0, length = objectLiteral.properties.length; propIndex<length; propIndex++ ) {
                    const prop = objectLiteral.properties[propIndex]
                    if(prop.name && isComputedPropertyName(prop.name) && isEntityNameExpression(prop.name.expression)) {
                        checkEntityNameVisibility(prop.name.expression, prop);
                    }
                    const name = prop.name && deepClone(visitNode(prop.name, visitDeclarationSubtree, isPropertyName)!);
                    let newProp;
                    if(isMethodDeclaration(prop) && name) {
                        const oldEnclosingDeclaration = enclosingDeclaration;
                        enclosingDeclaration = prop;
                        const returnType = inferReturnType(prop);
                        const typeParameters = visitNodes(prop.typeParameters, visitDeclarationSubtree, isTypeParameterDeclaration)?.map(deepClone);
                        const parameters = prop.parameters.map(p => deepClone(ensureParameter(p)));
                        if (inferenceFlags & NarrowBehavior.AsConst) {
                            newProp = factory.createPropertySignature(
                                [factory.createModifier(SyntaxKind.ReadonlyKeyword)],
                                name,
                                /*questionToken*/ undefined,
                                factory.createFunctionTypeNode(
                                    typeParameters,
                                    parameters,
                                    returnType.typeNode,
                                )
                            );
                        }
                        else {
                            newProp = factory.createMethodSignature(
                                [],
                                name,
                                /*questionToken*/ undefined,
                                typeParameters,
                                parameters,
                                returnType.typeNode,
                            );
                        }
                        enclosingDeclaration = oldEnclosingDeclaration;
                    }
                    else if(isPropertyAssignment(prop) && name) {
                        const modifiers = inferenceFlags & NarrowBehavior.AsConst ?
                            [factory.createModifier(SyntaxKind.ReadonlyKeyword)]:
                            [];
                        newProp = factory.createPropertySignature(
                            modifiers,
                            name,
                            /*questionToken*/ undefined,
                            localInference(prop.initializer, nextInferenceFlags).typeNode
                        );
                    }
                    else if(isShorthandPropertyAssignment(prop) && name) {
                        const modifiers = inferenceFlags & NarrowBehavior.AsConst ?
                            [factory.createModifier(SyntaxKind.ReadonlyKeyword)]:
                            [];
                        newProp = factory.createPropertySignature(
                            modifiers,
                            name,
                            /*questionToken*/ undefined,
                            localInference(prop.name, nextInferenceFlags).typeNode
                        );
                    }
                    else if(isSpreadAssignment(prop)) {
                        addedIntersections ??= [];
                        addedIntersections.push(localInference(prop.expression, nextInferenceFlags).typeNode)
                    }
                    else {
                        if(isGetAccessorDeclaration(prop) || isSetAccessorDeclaration(prop)) {
                            const nameKey = getMemberKey(prop);
                            if(nameKey && name) {
                                const { getAccessor, setAccessor, otherAccessorIndex } = getAccessorInfo(objectLiteral.properties, prop);
                                if(otherAccessorIndex === -1 || otherAccessorIndex > propIndex) {
                                    const accessorType = inferAccessorType(getAccessor, setAccessor);
                                    const modifiers: Modifier[] = []
                                    if(!setAccessor) {
                                        modifiers.push(factory.createModifier(SyntaxKind.ReadonlyKeyword))
                                    }    
                                    
                                    newProp = factory.createPropertySignature(
                                        modifiers,
                                        name,
                                        /*questionToken*/ undefined,
                                        accessorType,
                                    );
                                }
                            } else {
                                return invalid(prop);
                            }
                        } else {
                            return invalid(prop);
                        }
                    }

                    if(newProp) {
                        const prevPos = newProp.name.pos;
                        const newPos = getTokenPosOfNode(newProp.name, currentSourceFile);
                        
                        setTextRange(newProp.name, {
                            pos: newPos,
                            end: newProp.name.end
                        });
                        setTextRange(newProp, {
                            pos: prevPos,
                            end: newProp.name.end,
                        })
                        setCommentRange(newProp, {
                            pos: prevPos,
                            end: newProp.name.pos
                        })
                        
                        properties.push(newProp)
                    }
                }

                let typeNode: TypeNode = factory.createTypeLiteralNode(properties);
                if (addedIntersections) {
                    if(properties.length !== 0) {
                        addedIntersections.push(typeNode);
                    }
                    typeNode = factory.createIntersectionTypeNode(addedIntersections); 
                }
                return regular(typeNode, objectLiteral);
            }
            case SyntaxKind.ConditionalExpression:
                const conditionalExpression = node as ConditionalExpression;
                const types = [
                    localInference(conditionalExpression.whenTrue, inferenceFlags & ~NarrowBehavior.AsConst),
                    localInference(conditionalExpression.whenFalse, inferenceFlags & ~NarrowBehavior.AsConst),
                ]
                return makeUnionFromTypes(node, types, /*widenSingle*/ false);
        }

        return regular(makeInvalidTypeAndReport(node), node);
    }
    function invalid(node: Node): LocalTypeInfo {
        return { typeNode: makeInvalidTypeAndReport(node), flags: LocalTypeInfoFlags.Invalid, sourceNode: node };
    }
    function fresh(typeNode: TypeNode, sourceNode: Node, flags = LocalTypeInfoFlags.None): LocalTypeInfo {
        return { typeNode: finalizeSyntheticTypeNode(typeNode, sourceNode.parent), flags: flags | LocalTypeInfoFlags.Fresh, sourceNode };
    }
    function regular(typeNode: TypeNode, sourceNode: Node, flags = LocalTypeInfoFlags.None): LocalTypeInfo {
        return { typeNode: finalizeSyntheticTypeNode(typeNode, sourceNode.parent), flags, sourceNode };
    }
    function normalizeLiteralValue(literal: LiteralExpression) {
        switch(literal.kind) {
            case SyntaxKind.BigIntLiteral:
            case SyntaxKind.TrueKeyword:
            case SyntaxKind.FalseKeyword:
                return deepClone(literal);
            case SyntaxKind.NoSubstitutionTemplateLiteral:
            case SyntaxKind.StringLiteral:
                return factory.createStringLiteral(literal.text);
            case SyntaxKind.NumericLiteral:
                return factory.createNumericLiteral(+literal.text);
        }
        throw new Error("Not supported");
    }
    function createUndefinedTypeNode(node: Node, flags = LocalTypeInfoFlags.None) {
        if(strictNullChecks) {
            return regular(
                factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword)
            , node, flags);
        }
        else {
            return regular(factory.createKeywordTypeNode(SyntaxKind.AnyKeyword), node, LocalTypeInfoFlags.ImplicitAny | flags);
        }
    }
    function literal(node: Node, baseType: string | KeywordTypeSyntaxKind, narrowBehavior: NarrowBehavior) {
        if(narrowBehavior & NarrowBehavior.AsConstOrKeepLiterals) {
            return fresh(factory.createLiteralTypeNode(
                normalizeLiteralValue(node as LiteralExpression)
            ), node);
        }
        else {
            return fresh(
                typeof baseType === "number" ? factory.createKeywordTypeNode(baseType) : factory.createTypeReferenceNode(baseType),
                node
            );
        }
    }
    function isConst(typeReference: TypeReferenceNode) {
        return isIdentifier(typeReference.typeName) && typeReference.typeName.escapedText === "const";
    }
    function makeInvalidTypeAndReport(node: Node) {
        reportIsolatedDeclarationError(node);
        return makeInvalidType() as TypeReferenceNode;
    }
    function visitType(type: TypeNode | undefined, owner: Node) {
        const visitedType = visitNode(type, visitDeclarationSubtree, isTypeNode);
        return visitedType ?? makeInvalidTypeAndReport(owner);
    }

    function getMemberKey(member: MethodSignature | PropertySignature | GetAccessorDeclaration | SetAccessorDeclaration) {
        if(isIdentifier(member.name)) {
            return "I:" + member.name.escapedText;
        }
        if(isStringLiteral(member.name)) {
            return "S:" + member.name.text
        }
        if(isNumericLiteral(member.name)) {
            return "N:" + (+member.name.text)
        }
        if(isComputedPropertyName(member.name)) {
            let fullId = "C:";
            let computedName = member.name.expression;
            // We only support dotted identifiers as property keys
            while(true) {
                if(isIdentifier(computedName)) {
                    fullId += computedName.escapedText;
                    break;
                }
                else if(isPropertyAccessExpression(computedName)) {
                    fullId += computedName.name.escapedText;
                    computedName = computedName.expression;
                }
                else {
                    // Can't compute a property key, bail
                    return undefined;
                }
            }
            return fullId;
        }
        return undefined;
    }

    function getWidenedType(localTypeInfo: LocalTypeInfo) {
        if((localTypeInfo.flags & LocalTypeInfoFlags.Fresh) && isLiteralTypeNode(localTypeInfo.typeNode)) {
            const literal = localTypeInfo.typeNode.literal;
            return (
                literal.kind === SyntaxKind.StringLiteral ? factory.createKeywordTypeNode(SyntaxKind.StringKeyword) :
                literal.kind === SyntaxKind.NumericLiteral ? factory.createKeywordTypeNode(SyntaxKind.NumberKeyword) :
                literal.kind === SyntaxKind.PrefixUnaryExpression && (literal as PrefixUnaryExpression).operand.kind === SyntaxKind.NumericLiteral ? factory.createKeywordTypeNode(SyntaxKind.NumberKeyword) :
                literal.kind === SyntaxKind.BigIntLiteral ? factory.createKeywordTypeNode(SyntaxKind.BigIntKeyword) :
                literal.kind === SyntaxKind.TrueKeyword || literal.kind === SyntaxKind.FalseKeyword ? factory.createKeywordTypeNode(SyntaxKind.BooleanKeyword) :
                localTypeInfo.typeNode
            );
        }

        return localTypeInfo.typeNode;
    }
    function makeUnionFromTypes(sourceNode: Node, types: LocalTypeInfo[], widenSingle: boolean) {
        types = deduplicateUnion(types);
        if(types.length === 1) {
            const localType = types[0];
            return widenSingle ? { ... localType, typeNode: getWidenedType(localType) }: localType;
        }
        const unionConstituents = collapseLiteralTypesIntoBaseTypes(types);

        normalizeObjectUnion(unionConstituents);
        return regular(
            unionConstituents.length === 1? unionConstituents[0]: factory.createUnionTypeNode(unionConstituents), 
            sourceNode,
            LocalTypeInfoFlags.Optimistic
        );

        function collapseLiteralTypesIntoBaseTypes(nodes: LocalTypeInfo[]) {
            enum CollapsibleTypes {
                None = 0,
                String = 1 << 1,
                Number = 1 << 2,
                True = 1 << 3,
                False = 1 << 4,
                Boolean = True | False,
                BigInt = 1 << 5,
                Any = 1 << 7,
                ImplicitAny = 1 << 8
            }
            let baseTypes = CollapsibleTypes.None;
            let literalTypes = CollapsibleTypes.None;
            for(const type of nodes) {
                switch(type.typeNode.kind) {
                    case SyntaxKind.TemplateLiteralType:
                        literalTypes |= CollapsibleTypes.String;
                        break;
                    case SyntaxKind.AnyKeyword:
                        if(type.flags & LocalTypeInfoFlags.ImplicitAny) {
                            literalTypes |= CollapsibleTypes.ImplicitAny;
                        }
                        else {
                            baseTypes |= CollapsibleTypes.Any;
                        }
                        break;
                    case SyntaxKind.BooleanKeyword:
                        baseTypes |= CollapsibleTypes.Boolean;
                        break;
                    case SyntaxKind.StringKeyword:
                        baseTypes |= CollapsibleTypes.String;
                        break;
                    case SyntaxKind.NumberKeyword:
                        baseTypes |= CollapsibleTypes.Number;
                        break;
                    case SyntaxKind.BigIntKeyword:
                        baseTypes |= CollapsibleTypes.BigInt;
                        break;
                    case SyntaxKind.LiteralType:
                        const literalType = type.typeNode as LiteralTypeNode;
                        switch(literalType.literal.kind) {
                            case SyntaxKind.TrueKeyword:
                                literalTypes |= CollapsibleTypes.True;
                                break;
                            case SyntaxKind.FalseKeyword:
                                literalTypes |= CollapsibleTypes.False;
                                break;
                            case SyntaxKind.NumericLiteral:
                                literalTypes |= CollapsibleTypes.Number;
                                break;
                            case SyntaxKind.PrefixUnaryExpression:
                                if((literalType.literal as PrefixUnaryExpression).operand.kind === SyntaxKind.NumericLiteral) {
                                    literalTypes |= CollapsibleTypes.Number;
                                }
                                break;
                            case SyntaxKind.StringLiteral:
                            case SyntaxKind.NoSubstitutionTemplateLiteral:
                            case SyntaxKind.TemplateExpression:
                                literalTypes |= CollapsibleTypes.String;
                                break;
                            case SyntaxKind.BigIntLiteral:
                                literalTypes |= CollapsibleTypes.BigInt;
                                break;
                        }
                }
            }
            // If true and false are both present, act as if we found boolean itself
            if((literalTypes & CollapsibleTypes.Boolean) === CollapsibleTypes.Boolean) {
                baseTypes |= CollapsibleTypes.Boolean;
            }
            const typesToCollapse = baseTypes & literalTypes;

            if(baseTypes & CollapsibleTypes.Any) {
                return [factory.createKeywordTypeNode(SyntaxKind.AnyKeyword)];
            }
            // Nothing to collapse or reorder
            if(baseTypes === CollapsibleTypes.None) return nodes.map(n => n.typeNode);
            const result: TypeNode[] = [];

            // We do a best effort to preserve TS union order for primitives
            if(baseTypes & CollapsibleTypes.String) {
                result.push(factory.createKeywordTypeNode(SyntaxKind.StringKeyword));
            }
            if(baseTypes & CollapsibleTypes.Number) {
                result.push(factory.createKeywordTypeNode(SyntaxKind.NumberKeyword));
            }
            if(baseTypes & CollapsibleTypes.Boolean) {
                result.push(factory.createKeywordTypeNode(SyntaxKind.BooleanKeyword));
            }
            if(baseTypes & CollapsibleTypes.BigInt) {
                result.push(factory.createKeywordTypeNode(SyntaxKind.BigIntKeyword));
            }
            if(!(baseTypes & CollapsibleTypes.Boolean) && literalTypes & CollapsibleTypes.True) {
                result.push(factory.createLiteralTypeNode(factory.createTrue()));
            }
            if(!(baseTypes & CollapsibleTypes.Boolean) && literalTypes & CollapsibleTypes.False) {
                result.push(factory.createLiteralTypeNode(factory.createFalse()));
            }

            for(const type of nodes) {
                let typeofNode = CollapsibleTypes.None;

                switch(type.typeNode.kind) {
                    case SyntaxKind.BooleanKeyword:
                    case SyntaxKind.StringKeyword:
                    case SyntaxKind.NumberKeyword:
                    case SyntaxKind.BigIntKeyword:
                    case SyntaxKind.AnyKeyword:
                        // They were already added
                        continue;
                    case SyntaxKind.TemplateLiteralType:
                        typeofNode = CollapsibleTypes.String;
                        break;
                    case SyntaxKind.LiteralType:
                        const literalType = type.typeNode as LiteralTypeNode;
                        switch(literalType.literal.kind) {
                            case SyntaxKind.TrueKeyword:
                                continue;
                            case SyntaxKind.FalseKeyword:
                                continue;
                            case SyntaxKind.NumericLiteral:
                                typeofNode = CollapsibleTypes.Number;
                                break;
                            case SyntaxKind.PrefixUnaryExpression:
                                if((literalType.literal as PrefixUnaryExpression).operand.kind === SyntaxKind.NumericLiteral) {
                                    typeofNode = CollapsibleTypes.Number;
                                }
                                break;
                            case SyntaxKind.StringLiteral:
                            case SyntaxKind.NoSubstitutionTemplateLiteral:
                            case SyntaxKind.TemplateExpression:
                                typeofNode = CollapsibleTypes.String;
                                break;
                            case SyntaxKind.BigIntLiteral:
                                typeofNode = CollapsibleTypes.BigInt;
                                break;
                        }
                }
                // Not a node of interest, do not change
                if((typeofNode & typesToCollapse) === 0) {
                    result.push(type.typeNode);
                }
            }
            return result;
        }
        function deduplicateUnion(nodes: LocalTypeInfo[]) {
            const typeInfoCache = new Map<number, {
                node: TypeLiteralNode,
                members: Map<string, TypeElement>
            }>();
            const union: LocalTypeInfo[] = [];
            let implicitAnyNode: LocalTypeInfo | undefined; 
            for(const node of nodes) {
                // Do not add implicit any unless it's the only type in the array
                if(!strictNullChecks && node.flags & LocalTypeInfoFlags.ImplicitAny) {
                    implicitAnyNode = node;
                    continue;
                }
                const existing = union.find(u => typesEqual(node.typeNode, node.sourceNode, u.typeNode, u.sourceNode));
                if(existing === undefined) {
                    union.push(node);
                }
                else {
                    existing.flags &= node.flags;
                }
            }
            if(union.length === 0 && implicitAnyNode) {
                union.push(implicitAnyNode);
            }
            return union;

            function getTypeInfo(type: TypeLiteralNode, errorTarget: Node | undefined) {
                const typeNodeId = getNodeId(type);
                let typeInfo = typeInfoCache.get(typeNodeId);
                if(typeInfo) return typeInfo;

                typeInfo = {
                    node: type,
                    members: new Map()
                };
                for(const member of type.members) {
                    const isMethod = isMethodSignature(member);
                    const isProp = isPropertySignature(member);
                    if(isMethod || isProp) {
                        const memberKey = getMemberKey(member);
                        if (memberKey === undefined) {
                            makeInvalidTypeAndReport(errorTarget ?? member);
                            break;
                        }
                        typeInfo.members.set(memberKey, member);
                    }
                    else {
                        makeInvalidTypeAndReport(errorTarget ?? member);
                    }
                }
                typeInfoCache.set(typeNodeId, typeInfo);
                return typeInfo;
            }
            function entityNameEqual(aTypeName: EntityName, bTypeName: EntityName) {
                while(true) {
                    if(aTypeName.kind === SyntaxKind.QualifiedName && bTypeName.kind === SyntaxKind.QualifiedName) {
                        if(aTypeName.right.escapedText !== bTypeName.right.escapedText) return false;
                        aTypeName = aTypeName.left;
                        bTypeName = bTypeName.left;
                    }
                    else if(aTypeName.kind === SyntaxKind.Identifier && bTypeName.kind === SyntaxKind.Identifier) {
                        return aTypeName.escapedText === bTypeName.escapedText;
                    }
                    else {
                        return false;
                    }
                }
            }
            function signatureEqual(a:SignatureDeclaration, aErrorTarget: Node | undefined, b: SignatureDeclaration, bErrorTarget: Node | undefined) {
                if(!typesEqual(a.type, aErrorTarget, b.type, bErrorTarget)) {
                    return false;
                }
                if(a.parameters.length !== b.parameters.length) {
                    return false;
                }

                return a.parameters.every((aParam, index) => isParameterEqual(aParam, b.parameters[index]));

                // Isolated declarations finish equality 
                function isParameterEqual(a: ParameterDeclaration, b: ParameterDeclaration) {
                    if(!!a.questionToken !== !!b.questionToken) {
                        return false;
                    }
                    return typesEqual(a.type, aErrorTarget, b.type, bErrorTarget);
                }
            }
            function nodeTypeArgumentsEqual(a: NodeWithTypeArguments, aErrorTarget: Node | undefined, b: NodeWithTypeArguments, bErrorTarget: Node | undefined) {
                if(a.typeArguments === undefined && b.typeArguments === undefined) {
                    return true;
                }
                if(a.typeArguments?.length !== b.typeArguments?.length) {
                    return false;
                }
                
                return !!a.typeArguments?.every((aArg, index) => typesEqual(aArg, aErrorTarget, b.typeArguments?.[index], bErrorTarget))
            }
            function typesEqual(a: TypeNode | undefined, aErrorTarget: Node | undefined, b: TypeNode | undefined, bErrorTarget: Node | undefined): boolean {
                if (a === undefined || b === undefined) return a === b;
                if (a.kind !== b.kind) return false;
                switch(a.kind) {
                    case SyntaxKind.AnyKeyword:
                    case SyntaxKind.UnknownKeyword:
                    case SyntaxKind.NumberKeyword:
                    case SyntaxKind.BigIntKeyword:
                    case SyntaxKind.ObjectKeyword:
                    case SyntaxKind.BooleanKeyword:
                    case SyntaxKind.StringKeyword:
                    case SyntaxKind.SymbolKeyword:
                    case SyntaxKind.VoidKeyword:
                    case SyntaxKind.UndefinedKeyword:
                    case SyntaxKind.NeverKeyword:
                        return true;
                }
                if(isLiteralTypeNode(a) && isLiteralTypeNode(b)) {
                    let aLiteral = a.literal;
                    let bLiteral = b.literal;
                    while(true) {
                        switch(aLiteral.kind) {
                            case SyntaxKind.NullKeyword:
                            case SyntaxKind.TrueKeyword:
                            case SyntaxKind.FalseKeyword:
                                return aLiteral.kind === bLiteral.kind;
                            case SyntaxKind.NumericLiteral:
                                return aLiteral.kind === bLiteral.kind && +aLiteral.text === +(bLiteral).text;
                            case SyntaxKind.StringLiteral:
                            case SyntaxKind.NoSubstitutionTemplateLiteral:
                                return (bLiteral.kind === SyntaxKind.StringLiteral || bLiteral.kind === SyntaxKind.NoSubstitutionTemplateLiteral)
                                    && aLiteral.text === (bLiteral).text;
                            case SyntaxKind.PrefixUnaryExpression:
                                const aUnary = (aLiteral as PrefixUnaryExpression);
                                const bUnary = (bLiteral as PrefixUnaryExpression);
                                if(aUnary.operator !== bUnary.operator) return false;

                                aLiteral = aUnary.operand as LiteralExpression;
                                bLiteral = bUnary.operand as LiteralExpression;
                                return +aLiteral.text === +bLiteral.text;
                            default:
                                return false;
                        }
                    }
                }
                else if(isArrayTypeNode(a) && isArrayTypeNode(b)) {
                    return typesEqual(a.elementType, aErrorTarget, b.elementType, bErrorTarget);
                }
                else if(isTypeReferenceNode(a) && isTypeReferenceNode(b)) {
                    if(!entityNameEqual(a.typeName, b.typeName)) {
                        return false;
                    }
                    return nodeTypeArgumentsEqual(a, aErrorTarget, b, bErrorTarget);
                }
                else if(isTypeLiteralNode(a) && isTypeLiteralNode(b)) {
                    if(a.members.length !== b.members.length) return false;
                    const aTypeInfo = getTypeInfo(a, aErrorTarget);
                    if(!aTypeInfo) return false;

                    for(const bMember of b.members) {
                        const bIsMethod = isMethodSignature(bMember);
                        const bIsProp = isPropertySignature(bMember);
                        if(bIsMethod || bIsProp) {
                            const memberKey = getMemberKey(bMember);
                            if (memberKey === undefined) {
                                makeInvalidTypeAndReport(bErrorTarget ?? bMember);
                                break;
                            }
                            const aMember = aTypeInfo.members.get(memberKey);
                            if(!aMember) return false;
                            if((aMember.questionToken !== undefined) !== (bMember.questionToken !== undefined)) return false;
                            if (getSyntacticModifierFlags(aMember) !== getSyntacticModifierFlags(bMember)) return false;
                            if(bIsProp && isPropertySignature(aMember)) {
                                if(!typesEqual(aMember.type, aErrorTarget, bMember.type, bErrorTarget)) {
                                    return false;
                                }
                            }
                            else if(bIsMethod && isMethodSignature(aMember)) {
                                return signatureEqual(aMember, aErrorTarget, bMember, bErrorTarget)
                            }
                        }
                        else {
                            makeInvalidTypeAndReport(bErrorTarget ?? bMember);
                        }
                    }
                    return true;
                }
                else if(isFunctionTypeNode(a) && isFunctionTypeNode(b)) {
                    return signatureEqual(a, aErrorTarget, b, bErrorTarget);
                }
                else if(isConstructorTypeNode(a) && isConstructorTypeNode(b)) {
                    return signatureEqual(a, aErrorTarget, b, bErrorTarget);
                }
                else if(isTypeQueryNode(a) && isTypeQueryNode(b)) {
                    if(!entityNameEqual(a.exprName, b.exprName)) {
                        return false;
                    }
                    return nodeTypeArgumentsEqual(a, aErrorTarget, b, bErrorTarget);
                }
                else {
                    return false;
                }
            }
        }
        function normalizeObjectUnion(nodes: (TypeNode | undefined)[]) {
            const allProps = new Map<string, {
                name: PropertyName,
                isReadonly: boolean,
                types: (TypeNode | undefined)[]
            }>();
            const allTypeLookup  = new Array<Map<string, TypeNode> | undefined>();
            let hasChanged = false;
            for (let i = 0; i< nodes.length; i++) {
                const type = nodes[i];
                const typeLookup = new Map<string, TypeNode>();
                allTypeLookup.push(typeLookup);

                if(!type || !isTypeLiteralNode(type)) continue;
                for(const member of type.members){
                    const isMethod = isMethodSignature(member);
                    const isProp = isPropertySignature(member);
                    if(isMethod || isProp) {
                        const memberKey = getMemberKey(member);
                        if(memberKey === undefined) {
                            nodes[i] = makeInvalidTypeAndReport(member.name);
                            allTypeLookup[i] = undefined;
                            hasChanged = true;
                            break;
                        }
                        let type;
                        if(isProp) {
                            type = member.type ?? makeInvalidTypeAndReport(member);
                        }
                        else {
                            type = factory.createFunctionTypeNode(
                                member.typeParameters,
                                member.parameters,
                                member.type!,
                            );
                        }
                        let propInfo = allProps.get(memberKey);
                        if(!propInfo) {
                            propInfo = {
                                types: new Array(nodes.length),
                                name: member.name,
                                isReadonly: false,
                            };
                            allProps.set(memberKey, propInfo);
                        }
                        propInfo.types[i] = type;
                        propInfo.isReadonly ||= !!(getSyntacticModifierFlags(member) & ModifierFlags.Readonly)
                        typeLookup.set(memberKey, type);
                    }
                    else {
                        nodes[i] = makeInvalidTypeAndReport(member);
                        allTypeLookup[i] = undefined;
                        hasChanged = true;
                        break;
                    }
                }
            }
            for(const [, propTypes] of allProps) {
                normalizeObjectUnion(propTypes.types);
            }
            for(let typeIndex = 0; typeIndex< nodes.length; typeIndex++) {
                const type = nodes[typeIndex];
                const props = allTypeLookup[typeIndex];
                if(!type || !isTypeLiteralNode(type) || !props) continue;

                let newMembers: TypeElement[] | undefined;
                for(const [commonProp, propInfo] of allProps) {
                    const propType = props.get(commonProp);
                    if(propType) {
                        if(propType !== propInfo.types[typeIndex]) {
                            const indexOfProp = findIndex(type.members, e => isPropertySignature(e) && getMemberKey(e) === commonProp);
                            if(indexOfProp !== -1) {
                                if(newMembers === undefined) {
                                    newMembers = [...type.members];
                                }
                                const existingMember = type.members[indexOfProp] as PropertySignature;
                                newMembers[indexOfProp] = factory.createPropertySignature(
                                    existingMember.modifiers,
                                    existingMember.name,
                                    existingMember.questionToken,
                                    propInfo.types[typeIndex]
                                );
                            }
                        }
                    }
                    else {
                        if(newMembers === undefined) {
                            newMembers = [...type.members];
                        }
                        newMembers.push(factory.createPropertySignature(
                            propInfo.isReadonly ? [factory.createToken(SyntaxKind.ReadonlyKeyword)] : undefined,
                            deepClone(propInfo.name),
                            factory.createToken(SyntaxKind.QuestionToken),
                            factory.createKeywordTypeNode(SyntaxKind.UndefinedKeyword),
                        ));
                    }
                }
                if (newMembers) {
                    hasChanged = true;
                    nodes[typeIndex] = factory.createTypeLiteralNode(newMembers);
                }
            }
            return hasChanged;
        }
    }
    function inferReturnType(node: FunctionLikeDeclaration) {
        if(node.type) {
            return regular(deepClone(visitType(node.type, node)), node);
        }
        if(!node.body) {
            return regular(makeInvalidTypeAndReport(node), node);
        }

        const returnStatements: ReturnStatement[] = [];
        const yieldExpressions: YieldExpression[] = [];

        let returnType;
        if(!isBlock(node.body)) {
            returnType = localInference(node.body, NarrowBehavior.KeepLiterals);
        }
        else {
            collectReturnAndYield(node.body, returnStatements, yieldExpressions);
            if(returnStatements.length === 0) {
                returnType = regular(factory.createKeywordTypeNode(SyntaxKind.VoidKeyword), node);
            }
            else {
                returnType = inferFromOutputs(node, returnStatements, node.asteriskToken ? SyntaxKind.NeverKeyword : SyntaxKind.VoidKeyword);
            }
        }
        let yieldType: LocalTypeInfo | undefined;
        if(node.asteriskToken) {
            if(yieldExpressions.length === 0) {
                yieldType = regular(
                    factory.createKeywordTypeNode(SyntaxKind.NeverKeyword),
                    node
                );
            }
            else {
                yieldType = inferFromOutputs(node, yieldExpressions, strictNullChecks ?SyntaxKind.UndefinedKeyword: SyntaxKind.AnyKeyword);
            }
        }
        return makeFinalReturnType(node, returnType, yieldType);

        function inferFromOutputs(node: Node, statements: (YieldExpression | ReturnStatement )[], emptyType: KeywordTypeSyntaxKind) {
            const returnStatementInference: LocalTypeInfo[] = [];
            let hasOnlyEmpty = true;
            for(let r of statements) {
                if(r.expression) {
                    returnStatementInference.push(localInference(r.expression, NarrowBehavior.KeepLiterals));
                    hasOnlyEmpty = false;
                }else {
                    returnStatementInference.push(
                        createUndefinedTypeNode(r, LocalTypeInfoFlags.Fresh)
                    );
                }
            };            
            if(hasOnlyEmpty) {
                return fresh(factory.createKeywordTypeNode(emptyType), node);
            }else {
                return makeUnionFromTypes(node, returnStatementInference, /*widenSingle*/ true);
            }
        }
        function makeFinalReturnType(node: FunctionLikeDeclaration, returnType: LocalTypeInfo, yieldType: LocalTypeInfo | undefined) {
            const modifiers = getEffectiveModifierFlags(node);
            if(node.asteriskToken) {
                const yieldTypeNode = yieldType?.typeNode ?? factory.createKeywordTypeNode(SyntaxKind.VoidKeyword);
                return regular(
                    factory.createTypeReferenceNode(
                        factory.createIdentifier(modifiers & ModifierFlags.Async ? "AsyncGenerator": "Generator"),
                        [yieldTypeNode, returnType.typeNode, factory.createKeywordTypeNode(SyntaxKind.UnknownKeyword)],
                    ),
                    returnType.sourceNode,
                    returnType.flags
                );
            }
            else if(modifiers & ModifierFlags.Async) {
                return regular(
                    factory.createTypeReferenceNode(
                        factory.createIdentifier("Promise"),
                        [returnType.typeNode],
                    ),
                    returnType.sourceNode,
                    returnType.flags
                );
            }
            return returnType;
        }
        function collectReturnAndYield(node: Node, result: ReturnStatement[], yieldExpressions: YieldExpression[]) {
            forEachChild(node, child => {
                if(isReturnStatement(child)) {
                    result.push(child);
                }
                if(isYieldExpression(child)) {
                    yieldExpressions.push(child);
                }
                if(isClassLike(child) || isFunctionLike(child)) {
                    return;
                }
                // TODO: Do not walk all children if not generator function
                collectReturnAndYield(child, result, yieldExpressions);
            });
        }
    }
    function inferFunctionMembers(scope: { statements: NodeArray<Statement> }, functionName: Identifier, localType: LocalTypeInfo): LocalTypeInfo {
        if(!isFunctionTypeNode(localType.typeNode)) return localType;
        let inferredMembers: TypeElement[] | undefined;
        for(let i = 0; i< scope.statements.length; i++) {
            const statement = scope.statements[i];
            // Looking for name functionName.member = init;
            if(isExpressionStatement(statement) 
                && isBinaryExpression(statement.expression)
                && isPropertyAccessExpression(statement.expression.left)
                && isIdentifier(statement.expression.left.expression)
                && statement.expression.left.expression.escapedText === functionName.escapedText) {
                    (inferredMembers ??= []).push(factory.createPropertySignature(
                        [],
                        statement.expression.left.name,
                        undefined,
                        localInference(statement.expression.right).typeNode
                    ));
                }
        }
        if(inferredMembers) {
            inferredMembers.push(
                factory.createCallSignature(
                    localType.typeNode.typeParameters,
                    localType.typeNode.parameters,
                    localType.typeNode.type
                )
            );
            return {
                sourceNode: localType.sourceNode,
                flags: localType.flags,
                typeNode: factory.createTypeLiteralNode(
                    inferredMembers
                ),
            } 
        }
        return localType;
    }

    // Copied similar function in checker. Maybe a reusable one should be created.
    function deepClone<T extends Node>(node: T): T {
        return setTextRange(factory.cloneNode(visitEachChild(node, deepClone, nullTransformationContext, deepCloneNodes)), node);
        
        function deepCloneNodes(
            nodes: NodeArray<Node> | undefined,
            visitor: Visitor,
            test?: (node: Node) => boolean,
            start?: number,
            count?: number,
        ): NodeArray<Node> | undefined {
            if (nodes && nodes.length === 0) {
                // Ensure we explicitly make a copy of an empty array; visitNodes will not do this unless the array has elements,
                // which can lead to us reusing the same empty NodeArray more than once within the same AST during type noding.
                return setTextRange(factory.createNodeArray(/*elements*/ undefined, nodes.hasTrailingComma), nodes);
            }
            return visitNodes(nodes, visitor, test, start, count);
        }
    }


    function localInferenceFromInitializer(node: HasInferredType | ExportAssignment): TypeNode | undefined {
        if(NO_LOCAL_INFERENCE) {
            return undefined;
        }
        let localType;
        let actualTypeNode: Node = node;
        if(isExportAssignment(node) && node.expression) {
            localType = localInference(node.expression);
            actualTypeNode = node.expression;
        }
        else if(isParameter(node) && node.initializer) {
            localType = localInference(node.initializer);
        }
        else if(isVariableDeclaration(node) && node.initializer) {
            
            localType = localInference(node.initializer, node.parent.flags & NodeFlags.Const ? NarrowBehavior.KeepLiterals: NarrowBehavior.None);
            if(isVariableStatement(node.parent.parent) &&
                node.parent.flags & NodeFlags.Const &&
                isIdentifier(node.name) &&
                (isBlock(node.parent.parent.parent) || isSourceFile(node.parent.parent.parent))) {
                localType = inferFunctionMembers(node.parent.parent.parent, node.name, localType);
            }
        }
        else if(isPropertyDeclaration(node) && node.initializer) {
            localType = localInference(node.initializer);
        }
        else if(isFunctionDeclaration(node)) {
            localType = inferReturnType(node);
        }
        else if(isMethodDeclaration(node)) {
            localType = inferReturnType(node);
        }
        else if(isGetAccessorDeclaration(node)) {
            localType = inferReturnType(node);
        }
        if(localType) {
            const typeNode = localType.typeNode;
            setParent(typeNode, node);
            const result = resolver.isSyntheticTypeEquivalent(actualTypeNode, typeNode, Diagnostics.Declaration_emit_for_this_file_requires_type_resolution_An_explicit_type_annotation_may_unblock_declaration_emit);
            if(result !== true) {
                result.forEach(r => context.addDiagnostic(r as DiagnosticWithLocation));
                // we should add the extra diagnostics here
                return makeInvalidType();
            }
        }
        return localType?.typeNode;
    }
    function ensureType(node: HasInferredType, type: TypeNode | undefined, ignorePrivate?: boolean): TypeNode | undefined {
        if (!ignorePrivate && hasEffectiveModifier(node, ModifierFlags.Private)) {
            // Private nodes emit no types (except private parameter properties, whose parameter types are actually visible)
            return;
        }
        if (shouldPrintWithInitializer(node)) {
            // Literal const declarations will have an initializer ensured rather than a type
            return;
        }
        if (isolatedDeclarations) {
            if (type === undefined) {
                const localType = localInferenceFromInitializer(node);
                if (localType !== undefined) {
                    return localType;
                }
                reportIsolatedDeclarationError(node);
                return makeInvalidType();
            }
            return visitNode(type, visitDeclarationSubtree, isTypeNode);
        }
        const shouldUseResolverType = node.kind === SyntaxKind.Parameter &&
            (resolver.isRequiredInitializedParameter(node) ||
             resolver.isOptionalUninitializedParameterProperty(node));
        if (type && !shouldUseResolverType) {
            return visitNode(type, visitDeclarationSubtree, isTypeNode);
        }
        if (!getParseTreeNode(node)) {
            return type ? visitNode(type, visitDeclarationSubtree, isTypeNode) : factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
        }
        if (node.kind === SyntaxKind.SetAccessor) {
            // Set accessors with no associated type node (from it's param or get accessor return) are `any` since they are never contextually typed right now
            // (The inferred type here will be void, but the old declaration emitter printed `any`, so this replicates that)
            return factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
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
            if (isPropertySignature(node) || !node.initializer) return cleanup(resolver.createTypeOfDeclaration(node, enclosingDeclaration, declarationEmitNodeBuilderFlags, symbolTracker, shouldUseResolverType));
            return cleanup(resolver.createTypeOfDeclaration(node, enclosingDeclaration, declarationEmitNodeBuilderFlags, symbolTracker, shouldUseResolverType) || resolver.createTypeOfExpression(node.initializer, enclosingDeclaration, declarationEmitNodeBuilderFlags, symbolTracker));
        }
        return cleanup(resolver.createReturnTypeOfSignatureDeclaration(node, enclosingDeclaration, declarationEmitNodeBuilderFlags, symbolTracker));

        function cleanup(returnValue: TypeNode | undefined) {
            errorNameNode = undefined;
            if (!suppressNewDiagnosticContexts) {
                getSymbolAccessibilityDiagnostic = oldDiag;
            }
            return returnValue || factory.createKeywordTypeNode(SyntaxKind.AnyKeyword);
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
            case SyntaxKind.ClassStaticBlockDeclaration:
                return true;
        }
        return false;
    }

    // If the ExpandoFunctionDeclaration have multiple overloads, then we only need to emit properties for the last one.
    function shouldEmitFunctionProperties(input: FunctionDeclaration) {
        if (input.body) {
            return true;
        }

        const overloadSignatures = input.symbol.declarations?.filter(decl => isFunctionDeclaration(decl) && !decl.body);
        return !overloadSignatures || overloadSignatures.indexOf(input) === overloadSignatures.length - 1;
    }

    function getBindingNameVisible(elem: BindingElement | VariableDeclaration | OmittedExpression): boolean {
        if (isOmittedExpression(elem)) {
            return false;
        }
        if (isBindingPattern(elem.name)) {
            // If any child binding pattern element has been marked visible (usually by collect linked aliases), then this is visible
            return some(elem.name.elements, getBindingNameVisible);
        }
        else {
            return resolver.isDeclarationVisible(elem);
        }
    }

    function updateParamsList(node: Node, params: NodeArray<ParameterDeclaration>, modifierMask?: ModifierFlags): NodeArray<ParameterDeclaration> {
        if (hasEffectiveModifier(node, ModifierFlags.Private)) {
            return factory.createNodeArray();
        }
        const newParams = map(params, p => ensureParameter(p, modifierMask));
        if (!newParams) {
            return factory.createNodeArray();
        }
        return factory.createNodeArray(newParams, params.hasTrailingComma);
    }

    function updateAccessorParamsList(input: AccessorDeclaration, isPrivate: boolean) {
        let newParams: ParameterDeclaration[] | undefined;
        if (!isPrivate) {
            const thisParameter = getThisParameter(input);
            if (thisParameter) {
                newParams = [ensureParameter(thisParameter)];
            }
        }
        if (isSetAccessorDeclaration(input)) {
            let newValueParameter: ParameterDeclaration | undefined;
            if (!isPrivate) {
                const valueParameter = getSetAccessorValueParameter(input);
                if (valueParameter) {
                    const accessorType =
                        isolatedDeclarations ?
                        undefined:
                        getTypeAnnotationFromAllAccessorDeclarations(input, resolver.getAllAccessorDeclarations(input));
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
            newParams = append(newParams, newValueParameter);
        }
        return factory.createNodeArray(newParams || emptyArray);
    }

    function ensureTypeParams(node: Node, params: NodeArray<TypeParameterDeclaration> | undefined) {
        return hasEffectiveModifier(node, ModifierFlags.Private) ? undefined : visitNodes(params, visitDeclarationSubtree, isTypeParameterDeclaration);
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

    function rewriteModuleSpecifier<T extends Node>(parent: ImportEqualsDeclaration | ImportDeclaration | ExportDeclaration | ModuleDeclaration | ImportTypeNode, input: T | undefined): T | StringLiteral {
        if (!input) return undefined!; // TODO: GH#18217
        resultHasExternalModuleIndicator = resultHasExternalModuleIndicator || (parent.kind !== SyntaxKind.ModuleDeclaration && parent.kind !== SyntaxKind.ImportType);
        if (isStringLiteralLike(input)) {
            if (isBundledEmit) {
                const newName = getExternalModuleNameFromDeclaration(context.getEmitHost(), resolver, parent);
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

    function transformImportEqualsDeclaration(decl: ImportEqualsDeclaration) {
        if (!resolver.isDeclarationVisible(decl)) return;
        if (decl.moduleReference.kind === SyntaxKind.ExternalModuleReference) {
            // Rewrite external module names if necessary
            const specifier = getExternalModuleImportEqualsDeclarationExpression(decl);
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
            getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(decl);
            checkEntityNameVisibility(decl.moduleReference, enclosingDeclaration);
            getSymbolAccessibilityDiagnostic = oldDiag;
            return decl;
        }
    }

    function transformImportDeclaration(decl: ImportDeclaration) {
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
        if (decl.importClause.namedBindings.kind === SyntaxKind.NamespaceImport) {
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
        const bindingList = mapDefined(decl.importClause.namedBindings.elements, b => resolver.isDeclarationVisible(b) ? b : undefined);
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
            if(isolatedDeclarations) {
                // TODO: Should report better error here. Suggest we add the syntax import type '....'
                // Also add a test for this.
                reportIsolatedDeclarationError(decl);
                return undefined;
            }
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

    function getResolutionModeOverrideForClauseInNightly(assertClause: AssertClause | undefined) {
        const mode = getResolutionModeOverrideForClause(assertClause);
        if (mode !== undefined) {
            if (!isNightly()) {
                context.addDiagnostic(createDiagnosticForNode(assertClause!, Diagnostics.resolution_mode_assertions_are_unstable_Use_nightly_TypeScript_to_silence_this_error_Try_updating_with_npm_install_D_typescript_next));
            }
            return assertClause;
        }
        return undefined;
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
            const i = lateMarkedStatements!.shift()!;
            if (!isLateVisibilityPaintedStatement(i)) {
                return Debug.fail(`Late replaced statement was found which is not handled by the declaration transformer!: ${Debug.formatSyntaxKind((i as Node).kind)}`);
            }
            const priorNeedsDeclare = needsDeclare;
            needsDeclare = i.parent && isSourceFile(i.parent) && !(isExternalModule(i.parent) && isBundledEmit);
            const result = transformTopLevelDeclaration(i);
            needsDeclare = priorNeedsDeclare;
            lateStatementReplacementMap.set(getOriginalNodeId(i), result);
        }

        // And lastly, we need to get the final form of all those indetermine import declarations from before and add them to the output list
        // (and remove them from the set to examine for outter declarations)
        return visitNodes(statements, visitLateVisibilityMarkedStatements, isStatement);

        function visitLateVisibilityMarkedStatements(statement: Statement) {
            if (isLateVisibilityPaintedStatement(statement)) {
                const key = getOriginalNodeId(statement);
                if (lateStatementReplacementMap.has(key)) {
                    const result = lateStatementReplacementMap.get(key) as Statement | readonly Statement[] | undefined;
                    lateStatementReplacementMap.delete(key);
                    if (result) {
                        if (isArray(result) ? some(result, needsScopeMarker) : needsScopeMarker(result)) {
                            // Top-level declarations in .d.ts files are always considered exported even without a modifier unless there's an export assignment or specifier
                            needsScopeFixMarker = true;
                        }
                        if (isSourceFile(statement.parent) && (isArray(result) ? some(result, isExternalModuleIndicator) : isExternalModuleIndicator(result))) {
                            resultHasExternalModuleIndicator = true;
                        }
                    }
                    return result;
                }
            }
            return statement;
        }
    }

    function visitDeclarationSubtree(input: Node): VisitResult<Node | undefined> {
        if (shouldStripInternal(input)) return;
        if (isDeclaration(input)) {
            if (isDeclarationAndNotVisible(input)) return;
            if (hasDynamicName(input) && !resolver.isLateBound(getParseTreeNode(input) as Declaration)) {
                if (isolatedDeclarations && hasIdentifierComputedName(input)) {
                    reportIsolatedDeclarationError(input);
                }
                else {
                    return;
                }
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

        // Setup diagnostic-related flags before first potential `cleanup` call, otherwise
        // We'd see a TDZ violation at runtime
        const canProduceDiagnostic = canProduceDiagnostics(input);
        const oldWithinObjectLiteralType = suppressNewDiagnosticContexts;
        let shouldEnterSuppressNewDiagnosticsContextContext = ((input.kind === SyntaxKind.TypeLiteral || input.kind === SyntaxKind.MappedType) && input.parent.kind !== SyntaxKind.TypeAliasDeclaration);

        // Emit methods which are private as properties with no type information
        if (isMethodDeclaration(input) || isMethodSignature(input)) {
            if (hasEffectiveModifier(input, ModifierFlags.Private)) {
                if (input.symbol && input.symbol.declarations && input.symbol.declarations[0] !== input) return; // Elide all but the first overload
                return cleanup(factory.createPropertyDeclaration(ensureModifiers(input), input.name, /*questionOrExclamationToken*/ undefined, /*type*/ undefined, /*initializer*/ undefined));
            }
        }

        if (canProduceDiagnostic && !suppressNewDiagnosticContexts) {
            getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(input);
        }

        if (isTypeQueryNode(input)) {
            checkEntityNameVisibility(input.exprName, enclosingDeclaration);
        }

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
                    return cleanup(factory.updateExpressionWithTypeArguments(node, node.expression, node.typeArguments));
                }
                case SyntaxKind.TypeReference: {
                    checkEntityNameVisibility(input.typeName, enclosingDeclaration);
                    const node = visitEachChild(input, visitDeclarationSubtree, context);
                    return cleanup(factory.updateTypeReferenceNode(node, node.typeName, node.typeArguments));
                }
                case SyntaxKind.ConstructSignature:
                    return cleanup(factory.updateConstructSignature(
                        input,
                        ensureTypeParams(input, input.typeParameters),
                        updateParamsList(input, input.parameters),
                        ensureType(input, input.type)
                    ));
                case SyntaxKind.Constructor: {
                    // A constructor declaration may not have a type annotation
                    const ctor = factory.createConstructorDeclaration(
                        /*modifiers*/ ensureModifiers(input),
                        updateParamsList(input, input.parameters, ModifierFlags.None),
                        /*body*/ undefined
                    );
                    return cleanup(ctor);
                }
                case SyntaxKind.MethodDeclaration: {
                    if (isPrivateIdentifier(input.name)) {
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
                case SyntaxKind.GetAccessor: {
                    if (isPrivateIdentifier(input.name)) {
                        return cleanup(/*returnValue*/ undefined);
                    }
                    const accessorType =
                        isolatedDeclarations ?
                        input.type:
                        getTypeAnnotationFromAllAccessorDeclarations(input, resolver.getAllAccessorDeclarations(input));
                    return cleanup(factory.updateGetAccessorDeclaration(
                        input,
                        ensureModifiers(input),
                        input.name,
                        updateAccessorParamsList(input, hasEffectiveModifier(input, ModifierFlags.Private)),
                        ensureType(input, accessorType),
                        /*body*/ undefined));
                }
                case SyntaxKind.SetAccessor: {
                    if (isPrivateIdentifier(input.name)) {
                        return cleanup(/*returnValue*/ undefined);
                    }
                    return cleanup(factory.updateSetAccessorDeclaration(
                        input,
                        ensureModifiers(input),
                        input.name,
                        updateAccessorParamsList(input, hasEffectiveModifier(input, ModifierFlags.Private)),
                        /*body*/ undefined));
                }
                case SyntaxKind.PropertyDeclaration:
                    if (isPrivateIdentifier(input.name)) {
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
                case SyntaxKind.PropertySignature:
                    if (isPrivateIdentifier(input.name)) {
                        return cleanup(/*returnValue*/ undefined);
                    }
                    return cleanup(factory.updatePropertySignature(
                        input,
                        ensureModifiers(input),
                        input.name,
                        input.questionToken,
                        ensureType(input, input.type)
                    ));
                case SyntaxKind.MethodSignature: {
                    if (isPrivateIdentifier(input.name)) {
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
                case SyntaxKind.CallSignature: {
                    return cleanup(factory.updateCallSignature(
                        input,
                        ensureTypeParams(input, input.typeParameters),
                        updateParamsList(input, input.parameters),
                        ensureType(input, input.type)
                    ));
                }
                case SyntaxKind.IndexSignature: {
                    return cleanup(factory.updateIndexSignature(
                        input,
                        ensureModifiers(input),
                        updateParamsList(input, input.parameters),
                        visitNode(input.type, visitDeclarationSubtree, isTypeNode) || factory.createKeywordTypeNode(SyntaxKind.AnyKeyword)
                    ));
                }
                case SyntaxKind.VariableDeclaration: {
                    if (isBindingPattern(input.name)) {
                        return recreateBindingPattern(input.name);
                    }
                    shouldEnterSuppressNewDiagnosticsContextContext = true;
                    suppressNewDiagnosticContexts = true; // Variable declaration types also suppress new diagnostic contexts, provided the contexts wouldn't be made for binding pattern types
                    return cleanup(factory.updateVariableDeclaration(input, input.name, /*exclamationToken*/ undefined, ensureType(input, input.type), ensureNoInitializer(input)));
                }
                case SyntaxKind.TypeParameter: {
                    if (isPrivateMethodTypeParameter(input) && (input.default || input.constraint)) {
                        return cleanup(factory.updateTypeParameterDeclaration(input, input.modifiers, input.name, /*constraint*/ undefined, /*defaultType*/ undefined));
                    }
                    return cleanup(visitEachChild(input, visitDeclarationSubtree, context));
                }
                case SyntaxKind.ConditionalType: {
                    // We have to process conditional types in a special way because for visibility purposes we need to push a new enclosingDeclaration
                    // just for the `infer` types in the true branch. It's an implicit declaration scope that only applies to _part_ of the type.
                    const checkType = visitNode(input.checkType, visitDeclarationSubtree, isTypeNode);
                    const extendsType = visitNode(input.extendsType, visitDeclarationSubtree, isTypeNode);
                    const oldEnclosingDecl = enclosingDeclaration;
                    enclosingDeclaration = input.trueType;
                    const trueType = visitNode(input.trueType, visitDeclarationSubtree, isTypeNode);
                    enclosingDeclaration = oldEnclosingDecl;
                    const falseType = visitNode(input.falseType, visitDeclarationSubtree, isTypeNode);
                    Debug.assert(checkType);
                    Debug.assert(extendsType);
                    Debug.assert(trueType);
                    Debug.assert(falseType);
                    return cleanup(factory.updateConditionalTypeNode(input, checkType, extendsType, trueType, falseType));
                }
                case SyntaxKind.FunctionType: {
                    return cleanup(factory.updateFunctionTypeNode(input, visitNodes(input.typeParameters, visitDeclarationSubtree, isTypeParameterDeclaration), updateParamsList(input, input.parameters), Debug.checkDefined(visitNode(input.type, visitDeclarationSubtree, isTypeNode))));
                }
                case SyntaxKind.ConstructorType: {
                    return cleanup(factory.updateConstructorTypeNode(input, ensureModifiers(input), visitNodes(input.typeParameters, visitDeclarationSubtree, isTypeParameterDeclaration), updateParamsList(input, input.parameters), Debug.checkDefined(visitNode(input.type, visitDeclarationSubtree, isTypeNode))));
                }
                case SyntaxKind.ImportType: {
                    if (!isLiteralImportTypeNode(input)) return cleanup(input);
                    return cleanup(factory.updateImportTypeNode(
                        input,
                        factory.updateLiteralTypeNode(input.argument, rewriteModuleSpecifier(input, input.argument.literal)),
                        input.assertions,
                        input.qualifier,
                        visitNodes(input.typeArguments, visitDeclarationSubtree, isTypeNode),
                        input.isTypeOf
                    ));
                }
                default: Debug.assertNever(input, `Attempted to process unhandled node kind: ${Debug.formatSyntaxKind((input as Node).kind)}`);
            }
        }

        if (isTupleTypeNode(input) && (getLineAndCharacterOfPosition(currentSourceFile, input.pos).line === getLineAndCharacterOfPosition(currentSourceFile, input.end).line)) {
            setEmitFlags(input, EmitFlags.SingleLine);
        }

        return cleanup(visitEachChild(input, visitDeclarationSubtree, context));

        function cleanup<T extends Node>(returnValue: T | undefined): T | undefined {
            if (returnValue && canProduceDiagnostic && hasDynamicName(input as Declaration)) {
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
            return returnValue && setOriginalNode(preserveJsDoc(returnValue, input), input);
        }
    }

    function isPrivateMethodTypeParameter(node: TypeParameterDeclaration) {
        return node.parent.kind === SyntaxKind.MethodDeclaration && hasEffectiveModifier(node.parent, ModifierFlags.Private);
    }

    function visitDeclarationStatements(input: Node): VisitResult<Node | undefined> {
        if (!isPreservedDeclarationStatement(input)) {
            // return undefined for unmatched kinds to omit them from the tree
            return;
        }
        if (shouldStripInternal(input)) return;

        switch (input.kind) {
            case SyntaxKind.ExportDeclaration: {
                if (isSourceFile(input.parent)) {
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
                    getResolutionModeOverrideForClause(input.assertClause) ? input.assertClause : undefined
                );
            }
            case SyntaxKind.ExportAssignment: {
                // Always visible if the parent node isn't dropped for being not visible
                if (isSourceFile(input.parent)) {
                    resultHasExternalModuleIndicator = true;
                }
                resultHasScopeMarker = true;
                if (input.expression.kind === SyntaxKind.Identifier) {
                    return input;
                }
                else {
                    const newId = factory.createUniqueName("_default", GeneratedIdentifierFlags.Optimistic);
                    getSymbolAccessibilityDiagnostic = () => ({
                        diagnosticMessage: Diagnostics.Default_export_of_the_module_has_or_is_using_private_name_0,
                        errorNode: input
                    });
                    errorFallbackNode = input;
                    const type = isolatedDeclarations ?
                        localInferenceFromInitializer(input) ?? makeInvalidTypeAndReport(input) :
                        resolver.createTypeOfExpression(input.expression, input, declarationEmitNodeBuilderFlags, symbolTracker);
                    const varDecl = factory.createVariableDeclaration(newId, /*exclamationToken*/ undefined, type, /*initializer*/ undefined);
                    errorFallbackNode = undefined;
                    const statement = factory.createVariableStatement(needsDeclare ? [factory.createModifier(SyntaxKind.DeclareKeyword)] : [], factory.createVariableDeclarationList([varDecl], NodeFlags.Const));

                    preserveJsDoc(statement, input);
                    removeAllComments(input);
                    return [statement, factory.updateExportAssignment(input, input.modifiers, newId)];
                }
            }
        }

        const result = transformTopLevelDeclaration(input);
        // Don't actually transform yet; just leave as original node - will be elided/swapped by late pass
        lateStatementReplacementMap.set(getOriginalNodeId(input), result);
        return input;
    }

    function stripExportModifiers(statement: Statement): Statement {
        if (isImportEqualsDeclaration(statement) || hasEffectiveModifier(statement, ModifierFlags.Default) || !canHaveModifiers(statement)) {
            // `export import` statements should remain as-is, as imports are _not_ implicitly exported in an ambient namespace
            // Likewise, `export default` classes and the like and just be `default`, so we preserve their `export` modifiers, too
            return statement;
        }

        const modifiers = factory.createModifiersFromModifierFlags(getEffectiveModifierFlags(statement) & (ModifierFlags.All ^ ModifierFlags.Export));
        return factory.updateModifiers(statement, modifiers);
    }

    function transformTopLevelDeclaration(input: LateVisibilityPaintedStatement) {
        if (lateMarkedStatements) {
            while (orderedRemoveItem(lateMarkedStatements, input));
        }
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
            case SyntaxKind.TypeAliasDeclaration: {
                needsDeclare = false;
                const clean = cleanup(factory.updateTypeAliasDeclaration(
                    input,
                    ensureModifiers(input),
                    input.name,
                    visitNodes(input.typeParameters, visitDeclarationSubtree, isTypeParameterDeclaration),
                    Debug.checkDefined(visitNode(input.type, visitDeclarationSubtree, isTypeNode))
                ));
                needsDeclare = previousNeedsDeclare;
                return clean;
            }
            case SyntaxKind.InterfaceDeclaration: {
                return cleanup(factory.updateInterfaceDeclaration(
                    input,
                    ensureModifiers(input),
                    input.name,
                    ensureTypeParams(input, input.typeParameters),
                    transformHeritageClauses(input.heritageClauses),
                    visitNodes(input.members, visitDeclarationSubtree, isTypeElement)
                ));
            }
            case SyntaxKind.FunctionDeclaration: {
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
                const isExpandoFunctionDeclaration = clean && resolver.isExpandoFunctionDeclaration(input);
                if (isExpandoFunctionDeclaration && shouldEmitFunctionProperties(input)) {
                    if(isExpandoFunctionDeclaration && isolatedDeclarations) {
                        reportIsolatedDeclarationError(input);
                        return clean;
                    }
                    const props = resolver.getPropertiesOfContainerFunction(input);
                    // Use parseNodeFactory so it is usable as an enclosing declaration
                    const fakespace = parseNodeFactory.createModuleDeclaration(/*modifiers*/ undefined, clean.name || factory.createIdentifier("_default"), factory.createModuleBlock([]), NodeFlags.Namespace);
                    setParent(fakespace, enclosingDeclaration as SourceFile | NamespaceDeclaration);
                    fakespace.locals = createSymbolTable(props);
                    fakespace.symbol = props[0].parent!;
                    const exportMappings: [Identifier, string][] = [];
                    let declarations: (VariableStatement | ExportDeclaration)[] = mapDefined(props, p => {
                        if (!p.valueDeclaration || !(isPropertyAccessExpression(p.valueDeclaration) || isElementAccessExpression(p.valueDeclaration) || isBinaryExpression(p.valueDeclaration))) {
                            return undefined;
                        }
                        const nameStr = unescapeLeadingUnderscores(p.escapedName);
                        if (!isIdentifierText(nameStr, ScriptTarget.ESNext)) {
                            return undefined; // unique symbol or non-identifier name - omit, since there's no syntax that can preserve it
                        }
                        getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(p.valueDeclaration);
                        let type = resolver.createTypeOfDeclaration(p.valueDeclaration, fakespace, declarationEmitNodeBuilderFlags, symbolTracker);
                        getSymbolAccessibilityDiagnostic = oldDiag;

                        if(isolatedDeclarations) {
                            reportIsolatedDeclarationError(p.valueDeclaration);
                            type = factory.createTypeReferenceNode("invalid");
                        }

                        const isNonContextualKeywordName = isStringANonContextualKeyword(nameStr);
                        const name = isNonContextualKeywordName ? factory.getGeneratedNameForNode(p.valueDeclaration) : factory.createIdentifier(nameStr);
                        if (isNonContextualKeywordName) {
                            exportMappings.push([name, nameStr]);
                        }
                        const varDecl = factory.createVariableDeclaration(name, /*exclamationToken*/ undefined, type, /*initializer*/ undefined);
                        return factory.createVariableStatement(isNonContextualKeywordName ? undefined : [factory.createToken(SyntaxKind.ExportKeyword)], factory.createVariableDeclarationList([varDecl]));
                    });
                    if (!exportMappings.length) {
                        declarations = mapDefined(declarations, declaration => factory.updateModifiers(declaration, ModifierFlags.None));
                    }
                    else {
                        declarations.push(factory.createExportDeclaration(
                            /*modifiers*/ undefined,
                            /*isTypeOnly*/ false,
                            factory.createNamedExports(map(exportMappings, ([gen, exp]) => {
                                return factory.createExportSpecifier(/*isTypeOnly*/ false, gen, exp);
                            }))
                        ));
                    }
                    const namespaceDecl = factory.createModuleDeclaration(ensureModifiers(input), input.name!, factory.createModuleBlock(declarations), NodeFlags.Namespace);
                    if (!hasEffectiveModifier(clean, ModifierFlags.Default)) {
                        return [clean, namespaceDecl];
                    }

                    const modifiers = factory.createModifiersFromModifierFlags((getEffectiveModifierFlags(clean) & ~ModifierFlags.ExportDefault) | ModifierFlags.Ambient);
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

                    if (isSourceFile(input.parent)) {
                        resultHasExternalModuleIndicator = true;
                    }
                    resultHasScopeMarker = true;

                    return [cleanDeclaration, namespaceDeclaration, exportDefaultDeclaration];
                }
                else {
                    return clean;
                }
            }
            case SyntaxKind.ModuleDeclaration: {
                needsDeclare = false;
                const inner = input.body;
                if (inner && inner.kind === SyntaxKind.ModuleBlock) {
                    const oldNeedsScopeFix = needsScopeFixMarker;
                    const oldHasScopeFix = resultHasScopeMarker;
                    resultHasScopeMarker = false;
                    needsScopeFixMarker = false;
                    const statements = visitNodes(inner.statements, visitDeclarationStatements, isStatement);
                    let lateStatements = transformAndReplaceLatePaintedStatements(statements);
                    if (input.flags & NodeFlags.Ambient) {
                        needsScopeFixMarker = false; // If it was `declare`'d everything is implicitly exported already, ignore late printed "privates"
                    }
                    // With the final list of statements, there are 3 possibilities:
                    // 1. There's an export assignment or export declaration in the namespace - do nothing
                    // 2. Everything is exported and there are no export assignments or export declarations - strip all export modifiers
                    // 3. Some things are exported, some are not, and there's no marker - add an empty marker
                    if (!isGlobalScopeAugmentation(input) && !hasScopeMarker(lateStatements) && !resultHasScopeMarker) {
                        if (needsScopeFixMarker) {
                            lateStatements = factory.createNodeArray([...lateStatements, createEmptyExports(factory)]);
                        }
                        else {
                            lateStatements = visitNodes(lateStatements, stripExportModifiers, isStatement);
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
                        isExternalModuleAugmentation(input) ? rewriteModuleSpecifier(input, input.name) : input.name,
                        body
                    ));
                }
                else {
                    needsDeclare = previousNeedsDeclare;
                    const mods = ensureModifiers(input);
                    needsDeclare = false;
                    visitNode(inner, visitDeclarationStatements);
                    // eagerly transform nested namespaces (the nesting doesn't need any elision or painting done)
                    const id = getOriginalNodeId(inner!); // TODO: GH#18217
                    const body = lateStatementReplacementMap.get(id);
                    lateStatementReplacementMap.delete(id);
                    return cleanup(factory.updateModuleDeclaration(
                        input,
                        mods,
                        input.name,
                        body as ModuleBody
                    ));
                }
            }
            case SyntaxKind.ClassDeclaration: {
                errorNameNode = input.name;
                errorFallbackNode = input;
                const modifiers = factory.createNodeArray(ensureModifiers(input));
                const typeParameters = ensureTypeParams(input, input.typeParameters);
                const ctor = getFirstConstructorWithBody(input);
                let parameterProperties: readonly PropertyDeclaration[] | undefined;
                if (ctor) {
                    const oldDiag = getSymbolAccessibilityDiagnostic;
                    parameterProperties = compact(flatMap(ctor.parameters, (param) => {
                        if (!hasSyntacticModifier(param, ModifierFlags.ParameterPropertyModifier) || shouldStripInternal(param)) return;
                        getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(param);
                        if (param.name.kind === SyntaxKind.Identifier) {
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

                        function walkBindingPattern(pattern: BindingPattern) {
                            let elems: PropertyDeclaration[] | undefined;
                            for (const elem of pattern.elements) {
                                if (isOmittedExpression(elem)) continue;
                                if (isBindingPattern(elem.name)) {
                                    elems = concatenate(elems, walkBindingPattern(elem.name));
                                }
                                elems = elems || [];
                                elems.push(factory.createPropertyDeclaration(
                                    ensureModifiers(param),
                                    elem.name as Identifier,
                                    /*questionOrExclamationToken*/ undefined,
                                    ensureType(elem, /*type*/ undefined),
                                    /*initializer*/ undefined
                                ));
                            }
                            return elems;
                        }
                    }));
                    getSymbolAccessibilityDiagnostic = oldDiag;
                }

                const hasPrivateIdentifier = some(input.members, member => !!member.name && isPrivateIdentifier(member.name));
                // When the class has at least one private identifier, create a unique constant identifier to retain the nominal typing behavior
                // Prevents other classes with the same public members from being used in place of the current class
                const privateIdentifier = hasPrivateIdentifier ? [
                    factory.createPropertyDeclaration(
                        /*modifiers*/ undefined,
                        factory.createPrivateIdentifier("#private"),
                        /*questionOrExclamationToken*/ undefined,
                        /*type*/ undefined,
                        /*initializer*/ undefined
                    )
                ] : undefined;
                const memberNodes = concatenate(concatenate(privateIdentifier, parameterProperties), visitNodes(input.members, visitDeclarationSubtree, isClassElement));
                const members = factory.createNodeArray(memberNodes);

                const extendsClause = getEffectiveBaseTypeNode(input);
                if (extendsClause && !isEntityNameExpression(extendsClause.expression) && extendsClause.expression.kind !== SyntaxKind.NullKeyword) {
                    // We must add a temporary declaration for the extends clause expression

                    // Isolated declarations does not allow inferred type in the extends clause
                    if(isolatedDeclarations) {
                        reportIsolatedDeclarationError(extendsClause);
                        return cleanup(factory.updateClassDeclaration(
                            input,
                            modifiers,
                            input.name,
                            typeParameters,
                            factory.createNodeArray([factory.createHeritageClause(SyntaxKind.ExtendsKeyword,
                                [
                                    factory.createExpressionWithTypeArguments(
                                        factory.createIdentifier("invalid"),
                                        /*typeArguments*/ undefined,
                                    )
                                ])]),
                            members
                        ));
                    }
                    const oldId = input.name ? unescapeLeadingUnderscores(input.name.escapedText) : "default";
                    const newId = factory.createUniqueName(`${oldId}_base`, GeneratedIdentifierFlags.Optimistic);
                    getSymbolAccessibilityDiagnostic = () => ({
                        diagnosticMessage: Diagnostics.extends_clause_of_exported_class_0_has_or_is_using_private_name_1,
                        errorNode: extendsClause,
                        typeName: input.name
                    });
                    const varDecl = factory.createVariableDeclaration(newId, /*exclamationToken*/ undefined, resolver.createTypeOfExpression(extendsClause.expression, input, declarationEmitNodeBuilderFlags, symbolTracker), /*initializer*/ undefined);
                    const statement = factory.createVariableStatement(needsDeclare ? [factory.createModifier(SyntaxKind.DeclareKeyword)] : [], factory.createVariableDeclarationList([varDecl], NodeFlags.Const));
                    const heritageClauses = factory.createNodeArray(map(input.heritageClauses, clause => {
                        if (clause.token === SyntaxKind.ExtendsKeyword) {
                            const oldDiag = getSymbolAccessibilityDiagnostic;
                            getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(clause.types[0]);
                            const newClause = factory.updateHeritageClause(clause, map(clause.types, t => factory.updateExpressionWithTypeArguments(t, newId, visitNodes(t.typeArguments, visitDeclarationSubtree, isTypeNode))));
                            getSymbolAccessibilityDiagnostic = oldDiag;
                            return newClause;
                        }
                        return factory.updateHeritageClause(clause, visitNodes(factory.createNodeArray(filter(clause.types, t => isEntityNameExpression(t.expression) || t.expression.kind === SyntaxKind.NullKeyword)), visitDeclarationSubtree, isExpressionWithTypeArguments));
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
            case SyntaxKind.VariableStatement: {
                return cleanup(transformVariableStatement(input));
            }
            case SyntaxKind.EnumDeclaration: {
                return cleanup(factory.updateEnumDeclaration(input, factory.createNodeArray(ensureModifiers(input)), input.name, factory.createNodeArray(mapDefined(input.members, m => {
                    if (shouldStripInternal(m)) return;
                    if (isolatedDeclarations) {
                        if (m.initializer && !isLiteralExpression(m.initializer)) {
                            reportIsolatedDeclarationError(m);
                        }
                        return m;
                    }
                    // Rewrite enum values to their constants, if available
                    const constValue = isolatedDeclarations? undefined : resolver.getConstantValue(m);
                    return preserveJsDoc(factory.updateEnumMember(m, m.name, constValue !== undefined ? typeof constValue === "string" ? factory.createStringLiteral(constValue) : factory.createNumericLiteral(constValue) : undefined), m);
                }))));
            }
        }
        // Anything left unhandled is an error, so this should be unreachable
        return Debug.assertNever(input, `Unhandled top-level node in declaration emit: ${Debug.formatSyntaxKind((input as Node).kind)}`);

        function cleanup<T extends Node>(node: T | undefined): T | undefined {
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
            errorFallbackNode = undefined;
            errorNameNode = undefined;
            return node && setOriginalNode(preserveJsDoc(node, input), input);
        }
    }

    function transformVariableStatement(input: VariableStatement) {
        if (!forEach(input.declarationList.declarations, getBindingNameVisible)) return;
        const nodes = visitNodes(input.declarationList.declarations, visitDeclarationSubtree, isVariableDeclaration);
        if (!length(nodes)) return;
        return factory.updateVariableStatement(input, factory.createNodeArray(ensureModifiers(input)), factory.updateVariableDeclarationList(input.declarationList, nodes));
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
                return factory.createVariableDeclaration(e.name, /*exclamationToken*/ undefined, ensureType(e, /*type*/ undefined), /*initializer*/ undefined);
            }
        }
    }

    function checkName(node: DeclarationDiagnosticProducing) {
        let oldDiag: typeof getSymbolAccessibilityDiagnostic | undefined;
        if (!suppressNewDiagnosticContexts) {
            oldDiag = getSymbolAccessibilityDiagnostic;
            getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNodeName(node);
        }
        errorNameNode = (node as NamedDeclaration).name;
        const decl = node as NamedDeclaration as LateBoundDeclaration;

        Debug.assert((hasIdentifierComputedName(decl) && options.isolatedDeclarations) || resolver.isLateBound(getParseTreeNode(node) as Declaration)); // Should only be called with dynamic names
        const entityName = decl.name.expression;
        checkEntityNameVisibility(entityName, enclosingDeclaration);
        if (!suppressNewDiagnosticContexts) {
            getSymbolAccessibilityDiagnostic = oldDiag!;
        }
        errorNameNode = undefined;
    }

    function shouldStripInternal(node: Node) {
        return !!stripInternal && !!node && isInternalDeclaration(node, currentSourceFile);
    }

    function isScopeMarker(node: Node) {
        return isExportAssignment(node) || isExportDeclaration(node);
    }

    function hasScopeMarker(statements: readonly Statement[]) {
        return some(statements, isScopeMarker);
    }

    function ensureModifiers<T extends HasModifiers>(node: T): readonly Modifier[] | undefined {
        const currentFlags = getEffectiveModifierFlags(node);
        const newFlags = ensureModifierFlags(node);
        if (currentFlags === newFlags) {
            return visitArray(node.modifiers, n => tryCast(n, isModifier), isModifier);
        }
        return factory.createModifiersFromModifierFlags(newFlags);
    }

    function ensureModifierFlags(node: Node): ModifierFlags {
        let mask = ModifierFlags.All ^ (ModifierFlags.Public | ModifierFlags.Async | ModifierFlags.Override); // No async and override modifiers in declaration files
        let additions = (needsDeclare && !isAlwaysType(node)) ? ModifierFlags.Ambient : ModifierFlags.None;
        const parentIsFile = node.parent.kind === SyntaxKind.SourceFile;
        if (!parentIsFile || (isBundledEmit && parentIsFile && isExternalModule(node.parent as SourceFile))) {
            mask ^= ModifierFlags.Ambient;
            additions = ModifierFlags.None;
        }
        return maskModifierFlags(node, mask, additions);
    }

    function getTypeAnnotationFromAllAccessorDeclarations(node: AccessorDeclaration, accessors: AllAccessorDeclarations) {
        let accessorType = getTypeAnnotationFromAccessor(node);
        if (!accessorType && node !== accessors.firstAccessor) {
            accessorType = getTypeAnnotationFromAccessor(accessors.firstAccessor);
            // If we end up pulling the type from the second accessor, we also need to change the diagnostic context to get the expected error message
            getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(accessors.firstAccessor);
        }
        if (!accessorType && accessors.secondAccessor && node !== accessors.secondAccessor) {
            accessorType = getTypeAnnotationFromAccessor(accessors.secondAccessor);
            // If we end up pulling the type from the second accessor, we also need to change the diagnostic context to get the expected error message
            getSymbolAccessibilityDiagnostic = createGetSymbolAccessibilityDiagnosticForNode(accessors.secondAccessor);
        }
        return accessorType;
    }

    function transformHeritageClauses(nodes: NodeArray<HeritageClause> | undefined) {
        return factory.createNodeArray(filter(map(nodes, clause => factory.updateHeritageClause(clause, visitNodes(factory.createNodeArray(filter(clause.types, t => {
            return isEntityNameExpression(t.expression) || (clause.token === SyntaxKind.ExtendsKeyword && t.expression.kind === SyntaxKind.NullKeyword);
        })), visitDeclarationSubtree, isExpressionWithTypeArguments))), clause => clause.types && !!clause.types.length));
    }
}

function isAlwaysType(node: Node) {
    if (node.kind === SyntaxKind.InterfaceDeclaration) {
        return true;
    }
    return false;
}

// Elide "public" modifier, as it is the default
function maskModifiers(factory: NodeFactory, node: Node, modifierMask?: ModifierFlags, modifierAdditions?: ModifierFlags): Modifier[] | undefined {
    return factory.createModifiersFromModifierFlags(maskModifierFlags(node, modifierMask, modifierAdditions));
}

function maskModifierFlags(node: Node, modifierMask: ModifierFlags = ModifierFlags.All ^ ModifierFlags.Public, modifierAdditions: ModifierFlags = ModifierFlags.None): ModifierFlags {
    let flags = (getEffectiveModifierFlags(node) & modifierMask) | modifierAdditions;
    if (flags & ModifierFlags.Default && !(flags & ModifierFlags.Export)) {
        // A non-exported default is a nonsequitor - we usually try to remove all export modifiers
        // from statements in ambient declarations; but a default export must retain its export modifier to be syntactically valid
        flags ^= ModifierFlags.Export;
    }
    if (flags & ModifierFlags.Default && flags & ModifierFlags.Ambient) {
        flags ^= ModifierFlags.Ambient; // `declare` is never required alongside `default` (and would be an error if printed)
    }
    return flags;
}

function getTypeAnnotationFromAccessor(accessor: AccessorDeclaration): TypeNode | undefined {
    if (accessor) {
        return accessor.kind === SyntaxKind.GetAccessor
            ? accessor.type // Getter - return type
            : accessor.parameters.length > 0
                ? accessor.parameters[0].type // Setter parameter type
                : undefined;
    }
}

type CanHaveLiteralInitializer = VariableDeclaration | PropertyDeclaration | PropertySignature | ParameterDeclaration;
function canHaveLiteralInitializer(node: Node): boolean {
    switch (node.kind) {
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertySignature:
            return !hasEffectiveModifier(node, ModifierFlags.Private);
        case SyntaxKind.Parameter:
        case SyntaxKind.VariableDeclaration:
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
