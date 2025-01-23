import {
    __String,
    AccessExpression,
    AccessorDeclaration,
    ArrayBindingElement,
    ArrayBindingOrAssignmentElement,
    ArrayBindingOrAssignmentPattern,
    ArrowFunction,
    AssertionExpression,
    AssignmentDeclarationKind,
    AssignmentPattern,
    AutoAccessorPropertyDeclaration,
    BinaryExpression,
    BindableObjectDefinePropertyCall,
    BindingElement,
    BindingName,
    BindingOrAssignmentElement,
    BindingOrAssignmentElementTarget,
    BindingOrAssignmentPattern,
    BindingPattern,
    Block,
    BooleanLiteral,
    BreakOrContinueStatement,
    CallChain,
    CallExpression,
    CallLikeExpression,
    canHaveIllegalTypeParameters,
    canHaveJSDoc,
    CaseOrDefaultClause,
    CharacterCodes,
    ClassElement,
    ClassLikeDeclaration,
    ClassStaticBlockDeclaration,
    combinePaths,
    CommentRange,
    compareDiagnostics,
    CompilerOptions,
    concatenate,
    ConciseBody,
    ConstructorDeclaration,
    ConstructorTypeNode,
    contains,
    createCompilerDiagnostic,
    Debug,
    Declaration,
    DeclarationName,
    DeclarationStatement,
    DeclarationWithTypeParameters,
    Decorator,
    Diagnostic,
    Diagnostics,
    diagnosticsEqualityComparer,
    ElementAccessChain,
    ElementAccessExpression,
    emptyArray,
    EntityName,
    entityNameToString,
    EnumDeclaration,
    every,
    ExportAssignment,
    ExportDeclaration,
    ExportSpecifier,
    Expression,
    FileReference,
    filter,
    find,
    flatMap,
    forEach,
    ForInitializer,
    ForInOrOfStatement,
    FunctionBody,
    FunctionExpression,
    FunctionLikeDeclaration,
    FunctionTypeNode,
    GeneratedIdentifier,
    GeneratedIdentifierFlags,
    GeneratedPrivateIdentifier,
    GetAccessorDeclaration,
    getAssignmentDeclarationKind,
    getDirectoryPath,
    getEffectiveModifierFlags,
    getEffectiveModifierFlagsAlwaysIncludeJSDoc,
    getElementOrPropertyAccessArgumentExpressionOrName,
    getEmitScriptTarget,
    getJSDocCommentsAndTags,
    getJSDocRoot,
    getJSDocTypeParameterDeclarations,
    getLeadingCommentRanges,
    getLeadingCommentRangesOfNode,
    getSourceFileOfNode,
    getTrailingCommentRanges,
    hasAccessorModifier,
    HasDecorators,
    hasDecorators,
    HasExpressionInitializer,
    HasInitializer,
    HasJSDoc,
    HasLocals,
    HasModifiers,
    hasProperty,
    hasSyntacticModifier,
    HasType,
    Identifier,
    ImportAttributeName,
    ImportClause,
    ImportEqualsDeclaration,
    ImportSpecifier,
    ImportTypeNode,
    isAccessExpression,
    isAmbientModule,
    isAnyImportOrReExport,
    isArrowFunction,
    isAssignmentExpression,
    isBinaryExpression,
    isBindableStaticAccessExpression,
    isBindableStaticElementAccessExpression,
    isBindableStaticNameExpression,
    isBindingElement,
    isBlock,
    isCallExpression,
    isCallSignatureDeclaration,
    isClassExpression,
    isClassStaticBlockDeclaration,
    isDecorator,
    isElementAccessExpression,
    isExpandoPropertyDeclaration,
    isExportAssignment,
    isExportDeclaration,
    isExportSpecifier,
    isFunctionBlock,
    isFunctionExpression,
    isFunctionExpressionOrArrowFunction,
    isFunctionTypeNode,
    isIdentifier,
    isImportSpecifier,
    isInJSFile,
    isJSDoc,
    isJSDocAugmentsTag,
    isJSDocClassTag,
    isJSDocDeprecatedTag,
    isJSDocEnumTag,
    isJSDocFunctionType,
    isJSDocImplementsTag,
    isJSDocOverloadTag,
    isJSDocOverrideTag,
    isJSDocParameterTag,
    isJSDocPrivateTag,
    isJSDocProtectedTag,
    isJSDocPublicTag,
    isJSDocReadonlyTag,
    isJSDocReturnTag,
    isJSDocSatisfiesTag,
    isJSDocSignature,
    isJSDocTemplateTag,
    isJSDocThisTag,
    isJSDocTypeAlias,
    isJSDocTypeLiteral,
    isJSDocTypeTag,
    isKeyword,
    isModuleBlock,
    isNonNullExpression,
    isOmittedExpression,
    isParameter,
    isPrivateIdentifier,
    isPropertyAccessExpression,
    isPropertyAssignment,
    isPropertyDeclaration,
    isPrototypeAccess,
    isRootedDiskPath,
    isSourceFile,
    isStringLiteral,
    isTypeLiteralNode,
    isTypeNodeKind,
    isTypeReferenceNode,
    isVariableDeclaration,
    isVariableDeclarationList,
    isVariableStatement,
    isWhiteSpaceLike,
    IterationStatement,
    JSDocAugmentsTag,
    JSDocClassTag,
    JSDocComment,
    JSDocContainer,
    JSDocDeprecatedTag,
    JSDocEnumTag,
    JSDocImplementsTag,
    JSDocLink,
    JSDocLinkCode,
    JSDocLinkPlain,
    JSDocNamespaceBody,
    JSDocOverrideTag,
    JSDocParameterTag,
    JSDocPrivateTag,
    JSDocPropertyLikeTag,
    JSDocProtectedTag,
    JSDocPublicTag,
    JSDocReadonlyTag,
    JSDocReturnTag,
    JSDocSatisfiesTag,
    JSDocSignature,
    JSDocTag,
    JSDocTemplateTag,
    JSDocThisTag,
    JSDocTypedefTag,
    JSDocTypeTag,
    JsxAttributeLike,
    JsxCallLike,
    JsxChild,
    JsxExpression,
    JsxOpeningLikeElement,
    JsxTagNameExpression,
    KeywordSyntaxKind,
    LabeledStatement,
    last,
    lastOrUndefined,
    LeftHandSideExpression,
    length,
    LiteralExpression,
    LiteralToken,
    MemberName,
    MethodDeclaration,
    Modifier,
    ModifierFlags,
    ModifierLike,
    modifierToFlag,
    ModuleBody,
    ModuleDeclaration,
    ModuleReference,
    NamedDeclaration,
    NamedExportBindings,
    NamedImportBindings,
    NamespaceBody,
    NamespaceExport,
    NamespaceImport,
    NewExpression,
    Node,
    NodeArray,
    NodeFlags,
    NonNullChain,
    normalizePath,
    NullLiteral,
    ObjectBindingOrAssignmentElement,
    ObjectBindingOrAssignmentPattern,
    ObjectLiteralElement,
    ObjectLiteralElementLike,
    OptionalChain,
    OptionalChainRoot,
    OuterExpressionKinds,
    ParameterDeclaration,
    pathIsRelative,
    PostfixUnaryExpression,
    PrefixUnaryExpression,
    PrivateClassElementDeclaration,
    PrivateIdentifier,
    PrivateIdentifierPropertyAccessExpression,
    PropertyAccessChain,
    PropertyAccessExpression,
    PropertyName,
    QualifiedName,
    ScriptTarget,
    SetAccessorDeclaration,
    setLocalizedDiagnosticMessages,
    setUILocale,
    SignatureDeclaration,
    skipOuterExpressions,
    skipTrivia,
    some,
    sortAndDeduplicate,
    SortedReadonlyArray,
    SourceFile,
    Statement,
    StringLiteral,
    StringLiteralLike,
    stringToToken,
    Symbol,
    SyntaxKind,
    TemplateLiteral,
    TemplateLiteralToken,
    TemplateMiddle,
    TemplateTail,
    TextChangeRange,
    TextRange,
    TextSpan,
    tryCast,
    TypeElement,
    TypeNode,
    TypeOnlyAliasDeclaration,
    TypeOnlyExportDeclaration,
    TypeOnlyImportDeclaration,
    TypeParameterDeclaration,
    TypeReferenceType,
    UnaryExpression,
    VariableDeclaration,
} from "./_namespaces/ts.js";

export function isExternalModuleNameRelative(moduleName: string): boolean {
    // TypeScript 1.0 spec (April 2014): 11.2.1
    // An external module name is "relative" if the first term is "." or "..".
    // Update: We also consider a path like `C:\foo.ts` "relative" because we do not search for it in `node_modules` or treat it as an ambient module.
    return pathIsRelative(moduleName) || isRootedDiskPath(moduleName);
}

export function sortAndDeduplicateDiagnostics<T extends Diagnostic>(diagnostics: readonly T[]): SortedReadonlyArray<T> {
    return sortAndDeduplicate<T>(diagnostics, compareDiagnostics, diagnosticsEqualityComparer);
}

/** @internal */
// NOTE: We must reevaluate the target for upcoming features when each successive TC39 edition is ratified in
//       June of each year. This includes changes to `LanguageFeatureMinimumTarget`, `ScriptTarget`,
//       `ScriptTargetFeatures` transformers/esnext.ts, compiler/commandLineParser.ts,
//       compiler/utilitiesPublic.ts, and the contents of each lib/esnext.*.d.ts file.
export const targetToLibMap: Map<ScriptTarget, string> = new Map([
    [ScriptTarget.ESNext, "lib.esnext.full.d.ts"],
    [ScriptTarget.ES2024, "lib.es2024.full.d.ts"],
    [ScriptTarget.ES2023, "lib.es2023.full.d.ts"],
    [ScriptTarget.ES2022, "lib.es2022.full.d.ts"],
    [ScriptTarget.ES2021, "lib.es2021.full.d.ts"],
    [ScriptTarget.ES2020, "lib.es2020.full.d.ts"],
    [ScriptTarget.ES2019, "lib.es2019.full.d.ts"],
    [ScriptTarget.ES2018, "lib.es2018.full.d.ts"],
    [ScriptTarget.ES2017, "lib.es2017.full.d.ts"],
    [ScriptTarget.ES2016, "lib.es2016.full.d.ts"],
    [ScriptTarget.ES2015, "lib.es6.d.ts"], // We don't use lib.es2015.full.d.ts due to breaking change.
]);

export function getDefaultLibFileName(options: CompilerOptions): string {
    const target = getEmitScriptTarget(options);
    switch (target) {
        case ScriptTarget.ESNext:
        case ScriptTarget.ES2024:
        case ScriptTarget.ES2023:
        case ScriptTarget.ES2022:
        case ScriptTarget.ES2021:
        case ScriptTarget.ES2020:
        case ScriptTarget.ES2019:
        case ScriptTarget.ES2018:
        case ScriptTarget.ES2017:
        case ScriptTarget.ES2016:
        case ScriptTarget.ES2015:
            return targetToLibMap.get(target)!;
        default:
            return "lib.d.ts";
    }
}

export function textSpanEnd(span: TextSpan): number {
    return span.start + span.length;
}

export function textSpanIsEmpty(span: TextSpan): boolean {
    return span.length === 0;
}

export function textSpanContainsPosition(span: TextSpan, position: number): boolean {
    return position >= span.start && position < textSpanEnd(span);
}

/** @internal */
export function textRangeContainsPositionInclusive(range: TextRange, position: number): boolean {
    return position >= range.pos && position <= range.end;
}

// Returns true if 'span' contains 'other'.
export function textSpanContainsTextSpan(span: TextSpan, other: TextSpan): boolean {
    return other.start >= span.start && textSpanEnd(other) <= textSpanEnd(span);
}

/** @internal */
export function textSpanContainsTextRange(span: TextSpan, range: TextRange): boolean {
    return range.pos >= span.start && range.end <= textSpanEnd(span);
}

/** @internal */
export function textRangeContainsTextSpan(range: TextRange, span: TextSpan): boolean {
    return span.start >= range.pos && textSpanEnd(span) <= range.end;
}

export function textSpanOverlapsWith(span: TextSpan, other: TextSpan): boolean {
    return textSpanOverlap(span, other) !== undefined;
}

export function textSpanOverlap(span1: TextSpan, span2: TextSpan): TextSpan | undefined {
    const overlap = textSpanIntersection(span1, span2);
    return overlap && overlap.length === 0 ? undefined : overlap;
}

export function textSpanIntersectsWithTextSpan(span: TextSpan, other: TextSpan): boolean {
    return decodedTextSpanIntersectsWith(span.start, span.length, other.start, other.length);
}

export function textSpanIntersectsWith(span: TextSpan, start: number, length: number): boolean {
    return decodedTextSpanIntersectsWith(span.start, span.length, start, length);
}

export function decodedTextSpanIntersectsWith(start1: number, length1: number, start2: number, length2: number): boolean {
    const end1 = start1 + length1;
    const end2 = start2 + length2;
    return start2 <= end1 && end2 >= start1;
}

export function textSpanIntersectsWithPosition(span: TextSpan, position: number): boolean {
    return position <= textSpanEnd(span) && position >= span.start;
}

/** @internal */
export function textRangeIntersectsWithTextSpan(range: TextRange, span: TextSpan): boolean {
    return textSpanIntersectsWith(span, range.pos, range.end - range.pos);
}

export function textSpanIntersection(span1: TextSpan, span2: TextSpan): TextSpan | undefined {
    const start = Math.max(span1.start, span2.start);
    const end = Math.min(textSpanEnd(span1), textSpanEnd(span2));
    return start <= end ? createTextSpanFromBounds(start, end) : undefined;
}

/**
 * Given an array of text spans, returns an equivalent sorted array of text spans
 * where no span overlaps or is adjacent to another span in the array.
 * @internal
 */
export function normalizeSpans(spans: readonly TextSpan[]): TextSpan[] {
    spans = spans.filter(span => span.length > 0).sort((a, b) => {
        return a.start !== b.start ? a.start - b.start : a.length - b.length;
    });

    const result: TextSpan[] = [];
    let i = 0;
    while (i < spans.length) {
        let span = spans[i];
        let j = i + 1;
        while (j < spans.length && textSpanIntersectsWithTextSpan(span, spans[j])) {
            const start = Math.min(span.start, spans[j].start);
            const end = Math.max(textSpanEnd(span), textSpanEnd(spans[j]));
            span = createTextSpanFromBounds(start, end);
            j++;
        }
        i = j;
        result.push(span);
    }

    return result;
}

export function createTextSpan(start: number, length: number): TextSpan {
    if (start < 0) {
        throw new Error("start < 0");
    }
    if (length < 0) {
        throw new Error("length < 0");
    }

    return { start, length };
}

export function createTextSpanFromBounds(start: number, end: number): TextSpan {
    return createTextSpan(start, end - start);
}

export function textChangeRangeNewSpan(range: TextChangeRange): TextSpan {
    return createTextSpan(range.span.start, range.newLength);
}

export function textChangeRangeIsUnchanged(range: TextChangeRange): boolean {
    return textSpanIsEmpty(range.span) && range.newLength === 0;
}

export function createTextChangeRange(span: TextSpan, newLength: number): TextChangeRange {
    if (newLength < 0) {
        throw new Error("newLength < 0");
    }

    return { span, newLength };
}

export const unchangedTextChangeRange: TextChangeRange = createTextChangeRange(createTextSpan(0, 0), 0);

/**
 * Called to merge all the changes that occurred across several versions of a script snapshot
 * into a single change.  i.e. if a user keeps making successive edits to a script we will
 * have a text change from V1 to V2, V2 to V3, ..., Vn.
 *
 * This function will then merge those changes into a single change range valid between V1 and
 * Vn.
 */
export function collapseTextChangeRangesAcrossMultipleVersions(changes: readonly TextChangeRange[]): TextChangeRange {
    if (changes.length === 0) {
        return unchangedTextChangeRange;
    }

    if (changes.length === 1) {
        return changes[0];
    }

    // We change from talking about { { oldStart, oldLength }, newLength } to { oldStart, oldEnd, newEnd }
    // as it makes things much easier to reason about.
    const change0 = changes[0];

    let oldStartN = change0.span.start;
    let oldEndN = textSpanEnd(change0.span);
    let newEndN = oldStartN + change0.newLength;

    for (let i = 1; i < changes.length; i++) {
        const nextChange = changes[i];

        // Consider the following case:
        // i.e. two edits.  The first represents the text change range { { 10, 50 }, 30 }.  i.e. The span starting
        // at 10, with length 50 is reduced to length 30.  The second represents the text change range { { 30, 30 }, 40 }.
        // i.e. the span starting at 30 with length 30 is increased to length 40.
        //
        //      0         10        20        30        40        50        60        70        80        90        100
        //      -------------------------------------------------------------------------------------------------------
        //                |                                                 /
        //                |                                            /----
        //  T1            |                                       /----
        //                |                                  /----
        //                |                             /----
        //      -------------------------------------------------------------------------------------------------------
        //                                     |                            \
        //                                     |                               \
        //   T2                                |                                 \
        //                                     |                                   \
        //                                     |                                      \
        //      -------------------------------------------------------------------------------------------------------
        //
        // Merging these turns out to not be too difficult.  First, determining the new start of the change is trivial
        // it's just the min of the old and new starts.  i.e.:
        //
        //      0         10        20        30        40        50        60        70        80        90        100
        //      ------------------------------------------------------------*------------------------------------------
        //                |                                                 /
        //                |                                            /----
        //  T1            |                                       /----
        //                |                                  /----
        //                |                             /----
        //      ----------------------------------------$-------------------$------------------------------------------
        //                .                    |                            \
        //                .                    |                               \
        //   T2           .                    |                                 \
        //                .                    |                                   \
        //                .                    |                                      \
        //      ----------------------------------------------------------------------*--------------------------------
        //
        // (Note the dots represent the newly inferred start.
        // Determining the new and old end is also pretty simple.  Basically it boils down to paying attention to the
        // absolute positions at the asterisks, and the relative change between the dollar signs. Basically, we see
        // which if the two $'s precedes the other, and we move that one forward until they line up.  in this case that
        // means:
        //
        //      0         10        20        30        40        50        60        70        80        90        100
        //      --------------------------------------------------------------------------------*----------------------
        //                |                                                                     /
        //                |                                                                /----
        //  T1            |                                                           /----
        //                |                                                      /----
        //                |                                                 /----
        //      ------------------------------------------------------------$------------------------------------------
        //                .                    |                            \
        //                .                    |                               \
        //   T2           .                    |                                 \
        //                .                    |                                   \
        //                .                    |                                      \
        //      ----------------------------------------------------------------------*--------------------------------
        //
        // In other words (in this case), we're recognizing that the second edit happened after where the first edit
        // ended with a delta of 20 characters (60 - 40).  Thus, if we go back in time to where the first edit started
        // that's the same as if we started at char 80 instead of 60.
        //
        // As it so happens, the same logic applies if the second edit precedes the first edit.  In that case rather
        // than pushing the first edit forward to match the second, we'll push the second edit forward to match the
        // first.
        //
        // In this case that means we have { oldStart: 10, oldEnd: 80, newEnd: 70 } or, in TextChangeRange
        // semantics: { { start: 10, length: 70 }, newLength: 60 }
        //
        // The math then works out as follows.
        // If we have { oldStart1, oldEnd1, newEnd1 } and { oldStart2, oldEnd2, newEnd2 } then we can compute the
        // final result like so:
        //
        // {
        //      oldStart3: Min(oldStart1, oldStart2),
        //      oldEnd3: Max(oldEnd1, oldEnd1 + (oldEnd2 - newEnd1)),
        //      newEnd3: Max(newEnd2, newEnd2 + (newEnd1 - oldEnd2))
        // }

        const oldStart1 = oldStartN;
        const oldEnd1 = oldEndN;
        const newEnd1 = newEndN;

        const oldStart2 = nextChange.span.start;
        const oldEnd2 = textSpanEnd(nextChange.span);
        const newEnd2 = oldStart2 + nextChange.newLength;

        oldStartN = Math.min(oldStart1, oldStart2);
        oldEndN = Math.max(oldEnd1, oldEnd1 + (oldEnd2 - newEnd1));
        newEndN = Math.max(newEnd2, newEnd2 + (newEnd1 - oldEnd2));
    }

    return createTextChangeRange(createTextSpanFromBounds(oldStartN, oldEndN), /*newLength*/ newEndN - oldStartN);
}

export function getTypeParameterOwner(d: Declaration): Declaration | undefined {
    if (d && d.kind === SyntaxKind.TypeParameter) {
        for (let current: Node = d; current; current = current.parent) {
            if (isFunctionLike(current) || isClassLike(current) || current.kind === SyntaxKind.InterfaceDeclaration) {
                return current as Declaration;
            }
        }
    }
}

export type ParameterPropertyDeclaration = ParameterDeclaration & { parent: ConstructorDeclaration; name: Identifier; };

export function isParameterPropertyDeclaration(node: Node, parent: Node): node is ParameterPropertyDeclaration {
    return isParameter(node) && hasSyntacticModifier(node, ModifierFlags.ParameterPropertyModifier) && parent.kind === SyntaxKind.Constructor;
}

export function isEmptyBindingPattern(node: BindingName): node is BindingPattern {
    if (isBindingPattern(node)) {
        return every(node.elements, isEmptyBindingElement);
    }
    return false;
}

// TODO(jakebailey): It is very weird that we have BindingElement and ArrayBindingElement;
// we should have ObjectBindingElement and ArrayBindingElement, which are both BindingElement,
// just like BindingPattern is a ObjectBindingPattern or a ArrayBindingPattern.
export function isEmptyBindingElement(node: BindingElement | ArrayBindingElement): boolean {
    if (isOmittedExpression(node)) {
        return true;
    }
    return isEmptyBindingPattern(node.name);
}

export function walkUpBindingElementsAndPatterns(binding: BindingElement): VariableDeclaration | ParameterDeclaration {
    let node = binding.parent;
    while (isBindingElement(node.parent)) {
        node = node.parent.parent;
    }
    return node.parent;
}

function getCombinedFlags(node: Node, getFlags: (n: Node) => number): number {
    if (isBindingElement(node)) {
        node = walkUpBindingElementsAndPatterns(node);
    }
    let flags = getFlags(node);
    if (node.kind === SyntaxKind.VariableDeclaration) {
        node = node.parent;
    }
    if (node && node.kind === SyntaxKind.VariableDeclarationList) {
        flags |= getFlags(node);
        node = node.parent;
    }
    if (node && node.kind === SyntaxKind.VariableStatement) {
        flags |= getFlags(node);
    }
    return flags;
}

export function getCombinedModifierFlags(node: Declaration): ModifierFlags {
    return getCombinedFlags(node, getEffectiveModifierFlags);
}

/** @internal */
export function getCombinedNodeFlagsAlwaysIncludeJSDoc(node: Declaration): ModifierFlags {
    return getCombinedFlags(node, getEffectiveModifierFlagsAlwaysIncludeJSDoc);
}

// Returns the node flags for this node and all relevant parent nodes.  This is done so that
// nodes like variable declarations and binding elements can returned a view of their flags
// that includes the modifiers from their container.  i.e. flags like export/declare aren't
// stored on the variable declaration directly, but on the containing variable statement
// (if it has one).  Similarly, flags for let/const are stored on the variable declaration
// list.  By calling this function, all those flags are combined so that the client can treat
// the node as if it actually had those flags.
export function getCombinedNodeFlags(node: Node): NodeFlags {
    return getCombinedFlags(node, getNodeFlags);
}

function getNodeFlags(node: Node) {
    return node.flags;
}

/** @internal */
export const supportedLocaleDirectories = ["cs", "de", "es", "fr", "it", "ja", "ko", "pl", "pt-br", "ru", "tr", "zh-cn", "zh-tw"] as const;

/**
 * Checks to see if the locale is in the appropriate format,
 * and if it is, attempts to set the appropriate language.
 */
export function validateLocaleAndSetLanguage(
    locale: string,
    sys: { getExecutingFilePath(): string; resolvePath(path: string): string; fileExists(fileName: string): boolean; readFile(fileName: string): string | undefined; },
    errors?: Diagnostic[],
): void {
    const lowerCaseLocale = locale.toLowerCase();
    const matchResult = /^([a-z]+)(?:[_-]([a-z]+))?$/.exec(lowerCaseLocale);

    if (!matchResult) {
        if (errors) {
            errors.push(createCompilerDiagnostic(Diagnostics.Locale_must_be_of_the_form_language_or_language_territory_For_example_0_or_1, "en", "ja-jp"));
        }
        return;
    }

    const language = matchResult[1];
    const territory = matchResult[2];

    // First try the entire locale, then fall back to just language if that's all we have.
    // Either ways do not fail, and fallback to the English diagnostic strings.
    if (contains(supportedLocaleDirectories, lowerCaseLocale) && !trySetLanguageAndTerritory(language, territory, errors)) {
        trySetLanguageAndTerritory(language, /*territory*/ undefined, errors);
    }

    // Set the UI locale for string collation
    setUILocale(locale);

    function trySetLanguageAndTerritory(language: string, territory: string | undefined, errors?: Diagnostic[]): boolean {
        const compilerFilePath = normalizePath(sys.getExecutingFilePath());
        const containingDirectoryPath = getDirectoryPath(compilerFilePath);

        let filePath = combinePaths(containingDirectoryPath, language);

        if (territory) {
            filePath = filePath + "-" + territory;
        }

        filePath = sys.resolvePath(combinePaths(filePath, "diagnosticMessages.generated.json"));

        if (!sys.fileExists(filePath)) {
            return false;
        }

        // TODO: Add codePage support for readFile?
        let fileContents: string | undefined = "";
        try {
            fileContents = sys.readFile(filePath);
        }
        catch {
            if (errors) {
                errors.push(createCompilerDiagnostic(Diagnostics.Unable_to_open_file_0, filePath));
            }
            return false;
        }
        try {
            // this is a global mutation (or live binding update)!
            setLocalizedDiagnosticMessages(JSON.parse(fileContents!));
        }
        catch {
            if (errors) {
                errors.push(createCompilerDiagnostic(Diagnostics.Corrupted_locale_file_0, filePath));
            }
            return false;
        }

        return true;
    }
}

export function getOriginalNode(node: Node): Node;
export function getOriginalNode<T extends Node>(node: Node, nodeTest: (node: Node) => node is T): T;
export function getOriginalNode(node: Node | undefined): Node | undefined;
export function getOriginalNode<T extends Node>(node: Node | undefined, nodeTest: (node: Node) => node is T): T | undefined;
export function getOriginalNode<T extends Node>(node: Node | undefined, nodeTest?: (node: Node) => node is T): T | undefined {
    if (node) {
        while (node.original !== undefined) {
            node = node.original;
        }
    }

    if (!node || !nodeTest) {
        return node as T | undefined;
    }

    return nodeTest(node) ? node : undefined;
}

/**
 * Iterates through the parent chain of a node and performs the callback on each parent until the callback
 * returns a truthy value, then returns that value.
 * If no such value is found, it applies the callback until the parent pointer is undefined or the callback returns "quit"
 * At that point findAncestor returns undefined.
 */
export function findAncestor<T extends Node>(node: Node | undefined, callback: (element: Node) => element is T): T | undefined;
export function findAncestor(node: Node | undefined, callback: (element: Node) => boolean | "quit"): Node | undefined;
export function findAncestor(node: Node | undefined, callback: (element: Node) => boolean | "quit"): Node | undefined {
    while (node) {
        const result = callback(node);
        if (result === "quit") {
            return undefined;
        }
        else if (result) {
            return node;
        }
        node = node.parent;
    }
    return undefined;
}

/**
 * Gets a value indicating whether a node originated in the parse tree.
 *
 * @param node The node to test.
 */
export function isParseTreeNode(node: Node): boolean {
    return (node.flags & NodeFlags.Synthesized) === 0;
}

/**
 * Gets the original parse tree node for a node.
 *
 * @param node The original node.
 * @returns The original parse tree node if found; otherwise, undefined.
 */
export function getParseTreeNode(node: Node | undefined): Node | undefined;

/**
 * Gets the original parse tree node for a node.
 *
 * @param node The original node.
 * @param nodeTest A callback used to ensure the correct type of parse tree node is returned.
 * @returns The original parse tree node if found; otherwise, undefined.
 */
export function getParseTreeNode<T extends Node>(node: T | undefined, nodeTest?: (node: Node) => node is T): T | undefined;
export function getParseTreeNode(node: Node | undefined, nodeTest?: (node: Node) => boolean): Node | undefined {
    if (node === undefined || isParseTreeNode(node)) {
        return node;
    }

    node = node.original;
    while (node) {
        if (isParseTreeNode(node)) {
            return !nodeTest || nodeTest(node) ? node : undefined;
        }
        node = node.original;
    }
}

/** Add an extra underscore to identifiers that start with two underscores to avoid issues with magic names like '__proto__' */
export function escapeLeadingUnderscores(identifier: string): __String {
    return (identifier.length >= 2 && identifier.charCodeAt(0) === CharacterCodes._ && identifier.charCodeAt(1) === CharacterCodes._ ? "_" + identifier : identifier) as __String;
}

/**
 * Remove extra underscore from escaped identifier text content.
 *
 * @param identifier The escaped identifier text.
 * @returns The unescaped identifier text.
 */
export function unescapeLeadingUnderscores(identifier: __String): string {
    const id = identifier as string;
    return id.length >= 3 && id.charCodeAt(0) === CharacterCodes._ && id.charCodeAt(1) === CharacterCodes._ && id.charCodeAt(2) === CharacterCodes._ ? id.substr(1) : id;
}

export function idText(identifierOrPrivateName: Identifier | PrivateIdentifier): string {
    return unescapeLeadingUnderscores(identifierOrPrivateName.escapedText);
}

/**
 * If the text of an Identifier matches a keyword (including contextual and TypeScript-specific keywords), returns the
 * SyntaxKind for the matching keyword.
 */
export function identifierToKeywordKind(node: Identifier): KeywordSyntaxKind | undefined {
    const token = stringToToken(node.escapedText as string);
    return token ? tryCast(token, isKeyword) : undefined;
}

export function symbolName(symbol: Symbol): string {
    if (symbol.valueDeclaration && isPrivateIdentifierClassElementDeclaration(symbol.valueDeclaration)) {
        return idText(symbol.valueDeclaration.name);
    }
    return unescapeLeadingUnderscores(symbol.escapedName);
}

/**
 * A JSDocTypedef tag has an _optional_ name field - if a name is not directly present, we should
 * attempt to draw the name from the node the declaration is on (as that declaration is what its' symbol
 * will be merged with)
 */
function nameForNamelessJSDocTypedef(declaration: JSDocTypedefTag | JSDocEnumTag): Identifier | PrivateIdentifier | undefined {
    const hostNode = declaration.parent.parent;
    if (!hostNode) {
        return undefined;
    }
    // Covers classes, functions - any named declaration host node
    if (isDeclaration(hostNode)) {
        return getDeclarationIdentifier(hostNode);
    }
    // Covers remaining cases (returning undefined if none match).
    switch (hostNode.kind) {
        case SyntaxKind.VariableStatement:
            if (hostNode.declarationList && hostNode.declarationList.declarations[0]) {
                return getDeclarationIdentifier(hostNode.declarationList.declarations[0]);
            }
            break;
        case SyntaxKind.ExpressionStatement:
            let expr = hostNode.expression;
            if (expr.kind === SyntaxKind.BinaryExpression && (expr as BinaryExpression).operatorToken.kind === SyntaxKind.EqualsToken) {
                expr = (expr as BinaryExpression).left;
            }
            switch (expr.kind) {
                case SyntaxKind.PropertyAccessExpression:
                    return (expr as PropertyAccessExpression).name;
                case SyntaxKind.ElementAccessExpression:
                    const arg = (expr as ElementAccessExpression).argumentExpression;
                    if (isIdentifier(arg)) {
                        return arg;
                    }
            }
            break;
        case SyntaxKind.ParenthesizedExpression: {
            return getDeclarationIdentifier(hostNode.expression);
        }
        case SyntaxKind.LabeledStatement: {
            if (isDeclaration(hostNode.statement) || isExpression(hostNode.statement)) {
                return getDeclarationIdentifier(hostNode.statement);
            }
            break;
        }
    }
}

function getDeclarationIdentifier(node: Declaration | Expression): Identifier | undefined {
    const name = getNameOfDeclaration(node);
    return name && isIdentifier(name) ? name : undefined;
}

/** @internal */
export function nodeHasName(statement: Node, name: Identifier): boolean {
    if (isNamedDeclaration(statement) && isIdentifier(statement.name) && idText(statement.name as Identifier) === idText(name)) {
        return true;
    }
    if (isVariableStatement(statement) && some(statement.declarationList.declarations, d => nodeHasName(d, name))) {
        return true;
    }
    return false;
}

export function getNameOfJSDocTypedef(declaration: JSDocTypedefTag): Identifier | PrivateIdentifier | undefined {
    return declaration.name || nameForNamelessJSDocTypedef(declaration);
}

/** @internal */
export function isNamedDeclaration(node: Node): node is NamedDeclaration & { name: DeclarationName; } {
    return !!(node as NamedDeclaration).name; // A 'name' property should always be a DeclarationName.
}

/** @internal */
export function getNonAssignedNameOfDeclaration(declaration: Declaration | Expression): DeclarationName | undefined {
    switch (declaration.kind) {
        case SyntaxKind.Identifier:
            return declaration as Identifier;
        case SyntaxKind.JSDocPropertyTag:
        case SyntaxKind.JSDocParameterTag: {
            const { name } = declaration as JSDocPropertyLikeTag;
            if (name.kind === SyntaxKind.QualifiedName) {
                return name.right;
            }
            break;
        }
        case SyntaxKind.CallExpression:
        case SyntaxKind.BinaryExpression: {
            const expr = declaration as BinaryExpression | CallExpression;
            switch (getAssignmentDeclarationKind(expr)) {
                case AssignmentDeclarationKind.ExportsProperty:
                case AssignmentDeclarationKind.ThisProperty:
                case AssignmentDeclarationKind.Property:
                case AssignmentDeclarationKind.PrototypeProperty:
                    return getElementOrPropertyAccessArgumentExpressionOrName((expr as BinaryExpression).left as AccessExpression);
                case AssignmentDeclarationKind.ObjectDefinePropertyValue:
                case AssignmentDeclarationKind.ObjectDefinePropertyExports:
                case AssignmentDeclarationKind.ObjectDefinePrototypeProperty:
                    return (expr as BindableObjectDefinePropertyCall).arguments[1];
                default:
                    return undefined;
            }
        }
        case SyntaxKind.JSDocTypedefTag:
            return getNameOfJSDocTypedef(declaration as JSDocTypedefTag);
        case SyntaxKind.JSDocEnumTag:
            return nameForNamelessJSDocTypedef(declaration as JSDocEnumTag);
        case SyntaxKind.ExportAssignment: {
            const { expression } = declaration as ExportAssignment;
            return isIdentifier(expression) ? expression : undefined;
        }
        case SyntaxKind.ElementAccessExpression:
            const expr = declaration as ElementAccessExpression;
            if (isBindableStaticElementAccessExpression(expr)) {
                return expr.argumentExpression;
            }
    }
    return (declaration as NamedDeclaration).name;
}

export function getNameOfDeclaration(declaration: Declaration | Expression | undefined): DeclarationName | undefined {
    if (declaration === undefined) return undefined;
    return getNonAssignedNameOfDeclaration(declaration) ||
        (isFunctionExpression(declaration) || isArrowFunction(declaration) || isClassExpression(declaration) ? getAssignedName(declaration) : undefined);
}

/** @internal */
export function getAssignedName(node: Node): DeclarationName | undefined {
    if (!node.parent) {
        return undefined;
    }
    else if (isPropertyAssignment(node.parent) || isBindingElement(node.parent)) {
        return node.parent.name;
    }
    else if (isBinaryExpression(node.parent) && node === node.parent.right) {
        if (isIdentifier(node.parent.left)) {
            return node.parent.left;
        }
        else if (isAccessExpression(node.parent.left)) {
            return getElementOrPropertyAccessArgumentExpressionOrName(node.parent.left);
        }
    }
    else if (isVariableDeclaration(node.parent) && isIdentifier(node.parent.name)) {
        return node.parent.name;
    }
}

export function getDecorators(node: HasDecorators): readonly Decorator[] | undefined {
    if (hasDecorators(node)) {
        return filter(node.modifiers, isDecorator);
    }
}

export function getModifiers(node: HasModifiers): readonly Modifier[] | undefined {
    if (hasSyntacticModifier(node, ModifierFlags.Modifier)) {
        return filter(node.modifiers, isModifier);
    }
}

function getJSDocParameterTagsWorker(param: ParameterDeclaration, noCache?: boolean): readonly JSDocParameterTag[] {
    if (param.name) {
        if (isIdentifier(param.name)) {
            const name = param.name.escapedText;
            return getJSDocTagsWorker(param.parent, noCache).filter((tag): tag is JSDocParameterTag => isJSDocParameterTag(tag) && isIdentifier(tag.name) && tag.name.escapedText === name);
        }
        else {
            const i = param.parent.parameters.indexOf(param);
            Debug.assert(i > -1, "Parameters should always be in their parents' parameter list");
            const paramTags = getJSDocTagsWorker(param.parent, noCache).filter(isJSDocParameterTag);
            if (i < paramTags.length) {
                return [paramTags[i]];
            }
        }
    }
    // return empty array for: out-of-order binding patterns and JSDoc function syntax, which has un-named parameters
    return emptyArray;
}

/**
 * Gets the JSDoc parameter tags for the node if present.
 *
 * @remarks Returns any JSDoc param tag whose name matches the provided
 * parameter, whether a param tag on a containing function
 * expression, or a param tag on a variable declaration whose
 * initializer is the containing function. The tags closest to the
 * node are returned first, so in the previous example, the param
 * tag on the containing function expression would be first.
 *
 * For binding patterns, parameter tags are matched by position.
 */
export function getJSDocParameterTags(param: ParameterDeclaration): readonly JSDocParameterTag[] {
    return getJSDocParameterTagsWorker(param, /*noCache*/ false);
}

/** @internal */
export function getJSDocParameterTagsNoCache(param: ParameterDeclaration): readonly JSDocParameterTag[] {
    return getJSDocParameterTagsWorker(param, /*noCache*/ true);
}

function getJSDocTypeParameterTagsWorker(param: TypeParameterDeclaration, noCache?: boolean): readonly JSDocTemplateTag[] {
    const name = param.name.escapedText;
    return getJSDocTagsWorker(param.parent, noCache).filter((tag): tag is JSDocTemplateTag => isJSDocTemplateTag(tag) && tag.typeParameters.some(tp => tp.name.escapedText === name));
}

/**
 * Gets the JSDoc type parameter tags for the node if present.
 *
 * @remarks Returns any JSDoc template tag whose names match the provided
 * parameter, whether a template tag on a containing function
 * expression, or a template tag on a variable declaration whose
 * initializer is the containing function. The tags closest to the
 * node are returned first, so in the previous example, the template
 * tag on the containing function expression would be first.
 */
export function getJSDocTypeParameterTags(param: TypeParameterDeclaration): readonly JSDocTemplateTag[] {
    return getJSDocTypeParameterTagsWorker(param, /*noCache*/ false);
}

/** @internal */
export function getJSDocTypeParameterTagsNoCache(param: TypeParameterDeclaration): readonly JSDocTemplateTag[] {
    return getJSDocTypeParameterTagsWorker(param, /*noCache*/ true);
}

/**
 * Return true if the node has JSDoc parameter tags.
 *
 * @remarks Includes parameter tags that are not directly on the node,
 * for example on a variable declaration whose initializer is a function expression.
 */
export function hasJSDocParameterTags(node: FunctionLikeDeclaration | SignatureDeclaration): boolean {
    return !!getFirstJSDocTag(node, isJSDocParameterTag);
}

/** Gets the JSDoc augments tag for the node if present */
export function getJSDocAugmentsTag(node: Node): JSDocAugmentsTag | undefined {
    return getFirstJSDocTag(node, isJSDocAugmentsTag);
}

/** Gets the JSDoc implements tags for the node if present */
export function getJSDocImplementsTags(node: Node): readonly JSDocImplementsTag[] {
    return getAllJSDocTags(node, isJSDocImplementsTag);
}

/** Gets the JSDoc class tag for the node if present */
export function getJSDocClassTag(node: Node): JSDocClassTag | undefined {
    return getFirstJSDocTag(node, isJSDocClassTag);
}

/** Gets the JSDoc public tag for the node if present */
export function getJSDocPublicTag(node: Node): JSDocPublicTag | undefined {
    return getFirstJSDocTag(node, isJSDocPublicTag);
}

/** @internal */
export function getJSDocPublicTagNoCache(node: Node): JSDocPublicTag | undefined {
    return getFirstJSDocTag(node, isJSDocPublicTag, /*noCache*/ true);
}

/** Gets the JSDoc private tag for the node if present */
export function getJSDocPrivateTag(node: Node): JSDocPrivateTag | undefined {
    return getFirstJSDocTag(node, isJSDocPrivateTag);
}

/** @internal */
export function getJSDocPrivateTagNoCache(node: Node): JSDocPrivateTag | undefined {
    return getFirstJSDocTag(node, isJSDocPrivateTag, /*noCache*/ true);
}

/** Gets the JSDoc protected tag for the node if present */
export function getJSDocProtectedTag(node: Node): JSDocProtectedTag | undefined {
    return getFirstJSDocTag(node, isJSDocProtectedTag);
}

/** @internal */
export function getJSDocProtectedTagNoCache(node: Node): JSDocProtectedTag | undefined {
    return getFirstJSDocTag(node, isJSDocProtectedTag, /*noCache*/ true);
}

/** Gets the JSDoc protected tag for the node if present */
export function getJSDocReadonlyTag(node: Node): JSDocReadonlyTag | undefined {
    return getFirstJSDocTag(node, isJSDocReadonlyTag);
}

/** @internal */
export function getJSDocReadonlyTagNoCache(node: Node): JSDocReadonlyTag | undefined {
    return getFirstJSDocTag(node, isJSDocReadonlyTag, /*noCache*/ true);
}

export function getJSDocOverrideTagNoCache(node: Node): JSDocOverrideTag | undefined {
    return getFirstJSDocTag(node, isJSDocOverrideTag, /*noCache*/ true);
}

/** Gets the JSDoc deprecated tag for the node if present */
export function getJSDocDeprecatedTag(node: Node): JSDocDeprecatedTag | undefined {
    return getFirstJSDocTag(node, isJSDocDeprecatedTag);
}

/** @internal */
export function getJSDocDeprecatedTagNoCache(node: Node): JSDocDeprecatedTag | undefined {
    return getFirstJSDocTag(node, isJSDocDeprecatedTag, /*noCache*/ true);
}

/** Gets the JSDoc enum tag for the node if present */
export function getJSDocEnumTag(node: Node): JSDocEnumTag | undefined {
    return getFirstJSDocTag(node, isJSDocEnumTag);
}

/** Gets the JSDoc this tag for the node if present */
export function getJSDocThisTag(node: Node): JSDocThisTag | undefined {
    return getFirstJSDocTag(node, isJSDocThisTag);
}

/** Gets the JSDoc return tag for the node if present */
export function getJSDocReturnTag(node: Node): JSDocReturnTag | undefined {
    return getFirstJSDocTag(node, isJSDocReturnTag);
}

/** Gets the JSDoc template tag for the node if present */
export function getJSDocTemplateTag(node: Node): JSDocTemplateTag | undefined {
    return getFirstJSDocTag(node, isJSDocTemplateTag);
}

export function getJSDocSatisfiesTag(node: Node): JSDocSatisfiesTag | undefined {
    return getFirstJSDocTag(node, isJSDocSatisfiesTag);
}

/** Gets the JSDoc type tag for the node if present and valid */
export function getJSDocTypeTag(node: Node): JSDocTypeTag | undefined {
    // We should have already issued an error if there were multiple type jsdocs, so just use the first one.
    const tag = getFirstJSDocTag(node, isJSDocTypeTag);
    if (tag && tag.typeExpression && tag.typeExpression.type) {
        return tag;
    }
    return undefined;
}

/**
 * Gets the type node for the node if provided via JSDoc.
 *
 * @remarks The search includes any JSDoc param tag that relates
 * to the provided parameter, for example a type tag on the
 * parameter itself, or a param tag on a containing function
 * expression, or a param tag on a variable declaration whose
 * initializer is the containing function. The tags closest to the
 * node are examined first, so in the previous example, the type
 * tag directly on the node would be returned.
 */
export function getJSDocType(node: Node): TypeNode | undefined {
    let tag: JSDocTypeTag | JSDocParameterTag | undefined = getFirstJSDocTag(node, isJSDocTypeTag);
    if (!tag && isParameter(node)) {
        tag = find(getJSDocParameterTags(node), tag => !!tag.typeExpression);
    }

    return tag && tag.typeExpression && tag.typeExpression.type;
}

/**
 * Gets the return type node for the node if provided via JSDoc return tag or type tag.
 *
 * @remarks `getJSDocReturnTag` just gets the whole JSDoc tag. This function
 * gets the type from inside the braces, after the fat arrow, etc.
 */
export function getJSDocReturnType(node: Node): TypeNode | undefined {
    const returnTag = getJSDocReturnTag(node);
    if (returnTag && returnTag.typeExpression) {
        return returnTag.typeExpression.type;
    }
    const typeTag = getJSDocTypeTag(node);
    if (typeTag && typeTag.typeExpression) {
        const type = typeTag.typeExpression.type;
        if (isTypeLiteralNode(type)) {
            const sig = find(type.members, isCallSignatureDeclaration);
            return sig && sig.type;
        }
        if (isFunctionTypeNode(type) || isJSDocFunctionType(type)) {
            return type.type;
        }
    }
}

function getJSDocTagsWorker(node: Node, noCache?: boolean): readonly JSDocTag[] {
    if (!canHaveJSDoc(node)) return emptyArray;
    let tags = node.jsDoc?.jsDocCache;
    // If cache is 'null', that means we did the work of searching for JSDoc tags and came up with nothing.
    if (tags === undefined || noCache) {
        const comments = getJSDocCommentsAndTags(node, noCache);
        Debug.assert(comments.length < 2 || comments[0] !== comments[1]);
        tags = flatMap(comments, j => isJSDoc(j) ? j.tags : j);
        if (!noCache) {
            node.jsDoc ??= [];
            node.jsDoc.jsDocCache = tags;
        }
    }
    return tags;
}

/** Get all JSDoc tags related to a node, including those on parent nodes. */
export function getJSDocTags(node: Node): readonly JSDocTag[] {
    return getJSDocTagsWorker(node, /*noCache*/ false);
}

/** Get the first JSDoc tag of a specified kind, or undefined if not present. */
function getFirstJSDocTag<T extends JSDocTag>(node: Node, predicate: (tag: JSDocTag) => tag is T, noCache?: boolean): T | undefined {
    return find(getJSDocTagsWorker(node, noCache), predicate);
}

/** Gets all JSDoc tags that match a specified predicate */
export function getAllJSDocTags<T extends JSDocTag>(node: Node, predicate: (tag: JSDocTag) => tag is T): readonly T[] {
    return getJSDocTags(node).filter(predicate);
}

/** Gets all JSDoc tags of a specified kind */
export function getAllJSDocTagsOfKind(node: Node, kind: SyntaxKind): readonly JSDocTag[] {
    return getJSDocTags(node).filter(doc => doc.kind === kind);
}

/** Gets the text of a jsdoc comment, flattening links to their text. */
export function getTextOfJSDocComment(comment?: string | NodeArray<JSDocComment>): string | undefined {
    return typeof comment === "string" ? comment
        : comment?.map(c => c.kind === SyntaxKind.JSDocText ? c.text : formatJSDocLink(c)).join("");
}

function formatJSDocLink(link: JSDocLink | JSDocLinkCode | JSDocLinkPlain) {
    const kind = link.kind === SyntaxKind.JSDocLink ? "link"
        : link.kind === SyntaxKind.JSDocLinkCode ? "linkcode"
        : "linkplain";
    const name = link.name ? entityNameToString(link.name) : "";
    const space = link.name && (link.text === "" || link.text.startsWith("://")) ? "" : " ";
    return `{@${kind} ${name}${space}${link.text}}`;
}

/**
 * Gets the effective type parameters. If the node was parsed in a
 * JavaScript file, gets the type parameters from the `@template` tag from JSDoc.
 *
 * This does *not* return type parameters from a jsdoc reference to a generic type, eg
 *
 * type Id = <T>(x: T) => T
 * /** @type {Id} /
 * function id(x) { return x }
 */
export function getEffectiveTypeParameterDeclarations(node: DeclarationWithTypeParameters): readonly TypeParameterDeclaration[] {
    if (isJSDocSignature(node)) {
        if (isJSDocOverloadTag(node.parent)) {
            const jsDoc = getJSDocRoot(node.parent);
            if (jsDoc && length(jsDoc.tags)) {
                return flatMap(jsDoc.tags, tag => isJSDocTemplateTag(tag) ? tag.typeParameters : undefined);
            }
        }
        return emptyArray;
    }
    if (isJSDocTypeAlias(node)) {
        Debug.assert(node.parent.kind === SyntaxKind.JSDoc);
        return flatMap(node.parent.tags, tag => isJSDocTemplateTag(tag) ? tag.typeParameters : undefined);
    }
    if (node.typeParameters) {
        return node.typeParameters;
    }
    if (canHaveIllegalTypeParameters(node) && node.typeParameters) {
        return node.typeParameters;
    }
    if (isInJSFile(node)) {
        const decls = getJSDocTypeParameterDeclarations(node);
        if (decls.length) {
            return decls;
        }
        const typeTag = getJSDocType(node);
        if (typeTag && isFunctionTypeNode(typeTag) && typeTag.typeParameters) {
            return typeTag.typeParameters;
        }
    }
    return emptyArray;
}

export function getEffectiveConstraintOfTypeParameter(node: TypeParameterDeclaration): TypeNode | undefined {
    return node.constraint ? node.constraint :
        isJSDocTemplateTag(node.parent) && node === node.parent.typeParameters[0] ? node.parent.constraint :
        undefined;
}

// #region

export function isMemberName(node: Node): node is MemberName {
    return node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.PrivateIdentifier;
}

/** @internal */
export function isGetOrSetAccessorDeclaration(node: Node): node is AccessorDeclaration {
    return node.kind === SyntaxKind.SetAccessor || node.kind === SyntaxKind.GetAccessor;
}

export function isPropertyAccessChain(node: Node): node is PropertyAccessChain {
    return isPropertyAccessExpression(node) && !!(node.flags & NodeFlags.OptionalChain);
}

export function isElementAccessChain(node: Node): node is ElementAccessChain {
    return isElementAccessExpression(node) && !!(node.flags & NodeFlags.OptionalChain);
}

export function isCallChain(node: Node): node is CallChain {
    return isCallExpression(node) && !!(node.flags & NodeFlags.OptionalChain);
}

export function isOptionalChain(node: Node): node is PropertyAccessChain | ElementAccessChain | CallChain | NonNullChain {
    const kind = node.kind;
    return !!(node.flags & NodeFlags.OptionalChain) &&
        (kind === SyntaxKind.PropertyAccessExpression
            || kind === SyntaxKind.ElementAccessExpression
            || kind === SyntaxKind.CallExpression
            || kind === SyntaxKind.NonNullExpression);
}

/** @internal */
export function isOptionalChainRoot(node: Node): node is OptionalChainRoot {
    return isOptionalChain(node) && !isNonNullExpression(node) && !!node.questionDotToken;
}

/**
 * Determines whether a node is the expression preceding an optional chain (i.e. `a` in `a?.b`).
 *
 * @internal
 */
export function isExpressionOfOptionalChainRoot(node: Node): node is Expression & { parent: OptionalChainRoot; } {
    return isOptionalChainRoot(node.parent) && node.parent.expression === node;
}

/**
 * Determines whether a node is the outermost `OptionalChain` in an ECMAScript `OptionalExpression`:
 *
 * 1. For `a?.b.c`, the outermost chain is `a?.b.c` (`c` is the end of the chain starting at `a?.`)
 * 2. For `a?.b!`, the outermost chain is `a?.b` (`b` is the end of the chain starting at `a?.`)
 * 3. For `(a?.b.c).d`, the outermost chain is `a?.b.c` (`c` is the end of the chain starting at `a?.` since parens end the chain)
 * 4. For `a?.b.c?.d`, both `a?.b.c` and `a?.b.c?.d` are outermost (`c` is the end of the chain starting at `a?.`, and `d` is
 *   the end of the chain starting at `c?.`)
 * 5. For `a?.(b?.c).d`, both `b?.c` and `a?.(b?.c)d` are outermost (`c` is the end of the chain starting at `b`, and `d` is
 *   the end of the chain starting at `a?.`)
 *
 * @internal
 */
export function isOutermostOptionalChain(node: OptionalChain): boolean {
    return !isOptionalChain(node.parent) // cases 1, 2, and 3
        || isOptionalChainRoot(node.parent) // case 4
        || node !== node.parent.expression; // case 5
}

export function isNullishCoalesce(node: Node): boolean {
    return node.kind === SyntaxKind.BinaryExpression && (node as BinaryExpression).operatorToken.kind === SyntaxKind.QuestionQuestionToken;
}

export function isConstTypeReference(node: Node): boolean {
    return isTypeReferenceNode(node) && isIdentifier(node.typeName) &&
        node.typeName.escapedText === "const" && !node.typeArguments;
}

export function skipPartiallyEmittedExpressions(node: Expression): Expression;
export function skipPartiallyEmittedExpressions(node: Node): Node;
export function skipPartiallyEmittedExpressions(node: Node) {
    return skipOuterExpressions(node, OuterExpressionKinds.PartiallyEmittedExpressions);
}

export function isNonNullChain(node: Node): node is NonNullChain {
    return isNonNullExpression(node) && !!(node.flags & NodeFlags.OptionalChain);
}

export function isBreakOrContinueStatement(node: Node): node is BreakOrContinueStatement {
    return node.kind === SyntaxKind.BreakStatement || node.kind === SyntaxKind.ContinueStatement;
}

export function isNamedExportBindings(node: Node): node is NamedExportBindings {
    return node.kind === SyntaxKind.NamespaceExport || node.kind === SyntaxKind.NamedExports;
}

export function isJSDocPropertyLikeTag(node: Node): node is JSDocPropertyLikeTag {
    return node.kind === SyntaxKind.JSDocPropertyTag || node.kind === SyntaxKind.JSDocParameterTag;
}

// #endregion

// #region
// Node tests
//
// All node tests in the following list should *not* reference parent pointers so that
// they may be used with transformations.

/** @internal */
export function isNodeKind(kind: SyntaxKind): boolean {
    return kind >= SyntaxKind.FirstNode;
}

/**
 * True if kind is of some token syntax kind.
 * For example, this is true for an IfKeyword but not for an IfStatement.
 * Literals are considered tokens, except TemplateLiteral, but does include TemplateHead/Middle/Tail.
 */
export function isTokenKind(kind: SyntaxKind): boolean {
    return kind >= SyntaxKind.FirstToken && kind <= SyntaxKind.LastToken;
}

/**
 * True if node is of some token syntax kind.
 * For example, this is true for an IfKeyword but not for an IfStatement.
 * Literals are considered tokens, except TemplateLiteral, but does include TemplateHead/Middle/Tail.
 */
export function isToken(n: Node): boolean {
    return isTokenKind(n.kind);
}

// Node Arrays

/** @internal */
export function isNodeArray<T extends Node>(array: readonly T[]): array is NodeArray<T> {
    return hasProperty(array, "pos") && hasProperty(array, "end");
}

// Literals

/** @internal */
export function isLiteralKind(kind: SyntaxKind): kind is LiteralToken["kind"] {
    return SyntaxKind.FirstLiteralToken <= kind && kind <= SyntaxKind.LastLiteralToken;
}

export function isLiteralExpression(node: Node): node is LiteralExpression {
    return isLiteralKind(node.kind);
}

/** @internal */
export function isLiteralExpressionOfObject(node: Node): boolean {
    switch (node.kind) {
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.ArrayLiteralExpression:
        case SyntaxKind.RegularExpressionLiteral:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ClassExpression:
            return true;
    }
    return false;
}

// Pseudo-literals

/** @internal */
export function isTemplateLiteralKind(kind: SyntaxKind): kind is TemplateLiteralToken["kind"] {
    return SyntaxKind.FirstTemplateToken <= kind && kind <= SyntaxKind.LastTemplateToken;
}

export function isTemplateLiteralToken(node: Node): node is TemplateLiteralToken {
    return isTemplateLiteralKind(node.kind);
}

export function isTemplateMiddleOrTemplateTail(node: Node): node is TemplateMiddle | TemplateTail {
    const kind = node.kind;
    return kind === SyntaxKind.TemplateMiddle
        || kind === SyntaxKind.TemplateTail;
}

export function isImportOrExportSpecifier(node: Node): node is ImportSpecifier | ExportSpecifier {
    return isImportSpecifier(node) || isExportSpecifier(node);
}

export function isTypeOnlyImportDeclaration(node: Node): node is TypeOnlyImportDeclaration {
    switch (node.kind) {
        case SyntaxKind.ImportSpecifier:
            return (node as ImportSpecifier).isTypeOnly || (node as ImportSpecifier).parent.parent.isTypeOnly;
        case SyntaxKind.NamespaceImport:
            return (node as NamespaceImport).parent.isTypeOnly;
        case SyntaxKind.ImportClause:
        case SyntaxKind.ImportEqualsDeclaration:
            return (node as ImportClause | ImportEqualsDeclaration).isTypeOnly;
    }
    return false;
}

export function isTypeOnlyExportDeclaration(node: Node): node is TypeOnlyExportDeclaration {
    switch (node.kind) {
        case SyntaxKind.ExportSpecifier:
            return (node as ExportSpecifier).isTypeOnly || (node as ExportSpecifier).parent.parent.isTypeOnly;
        case SyntaxKind.ExportDeclaration:
            return (node as ExportDeclaration).isTypeOnly && !!(node as ExportDeclaration).moduleSpecifier && !(node as ExportDeclaration).exportClause;
        case SyntaxKind.NamespaceExport:
            return (node as NamespaceExport).parent.isTypeOnly;
    }
    return false;
}

export function isTypeOnlyImportOrExportDeclaration(node: Node): node is TypeOnlyAliasDeclaration {
    return isTypeOnlyImportDeclaration(node) || isTypeOnlyExportDeclaration(node);
}

export function isPartOfTypeOnlyImportOrExportDeclaration(node: Node): boolean {
    return findAncestor(node, isTypeOnlyImportOrExportDeclaration) !== undefined;
}

export function isStringTextContainingNode(node: Node): node is StringLiteral | TemplateLiteralToken {
    return node.kind === SyntaxKind.StringLiteral || isTemplateLiteralKind(node.kind);
}

export function isImportAttributeName(node: Node): node is ImportAttributeName {
    return isStringLiteral(node) || isIdentifier(node);
}

// Identifiers

/** @internal */
export function isGeneratedIdentifier(node: Node): node is GeneratedIdentifier {
    return isIdentifier(node) && node.emitNode?.autoGenerate !== undefined;
}

/** @internal */
export function isGeneratedPrivateIdentifier(node: Node): node is GeneratedPrivateIdentifier {
    return isPrivateIdentifier(node) && node.emitNode?.autoGenerate !== undefined;
}

/** @internal */
export function isFileLevelReservedGeneratedIdentifier(node: GeneratedIdentifier): boolean {
    const flags = node.emitNode.autoGenerate.flags;
    return !!(flags & GeneratedIdentifierFlags.FileLevel)
        && !!(flags & GeneratedIdentifierFlags.Optimistic)
        && !!(flags & GeneratedIdentifierFlags.ReservedInNestedScopes);
}

// Private Identifiers
/** @internal */
export function isPrivateIdentifierClassElementDeclaration(node: Node): node is PrivateClassElementDeclaration {
    return (isPropertyDeclaration(node) || isMethodOrAccessor(node)) && isPrivateIdentifier(node.name);
}

/** @internal */
export function isPrivateIdentifierPropertyAccessExpression(node: Node): node is PrivateIdentifierPropertyAccessExpression {
    return isPropertyAccessExpression(node) && isPrivateIdentifier(node.name);
}

// Keywords

/** @internal */
export function isModifierKind(token: SyntaxKind): token is Modifier["kind"] {
    switch (token) {
        case SyntaxKind.AbstractKeyword:
        case SyntaxKind.AccessorKeyword:
        case SyntaxKind.AsyncKeyword:
        case SyntaxKind.ConstKeyword:
        case SyntaxKind.DeclareKeyword:
        case SyntaxKind.DefaultKeyword:
        case SyntaxKind.ExportKeyword:
        case SyntaxKind.InKeyword:
        case SyntaxKind.PublicKeyword:
        case SyntaxKind.PrivateKeyword:
        case SyntaxKind.ProtectedKeyword:
        case SyntaxKind.ReadonlyKeyword:
        case SyntaxKind.StaticKeyword:
        case SyntaxKind.OutKeyword:
        case SyntaxKind.OverrideKeyword:
            return true;
    }
    return false;
}

/** @internal */
export function isParameterPropertyModifier(kind: SyntaxKind): boolean {
    return !!(modifierToFlag(kind) & ModifierFlags.ParameterPropertyModifier);
}

/** @internal */
export function isClassMemberModifier(idToken: SyntaxKind): boolean {
    return isParameterPropertyModifier(idToken) ||
        idToken === SyntaxKind.StaticKeyword ||
        idToken === SyntaxKind.OverrideKeyword ||
        idToken === SyntaxKind.AccessorKeyword;
}

export function isModifier(node: Node): node is Modifier {
    return isModifierKind(node.kind);
}

export function isEntityName(node: Node): node is EntityName {
    const kind = node.kind;
    return kind === SyntaxKind.QualifiedName
        || kind === SyntaxKind.Identifier;
}

export function isPropertyName(node: Node): node is PropertyName {
    const kind = node.kind;
    return kind === SyntaxKind.Identifier
        || kind === SyntaxKind.PrivateIdentifier
        || kind === SyntaxKind.StringLiteral
        || kind === SyntaxKind.NumericLiteral
        || kind === SyntaxKind.ComputedPropertyName;
}

export function isBindingName(node: Node): node is BindingName {
    const kind = node.kind;
    return kind === SyntaxKind.Identifier
        || kind === SyntaxKind.ObjectBindingPattern
        || kind === SyntaxKind.ArrayBindingPattern;
}

// Functions

export function isFunctionLike(node: Node | undefined): node is SignatureDeclaration {
    return !!node && isFunctionLikeKind(node.kind);
}

/** @internal */
export function isFunctionLikeOrClassStaticBlockDeclaration(node: Node | undefined): node is SignatureDeclaration | ClassStaticBlockDeclaration {
    return !!node && (isFunctionLikeKind(node.kind) || isClassStaticBlockDeclaration(node));
}

/** @internal */
export function isFunctionLikeDeclaration(node: Node): node is FunctionLikeDeclaration {
    return node && isFunctionLikeDeclarationKind(node.kind);
}

/** @internal */
export function isBooleanLiteral(node: Node): node is BooleanLiteral {
    return node.kind === SyntaxKind.TrueKeyword || node.kind === SyntaxKind.FalseKeyword;
}

function isFunctionLikeDeclarationKind(kind: SyntaxKind): boolean {
    switch (kind) {
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.Constructor:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.ArrowFunction:
            return true;
        default:
            return false;
    }
}

/** @internal */
export function isFunctionLikeKind(kind: SyntaxKind): boolean {
    switch (kind) {
        case SyntaxKind.MethodSignature:
        case SyntaxKind.CallSignature:
        case SyntaxKind.JSDocSignature:
        case SyntaxKind.ConstructSignature:
        case SyntaxKind.IndexSignature:
        case SyntaxKind.FunctionType:
        case SyntaxKind.JSDocFunctionType:
        case SyntaxKind.ConstructorType:
            return true;
        default:
            return isFunctionLikeDeclarationKind(kind);
    }
}

/** @internal */
export function isFunctionOrModuleBlock(node: Node): boolean {
    return isSourceFile(node) || isModuleBlock(node) || isBlock(node) && isFunctionLike(node.parent);
}

// Classes
export function isClassElement(node: Node): node is ClassElement {
    const kind = node.kind;
    return kind === SyntaxKind.Constructor
        || kind === SyntaxKind.PropertyDeclaration
        || kind === SyntaxKind.MethodDeclaration
        || kind === SyntaxKind.GetAccessor
        || kind === SyntaxKind.SetAccessor
        || kind === SyntaxKind.IndexSignature
        || kind === SyntaxKind.ClassStaticBlockDeclaration
        || kind === SyntaxKind.SemicolonClassElement;
}

export function isClassLike(node: Node): node is ClassLikeDeclaration {
    return node && (node.kind === SyntaxKind.ClassDeclaration || node.kind === SyntaxKind.ClassExpression);
}

export function isAccessor(node: Node): node is AccessorDeclaration {
    return node && (node.kind === SyntaxKind.GetAccessor || node.kind === SyntaxKind.SetAccessor);
}

export function isAutoAccessorPropertyDeclaration(node: Node): node is AutoAccessorPropertyDeclaration {
    return isPropertyDeclaration(node) && hasAccessorModifier(node);
}

/** @internal */
export function isClassInstanceProperty(node: Declaration): boolean {
    if (isInJSFile(node) && isExpandoPropertyDeclaration(node)) {
        return (!isBindableStaticAccessExpression(node) || !isPrototypeAccess(node.expression)) && !isBindableStaticNameExpression(node, /*excludeThisKeyword*/ true);
    }
    return node.parent && isClassLike(node.parent) && isPropertyDeclaration(node) && !hasAccessorModifier(node);
}

/** @internal */
export function isMethodOrAccessor(node: Node): node is MethodDeclaration | AccessorDeclaration {
    switch (node.kind) {
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.SetAccessor:
            return true;
        default:
            return false;
    }
}

// Type members

export function isModifierLike(node: Node): node is ModifierLike {
    return isModifier(node) || isDecorator(node);
}

export function isTypeElement(node: Node): node is TypeElement {
    const kind = node.kind;
    return kind === SyntaxKind.ConstructSignature
        || kind === SyntaxKind.CallSignature
        || kind === SyntaxKind.PropertySignature
        || kind === SyntaxKind.MethodSignature
        || kind === SyntaxKind.IndexSignature
        || kind === SyntaxKind.GetAccessor
        || kind === SyntaxKind.SetAccessor
        || kind === SyntaxKind.NotEmittedTypeElement;
}

export function isClassOrTypeElement(node: Node): node is ClassElement | TypeElement {
    return isTypeElement(node) || isClassElement(node);
}

export function isObjectLiteralElementLike(node: Node): node is ObjectLiteralElementLike {
    const kind = node.kind;
    return kind === SyntaxKind.PropertyAssignment
        || kind === SyntaxKind.ShorthandPropertyAssignment
        || kind === SyntaxKind.SpreadAssignment
        || kind === SyntaxKind.MethodDeclaration
        || kind === SyntaxKind.GetAccessor
        || kind === SyntaxKind.SetAccessor;
}

// Type

/**
 * Node test that determines whether a node is a valid type node.
 * This differs from the `isPartOfTypeNode` function which determines whether a node is *part*
 * of a TypeNode.
 */
export function isTypeNode(node: Node): node is TypeNode {
    return isTypeNodeKind(node.kind);
}

export function isFunctionOrConstructorTypeNode(node: Node): node is FunctionTypeNode | ConstructorTypeNode {
    switch (node.kind) {
        case SyntaxKind.FunctionType:
        case SyntaxKind.ConstructorType:
            return true;
    }

    return false;
}

// Binding patterns

/** @internal */
export function isBindingPattern(node: Node | undefined): node is BindingPattern {
    if (node) {
        const kind = node.kind;
        return kind === SyntaxKind.ArrayBindingPattern
            || kind === SyntaxKind.ObjectBindingPattern;
    }

    return false;
}

/** @internal */
export function isAssignmentPattern(node: Node): node is AssignmentPattern {
    const kind = node.kind;
    return kind === SyntaxKind.ArrayLiteralExpression
        || kind === SyntaxKind.ObjectLiteralExpression;
}

export function isArrayBindingElement(node: Node): node is ArrayBindingElement {
    const kind = node.kind;
    return kind === SyntaxKind.BindingElement
        || kind === SyntaxKind.OmittedExpression;
}

/**
 * Determines whether the BindingOrAssignmentElement is a BindingElement-like declaration
 *
 * @internal
 */
export function isDeclarationBindingElement(bindingElement: BindingOrAssignmentElement): bindingElement is VariableDeclaration | ParameterDeclaration | BindingElement {
    switch (bindingElement.kind) {
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.Parameter:
        case SyntaxKind.BindingElement:
            return true;
    }

    return false;
}

/** @internal */
export function isBindingOrAssignmentElement(node: Node): node is BindingOrAssignmentElement {
    return isVariableDeclaration(node)
        || isParameter(node)
        || isObjectBindingOrAssignmentElement(node)
        || isArrayBindingOrAssignmentElement(node);
}

/**
 * Determines whether a node is a BindingOrAssignmentPattern
 *
 * @internal
 */
export function isBindingOrAssignmentPattern(node: BindingOrAssignmentElementTarget): node is BindingOrAssignmentPattern {
    return isObjectBindingOrAssignmentPattern(node)
        || isArrayBindingOrAssignmentPattern(node);
}

/**
 * Determines whether a node is an ObjectBindingOrAssignmentPattern
 *
 * @internal
 */
export function isObjectBindingOrAssignmentPattern(node: BindingOrAssignmentElementTarget): node is ObjectBindingOrAssignmentPattern {
    switch (node.kind) {
        case SyntaxKind.ObjectBindingPattern:
        case SyntaxKind.ObjectLiteralExpression:
            return true;
    }

    return false;
}

/** @internal */
export function isObjectBindingOrAssignmentElement(node: Node): node is ObjectBindingOrAssignmentElement {
    switch (node.kind) {
        case SyntaxKind.BindingElement:
        case SyntaxKind.PropertyAssignment: // AssignmentProperty
        case SyntaxKind.ShorthandPropertyAssignment: // AssignmentProperty
        case SyntaxKind.SpreadAssignment: // AssignmentRestProperty
            return true;
    }
    return false;
}

/**
 * Determines whether a node is an ArrayBindingOrAssignmentPattern
 *
 * @internal
 */
export function isArrayBindingOrAssignmentPattern(node: BindingOrAssignmentElementTarget): node is ArrayBindingOrAssignmentPattern {
    switch (node.kind) {
        case SyntaxKind.ArrayBindingPattern:
        case SyntaxKind.ArrayLiteralExpression:
            return true;
    }

    return false;
}

/** @internal */
export function isArrayBindingOrAssignmentElement(node: Node): node is ArrayBindingOrAssignmentElement {
    switch (node.kind) {
        case SyntaxKind.BindingElement:
        case SyntaxKind.OmittedExpression: // Elision
        case SyntaxKind.SpreadElement: // AssignmentRestElement
        case SyntaxKind.ArrayLiteralExpression: // ArrayAssignmentPattern
        case SyntaxKind.ObjectLiteralExpression: // ObjectAssignmentPattern
        case SyntaxKind.Identifier: // DestructuringAssignmentTarget
        case SyntaxKind.PropertyAccessExpression: // DestructuringAssignmentTarget
        case SyntaxKind.ElementAccessExpression: // DestructuringAssignmentTarget
            return true;
    }
    return isAssignmentExpression(node, /*excludeCompoundAssignment*/ true); // AssignmentElement
}

/** @internal */
export function isPropertyAccessOrQualifiedNameOrImportTypeNode(node: Node): node is PropertyAccessExpression | QualifiedName | ImportTypeNode {
    const kind = node.kind;
    return kind === SyntaxKind.PropertyAccessExpression
        || kind === SyntaxKind.QualifiedName
        || kind === SyntaxKind.ImportType;
}

// Expression

export function isPropertyAccessOrQualifiedName(node: Node): node is PropertyAccessExpression | QualifiedName {
    const kind = node.kind;
    return kind === SyntaxKind.PropertyAccessExpression
        || kind === SyntaxKind.QualifiedName;
}

/** @internal */
export function isCallLikeOrFunctionLikeExpression(node: Node): node is CallLikeExpression | FunctionExpression | ArrowFunction {
    return isCallLikeExpression(node) || isFunctionExpressionOrArrowFunction(node);
}

export function isCallLikeExpression(node: Node): node is CallLikeExpression {
    switch (node.kind) {
        case SyntaxKind.CallExpression:
        case SyntaxKind.NewExpression:
        case SyntaxKind.TaggedTemplateExpression:
        case SyntaxKind.Decorator:
        case SyntaxKind.JsxOpeningElement:
        case SyntaxKind.JsxSelfClosingElement:
        case SyntaxKind.JsxOpeningFragment:
            return true;
        case SyntaxKind.BinaryExpression:
            return (node as BinaryExpression).operatorToken.kind === SyntaxKind.InstanceOfKeyword;
        default:
            return false;
    }
}

export function isCallOrNewExpression(node: Node): node is CallExpression | NewExpression {
    return node.kind === SyntaxKind.CallExpression || node.kind === SyntaxKind.NewExpression;
}

export function isTemplateLiteral(node: Node): node is TemplateLiteral {
    const kind = node.kind;
    return kind === SyntaxKind.TemplateExpression
        || kind === SyntaxKind.NoSubstitutionTemplateLiteral;
}

export function isLeftHandSideExpression(node: Node): node is LeftHandSideExpression {
    return isLeftHandSideExpressionKind(skipPartiallyEmittedExpressions(node).kind);
}

function isLeftHandSideExpressionKind(kind: SyntaxKind): boolean {
    switch (kind) {
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.ElementAccessExpression:
        case SyntaxKind.NewExpression:
        case SyntaxKind.CallExpression:
        case SyntaxKind.JsxElement:
        case SyntaxKind.JsxSelfClosingElement:
        case SyntaxKind.JsxFragment:
        case SyntaxKind.TaggedTemplateExpression:
        case SyntaxKind.ArrayLiteralExpression:
        case SyntaxKind.ParenthesizedExpression:
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.ClassExpression:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.Identifier:
        case SyntaxKind.PrivateIdentifier: // technically this is only an Expression if it's in a `#field in expr` BinaryExpression
        case SyntaxKind.RegularExpressionLiteral:
        case SyntaxKind.NumericLiteral:
        case SyntaxKind.BigIntLiteral:
        case SyntaxKind.StringLiteral:
        case SyntaxKind.NoSubstitutionTemplateLiteral:
        case SyntaxKind.TemplateExpression:
        case SyntaxKind.FalseKeyword:
        case SyntaxKind.NullKeyword:
        case SyntaxKind.ThisKeyword:
        case SyntaxKind.TrueKeyword:
        case SyntaxKind.SuperKeyword:
        case SyntaxKind.NonNullExpression:
        case SyntaxKind.ExpressionWithTypeArguments:
        case SyntaxKind.MetaProperty:
        case SyntaxKind.ImportKeyword: // technically this is only an Expression if it's in a CallExpression
        case SyntaxKind.MissingDeclaration:
            return true;
        default:
            return false;
    }
}

/** @internal */
export function isUnaryExpression(node: Node): node is UnaryExpression {
    return isUnaryExpressionKind(skipPartiallyEmittedExpressions(node).kind);
}

function isUnaryExpressionKind(kind: SyntaxKind): boolean {
    switch (kind) {
        case SyntaxKind.PrefixUnaryExpression:
        case SyntaxKind.PostfixUnaryExpression:
        case SyntaxKind.DeleteExpression:
        case SyntaxKind.TypeOfExpression:
        case SyntaxKind.VoidExpression:
        case SyntaxKind.AwaitExpression:
        case SyntaxKind.TypeAssertionExpression:
            return true;
        default:
            return isLeftHandSideExpressionKind(kind);
    }
}

/** @internal */
export function isUnaryExpressionWithWrite(expr: Node): expr is PrefixUnaryExpression | PostfixUnaryExpression {
    switch (expr.kind) {
        case SyntaxKind.PostfixUnaryExpression:
            return true;
        case SyntaxKind.PrefixUnaryExpression:
            return (expr as PrefixUnaryExpression).operator === SyntaxKind.PlusPlusToken ||
                (expr as PrefixUnaryExpression).operator === SyntaxKind.MinusMinusToken;
        default:
            return false;
    }
}

export function isLiteralTypeLiteral(node: Node): node is NullLiteral | BooleanLiteral | LiteralExpression | PrefixUnaryExpression {
    switch (node.kind) {
        case SyntaxKind.NullKeyword:
        case SyntaxKind.TrueKeyword:
        case SyntaxKind.FalseKeyword:
        case SyntaxKind.PrefixUnaryExpression:
            return true;
        default:
            return isLiteralExpression(node);
    }
}

/**
 * Determines whether a node is an expression based only on its kind.
 */
export function isExpression(node: Node): node is Expression {
    return isExpressionKind(skipPartiallyEmittedExpressions(node).kind);
}

function isExpressionKind(kind: SyntaxKind): boolean {
    switch (kind) {
        case SyntaxKind.ConditionalExpression:
        case SyntaxKind.YieldExpression:
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.BinaryExpression:
        case SyntaxKind.SpreadElement:
        case SyntaxKind.AsExpression:
        case SyntaxKind.OmittedExpression:
        case SyntaxKind.CommaListExpression:
        case SyntaxKind.PartiallyEmittedExpression:
        case SyntaxKind.SatisfiesExpression:
            return true;
        default:
            return isUnaryExpressionKind(kind);
    }
}

export function isAssertionExpression(node: Node): node is AssertionExpression {
    const kind = node.kind;
    return kind === SyntaxKind.TypeAssertionExpression
        || kind === SyntaxKind.AsExpression;
}

// Statement

export function isIterationStatement(node: Node, lookInLabeledStatements: false): node is IterationStatement;
export function isIterationStatement(node: Node, lookInLabeledStatements: boolean): node is IterationStatement | LabeledStatement;
export function isIterationStatement(node: Node, lookInLabeledStatements: boolean): node is IterationStatement {
    switch (node.kind) {
        case SyntaxKind.ForStatement:
        case SyntaxKind.ForInStatement:
        case SyntaxKind.ForOfStatement:
        case SyntaxKind.DoStatement:
        case SyntaxKind.WhileStatement:
            return true;
        case SyntaxKind.LabeledStatement:
            return lookInLabeledStatements && isIterationStatement((node as LabeledStatement).statement, lookInLabeledStatements);
    }

    return false;
}

function isScopeMarker(node: Node) {
    return isExportAssignment(node) || isExportDeclaration(node);
}

/** @internal */
export function hasScopeMarker(statements: readonly Statement[]): boolean {
    return some(statements, isScopeMarker);
}

/** @internal */
export function needsScopeMarker(result: Statement): boolean {
    return !isAnyImportOrReExport(result) && !isExportAssignment(result) && !hasSyntacticModifier(result, ModifierFlags.Export) && !isAmbientModule(result);
}

/** @internal */
export function isExternalModuleIndicator(result: Statement): boolean {
    // Exported top-level member indicates moduleness
    return isAnyImportOrReExport(result) || isExportAssignment(result) || hasSyntacticModifier(result, ModifierFlags.Export);
}

/** @internal */
export function isForInOrOfStatement(node: Node): node is ForInOrOfStatement {
    return node.kind === SyntaxKind.ForInStatement || node.kind === SyntaxKind.ForOfStatement;
}

// Element

export function isConciseBody(node: Node): node is ConciseBody {
    return isBlock(node)
        || isExpression(node);
}

/** @internal */
export function isFunctionBody(node: Node): node is FunctionBody {
    return isBlock(node);
}

export function isForInitializer(node: Node): node is ForInitializer {
    return isVariableDeclarationList(node)
        || isExpression(node);
}

export function isModuleBody(node: Node): node is ModuleBody {
    const kind = node.kind;
    return kind === SyntaxKind.ModuleBlock
        || kind === SyntaxKind.ModuleDeclaration
        || kind === SyntaxKind.Identifier;
}

/** @internal @knipignore */
export function isNamespaceBody(node: Node): node is NamespaceBody {
    const kind = node.kind;
    return kind === SyntaxKind.ModuleBlock
        || kind === SyntaxKind.ModuleDeclaration;
}

/** @internal @knipignore */
export function isJSDocNamespaceBody(node: Node): node is JSDocNamespaceBody {
    const kind = node.kind;
    return kind === SyntaxKind.Identifier
        || kind === SyntaxKind.ModuleDeclaration;
}

export function isNamedImportBindings(node: Node): node is NamedImportBindings {
    const kind = node.kind;
    return kind === SyntaxKind.NamedImports
        || kind === SyntaxKind.NamespaceImport;
}

/** @internal */
export function isModuleOrEnumDeclaration(node: Node): node is ModuleDeclaration | EnumDeclaration {
    return node.kind === SyntaxKind.ModuleDeclaration || node.kind === SyntaxKind.EnumDeclaration;
}

/** @internal */
export function canHaveSymbol(node: Node): node is Declaration {
    // NOTE: This should cover all possible declarations except MissingDeclaration and SemicolonClassElement
    //       since they aren't actually declarations and can't have a symbol.
    switch (node.kind) {
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.BinaryExpression:
        case SyntaxKind.BindingElement:
        case SyntaxKind.CallExpression:
        case SyntaxKind.CallSignature:
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.ClassExpression:
        case SyntaxKind.ClassStaticBlockDeclaration:
        case SyntaxKind.Constructor:
        case SyntaxKind.ConstructorType:
        case SyntaxKind.ConstructSignature:
        case SyntaxKind.ElementAccessExpression:
        case SyntaxKind.EnumDeclaration:
        case SyntaxKind.EnumMember:
        case SyntaxKind.ExportAssignment:
        case SyntaxKind.ExportDeclaration:
        case SyntaxKind.ExportSpecifier:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.FunctionType:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.Identifier:
        case SyntaxKind.ImportClause:
        case SyntaxKind.ImportEqualsDeclaration:
        case SyntaxKind.ImportSpecifier:
        case SyntaxKind.IndexSignature:
        case SyntaxKind.InterfaceDeclaration:
        case SyntaxKind.JSDocCallbackTag:
        case SyntaxKind.JSDocEnumTag:
        case SyntaxKind.JSDocFunctionType:
        case SyntaxKind.JSDocParameterTag:
        case SyntaxKind.JSDocPropertyTag:
        case SyntaxKind.JSDocSignature:
        case SyntaxKind.JSDocTypedefTag:
        case SyntaxKind.JSDocTypeLiteral:
        case SyntaxKind.JsxAttribute:
        case SyntaxKind.JsxAttributes:
        case SyntaxKind.JsxSpreadAttribute:
        case SyntaxKind.MappedType:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.MethodSignature:
        case SyntaxKind.ModuleDeclaration:
        case SyntaxKind.NamedTupleMember:
        case SyntaxKind.NamespaceExport:
        case SyntaxKind.NamespaceExportDeclaration:
        case SyntaxKind.NamespaceImport:
        case SyntaxKind.NewExpression:
        case SyntaxKind.NoSubstitutionTemplateLiteral:
        case SyntaxKind.NumericLiteral:
        case SyntaxKind.ObjectLiteralExpression:
        case SyntaxKind.Parameter:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.PropertyAssignment:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertySignature:
        case SyntaxKind.SetAccessor:
        case SyntaxKind.ShorthandPropertyAssignment:
        case SyntaxKind.SourceFile:
        case SyntaxKind.SpreadAssignment:
        case SyntaxKind.StringLiteral:
        case SyntaxKind.TypeAliasDeclaration:
        case SyntaxKind.TypeLiteral:
        case SyntaxKind.TypeParameter:
        case SyntaxKind.VariableDeclaration:
            return true;
        default:
            return false;
    }
}

/** @internal */
export function canHaveLocals(node: Node): node is HasLocals {
    switch (node.kind) {
        case SyntaxKind.ArrowFunction:
        case SyntaxKind.Block:
        case SyntaxKind.CallSignature:
        case SyntaxKind.CaseBlock:
        case SyntaxKind.CatchClause:
        case SyntaxKind.ClassStaticBlockDeclaration:
        case SyntaxKind.ConditionalType:
        case SyntaxKind.Constructor:
        case SyntaxKind.ConstructorType:
        case SyntaxKind.ConstructSignature:
        case SyntaxKind.ForStatement:
        case SyntaxKind.ForInStatement:
        case SyntaxKind.ForOfStatement:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.FunctionExpression:
        case SyntaxKind.FunctionType:
        case SyntaxKind.GetAccessor:
        case SyntaxKind.IndexSignature:
        case SyntaxKind.JSDocCallbackTag:
        case SyntaxKind.JSDocEnumTag:
        case SyntaxKind.JSDocFunctionType:
        case SyntaxKind.JSDocSignature:
        case SyntaxKind.JSDocTypedefTag:
        case SyntaxKind.MappedType:
        case SyntaxKind.MethodDeclaration:
        case SyntaxKind.MethodSignature:
        case SyntaxKind.ModuleDeclaration:
        case SyntaxKind.SetAccessor:
        case SyntaxKind.SourceFile:
        case SyntaxKind.TypeAliasDeclaration:
            return true;
        default:
            return false;
    }
}

function isDeclarationKind(kind: SyntaxKind) {
    return kind === SyntaxKind.ArrowFunction
        || kind === SyntaxKind.BindingElement
        || kind === SyntaxKind.ClassDeclaration
        || kind === SyntaxKind.ClassExpression
        || kind === SyntaxKind.ClassStaticBlockDeclaration
        || kind === SyntaxKind.Constructor
        || kind === SyntaxKind.EnumDeclaration
        || kind === SyntaxKind.EnumMember
        || kind === SyntaxKind.ExportSpecifier
        || kind === SyntaxKind.FunctionDeclaration
        || kind === SyntaxKind.FunctionExpression
        || kind === SyntaxKind.GetAccessor
        || kind === SyntaxKind.ImportClause
        || kind === SyntaxKind.ImportEqualsDeclaration
        || kind === SyntaxKind.ImportSpecifier
        || kind === SyntaxKind.InterfaceDeclaration
        || kind === SyntaxKind.JsxAttribute
        || kind === SyntaxKind.MethodDeclaration
        || kind === SyntaxKind.MethodSignature
        || kind === SyntaxKind.ModuleDeclaration
        || kind === SyntaxKind.NamespaceExportDeclaration
        || kind === SyntaxKind.NamespaceImport
        || kind === SyntaxKind.NamespaceExport
        || kind === SyntaxKind.Parameter
        || kind === SyntaxKind.PropertyAssignment
        || kind === SyntaxKind.PropertyDeclaration
        || kind === SyntaxKind.PropertySignature
        || kind === SyntaxKind.SetAccessor
        || kind === SyntaxKind.ShorthandPropertyAssignment
        || kind === SyntaxKind.TypeAliasDeclaration
        || kind === SyntaxKind.TypeParameter
        || kind === SyntaxKind.VariableDeclaration
        || kind === SyntaxKind.JSDocTypedefTag
        || kind === SyntaxKind.JSDocCallbackTag
        || kind === SyntaxKind.JSDocPropertyTag
        || kind === SyntaxKind.NamedTupleMember;
}

function isDeclarationStatementKind(kind: SyntaxKind) {
    return kind === SyntaxKind.FunctionDeclaration
        || kind === SyntaxKind.MissingDeclaration
        || kind === SyntaxKind.ClassDeclaration
        || kind === SyntaxKind.InterfaceDeclaration
        || kind === SyntaxKind.TypeAliasDeclaration
        || kind === SyntaxKind.EnumDeclaration
        || kind === SyntaxKind.ModuleDeclaration
        || kind === SyntaxKind.ImportDeclaration
        || kind === SyntaxKind.ImportEqualsDeclaration
        || kind === SyntaxKind.ExportDeclaration
        || kind === SyntaxKind.ExportAssignment
        || kind === SyntaxKind.NamespaceExportDeclaration;
}

function isStatementKindButNotDeclarationKind(kind: SyntaxKind) {
    return kind === SyntaxKind.BreakStatement
        || kind === SyntaxKind.ContinueStatement
        || kind === SyntaxKind.DebuggerStatement
        || kind === SyntaxKind.DoStatement
        || kind === SyntaxKind.ExpressionStatement
        || kind === SyntaxKind.EmptyStatement
        || kind === SyntaxKind.ForInStatement
        || kind === SyntaxKind.ForOfStatement
        || kind === SyntaxKind.ForStatement
        || kind === SyntaxKind.IfStatement
        || kind === SyntaxKind.LabeledStatement
        || kind === SyntaxKind.ReturnStatement
        || kind === SyntaxKind.SwitchStatement
        || kind === SyntaxKind.ThrowStatement
        || kind === SyntaxKind.TryStatement
        || kind === SyntaxKind.VariableStatement
        || kind === SyntaxKind.WhileStatement
        || kind === SyntaxKind.WithStatement
        || kind === SyntaxKind.NotEmittedStatement;
}

/** @internal */
export function isDeclaration(node: Node): node is NamedDeclaration {
    if (node.kind === SyntaxKind.TypeParameter) {
        return (node.parent && node.parent.kind !== SyntaxKind.JSDocTemplateTag) || isInJSFile(node);
    }

    return isDeclarationKind(node.kind);
}

export function isDeclarationStatement(node: Node): node is DeclarationStatement {
    return isDeclarationStatementKind(node.kind);
}

/**
 * Determines whether the node is a statement that is not also a declaration
 *
 * @internal
 */
export function isStatementButNotDeclaration(node: Node): node is Statement {
    return isStatementKindButNotDeclarationKind(node.kind);
}

export function isStatement(node: Node): node is Statement {
    const kind = node.kind;
    return isStatementKindButNotDeclarationKind(kind)
        || isDeclarationStatementKind(kind)
        || isBlockStatement(node);
}

function isBlockStatement(node: Node): node is Block {
    if (node.kind !== SyntaxKind.Block) return false;
    if (node.parent !== undefined) {
        if (node.parent.kind === SyntaxKind.TryStatement || node.parent.kind === SyntaxKind.CatchClause) {
            return false;
        }
    }
    return !isFunctionBlock(node);
}

// TODO(jakebailey): should we be exporting this function and not isStatement?
/**
 * NOTE: This is similar to `isStatement` but does not access parent pointers.
 *
 * @internal
 */
export function isStatementOrBlock(node: Node): node is Statement | Block {
    const kind = node.kind;
    return isStatementKindButNotDeclarationKind(kind)
        || isDeclarationStatementKind(kind)
        || kind === SyntaxKind.Block;
}

// Module references

export function isModuleReference(node: Node): node is ModuleReference {
    const kind = node.kind;
    return kind === SyntaxKind.ExternalModuleReference
        || kind === SyntaxKind.QualifiedName
        || kind === SyntaxKind.Identifier;
}

// JSX

export function isJsxTagNameExpression(node: Node): node is JsxTagNameExpression {
    const kind = node.kind;
    return kind === SyntaxKind.ThisKeyword
        || kind === SyntaxKind.Identifier
        || kind === SyntaxKind.PropertyAccessExpression
        || kind === SyntaxKind.JsxNamespacedName;
}

export function isJsxChild(node: Node): node is JsxChild {
    const kind = node.kind;
    return kind === SyntaxKind.JsxElement
        || kind === SyntaxKind.JsxExpression
        || kind === SyntaxKind.JsxSelfClosingElement
        || kind === SyntaxKind.JsxText
        || kind === SyntaxKind.JsxFragment;
}

export function isJsxAttributeLike(node: Node): node is JsxAttributeLike {
    const kind = node.kind;
    return kind === SyntaxKind.JsxAttribute
        || kind === SyntaxKind.JsxSpreadAttribute;
}

export function isStringLiteralOrJsxExpression(node: Node): node is StringLiteral | JsxExpression {
    const kind = node.kind;
    return kind === SyntaxKind.StringLiteral
        || kind === SyntaxKind.JsxExpression;
}

export function isJsxOpeningLikeElement(node: Node): node is JsxOpeningLikeElement {
    const kind = node.kind;
    return kind === SyntaxKind.JsxOpeningElement
        || kind === SyntaxKind.JsxSelfClosingElement;
}

export function isJsxCallLike(node: Node): node is JsxCallLike {
    const kind = node.kind;
    return kind === SyntaxKind.JsxOpeningElement
        || kind === SyntaxKind.JsxSelfClosingElement
        || kind === SyntaxKind.JsxOpeningFragment;
}

// Clauses

export function isCaseOrDefaultClause(node: Node): node is CaseOrDefaultClause {
    const kind = node.kind;
    return kind === SyntaxKind.CaseClause
        || kind === SyntaxKind.DefaultClause;
}

// JSDoc

/**
 * True if node is of some JSDoc syntax kind.
 *
 * @internal
 */
export function isJSDocNode(node: Node): boolean {
    return node.kind >= SyntaxKind.FirstJSDocNode && node.kind <= SyntaxKind.LastJSDocNode;
}

/** True if node is of a kind that may contain comment text. */
export function isJSDocCommentContainingNode(node: Node): boolean {
    return node.kind === SyntaxKind.JSDoc
        || node.kind === SyntaxKind.JSDocNamepathType
        || node.kind === SyntaxKind.JSDocText
        || isJSDocLinkLike(node)
        || isJSDocTag(node)
        || isJSDocTypeLiteral(node)
        || isJSDocSignature(node);
}

// TODO: determine what this does before making it public.
/** @internal */
export function isJSDocTag(node: Node): node is JSDocTag {
    return node.kind >= SyntaxKind.FirstJSDocTagNode && node.kind <= SyntaxKind.LastJSDocTagNode;
}

export function isSetAccessor(node: Node): node is SetAccessorDeclaration {
    return node.kind === SyntaxKind.SetAccessor;
}

export function isGetAccessor(node: Node): node is GetAccessorDeclaration {
    return node.kind === SyntaxKind.GetAccessor;
}

/**
 * True if has jsdoc nodes attached to it.
 *
 * @internal
 */
// TODO: GH#19856 Would like to return `node is Node & { jsDoc: JSDoc[] }` but it causes long compile times
export function hasJSDocNodes(node: Node): node is HasJSDoc {
    if (!canHaveJSDoc(node)) return false;

    const { jsDoc } = node as JSDocContainer;
    return !!jsDoc && jsDoc.length > 0;
}

/**
 * True if has type node attached to it.
 *
 * @internal
 */
export function hasType(node: Node): node is HasType {
    return !!(node as HasType).type;
}

/**
 * True if has initializer node attached to it.
 *
 * @internal
 */
export function hasInitializer(node: Node): node is HasInitializer {
    return !!(node as HasInitializer).initializer;
}

/** True if has initializer node attached to it. */
export function hasOnlyExpressionInitializer(node: Node): node is HasExpressionInitializer {
    switch (node.kind) {
        case SyntaxKind.VariableDeclaration:
        case SyntaxKind.Parameter:
        case SyntaxKind.BindingElement:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertyAssignment:
        case SyntaxKind.EnumMember:
            return true;
        default:
            return false;
    }
}

export function isObjectLiteralElement(node: Node): node is ObjectLiteralElement {
    return node.kind === SyntaxKind.JsxAttribute || node.kind === SyntaxKind.JsxSpreadAttribute || isObjectLiteralElementLike(node);
}

/** @internal */
export function isTypeReferenceType(node: Node): node is TypeReferenceType {
    return node.kind === SyntaxKind.TypeReference || node.kind === SyntaxKind.ExpressionWithTypeArguments;
}

const MAX_SMI_X86 = 0x3fff_ffff;
/** @internal */
export function guessIndentation(lines: string[]): number | undefined {
    let indentation = MAX_SMI_X86;
    for (const line of lines) {
        if (!line.length) {
            continue;
        }
        let i = 0;
        for (; i < line.length && i < indentation; i++) {
            if (!isWhiteSpaceLike(line.charCodeAt(i))) {
                break;
            }
        }
        if (i < indentation) {
            indentation = i;
        }
        if (indentation === 0) {
            return 0;
        }
    }
    return indentation === MAX_SMI_X86 ? undefined : indentation;
}

export function isStringLiteralLike(node: Node | FileReference): node is StringLiteralLike {
    return (node as Node).kind === SyntaxKind.StringLiteral || (node as Node).kind === SyntaxKind.NoSubstitutionTemplateLiteral;
}

export function isJSDocLinkLike(node: Node): node is JSDocLink | JSDocLinkCode | JSDocLinkPlain {
    return node.kind === SyntaxKind.JSDocLink || node.kind === SyntaxKind.JSDocLinkCode || node.kind === SyntaxKind.JSDocLinkPlain;
}

export function hasRestParameter(s: SignatureDeclaration | JSDocSignature): boolean {
    const last = lastOrUndefined<ParameterDeclaration | JSDocParameterTag>(s.parameters);
    return !!last && isRestParameter(last);
}

export function isRestParameter(node: ParameterDeclaration | JSDocParameterTag): boolean {
    const type = isJSDocParameterTag(node) ? (node.typeExpression && node.typeExpression.type) : node.type;
    return (node as ParameterDeclaration).dotDotDotToken !== undefined || !!type && type.kind === SyntaxKind.JSDocVariadicType;
}

function hasInternalAnnotation(range: CommentRange, sourceFile: SourceFile) {
    const comment = sourceFile.text.substring(range.pos, range.end);
    return comment.includes("@internal");
}

export function isInternalDeclaration(node: Node, sourceFile?: SourceFile): boolean {
    sourceFile ??= getSourceFileOfNode(node);
    const parseTreeNode = getParseTreeNode(node);
    if (parseTreeNode && parseTreeNode.kind === SyntaxKind.Parameter) {
        const paramIdx = (parseTreeNode.parent as SignatureDeclaration).parameters.indexOf(parseTreeNode as ParameterDeclaration);
        const previousSibling = paramIdx > 0 ? (parseTreeNode.parent as SignatureDeclaration).parameters[paramIdx - 1] : undefined;
        const text = sourceFile.text;
        const commentRanges = previousSibling
            ? concatenate(
                // to handle
                // ... parameters, /** @internal */
                // public param: string
                getTrailingCommentRanges(text, skipTrivia(text, previousSibling.end + 1, /*stopAfterLineBreak*/ false, /*stopAtComments*/ true)),
                getLeadingCommentRanges(text, node.pos),
            )
            : getTrailingCommentRanges(text, skipTrivia(text, node.pos, /*stopAfterLineBreak*/ false, /*stopAtComments*/ true));
        return some(commentRanges) && hasInternalAnnotation(last(commentRanges), sourceFile);
    }
    const leadingCommentRanges = parseTreeNode && getLeadingCommentRangesOfNode(parseTreeNode, sourceFile);
    return !!forEach(leadingCommentRanges, range => {
        return hasInternalAnnotation(range, sourceFile);
    });
}
