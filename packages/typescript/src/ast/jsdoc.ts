import { assertNever } from "../internal/utils.ts";
import type {
    JSDoc,
    JSDocComment,
    JSDocLink,
    JSDocLinkCode,
    JSDocLinkPlain,
    JSDocParameterTag,
    JSDocTag,
    JSDocTemplateTag,
    JsxTagNameExpression,
    ParameterDeclaration,
    PrivateIdentifier,
    TypeParameterDeclaration,
    VariableDeclarationList,
} from "./ast.generated.ts";
import {
    type EntityNameOrEntityNameExpression,
    type Node,
    type NodeArray,
    SyntaxKind,
} from "./ast.ts";
import {
    isIdentifier,
    isJSDoc,
    isJSDocOverloadTag,
    isJSDocParameterTag,
    isJSDocSatisfiesTag,
    isJSDocTemplateTag,
    isJSDocTypeTag,
    isParenthesizedExpression,
    isPrivateIdentifier,
} from "./is.generated.ts";

/** Get all JSDoc tags related to a node, including those on parent nodes. */
export function getJSDocTags(node: Node): readonly JSDocTag[] {
    return getJSDocCommentsAndTags(node);
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

function isVariableLike(node: Node): boolean {
    switch (node.kind) {
        case SyntaxKind.BindingElement:
        case SyntaxKind.EnumMember:
        case SyntaxKind.Parameter:
        case SyntaxKind.PropertyAssignment:
        case SyntaxKind.PropertyDeclaration:
        case SyntaxKind.PropertySignature:
        case SyntaxKind.ShorthandPropertyAssignment:
        case SyntaxKind.VariableDeclaration:
            return true;
    }
    return false;
}

function getJSDocNodes(node: Node): JSDoc[] {
    const jsDoc = node.jsDoc;
    if (!jsDoc || jsDoc.length === 0) {
        return [];
    }
    const result: JSDoc[] = [];
    for (const j of jsDoc) {
        if (isJSDoc(j)) {
            result.push(j);
        }
    }
    return result;
}

/**
 * Determines whether a host node owns a JSDoc tag. A `@type` / `@satisfies` tag
 * attached to a parenthesized expression belongs only to that expression.
 */
function ownsJSDocTag(hostNode: Node, tag: JSDocTag): boolean {
    return !(isJSDocTypeTag(tag) || isJSDocSatisfiesTag(tag))
        || !tag.parent
        || !isJSDoc(tag.parent)
        || !tag.parent.parent
        || !isParenthesizedExpression(tag.parent.parent)
        || tag.parent.parent === hostNode;
}

function filterOwnedJSDocTags(hostNode: Node, comments: JSDoc[]): JSDocTag[] {
    const result: JSDocTag[] = [];
    const lastJSDoc = comments[comments.length - 1];
    for (const jsDoc of comments) {
        if (!jsDoc.tags) {
            continue;
        }
        if (jsDoc === lastJSDoc) {
            for (const tag of jsDoc.tags) {
                if (ownsJSDocTag(hostNode, tag)) {
                    result.push(tag);
                }
            }
        }
        else {
            // Tags from earlier comments only contribute their `@overload` tags.
            for (const tag of jsDoc.tags) {
                if (isJSDocOverloadTag(tag)) {
                    result.push(tag);
                }
            }
        }
    }
    return result;
}

function getJSDocParameterTags(param: ParameterDeclaration): JSDocParameterTag[] {
    const result: JSDocParameterTag[] = [];
    const name = param.name;
    const parentTags = getJSDocTags(param.parent);
    if (name && isIdentifier(name)) {
        for (const tag of parentTags) {
            if (isJSDocParameterTag(tag) && isIdentifier(tag.name) && tag.name.text === name.text) {
                result.push(tag);
            }
        }
    }
    else if (name) {
        // Binding patterns and JSDoc function syntax match parameter tags by position.
        const parameters = (param.parent as { parameters?: readonly Node[]; }).parameters;
        const i = parameters ? [...parameters].indexOf(param) : -1;
        if (i > -1) {
            const paramTags = parentTags.filter(isJSDocParameterTag);
            if (i < paramTags.length) {
                result.push(paramTags[i]);
            }
        }
    }
    return result;
}

function getJSDocTypeParameterTags(typeParam: TypeParameterDeclaration): JSDocTemplateTag[] {
    const result: JSDocTemplateTag[] = [];
    const name = typeParam.name.text;
    for (const tag of getJSDocTags(typeParam.parent)) {
        if (isJSDocTemplateTag(tag) && [...tag.typeParameters].some(tp => tp.name.text === name)) {
            result.push(tag);
        }
    }
    return result;
}

// Keep in sync with ast.GetNextJSDocCommentLocation.
function getNextJSDocCommentLocation(node: Node): Node | undefined {
    const parent = node.parent;
    if (parent) {
        switch (parent.kind) {
            case SyntaxKind.PropertyAssignment:
            case SyntaxKind.ExportAssignment:
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.SatisfiesExpression:
            case SyntaxKind.ReturnStatement:
            case SyntaxKind.VariableStatement:
            case SyntaxKind.ExpressionStatement:
                return parent;
            case SyntaxKind.VariableDeclarationList:
                if ((parent as VariableDeclarationList).declarations[0] === node) {
                    return parent;
                }
                break;
        }
    }
    return undefined;
}

function getJSDocCommentsAndTags(hostNode: Node): JSDocTag[] {
    const result: JSDocTag[] = [];
    // Pull parameter comments from a declaring initializer (e.g. `var x = function () {}`).
    if (isVariableLike(hostNode)) {
        const initializer = (hostNode as { initializer?: Node; }).initializer;
        if (initializer) {
            const initJSDoc = getJSDocNodes(initializer);
            if (initJSDoc.length) {
                result.push(...filterOwnedJSDocTags(hostNode, initJSDoc));
            }
        }
    }

    let node: Node | undefined = hostNode;
    while (node && node.parent) {
        const jsDocNodes = getJSDocNodes(node);
        if (jsDocNodes.length) {
            result.push(...filterOwnedJSDocTags(hostNode, jsDocNodes));
        }

        if (node.kind === SyntaxKind.Parameter) {
            result.push(...getJSDocParameterTags(node as ParameterDeclaration));
            break;
        }
        if (node.kind === SyntaxKind.TypeParameter) {
            result.push(...getJSDocTypeParameterTags(node as TypeParameterDeclaration));
            break;
        }
        node = getNextJSDocCommentLocation(node);
    }
    return result;
}

function formatJSDocLink(link: JSDocLink | JSDocLinkCode | JSDocLinkPlain) {
    const kind = link.kind === SyntaxKind.JSDocLink ? "link"
        : link.kind === SyntaxKind.JSDocLinkCode ? "linkcode"
        : "linkplain";
    const name = link.name ? entityNameToString(link.name) : "";
    const space = link.name && (link.text === "" || link.text.startsWith("://")) ? "" : " ";
    return `{@${kind} ${name}${space}${link.text}}`;
}

function entityNameToString(name: EntityNameOrEntityNameExpression | JsxTagNameExpression | PrivateIdentifier): string {
    switch (name.kind) {
        case SyntaxKind.ThisKeyword:
            return "this";
        case SyntaxKind.PrivateIdentifier:
        case SyntaxKind.Identifier:
            return name.getFullWidth() === 0 ? name.text : name.getText();
        case SyntaxKind.QualifiedName:
            return entityNameToString(name.left) + "." + entityNameToString(name.right);
        case SyntaxKind.PropertyAccessExpression:
            if (isIdentifier(name.name) || isPrivateIdentifier(name.name)) {
                return entityNameToString(name.expression) + "." + entityNameToString(name.name);
            }
            else {
                return assertNever(name.name);
            }
        case SyntaxKind.JsxNamespacedName:
            return entityNameToString(name.namespace) + ":" + entityNameToString(name.name);
        default:
            return assertNever(name);
    }
}
