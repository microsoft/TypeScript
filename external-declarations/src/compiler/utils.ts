import { BindingPattern, CallExpression, canHaveModifiers, ClassDeclaration, ClassLikeDeclaration, CompilerOptions, Declaration, DeclarationName, EntityNameOrEntityNameExpression, EnumDeclaration, Expression, ExpressionWithTypeArguments, Extension, FunctionDeclaration, FunctionLikeDeclaration, getJSDocDeprecatedTag, getJSDocOverrideTagNoCache, getJSDocPrivateTag, getJSDocProtectedTag, getJSDocPublicTag, getJSDocReadonlyTag, getJSDocTypeTag, getNameOfDeclaration, HasType, Identifier, ImportDeclaration, ImportEqualsDeclaration, ImportTypeNode, InterfaceDeclaration, isElementAccessExpression, isExpressionWithTypeArguments, isHeritageClause, isIdentifier, isModuleDeclaration, isNumericLiteral, isParameter, isParenthesizedExpression, isPrefixUnaryExpression, isSourceFile, isStringLiteralLike, isVariableStatement,JSDocTemplateTag, JsxEmit, ModifierFlags, ModifierLike, ModuleDeclaration, ModuleKind, ModuleResolutionKind, NamedDeclaration, NewLineKind, Node, NodeFlags, NumericLiteral, OuterExpressionKinds, PrefixUnaryExpression, PrinterOptions, PropertyAccessExpression, QualifiedName, ScriptTarget, SignatureDeclaration, SourceFile, StringLiteralLike, SyntaxKind, sys, TsConfigSourceFile, TypeAliasDeclaration, TypeAssertion, TypeParameterDeclaration, VariableStatement } from "typescript";
import * as ts from "typescript";
import { Debug } from "./debug";
import { clone, contains, flatten, some } from "./lang-utils";
import { fileExtensionIs, fileExtensionIsOneOf } from "./path-utils";
import { AmbientModuleDeclaration, DynamicNamedBinaryExpression, DynamicNamedDeclaration, JSDocTypeAssertion, OuterExpression } from "./types";

/** @internal */
export function isInJSFile(node: Node | undefined): boolean {
    return !!node && !!(node.flags & NodeFlags.JavaScriptFile);
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
function nodeIsMissing(node: Node | undefined): boolean {
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
function getSelectedSyntacticModifierFlags(node: Node, flags: ModifierFlags): ModifierFlags {
    return getSyntacticModifierFlags(node) & flags;
}

/**
 * Gets the effective ModifierFlags for the provided node, including JSDoc modifiers. The modifiers will be cached on the node to improve performance.
 *
 * NOTE: This function may use `parent` pointers.
 *
 * @internal
 */
function getEffectiveModifierFlags(node: Node): ModifierFlags {
    return getModifierFlagsWorker(node, /*includeJSDoc*/ true);
}

/**
 * Gets the ModifierFlags for syntactic modifiers on the provided node. The modifiers will be cached on the node to improve performance.
 *
 * NOTE: This function does not use `parent` pointers and will not include modifiers from JSDoc.
 *
 * @internal
 */
function getSyntacticModifierFlags(node: Node): ModifierFlags {
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
function getSyntacticModifierFlagsNoCache(node: Node): ModifierFlags {
    let flags = canHaveModifiers(node) ? modifiersToFlags(node.modifiers) : ModifierFlags.None;
    if (node.flags & NodeFlags.NestedNamespace || (node.kind === SyntaxKind.Identifier && (node as Identifier).isInJSDocNamespace)) {
        flags |= ModifierFlags.Export;
    }
    return flags;
}

/** @internal */
function modifiersToFlags(modifiers: readonly ModifierLike[] | undefined) {
    let flags = ModifierFlags.None;
    if (modifiers) {
        for (const modifier of modifiers) {
            flags |= modifierToFlag(modifier.kind);
        }
    }
    return flags;
}

/** @internal */
function modifierToFlag(token: SyntaxKind): ModifierFlags {
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
type LateVisibilityPaintedStatement =
    | AnyImportSyntax
    | VariableStatement
    | ClassDeclaration
    | FunctionDeclaration
    | ModuleDeclaration
    | TypeAliasDeclaration
    | InterfaceDeclaration
    | EnumDeclaration;

/** @internal */
export function isThisIdentifier(node: Node | undefined): boolean {
    return !!node && node.kind === SyntaxKind.Identifier && identifierIsThisKeyword(node as Identifier);
}


/** @internal */
function identifierIsThisKeyword(id: Identifier): boolean {
    return id.originalKeywordKind === SyntaxKind.ThisKeyword;
}


/** @internal */
export function getNodeId(node: Node): number;
export function getNodeId(node: any): number {
    return (ts as any).getNodeId(node);
}

/** @internal */
function isGlobalScopeAugmentation(module: ModuleDeclaration): boolean {
    return !!(module.flags & NodeFlags.GlobalAugmentation);
}

/** @internal */
export function isExternalModuleAugmentation(node: Node): node is AmbientModuleDeclaration {
    return isAmbientModule(node) && isModuleAugmentationExternal(node);
}


/** @internal */
function isModuleAugmentationExternal(node: AmbientModuleDeclaration) {
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
function isExternalModule(file: SourceFile): boolean {
    return (file as any).externalModuleIndicator !== undefined;
}

/** @internal */
function isAmbientModule(node: Node): node is AmbientModuleDeclaration {
    return isModuleDeclaration(node) && (node.name.kind === SyntaxKind.StringLiteral || isGlobalScopeAugmentation(node));
}


/** @internal */
export function hasEffectiveModifier(node: Node, flags: ModifierFlags): boolean {
    return !!getSelectedEffectiveModifierFlags(node, flags);
}

/** @internal */
function getSelectedEffectiveModifierFlags(node: Node, flags: ModifierFlags): ModifierFlags {
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
function isDynamicName(name: DeclarationName): boolean {
    if (!(name.kind === SyntaxKind.ComputedPropertyName || name.kind === SyntaxKind.ElementAccessExpression)) {
        return false;
    }
    const expr = isElementAccessExpression(name) ? skipParentheses(name.argumentExpression) : name.expression;
    return !isStringOrNumericLiteralLike(expr) &&
        !isSignedNumericLiteral(expr);
}

/** @internal */
function isSignedNumericLiteral(node: Node): node is PrefixUnaryExpression & { operand: NumericLiteral } {
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

function skipOuterExpressions(node: Expression, kinds?: OuterExpressionKinds): Expression;
function skipOuterExpressions(node: Node, kinds?: OuterExpressionKinds): Node;
function skipOuterExpressions(node: Node, kinds = OuterExpressionKinds.All) {
    while (isOuterExpression(node, kinds)) {
        node = node.expression;
    }
    return node;
}


/** @internal */
function isStringOrNumericLiteralLike(node: Node): node is StringLiteralLike | NumericLiteral {
    return isStringLiteralLike(node) || isNumericLiteral(node);
}


/** @internal */
function isOuterExpression(node: Node, kinds = OuterExpressionKinds.All): node is OuterExpression {
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
function isJSDocTypeAssertion(node: Node): node is JSDocTypeAssertion {
    return isParenthesizedExpression(node)
        && isInJSFile(node)
        && !!getJSDocTypeTag(node);
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
const supportedJSExtensions: readonly Extension[][] = [[Extension.Js, Extension.Jsx], [Extension.Mjs], [Extension.Cjs]];
/** @internal */
const supportedJSExtensionsFlat: readonly Extension[] = flatten(supportedJSExtensions);
/**
 *  Groups of supported extensions in order of file resolution precedence. (eg, TS > TSX > DTS and seperately, CTS > DCTS)
 *
 * @internal
 */
const supportedTSExtensions: readonly Extension[][] = [[Extension.Ts, Extension.Tsx, Extension.Dts], [Extension.Cts, Extension.Dcts], [Extension.Mts, Extension.Dmts]];
 /** @internal */
const supportedTSExtensionsFlat: readonly Extension[] = flatten(supportedTSExtensions);

/** @internal */
export function hasJSFileExtension(fileName: string): boolean {
    return some(supportedJSExtensionsFlat, extension => fileExtensionIs(fileName, extension));
}

/** @internal */
export function hasTSFileExtension(fileName: string): boolean {
    return some(supportedTSExtensionsFlat, extension => fileExtensionIs(fileName, extension));
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
function isExpressionWithTypeArgumentsInClassExtendsClause(node: Node): node is ExpressionWithTypeArguments {
    return tryGetClassExtendingExpressionWithTypeArguments(node) !== undefined;
}
function tryGetClassExtendingExpressionWithTypeArguments(node: Node): ClassLikeDeclaration | undefined {
    const cls = tryGetClassImplementingOrExtendingExpressionWithTypeArguments(node);
    return cls && !cls.isImplements ? cls.class : undefined;
}

/** @internal */
interface ClassImplementingOrExtendingExpressionWithTypeArguments {
    readonly class: ClassLikeDeclaration;
    readonly isImplements: boolean;
}
/** @internal */
function tryGetClassImplementingOrExtendingExpressionWithTypeArguments(node: Node): ClassImplementingOrExtendingExpressionWithTypeArguments | undefined {
    return isExpressionWithTypeArguments(node)
        && isHeritageClause(node.parent)
        && isClassLike(node.parent.parent)
        ? { class: node.parent.parent, isImplements: node.parent.token === SyntaxKind.ImplementsKeyword }
        : undefined;
}
function isClassLike(node: Node): node is ClassLikeDeclaration {
    return node && (node.kind === SyntaxKind.ClassDeclaration || node.kind === SyntaxKind.ClassExpression);
}

const supportedDeclarationExtensions: readonly Extension[] = [Extension.Dts, Extension.Dcts, Extension.Dmts];
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
function setConfigFileInOptions(options: CompilerOptions, configFile: TsConfigSourceFile | undefined) {
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
    return node.flags & NodeFlags.Ambient;
}

export function isEnumConst(node: EnumDeclaration): boolean {
    return !!(getSyntacticModifierFlags(node) & ModifierFlags.Const);
}


function idText(id: Identifier) {
    return id.escapedText;
}
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
function isNamedDeclaration(node: Node): node is NamedDeclaration & { name: DeclarationName } {
    return !!(node as NamedDeclaration).name; // A 'name' property should always be a DeclarationName.
}

