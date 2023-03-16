import { SourceFile, SyntaxKind, Node, TextSpan, DiagnosticWithLocation, DeclarationName, isPropertySignature, isBindingElement, isCallSignatureDeclaration, isConstructorDeclaration, isConstructSignatureDeclaration, isExpressionWithTypeArguments, isFunctionDeclaration, isGetAccessor, isImportEqualsDeclaration, isIndexSignatureDeclaration, isMethodDeclaration, isMethodSignature, isParameter, isPropertyAccessExpression, isPropertyDeclaration, isSetAccessor, isTypeAliasDeclaration, isTypeParameterDeclaration, isVariableDeclaration, QualifiedName, BindingElement, CallSignatureDeclaration, ConstructorDeclaration, ConstructSignatureDeclaration, ExpressionWithTypeArguments, FunctionDeclaration, GetAccessorDeclaration, ImportEqualsDeclaration, IndexSignatureDeclaration, JSDocCallbackTag, JSDocEnumTag, JSDocTypedefTag, MethodDeclaration, MethodSignature, ParameterDeclaration, PropertyAccessExpression, PropertyDeclaration, PropertySignature, SetAccessorDeclaration, TypeAliasDeclaration, TypeParameterDeclaration, VariableDeclaration, NamedDeclaration, NodeFlags, ClassLikeDeclaration, FunctionBody, ModifierFlags, getModifiers, ClassDeclaration, EnumDeclaration, InterfaceDeclaration, ModuleDeclaration, VariableStatement, ImportDeclaration, Visitor, AccessorDeclaration, SignatureDeclaration, Identifier, JSDocSignature, isJSDocSignature, getLeadingCommentRanges, Diagnostic, DiagnosticRelatedInformation, JsonSourceFile, ScriptKind, NodeFactory, Path, isModuleDeclaration, isSourceFile, Declaration, getNameOfDeclaration, isElementAccessExpression, BindingPattern, ImportTypeNode, isLiteralTypeNode, isStringLiteral, OuterExpressionKinds, Expression, isStringLiteralLike, isNumericLiteral, NumericLiteral, StringLiteralLike, getJSDocTypeTag, isParenthesizedExpression, EmitFlags, Statement, isExportAssignment, isExportDeclaration, JSDocContainer, HasJSDoc, JSDoc, Bundle, CompilerOptions, Extension, getTsBuildInfoEmitOutputFilePath, ImportCall, ExternalModuleReference, AssertClause, ModuleKind, EntityNameExpression, isIdentifier, PropertyAccessEntityNameExpression, ExportDeclaration, getJSDocAugmentsTag, HeritageClause, NodeArray, isClassElement, isClassStaticBlockDeclaration, isParseTreeNode, ModuleResolutionKind, JsxEmit, isPrefixUnaryExpression, PrefixUnaryExpression, canHaveModifiers, ModifierLike, getJSDocPublicTag, getJSDocPrivateTag, getJSDocProtectedTag, getJSDocOverrideTagNoCache, getJSDocReadonlyTag, getJSDocDeprecatedTag, ScriptTarget, FileExtensionInfo, EntityNameOrEntityNameExpression, isHeritageClause, CallExpression, FunctionLikeDeclaration, HasType, JSDocTemplateTag, TypeAssertion, TsConfigSourceFile, PrinterOptions, NewLineKind, sys, isVariableStatement, isLineBreak, isWhiteSpaceLike, identifierToKeywordKind } from "typescript";
import { Debug } from "./debug";
import { Diagnostics } from "./diagnosticInformationMap.generated";
import { clone, Comparison, contains, emptyArray, find, flatten, identity, isArray, length, mapDefined, Mutable, some, startsWith, stringContains } from "./lang-utils";
import { combinePaths, comparePaths, ensureTrailingDirectorySeparator, fileExtensionIs, fileExtensionIsOneOf, getNormalizedAbsolutePath, pathIsRelative, removeFileExtension } from "./path-utils";
import { AmbientModuleDeclaration, AnyImportOrReExport, CharacterCodes, DynamicNamedBinaryExpression, DynamicNamedDeclaration, EmitFileNames, EmitHost, EmitNode, EmitResolver, GetCanonicalFileName, GetSymbolAccessibilityDiagnostic, JSDocTypeAssertion, LiteralImportTypeNode, ModuleSpecifierResolutionHost, OuterExpression, ResolveModuleNameResolutionHost, SymbolAccessibility, SymbolAccessibilityDiagnostic, SymbolAccessibilityResult } from "./types";


export function getErrorSpanForNode(sourceFile: SourceFile, node: Node): TextSpan {
    return {
        start: node.pos,
        length: node.end - node.pos
    }
}

export function createDiagnosticForNode(node: Node, message: DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number, arg3?: string | number): DiagnosticWithLocation {
    const sourceFile = getSourceFileOfNode(node);
    return createDiagnosticForNodeInSourceFile(sourceFile, node, message, arg0, arg1, arg2, arg3);
}

/** @internal */
export function createDiagnosticForNodeInSourceFile(sourceFile: SourceFile, node: Node, message: DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number, arg3?: string | number): DiagnosticWithLocation {
    const span = getErrorSpanForNode(sourceFile, node);
    return createFileDiagnostic(sourceFile, span.start, span.length, message, arg0, arg1, arg2, arg3);
}

/** @internal */
export function addRelatedInfo<T extends Diagnostic>(diagnostic: T, ...relatedInformation: DiagnosticRelatedInformation[]): T {
    if (!relatedInformation.length) {
        return diagnostic;
    }
    if (!diagnostic.relatedInformation) {
        diagnostic.relatedInformation = [];
    }
    Debug.assert(diagnostic.relatedInformation !== emptyArray, "Diagnostic had empty array singleton for related info, but is still being constructed!");
    diagnostic.relatedInformation.push(...relatedInformation);
    return diagnostic;
}

export interface DiagnosticMessage {
    key: string;
    category: DiagnosticCategory;
    code: number;
    message: string;
    reportsUnnecessary?: {};
    reportsDeprecated?: {};
    /** @internal */
    elidedInCompatabilityPyramid?: boolean;
}

export enum DiagnosticCategory {
    Warning,
    Error,
    Suggestion,
    Message
}


/** @internal */
export function hasStaticModifier(node: Node): boolean {
    return hasSyntacticModifier(node, ModifierFlags.Static);
}

/** @internal */
export function isStatic(node: Node) {
    // https://tc39.es/ecma262/#sec-static-semantics-isstatic
    return isClassElement(node) && hasStaticModifier(node) || isClassStaticBlockDeclaration(node);
}

/** @internal */
export function createGetSymbolAccessibilityDiagnosticForNodeName(node: DeclarationDiagnosticProducing) {
    if (isSetAccessor(node) || isGetAccessor(node)) {
        return getAccessorNameVisibilityError;
    }
    else if (isMethodSignature(node) || isMethodDeclaration(node)) {
        return getMethodNameVisibilityError;
    }
    else {
        return createGetSymbolAccessibilityDiagnosticForNode(node);
    }
    function getAccessorNameVisibilityError(symbolAccessibilityResult: SymbolAccessibilityResult) {
        const diagnosticMessage = getAccessorNameVisibilityDiagnosticMessage(symbolAccessibilityResult);
        return diagnosticMessage !== undefined ? {
            diagnosticMessage,
            errorNode: node,
            typeName: (node as NamedDeclaration).name
        } : undefined;
    }

    function getAccessorNameVisibilityDiagnosticMessage(symbolAccessibilityResult: SymbolAccessibilityResult) {
        if (isStatic(node)) {
            return symbolAccessibilityResult.errorModuleName ?
                symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                    Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                    Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2 :
                Diagnostics.Public_static_property_0_of_exported_class_has_or_is_using_private_name_1;
        }
        else if (node.parent.kind === SyntaxKind.ClassDeclaration) {
            return symbolAccessibilityResult.errorModuleName ?
                symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                    Diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                    Diagnostics.Public_property_0_of_exported_class_has_or_is_using_name_1_from_private_module_2 :
                Diagnostics.Public_property_0_of_exported_class_has_or_is_using_private_name_1;
        }
        else {
            return symbolAccessibilityResult.errorModuleName ?
                Diagnostics.Property_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                Diagnostics.Property_0_of_exported_interface_has_or_is_using_private_name_1;
        }
    }

    function getMethodNameVisibilityError(symbolAccessibilityResult: SymbolAccessibilityResult): SymbolAccessibilityDiagnostic | undefined {
        const diagnosticMessage = getMethodNameVisibilityDiagnosticMessage(symbolAccessibilityResult);
        return diagnosticMessage !== undefined ? {
            diagnosticMessage,
            errorNode: node,
            typeName: (node as NamedDeclaration).name
        } : undefined;
    }

    function getMethodNameVisibilityDiagnosticMessage(symbolAccessibilityResult: SymbolAccessibilityResult) {
        if (isStatic(node)) {
            return symbolAccessibilityResult.errorModuleName ?
                symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                    Diagnostics.Public_static_method_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                    Diagnostics.Public_static_method_0_of_exported_class_has_or_is_using_name_1_from_private_module_2 :
                Diagnostics.Public_static_method_0_of_exported_class_has_or_is_using_private_name_1;
        }
        else if (node.parent.kind === SyntaxKind.ClassDeclaration) {
            return symbolAccessibilityResult.errorModuleName ?
                symbolAccessibilityResult.accessibility === SymbolAccessibility.CannotBeNamed ?
                    Diagnostics.Public_method_0_of_exported_class_has_or_is_using_name_1_from_external_module_2_but_cannot_be_named :
                    Diagnostics.Public_method_0_of_exported_class_has_or_is_using_name_1_from_private_module_2 :
                Diagnostics.Public_method_0_of_exported_class_has_or_is_using_private_name_1;
        }
        else {
            return symbolAccessibilityResult.errorModuleName ?
                Diagnostics.Method_0_of_exported_interface_has_or_is_using_name_1_from_private_module_2 :
                Diagnostics.Method_0_of_exported_interface_has_or_is_using_private_name_1;
        }
    }
}

/** @internal */
export function getSourceFileOfNode(node: Node): SourceFile;
/** @internal */
export function getSourceFileOfNode(node: Node | undefined): SourceFile | undefined;
/** @internal */
export function getSourceFileOfNode(node: Node | undefined ): SourceFile | undefined {
    while (node && node.kind !== SyntaxKind.SourceFile) {
        node = node.parent;
    }
    return node as SourceFile;
}


/** @internal */
export function createFileDiagnostic(file: SourceFile, start: number, length: number, message: DiagnosticMessage, ...args: (string | number | undefined)[]): DiagnosticWithLocation;
/** @internal */
export function createFileDiagnostic(file: SourceFile, start: number, length: number, message: DiagnosticMessage): DiagnosticWithLocation {
    
    let text= message.message;
    if (arguments.length > 4) {
        text = formatStringFromArgs(text, arguments, 4);
    }

    return {
        file,
        start,
        length,

        messageText: text,
        category: message.category,
        code: message.code,
        reportsUnnecessary: message.reportsUnnecessary,
        reportsDeprecated: message.reportsDeprecated
    };
}


/** @internal */
export function formatStringFromArgs(text: string, args: ArrayLike<string | number>, baseIndex = 0): string {
    return text.replace(/{(\d+)}/g, (_match, index: string) => "" + args[+index + baseIndex]);
}
export function declarationNameToString(name: DeclarationName | QualifiedName | undefined) {
    return !name || getFullWidth(name) === 0 ? "(Missing)" : getTextOfNode(name);
}


/** @internal */
export function getTextOfNode(node: Node, includeTrivia = false): string {
    return getSourceTextOfNodeFromSourceFile(getSourceFileOfNode(node), node, includeTrivia);
}

/** @internal */
export function getSourceTextOfNodeFromSourceFile(sourceFile: SourceFile, node: Node, includeTrivia = false): string {
    return getTextOfNodeFromSourceText(sourceFile.text, node, includeTrivia);
}


/** @internal */
export function getTextOfNodeFromSourceText(sourceText: string, node: Node, includeTrivia = false): string {
    let text = sourceText.substring(node.pos, node.end);
    return text;
}
/** @internal */
export function getFullWidth(node: Node) {
    return node.end - node.pos;
}

/** @internal */
export function canProduceDiagnostics(node: Node): node is DeclarationDiagnosticProducing {
    return isVariableDeclaration(node) ||
        isPropertyDeclaration(node) ||
        isPropertySignature(node) ||
        isBindingElement(node) ||
        isSetAccessor(node) ||
        isGetAccessor(node) ||
        isConstructSignatureDeclaration(node) ||
        isCallSignatureDeclaration(node) ||
        isMethodDeclaration(node) ||
        isMethodSignature(node) ||
        isFunctionDeclaration(node) ||
        isParameter(node) ||
        isTypeParameterDeclaration(node) ||
        isExpressionWithTypeArguments(node) ||
        isImportEqualsDeclaration(node) ||
        isTypeAliasDeclaration(node) ||
        isConstructorDeclaration(node) ||
        isIndexSignatureDeclaration(node) ||
        isPropertyAccessExpression(node) ||
        isJSDocTypeAlias(node);
}



export function isJSDocTypeAlias(node: Node): node is JSDocTypedefTag | JSDocCallbackTag | JSDocEnumTag {
    return node.kind === SyntaxKind.JSDocTypedefTag || node.kind === SyntaxKind.JSDocCallbackTag || node.kind === SyntaxKind.JSDocEnumTag;
}

export type DeclarationDiagnosticProducing =
    | VariableDeclaration
    | PropertyDeclaration
    | PropertySignature
    | BindingElement
    | SetAccessorDeclaration
    | GetAccessorDeclaration
    | ConstructSignatureDeclaration
    | CallSignatureDeclaration
    | MethodDeclaration
    | MethodSignature
    | FunctionDeclaration
    | ParameterDeclaration
    | TypeParameterDeclaration
    | ExpressionWithTypeArguments
    | ImportEqualsDeclaration
    | TypeAliasDeclaration
    | ConstructorDeclaration
    | IndexSignatureDeclaration
    | PropertyAccessExpression
    | JSDocTypedefTag
    | JSDocCallbackTag
    | JSDocEnumTag;



/** @internal */
export function isDeclaration(node: Node): node is NamedDeclaration {
    if (node.kind === SyntaxKind.TypeParameter) {
        return (node.parent && node.parent.kind !== SyntaxKind.JSDocTemplateTag) || isInJSFile(node);
    }

    return isDeclarationKind(node.kind);
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
        || kind === SyntaxKind.JSDocPropertyTag;
}


/**
 * Bypasses immutability and directly sets the `parent` property of a `Node`.
 *
 * @internal
 */
 export function setParent<T extends Node>(child: T, parent: T["parent"] | undefined): T;
 /** @internal */
 export function setParent<T extends Node>(child: T | undefined, parent: T["parent"] | undefined): T | undefined;
 /** @internal */
 export function setParent<T extends Node>(child: T | undefined, parent: T["parent"] | undefined): T | undefined {
     if (child && parent) {
         (child as Mutable<T>).parent = parent;
     }
     return child;
 }

/** @internal */
export function isInJSFile(node: Node | undefined): boolean {
    return !!node && !!(node.flags & NodeFlags.JavaScriptFile);
}
 

/** @internal */
export function getFirstConstructorWithBody(node: ClassLikeDeclaration): ConstructorDeclaration & { body: FunctionBody } | undefined {
    return find(node.members, (member): member is ConstructorDeclaration & { body: FunctionBody } => isConstructorDeclaration(member) && nodeIsPresent(member.body));
}

// Returns true if this node is missing from the actual source code. A 'missing' node is different
// from 'undefined/defined'. When a node is undefined (which can happen for optional nodes
// in the tree), it is definitely missing. However, a node may be defined, but still be
// missing.  This happens whenever the parser knows it needs to parse something, but can't
// get anything in the source code that it expects at that location. For example:
//
//          let a: ;
//
// Here, the Type in the Type-Annotation is not-optional (as there is a colon in the source
// code). So the parser will attempt to parse out a type, and will create an actual node.
// However, this node will be 'missing' in the sense that no actual source-code/tokens are
// contained within it.
/** @internal */
export function nodeIsMissing(node: Node | undefined): boolean {
    if (node === undefined) {
        return true;
    }

    return node.pos === node.end && node.pos >= 0 && node.kind !== SyntaxKind.EndOfFileToken;
}

/** @internal */
export function nodeIsPresent(node: Node | undefined): boolean {
    return !nodeIsMissing(node);
}



/** @internal */
export function hasSyntacticModifier(node: Node, flags: ModifierFlags): boolean {
    return !!getSelectedSyntacticModifierFlags(node, flags);
}

/** @internal */
export function getSelectedSyntacticModifierFlags(node: Node, flags: ModifierFlags): ModifierFlags {
    return getSyntacticModifierFlags(node) & flags;
}

/**
 * Gets the effective ModifierFlags for the provided node, including JSDoc modifiers. The modifiers will be cached on the node to improve performance.
 *
 * NOTE: This function may use `parent` pointers.
 *
 * @internal
 */
export function getEffectiveModifierFlags(node: Node): ModifierFlags {
    return getModifierFlagsWorker(node, /*includeJSDoc*/ true);
}

/** @internal */
export function getEffectiveModifierFlagsAlwaysIncludeJSDoc(node: Node): ModifierFlags {
    return getModifierFlagsWorker(node, /*includeJSDOc*/ true, /*alwaysIncludeJSDOc*/ true);
}

/**
 * Gets the ModifierFlags for syntactic modifiers on the provided node. The modifiers will be cached on the node to improve performance.
 *
 * NOTE: This function does not use `parent` pointers and will not include modifiers from JSDoc.
 *
 * @internal
 */
 export function getSyntacticModifierFlags(node: Node): ModifierFlags {
    return getModifierFlagsWorker(node, /*includeJSDoc*/ false);
}


function getModifierFlagsWorker(node: Node, includeJSDoc: boolean, alwaysIncludeJSDoc?: boolean): ModifierFlags {
    if (node.kind >= SyntaxKind.FirstToken && node.kind <= SyntaxKind.LastToken) {
        return ModifierFlags.None;
    }

    if (!(node.modifierFlagsCache & ModifierFlags.HasComputedFlags)) {
        node.modifierFlagsCache = getSyntacticModifierFlagsNoCache(node) | ModifierFlags.HasComputedFlags;
    }

    if (includeJSDoc && !(node.modifierFlagsCache & ModifierFlags.HasComputedJSDocModifiers) && (alwaysIncludeJSDoc || isInJSFile(node)) && node.parent) {
        node.modifierFlagsCache |= getJSDocModifierFlagsNoCache(node) | ModifierFlags.HasComputedJSDocModifiers;
    }

    return node.modifierFlagsCache & ~(ModifierFlags.HasComputedFlags | ModifierFlags.HasComputedJSDocModifiers);
}


function getJSDocModifierFlagsNoCache(node: Node): ModifierFlags {
    let flags = ModifierFlags.None;
    if (!!node.parent && !isParameter(node)) {
        if (isInJSFile(node)) {
            if (getJSDocPublicTag(node)) flags |= ModifierFlags.Public;
            if (getJSDocPrivateTag(node)) flags |= ModifierFlags.Private;
            if (getJSDocProtectedTag(node)) flags |= ModifierFlags.Protected;
            if (getJSDocReadonlyTag(node)) flags |= ModifierFlags.Readonly;
            if (getJSDocOverrideTagNoCache(node)) flags |= ModifierFlags.Override;
        }
        if (getJSDocDeprecatedTag(node)) flags |= ModifierFlags.Deprecated;
    }

    return flags;
}

/**
 * Gets the ModifierFlags for syntactic modifiers on the provided node. The modifier flags cache on the node is ignored.
 *
 * NOTE: This function does not use `parent` pointers and will not include modifiers from JSDoc.
 *
 * @internal
 */
 export function getSyntacticModifierFlagsNoCache(node: Node): ModifierFlags {
    let flags = canHaveModifiers(node) ? modifiersToFlags(node.modifiers) : ModifierFlags.None;
    if (node.flags & NodeFlags.NestedNamespace || (node.kind === SyntaxKind.Identifier && (node as Identifier).isInJSDocNamespace)) {
        flags |= ModifierFlags.Export;
    }
    return flags;
}

/** @internal */
export function modifiersToFlags(modifiers: readonly ModifierLike[] | undefined) {
    let flags = ModifierFlags.None;
    if (modifiers) {
        for (const modifier of modifiers) {
            flags |= modifierToFlag(modifier.kind);
        }
    }
    return flags;
}

/** @internal */
export function modifierToFlag(token: SyntaxKind): ModifierFlags {
    switch (token) {
        case SyntaxKind.StaticKeyword: return ModifierFlags.Static;
        case SyntaxKind.PublicKeyword: return ModifierFlags.Public;
        case SyntaxKind.ProtectedKeyword: return ModifierFlags.Protected;
        case SyntaxKind.PrivateKeyword: return ModifierFlags.Private;
        case SyntaxKind.AbstractKeyword: return ModifierFlags.Abstract;
        case SyntaxKind.AccessorKeyword: return ModifierFlags.Accessor;
        case SyntaxKind.ExportKeyword: return ModifierFlags.Export;
        case SyntaxKind.DeclareKeyword: return ModifierFlags.Ambient;
        case SyntaxKind.ConstKeyword: return ModifierFlags.Const;
        case SyntaxKind.DefaultKeyword: return ModifierFlags.Default;
        case SyntaxKind.AsyncKeyword: return ModifierFlags.Async;
        case SyntaxKind.ReadonlyKeyword: return ModifierFlags.Readonly;
        case SyntaxKind.OverrideKeyword: return ModifierFlags.Override;
        case SyntaxKind.InKeyword: return ModifierFlags.In;
        case SyntaxKind.OutKeyword: return ModifierFlags.Out;
        case SyntaxKind.Decorator: return ModifierFlags.Decorator;
    }
    return ModifierFlags.None;
}

/** @internal */
export type AnyImportSyntax = ImportDeclaration | ImportEqualsDeclaration;

/** @internal */
export type LateVisibilityPaintedStatement =
    | AnyImportSyntax
    | VariableStatement
    | ClassDeclaration
    | FunctionDeclaration
    | ModuleDeclaration
    | TypeAliasDeclaration
    | InterfaceDeclaration
    | EnumDeclaration;


/** @internal */
export function visitArray<T extends Node, U extends T>(nodes: T[] | undefined, visitor: Visitor, test: (node: Node) => node is U, start?: number, count?: number): U[] | undefined;
/** @internal */
export function visitArray<T extends Node, U extends T>(nodes: readonly T[] | undefined, visitor: Visitor, test: (node: Node) => node is U, start?: number, count?: number): readonly U[] | undefined;
/** @internal */
export function visitArray<T extends Node>(nodes: T[] | undefined, visitor: Visitor, test: (node: Node) => node is T, start?: number, count?: number): T[] | undefined;
/** @internal */
export function visitArray<T extends Node>(nodes: readonly T[] | undefined, visitor: Visitor, test: (node: Node) => node is T, start?: number, count?: number): readonly T[] | undefined;
export function visitArray<T extends Node, U extends T>(nodes: readonly T[] | undefined, visitor: Visitor, test: (node: Node) => node is U, start?: number, count?: number) {
    if (nodes === undefined) {
        return nodes;
    }

    // Ensure start and count have valid values
    const length = nodes.length;
    if (start === undefined || start < 0) {
        start = 0;
    }

    if (count === undefined || count > length - start) {
        count = length - start;
    }

    return visitArrayWorker(nodes, visitor, test, start, count) as readonly U[];
}



/** @internal */
function visitArrayWorker<T extends Node>(nodes: readonly T[], visitor: Visitor, test: ((node: Node) => boolean) | undefined, start: number, count: number): readonly T[] | undefined {
    let updated: T[] | undefined;

    const length = nodes.length;
    if (start > 0 || count < length) {
        // If we are not visiting all of the original nodes, we must always create a new array.
        updated = [];
    }

    // Visit each original node.
    for (let i = 0; i < count; i++) {
        const node: T = nodes[i + start];
        const visited = node !== undefined ? visitor(node) : undefined;
        if (updated !== undefined || visited === undefined || visited !== node) {
            if (updated === undefined) {
                // Ensure we have a copy of `nodes`, up to the current index.
                updated = nodes.slice(0, i);
            }
            if (visited) {
                if (isArray(visited)) {
                    for (const visitedNode of visited) {
                        void Debug.assertNode(visitedNode, test);
                        updated.push(visitedNode as T);
                    }
                }
                else {
                    void Debug.assertNode(visited, test);
                    updated.push(visited as T);
                }
            }
        }
    }

    return updated ?? nodes;
}

/** @internal */
export interface AllAccessorDeclarations {
    firstAccessor: AccessorDeclaration;
    secondAccessor: AccessorDeclaration | undefined;
    getAccessor: GetAccessorDeclaration | undefined;
    setAccessor: SetAccessorDeclaration | undefined;
}

/** @internal */
export function getThisParameter(signature: SignatureDeclaration | JSDocSignature): ParameterDeclaration | undefined {
    // callback tags do not currently support this parameters
    if (signature.parameters.length && !isJSDocSignature(signature)) {
        const thisParameter = signature.parameters[0];
        if (parameterIsThisKeyword(thisParameter)) {
            return thisParameter;
        }
    }
}

/** @internal */
export function parameterIsThisKeyword(parameter: ParameterDeclaration): boolean {
    return isThisIdentifier(parameter.name);
}

/** @internal */
export function isThisIdentifier(node: Node | undefined): boolean {
    return !!node && node.kind === SyntaxKind.Identifier && identifierIsThisKeyword(node as Identifier);
}


/** @internal */
export function identifierIsThisKeyword(id: Identifier): boolean {
    return id.originalKeywordKind === SyntaxKind.ThisKeyword;
}


/** @internal */
export function positionIsSynthesized(pos: number): boolean {
    // This is a fast way of testing the following conditions:
    //  pos === undefined || pos === null || isNaN(pos) || pos < 0;
    return !(pos >= 0);
}

/** @internal */
export function skipTrivia(text: string, pos: number, stopAfterLineBreak?: boolean, stopAtComments?: boolean, inJSDoc?: boolean): number {
    if (positionIsSynthesized(pos)) {
        return pos;
    }

    let canConsumeStar = false;
    // Keep in sync with couldStartTrivia
    while (true) {
        const ch = text.charCodeAt(pos);
        switch (ch) {
            case CharacterCodes.carriageReturn:
                if (text.charCodeAt(pos + 1) === CharacterCodes.lineFeed) {
                    pos++;
                }
            // falls through
            case CharacterCodes.lineFeed:
                pos++;
                if (stopAfterLineBreak) {
                    return pos;
                }
                canConsumeStar = !!inJSDoc;
                continue;
            case CharacterCodes.tab:
            case CharacterCodes.verticalTab:
            case CharacterCodes.formFeed:
            case CharacterCodes.space:
                pos++;
                continue;
            case CharacterCodes.slash:
                if (stopAtComments) {
                    break;
                }
                if (text.charCodeAt(pos + 1) === CharacterCodes.slash) {
                    pos += 2;
                    while (pos < text.length) {
                        if (isLineBreak(text.charCodeAt(pos))) {
                            break;
                        }
                        pos++;
                    }
                    canConsumeStar = false;
                    continue;
                }
                if (text.charCodeAt(pos + 1) === CharacterCodes.asterisk) {
                    pos += 2;
                    while (pos < text.length) {
                        if (text.charCodeAt(pos) === CharacterCodes.asterisk && text.charCodeAt(pos + 1) === CharacterCodes.slash) {
                            pos += 2;
                            break;
                        }
                        pos++;
                    }
                    canConsumeStar = false;
                    continue;
                }
                break;

            case CharacterCodes.lessThan:
            case CharacterCodes.bar:
            case CharacterCodes.equals:
            case CharacterCodes.greaterThan:
                if (isConflictMarkerTrivia(text, pos)) {
                    pos = scanConflictMarkerTrivia(text, pos);
                    canConsumeStar = false;
                    continue;
                }
                break;

            case CharacterCodes.hash:
                if (pos === 0 && isShebangTrivia(text, pos)) {
                    pos = scanShebangTrivia(text, pos);
                    canConsumeStar = false;
                    continue;
                }
                break;

            case CharacterCodes.asterisk:
                if (canConsumeStar) {
                    pos++;
                    canConsumeStar = false;
                    continue;
                }
                break;

            default:
                if (ch > CharacterCodes.maxAsciiCharacter && (isWhiteSpaceLike(ch))) {
                    pos++;
                    continue;
                }
                break;
        }
        return pos;
    }
}
// All conflict markers consist of the same character repeated seven times.  If it is
// a <<<<<<< or >>>>>>> marker then it is also followed by a space.
const mergeConflictMarkerLength = "<<<<<<<".length;

function isConflictMarkerTrivia(text: string, pos: number) {
    Debug.assert(pos >= 0);

    // Conflict markers must be at the start of a line.
    if (pos === 0 || isLineBreak(text.charCodeAt(pos - 1))) {
        const ch = text.charCodeAt(pos);

        if ((pos + mergeConflictMarkerLength) < text.length) {
            for (let i = 0; i < mergeConflictMarkerLength; i++) {
                if (text.charCodeAt(pos + i) !== ch) {
                    return false;
                }
            }

            return ch === CharacterCodes.equals ||
                text.charCodeAt(pos + mergeConflictMarkerLength) === CharacterCodes.space;
        }
    }

    return false;
}

function scanConflictMarkerTrivia(text: string, pos: number, error?: (diag: DiagnosticMessage, pos?: number, len?: number) => void) {
    if (error) {
        error(Diagnostics.Merge_conflict_marker_encountered, pos, mergeConflictMarkerLength);
    }

    const ch = text.charCodeAt(pos);
    const len = text.length;

    if (ch === CharacterCodes.lessThan || ch === CharacterCodes.greaterThan) {
        while (pos < len && !isLineBreak(text.charCodeAt(pos))) {
            pos++;
        }
    }
    else {
        Debug.assert(ch === CharacterCodes.bar || ch === CharacterCodes.equals);
        // Consume everything from the start of a ||||||| or ======= marker to the start
        // of the next ======= or >>>>>>> marker.
        while (pos < len) {
            const currentChar = text.charCodeAt(pos);
            if ((currentChar === CharacterCodes.equals || currentChar === CharacterCodes.greaterThan) && currentChar !== ch && isConflictMarkerTrivia(text, pos)) {
                break;
            }

            pos++;
        }
    }

    return pos;
}

const shebangTriviaRegex = /^#!.*/;

/** @internal */
export function isShebangTrivia(text: string, pos: number) {
    // Shebangs check must only be done at the start of the file
    Debug.assert(pos === 0);
    return shebangTriviaRegex.test(text);
}

/** @internal */
export function scanShebangTrivia(text: string, pos: number) {
    const shebang = shebangTriviaRegex.exec(text)![0];
    pos = pos + shebang.length;
    return pos;
}


/** @internal */
export function getLeadingCommentRangesOfNode(node: Node, sourceFileOfNode: SourceFile) {
    return node.kind !== SyntaxKind.JsxText ? getLeadingCommentRanges(sourceFileOfNode.text, node.pos) : undefined;
}

export function isNightly() {
    return false;
}

export function createGetSymbolAccessibilityDiagnosticForNode(node: DeclarationDiagnosticProducing): GetSymbolAccessibilityDiagnostic {
    return () => {
        debugger;
        throw new Error();
    };
}

/** @internal */
export function getOriginalNodeId(node: Node) {
    node = getOriginalNode(node);
    return node ? getNodeId(node) : 0;
}

export function getOriginalNode(node: Node): Node;
export function getOriginalNode<T extends Node>(node: Node, nodeTest: (node: Node) => node is T): T;
export function getOriginalNode(node: Node | undefined): Node | undefined;
export function getOriginalNode<T extends Node>(node: Node | undefined, nodeTest: (node: Node | undefined) => node is T): T | undefined;
export function getOriginalNode(node: Node | undefined, nodeTest?: (node: Node | undefined) => boolean): Node | undefined {
    if (node) {
        while ((node as any).original !== undefined) {
            node = (node as any).original;
        }
    }

    return !nodeTest || nodeTest(node) ? node : undefined;
}

let nextNodeId = 0;
/** @internal */
export function getNodeId(node: Node): number
export function getNodeId(node: any): number {
    if (!node.id) {
        nextNodeId++;
        node.id = nextNodeId;
    }
    return node.id;
}


/** @internal */
export function isExternalOrCommonJsModule(file: SourceFile): boolean {
    return ((file as any).externalModuleIndicator || (file as any).commonJsModuleIndicator) !== undefined;
}


/** @internal */
export function isJsonSourceFile(file: SourceFile): file is JsonSourceFile {
    return (file as any).scriptKind === ScriptKind.JSON;
}


/** @internal */
export function isSourceFileNotJson(file: SourceFile) {
    return !isJsonSourceFile(file);
}

/** @internal */
export function isSourceFileJS(file: SourceFile): boolean {
    return isInJSFile(file);
}

/** @internal */
export function getResolvedExternalModuleName(host: ResolveModuleNameResolutionHost, file: SourceFile, referenceFile?: SourceFile): string {
    if(!file.moduleName) {
        throw new Error("Not implemented");
    }
    return file.moduleName;
}


/** @internal */
export function isAnyImportSyntax(node: Node): node is AnyImportSyntax {
    switch (node.kind) {
        case SyntaxKind.ImportDeclaration:
        case SyntaxKind.ImportEqualsDeclaration:
            return true;
        default:
            return false;
    }
}

/** @internal */
export function createEmptyExports(factory: NodeFactory) {
    return factory.createExportDeclaration(/*modifiers*/ undefined, /*isTypeOnly*/ false, factory.createNamedExports([]), /*moduleSpecifier*/ undefined);
}


/** @internal */
export function isGlobalScopeAugmentation(module: ModuleDeclaration): boolean {
    return !!(module.flags & NodeFlags.GlobalAugmentation);
}

/** @internal */
export function isExternalModuleAugmentation(node: Node): node is AmbientModuleDeclaration {
    return isAmbientModule(node) && isModuleAugmentationExternal(node);
}


/** @internal */
export function isModuleAugmentationExternal(node: AmbientModuleDeclaration) {
    // external module augmentation is a ambient module declaration that is either:
    // - defined in the top level scope and source file is an external module
    // - defined inside ambient module declaration located in the top level scope and source file not an external module
    switch (node.parent.kind) {
        case SyntaxKind.SourceFile:
            return isExternalModule(node.parent);
        case SyntaxKind.ModuleBlock:
            return isAmbientModule(node.parent.parent) && isSourceFile(node.parent.parent.parent) && !isExternalModule(node.parent.parent.parent);
    }
    return false;
}

// See also `isExternalOrCommonJsModule` in utilities.ts
export function isExternalModule(file: SourceFile): boolean {
    return (file as any).externalModuleIndicator !== undefined;
}

/** @internal */
export function isAmbientModule(node: Node): node is AmbientModuleDeclaration {
    return isModuleDeclaration(node) && (node.name.kind === SyntaxKind.StringLiteral || isGlobalScopeAugmentation(node));
}


/** @internal */
export function hasEffectiveModifiers(node: Node) {
    return getEffectiveModifierFlags(node) !== ModifierFlags.None;
}

/** @internal */
export function hasSyntacticModifiers(node: Node) {
    return getSyntacticModifierFlags(node) !== ModifierFlags.None;
}

/** @internal */
export function hasEffectiveModifier(node: Node, flags: ModifierFlags): boolean {
    return !!getSelectedEffectiveModifierFlags(node, flags);
}

/** @internal */
export function getSelectedEffectiveModifierFlags(node: Node, flags: ModifierFlags): ModifierFlags {
    return getEffectiveModifierFlags(node) & flags;
}


/**
 * A declaration has a dynamic name if all of the following are true:
 *   1. The declaration has a computed property name.
 *   2. The computed name is *not* expressed as a StringLiteral.
 *   3. The computed name is *not* expressed as a NumericLiteral.
 *   4. The computed name is *not* expressed as a PlusToken or MinusToken
 *      immediately followed by a NumericLiteral.
 *
 * @internal
 */
 export function hasDynamicName(declaration: Declaration): declaration is DynamicNamedDeclaration | DynamicNamedBinaryExpression {
    const name = getNameOfDeclaration(declaration);
    return !!name && isDynamicName(name);
}

/** @internal */
export function isDynamicName(name: DeclarationName): boolean {
    if (!(name.kind === SyntaxKind.ComputedPropertyName || name.kind === SyntaxKind.ElementAccessExpression)) {
        return false;
    }
    const expr = isElementAccessExpression(name) ? skipParentheses(name.argumentExpression) : name.expression;
    return !isStringOrNumericLiteralLike(expr) &&
        !isSignedNumericLiteral(expr);
}

/** @internal */
export function isSignedNumericLiteral(node: Node): node is PrefixUnaryExpression & { operand: NumericLiteral } {
    return isPrefixUnaryExpression(node) && (node.operator === SyntaxKind.PlusToken || node.operator === SyntaxKind.MinusToken) && isNumericLiteral(node.operand);
}

/** @internal */
export function isLateVisibilityPaintedStatement(node: Node): node is LateVisibilityPaintedStatement {
    switch (node.kind) {
        case SyntaxKind.ImportDeclaration:
        case SyntaxKind.ImportEqualsDeclaration:
        case SyntaxKind.VariableStatement:
        case SyntaxKind.ClassDeclaration:
        case SyntaxKind.FunctionDeclaration:
        case SyntaxKind.ModuleDeclaration:
        case SyntaxKind.TypeAliasDeclaration:
        case SyntaxKind.InterfaceDeclaration:
        case SyntaxKind.EnumDeclaration:
            return true;
        default:
            return false;
    }
}


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
export function isLiteralImportTypeNode(n: Node): n is LiteralImportTypeNode {
    return isImportTypeNode(n) && isLiteralTypeNode(n.argument) && isStringLiteral(n.argument.literal);
}


export function isImportTypeNode(node: Node): node is ImportTypeNode {
    return node.kind === SyntaxKind.ImportType;
}


/** @internal */
export function skipParentheses(node: Expression, excludeJSDocTypeAssertions?: boolean): Expression;
/** @internal */
export function skipParentheses(node: Node, excludeJSDocTypeAssertions?: boolean): Node;
/** @internal */
export function skipParentheses(node: Node, excludeJSDocTypeAssertions?: boolean): Node {
    const flags = excludeJSDocTypeAssertions ?
        OuterExpressionKinds.Parentheses | OuterExpressionKinds.ExcludeJSDocTypeAssertion :
        OuterExpressionKinds.Parentheses;
    return skipOuterExpressions(node, flags);
}


/** @internal */
export function skipOuterExpressions(node: Expression, kinds?: OuterExpressionKinds): Expression;
/** @internal */
export function skipOuterExpressions(node: Node, kinds?: OuterExpressionKinds): Node;
/** @internal */
export function skipOuterExpressions(node: Node, kinds = OuterExpressionKinds.All) {
    while (isOuterExpression(node, kinds)) {
        node = node.expression;
    }
    return node;
}

/** @internal */
export function isLiteralComputedPropertyDeclarationName(node: Node) {
    return isStringOrNumericLiteralLike(node) &&
        node.parent.kind === SyntaxKind.ComputedPropertyName &&
        isDeclaration(node.parent.parent);
}


/** @internal */
export function isStringOrNumericLiteralLike(node: Node): node is StringLiteralLike | NumericLiteral {
    return isStringLiteralLike(node) || isNumericLiteral(node);
}


/** @internal */
export function isOuterExpression(node: Node, kinds = OuterExpressionKinds.All): node is OuterExpression {
    switch (node.kind) {
        case SyntaxKind.ParenthesizedExpression:
            if (kinds & OuterExpressionKinds.ExcludeJSDocTypeAssertion && isJSDocTypeAssertion(node)) {
                return false;
            }
            return (kinds & OuterExpressionKinds.Parentheses) !== 0;
        case SyntaxKind.TypeAssertionExpression:
        case SyntaxKind.AsExpression:
        case SyntaxKind.SatisfiesExpression:
            return (kinds & OuterExpressionKinds.TypeAssertions) !== 0;
        case SyntaxKind.NonNullExpression:
            return (kinds & OuterExpressionKinds.NonNullAssertions) !== 0;
        case SyntaxKind.PartiallyEmittedExpression:
            return (kinds & OuterExpressionKinds.PartiallyEmittedExpressions) !== 0;
    }
    return false;
}

/** @internal */
export function isJSDocTypeAssertion(node: Node): node is JSDocTypeAssertion {
    return isParenthesizedExpression(node)
        && isInJSFile(node)
        && !!getJSDocTypeTag(node);
}


/**
 * Sets `EmitFlags.NoComments` on a node and removes any leading and trailing synthetic comments.
 * @internal
 */
 export function removeAllComments<T extends Node>(node: T): T {
    const emitNode = getOrCreateEmitNode(node);
    emitNode.flags |= EmitFlags.NoComments;
    emitNode.leadingComments = undefined;
    emitNode.trailingComments = undefined;
    return node;
}


/**
 * Associates a node with the current transformation, initializing
 * various transient transformation properties.
 * @internal
 */
 export function getOrCreateEmitNode(node: Node): EmitNode {
    if (!node.emitNode) {
        if (isParseTreeNode(node)) {
            // To avoid holding onto transformation artifacts, we keep track of any
            // parse tree node we are annotating. This allows us to clean them up after
            // all transformations have completed.
            if (node.kind === SyntaxKind.SourceFile) {
                return node.emitNode = { annotatedNodes: [node] } as EmitNode;
            }

            const sourceFile = getSourceFileOfNode(getParseTreeNode(getSourceFileOfNode(node))) ?? Debug.fail("Could not determine parsed source file.");
            getOrCreateEmitNode(sourceFile).annotatedNodes!.push(node);
        }

        node.emitNode = {} as EmitNode;
    }
    else {
        Debug.assert(!(node.emitNode.flags & (EmitFlags as any).Immutable), "Invalid attempt to mutate an immutable node.");
    }
    return node.emitNode;
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


/** @internal */
export function needsScopeMarker(result: Statement) {
    return !isAnyImportOrReExport(result) && !isExportAssignment(result) && !hasSyntacticModifier(result, ModifierFlags.Export) && !isAmbientModule(result);
}


/** @internal */
export function isAnyImportOrReExport(node: Node): node is AnyImportOrReExport {
    return isAnyImportSyntax(node) || isExportDeclaration(node);
}

/**
 * True if has jsdoc nodes attached to it.
 *
 * @internal
 */
// TODO: GH#19856 Would like to return `node is Node & { jsDoc: JSDoc[] }` but it causes long compile times
export function hasJSDocNodes(node: Node): node is HasJSDoc & { jsDoc?: JSDoc[] } {
    const { jsDoc } = node as { jsDoc?: JSDoc[] };
    return !!jsDoc && jsDoc.length > 0;
}

/** @internal */
export function isExternalModuleIndicator(result: Statement) {
    // Exported top-level member indicates moduleness
    return isAnyImportOrReExport(result) || isExportAssignment(result) || hasSyntacticModifier(result, ModifierFlags.Export);
}



/** @internal */
export function getOutputPathsFor(sourceFile: SourceFile | Bundle, host: EmitHost, forceDtsPaths: boolean): EmitFileNames {
    const options = host.getCompilerOptions();
    if (sourceFile.kind === SyntaxKind.Bundle) {
        return getOutputPathsForBundle(options, forceDtsPaths);
    }
    else {
        const ownOutputFilePath = getOwnEmitOutputFilePath(sourceFile.fileName, host, getOutputExtension(sourceFile.fileName, options));
        const isJsonFile = isJsonSourceFile(sourceFile);
        // If json file emits to the same location skip writing it, if emitDeclarationOnly skip writing it
        const isJsonEmittedToSameLocation = isJsonFile &&
            comparePaths(sourceFile.fileName, ownOutputFilePath, host.getCurrentDirectory(), !host.useCaseSensitiveFileNames?.()) === Comparison.EqualTo;
        const jsFilePath = options.emitDeclarationOnly || isJsonEmittedToSameLocation ? undefined : ownOutputFilePath;
        const sourceMapFilePath = !jsFilePath || isJsonSourceFile(sourceFile) ? undefined : getSourceMapFilePath(jsFilePath, options);
        const declarationFilePath = (forceDtsPaths || (getEmitDeclarations(options) && !isJsonFile)) ? getDeclarationEmitOutputFilePath(sourceFile.fileName, host) : undefined;
        const declarationMapPath = declarationFilePath && getAreDeclarationMapsEnabled(options) ? declarationFilePath + ".map" : undefined;
        return { jsFilePath, sourceMapFilePath, declarationFilePath, declarationMapPath, buildInfoPath: undefined };
    }
}


/** @internal */
export function getDeclarationEmitOutputFilePath(fileName: string, host: EmitHost) {
    return getDeclarationEmitOutputFilePathWorker(fileName, host.getCompilerOptions(), host.getCurrentDirectory(), host.getCommonSourceDirectory(), f => host.getCanonicalFileName(f));
}

/** @internal */
export function getDeclarationEmitOutputFilePathWorker(fileName: string, options: CompilerOptions, currentDirectory: string, commonSourceDirectory: string, getCanonicalFileName: GetCanonicalFileName): string {
    const outputDir = options.declarationDir || options.outDir; // Prefer declaration folder if specified

    const path = outputDir
        ? getSourceFilePathInNewDirWorker(fileName, outputDir, currentDirectory, commonSourceDirectory, getCanonicalFileName)
        : fileName;
    const declarationExtension = getDeclarationEmitExtensionForPath(path);
    return removeFileExtension(path) + declarationExtension;
}

/** @internal */
export function getDeclarationEmitExtensionForPath(path: string) {
    return fileExtensionIsOneOf(path, [Extension.Mjs, Extension.Mts]) ? Extension.Dmts :
        fileExtensionIsOneOf(path, [Extension.Cjs, Extension.Cts]) ? Extension.Dcts :
        fileExtensionIsOneOf(path, [Extension.Json]) ? `.json.d.ts` : // Drive-by redefinition of json declaration file output name so if it's ever enabled, it behaves well
        Extension.Dts;
}


/** @internal */
export function getOutputExtension(fileName: string, options: CompilerOptions): Extension {
    return fileExtensionIs(fileName, Extension.Json) ? Extension.Json :
    options.jsx === JsxEmit.Preserve && fileExtensionIsOneOf(fileName, [Extension.Jsx, Extension.Tsx]) ? Extension.Jsx :
    fileExtensionIsOneOf(fileName, [Extension.Mts, Extension.Mjs]) ? Extension.Mjs :
    fileExtensionIsOneOf(fileName, [Extension.Cts, Extension.Cjs]) ? Extension.Cjs :
    Extension.Js;
}


/** @internal */
export function getOwnEmitOutputFilePath(fileName: string, host: EmitHost, extension: string) {
    const compilerOptions = host.getCompilerOptions();
    let emitOutputFilePathWithoutExtension: string;
    if (compilerOptions.outDir) {
        emitOutputFilePathWithoutExtension = removeFileExtension(getSourceFilePathInNewDir(fileName, host, compilerOptions.outDir));
    }
    else {
        emitOutputFilePathWithoutExtension = removeFileExtension(fileName);
    }

    return emitOutputFilePathWithoutExtension + extension;
}

/** @internal */
export function getSourceFilePathInNewDir(fileName: string, host: EmitHost, newDirPath: string): string {
    return getSourceFilePathInNewDirWorker(fileName, newDirPath, host.getCurrentDirectory(), host.getCommonSourceDirectory(), f => host.getCanonicalFileName(f));
}


/** @internal */
export function getSourceFilePathInNewDirWorker(fileName: string, newDirPath: string, currentDirectory: string, commonSourceDirectory: string, getCanonicalFileName: GetCanonicalFileName): string {
    let sourceFilePath = getNormalizedAbsolutePath(fileName, currentDirectory);
    const isSourceFileInCommonSourceDirectory = getCanonicalFileName(sourceFilePath).indexOf(getCanonicalFileName(commonSourceDirectory)) === 0;
    sourceFilePath = isSourceFileInCommonSourceDirectory ? sourceFilePath.substring(commonSourceDirectory.length) : sourceFilePath;
    return combinePaths(newDirPath, sourceFilePath);
}



/** @internal */
export function getOutputPathsForBundle(options: CompilerOptions, forceDtsPaths: boolean): EmitFileNames {
    const outPath = outFile(options)!;
    const jsFilePath = options.emitDeclarationOnly ? undefined : outPath;
    const sourceMapFilePath = jsFilePath && getSourceMapFilePath(jsFilePath, options);
    const declarationFilePath = (forceDtsPaths || getEmitDeclarations(options)) ? removeFileExtension(outPath) + Extension.Dts : undefined;
    const declarationMapPath = declarationFilePath && getAreDeclarationMapsEnabled(options) ? declarationFilePath + ".map" : undefined;
    const buildInfoPath = getTsBuildInfoEmitOutputFilePath(options);
    return { jsFilePath, sourceMapFilePath, declarationFilePath, declarationMapPath, buildInfoPath };
}


/** @internal */
export function outFile(options: CompilerOptions) {
    return options.outFile || options.out;
}


function getSourceMapFilePath(jsFilePath: string, options: CompilerOptions) {
    return (options.sourceMap && !options.inlineSourceMap) ? jsFilePath + ".map" : undefined;
}
/** @internal */
export function getEmitDeclarations(compilerOptions: CompilerOptions): boolean {
    return !!(compilerOptions.declaration || compilerOptions.composite);
}


/** @internal */
export function getAreDeclarationMapsEnabled(options: CompilerOptions) {
    return !!(getEmitDeclarations(options) && options.declarationMap);
}


/** @internal */
export function getSetAccessorValueParameter(accessor: SetAccessorDeclaration): ParameterDeclaration | undefined {
    if (accessor && accessor.parameters.length > 0) {
        const hasThis = accessor.parameters.length === 2 && parameterIsThisKeyword(accessor.parameters[0]);
        return accessor.parameters[hasThis ? 1 : 0];
    }
}


function getCanonicalAbsolutePath(host: ResolveModuleNameResolutionHost, path: string) {
    return host.getCanonicalFileName(getNormalizedAbsolutePath(path, host.getCurrentDirectory()));
}


/** @internal */
export function getExternalModuleNameFromDeclaration(host: ResolveModuleNameResolutionHost, resolver: EmitResolver, declaration: ImportEqualsDeclaration | ImportDeclaration | ExportDeclaration | ModuleDeclaration | ImportTypeNode): string | undefined {
    const file = resolver.getExternalModuleFileFromDeclaration(declaration);
    if (!file || file.isDeclarationFile) {
        return undefined;
    }
    // If the declaration already uses a non-relative name, and is outside the common source directory, continue to use it
    const specifier = getExternalModuleName(declaration);
    if (specifier && isStringLiteralLike(specifier) && !pathIsRelative(specifier.text) &&
        getCanonicalAbsolutePath(host, file.path).indexOf(getCanonicalAbsolutePath(host, ensureTrailingDirectorySeparator(host.getCommonSourceDirectory()))) === -1) {
        return undefined;
    }
    return getResolvedExternalModuleName(host, file);
}


/** @internal */
export function getExternalModuleName(node: AnyImportOrReExport | ImportTypeNode | ImportCall | ModuleDeclaration): Expression | undefined {
    switch (node.kind) {
        case SyntaxKind.ImportDeclaration:
        case SyntaxKind.ExportDeclaration:
            return node.moduleSpecifier;
        case SyntaxKind.ImportEqualsDeclaration:
            return node.moduleReference.kind === SyntaxKind.ExternalModuleReference ? node.moduleReference.expression : undefined;
        case SyntaxKind.ImportType:
            return isLiteralImportTypeNode(node) ? node.argument.literal : undefined;
        case SyntaxKind.CallExpression:
            return node.arguments[0];
        case SyntaxKind.ModuleDeclaration:
            return node.name.kind === SyntaxKind.StringLiteral ? node.name : undefined;
        default:
            return Debug.assertNever(node);
    }
}


/** @internal */
export function getExternalModuleImportEqualsDeclarationExpression(node: Node) {
    Debug.assert(isExternalModuleImportEqualsDeclaration(node));
    return ((node as ImportEqualsDeclaration).moduleReference as ExternalModuleReference).expression;
}

/** @internal */
export function isExternalModuleImportEqualsDeclaration(node: Node): node is ImportEqualsDeclaration & { moduleReference: ExternalModuleReference } {
    return node.kind === SyntaxKind.ImportEqualsDeclaration && (node as ImportEqualsDeclaration).moduleReference.kind === SyntaxKind.ExternalModuleReference;
}


/** @internal */
export function getResolutionModeOverrideForClause(clause: AssertClause | undefined, grammarErrorOnNode?: (node: Node, diagnostic: DiagnosticMessage) => void) {
    if (!clause) return undefined;
    if (length(clause.elements) !== 1) {
        grammarErrorOnNode?.(clause, Diagnostics.Type_import_assertions_should_have_exactly_one_key_resolution_mode_with_value_import_or_require);
        return undefined;
    }
    const elem = clause.elements[0];
    if (!isStringLiteralLike(elem.name)) return undefined;
    if (elem.name.text !== "resolution-mode") {
        grammarErrorOnNode?.(elem.name, Diagnostics.resolution_mode_is_the_only_valid_key_for_type_import_assertions);
        return undefined;
    }
    if (!isStringLiteralLike(elem.value)) return undefined;
    if (elem.value.text !== "import" && elem.value.text !== "require") {
        grammarErrorOnNode?.(elem.value, Diagnostics.resolution_mode_should_be_either_require_or_import);
        return undefined;
    }
    return elem.value.text === "import" ? ModuleKind.ESNext : ModuleKind.CommonJS;
}


/** @internal */
export function isEntityNameExpression(node: Node): node is EntityNameExpression {
    return node.kind === SyntaxKind.Identifier || isPropertyAccessEntityNameExpression(node);
}


/** @internal */
export function isPropertyAccessEntityNameExpression(node: Node): node is PropertyAccessEntityNameExpression {
    return isPropertyAccessExpression(node) && isIdentifier(node.name) && isEntityNameExpression(node.expression);
}


/** @internal */
export function getEffectiveBaseTypeNode(node: ClassLikeDeclaration | InterfaceDeclaration) {
    const baseType = getClassExtendsHeritageElement(node);
    if (baseType && isInJSFile(node)) {
        // Prefer an @augments tag because it may have type parameters.
        const tag = getJSDocAugmentsTag(node);
        if (tag) {
            return tag.class;
        }
    }
    return baseType;
}


/** @internal */
export function getClassExtendsHeritageElement(node: ClassLikeDeclaration | InterfaceDeclaration) {
    const heritageClause = getHeritageClause(node.heritageClauses, SyntaxKind.ExtendsKeyword);
    return heritageClause && heritageClause.types.length > 0 ? heritageClause.types[0] : undefined;
}


/** @internal */
export function getHeritageClause(clauses: NodeArray<HeritageClause> | undefined, kind: SyntaxKind) {
    if (clauses) {
        for (const clause of clauses) {
            if (clause.token === kind) {
                return clause;
            }
        }
    }

    return undefined;
}


/**
 * Gets flags that control emit behavior of a node.
 *
 * @internal
 */
 export function getEmitFlags(node: Node): EmitFlags {
    const emitNode = node.emitNode;
    return emitNode && emitNode.flags || 0;
}


/** @internal */
export function getEmitModuleResolutionKind(compilerOptions: CompilerOptions) {
    let moduleResolution = compilerOptions.moduleResolution;
    if (moduleResolution === undefined) {
        switch (getEmitModuleKind(compilerOptions)) {
            case ModuleKind.CommonJS:
                moduleResolution = ModuleResolutionKind.NodeJs;
                break;
            case ModuleKind.Node16:
                moduleResolution = ModuleResolutionKind.Node16;
                break;
            case ModuleKind.NodeNext:
                moduleResolution = ModuleResolutionKind.NodeNext;
                break;
            default:
                moduleResolution = ModuleResolutionKind.Classic;
                break;
        }
    }
    return moduleResolution;
}
/** @internal */
export function getEmitModuleKind(compilerOptions: {module?: CompilerOptions["module"], target?: CompilerOptions["target"]}) {
    return typeof compilerOptions.module === "number" ?
        compilerOptions.module :
        getEmitScriptTarget(compilerOptions) >= ScriptTarget.ES2015 ? ModuleKind.ES2015 : ModuleKind.CommonJS;
}


/** @internal */
export function getEmitScriptTarget(compilerOptions: {module?: CompilerOptions["module"], target?: CompilerOptions["target"]}) {
    return compilerOptions.target ||
        (compilerOptions.module === ModuleKind.Node16 && ScriptTarget.ES2022) ||
        (compilerOptions.module === ModuleKind.NodeNext && ScriptTarget.ESNext) ||
        ScriptTarget.ES3;
}


/** @internal */
export function removePrefix(str: string, prefix: string): string {
    return startsWith(str, prefix) ? str.substr(prefix.length) : str;
}

/** @internal */
export function tryRemovePrefix(str: string, prefix: string, getCanonicalFileName: GetCanonicalFileName = identity): string | undefined {
    return startsWith(getCanonicalFileName(str), getCanonicalFileName(prefix)) ? str.substring(prefix.length) : undefined;
}

const extensionsToRemove = [Extension.Dts, Extension.Dmts, Extension.Dcts, Extension.Mjs, Extension.Mts, Extension.Cjs, Extension.Cts, Extension.Ts, Extension.Js, Extension.Tsx, Extension.Jsx, Extension.Json];

/** @internal */
export function isAnySupportedFileExtension(path: string): boolean {
    return tryGetExtensionFromPath(path) !== undefined;
}

/** @internal */
export function tryGetExtensionFromPath(path: string): Extension | undefined {
    return find<Extension>(extensionsToRemove, e => fileExtensionIs(path, e));
}



/** @internal */
export interface NodeModulePathParts {
    readonly topLevelNodeModulesIndex: number;
    readonly topLevelPackageNameIndex: number;
    readonly packageRootIndex: number;
    readonly fileNameIndex: number;
}
/** @internal */
export function getNodeModulePathParts(fullPath: string): NodeModulePathParts | undefined {
    // If fullPath can't be valid module file within node_modules, returns undefined.
    // Example of expected pattern: /base/path/node_modules/[@scope/otherpackage/@otherscope/node_modules/]package/[subdirectory/]file.js
    // Returns indices:                       ^            ^                                                      ^             ^

    let topLevelNodeModulesIndex = 0;
    let topLevelPackageNameIndex = 0;
    let packageRootIndex = 0;
    let fileNameIndex = 0;

    const enum States {
        BeforeNodeModules,
        NodeModules,
        Scope,
        PackageContent
    }

    let partStart = 0;
    let partEnd = 0;
    let state = States.BeforeNodeModules;

    while (partEnd >= 0) {
        partStart = partEnd;
        partEnd = fullPath.indexOf("/", partStart + 1);
        switch (state) {
            case States.BeforeNodeModules:
                if (fullPath.indexOf(nodeModulesPathPart, partStart) === partStart) {
                    topLevelNodeModulesIndex = partStart;
                    topLevelPackageNameIndex = partEnd;
                    state = States.NodeModules;
                }
                break;
            case States.NodeModules:
            case States.Scope:
                if (state === States.NodeModules && fullPath.charAt(partStart + 1) === "@") {
                    state = States.Scope;
                }
                else {
                    packageRootIndex = partEnd;
                    state = States.PackageContent;
                }
                break;
            case States.PackageContent:
                if (fullPath.indexOf(nodeModulesPathPart, partStart) === partStart) {
                    state = States.NodeModules;
                }
                else {
                    state = States.PackageContent;
                }
                break;
        }
    }

    fileNameIndex = partStart;

    return state > States.NodeModules ? { topLevelNodeModulesIndex, topLevelPackageNameIndex, packageRootIndex, fileNameIndex } : undefined;
}


/** @internal */
export const nodeModulesPathPart = "/node_modules/";
/** @internal */
export function pathContainsNodeModules(path: string): boolean {
    return stringContains(path, nodeModulesPathPart);
}



/**
 * Gets the extension from a path.
 * Path must have a valid extension.
 *
 * @internal
 */
 export function extensionFromPath(path: string): Extension {
    const ext = tryGetExtensionFromPath(path);
    return ext !== undefined ? ext : Debug.fail(`File ${path} has unknown extension.`);
}

const allSupportedExtensions: readonly Extension[][] = [[Extension.Ts, Extension.Tsx, Extension.Dts, Extension.Js, Extension.Jsx], [Extension.Cts, Extension.Dcts, Extension.Cjs], [Extension.Mts, Extension.Dmts, Extension.Mjs]];
const allSupportedExtensionsWithJson: readonly Extension[][] = [...allSupportedExtensions, [Extension.Json]];

/** @internal */
export function getSupportedExtensions(options?: CompilerOptions): readonly Extension[][];
/** @internal */
export function getSupportedExtensions(options?: CompilerOptions, extraFileExtensions?: readonly FileExtensionInfo[]): readonly string[][];
/** @internal */
export function getSupportedExtensions(options?: CompilerOptions, extraFileExtensions?: readonly FileExtensionInfo[]): readonly string[][] {
    const needJsExtensions = options && getAllowJSCompilerOption(options);

    if (!extraFileExtensions || extraFileExtensions.length === 0) {
        return needJsExtensions ? allSupportedExtensions : supportedTSExtensions;
    }

    const builtins = needJsExtensions ? allSupportedExtensions : supportedTSExtensions;
    const flatBuiltins = flatten(builtins);
    const extensions = [
        ...builtins,
        ...mapDefined(extraFileExtensions, x => x.scriptKind === ScriptKind.Deferred || needJsExtensions && isJSLike(x.scriptKind) && flatBuiltins.indexOf(x.extension as Extension) === -1 ? [x.extension] : undefined)
    ];

    return extensions;
}
/** @internal */
export const supportedJSExtensions: readonly Extension[][] = [[Extension.Js, Extension.Jsx], [Extension.Mjs], [Extension.Cjs]];
/** @internal */
export const supportedJSExtensionsFlat: readonly Extension[] = flatten(supportedJSExtensions);
/**
 *  Groups of supported extensions in order of file resolution precedence. (eg, TS > TSX > DTS and seperately, CTS > DCTS)
 *
 * @internal
 */
 export const supportedTSExtensions: readonly Extension[][] = [[Extension.Ts, Extension.Tsx, Extension.Dts], [Extension.Cts, Extension.Dcts], [Extension.Mts, Extension.Dmts]];
 /** @internal */
 export const supportedTSExtensionsFlat: readonly Extension[] = flatten(supportedTSExtensions);

/** @internal */
export function hasJSFileExtension(fileName: string): boolean {
    return some(supportedJSExtensionsFlat, extension => fileExtensionIs(fileName, extension));
}

/** @internal */
export function hasTSFileExtension(fileName: string): boolean {
    return some(supportedTSExtensionsFlat, extension => fileExtensionIs(fileName, extension));
}

/** @internal */
export function getAllowJSCompilerOption(compilerOptions: CompilerOptions): boolean {
    return compilerOptions.allowJs === undefined ? !!compilerOptions.checkJs : compilerOptions.allowJs;
}

function isJSLike(scriptKind: ScriptKind | undefined): boolean {
    return scriptKind === ScriptKind.JS || scriptKind === ScriptKind.JSX;
}

export function getFirstIdentifier(node: EntityNameOrEntityNameExpression): Identifier {
    switch (node.kind) {
        case SyntaxKind.Identifier:
            return node;
        case SyntaxKind.QualifiedName:
            do {
                node = node.left;
            } while (node.kind !== SyntaxKind.Identifier);
            return node;
        case SyntaxKind.PropertyAccessExpression:
            do {
                node = node.expression;
            } while (node.kind !== SyntaxKind.Identifier);
            return node;
    }
}


/** @internal */
export function isPartOfTypeNode(node: Node): boolean {
    if (SyntaxKind.FirstTypeNode <= node.kind && node.kind <= SyntaxKind.LastTypeNode) {
        return true;
    }

    switch (node.kind) {
        case SyntaxKind.AnyKeyword:
        case SyntaxKind.UnknownKeyword:
        case SyntaxKind.NumberKeyword:
        case SyntaxKind.BigIntKeyword:
        case SyntaxKind.StringKeyword:
        case SyntaxKind.BooleanKeyword:
        case SyntaxKind.SymbolKeyword:
        case SyntaxKind.ObjectKeyword:
        case SyntaxKind.UndefinedKeyword:
        case SyntaxKind.NeverKeyword:
            return true;
        case SyntaxKind.VoidKeyword:
            return node.parent.kind !== SyntaxKind.VoidExpression;
        case SyntaxKind.ExpressionWithTypeArguments:
            return isHeritageClause(node.parent) && !isExpressionWithTypeArgumentsInClassExtendsClause(node);
        case SyntaxKind.TypeParameter:
            return node.parent.kind === SyntaxKind.MappedType || node.parent.kind === SyntaxKind.InferType;

        // Identifiers and qualified names may be type nodes, depending on their context. Climb
        // above them to find the lowest container
        case SyntaxKind.Identifier:
            // If the identifier is the RHS of a qualified name, then it's a type iff its parent is.
            if (node.parent.kind === SyntaxKind.QualifiedName && (node.parent as QualifiedName).right === node) {
                node = node.parent;
            }
            else if (node.parent.kind === SyntaxKind.PropertyAccessExpression && (node.parent as PropertyAccessExpression).name === node) {
                node = node.parent;
            }
            // At this point, node is either a qualified name or an identifier
            Debug.assert(node.kind === SyntaxKind.Identifier || node.kind === SyntaxKind.QualifiedName || node.kind === SyntaxKind.PropertyAccessExpression,
                "'node' was expected to be a qualified name, identifier or property access in 'isPartOfTypeNode'.");
            // falls through

        case SyntaxKind.QualifiedName:
        case SyntaxKind.PropertyAccessExpression:
        case SyntaxKind.ThisKeyword: {
            const { parent } = node;
            if (parent.kind === SyntaxKind.TypeQuery) {
                return false;
            }
            if (parent.kind === SyntaxKind.ImportType) {
                return !(parent as ImportTypeNode).isTypeOf;
            }
            // Do not recursively call isPartOfTypeNode on the parent. In the example:
            //
            //     let a: A.B.C;
            //
            // Calling isPartOfTypeNode would consider the qualified name A.B a type node.
            // Only C and A.B.C are type nodes.
            if (SyntaxKind.FirstTypeNode <= parent.kind && parent.kind <= SyntaxKind.LastTypeNode) {
                return true;
            }
            switch (parent.kind) {
                case SyntaxKind.ExpressionWithTypeArguments:
                    return isHeritageClause(parent.parent) && !isExpressionWithTypeArgumentsInClassExtendsClause(parent);
                case SyntaxKind.TypeParameter:
                    return node === (parent as TypeParameterDeclaration).constraint;
                case SyntaxKind.JSDocTemplateTag:
                    return node === (parent as JSDocTemplateTag).constraint;
                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.PropertySignature:
                case SyntaxKind.Parameter:
                case SyntaxKind.VariableDeclaration:
                    return node === (parent as HasType).type;
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.ArrowFunction:
                case SyntaxKind.Constructor:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    return node === (parent as FunctionLikeDeclaration).type;
                case SyntaxKind.CallSignature:
                case SyntaxKind.ConstructSignature:
                case SyntaxKind.IndexSignature:
                    return node === (parent as SignatureDeclaration).type;
                case SyntaxKind.TypeAssertionExpression:
                    return node === (parent as TypeAssertion).type;
                case SyntaxKind.CallExpression:
                case SyntaxKind.NewExpression:
                    return contains((parent as CallExpression).typeArguments, node);
                case SyntaxKind.TaggedTemplateExpression:
                    // TODO (drosen): TaggedTemplateExpressions may eventually support type arguments.
                    return false;
            }
        }
    }

    return false;
}
/** @internal */
export function isExpressionWithTypeArgumentsInClassExtendsClause(node: Node): node is ExpressionWithTypeArguments {
    return tryGetClassExtendingExpressionWithTypeArguments(node) !== undefined;
}
export function tryGetClassExtendingExpressionWithTypeArguments(node: Node): ClassLikeDeclaration | undefined {
    const cls = tryGetClassImplementingOrExtendingExpressionWithTypeArguments(node);
    return cls && !cls.isImplements ? cls.class : undefined;
}

/** @internal */
export interface ClassImplementingOrExtendingExpressionWithTypeArguments {
    readonly class: ClassLikeDeclaration;
    readonly isImplements: boolean;
}
/** @internal */
export function tryGetClassImplementingOrExtendingExpressionWithTypeArguments(node: Node): ClassImplementingOrExtendingExpressionWithTypeArguments | undefined {
    return isExpressionWithTypeArguments(node)
        && isHeritageClause(node.parent)
        && isClassLike(node.parent.parent)
        ? { class: node.parent.parent, isImplements: node.parent.token === SyntaxKind.ImplementsKeyword }
        : undefined;
}
export function isClassLike(node: Node): node is ClassLikeDeclaration {
    return node && (node.kind === SyntaxKind.ClassDeclaration || node.kind === SyntaxKind.ClassExpression);
}

export const supportedDeclarationExtensions: readonly Extension[] = [Extension.Dts, Extension.Dcts, Extension.Dmts];
/** @internal */
export function isDeclarationFileName(fileName: string): boolean {
    return fileExtensionIsOneOf(fileName, supportedDeclarationExtensions);
}



/** @internal */
export function cloneCompilerOptions(options: CompilerOptions): CompilerOptions {
    const result = clone(options);
    setConfigFileInOptions(result, options && options.configFile as any);
    return result;
}
/** @internal */
export function setConfigFileInOptions(options: CompilerOptions, configFile: TsConfigSourceFile | undefined) {
    if (configFile) {
        Object.defineProperty(options, "configFile", { enumerable: false, writable: false, value: configFile });
    }
}

const carriageReturnLineFeed = "\r\n";
const lineFeed = "\n";
/** @internal */
export function getNewLineCharacter(options: CompilerOptions | PrinterOptions, getNewLine?: () => string): string {
    switch (options.newLine) {
        case NewLineKind.CarriageReturnLineFeed:
            return carriageReturnLineFeed;
        case NewLineKind.LineFeed:
            return lineFeed;
    }
    return getNewLine ? getNewLine() : sys ? sys.newLine : carriageReturnLineFeed;
}


export function isAmbientDeclaration(node: Node) {
    // @ts-expect-error NodeFlags.Ambient is not exposed
    return node.flags & NodeFlags.Ambient
}

export function isEnumConst(node: EnumDeclaration): boolean {
    return !!(getSyntacticModifierFlags(node) & ModifierFlags.Const);
}


function idText(id: Identifier) { return id.escapedText; }
/** @internal */
export function nodeHasName(statement: Node, name: Identifier) {
    if (isNamedDeclaration(statement) && isIdentifier(statement.name) && idText(statement.name as Identifier) === idText(name)) {
        return true;
    }
    if (isVariableStatement(statement) && some(statement.declarationList.declarations, d => nodeHasName(d, name))) {
        return true;
    }
    return false;
}

/** @internal */
export function isNamedDeclaration(node: Node): node is NamedDeclaration & { name: DeclarationName } {
    return !!(node as NamedDeclaration).name; // A 'name' property should always be a DeclarationName.
}

/**
 * @internal
 */
export function hasIdentifierComputedName(declaration: Declaration): declaration is DynamicNamedDeclaration | DynamicNamedBinaryExpression {
    const name = getNameOfDeclaration(declaration);
    return !!name && isIdentifierComputedName(name);
}
/** @internal */
export function isIdentifierComputedName(name: DeclarationName): boolean {
    if (!(name.kind === SyntaxKind.ComputedPropertyName || name.kind === SyntaxKind.ElementAccessExpression)) {
        return false;
    }
    let expr = isElementAccessExpression(name) ? skipParentheses(name.argumentExpression) : name.expression;
    while(isPropertyAccessExpression(expr)) {
        expr = expr.expression;
    }
    return isIdentifier(expr);
}

/** @internal */
export function isIdentifierANonContextualKeyword(node: Identifier): boolean {
    const originalKeywordKind = identifierToKeywordKind(node);
    return !!originalKeywordKind && !isContextualKeyword(originalKeywordKind);
}

/** @internal */
export function isContextualKeyword(token: SyntaxKind): boolean {
    return SyntaxKind.AbstractKeyword <= token && token <= SyntaxKind.OfKeyword;
}