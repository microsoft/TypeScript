/* @internal */
namespace ts.JsDoc {
const jsDocTagNames = [
    "abstract",
    "access",
    "alias",
    "argument",
    "async",
    "augments",
    "author",
    "borrows",
    "callback",
    "class",
    "classdesc",
    "constant",
    "constructor",
    "constructs",
    "copyright",
    "default",
    "deprecated",
    "description",
    "emits",
    "enum",
    "event",
    "example",
    "exports",
    "extends",
    "external",
    "field",
    "file",
    "fileoverview",
    "fires",
    "function",
    "generator",
    "global",
    "hideconstructor",
    "host",
    "ignore",
    "implements",
    "inheritdoc",
    "inner",
    "instance",
    "interface",
    "kind",
    "lends",
    "license",
    "link",
    "listens",
    "member",
    "memberof",
    "method",
    "mixes",
    "module",
    "name",
    "namespace",
    "override",
    "package",
    "param",
    "private",
    "property",
    "protected",
    "public",
    "readonly",
    "requires",
    "returns",
    "see",
    "since",
    "static",
    "summary",
    "template",
    "this",
    "throws",
    "todo",
    "tutorial",
    "type",
    "typedef",
    "var",
    "variation",
    "version",
    "virtual",
    "yields"
];
let jsDocTagNameCompletionEntries: ts.CompletionEntry[];
let jsDocTagCompletionEntries: ts.CompletionEntry[];

export function getJsDocCommentsFromDeclarations(declarations: readonly ts.Declaration[], checker?: ts.TypeChecker): ts.SymbolDisplayPart[] {
    // Only collect doc comments from duplicate declarations once:
    // In case of a union property there might be same declaration multiple times
    // which only varies in type parameter
    // Eg. const a: Array<string> | Array<number>; a.length
    // The property length will have two declarations of property length coming
    // from Array<T> - Array<string> and Array<number>
    const parts: ts.SymbolDisplayPart[][] = [];
    ts.forEachUnique(declarations, declaration => {
        for (const jsdoc of getCommentHavingNodes(declaration)) {
            const inheritDoc = ts.isJSDoc(jsdoc) && jsdoc.tags && ts.find(jsdoc.tags, t => t.kind === ts.SyntaxKind.JSDocTag && (t.tagName.escapedText === "inheritDoc" || t.tagName.escapedText === "inheritdoc"));
            // skip comments containing @typedefs since they're not associated with particular declarations
            // Exceptions:
            // - @typedefs are themselves declarations with associated comments
            // - @param or @return indicate that the author thinks of it as a 'local' @typedef that's part of the function documentation
            if (jsdoc.comment === undefined && !inheritDoc
                || ts.isJSDoc(jsdoc)
                   && declaration.kind !== ts.SyntaxKind.JSDocTypedefTag && declaration.kind !== ts.SyntaxKind.JSDocCallbackTag
                   && jsdoc.tags
                   && jsdoc.tags.some(t => t.kind === ts.SyntaxKind.JSDocTypedefTag || t.kind === ts.SyntaxKind.JSDocCallbackTag)
                   && !jsdoc.tags.some(t => t.kind === ts.SyntaxKind.JSDocParameterTag || t.kind === ts.SyntaxKind.JSDocReturnTag)) {
                continue;
            }
            let newparts = jsdoc.comment ? getDisplayPartsFromComment(jsdoc.comment, checker) : [];
            if (inheritDoc && inheritDoc.comment) {
                newparts = newparts.concat(getDisplayPartsFromComment(inheritDoc.comment, checker));
            }
            if (!ts.contains(parts, newparts, isIdenticalListOfDisplayParts)) {
                parts.push(newparts);
            }
        }
    });
    return ts.flatten(ts.intersperse(parts, [ts.lineBreakPart()]));
}

function isIdenticalListOfDisplayParts(parts1: ts.SymbolDisplayPart[], parts2: ts.SymbolDisplayPart[]) {
    return ts.arraysEqual(parts1, parts2, (p1, p2) => p1.kind === p2.kind && p1.text === p2.text);
}

function getCommentHavingNodes(declaration: ts.Declaration): readonly (ts.JSDoc | ts.JSDocTag)[] {
    switch (declaration.kind) {
        case ts.SyntaxKind.JSDocParameterTag:
        case ts.SyntaxKind.JSDocPropertyTag:
            return [declaration as ts.JSDocPropertyTag];
        case ts.SyntaxKind.JSDocCallbackTag:
        case ts.SyntaxKind.JSDocTypedefTag:
            return [(declaration as ts.JSDocTypedefTag), (declaration as ts.JSDocTypedefTag).parent];
        default:
            return ts.getJSDocCommentsAndTags(declaration);
    }
}

export function getJsDocTagsFromDeclarations(declarations?: ts.Declaration[], checker?: ts.TypeChecker): ts.JSDocTagInfo[] {
    // Only collect doc comments from duplicate declarations once.
    const infos: ts.JSDocTagInfo[] = [];
    ts.forEachUnique(declarations, declaration => {
        const tags = ts.getJSDocTags(declaration);
        // skip comments containing @typedefs since they're not associated with particular declarations
        // Exceptions:
        // - @param or @return indicate that the author thinks of it as a 'local' @typedef that's part of the function documentation
        if (tags.some(t => t.kind === ts.SyntaxKind.JSDocTypedefTag || t.kind === ts.SyntaxKind.JSDocCallbackTag)
            && !tags.some(t => t.kind === ts.SyntaxKind.JSDocParameterTag || t.kind === ts.SyntaxKind.JSDocReturnTag)) {
            return;
        }
        for (const tag of tags) {
            infos.push({ name: tag.tagName.text, text: getCommentDisplayParts(tag, checker) });
        }
    });
    return infos;
}

function getDisplayPartsFromComment(comment: string | readonly ts.JSDocComment[], checker: ts.TypeChecker | undefined): ts.SymbolDisplayPart[] {
    if (typeof comment === "string") {
        return [ts.textPart(comment)];
    }
    return ts.flatMap(
        comment,
        node => node.kind === ts.SyntaxKind.JSDocText ? [ts.textPart(node.text)] : ts.buildLinkParts(node, checker)
    ) as ts.SymbolDisplayPart[];
}

function getCommentDisplayParts(tag: ts.JSDocTag, checker?: ts.TypeChecker): ts.SymbolDisplayPart[] | undefined {
    const { comment, kind } = tag;
    const namePart = getTagNameDisplayPart(kind);
    switch (kind) {
        case ts.SyntaxKind.JSDocImplementsTag:
            return withNode((tag as ts.JSDocImplementsTag).class);
        case ts.SyntaxKind.JSDocAugmentsTag:
            return withNode((tag as ts.JSDocAugmentsTag).class);
        case ts.SyntaxKind.JSDocTemplateTag:
            const templateTag = tag as ts.JSDocTemplateTag;
            const displayParts: ts.SymbolDisplayPart[] = [];
            if (templateTag.constraint) {
                displayParts.push(ts.textPart(templateTag.constraint.getText()));
            }
            if (ts.length(templateTag.typeParameters)) {
                if (ts.length(displayParts)) {
                    displayParts.push(ts.spacePart());
                }
                const lastTypeParameter = templateTag.typeParameters[templateTag.typeParameters.length - 1];
                ts.forEach(templateTag.typeParameters, tp => {
                    displayParts.push(namePart(tp.getText()));
                    if (lastTypeParameter !== tp) {
                        displayParts.push(...[ts.punctuationPart(ts.SyntaxKind.CommaToken), ts.spacePart()]);
                    }
                });
            }
            if (comment) {
                displayParts.push(...[ts.spacePart(), ...getDisplayPartsFromComment(comment, checker)]);
            }
            return displayParts;
        case ts.SyntaxKind.JSDocTypeTag:
            return withNode((tag as ts.JSDocTypeTag).typeExpression);
        case ts.SyntaxKind.JSDocTypedefTag:
        case ts.SyntaxKind.JSDocCallbackTag:
        case ts.SyntaxKind.JSDocPropertyTag:
        case ts.SyntaxKind.JSDocParameterTag:
        case ts.SyntaxKind.JSDocSeeTag:
            const { name } = tag as ts.JSDocTypedefTag | ts.JSDocCallbackTag | ts.JSDocPropertyTag | ts.JSDocParameterTag | ts.JSDocSeeTag;
            return name ? withNode(name)
                : comment === undefined ? undefined
                : getDisplayPartsFromComment(comment, checker);
        default:
            return comment === undefined ? undefined : getDisplayPartsFromComment(comment, checker);
    }

    function withNode(node: ts.Node) {
        return addComment(node.getText());
    }

    function addComment(s: string) {
        if (comment) {
            if (s.match(/^https?$/)) {
                return [ts.textPart(s), ...getDisplayPartsFromComment(comment, checker)];
            }
            else {
                return [namePart(s), ts.spacePart(), ...getDisplayPartsFromComment(comment, checker)];
            }
        }
        else {
            return [ts.textPart(s)];
        }
    }
}

function getTagNameDisplayPart(kind: ts.SyntaxKind): (text: string) => ts.SymbolDisplayPart {
    switch (kind) {
        case ts.SyntaxKind.JSDocParameterTag:
            return ts.parameterNamePart;
        case ts.SyntaxKind.JSDocPropertyTag:
            return ts.propertyNamePart;
        case ts.SyntaxKind.JSDocTemplateTag:
            return ts.typeParameterNamePart;
        case ts.SyntaxKind.JSDocTypedefTag:
        case ts.SyntaxKind.JSDocCallbackTag:
            return ts.typeAliasNamePart;
        default:
            return ts.textPart;
    }
}

export function getJSDocTagNameCompletions(): ts.CompletionEntry[] {
    return jsDocTagNameCompletionEntries || (jsDocTagNameCompletionEntries = ts.map(jsDocTagNames, tagName => {
        return {
            name: tagName,
            kind: ts.ScriptElementKind.keyword,
            kindModifiers: "",
            sortText: ts.Completions.SortText.LocationPriority,
        };
    }));
}

export const getJSDocTagNameCompletionDetails = getJSDocTagCompletionDetails;

export function getJSDocTagCompletions(): ts.CompletionEntry[] {
    return jsDocTagCompletionEntries || (jsDocTagCompletionEntries = ts.map(jsDocTagNames, tagName => {
        return {
            name: `@${tagName}`,
            kind: ts.ScriptElementKind.keyword,
            kindModifiers: "",
            sortText: ts.Completions.SortText.LocationPriority
        };
    }));
}

export function getJSDocTagCompletionDetails(name: string): ts.CompletionEntryDetails {
    return {
        name,
        kind: ts.ScriptElementKind.unknown, // TODO: should have its own kind?
        kindModifiers: "",
        displayParts: [ts.textPart(name)],
        documentation: ts.emptyArray,
        tags: undefined,
        codeActions: undefined,
    };
}

export function getJSDocParameterNameCompletions(tag: ts.JSDocParameterTag): ts.CompletionEntry[] {
    if (!ts.isIdentifier(tag.name)) {
        return ts.emptyArray;
    }
    const nameThusFar = tag.name.text;
    const jsdoc = tag.parent;
    const fn = jsdoc.parent;
    if (!ts.isFunctionLike(fn)) return [];

    return ts.mapDefined(fn.parameters, param => {
        if (!ts.isIdentifier(param.name)) return undefined;

        const name = param.name.text;
        if (jsdoc.tags!.some(t => t !== tag && ts.isJSDocParameterTag(t) && ts.isIdentifier(t.name) && t.name.escapedText === name) // TODO: GH#18217
            || nameThusFar !== undefined && !ts.startsWith(name, nameThusFar)) {
            return undefined;
        }

        return { name, kind: ts.ScriptElementKind.parameterElement, kindModifiers: "", sortText: ts.Completions.SortText.LocationPriority };
    });
}

export function getJSDocParameterNameCompletionDetails(name: string): ts.CompletionEntryDetails {
    return {
        name,
        kind: ts.ScriptElementKind.parameterElement,
        kindModifiers: "",
        displayParts: [ts.textPart(name)],
        documentation: ts.emptyArray,
        tags: undefined,
        codeActions: undefined,
    };
}

/**
 * Checks if position points to a valid position to add JSDoc comments, and if so,
 * returns the appropriate template. Otherwise returns an empty string.
 * Valid positions are
 *      - outside of comments, statements, and expressions, and
 *      - preceding a:
 *          - function/constructor/method declaration
 *          - class declarations
 *          - variable statements
 *          - namespace declarations
 *          - interface declarations
 *          - method signatures
 *          - type alias declarations
 *
 * Hosts should ideally check that:
 * - The line is all whitespace up to 'position' before performing the insertion.
 * - If the keystroke sequence "/\*\*" induced the call, we also check that the next
 * non-whitespace character is '*', which (approximately) indicates whether we added
 * the second '*' to complete an existing (JSDoc) comment.
 * @param fileName The file in which to perform the check.
 * @param position The (character-indexed) position in the file where the check should
 * be performed.
 */
export function getDocCommentTemplateAtPosition(newLine: string, sourceFile: ts.SourceFile, position: number, options?: ts.DocCommentTemplateOptions): ts.TextInsertion | undefined {
    const tokenAtPos = ts.getTokenAtPosition(sourceFile, position);
    const existingDocComment = ts.findAncestor(tokenAtPos, ts.isJSDoc);
    if (existingDocComment && (existingDocComment.comment !== undefined || ts.length(existingDocComment.tags))) {
        // Non-empty comment already exists.
        return undefined;
    }

    const tokenStart = tokenAtPos.getStart(sourceFile);
    // Don't provide a doc comment template based on a *previous* node. (But an existing empty jsdoc comment will likely start before `position`.)
    if (!existingDocComment && tokenStart < position) {
        return undefined;
    }

    const commentOwnerInfo = getCommentOwnerInfo(tokenAtPos, options);
    if (!commentOwnerInfo) {
        return undefined;
    }

    const { commentOwner, parameters, hasReturn } = commentOwnerInfo;
    const commentOwnerJsDoc = ts.hasJSDocNodes(commentOwner) && commentOwner.jsDoc ? commentOwner.jsDoc : undefined;
    const lastJsDoc = ts.lastOrUndefined(commentOwnerJsDoc);
    if (commentOwner.getStart(sourceFile) < position
        || lastJsDoc
            && existingDocComment
            && lastJsDoc !== existingDocComment) {
        return undefined;
    }

    const indentationStr = getIndentationStringAtPosition(sourceFile, position);
    const isJavaScriptFile = ts.hasJSFileExtension(sourceFile.fileName);
    const tags =
        (parameters ? parameterDocComments(parameters || [], isJavaScriptFile, indentationStr, newLine) : "") +
        (hasReturn ? returnsDocComment(indentationStr, newLine) : "");

    // A doc comment consists of the following
    // * The opening comment line
    // * the first line (without a param) for the object's untagged info (this is also where the caret ends up)
    // * the '@param'-tagged lines
    // * the '@returns'-tag
    // * TODO: other tags.
    // * the closing comment line
    // * if the caret was directly in front of the object, then we add an extra line and indentation.
    const openComment = "/**";
    const closeComment = " */";

    // If any of the existing jsDoc has tags, ignore adding new ones.
    const hasTag = (commentOwnerJsDoc || []).some(jsDoc => !!jsDoc.tags);

    if (tags && !hasTag) {
        const preamble = openComment + newLine + indentationStr + " * ";
        const endLine = tokenStart === position ? newLine + indentationStr : "";
        const result = preamble + newLine + tags + indentationStr + closeComment + endLine;
        return { newText: result, caretOffset: preamble.length };
    }
    return { newText: openComment + closeComment, caretOffset: 3 };
}

function getIndentationStringAtPosition(sourceFile: ts.SourceFile, position: number): string {
    const { text } = sourceFile;
    const lineStart = ts.getLineStartPositionForPosition(position, sourceFile);
    let pos = lineStart;
    for (; pos <= position && ts.isWhiteSpaceSingleLine(text.charCodeAt(pos)); pos++);
    return text.slice(lineStart, pos);
}

function parameterDocComments(parameters: readonly ts.ParameterDeclaration[], isJavaScriptFile: boolean, indentationStr: string, newLine: string): string {
    return parameters.map(({ name, dotDotDotToken }, i) => {
        const paramName = name.kind === ts.SyntaxKind.Identifier ? name.text : "param" + i;
        const type = isJavaScriptFile ? (dotDotDotToken ? "{...any} " : "{any} ") : "";
        return `${indentationStr} * @param ${type}${paramName}${newLine}`;
    }).join("");
}

function returnsDocComment(indentationStr: string, newLine: string) {
    return `${indentationStr} * @returns${newLine}`;
}

interface CommentOwnerInfo {
    readonly commentOwner: ts.Node;
    readonly parameters?: readonly ts.ParameterDeclaration[];
    readonly hasReturn?: boolean;
}
function getCommentOwnerInfo(tokenAtPos: ts.Node, options: ts.DocCommentTemplateOptions | undefined): CommentOwnerInfo | undefined {
    return ts.forEachAncestor(tokenAtPos, n => getCommentOwnerInfoWorker(n, options));
}
function getCommentOwnerInfoWorker(commentOwner: ts.Node, options: ts.DocCommentTemplateOptions | undefined): CommentOwnerInfo | undefined | "quit" {
    switch (commentOwner.kind) {
        case ts.SyntaxKind.FunctionDeclaration:
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.Constructor:
        case ts.SyntaxKind.MethodSignature:
        case ts.SyntaxKind.ArrowFunction:
            const host = commentOwner as ts.ArrowFunction | ts.FunctionDeclaration | ts.MethodDeclaration | ts.ConstructorDeclaration | ts.MethodSignature;
            return { commentOwner, parameters: host.parameters, hasReturn: hasReturn(host, options) };

        case ts.SyntaxKind.PropertyAssignment:
            return getCommentOwnerInfoWorker((commentOwner as ts.PropertyAssignment).initializer, options);

        case ts.SyntaxKind.ClassDeclaration:
        case ts.SyntaxKind.InterfaceDeclaration:
        case ts.SyntaxKind.EnumDeclaration:
        case ts.SyntaxKind.EnumMember:
        case ts.SyntaxKind.TypeAliasDeclaration:
            return { commentOwner };

        case ts.SyntaxKind.PropertySignature: {
            const host = commentOwner as ts.PropertySignature;
            return host.type && ts.isFunctionTypeNode(host.type)
                ? { commentOwner, parameters: host.type.parameters, hasReturn: hasReturn(host.type, options) }
                : { commentOwner };
        }

        case ts.SyntaxKind.VariableStatement: {
            const varStatement = commentOwner as ts.VariableStatement;
            const varDeclarations = varStatement.declarationList.declarations;
            const host = varDeclarations.length === 1 && varDeclarations[0].initializer
                ? getRightHandSideOfAssignment(varDeclarations[0].initializer)
                : undefined;
            return host
                ? { commentOwner, parameters: host.parameters, hasReturn: hasReturn(host, options) }
                : { commentOwner };
        }

        case ts.SyntaxKind.SourceFile:
            return "quit";

        case ts.SyntaxKind.ModuleDeclaration:
            // If in walking up the tree, we hit a a nested namespace declaration,
            // then we must be somewhere within a dotted namespace name; however we don't
            // want to give back a JSDoc template for the 'b' or 'c' in 'namespace a.b.c { }'.
            return commentOwner.parent.kind === ts.SyntaxKind.ModuleDeclaration ? undefined : { commentOwner };

        case ts.SyntaxKind.ExpressionStatement:
            return getCommentOwnerInfoWorker((commentOwner as ts.ExpressionStatement).expression, options);
        case ts.SyntaxKind.BinaryExpression: {
            const be = commentOwner as ts.BinaryExpression;
            if (ts.getAssignmentDeclarationKind(be) === ts.AssignmentDeclarationKind.None) {
                return "quit";
            }
            return ts.isFunctionLike(be.right)
                ? { commentOwner, parameters: be.right.parameters, hasReturn: hasReturn(be.right, options) }
                : { commentOwner };
        }
        case ts.SyntaxKind.PropertyDeclaration:
            const init = (commentOwner as ts.PropertyDeclaration).initializer;
            if (init && (ts.isFunctionExpression(init) || ts.isArrowFunction(init))) {
                return { commentOwner, parameters: init.parameters, hasReturn: hasReturn(init, options) };
            }
    }
}

function hasReturn(node: ts.Node, options: ts.DocCommentTemplateOptions | undefined) {
    return !!options?.generateReturnInDocTemplate &&
        (ts.isFunctionTypeNode(node) || ts.isArrowFunction(node) && ts.isExpression(node.body)
            || ts.isFunctionLikeDeclaration(node) && node.body && ts.isBlock(node.body) && !!ts.forEachReturnStatement(node.body, n => n));
}

function getRightHandSideOfAssignment(rightHandSide: ts.Expression): ts.FunctionExpression | ts.ArrowFunction | ts.ConstructorDeclaration | undefined {
    while (rightHandSide.kind === ts.SyntaxKind.ParenthesizedExpression) {
        rightHandSide = (rightHandSide as ts.ParenthesizedExpression).expression;
    }

    switch (rightHandSide.kind) {
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.ArrowFunction:
            return (rightHandSide as ts.FunctionExpression);
        case ts.SyntaxKind.ClassExpression:
            return ts.find((rightHandSide as ts.ClassExpression).members, ts.isConstructorDeclaration);
    }
}
}
