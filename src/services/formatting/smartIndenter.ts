///<reference path='..\services.ts' />

module ts.formatting {
    export module SmartIndenter {

        export function getIndentation(position: number, sourceFile: SourceFile, options: TypeScript.FormattingOptions): number {
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
                if (positionBelongsToNode(current, position, sourceFile) && nodeContentIsIndented(current, previous)) {
                    currentStart = getStartLineAndCharacterForNode(current, sourceFile);

                    if (nextTokenIsCurlyBraceOnSameLineAsCursor(precedingToken, current, lineAtPosition, sourceFile)) {
                        indentationDelta = 0;
                    }
                    else {
                        indentationDelta = lineAtPosition !== currentStart.line ? options.indentSpaces : 0;
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


            var parent: Node = current.parent;
            var parentStart: LineAndCharacter;

            // walk upwards and collect indentations for pairs of parent-child nodes
            // indentation is not added if parent and child nodes start on the same line or if parent is IfStatement and child starts on the same line with 'else clause'
            while (parent) {
                // check if current node is a list item - if yes, take indentation from it
                var actualIndentation = getActualIndentationForListItem(current, sourceFile, options);
                if (actualIndentation !== -1) {
                    return actualIndentation + indentationDelta;
                }

                parentStart = sourceFile.getLineAndCharacterFromPosition(parent.getStart(sourceFile));
                var parentAndChildShareLine = 
                    parentStart.line === currentStart.line || 
                    childStartsOnTheSameLineWithElseInIfStatement(parent, current, currentStart.line, sourceFile);

                // try to fetch actual indentation for current node from source text
                var actualIndentation = getActualIndentationForNode(current, parent, currentStart, parentAndChildShareLine, sourceFile, options);
                if (actualIndentation !== -1) {
                    return actualIndentation + indentationDelta;
                }

                // increase indentation if parent node wants its content to be indented and parent and child nodes don't start on the same line
                if (nodeContentIsIndented(parent, current) && !parentAndChildShareLine) {
                    indentationDelta += options.indentSpaces;
                }

                current = parent;
                currentStart = parentStart;
                parent = current.parent;
            }

            return indentationDelta;
        }

        /*
         * Function returns -1 if indentation cannot be determined
         */ 
        function getActualIndentationForListItemBeforeComma(commaToken: Node, sourceFile: SourceFile, options: TypeScript.FormattingOptions): number {
            // previous token is comma that separates items in list - find the previous item and try to derive indentation from it
            var itemInfo = findPrecedingListItem(commaToken);
            return deriveActualIndentationFromList(itemInfo.list.getChildren(), itemInfo.listItemIndex, sourceFile, options);
        }

        /*
         * Function returns -1 if actual indentation for node should not be used (i.e because node is nested expression)
         */
        function getActualIndentationForNode(current: Node, 
                parent: Node, 
                currentLineAndChar: LineAndCharacter, 
                parentAndChildShareLine: boolean, 
                sourceFile: SourceFile, 
                options: TypeScript.FormattingOptions): number {

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

        function findPrecedingListItem(commaToken: Node): { listItemIndex: number; list: Node } {
            // CommaToken node is synthetic and thus will be stored in SyntaxList, however parent of the CommaToken points to the container of the SyntaxList skipping the list.
            // In order to find the preceding list item we first need to locate SyntaxList itself and then search for the position of CommaToken
            var syntaxList = forEach(commaToken.parent.getChildren(), c => {
                // find syntax list that covers the span of CommaToken
                if (c.kind == SyntaxKind.SyntaxList && c.pos <= commaToken.end && c.end >= commaToken.end) {
                    return c;
                }
            });
            Debug.assert(syntaxList);

            var children = syntaxList.getChildren();
            var commaIndex = indexOf(children, commaToken);
            Debug.assert(commaIndex !== -1 && commaIndex !== 0);

            return {
                listItemIndex: commaIndex - 1,
                list: syntaxList
            };
        }

        function positionBelongsToNode(candidate: Node, position: number, sourceFile: SourceFile): boolean {
            return candidate.end > position || !isCompletedNode(candidate, sourceFile);
        }

        function childStartsOnTheSameLineWithElseInIfStatement(parent: Node, child: Node, childStartLine: number, sourceFile: SourceFile): boolean {
            if (parent.kind === SyntaxKind.IfStatement && (<IfStatement>parent).elseStatement === child) {
                var elseKeyword = forEach(parent.getChildren(), c => c.kind === SyntaxKind.ElseKeyword && c);
                Debug.assert(elseKeyword);

                var elseKeywordStartLine =  getStartLineAndCharacterForNode(elseKeyword, sourceFile).line;
                return elseKeywordStartLine === childStartLine;
            }
        }

        function getActualIndentationForListItem(node: Node, sourceFile: SourceFile, options: TypeScript.FormattingOptions): number {
            if (node.parent) {
                switch (node.parent.kind) {
                    case SyntaxKind.TypeReference:
                        if ((<TypeReferenceNode>node.parent).typeArguments) {
                            return getActualIndentationFromList((<TypeReferenceNode>node.parent).typeArguments);
                        }
                        break;
                    case SyntaxKind.ObjectLiteral:
                        return getActualIndentationFromList((<ObjectLiteral>node.parent).properties);
                    case SyntaxKind.TypeLiteral:
                        return getActualIndentationFromList((<TypeLiteralNode>node.parent).members);
                    case SyntaxKind.ArrayLiteral:
                        return getActualIndentationFromList((<ArrayLiteral>node.parent).elements);
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.ArrowFunction:
                    case SyntaxKind.Method:
                    case SyntaxKind.CallSignature:
                    case SyntaxKind.ConstructSignature:
                        if ((<SignatureDeclaration>node.parent).typeParameters && node.end < (<SignatureDeclaration>node.parent).typeParameters.end) {
                            return getActualIndentationFromList((<SignatureDeclaration>node.parent).typeParameters);
                        }
                                                
                        return getActualIndentationFromList((<SignatureDeclaration>node.parent).parameters);
                    case SyntaxKind.NewExpression:
                    case SyntaxKind.CallExpression:
                        if ((<CallExpression>node.parent).typeArguments && node.end < (<CallExpression>node.parent).typeArguments.end) {
                            return getActualIndentationFromList((<CallExpression>node.parent).typeArguments);
                        }
                        
                        return getActualIndentationFromList((<CallExpression>node.parent).arguments);
                }
            }

            return -1;

            function getActualIndentationFromList(list: Node[]): number {
                var index = indexOf(list, node);
                return index !== -1 ? deriveActualIndentationFromList(list, index, sourceFile, options) : -1;
            }
        }


        function deriveActualIndentationFromList(list: Node[], index: number, sourceFile: SourceFile, options: TypeScript.FormattingOptions): number {
            Debug.assert(index >= 0 && index < list.length);
            var node = list[index];

            // walk toward the start of the list starting from current node and check if the line is the same for all items.
            // if end line for item [i - 1] differs from the start line for item [i] - find column of the first non-whitespace character on the line of item [i]
            var lineAndCharacter =  getStartLineAndCharacterForNode(node, sourceFile);
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

        function findColumnForFirstNonWhitespaceCharacterInLine(lineAndCharacter: LineAndCharacter, sourceFile: SourceFile, options: TypeScript.FormattingOptions): number {
            var lineStart = sourceFile.getPositionFromLineAndCharacter(lineAndCharacter.line, 1);
            var column = 0;
            for (var i = 0; i < lineAndCharacter.character; ++i) {
                var charCode = sourceFile.text.charCodeAt(lineStart + i);
                if (!isWhiteSpace(charCode)) {
                    return column;
                }

                if (charCode === CharacterCodes.tab) {
                    column += options.spacesPerTab;
                }
                else {
                    column++;
                }
            }

            return column;
        }

        function findNextToken(previousToken: Node, parent: Node): Node {
            return find(parent);

            function find(n: Node): Node {
                if (isToken(n) && n.pos === previousToken.end) {
                    // this is token that starts at the end of previous token - return it
                    return n;
                }

                var children = n.getChildren();
                for (var i = 0, len = children.length; i < len; ++i) {
                    var child = children[i];
                    var shouldDiveInChildNode = 
                        // previous token is enclosed somewhere in the child
                        (child.pos <= previousToken.pos && child.end > previousToken.end) ||
                        // previous token ends exactly at the beginning of child
                        (child.pos === previousToken.end);

                    if (shouldDiveInChildNode && nodeHasTokens(child)) {
                        return find(child);
                    }
                }

                return undefined;
            }
        }

        function findPrecedingToken(position: number, sourceFile: SourceFile): Node {
            return find(sourceFile);

            function findRightmostToken(n: Node): Node {
                if (isToken(n)) {
                    return n;
                }

                var children = n.getChildren();
                var candidate = findRightmostChildNodeWithTokens(children, /*exclusiveStartPosition*/ children.length);
                return candidate && findRightmostToken(candidate);

            }

            function find(n: Node): Node {
                if (isToken(n)) {
                    return n;
                }

                var children = n.getChildren();
                for (var i = 0, len = children.length; i < len; ++i) {
                    var child = children[i];
                    if (nodeHasTokens(child)) {
                        if (position < child.end) {
                            if (child.getStart(sourceFile) >= position) {
                                // actual start of the node is past the position - previous token should be at the end of previous child
                                var candidate = findRightmostChildNodeWithTokens(children, /*exclusiveStartPosition*/ i);
                                return candidate && findRightmostToken(candidate)
                            }
                            else {
                                // candidate should be in this node
                                return find(child);
                            }
                        }
                    }
                }

                Debug.assert(n.kind === SyntaxKind.SourceFile);

                // Here we know that none of child token nodes embrace the position, 
                // the only known case is when position is at the end of the file.
                // Try to find the rightmost token in the file without filtering.
                // Namely we are skipping the check: 'position < node.end'
                if (children.length) {
                    var candidate = findRightmostChildNodeWithTokens(children, /*exclusiveStartPosition*/ children.length);
                    return candidate && findRightmostToken(candidate);
                }
            }

            /// finds last node that is considered as candidate for search (isCandidate(node) === true) starting from 'exclusiveStartPosition'
            function findRightmostChildNodeWithTokens(children: Node[], exclusiveStartPosition: number): Node {
                for (var i = exclusiveStartPosition - 1; i >= 0; --i) {
                    if (nodeHasTokens(children[i])) {
                        return children[i];
                    }
                }
            }
        }

        /*
         * Checks if node is something that can contain tokens (except EOF) - filters out EOF tokens, Missing\Omitted expressions, empty SyntaxLists and expression statements that wrap any of listed nodes.
         */
        function nodeHasTokens(n: Node): boolean {
            if (n.kind === SyntaxKind.ExpressionStatement) {
                return nodeHasTokens((<ExpressionStatement>n).expression);
            }

            if (n.kind === SyntaxKind.EndOfFileToken || n.kind === SyntaxKind.OmittedExpression || n.kind === SyntaxKind.Missing) {
                return false;
            }

            // SyntaxList is already realized so getChildCount should be fast and non-expensive
            return n.kind !== SyntaxKind.SyntaxList || n.getChildCount() !== 0;
        }

        function isToken(n: Node): boolean {
            return n.kind >= SyntaxKind.FirstToken && n.kind <= SyntaxKind.LastToken;
        }

        function nodeContentIsIndented(parent: Node, child: Node): boolean {
            switch (parent.kind) {
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.EnumDeclaration:
                    return true;
                case SyntaxKind.ModuleDeclaration:
                    // ModuleBlock should take care of indentation
                    return false;
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.Method:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.GetAccessor:
                case SyntaxKind.SetAccessor:
                case SyntaxKind.Constructor:
                    // FunctionBlock should take care of indentation
                    return false;
                case SyntaxKind.DoStatement:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.ForStatement:
                    return child && child.kind !== SyntaxKind.Block;
                case SyntaxKind.IfStatement:
                    return child && child.kind !== SyntaxKind.Block;
                case SyntaxKind.TryStatement:
                    // TryBlock\CatchBlock\FinallyBlock should take care of indentation
                    return false;
                case SyntaxKind.ArrayLiteral:
                case SyntaxKind.Block:
                case SyntaxKind.FunctionBlock:
                case SyntaxKind.TryBlock:
                case SyntaxKind.CatchBlock:
                case SyntaxKind.FinallyBlock:
                case SyntaxKind.ModuleBlock:
                case SyntaxKind.ObjectLiteral:
                case SyntaxKind.TypeLiteral:
                case SyntaxKind.SwitchStatement:
                case SyntaxKind.DefaultClause:
                case SyntaxKind.CaseClause:
                case SyntaxKind.ParenExpression:
                case SyntaxKind.CallExpression:
                case SyntaxKind.NewExpression:
                case SyntaxKind.VariableStatement:
                case SyntaxKind.VariableDeclaration:
                    return true;
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
            switch (n.kind) {
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.ObjectLiteral:
                case SyntaxKind.Block:
                case SyntaxKind.CatchBlock:
                case SyntaxKind.FinallyBlock:
                case SyntaxKind.FunctionBlock:
                case SyntaxKind.ModuleBlock:
                case SyntaxKind.SwitchStatement:
                    return nodeEndsWith(n, SyntaxKind.CloseBraceToken, sourceFile);
                case SyntaxKind.ParenExpression:
                case SyntaxKind.CallSignature:
                case SyntaxKind.CallExpression:
                case SyntaxKind.ConstructSignature:
                    return nodeEndsWith(n, SyntaxKind.CloseParenToken, sourceFile);
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.FunctionExpression:
                case SyntaxKind.Method:
                case SyntaxKind.ArrowFunction:
                    return !(<FunctionDeclaration>n).body || isCompletedNode((<FunctionDeclaration>n).body, sourceFile);
                case SyntaxKind.ModuleDeclaration:
                    return (<ModuleDeclaration>n).body && isCompletedNode((<ModuleDeclaration>n).body, sourceFile);
                case SyntaxKind.IfStatement:
                    if ((<IfStatement>n).elseStatement) {
                        return isCompletedNode((<IfStatement>n).elseStatement, sourceFile);
                    }
                    return isCompletedNode((<IfStatement>n).thenStatement, sourceFile);                    
                case SyntaxKind.ExpressionStatement:
                    return isCompletedNode((<ExpressionStatement>n).expression, sourceFile);
                case SyntaxKind.ArrayLiteral:
                    return nodeEndsWith(n, SyntaxKind.CloseBracketToken, sourceFile);
                case SyntaxKind.Missing:
                    return false;
                case SyntaxKind.CaseClause:
                case SyntaxKind.DefaultClause:
                    // there is no such thing as terminator token for CaseClause\DefaultClause so for simplicitly always consider them non-completed
                    return false;
                case SyntaxKind.WhileStatement:
                    return isCompletedNode((<WhileStatement>n).statement, sourceFile);
                case SyntaxKind.DoStatement:
                    // rough approximation: if DoStatement has While keyword - then if node is completed is checking the presence of ')';
                    var hasWhileKeyword = forEach(n.getChildren(), c => c.kind === SyntaxKind.WhileKeyword && c);
                    if(hasWhileKeyword) {
                        return nodeEndsWith(n, SyntaxKind.CloseParenToken, sourceFile);
                    }
                    return isCompletedNode((<DoStatement>n).statement, sourceFile);                    
                default:
                    return true;
            }
        }
    }
}