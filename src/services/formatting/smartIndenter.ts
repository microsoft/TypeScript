import * as ts from "../_namespaces/ts";

/** @internal */
export namespace SmartIndenter {

    const enum Value {
        Unknown = -1
    }

    /**
     * @param assumeNewLineBeforeCloseBrace
     * `false` when called on text from a real source file.
     * `true` when we need to assume `position` is on a newline.
     *
     * This is useful for codefixes. Consider
     * ```
     * function f() {
     * |}
     * ```
     * with `position` at `|`.
     *
     * When inserting some text after an open brace, we would like to get indentation as if a newline was already there.
     * By default indentation at `position` will be 0 so 'assumeNewLineBeforeCloseBrace' overrides this behavior.
     */
    export function getIndentation(position: number, sourceFile: ts.SourceFile, options: ts.EditorSettings, assumeNewLineBeforeCloseBrace = false): number {
        if (position > sourceFile.text.length) {
            return getBaseIndentation(options); // past EOF
        }

        // no indentation when the indent style is set to none,
        // so we can return fast
        if (options.indentStyle === ts.IndentStyle.None) {
            return 0;
        }

        const precedingToken = ts.findPrecedingToken(position, sourceFile, /*startNode*/ undefined, /*excludeJsdoc*/ true);

        // eslint-disable-next-line no-null/no-null
        const enclosingCommentRange = ts.formatting.getRangeOfEnclosingComment(sourceFile, position, precedingToken || null);
        if (enclosingCommentRange && enclosingCommentRange.kind === ts.SyntaxKind.MultiLineCommentTrivia) {
            return getCommentIndent(sourceFile, position, options, enclosingCommentRange);
        }

        if (!precedingToken) {
            return getBaseIndentation(options);
        }

        // no indentation in string \regex\template literals
        const precedingTokenIsLiteral = ts.isStringOrRegularExpressionOrTemplateLiteral(precedingToken.kind);
        if (precedingTokenIsLiteral && precedingToken.getStart(sourceFile) <= position && position < precedingToken.end) {
            return 0;
        }

        const lineAtPosition = sourceFile.getLineAndCharacterOfPosition(position).line;

        // indentation is first non-whitespace character in a previous line
        // for block indentation, we should look for a line which contains something that's not
        // whitespace.
        const currentToken = ts.getTokenAtPosition(sourceFile, position);
        // For object literals, we want indentation to work just like with blocks.
        // If the `{` starts in any position (even in the middle of a line), then
        // the following indentation should treat `{` as the start of that line (including leading whitespace).
        // ```
        //     const a: { x: undefined, y: undefined } = {}       // leading 4 whitespaces and { starts in the middle of line
        // ->
        //     const a: { x: undefined, y: undefined } = {
        //         x: undefined,
        //         y: undefined,
        //     }
        // ---------------------
        //     const a: {x : undefined, y: undefined } =
        //      {}
        // ->
        //     const a: { x: undefined, y: undefined } =
        //      {                                                  // leading 5 whitespaces and { starts at 6 column
        //          x: undefined,
        //          y: undefined,
        //      }
        // ```
        const isObjectLiteral = currentToken.kind === ts.SyntaxKind.OpenBraceToken && currentToken.parent.kind === ts.SyntaxKind.ObjectLiteralExpression;
        if (options.indentStyle === ts.IndentStyle.Block || isObjectLiteral) {
            return getBlockIndent(sourceFile, position, options);
        }

        if (precedingToken.kind === ts.SyntaxKind.CommaToken && precedingToken.parent.kind !== ts.SyntaxKind.BinaryExpression) {
            // previous token is comma that separates items in list - find the previous item and try to derive indentation from it
            const actualIndentation = getActualIndentationForListItemBeforeComma(precedingToken, sourceFile, options);
            if (actualIndentation !== Value.Unknown) {
                return actualIndentation;
            }
        }

        const containerList = getListByPosition(position, precedingToken.parent, sourceFile);
        // use list position if the preceding token is before any list items
        if (containerList && !ts.rangeContainsRange(containerList, precedingToken)) {
            const useTheSameBaseIndentation = [ts.SyntaxKind.FunctionExpression, ts.SyntaxKind.ArrowFunction].indexOf(currentToken.parent.kind) !== -1;
            const indentSize = useTheSameBaseIndentation ? 0 : options.indentSize!;
            return getActualIndentationForListStartLine(containerList, sourceFile, options) + indentSize; // TODO: GH#18217
        }

        return getSmartIndent(sourceFile, position, precedingToken, lineAtPosition, assumeNewLineBeforeCloseBrace, options);
    }

    function getCommentIndent(sourceFile: ts.SourceFile, position: number, options: ts.EditorSettings, enclosingCommentRange: ts.CommentRange): number {
        const previousLine = ts.getLineAndCharacterOfPosition(sourceFile, position).line - 1;
        const commentStartLine = ts.getLineAndCharacterOfPosition(sourceFile, enclosingCommentRange.pos).line;

        ts.Debug.assert(commentStartLine >= 0);

        if (previousLine <= commentStartLine) {
            return findFirstNonWhitespaceColumn(ts.getStartPositionOfLine(commentStartLine, sourceFile), position, sourceFile, options);
        }

        const startPositionOfLine = ts.getStartPositionOfLine(previousLine, sourceFile);
        const { column, character } = findFirstNonWhitespaceCharacterAndColumn(startPositionOfLine, position, sourceFile, options);

        if (column === 0) {
            return column;
        }

        const firstNonWhitespaceCharacterCode = sourceFile.text.charCodeAt(startPositionOfLine + character);
        return firstNonWhitespaceCharacterCode === ts.CharacterCodes.asterisk ? column - 1 : column;
    }

    function getBlockIndent(sourceFile: ts.SourceFile, position: number, options: ts.EditorSettings): number {
        // move backwards until we find a line with a non-whitespace character,
        // then find the first non-whitespace character for that line.
        let current = position;
        while (current > 0) {
            const char = sourceFile.text.charCodeAt(current);
            if (!ts.isWhiteSpaceLike(char)) {
                break;
            }
            current--;
        }

        const lineStart = ts.getLineStartPositionForPosition(current, sourceFile);
        return findFirstNonWhitespaceColumn(lineStart, current, sourceFile, options);
    }

    function getSmartIndent(sourceFile: ts.SourceFile, position: number, precedingToken: ts.Node, lineAtPosition: number, assumeNewLineBeforeCloseBrace: boolean, options: ts.EditorSettings): number {
        // try to find node that can contribute to indentation and includes 'position' starting from 'precedingToken'
        // if such node is found - compute initial indentation for 'position' inside this node
        let previous: ts.Node | undefined;
        let current = precedingToken;

        while (current) {
            if (ts.positionBelongsToNode(current, position, sourceFile) && shouldIndentChildNode(options, current, previous, sourceFile, /*isNextChild*/ true)) {
                const currentStart = getStartLineAndCharacterForNode(current, sourceFile);
                const nextTokenKind = nextTokenIsCurlyBraceOnSameLineAsCursor(precedingToken, current, lineAtPosition, sourceFile);
                const indentationDelta = nextTokenKind !== NextTokenKind.Unknown
                    // handle cases when codefix is about to be inserted before the close brace
                    ? assumeNewLineBeforeCloseBrace && nextTokenKind === NextTokenKind.CloseBrace ? options.indentSize : 0
                    : lineAtPosition !== currentStart.line ? options.indentSize : 0;
                return getIndentationForNodeWorker(current, currentStart, /*ignoreActualIndentationRange*/ undefined, indentationDelta!, sourceFile, /*isNextChild*/ true, options); // TODO: GH#18217
            }

            // check if current node is a list item - if yes, take indentation from it
            // do not consider parent-child line sharing yet:
            // function foo(a
            //    | preceding node 'a' does share line with its parent but indentation is expected
            const actualIndentation = getActualIndentationForListItem(current, sourceFile, options, /*listIndentsChild*/ true);
            if (actualIndentation !== Value.Unknown) {
                return actualIndentation;
            }

            previous = current;
            current = current.parent;
        }
        // no parent was found - return the base indentation of the SourceFile
        return getBaseIndentation(options);
    }

    export function getIndentationForNode(n: ts.Node, ignoreActualIndentationRange: ts.TextRange, sourceFile: ts.SourceFile, options: ts.EditorSettings): number {
        const start = sourceFile.getLineAndCharacterOfPosition(n.getStart(sourceFile));
        return getIndentationForNodeWorker(n, start, ignoreActualIndentationRange, /*indentationDelta*/ 0, sourceFile, /*isNextChild*/ false, options);
    }

    export function getBaseIndentation(options: ts.EditorSettings) {
        return options.baseIndentSize || 0;
    }

    function getIndentationForNodeWorker(
        current: ts.Node,
        currentStart: ts.LineAndCharacter,
        ignoreActualIndentationRange: ts.TextRange | undefined,
        indentationDelta: number,
        sourceFile: ts.SourceFile,
        isNextChild: boolean,
        options: ts.EditorSettings): number {
        let parent = current.parent;

        // Walk up the tree and collect indentation for parent-child node pairs. Indentation is not added if
        // * parent and child nodes start on the same line, or
        // * parent is an IfStatement and child starts on the same line as an 'else clause'.
        while (parent) {
            let useActualIndentation = true;
            if (ignoreActualIndentationRange) {
                const start = current.getStart(sourceFile);
                useActualIndentation = start < ignoreActualIndentationRange.pos || start > ignoreActualIndentationRange.end;
            }

            const containingListOrParentStart = getContainingListOrParentStart(parent, current, sourceFile);
            const parentAndChildShareLine =
                containingListOrParentStart.line === currentStart.line ||
                childStartsOnTheSameLineWithElseInIfStatement(parent, current, currentStart.line, sourceFile);

            if (useActualIndentation) {
                // check if current node is a list item - if yes, take indentation from it
                const firstListChild = getContainingList(current, sourceFile)?.[0];
                // A list indents its children if the children begin on a later line than the list itself:
                //
                // f1(               L0 - List start
                //   {               L1 - First child start: indented, along with all other children
                //     prop: 0
                //   },
                //   {
                //     prop: 1
                //   }
                // )
                //
                // f2({             L0 - List start and first child start: children are not indented.
                //   prop: 0             Object properties are indented only one level, because the list
                // }, {                  itself contributes nothing.
                //   prop: 1        L3 - The indentation of the second object literal is best understood by
                // })                    looking at the relationship between the list and *first* list item.
                const listIndentsChild = !!firstListChild && getStartLineAndCharacterForNode(firstListChild, sourceFile).line > containingListOrParentStart.line;
                let actualIndentation = getActualIndentationForListItem(current, sourceFile, options, listIndentsChild);
                if (actualIndentation !== Value.Unknown) {
                    return actualIndentation + indentationDelta;
                }

                // try to fetch actual indentation for current node from source text
                actualIndentation = getActualIndentationForNode(current, parent, currentStart, parentAndChildShareLine, sourceFile, options);
                if (actualIndentation !== Value.Unknown) {
                    return actualIndentation + indentationDelta;
                }
            }

            // increase indentation if parent node wants its content to be indented and parent and child nodes don't start on the same line
            if (shouldIndentChildNode(options, parent, current, sourceFile, isNextChild) && !parentAndChildShareLine) {
                indentationDelta += options.indentSize!;
            }

            // In our AST, a call argument's `parent` is the call-expression, not the argument list.
            // We would like to increase indentation based on the relationship between an argument and its argument-list,
            // so we spoof the starting position of the (parent) call-expression to match the (non-parent) argument-list.
            // But, the spoofed start-value could then cause a problem when comparing the start position of the call-expression
            // to *its* parent (in the case of an iife, an expression statement), adding an extra level of indentation.
            //
            // Instead, when at an argument, we unspoof the starting position of the enclosing call expression
            // *after* applying indentation for the argument.

            const useTrueStart =
                isArgumentAndStartLineOverlapsExpressionBeingCalled(parent, current, currentStart.line, sourceFile);

            current = parent;
            parent = current.parent;
            currentStart = useTrueStart ? sourceFile.getLineAndCharacterOfPosition(current.getStart(sourceFile)) : containingListOrParentStart;
        }

        return indentationDelta + getBaseIndentation(options);
    }

    function getContainingListOrParentStart(parent: ts.Node, child: ts.Node, sourceFile: ts.SourceFile): ts.LineAndCharacter {
        const containingList = getContainingList(child, sourceFile);
        const startPos = containingList ? containingList.pos : parent.getStart(sourceFile);
        return sourceFile.getLineAndCharacterOfPosition(startPos);
    }

    /*
     * Function returns Value.Unknown if indentation cannot be determined
     */
    function getActualIndentationForListItemBeforeComma(commaToken: ts.Node, sourceFile: ts.SourceFile, options: ts.EditorSettings): number {
        // previous token is comma that separates items in list - find the previous item and try to derive indentation from it
        const commaItemInfo = ts.findListItemInfo(commaToken);
        if (commaItemInfo && commaItemInfo.listItemIndex > 0) {
            return deriveActualIndentationFromList(commaItemInfo.list.getChildren(), commaItemInfo.listItemIndex - 1, sourceFile, options);
        }
        else {
            // handle broken code gracefully
            return Value.Unknown;
        }
    }

    /*
     * Function returns Value.Unknown if actual indentation for node should not be used (i.e because node is nested expression)
     */
    function getActualIndentationForNode(current: ts.Node,
        parent: ts.Node,
        currentLineAndChar: ts.LineAndCharacter,
        parentAndChildShareLine: boolean,
        sourceFile: ts.SourceFile,
        options: ts.EditorSettings): number {

        // actual indentation is used for statements\declarations if one of cases below is true:
        // - parent is SourceFile - by default immediate children of SourceFile are not indented except when user indents them manually
        // - parent and child are not on the same line
        const useActualIndentation =
            (ts.isDeclaration(current) || ts.isStatementButNotDeclaration(current)) &&
            (parent.kind === ts.SyntaxKind.SourceFile || !parentAndChildShareLine);

        if (!useActualIndentation) {
            return Value.Unknown;
        }

        return findColumnForFirstNonWhitespaceCharacterInLine(currentLineAndChar, sourceFile, options);
    }

    const enum NextTokenKind {
        Unknown,
        OpenBrace,
        CloseBrace
    }

    function nextTokenIsCurlyBraceOnSameLineAsCursor(precedingToken: ts.Node, current: ts.Node, lineAtPosition: number, sourceFile: ts.SourceFile): NextTokenKind {
        const nextToken = ts.findNextToken(precedingToken, current, sourceFile);
        if (!nextToken) {
            return NextTokenKind.Unknown;
        }

        if (nextToken.kind === ts.SyntaxKind.OpenBraceToken) {
            // open braces are always indented at the parent level
            return NextTokenKind.OpenBrace;
        }
        else if (nextToken.kind === ts.SyntaxKind.CloseBraceToken) {
            // close braces are indented at the parent level if they are located on the same line with cursor
            // this means that if new line will be added at $ position, this case will be indented
            // class A {
            //    $
            // }
            /// and this one - not
            // class A {
            // $}

            const nextTokenStartLine = getStartLineAndCharacterForNode(nextToken, sourceFile).line;
            return lineAtPosition === nextTokenStartLine ? NextTokenKind.CloseBrace : NextTokenKind.Unknown;
        }

        return NextTokenKind.Unknown;
    }

    function getStartLineAndCharacterForNode(n: ts.Node, sourceFile: ts.SourceFileLike): ts.LineAndCharacter {
        return sourceFile.getLineAndCharacterOfPosition(n.getStart(sourceFile));
    }

    export function isArgumentAndStartLineOverlapsExpressionBeingCalled(parent: ts.Node, child: ts.Node, childStartLine: number, sourceFile: ts.SourceFileLike): boolean {
        if (!(ts.isCallExpression(parent) && ts.contains(parent.arguments, child))) {
            return false;
        }

        const expressionOfCallExpressionEnd = parent.expression.getEnd();
        const expressionOfCallExpressionEndLine = ts.getLineAndCharacterOfPosition(sourceFile, expressionOfCallExpressionEnd).line;
        return expressionOfCallExpressionEndLine === childStartLine;
    }

    export function childStartsOnTheSameLineWithElseInIfStatement(parent: ts.Node, child: ts.formatting.TextRangeWithKind, childStartLine: number, sourceFile: ts.SourceFileLike): boolean {
        if (parent.kind === ts.SyntaxKind.IfStatement && (parent as ts.IfStatement).elseStatement === child) {
            const elseKeyword = ts.findChildOfKind(parent, ts.SyntaxKind.ElseKeyword, sourceFile)!;
            ts.Debug.assert(elseKeyword !== undefined);

            const elseKeywordStartLine = getStartLineAndCharacterForNode(elseKeyword, sourceFile).line;
            return elseKeywordStartLine === childStartLine;
        }

        return false;
    }

    // A multiline conditional typically increases the indentation of its whenTrue and whenFalse children:
    //
    // condition
    //   ? whenTrue
    //   : whenFalse;
    //
    // However, that indentation does not apply if the subexpressions themselves span multiple lines,
    // applying their own indentation:
    //
    // (() => {
    //   return complexCalculationForCondition();
    // })() ? {
    //   whenTrue: 'multiline object literal'
    // } : (
    //   whenFalse('multiline parenthesized expression')
    // );
    //
    // In these cases, we must discard the indentation increase that would otherwise be applied to the
    // whenTrue and whenFalse children to avoid double-indenting their contents. To identify this scenario,
    // we check for the whenTrue branch beginning on the line that the condition ends, and the whenFalse
    // branch beginning on the line that the whenTrue branch ends.
    export function childIsUnindentedBranchOfConditionalExpression(parent: ts.Node, child: ts.formatting.TextRangeWithKind, childStartLine: number, sourceFile: ts.SourceFileLike): boolean {
        if (ts.isConditionalExpression(parent) && (child === parent.whenTrue || child === parent.whenFalse)) {
            const conditionEndLine = ts.getLineAndCharacterOfPosition(sourceFile, parent.condition.end).line;
            if (child === parent.whenTrue) {
                return childStartLine === conditionEndLine;
            }
            else {
                // On the whenFalse side, we have to look at the whenTrue side, because if that one was
                // indented, whenFalse must also be indented:
                //
                // const y = true
                //   ? 1 : (          L1: whenTrue indented because it's on a new line
                //     0              L2: indented two stops, one because whenTrue was indented
                //   );                   and one because of the parentheses spanning multiple lines
                const trueStartLine = getStartLineAndCharacterForNode(parent.whenTrue, sourceFile).line;
                const trueEndLine = ts.getLineAndCharacterOfPosition(sourceFile, parent.whenTrue.end).line;
                return conditionEndLine === trueStartLine && trueEndLine === childStartLine;
            }
        }
        return false;
    }

    export function argumentStartsOnSameLineAsPreviousArgument(parent: ts.Node, child: ts.formatting.TextRangeWithKind, childStartLine: number, sourceFile: ts.SourceFileLike): boolean {
        if (ts.isCallOrNewExpression(parent)) {
            if (!parent.arguments) return false;
            const currentNode = ts.find(parent.arguments, arg => arg.pos === child.pos);
            // If it's not one of the arguments, don't look past this
            if (!currentNode) return false;
            const currentIndex = parent.arguments.indexOf(currentNode);
            if (currentIndex === 0) return false; // Can't look at previous node if first

            const previousNode = parent.arguments[currentIndex - 1];
            const lineOfPreviousNode = ts.getLineAndCharacterOfPosition(sourceFile, previousNode.getEnd()).line;

            if (childStartLine === lineOfPreviousNode) {
                return true;
            }
        }

        return false;
    }

    export function getContainingList(node: ts.Node, sourceFile: ts.SourceFile): ts.NodeArray<ts.Node> | undefined {
        return node.parent && getListByRange(node.getStart(sourceFile), node.getEnd(), node.parent, sourceFile);
    }

    function getListByPosition(pos: number, node: ts.Node, sourceFile: ts.SourceFile): ts.NodeArray<ts.Node> | undefined {
        return node && getListByRange(pos, pos, node, sourceFile);
    }

    function getListByRange(start: number, end: number, node: ts.Node, sourceFile: ts.SourceFile): ts.NodeArray<ts.Node> | undefined {
        switch (node.kind) {
            case ts.SyntaxKind.TypeReference:
                return getList((node as ts.TypeReferenceNode).typeArguments);
            case ts.SyntaxKind.ObjectLiteralExpression:
                return getList((node as ts.ObjectLiteralExpression).properties);
            case ts.SyntaxKind.ArrayLiteralExpression:
                return getList((node as ts.ArrayLiteralExpression).elements);
            case ts.SyntaxKind.TypeLiteral:
                return getList((node as ts.TypeLiteralNode).members);
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.ArrowFunction:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.MethodSignature:
            case ts.SyntaxKind.CallSignature:
            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.ConstructorType:
            case ts.SyntaxKind.ConstructSignature:
                return getList((node as ts.SignatureDeclaration).typeParameters) || getList((node as ts.SignatureDeclaration).parameters);
            case ts.SyntaxKind.GetAccessor:
                return getList((node as ts.GetAccessorDeclaration).parameters);
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.ClassExpression:
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.TypeAliasDeclaration:
            case ts.SyntaxKind.JSDocTemplateTag:
                return getList((node as ts.ClassDeclaration | ts.ClassExpression | ts.InterfaceDeclaration | ts.TypeAliasDeclaration | ts.JSDocTemplateTag).typeParameters);
            case ts.SyntaxKind.NewExpression:
            case ts.SyntaxKind.CallExpression:
                return getList((node as ts.CallExpression).typeArguments) || getList((node as ts.CallExpression).arguments);
            case ts.SyntaxKind.VariableDeclarationList:
                return getList((node as ts.VariableDeclarationList).declarations);
            case ts.SyntaxKind.NamedImports:
            case ts.SyntaxKind.NamedExports:
                return getList((node as ts.NamedImportsOrExports).elements);
            case ts.SyntaxKind.ObjectBindingPattern:
            case ts.SyntaxKind.ArrayBindingPattern:
                return getList((node as ts.ObjectBindingPattern | ts.ArrayBindingPattern).elements);
        }

        function getList(list: ts.NodeArray<ts.Node> | undefined): ts.NodeArray<ts.Node> | undefined {
            return list && ts.rangeContainsStartEnd(getVisualListRange(node, list, sourceFile), start, end) ? list : undefined;
        }
    }

    function getVisualListRange(node: ts.Node, list: ts.TextRange, sourceFile: ts.SourceFile): ts.TextRange {
        const children = node.getChildren(sourceFile);
        for (let i = 1; i < children.length - 1; i++) {
            if (children[i].pos === list.pos && children[i].end === list.end) {
                return { pos: children[i - 1].end, end: children[i + 1].getStart(sourceFile) };
            }
        }
        return list;
    }

    function getActualIndentationForListStartLine(list: ts.NodeArray<ts.Node>, sourceFile: ts.SourceFile, options: ts.EditorSettings): number {
        if (!list) {
            return Value.Unknown;
        }
        return findColumnForFirstNonWhitespaceCharacterInLine(sourceFile.getLineAndCharacterOfPosition(list.pos), sourceFile, options);
    }

    function getActualIndentationForListItem(node: ts.Node, sourceFile: ts.SourceFile, options: ts.EditorSettings, listIndentsChild: boolean): number {
        if (node.parent && node.parent.kind === ts.SyntaxKind.VariableDeclarationList) {
            // VariableDeclarationList has no wrapping tokens
            return Value.Unknown;
        }
        const containingList = getContainingList(node, sourceFile);
        if (containingList) {
            const index = containingList.indexOf(node);
            if (index !== -1) {
                const result = deriveActualIndentationFromList(containingList, index, sourceFile, options);
                if (result !== Value.Unknown) {
                    return result;
                }
            }
            return getActualIndentationForListStartLine(containingList, sourceFile, options) + (listIndentsChild ? options.indentSize! : 0); // TODO: GH#18217
        }
        return Value.Unknown;
    }

    function deriveActualIndentationFromList(list: readonly ts.Node[], index: number, sourceFile: ts.SourceFile, options: ts.EditorSettings): number {
        ts.Debug.assert(index >= 0 && index < list.length);
        const node = list[index];

        // walk toward the start of the list starting from current node and check if the line is the same for all items.
        // if end line for item [i - 1] differs from the start line for item [i] - find column of the first non-whitespace character on the line of item [i]
        let lineAndCharacter = getStartLineAndCharacterForNode(node, sourceFile);
        for (let i = index - 1; i >= 0; i--) {
            if (list[i].kind === ts.SyntaxKind.CommaToken) {
                continue;
            }
            // skip list items that ends on the same line with the current list element
            const prevEndLine = sourceFile.getLineAndCharacterOfPosition(list[i].end).line;
            if (prevEndLine !== lineAndCharacter.line) {
                return findColumnForFirstNonWhitespaceCharacterInLine(lineAndCharacter, sourceFile, options);
            }

            lineAndCharacter = getStartLineAndCharacterForNode(list[i], sourceFile);
        }
        return Value.Unknown;
    }

    function findColumnForFirstNonWhitespaceCharacterInLine(lineAndCharacter: ts.LineAndCharacter, sourceFile: ts.SourceFile, options: ts.EditorSettings): number {
        const lineStart = sourceFile.getPositionOfLineAndCharacter(lineAndCharacter.line, 0);
        return findFirstNonWhitespaceColumn(lineStart, lineStart + lineAndCharacter.character, sourceFile, options);
    }

    /**
     * Character is the actual index of the character since the beginning of the line.
     * Column - position of the character after expanding tabs to spaces.
     * "0\t2$"
     * value of 'character' for '$' is 3
     * value of 'column' for '$' is 6 (assuming that tab size is 4)
     */
    export function findFirstNonWhitespaceCharacterAndColumn(startPos: number, endPos: number, sourceFile: ts.SourceFileLike, options: ts.EditorSettings) {
        let character = 0;
        let column = 0;
        for (let pos = startPos; pos < endPos; pos++) {
            const ch = sourceFile.text.charCodeAt(pos);
            if (!ts.isWhiteSpaceSingleLine(ch)) {
                break;
            }

            if (ch === ts.CharacterCodes.tab) {
                column += options.tabSize! + (column % options.tabSize!);
            }
            else {
                column++;
            }

            character++;
        }
        return { column, character };
    }

    export function findFirstNonWhitespaceColumn(startPos: number, endPos: number, sourceFile: ts.SourceFileLike, options: ts.EditorSettings): number {
        return findFirstNonWhitespaceCharacterAndColumn(startPos, endPos, sourceFile, options).column;
    }

    export function nodeWillIndentChild(settings: ts.FormatCodeSettings, parent: ts.formatting.TextRangeWithKind, child: ts.formatting.TextRangeWithKind | undefined, sourceFile: ts.SourceFileLike | undefined, indentByDefault: boolean): boolean {
        const childKind = child ? child.kind : ts.SyntaxKind.Unknown;

        switch (parent.kind) {
            case ts.SyntaxKind.ExpressionStatement:
            case ts.SyntaxKind.ClassDeclaration:
            case ts.SyntaxKind.ClassExpression:
            case ts.SyntaxKind.InterfaceDeclaration:
            case ts.SyntaxKind.EnumDeclaration:
            case ts.SyntaxKind.TypeAliasDeclaration:
            case ts.SyntaxKind.ArrayLiteralExpression:
            case ts.SyntaxKind.Block:
            case ts.SyntaxKind.ModuleBlock:
            case ts.SyntaxKind.ObjectLiteralExpression:
            case ts.SyntaxKind.TypeLiteral:
            case ts.SyntaxKind.MappedType:
            case ts.SyntaxKind.TupleType:
            case ts.SyntaxKind.CaseBlock:
            case ts.SyntaxKind.DefaultClause:
            case ts.SyntaxKind.CaseClause:
            case ts.SyntaxKind.ParenthesizedExpression:
            case ts.SyntaxKind.PropertyAccessExpression:
            case ts.SyntaxKind.CallExpression:
            case ts.SyntaxKind.NewExpression:
            case ts.SyntaxKind.VariableStatement:
            case ts.SyntaxKind.ExportAssignment:
            case ts.SyntaxKind.ReturnStatement:
            case ts.SyntaxKind.ConditionalExpression:
            case ts.SyntaxKind.ArrayBindingPattern:
            case ts.SyntaxKind.ObjectBindingPattern:
            case ts.SyntaxKind.JsxOpeningElement:
            case ts.SyntaxKind.JsxOpeningFragment:
            case ts.SyntaxKind.JsxSelfClosingElement:
            case ts.SyntaxKind.JsxExpression:
            case ts.SyntaxKind.MethodSignature:
            case ts.SyntaxKind.CallSignature:
            case ts.SyntaxKind.ConstructSignature:
            case ts.SyntaxKind.Parameter:
            case ts.SyntaxKind.FunctionType:
            case ts.SyntaxKind.ConstructorType:
            case ts.SyntaxKind.ParenthesizedType:
            case ts.SyntaxKind.TaggedTemplateExpression:
            case ts.SyntaxKind.AwaitExpression:
            case ts.SyntaxKind.NamedExports:
            case ts.SyntaxKind.NamedImports:
            case ts.SyntaxKind.ExportSpecifier:
            case ts.SyntaxKind.ImportSpecifier:
            case ts.SyntaxKind.PropertyDeclaration:
                return true;
            case ts.SyntaxKind.VariableDeclaration:
            case ts.SyntaxKind.PropertyAssignment:
            case ts.SyntaxKind.BinaryExpression:
                if (!settings.indentMultiLineObjectLiteralBeginningOnBlankLine && sourceFile && childKind === ts.SyntaxKind.ObjectLiteralExpression) { // TODO: GH#18217
                    return rangeIsOnOneLine(sourceFile, child!);
                }
                if (parent.kind === ts.SyntaxKind.BinaryExpression && sourceFile && child && childKind === ts.SyntaxKind.JsxElement) {
                    const parentStartLine = sourceFile.getLineAndCharacterOfPosition(ts.skipTrivia(sourceFile.text, parent.pos)).line;
                    const childStartLine = sourceFile.getLineAndCharacterOfPosition(ts.skipTrivia(sourceFile.text, child.pos)).line;
                    return parentStartLine !== childStartLine;
                }
                if (parent.kind !== ts.SyntaxKind.BinaryExpression) {
                    return true;
                }
                break;
            case ts.SyntaxKind.DoStatement:
            case ts.SyntaxKind.WhileStatement:
            case ts.SyntaxKind.ForInStatement:
            case ts.SyntaxKind.ForOfStatement:
            case ts.SyntaxKind.ForStatement:
            case ts.SyntaxKind.IfStatement:
            case ts.SyntaxKind.FunctionDeclaration:
            case ts.SyntaxKind.FunctionExpression:
            case ts.SyntaxKind.MethodDeclaration:
            case ts.SyntaxKind.Constructor:
            case ts.SyntaxKind.GetAccessor:
            case ts.SyntaxKind.SetAccessor:
                return childKind !== ts.SyntaxKind.Block;
            case ts.SyntaxKind.ArrowFunction:
                if (sourceFile && childKind === ts.SyntaxKind.ParenthesizedExpression) {
                    return rangeIsOnOneLine(sourceFile, child!);
                }
                return childKind !== ts.SyntaxKind.Block;
            case ts.SyntaxKind.ExportDeclaration:
                return childKind !== ts.SyntaxKind.NamedExports;
            case ts.SyntaxKind.ImportDeclaration:
                return childKind !== ts.SyntaxKind.ImportClause ||
                    (!!(child as ts.ImportClause).namedBindings && (child as ts.ImportClause).namedBindings!.kind !== ts.SyntaxKind.NamedImports);
            case ts.SyntaxKind.JsxElement:
                return childKind !== ts.SyntaxKind.JsxClosingElement;
            case ts.SyntaxKind.JsxFragment:
                return childKind !== ts.SyntaxKind.JsxClosingFragment;
            case ts.SyntaxKind.IntersectionType:
            case ts.SyntaxKind.UnionType:
                if (childKind === ts.SyntaxKind.TypeLiteral || childKind === ts.SyntaxKind.TupleType) {
                    return false;
                }
                break;
        }
        // No explicit rule for given nodes so the result will follow the default value argument
        return indentByDefault;
    }

    function isControlFlowEndingStatement(kind: ts.SyntaxKind, parent: ts.formatting.TextRangeWithKind): boolean {
        switch (kind) {
            case ts.SyntaxKind.ReturnStatement:
            case ts.SyntaxKind.ThrowStatement:
            case ts.SyntaxKind.ContinueStatement:
            case ts.SyntaxKind.BreakStatement:
                return parent.kind !== ts.SyntaxKind.Block;
            default:
                return false;
        }
    }

    /**
     * True when the parent node should indent the given child by an explicit rule.
     * @param isNextChild If true, we are judging indent of a hypothetical child *after* this one, not the current child.
     */
    export function shouldIndentChildNode(settings: ts.FormatCodeSettings, parent: ts.formatting.TextRangeWithKind, child?: ts.Node, sourceFile?: ts.SourceFileLike, isNextChild = false): boolean {
        return nodeWillIndentChild(settings, parent, child, sourceFile, /*indentByDefault*/ false)
            && !(isNextChild && child && isControlFlowEndingStatement(child.kind, parent));
    }

    function rangeIsOnOneLine(sourceFile: ts.SourceFileLike, range: ts.formatting.TextRangeWithKind) {
        const rangeStart = ts.skipTrivia(sourceFile.text, range.pos);
        const startLine = sourceFile.getLineAndCharacterOfPosition(rangeStart).line;
        const endLine = sourceFile.getLineAndCharacterOfPosition(range.end).line;
        return startLine === endLine;
    }
}
