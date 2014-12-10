///<reference path='..\services.ts' />

module ts.formatting {
    export module SmartIndenter {
        export function getIndentation(position: number, sourceFile: SourceFile, options: EditorOptions): number {
            if (position > sourceFile.text.length) {
                return 0; // past EOF
            }

            var precedingToken = findPrecedingToken(position, sourceFile);
            if (!precedingToken) {
                return 0;
            }

            // no indentation in string \regex literals
            if ((precedingToken.kind === SyntaxKind.StringLiteral || precedingToken.kind === SyntaxKind.RegularExpressionLiteral) &&
                precedingToken.getStart(sourceFile) <= position &&
                precedingToken.end > position) {
                return 0;
            }

            var lineAtPosition = sourceFile.getLineAndCharacterFromPosition(position).line;

            if (precedingToken.kind === SyntaxKind.CommaToken && precedingToken.parent.kind !== SyntaxKind.BinaryExpression) {
                // previous token is comma that separates items in list - find the previous item and try to derive indentation from it
                var actualIndentation = getActualIndentationForListItemBeforeComma(precedingToken, sourceFile, options);
                if (actualIndentation !== -1) {
                    return actualIndentation;
                }
            }

            // try to find node that can contribute to indentation and includes 'position' starting from 'precedingToken'
            // if such node is found - compute initial indentation for 'position' inside this node
            var previous: Node;
            var current = precedingToken;
            var currentStart: LineAndCharacter;
            var indentationDelta: number;

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
                var actualIndentation = getActualIndentationForListItem(current, sourceFile, options);
                if (actualIndentation !== -1) {
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

        export function getIndentationForNode(n: Node, ignoreActualIndentationRange: TextRange, sourceFile: SourceFile, options: FormatCodeOptions): number {
            var start = sourceFile.getLineAndCharacterFromPosition(n.getStart(sourceFile));
            return getIndentationForNodeWorker(n, start, ignoreActualIndentationRange, /*indentationDelta*/ 0, sourceFile, options);
        }

        function getIndentationForNodeWorker(
            current: Node,
            currentStart: LineAndCharacter,
            ignoreActualIndentationRange: TextRange,
            indentationDelta: number,
            sourceFile: SourceFile,
            options: EditorOptions): number {

            var parent: Node = current.parent;
            var parentStart: LineAndCharacter;

            // walk upwards and collect indentations for pairs of parent-child nodes
            // indentation is not added if parent and child nodes start on the same line or if parent is IfStatement and child starts on the same line with 'else clause'
            while (parent) {
                var useActualIndentation = true;
                if (ignoreActualIndentationRange) {
                    var start = current.getStart(sourceFile);
                    useActualIndentation = start < ignoreActualIndentationRange.pos || start > ignoreActualIndentationRange.end;
                }

                if (useActualIndentation) {
                    // check if current node is a list item - if yes, take indentation from it
                    var actualIndentation = getActualIndentationForListItem(current, sourceFile, options);
                    if (actualIndentation !== -1) {
                        return actualIndentation + indentationDelta;
                    }
                }
                parentStart = getParentStart(parent, current, sourceFile);
                var parentAndChildShareLine =
                    parentStart.line === currentStart.line ||
                    childStartsOnTheSameLineWithElseInIfStatement(parent, current, currentStart.line, sourceFile);

                if (useActualIndentation) {
                    // try to fetch actual indentation for current node from source text
                    var actualIndentation = getActualIndentationForNode(current, parent, currentStart, parentAndChildShareLine, sourceFile, options);
                    if (actualIndentation !== -1) {
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
            var containingList = getContainingList(child, sourceFile);
            if (containingList) {
                return sourceFile.getLineAndCharacterFromPosition(containingList.pos);
            }

            return sourceFile.getLineAndCharacterFromPosition(parent.getStart(sourceFile));
        }

        /*
         * Function returns -1 if indentation cannot be determined
         */
        function getActualIndentationForListItemBeforeComma(commaToken: Node, sourceFile: SourceFile, options: EditorOptions): number {
            // previous token is comma that separates items in list - find the previous item and try to derive indentation from it
            var commaItemInfo = findListItemInfo(commaToken);
            Debug.assert(commaItemInfo && commaItemInfo.listItemIndex > 0);
            // The item we're interested in is right before the comma
            return deriveActualIndentationFromList(commaItemInfo.list.getChildren(), commaItemInfo.listItemIndex - 1, sourceFile, options);
        }

        /*
         * Function returns -1 if actual indentation for node should not be used (i.e because node is nested expression)
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
            var useActualIndentation =
                (isDeclaration(current) || isStatement(current)) &&
                (parent.kind === SyntaxKind.SourceFile || !parentAndChildShareLine);

            if (!useActualIndentation) {
                return -1;
            }

            return findColumnForFirstNonWhitespaceCharacterInLine(currentLineAndChar, sourceFile, options);
        }

        function nextTokenIsCurlyBraceOnSameLineAsCursor(precedingToken: Node, current: Node, lineAtPosition: number, sourceFile: SourceFile): boolean {
            var nextToken = findNextToken(precedingToken, current);
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

                var nextTokenStartLine = getStartLineAndCharacterForNode(nextToken, sourceFile).line;
                return lineAtPosition === nextTokenStartLine;
            }

            return false;
        }

        function getStartLineAndCharacterForNode(n: Node, sourceFile: SourceFile): LineAndCharacter {
            return sourceFile.getLineAndCharacterFromPosition(n.getStart(sourceFile));
        }

        function positionBelongsToNode(candidate: Node, position: number, sourceFile: SourceFile): boolean {
            return candidate.end > position || !isCompletedNode(candidate, sourceFile);
        }

        export function childStartsOnTheSameLineWithElseInIfStatement(parent: Node, child: TextRangeWithKind, childStartLine: number, sourceFile: SourceFile): boolean {
            if (parent.kind === SyntaxKind.IfStatement && (<IfStatement>parent).elseStatement === child) {
                var elseKeyword = findChildOfKind(parent, SyntaxKind.ElseKeyword, sourceFile);
                Debug.assert(elseKeyword !== undefined);

                var elseKeywordStartLine = getStartLineAndCharacterForNode(elseKeyword, sourceFile).line;
                return elseKeywordStartLine === childStartLine;
            }

            return false;
        }

        function getContainingList(node: Node, sourceFile: SourceFile): NodeArray<Node> {
            if (node.parent) {
                switch (node.parent.kind) {
                    case SyntaxKind.TypeReference:
                        if ((<TypeReferenceNode>node.parent).typeArguments &&
                            rangeContainsStartEnd((<TypeReferenceNode>node.parent).typeArguments, node.getStart(sourceFile), node.getEnd())) {
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
                    case SyntaxKind.Method:
                    case SyntaxKind.CallSignature:
                    case SyntaxKind.ConstructSignature:
                        var start = node.getStart(sourceFile);
                        if ((<SignatureDeclaration>node.parent).typeParameters &&
                            rangeContainsStartEnd((<SignatureDeclaration>node.parent).typeParameters, start, node.getEnd())) {
                            return (<SignatureDeclaration>node.parent).typeParameters;
                        }
                        if (rangeContainsStartEnd((<SignatureDeclaration>node.parent).parameters, start, node.getEnd())) {
                            return (<SignatureDeclaration>node.parent).parameters;
                        }
                        break;
                    case SyntaxKind.NewExpression:
                    case SyntaxKind.CallExpression:
                        var start = node.getStart(sourceFile);
                        if ((<CallExpression>node.parent).typeArguments &&
                            rangeContainsStartEnd((<CallExpression>node.parent).typeArguments, start, node.getEnd())) {
                            return (<CallExpression>node.parent).typeArguments;
                        }
                        if ((<CallExpression>node.parent).arguments &&
                            rangeContainsStartEnd((<CallExpression>node.parent).arguments, start, node.getEnd())) {
                            return (<CallExpression>node.parent).arguments;
                        }
                        break;
                }
            }
            return undefined;
        }

        function getActualIndentationForListItem(node: Node, sourceFile: SourceFile, options: EditorOptions): number {
            var containingList = getContainingList(node, sourceFile);
            return containingList ? getActualIndentationFromList(containingList) : -1;

            function getActualIndentationFromList(list: Node[]): number {
                var index = indexOf(list, node);
                return index !== -1 ? deriveActualIndentationFromList(list, index, sourceFile, options) : -1;
            }
        }


        function deriveActualIndentationFromList(list: Node[], index: number, sourceFile: SourceFile, options: EditorOptions): number {
            Debug.assert(index >= 0 && index < list.length);
            var node = list[index];

            // walk toward the start of the list starting from current node and check if the line is the same for all items.
            // if end line for item [i - 1] differs from the start line for item [i] - find column of the first non-whitespace character on the line of item [i]
            var lineAndCharacter = getStartLineAndCharacterForNode(node, sourceFile);
            for (var i = index - 1; i >= 0; --i) {
                if (list[i].kind === SyntaxKind.CommaToken) {
                    continue;
                }
                // skip list items that ends on the same line with the current list element
                var prevEndLine = sourceFile.getLineAndCharacterFromPosition(list[i].end).line;
                if (prevEndLine !== lineAndCharacter.line) {
                    return findColumnForFirstNonWhitespaceCharacterInLine(lineAndCharacter, sourceFile, options);
                }

                lineAndCharacter = getStartLineAndCharacterForNode(list[i], sourceFile);
            }
            return -1;
        }

        function findColumnForFirstNonWhitespaceCharacterInLine(lineAndCharacter: LineAndCharacter, sourceFile: SourceFile, options: EditorOptions): number {
            var lineStart = sourceFile.getPositionFromLineAndCharacter(lineAndCharacter.line, 1);
            return findFirstNonWhitespaceColumn(lineStart, lineStart + lineAndCharacter.character, sourceFile, options);
        }

        export function findFirstNonWhitespaceColumn(startPos: number, endPos: number, sourceFile: SourceFile, options: EditorOptions): number {
            var column = 0;
            for (var pos = startPos; pos < endPos; ++pos) {
                var ch = sourceFile.text.charCodeAt(pos);
                if (!isWhiteSpace(ch)) {
                    return column;
                }

                if (ch === CharacterCodes.tab) {
                    column += options.TabSize + (column % options.TabSize);
                }
                else {
                    column++;
                }
            }
            return column;
        }

        function nodeContentIsAlwaysIndented(kind: SyntaxKind): boolean {
            switch (kind) {
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.ArrayLiteralExpression:
                case SyntaxKind.Block:
                case SyntaxKind.TryBlock:
                case SyntaxKind.FinallyBlock:
                case SyntaxKind.ModuleBlock:
                case SyntaxKind.ObjectLiteralExpression:
                case SyntaxKind.TypeLiteral:
                case SyntaxKind.SwitchStatement:
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
                case SyntaxKind.ForStatement:
                case SyntaxKind.IfStatement:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.Method:
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
            var children = n.getChildren(sourceFile);
            if (children.length) {
                var last = children[children.length - 1];
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
                case SyntaxKind.Block:
                case SyntaxKind.FinallyBlock:
                case SyntaxKind.ModuleBlock:
                case SyntaxKind.SwitchStatement:
                    return nodeEndsWith(n, SyntaxKind.CloseBraceToken, sourceFile);
                case SyntaxKind.CatchClause:
                    return isCompletedNode((<CatchClause>n).block, sourceFile);
                case SyntaxKind.ParenthesizedExpression:
                case SyntaxKind.CallSignature:
                case SyntaxKind.CallExpression:
                case SyntaxKind.ConstructSignature:
                    return nodeEndsWith(n, SyntaxKind.CloseParenToken, sourceFile);
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.Method:
                case SyntaxKind.ArrowFunction:
                    return !(<FunctionLikeDeclaration>n).body || isCompletedNode((<FunctionLikeDeclaration>n).body, sourceFile);
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
                    return nodeEndsWith(n, SyntaxKind.CloseBracketToken, sourceFile);
                case SyntaxKind.CaseClause:
                case SyntaxKind.DefaultClause:
                    // there is no such thing as terminator token for CaseClause\DefaultClause so for simplicitly always consider them non-completed
                    return false;
                case SyntaxKind.WhileStatement:
                    return isCompletedNode((<WhileStatement>n).statement, sourceFile);
                case SyntaxKind.DoStatement:
                    // rough approximation: if DoStatement has While keyword - then if node is completed is checking the presence of ')';
                    var hasWhileKeyword = findChildOfKind(n, SyntaxKind.WhileKeyword, sourceFile);
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