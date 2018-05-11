/* @internal */
namespace ts.formatting {
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
        export function getIndentation(position: number, sourceFile: SourceFile, options: EditorSettings, assumeNewLineBeforeCloseBrace = false): number {
            if (position > sourceFile.text.length) {
                return getBaseIndentation(options); // past EOF
            }

            // no indentation when the indent style is set to none,
            // so we can return fast
            if (options.indentStyle === IndentStyle.None) {
                return 0;
            }

            const precedingToken = findPrecedingToken(position, sourceFile);

            const enclosingCommentRange = getRangeOfEnclosingComment(sourceFile, position, /*onlyMultiLine*/ true, precedingToken || null); // tslint:disable-line:no-null-keyword
            if (enclosingCommentRange) {
                return getCommentIndent(sourceFile, position, options, enclosingCommentRange);
            }

            if (!precedingToken) {
                return getBaseIndentation(options);
            }

            // no indentation in string \regex\template literals
            const precedingTokenIsLiteral = isStringOrRegularExpressionOrTemplateLiteral(precedingToken.kind);
            if (precedingTokenIsLiteral && precedingToken.getStart(sourceFile) <= position && position < precedingToken.end) {
                return 0;
            }

            const lineAtPosition = sourceFile.getLineAndCharacterOfPosition(position).line;

            // indentation is first non-whitespace character in a previous line
            // for block indentation, we should look for a line which contains something that's not
            // whitespace.
            if (options.indentStyle === IndentStyle.Block) {
                return getBlockIndent(sourceFile, position, options);
            }

            if (precedingToken.kind === SyntaxKind.CommaToken && precedingToken.parent.kind !== SyntaxKind.BinaryExpression) {
                // previous token is comma that separates items in list - find the previous item and try to derive indentation from it
                const actualIndentation = getActualIndentationForListItemBeforeComma(precedingToken, sourceFile, options);
                if (actualIndentation !== Value.Unknown) {
                    return actualIndentation;
                }
            }

            return getSmartIndent(sourceFile, position, precedingToken, lineAtPosition, assumeNewLineBeforeCloseBrace, options);
        }

        function getCommentIndent(sourceFile: SourceFile, position: number, options: EditorSettings, enclosingCommentRange: CommentRange): number {
            const previousLine = getLineAndCharacterOfPosition(sourceFile, position).line - 1;
            const commentStartLine = getLineAndCharacterOfPosition(sourceFile, enclosingCommentRange.pos).line;

            Debug.assert(commentStartLine >= 0);

            if (previousLine <= commentStartLine) {
                return findFirstNonWhitespaceColumn(getStartPositionOfLine(commentStartLine, sourceFile), position, sourceFile, options);
            }

            const startPostionOfLine = getStartPositionOfLine(previousLine, sourceFile);
            const { column, character } = findFirstNonWhitespaceCharacterAndColumn(startPostionOfLine, position, sourceFile, options);

            if (column === 0) {
                return column;
            }

            const firstNonWhitespaceCharacterCode = sourceFile.text.charCodeAt(startPostionOfLine + character);
            return firstNonWhitespaceCharacterCode === CharacterCodes.asterisk ? column - 1 : column;
        }

        function getBlockIndent(sourceFile: SourceFile, position: number, options: EditorSettings): number {
            // move backwards until we find a line with a non-whitespace character,
            // then find the first non-whitespace character for that line.
            let current = position;
            while (current > 0) {
                const char = sourceFile.text.charCodeAt(current);
                if (!isWhiteSpaceLike(char)) {
                    break;
                }
                current--;
            }

            const lineStart = getLineStartPositionForPosition(current, sourceFile);
            return findFirstNonWhitespaceColumn(lineStart, current, sourceFile, options);
        }

        function getSmartIndent(sourceFile: SourceFile, position: number, precedingToken: Node, lineAtPosition: number, assumeNewLineBeforeCloseBrace: boolean, options: EditorSettings): number {
            // try to find node that can contribute to indentation and includes 'position' starting from 'precedingToken'
            // if such node is found - compute initial indentation for 'position' inside this node
            let previous: Node | undefined;
            let current = precedingToken;
            while (current) {
                if (positionBelongsToNode(current, position, sourceFile) && shouldIndentChildNode(options, current, previous, sourceFile, /*isNextChild*/ true)) {
                    const currentStart = getStartLineAndCharacterForNode(current, sourceFile);
                    const nextTokenKind = nextTokenIsCurlyBraceOnSameLineAsCursor(precedingToken, current, lineAtPosition, sourceFile);
                    const indentationDelta = nextTokenKind !== NextTokenKind.Unknown
                        // handle cases when codefix is about to be inserted before the close brace
                        ? assumeNewLineBeforeCloseBrace && nextTokenKind === NextTokenKind.CloseBrace ? options.indentSize : 0
                        : lineAtPosition !== currentStart.line ? options.indentSize : 0;
                    return getIndentationForNodeWorker(current, currentStart, /*ignoreActualIndentationRange*/ undefined, indentationDelta, sourceFile, /*isNextChild*/ true, options);
                }

                // check if current node is a list item - if yes, take indentation from it
                let actualIndentation = getActualIndentationForListItem(current, sourceFile, options);
                if (actualIndentation !== Value.Unknown) {
                    return actualIndentation;
                }
                actualIndentation = getLineIndentationWhenExpressionIsInMultiLine(current, sourceFile, options);
                if (actualIndentation !== Value.Unknown) {
                    return actualIndentation + options.indentSize;
                }

                previous = current;
                current = current.parent;
            }
            // no parent was found - return the base indentation of the SourceFile
            return getBaseIndentation(options);
        }

        export function getIndentationForNode(n: Node, ignoreActualIndentationRange: TextRange, sourceFile: SourceFile, options: EditorSettings): number {
            const start = sourceFile.getLineAndCharacterOfPosition(n.getStart(sourceFile));
            return getIndentationForNodeWorker(n, start, ignoreActualIndentationRange, /*indentationDelta*/ 0, sourceFile, /*isNextChild*/ false, options);
        }

        export function getBaseIndentation(options: EditorSettings) {
            return options.baseIndentSize || 0;
        }

        function getIndentationForNodeWorker(
            current: Node,
            currentStart: LineAndCharacter,
            ignoreActualIndentationRange: TextRange,
            indentationDelta: number,
            sourceFile: SourceFile,
            isNextChild: boolean,
            options: EditorSettings): number {
            let parent = current.parent!;
            // Walk up the tree and collect indentation for parent-child node pairs. Indentation is not added if
            // * parent and child nodes start on the same line, or
            // * parent is an IfStatement and child starts on the same line as an 'else clause'.
            while (parent) {
                let useActualIndentation = true;
                if (ignoreActualIndentationRange) {
                    const start = current.getStart(sourceFile);
                    useActualIndentation = start < ignoreActualIndentationRange.pos || start > ignoreActualIndentationRange.end;
                }

                if (useActualIndentation) {
                    // check if current node is a list item - if yes, take indentation from it
                    const actualIndentation = getActualIndentationForListItem(current, sourceFile, options);
                    if (actualIndentation !== Value.Unknown) {
                        return actualIndentation + indentationDelta;
                    }
                }

                const containingListOrParentStart = getContainingListOrParentStart(parent, current, sourceFile);
                const parentAndChildShareLine =
                    containingListOrParentStart.line === currentStart.line ||
                    childStartsOnTheSameLineWithElseInIfStatement(parent, current, currentStart.line, sourceFile);

                if (useActualIndentation) {
                    // try to fetch actual indentation for current node from source text
                    let actualIndentation = getActualIndentationForNode(current, parent, currentStart, parentAndChildShareLine, sourceFile, options);
                    if (actualIndentation !== Value.Unknown) {
                        return actualIndentation + indentationDelta;
                    }
                    actualIndentation = getLineIndentationWhenExpressionIsInMultiLine(current, sourceFile, options);
                    if (actualIndentation !== Value.Unknown) {
                        return actualIndentation + indentationDelta;
                    }
                }

                // increase indentation if parent node wants its content to be indented and parent and child nodes don't start on the same line
                if (shouldIndentChildNode(options, parent, current, sourceFile, isNextChild) && !parentAndChildShareLine) {
                    indentationDelta += options.indentSize;
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

        function getContainingListOrParentStart(parent: Node, child: Node, sourceFile: SourceFile): LineAndCharacter {
            const containingList = getContainingList(child, sourceFile);
            const startPos = containingList ? containingList.pos : parent.getStart(sourceFile);
            return sourceFile.getLineAndCharacterOfPosition(startPos);
        }

        /*
         * Function returns Value.Unknown if indentation cannot be determined
         */
        function getActualIndentationForListItemBeforeComma(commaToken: Node, sourceFile: SourceFile, options: EditorSettings): number {
            // previous token is comma that separates items in list - find the previous item and try to derive indentation from it
            const commaItemInfo = findListItemInfo(commaToken);
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
        function getActualIndentationForNode(current: Node,
            parent: Node,
            currentLineAndChar: LineAndCharacter,
            parentAndChildShareLine: boolean,
            sourceFile: SourceFile,
            options: EditorSettings): number {

            // actual indentation is used for statements\declarations if one of cases below is true:
            // - parent is SourceFile - by default immediate children of SourceFile are not indented except when user indents them manually
            // - parent and child are not on the same line
            const useActualIndentation =
                (isDeclaration(current) || isStatementButNotDeclaration(current)) &&
                (parent.kind === SyntaxKind.SourceFile || !parentAndChildShareLine);

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

        function nextTokenIsCurlyBraceOnSameLineAsCursor(precedingToken: Node, current: Node, lineAtPosition: number, sourceFile: SourceFile): NextTokenKind {
            const nextToken = findNextToken(precedingToken, current, sourceFile);
            if (!nextToken) {
                return NextTokenKind.Unknown;
            }

            if (nextToken.kind === SyntaxKind.OpenBraceToken) {
                // open braces are always indented at the parent level
                return NextTokenKind.OpenBrace;
            }
            else if (nextToken.kind === SyntaxKind.CloseBraceToken) {
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

        function getStartLineAndCharacterForNode(n: Node, sourceFile: SourceFileLike): LineAndCharacter {
            return sourceFile.getLineAndCharacterOfPosition(n.getStart(sourceFile));
        }

        export function isArgumentAndStartLineOverlapsExpressionBeingCalled(parent: Node, child: Node, childStartLine: number, sourceFile: SourceFileLike): boolean {
            if (!(isCallExpression(parent) && contains(parent.arguments, child))) {
                return false;
            }

            const expressionOfCallExpressionEnd = parent.expression.getEnd();
            const expressionOfCallExpressionEndLine = getLineAndCharacterOfPosition(sourceFile, expressionOfCallExpressionEnd).line;
            return expressionOfCallExpressionEndLine === childStartLine;
        }

        export function childStartsOnTheSameLineWithElseInIfStatement(parent: Node, child: TextRangeWithKind, childStartLine: number, sourceFile: SourceFileLike): boolean {
            if (parent.kind === SyntaxKind.IfStatement && (<IfStatement>parent).elseStatement === child) {
                const elseKeyword = findChildOfKind(parent, SyntaxKind.ElseKeyword, sourceFile);
                Debug.assert(elseKeyword !== undefined);

                const elseKeywordStartLine = getStartLineAndCharacterForNode(elseKeyword, sourceFile).line;
                return elseKeywordStartLine === childStartLine;
            }

            return false;
        }

        function getListIfStartEndIsInListRange(list: NodeArray<Node>, start: number, end: number) {
            return list && rangeContainsStartEnd(list, start, end) ? list : undefined;
        }

        export function getContainingList(node: Node, sourceFile: SourceFile): NodeArray<Node> {
            if (node.parent) {
                const { end } = node;
                switch (node.parent.kind) {
                    case SyntaxKind.TypeReference:
                        return getListIfStartEndIsInListRange((<TypeReferenceNode>node.parent).typeArguments, node.getStart(sourceFile), end);
                    case SyntaxKind.ObjectLiteralExpression:
                        return (<ObjectLiteralExpression>node.parent).properties;
                    case SyntaxKind.ArrayLiteralExpression:
                        return (<ArrayLiteralExpression>node.parent).elements;
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.ArrowFunction:
                    case SyntaxKind.MethodDeclaration:
                    case SyntaxKind.MethodSignature:
                    case SyntaxKind.CallSignature:
                    case SyntaxKind.Constructor:
                    case SyntaxKind.ConstructorType:
                    case SyntaxKind.ConstructSignature: {
                        const start = node.getStart(sourceFile);
                        return getListIfStartEndIsInListRange((<SignatureDeclaration>node.parent).typeParameters, start, end) ||
                            getListIfStartEndIsInListRange((<SignatureDeclaration>node.parent).parameters, start, end);
                    }
                    case SyntaxKind.ClassDeclaration:
                        return getListIfStartEndIsInListRange((<ClassDeclaration>node.parent).typeParameters, node.getStart(sourceFile), end);
                    case SyntaxKind.NewExpression:
                    case SyntaxKind.CallExpression: {
                        const start = node.getStart(sourceFile);
                        return getListIfStartEndIsInListRange((<CallExpression>node.parent).typeArguments, start, end) ||
                            getListIfStartEndIsInListRange((<CallExpression>node.parent).arguments, start, end);
                    }
                    case SyntaxKind.VariableDeclarationList:
                        return getListIfStartEndIsInListRange((<VariableDeclarationList>node.parent).declarations, node.getStart(sourceFile), end);
                    case SyntaxKind.NamedImports:
                    case SyntaxKind.NamedExports:
                        return getListIfStartEndIsInListRange((<NamedImportsOrExports>node.parent).elements, node.getStart(sourceFile), end);
                    case SyntaxKind.ObjectBindingPattern:
                    case SyntaxKind.ArrayBindingPattern:
                        return getListIfStartEndIsInListRange((<ObjectBindingPattern | ArrayBindingPattern>node.parent).elements, node.getStart(sourceFile), end);
                }
            }
            return undefined;
        }

        function getActualIndentationForListItem(node: Node, sourceFile: SourceFile, options: EditorSettings): number {
            const containingList = getContainingList(node, sourceFile);
            if (containingList) {
                const index = containingList.indexOf(node);
                if (index !== -1) {
                    return deriveActualIndentationFromList(containingList, index, sourceFile, options);
                }
            }
            return Value.Unknown;
        }

        function getLineIndentationWhenExpressionIsInMultiLine(node: Node, sourceFile: SourceFile, options: EditorSettings): number {
            // actual indentation should not be used when:
            // - node is close parenthesis - this is the end of the expression
            if (node.kind === SyntaxKind.CloseParenToken) {
                return Value.Unknown;
            }

            if (node.parent && isCallOrNewExpression(node.parent) && node.parent.expression !== node) {
                const fullCallOrNewExpression = node.parent.expression;
                const startingExpression = getStartingExpression(fullCallOrNewExpression);

                if (fullCallOrNewExpression === startingExpression) {
                    return Value.Unknown;
                }

                const fullCallOrNewExpressionEnd = sourceFile.getLineAndCharacterOfPosition(fullCallOrNewExpression.end);
                const startingExpressionEnd = sourceFile.getLineAndCharacterOfPosition(startingExpression.end);

                if (fullCallOrNewExpressionEnd.line === startingExpressionEnd.line) {
                    return Value.Unknown;
                }

                return findColumnForFirstNonWhitespaceCharacterInLine(fullCallOrNewExpressionEnd, sourceFile, options);
            }

            return Value.Unknown;

            function getStartingExpression(node: Expression) {
                while (true) {
                    switch (node.kind) {
                        case SyntaxKind.CallExpression:
                        case SyntaxKind.NewExpression:
                        case SyntaxKind.PropertyAccessExpression:
                        case SyntaxKind.ElementAccessExpression:
                            node = (<PropertyAccessExpression | CallExpression | NewExpression | ElementAccessExpression | PropertyAccessExpression>node).expression;
                            break;
                        default:
                            return node;
                    }
                }
            }
        }

        function deriveActualIndentationFromList(list: ReadonlyArray<Node>, index: number, sourceFile: SourceFile, options: EditorSettings): number {
            Debug.assert(index >= 0 && index < list.length);
            const node = list[index];

            // walk toward the start of the list starting from current node and check if the line is the same for all items.
            // if end line for item [i - 1] differs from the start line for item [i] - find column of the first non-whitespace character on the line of item [i]
            let lineAndCharacter = getStartLineAndCharacterForNode(node, sourceFile);
            for (let i = index - 1; i >= 0; i--) {
                if (list[i].kind === SyntaxKind.CommaToken) {
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

        function findColumnForFirstNonWhitespaceCharacterInLine(lineAndCharacter: LineAndCharacter, sourceFile: SourceFile, options: EditorSettings): number {
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
        export function findFirstNonWhitespaceCharacterAndColumn(startPos: number, endPos: number, sourceFile: SourceFileLike, options: EditorSettings) {
            let character = 0;
            let column = 0;
            for (let pos = startPos; pos < endPos; pos++) {
                const ch = sourceFile.text.charCodeAt(pos);
                if (!isWhiteSpaceSingleLine(ch)) {
                    break;
                }

                if (ch === CharacterCodes.tab) {
                    column += options.tabSize + (column % options.tabSize);
                }
                else {
                    column++;
                }

                character++;
            }
            return { column, character };
        }

        export function findFirstNonWhitespaceColumn(startPos: number, endPos: number, sourceFile: SourceFileLike, options: EditorSettings): number {
            return findFirstNonWhitespaceCharacterAndColumn(startPos, endPos, sourceFile, options).column;
        }

        function nodeContentIsAlwaysIndented(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.ExpressionStatement:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.ClassExpression:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.TypeAliasDeclaration:
                case SyntaxKind.ArrayLiteralExpression:
                case SyntaxKind.Block:
                case SyntaxKind.ModuleBlock:
                case SyntaxKind.ObjectLiteralExpression:
                case SyntaxKind.TypeLiteral:
                case SyntaxKind.MappedType:
                case SyntaxKind.TupleType:
                case SyntaxKind.CaseBlock:
                case SyntaxKind.DefaultClause:
                case SyntaxKind.CaseClause:
                case SyntaxKind.ParenthesizedExpression:
                case SyntaxKind.PropertyAccessExpression:
                case SyntaxKind.CallExpression:
                case SyntaxKind.NewExpression:
                case SyntaxKind.VariableStatement:
                case SyntaxKind.VariableDeclaration:
                case SyntaxKind.ExportAssignment:
                case SyntaxKind.ReturnStatement:
                case SyntaxKind.ConditionalExpression:
                case SyntaxKind.ArrayBindingPattern:
                case SyntaxKind.ObjectBindingPattern:
                case SyntaxKind.JsxOpeningElement:
                case SyntaxKind.JsxOpeningFragment:
                case SyntaxKind.JsxSelfClosingElement:
                case SyntaxKind.JsxExpression:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.CallSignature:
                case SyntaxKind.ConstructSignature:
                case SyntaxKind.Parameter:
                case SyntaxKind.FunctionType:
                case SyntaxKind.ConstructorType:
                case SyntaxKind.ParenthesizedType:
                case SyntaxKind.TaggedTemplateExpression:
                case SyntaxKind.AwaitExpression:
                case SyntaxKind.NamedExports:
                case SyntaxKind.NamedImports:
                case SyntaxKind.ExportSpecifier:
                case SyntaxKind.ImportSpecifier:
                case SyntaxKind.PropertyAssignment:
                case SyntaxKind.PropertyDeclaration:
                    return true;
            }
            return false;
        }

        export function nodeWillIndentChild(settings: FormatCodeSettings | undefined, parent: TextRangeWithKind, child: TextRangeWithKind | undefined, sourceFile: SourceFileLike | undefined, indentByDefault: boolean): boolean {
            const childKind = child ? child.kind : SyntaxKind.Unknown;

            switch (parent.kind) {
                case SyntaxKind.VariableDeclaration:
                case SyntaxKind.PropertyAssignment:
                case SyntaxKind.ObjectLiteralExpression:
                    if (!settings.indentMultiLineObjectLiteralBeginningOnBlankLine && sourceFile && childKind === SyntaxKind.ObjectLiteralExpression) {
                        return rangeIsOnOneLine(sourceFile, child);
                    }
                    break;
                case SyntaxKind.DoStatement:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.ForOfStatement:
                case SyntaxKind.ForStatement:
                case SyntaxKind.IfStatement:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.ArrowFunction:
                case SyntaxKind.Constructor:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    return childKind !== SyntaxKind.Block;
                case SyntaxKind.ExportDeclaration:
                    return childKind !== SyntaxKind.NamedExports;
                case SyntaxKind.ImportDeclaration:
                    return childKind !== SyntaxKind.ImportClause ||
                        (!!(<ImportClause>child).namedBindings && (<ImportClause>child).namedBindings.kind !== SyntaxKind.NamedImports);
                case SyntaxKind.JsxElement:
                    return childKind !== SyntaxKind.JsxClosingElement;
                case SyntaxKind.JsxFragment:
                    return childKind !== SyntaxKind.JsxClosingFragment;
            }
            // No explicit rule for given nodes so the result will follow the default value argument
            return indentByDefault;
        }

        function isControlFlowEndingStatement(kind: SyntaxKind, parent: TextRangeWithKind): boolean {
            switch (kind) {
                case SyntaxKind.ReturnStatement:
                case SyntaxKind.ThrowStatement: {
                    if (parent.kind !== SyntaxKind.Block) {
                        return true;
                    }
                    const grandParent = (parent as Node).parent;
                    // In a function, we may want to write inner functions after this.
                    return !(grandParent && grandParent.kind === SyntaxKind.FunctionExpression || grandParent.kind === SyntaxKind.FunctionDeclaration);
                }
                case SyntaxKind.ContinueStatement:
                case SyntaxKind.BreakStatement:
                    return true;
                default:
                    return false;
            }
        }

        /**
         * True when the parent node should indent the given child by an explicit rule.
         * @param isNextChild If true, we are judging indent of a hypothetical child *after* this one, not the current child.
         */
        export function shouldIndentChildNode(settings: FormatCodeSettings | undefined, parent: TextRangeWithKind, child?: Node, sourceFile?: SourceFileLike, isNextChild = false): boolean {
            return (nodeContentIsAlwaysIndented(parent.kind) || nodeWillIndentChild(settings, parent, child, sourceFile, /*indentByDefault*/ false))
                && !(isNextChild && child && isControlFlowEndingStatement(child.kind, parent));
        }

        function rangeIsOnOneLine(sourceFile: SourceFileLike, range: TextRangeWithKind) {
            const rangeStart = skipTrivia(sourceFile.text, range.pos);
            const startLine = sourceFile.getLineAndCharacterOfPosition(rangeStart).line;
            const endLine = sourceFile.getLineAndCharacterOfPosition(range.end).line;
            return startLine === endLine;
        }
    }
}
