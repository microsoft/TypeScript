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
    let jsDocTagNameCompletionEntries: CompletionEntry[];
    let jsDocTagCompletionEntries: CompletionEntry[];

    export function getJsDocCommentsFromDeclarations(declarations: readonly Declaration[]): SymbolDisplayPart[] {
        // Only collect doc comments from duplicate declarations once:
        // In case of a union property there might be same declaration multiple times
        // which only varies in type parameter
        // Eg. const a: Array<string> | Array<number>; a.length
        // The property length will have two declarations of property length coming
        // from Array<T> - Array<string> and Array<number>
        const documentationComment: string[] = [];
        forEachUnique(declarations, declaration => {
            for (const { comment } of getCommentHavingNodes(declaration)) {
                if (comment === undefined) continue;
                pushIfUnique(documentationComment, comment);
            }
        });
        return intersperse(map(documentationComment, textPart), lineBreakPart());
    }

    function getCommentHavingNodes(declaration: Declaration): readonly (JSDoc | JSDocTag)[] {
        switch (declaration.kind) {
            case SyntaxKind.JSDocParameterTag:
            case SyntaxKind.JSDocPropertyTag:
                return [declaration as JSDocPropertyTag];
            case SyntaxKind.JSDocCallbackTag:
            case SyntaxKind.JSDocTypedefTag:
                return [(declaration as JSDocTypedefTag), (declaration as JSDocTypedefTag).parent];
            default:
                return getJSDocCommentsAndTags(declaration);
        }
    }

    export function getJsDocTagsFromDeclarations(declarations?: Declaration[]): JSDocTagInfo[] {
        // Only collect doc comments from duplicate declarations once.
        const tags: JSDocTagInfo[] = [];
        forEachUnique(declarations, declaration => {
            for (const tag of getJSDocTags(declaration)) {
                tags.push({ name: tag.tagName.text, text: getCommentText(tag) });
            }
        });
        return tags;
    }

    function getCommentText(tag: JSDocTag): string | undefined {
        const { comment } = tag;
        switch (tag.kind) {
            case SyntaxKind.JSDocImplementsTag:
                return withNode((tag as JSDocImplementsTag).class);
            case SyntaxKind.JSDocAugmentsTag:
                return withNode((tag as JSDocAugmentsTag).class);
            case SyntaxKind.JSDocTemplateTag:
                return withList((tag as JSDocTemplateTag).typeParameters);
            case SyntaxKind.JSDocTypeTag:
                return withNode((tag as JSDocTypeTag).typeExpression);
            case SyntaxKind.JSDocTypedefTag:
            case SyntaxKind.JSDocCallbackTag:
            case SyntaxKind.JSDocPropertyTag:
            case SyntaxKind.JSDocParameterTag:
                const { name } = tag as JSDocTypedefTag | JSDocPropertyTag | JSDocParameterTag;
                return name ? withNode(name) : comment;
            default:
                return comment;
        }

        function withNode(node: Node) {
            return addComment(node.getText());
        }

        function withList(list: NodeArray<Node>): string {
            return addComment(list.map(x => x.getText()).join(", "));
        }

        function addComment(s: string) {
            return comment === undefined ? s : `${s} ${comment}`;
        }
    }

    export function getJSDocTagNameCompletions(): CompletionEntry[] {
        return jsDocTagNameCompletionEntries || (jsDocTagNameCompletionEntries = map(jsDocTagNames, tagName => {
            return {
                name: tagName,
                kind: ScriptElementKind.keyword,
                kindModifiers: "",
                sortText: "0",
            };
        }));
    }

    export const getJSDocTagNameCompletionDetails = getJSDocTagCompletionDetails;

    export function getJSDocTagCompletions(): CompletionEntry[] {
        return jsDocTagCompletionEntries || (jsDocTagCompletionEntries = map(jsDocTagNames, tagName => {
            return {
                name: `@${tagName}`,
                kind: ScriptElementKind.keyword,
                kindModifiers: "",
                sortText: "0"
            };
        }));
    }

    export function getJSDocTagCompletionDetails(name: string): CompletionEntryDetails {
        return {
            name,
            kind: ScriptElementKind.unknown, // TODO: should have its own kind?
            kindModifiers: "",
            displayParts: [textPart(name)],
            documentation: emptyArray,
            tags: undefined,
            codeActions: undefined,
        };
    }

    export function getJSDocParameterNameCompletions(tag: JSDocParameterTag): CompletionEntry[] {
        if (!isIdentifier(tag.name)) {
            return emptyArray;
        }
        const nameThusFar = tag.name.text;
        const jsdoc = tag.parent;
        const fn = jsdoc.parent;
        if (!isFunctionLike(fn)) return [];

        return mapDefined(fn.parameters, param => {
            if (!isIdentifier(param.name)) return undefined;

            const name = param.name.text;
            if (jsdoc.tags!.some(t => t !== tag && isJSDocParameterTag(t) && isIdentifier(t.name) && t.name.escapedText === name) // TODO: GH#18217
                || nameThusFar !== undefined && !startsWith(name, nameThusFar)) {
                return undefined;
            }

            return { name, kind: ScriptElementKind.parameterElement, kindModifiers: "", sortText: "0" };
        });
    }

    export function getJSDocParameterNameCompletionDetails(name: string): CompletionEntryDetails {
        return {
            name,
            kind: ScriptElementKind.parameterElement,
            kindModifiers: "",
            displayParts: [textPart(name)],
            documentation: emptyArray,
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
    export function getDocCommentTemplateAtPosition(newLine: string, sourceFile: SourceFile, position: number): TextInsertion | undefined {
        const tokenAtPos = getTokenAtPosition(sourceFile, position);
        const existingDocComment = findAncestor(tokenAtPos, isJSDoc);
        if (existingDocComment && (existingDocComment.comment !== undefined || length(existingDocComment.tags))) {
            // Non-empty comment already exists.
            return undefined;
        }

        const tokenStart = tokenAtPos.getStart(sourceFile);
        // Don't provide a doc comment template based on a *previous* node. (But an existing empty jsdoc comment will likely start before `position`.)
        if (!existingDocComment && tokenStart < position) {
            return undefined;
        }

        const commentOwnerInfo = getCommentOwnerInfo(tokenAtPos);
        if (!commentOwnerInfo) {
            return undefined;
        }
        const { commentOwner, parameters } = commentOwnerInfo;
        if (commentOwner.getStart(sourceFile) < position) {
            return undefined;
        }

        if (!parameters || parameters.length === 0) {
            // if there are no parameters, just complete to a single line JSDoc comment
            const singleLineResult = "/** */";
            return { newText: singleLineResult, caretOffset: 3 };
        }

        const indentationStr = getIndentationStringAtPosition(sourceFile, position);

        // A doc comment consists of the following
        // * The opening comment line
        // * the first line (without a param) for the object's untagged info (this is also where the caret ends up)
        // * the '@param'-tagged lines
        // * TODO: other tags.
        // * the closing comment line
        // * if the caret was directly in front of the object, then we add an extra line and indentation.
        const preamble = "/**" + newLine + indentationStr + " * ";
        const result =
            preamble + newLine +
            parameterDocComments(parameters, hasJSFileExtension(sourceFile.fileName), indentationStr, newLine) +
            indentationStr + " */" +
            (tokenStart === position ? newLine + indentationStr : "");

        return { newText: result, caretOffset: preamble.length };
    }

    function getIndentationStringAtPosition(sourceFile: SourceFile, position: number): string {
        const { text } = sourceFile;
        const lineStart = getLineStartPositionForPosition(position, sourceFile);
        let pos = lineStart;
        for (; pos <= position && isWhiteSpaceSingleLine(text.charCodeAt(pos)); pos++);
        return text.slice(lineStart, pos);
    }

    function parameterDocComments(parameters: readonly ParameterDeclaration[], isJavaScriptFile: boolean, indentationStr: string, newLine: string): string {
        return parameters.map(({ name, dotDotDotToken }, i) => {
            const paramName = name.kind === SyntaxKind.Identifier ? name.text : "param" + i;
            const type = isJavaScriptFile ? (dotDotDotToken ? "{...any} " : "{any} ") : "";
            return `${indentationStr} * @param ${type}${paramName}${newLine}`;
        }).join("");
    }

    interface CommentOwnerInfo {
        readonly commentOwner: Node;
        readonly parameters?: readonly ParameterDeclaration[];
    }
    function getCommentOwnerInfo(tokenAtPos: Node): CommentOwnerInfo | undefined {
        return forEachAncestor(tokenAtPos, getCommentOwnerInfoWorker);
    }
    function getCommentOwnerInfoWorker(commentOwner: Node): CommentOwnerInfo | undefined | "quit" {
        switch (commentOwner.kind) {
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.Constructor:
            case SyntaxKind.MethodSignature:
                const { parameters } = commentOwner as FunctionDeclaration | MethodDeclaration | ConstructorDeclaration | MethodSignature;
                return { commentOwner, parameters };

            case SyntaxKind.PropertyAssignment:
                return getCommentOwnerInfoWorker((commentOwner as PropertyAssignment).initializer);

            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.PropertySignature:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.EnumMember:
            case SyntaxKind.TypeAliasDeclaration:
                return { commentOwner };

            case SyntaxKind.VariableStatement: {
                const varStatement = <VariableStatement>commentOwner;
                const varDeclarations = varStatement.declarationList.declarations;
                const parameters = varDeclarations.length === 1 && varDeclarations[0].initializer
                    ? getParametersFromRightHandSideOfAssignment(varDeclarations[0].initializer)
                    : undefined;
                return { commentOwner, parameters };
            }

            case SyntaxKind.SourceFile:
                return "quit";

            case SyntaxKind.ModuleDeclaration:
                // If in walking up the tree, we hit a a nested namespace declaration,
                // then we must be somewhere within a dotted namespace name; however we don't
                // want to give back a JSDoc template for the 'b' or 'c' in 'namespace a.b.c { }'.
                return commentOwner.parent.kind === SyntaxKind.ModuleDeclaration ? undefined : { commentOwner };

            case SyntaxKind.ExpressionStatement:
                return getCommentOwnerInfoWorker((commentOwner as ExpressionStatement).expression);
            case SyntaxKind.BinaryExpression: {
                const be = commentOwner as BinaryExpression;
                if (getAssignmentDeclarationKind(be) === AssignmentDeclarationKind.None) {
                    return "quit";
                }
                const parameters = isFunctionLike(be.right) ? be.right.parameters : emptyArray;
                return { commentOwner, parameters };
            }
            case SyntaxKind.PropertyDeclaration:
                const init = (commentOwner as PropertyDeclaration).initializer;
                if (init && (isFunctionExpression(init) || isArrowFunction(init))) {
                    return { commentOwner, parameters: init.parameters };
                }
        }
    }

    /**
     * Digs into an an initializer or RHS operand of an assignment operation
     * to get the parameters of an apt signature corresponding to a
     * function expression or a class expression.
     *
     * @param rightHandSide the expression which may contain an appropriate set of parameters
     * @returns the parameters of a signature found on the RHS if one exists; otherwise 'emptyArray'.
     */
    function getParametersFromRightHandSideOfAssignment(rightHandSide: Expression): readonly ParameterDeclaration[] {
        while (rightHandSide.kind === SyntaxKind.ParenthesizedExpression) {
            rightHandSide = (<ParenthesizedExpression>rightHandSide).expression;
        }

        switch (rightHandSide.kind) {
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
                return (<FunctionExpression>rightHandSide).parameters;
            case SyntaxKind.ClassExpression: {
                const ctr = find((rightHandSide as ClassExpression).members, isConstructorDeclaration);
                return ctr ? ctr.parameters : emptyArray;
            }
        }

        return emptyArray;
    }
}
