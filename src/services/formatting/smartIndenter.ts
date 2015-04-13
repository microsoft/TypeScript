///<reference path='..\services.ts' />

module ts.formatting {
    export module SmartIndenter {

        const enum Value {
            Unknown = -1
        }

        export function getIndentation(position: number, sourceFile: SourceFile, options: EditorOptions): number {
            if (position > sourceFile.text.length) {
                return 0; // past EOF
            }

            let precedingToken = findPrecedingToken(position, sourceFile);
            if (!precedingToken) {
                return 0;
            }

            // no indentation in string \regex\template literals
            let precedingTokenIsLiteral =
                precedingToken.kind === SyntaxKind.StringLiteral ||
                precedingToken.kind === SyntaxKind.RegularExpressionLiteral ||
                precedingToken.kind === SyntaxKind.NoSubstitutionTemplateLiteral ||
                precedingToken.kind === SyntaxKind.TemplateHead ||
                precedingToken.kind === SyntaxKind.TemplateMiddle ||
                precedingToken.kind === SyntaxKind.TemplateTail;
            if (precedingTokenIsLiteral && precedingToken.getStart(sourceFile) <= position && spanEnd(precedingToken) > position) {
                return 0;
            }

            let lineAtPosition = sourceFile.getLineAndCharacterOfPosition(position).line;

            if (precedingToken.kind === SyntaxKind.CommaToken && precedingToken.parent.kind !== SyntaxKind.BinaryExpression) {
                // previous token is comma that separates items in list - find the previous item and try to derive indentation from it
                let actualIndentation = getActualIndentationForListItemBeforeComma(precedingToken, sourceFile, options);
                if (actualIndentation !== Value.Unknown) {
                    return actualIndentation;
                }
            }

            // try to find node that can contribute to indentation and includes 'position' starting from 'precedingToken'
            // if such node is found - compute initial indentation for 'position' inside this node
            let previous: Node;
            let current = precedingToken;
            let currentStart: LineAndCharacter;
            let indentationDelta: number;

            while (current) {
                if (positionBelongsToNode(current, position, sourceFile) && shouldIndentChildNode(current.kind, previous ? previous.kind : SyntaxKind.Unknown)) {
                    currentStart = getStartLineAndCharacterForNode(current, sourceFile);

                    if (nextTokenIsCurlyBraceOnSameLineAsCursor(precedingToken, current, lineAtPosition, sourceFile)) {
                        indentationDelta = 0;
                    }
                    else {
                        indentationDelta = lineAtPosition !== currentStart.line ? options.IndentSize : 0;
                    }

                    break;
                }

                // check if current node is a list item - if yes, take indentation from it
                let actualIndentation = getActualIndentationForListItem(current, sourceFile, options);
                if (actualIndentation !== Value.Unknown) {
                    return actualIndentation;
                }

                previous = current;
                current = current.parent;
            }

            if (!current) {
                // no parent was found - return 0 to be indented on the level of SourceFile
                return 0;
            }

            return getIndentationForNodeWorker(current, currentStart, /*ignoreActualIndentationRange*/ undefined, indentationDelta, sourceFile, options);
        }

        export function getIndentationForNode(n: Node, ignoreActualIndentationSpan: Span, sourceFile: SourceFile, options: FormatCodeOptions): number {
            let start = sourceFile.getLineAndCharacterOfPosition(n.getStart(sourceFile));
            return getIndentationForNodeWorker(n, start, ignoreActualIndentationSpan, /*indentationDelta*/ 0, sourceFile, options);
        }

        function getIndentationForNodeWorker(
            current: Node,
            currentStart: LineAndCharacter,
            ignoreActualIndentationSpan: Span,
            indentationDelta: number,
            sourceFile: SourceFile,
            options: EditorOptions): number {

            let parent: Node = current.parent;
            let parentStart: LineAndCharacter;

            // walk upwards and collect indentations for pairs of parent-child nodes
            // indentation is not added if parent and child nodes start on the same line or if parent is IfStatement and child starts on the same line with 'else clause'
            while (parent) {
                let useActualIndentation = true;
                if (ignoreActualIndentationSpan) {
                    let start = current.getStart(sourceFile);
                    useActualIndentation = start < ignoreActualIndentationSpan.start || start > spanEnd(ignoreActualIndentationSpan);
                }

                if (useActualIndentation) {
                    // check if current node is a list item - if yes, take indentation from it
                    let actualIndentation = getActualIndentationForListItem(current, sourceFile, options);
                    if (actualIndentation !== Value.Unknown) {
                        return actualIndentation + indentationDelta;
                    }
                }
                parentStart = getParentStart(parent, current, sourceFile);
                let parentAndChildShareLine =
                    parentStart.line === currentStart.line ||
                    childStartsOnTheSameLineWithElseInIfStatement(parent, current, currentStart.line, sourceFile);

                if (useActualIndentation) {
                    // try to fetch actual indentation for current node from source text
                    let actualIndentation = getActualIndentationForNode(current, parent, currentStart, parentAndChildShareLine, sourceFile, options);
                    if (actualIndentation !== Value.Unknown) {
                        return actualIndentation + indentationDelta;
                    }
                }

                // increase indentation if parent node wants its content to be indented and parent and child nodes don't start on the same line
                if (shouldIndentChildNode(parent.kind, current.kind) && !parentAndChildShareLine) {
                    indentationDelta += options.IndentSize;
                }

                current = parent;
                currentStart = parentStart;
                parent = current.parent;
            }

            return indentationDelta;
        }


        function getParentStart(parent: Node, child: Node, sourceFile: SourceFile): LineAndCharacter {
            let containingList = getContainingList(child, sourceFile);
            if (containingList) {
                return sourceFile.getLineAndCharacterOfPosition(containingList.start);
            }

            return sourceFile.getLineAndCharacterOfPosition(parent.getStart(sourceFile));
        }

        /*
         * Function returns Value.Unknown if indentation cannot be determined
         */
        function getActualIndentationForListItemBeforeComma(commaToken: Node, sourceFile: SourceFile, options: EditorOptions): number {
            // previous token is comma that separates items in list - find the previous item and try to derive indentation from it
            let commaItemInfo = findListItemInfo(commaToken);
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
            options: EditorOptions): number {

            // actual indentation is used for statements\declarations if one of cases below is true:
            // - parent is SourceFile - by default immediate children of SourceFile are not indented except when user indents them manually
            // - parent and child are not on the same line
            let useActualIndentation =
                (isDeclaration(current) || isStatement(current)) &&
                (parent.kind === SyntaxKind.SourceFile || !parentAndChildShareLine);

            if (!useActualIndentation) {
                return Value.Unknown;
            }

            return findColumnForFirstNonWhitespaceCharacterInLine(currentLineAndChar, sourceFile, options);
        }

        function nextTokenIsCurlyBraceOnSameLineAsCursor(precedingToken: Node, current: Node, lineAtPosition: number, sourceFile: SourceFile): boolean {
            let nextToken = findNextToken(precedingToken, current);
            if (!nextToken) {
                return false;
            }

            if (nextToken.kind === SyntaxKind.OpenBraceToken) {
                // open braces are always indented at the parent level
                return true;
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

                let nextTokenStartLine = getStartLineAndCharacterForNode(nextToken, sourceFile).line;
                return lineAtPosition === nextTokenStartLine;
            }

            return false;
        }

        function getStartLineAndCharacterForNode(n: Node, sourceFile: SourceFile): LineAndCharacter {
            return sourceFile.getLineAndCharacterOfPosition(n.getStart(sourceFile));
        }

        function positionBelongsToNode(candidate: Node, position: number, sourceFile: SourceFile): boolean {
            return spanEnd(candidate) > position || !isCompletedNode(candidate, sourceFile);
        }

        export function childStartsOnTheSameLineWithElseInIfStatement(parent: Node, child: SpanWithKind, childStartLine: number, sourceFile: SourceFile): boolean {
            if (parent.kind === SyntaxKind.IfStatement && (<IfStatement>parent).elseStatement === child) {
                let elseKeyword = findChildOfKind(parent, SyntaxKind.ElseKeyword, sourceFile);
                Debug.assert(elseKeyword !== undefined);

                let elseKeywordStartLine = getStartLineAndCharacterForNode(elseKeyword, sourceFile).line;
                return elseKeywordStartLine === childStartLine;
            }

            return false;
        }

        function getContainingList(node: Node, sourceFile: SourceFile): NodeArray<Node> {
            if (node.parent) {
                switch (node.parent.kind) {
                    case SyntaxKind.TypeReference:
                        if ((<TypeReferenceNode>node.parent).typeArguments &&
                            nodeArrayContainsStartEnd((<TypeReferenceNode>node.parent).typeArguments, node.getStart(sourceFile), node.getEnd())) {
                            return (<TypeReferenceNode>node.parent).typeArguments;
                        }
                        break;
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
                    case SyntaxKind.ConstructSignature: {
                        let start = node.getStart(sourceFile);
                        if ((<SignatureDeclaration>node.parent).typeParameters &&
                            nodeArrayContainsStartEnd((<SignatureDeclaration>node.parent).typeParameters, start, node.getEnd())) {
                            return (<SignatureDeclaration>node.parent).typeParameters;
                        }
                        if (nodeArrayContainsStartEnd((<SignatureDeclaration>node.parent).parameters, start, node.getEnd())) {
                            return (<SignatureDeclaration>node.parent).parameters;
                        }
                        break;
                    }
                    case SyntaxKind.NewExpression:
                    case SyntaxKind.CallExpression: {
                        let start = node.getStart(sourceFile);
                        if ((<CallExpression>node.parent).typeArguments &&
                            nodeArrayContainsStartEnd((<CallExpression>node.parent).typeArguments, start, node.getEnd())) {
                            return (<CallExpression>node.parent).typeArguments;
                        }
                        if ((<CallExpression>node.parent).arguments &&
                            nodeArrayContainsStartEnd((<CallExpression>node.parent).arguments, start, node.getEnd())) {
                            return (<CallExpression>node.parent).arguments;
                        }
                        break;
                    }
                }
            }
            return undefined;
        }

        function getActualIndentationForListItem(node: Node, sourceFile: SourceFile, options: EditorOptions): number {
            let containingList = getContainingList(node, sourceFile);
            return containingList ? getActualIndentationFromList(containingList) : Value.Unknown;

            function getActualIndentationFromList(list: Node[]): number {
                let index = indexOf(list, node);
                return index !== -1 ? deriveActualIndentationFromList(list, index, sourceFile, options) : Value.Unknown;
            }
        }

        function deriveActualIndentationFromList(list: Node[], index: number, sourceFile: SourceFile, options: EditorOptions): number {
            Debug.assert(index >= 0 && index < list.length);
            let node = list[index];

            // walk toward the start of the list starting from current node and check if the line is the same for all items.
            // if end line for item [i - 1] differs from the start line for item [i] - find column of the first non-whitespace character on the line of item [i]
            let lineAndCharacter = getStartLineAndCharacterForNode(node, sourceFile);
            for (let i = index - 1; i >= 0; --i) {
                if (list[i].kind === SyntaxKind.CommaToken) {
                    continue;
                }
                // skip list items that ends on the same line with the current list element
                let prevEndLine = sourceFile.getLineAndCharacterOfPosition(spanEnd(list[i])).line;
                if (prevEndLine !== lineAndCharacter.line) {
                    return findColumnForFirstNonWhitespaceCharacterInLine(lineAndCharacter, sourceFile, options);
                }

                lineAndCharacter = getStartLineAndCharacterForNode(list[i], sourceFile);
            }
            return Value.Unknown;
        }

        function findColumnForFirstNonWhitespaceCharacterInLine(lineAndCharacter: LineAndCharacter, sourceFile: SourceFile, options: EditorOptions): number {
            let lineStart = sourceFile.getPositionOfLineAndCharacter(lineAndCharacter.line, 0);
            return findFirstNonWhitespaceColumn(lineStart, lineStart + lineAndCharacter.character, sourceFile, options);
        }

        /*
            Character is the actual index of the character since the beginning of the line.
            Column - position of the character after expanding tabs to spaces
            "0\t2$"
            value of 'character' for '$' is 3
            value of 'column' for '$' is 6 (assuming that tab size is 4)
        */
        export function findFirstNonWhitespaceCharacterAndColumn(startPos: number, endPos: number, sourceFile: SourceFile, options: EditorOptions) {
            let character = 0;
            let column = 0;
            for (let pos = startPos; pos < endPos; ++pos) {
                let ch = sourceFile.text.charCodeAt(pos);
                if (!isWhiteSpace(ch)) {
                    break;
                }

                if (ch === CharacterCodes.tab) {
                    column += options.TabSize + (column % options.TabSize);
                }
                else {
                    column++;
                }

                character++;
            }
            return { column, character };
        }

        export function findFirstNonWhitespaceColumn(startPos: number, endPos: number, sourceFile: SourceFile, options: EditorOptions): number {
            return findFirstNonWhitespaceCharacterAndColumn(startPos, endPos, sourceFile, options).column;
        }

        function nodeContentIsAlwaysIndented(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.ArrayLiteralExpression:
                case SyntaxKind.Block:
                case SyntaxKind.ModuleBlock:
                case SyntaxKind.ObjectLiteralExpression:
                case SyntaxKind.TypeLiteral:
                case SyntaxKind.TupleType:
                case SyntaxKind.CaseBlock:
                case SyntaxKind.DefaultClause:
                case SyntaxKind.CaseClause:
                case SyntaxKind.ParenthesizedExpression:
                case SyntaxKind.CallExpression:
                case SyntaxKind.NewExpression:
                case SyntaxKind.VariableStatement:
                case SyntaxKind.VariableDeclaration:
                case SyntaxKind.ExportAssignment:
                case SyntaxKind.ReturnStatement:
                case SyntaxKind.ConditionalExpression:
                case SyntaxKind.ArrayBindingPattern:
                case SyntaxKind.ObjectBindingPattern:
                    return true;
            }
            return false;
        }

        export function shouldIndentChildNode(parent: SyntaxKind, child: SyntaxKind): boolean {
            if (nodeContentIsAlwaysIndented(parent)) {
                return true;
            }
            switch (parent) {
                case SyntaxKind.DoStatement:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.ForOfStatement:
                case SyntaxKind.ForStatement:
                case SyntaxKind.IfStatement:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.CallSignature:
                case SyntaxKind.ArrowFunction:
                case SyntaxKind.Constructor:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                    return child !== SyntaxKind.Block;
                default:
                    return false;
            }
        }

        /*
         * Checks if node ends with 'expectedLastToken'.
         * If child at position 'length - 1' is 'SemicolonToken' it is skipped and 'expectedLastToken' is compared with child at position 'length - 2'.
         */
        function nodeEndsWith(n: Node, expectedLastToken: SyntaxKind, sourceFile: SourceFile): boolean {
            let children = n.getChildren(sourceFile);
            if (children.length) {
                let last = children[children.length - 1];
                if (last.kind === expectedLastToken) {
                    return true;
                }
                else if (last.kind === SyntaxKind.SemicolonToken && children.length !== 1) {
                    return children[children.length - 2].kind === expectedLastToken;
                }
            }
            return false;
        }

        /*
         * This function is always called when position of the cursor is located after the node
         */
        function isCompletedNode(n: Node, sourceFile: SourceFile): boolean {
            if (n.getFullWidth() === 0) {
                return false;
            }

            switch (n.kind) {
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.ObjectLiteralExpression:
                case SyntaxKind.ObjectBindingPattern:
                case SyntaxKind.TypeLiteral:
                case SyntaxKind.Block:
                case SyntaxKind.ModuleBlock:
                case SyntaxKind.CaseBlock:
                    return nodeEndsWith(n, SyntaxKind.CloseBraceToken, sourceFile);
                case SyntaxKind.CatchClause:
                    return isCompletedNode((<CatchClause>n).block, sourceFile);
                case SyntaxKind.NewExpression:
                    if (!(<NewExpression>n).arguments) {
                        return true;
                    }
                    // fall through
                case SyntaxKind.CallExpression:
                case SyntaxKind.ParenthesizedExpression:
                case SyntaxKind.ParenthesizedType:
                    return nodeEndsWith(n, SyntaxKind.CloseParenToken, sourceFile);

                case SyntaxKind.FunctionType:
                case SyntaxKind.ConstructorType:
                    return isCompletedNode((<SignatureDeclaration>n).type, sourceFile);

                case SyntaxKind.Constructor:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.MethodDeclaration:
                case SyntaxKind.MethodSignature:
                case SyntaxKind.ConstructSignature:
                case SyntaxKind.CallSignature:
                case SyntaxKind.ArrowFunction:
                    if ((<FunctionLikeDeclaration>n).body) {
                        return isCompletedNode((<FunctionLikeDeclaration>n).body, sourceFile);
                    }

                    if ((<FunctionLikeDeclaration>n).type) {
                        return isCompletedNode((<FunctionLikeDeclaration>n).type, sourceFile);
                    }

                    // Even though type parameters can be unclosed, we can get away with
                    // having at least a closing paren.
                    return hasChildOfKind(n, SyntaxKind.CloseParenToken, sourceFile);

                case SyntaxKind.ModuleDeclaration:
                    return (<ModuleDeclaration>n).body && isCompletedNode((<ModuleDeclaration>n).body, sourceFile);

                case SyntaxKind.IfStatement:
                    if ((<IfStatement>n).elseStatement) {
                        return isCompletedNode((<IfStatement>n).elseStatement, sourceFile);
                    }
                    return isCompletedNode((<IfStatement>n).thenStatement, sourceFile);

                case SyntaxKind.ExpressionStatement:
                    return isCompletedNode((<ExpressionStatement>n).expression, sourceFile);

                case SyntaxKind.ArrayLiteralExpression:
                case SyntaxKind.ArrayBindingPattern:
                case SyntaxKind.ComputedPropertyName:
                case SyntaxKind.TupleType:
                    return nodeEndsWith(n, SyntaxKind.CloseBracketToken, sourceFile);

                case SyntaxKind.IndexSignature:
                    if ((<IndexSignatureDeclaration>n).type) {
                        return isCompletedNode((<IndexSignatureDeclaration>n).type, sourceFile);
                    }

                    return hasChildOfKind(n, SyntaxKind.CloseBracketToken, sourceFile);

                case SyntaxKind.CaseClause:
                case SyntaxKind.DefaultClause:
                    // there is no such thing as terminator token for CaseClause/DefaultClause so for simplicitly always consider them non-completed
                    return false;

                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.ForOfStatement:
                case SyntaxKind.WhileStatement:
                    return isCompletedNode((<IterationStatement>n).statement, sourceFile);
                case SyntaxKind.DoStatement:
                    // rough approximation: if DoStatement has While keyword - then if node is completed is checking the presence of ')';
                    let hasWhileKeyword = findChildOfKind(n, SyntaxKind.WhileKeyword, sourceFile);
                    if (hasWhileKeyword) {
                        return nodeEndsWith(n, SyntaxKind.CloseParenToken, sourceFile);
                    }
                    return isCompletedNode((<DoStatement>n).statement, sourceFile);

                default:
                    return true;
            }
        }
    }
}