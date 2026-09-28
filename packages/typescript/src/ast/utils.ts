import { CharacterCodes } from "#enums/characterCodes";
import { JSDeclarationKind } from "#enums/jsDeclarationKind";
import { ModifierFlags } from "#enums/modifierFlags";
import { NodeFlags } from "#enums/nodeFlags";
import { OuterExpressionKinds } from "#enums/outerExpressionKinds";
import { SyntaxKind } from "#enums/syntaxKind";
import type {
    __String,
    AccessExpression,
    BinaryExpression,
    BindingElement,
    CallExpression,
    Declaration,
    DeclarationName,
    ElementAccessExpression,
    ExportAssignment,
    Expression,
    HasExpression,
    HasInitializer,
    ModifierLike,
    ObjectAssignmentInitializer,
    PropertyAccessExpression,
    PropertyAssignment,
    SourceFile,
    VariableDeclaration,
} from "./ast.ts";
import type { Node } from "./ast.ts";
import {
    isAccessExpression,
    isIdentifier,
    isNumericLiteral,
    isStringLiteralLikeNode,
} from "./is.generated.ts";
import { skipOuterExpressions } from "./is.ts";
import { modifierToFlag } from "./modifiers.ts";

let syntaxKindNames: Map<number, string> | undefined;
function getSyntaxKindNames(): Map<number, string> {
    if (!syntaxKindNames) {
        syntaxKindNames = new Map<number, string>();
        for (const name of Object.keys(SyntaxKind)) {
            const val = SyntaxKind[name as keyof typeof SyntaxKind];
            if (typeof val === "number" && !syntaxKindNames.has(val)) {
                syntaxKindNames.set(val, name);
            }
        }
        syntaxKindNames.set(SyntaxKind.EndOfFile, "EndOfFileToken");
    }
    return syntaxKindNames;
}

export function formatSyntaxKind(kind: SyntaxKind): string {
    return getSyntaxKindNames().get(kind) ?? `Unknown(${kind})`;
}

/**
 * Remove one extra leading underscore from an identifier name, recovering the
 * display form from its escaped {@link __String} key.
 */
export function unescapeLeadingUnderscores(identifier: __String): string {
    const id = identifier as string;
    return id.length >= 3 && id.charCodeAt(0) === CharacterCodes._ && id.charCodeAt(1) === CharacterCodes._ && id.charCodeAt(2) === CharacterCodes._
        ? id.slice(1)
        : id;
}

/**
 * Add an extra leading underscore to a display name that already begins with
 * `__`, producing its escaped {@link __String} key.
 */
export function escapeLeadingUnderscores(identifier: string): __String {
    return (identifier.length >= 2 && identifier.charCodeAt(0) === CharacterCodes._ && identifier.charCodeAt(1) === CharacterCodes._
        ? "_" + identifier
        : identifier) as __String;
}

/**
 * Gets the module specifier represented by an ambient module symbol's escaped
 * name, or `undefined` when the name does not identify an ambient module.
 */
export function tryGetAmbientModuleNameFromSymbolName(name: __String): string | undefined {
    const text = name as string;
    if (text.charCodeAt(0) === CharacterCodes.doubleQuote && text.charCodeAt(text.length - 1) === CharacterCodes.doubleQuote) {
        return text.slice(1, -1);
    }

    const patternPrefix = '__"';
    if (!text.startsWith(patternPrefix)) return undefined;
    const markerIndex = text.lastIndexOf('"pattern@');
    return markerIndex > patternPrefix.length ? text.slice(patternPrefix.length, markerIndex) : undefined;
}

export function tryCast<TOut extends TIn, TIn = any>(value: TIn | undefined, test: (value: TIn) => value is TOut): TOut | undefined {
    return value !== undefined && test(value) ? value : undefined;
}

export function cast<TOut extends TIn, TIn = any>(value: TIn | undefined, test: (value: TIn) => value is TOut): TOut {
    if (value !== undefined && test(value)) return value;

    throw new Error(`Invalid cast. The supplied value ${value} did not pass the test '${test.name}'.`);
}

export function hasExpression(node: Node): node is HasExpression {
    return "expression" in node;
}

export function hasInitializer(node: Node): node is HasInitializer {
    return "initializer" in node;
}

export function hasObjectAssignmentInitializer(node: Node): node is ObjectAssignmentInitializer {
    return "objectAssignmentInitializer" in node;
}

export function isExternalModule(file: SourceFile): boolean {
    return file.externalModuleIndicator !== undefined;
}

function getRootDeclaration(node: Node): Node {
    while (node.kind === SyntaxKind.BindingElement) {
        node = node.parent.parent;
    }
    return node;
}

function getModifierFlags(node: Node): ModifierFlags {
    const modifiers = "modifiers" in node
        ? (node as Node & { readonly modifiers?: readonly ModifierLike[]; }).modifiers
        : undefined;
    let flags = ModifierFlags.None;
    if (modifiers) {
        for (const modifier of modifiers) {
            flags |= modifierToFlag(modifier.kind);
        }
    }
    return flags;
}

export function getCombinedModifierFlags(node: Declaration): ModifierFlags {
    let current: Node | undefined = getRootDeclaration(node);
    let flags = getModifierFlags(current);
    if (current.kind === SyntaxKind.VariableDeclaration) {
        current = current.parent;
    }
    if (current?.kind === SyntaxKind.VariableDeclarationList) {
        flags |= getModifierFlags(current);
        current = current.parent;
    }
    if (current?.kind === SyntaxKind.VariableStatement) {
        flags |= getModifierFlags(current);
    }
    return flags;
}

function skipParentheses(node: Expression): Expression {
    return skipOuterExpressions(node, OuterExpressionKinds.Parentheses);
}

function isStringOrNumericLiteralLike(node: Node): node is DeclarationName {
    return isStringLiteralLikeNode(node) || isNumericLiteral(node);
}

function getElementOrPropertyAccessName(node: AccessExpression): DeclarationName | undefined {
    if (node.kind === SyntaxKind.PropertyAccessExpression) {
        return isIdentifier(node.name) ? node.name : undefined;
    }
    const argument = skipParentheses(node.argumentExpression);
    return isStringOrNumericLiteralLike(argument) ? argument : undefined;
}

function getNameText(node: DeclarationName | undefined): string | undefined {
    return node && "text" in node && typeof node.text === "string" ? node.text : undefined;
}

function isEntityNameExpression(node: Node, allowJS = false): boolean {
    if (isIdentifier(node)) return true;
    if (node.kind === SyntaxKind.PropertyAccessExpression) {
        const access = node as PropertyAccessExpression;
        return isIdentifier(access.name) && isEntityNameExpression(access.expression, allowJS);
    }
    if (!allowJS) return false;
    if (node.kind === SyntaxKind.ThisKeyword) return true;
    if (node.kind !== SyntaxKind.ElementAccessExpression) return false;
    const access = node as ElementAccessExpression;
    return isStringOrNumericLiteralLike(access.argumentExpression) &&
        isEntityNameExpression(access.expression, true);
}

function isBindableStaticAccessExpression(node: Node, excludeThisKeyword: boolean): node is AccessExpression {
    if (node.kind === SyntaxKind.PropertyAccessExpression) {
        const access = node as PropertyAccessExpression;
        return !excludeThisKeyword && access.expression.kind === SyntaxKind.ThisKeyword ||
            isIdentifier(access.name) && isBindableStaticNameExpression(access.expression, true);
    }
    if (node.kind !== SyntaxKind.ElementAccessExpression) return false;
    const access = node as ElementAccessExpression;
    return isStringOrNumericLiteralLike(access.argumentExpression) &&
        (!excludeThisKeyword && access.expression.kind === SyntaxKind.ThisKeyword ||
            isEntityNameExpression(access.expression) ||
            isBindableStaticAccessExpression(access.expression, true));
}

function isBindableStaticNameExpression(node: Node, excludeThisKeyword: boolean): boolean {
    return isEntityNameExpression(node) || isBindableStaticAccessExpression(node, excludeThisKeyword);
}

function isModuleExportsAccessExpression(node: Node): boolean {
    return isAccessExpression(node) &&
        isIdentifier(node.expression) &&
        node.expression.text === "module" &&
        getNameText(getElementOrPropertyAccessName(node)) === "exports";
}

function isBindableObjectDefinePropertyCall(node: CallExpression): boolean {
    if (node.arguments.length !== 3) return false;
    const expression = node.expression;
    if (expression.kind !== SyntaxKind.PropertyAccessExpression) return false;
    const access = expression as PropertyAccessExpression;
    return isIdentifier(access.expression) &&
        access.expression.text === "Object" &&
        access.name.text === "defineProperty" &&
        isStringOrNumericLiteralLike(node.arguments[1]) &&
        isBindableStaticNameExpression(node.arguments[0], true);
}

function getAssignmentDeclarationKind(node: BinaryExpression | CallExpression): JSDeclarationKind {
    if (node.kind === SyntaxKind.BinaryExpression) {
        if (node.operatorToken.kind !== SyntaxKind.EqualsToken || !isAccessExpression(node.left)) {
            return JSDeclarationKind.None;
        }
        const left = node.left;
        const isInJSFile = (left.flags & NodeFlags.JavaScriptFile) !== 0;
        if (isInJSFile) {
            if (isModuleExportsAccessExpression(left) && !(isIdentifier(node.right) && node.right.text === "exports")) {
                return JSDeclarationKind.ModuleExports;
            }
            if (
                (isModuleExportsAccessExpression(left.expression) ||
                    isIdentifier(left.expression) && left.expression.text === "exports") &&
                getElementOrPropertyAccessName(left)
            ) {
                return JSDeclarationKind.ExportsProperty;
            }
            if (left.expression.kind === SyntaxKind.ThisKeyword) {
                return JSDeclarationKind.ThisProperty;
            }
        }
        if (
            left.kind === SyntaxKind.PropertyAccessExpression &&
                isEntityNameExpression(left.expression, isInJSFile) &&
                isIdentifier(left.name) ||
            left.kind === SyntaxKind.ElementAccessExpression &&
                isEntityNameExpression(left.expression, isInJSFile)
        ) {
            return JSDeclarationKind.Property;
        }
        return JSDeclarationKind.None;
    }

    if (
        (node.flags & NodeFlags.JavaScriptFile) !== 0 &&
        isBindableObjectDefinePropertyCall(node)
    ) {
        const entityName = node.arguments[0];
        return isIdentifier(entityName) && entityName.text === "exports" ||
                isModuleExportsAccessExpression(entityName)
            ? JSDeclarationKind.ObjectDefinePropertyExports
            : JSDeclarationKind.ObjectDefinePropertyValue;
    }
    return JSDeclarationKind.None;
}

function getDeclaredName(declaration: Declaration | Expression): DeclarationName | undefined {
    return (declaration as (Declaration | Expression) & { readonly name?: DeclarationName; }).name;
}

function getNonAssignedNameOfDeclaration(declaration: Declaration | Expression): DeclarationName | undefined {
    if (declaration.kind === SyntaxKind.BinaryExpression || declaration.kind === SyntaxKind.CallExpression) {
        switch (getAssignmentDeclarationKind(declaration as BinaryExpression | CallExpression)) {
            case JSDeclarationKind.Property:
            case JSDeclarationKind.ThisProperty:
            case JSDeclarationKind.ExportsProperty: {
                const left = (declaration as BinaryExpression).left as AccessExpression;
                return getElementOrPropertyAccessName(left) ?? left;
            }
            case JSDeclarationKind.ObjectDefinePropertyValue:
            case JSDeclarationKind.ObjectDefinePropertyExports:
                return (declaration as CallExpression).arguments[1] as DeclarationName;
            default:
                return undefined;
        }
    }
    if (declaration.kind === SyntaxKind.ExportAssignment) {
        const expression = (declaration as ExportAssignment).expression;
        return isIdentifier(expression) ? expression : undefined;
    }
    return getDeclaredName(declaration);
}

function getAssignedName(node: Node): DeclarationName | undefined {
    const parent = node.parent;
    if (!parent) return undefined;
    switch (parent.kind) {
        case SyntaxKind.PropertyAssignment:
            return (parent as PropertyAssignment).name;
        case SyntaxKind.BindingElement:
            return (parent as BindingElement).name;
        case SyntaxKind.BinaryExpression: {
            const binary = parent as BinaryExpression;
            if (node !== binary.right) return undefined;
            const left = binary.left;
            if (isIdentifier(left)) return left;
            if (left.kind === SyntaxKind.PropertyAccessExpression) return (left as PropertyAccessExpression).name;
            if (left.kind === SyntaxKind.ElementAccessExpression) {
                const argument = skipParentheses((left as ElementAccessExpression).argumentExpression);
                return isStringOrNumericLiteralLike(argument) ? argument : undefined;
            }
            return undefined;
        }
        case SyntaxKind.VariableDeclaration: {
            const name = (parent as VariableDeclaration).name;
            return isIdentifier(name) ? name : undefined;
        }
        default:
            return undefined;
    }
}

export function getNameOfDeclaration(declaration: Declaration | Expression | undefined): DeclarationName | undefined {
    if (declaration === undefined) return undefined;
    const nonAssignedName = getNonAssignedNameOfDeclaration(declaration);
    if (nonAssignedName !== undefined) return nonAssignedName;
    return declaration.kind === SyntaxKind.FunctionExpression ||
            declaration.kind === SyntaxKind.ArrowFunction ||
            declaration.kind === SyntaxKind.ClassExpression
        ? getAssignedName(declaration)
        : undefined;
}

export function cloneSourceFileData(sourceFile: SourceFile): Record<string, unknown> {
    return {
        statements: sourceFile.statements,
        endOfFileToken: sourceFile.endOfFileToken,
        text: sourceFile.text,
        originalText: sourceFile.originalText,
        spanMap: sourceFile.spanMap,
        contentMapper: sourceFile.contentMapper,
        virtualFileName: sourceFile.virtualFileName,
        diagnosticDirectives: sourceFile.diagnosticDirectives,
        supplementalSourceFileNames: sourceFile.supplementalSourceFileNames,
        canonicalSourceFileName: sourceFile.canonicalSourceFileName,
        fileName: sourceFile.fileName,
        path: sourceFile.path,
        languageVariant: sourceFile.languageVariant,
        scriptKind: sourceFile.scriptKind,
        isDeclarationFile: sourceFile.isDeclarationFile,
        referencedFiles: sourceFile.referencedFiles,
        typeReferenceDirectives: sourceFile.typeReferenceDirectives,
        libReferenceDirectives: sourceFile.libReferenceDirectives,
        imports: sourceFile.imports,
        moduleAugmentations: sourceFile.moduleAugmentations,
        ambientModuleNames: sourceFile.ambientModuleNames,
        externalModuleIndicator: sourceFile.externalModuleIndicator,
        tokenCache: undefined,
    };
}
