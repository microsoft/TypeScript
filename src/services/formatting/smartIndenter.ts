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
                var precedingListItem = findPrecedingListItem(precedingToken);
                var precedingListItemStartLineAndChar = sourceFile.getLineAndCharacterFromPosition(precedingListItem.getStart(sourceFile));
                var listStartLine =  getStartLineForNode(precedingListItem.parent, sourceFile);

                if (precedingListItemStartLineAndChar.line !== listStartLine) {

                    // previous list item starts on the different line with list, find first non-whitespace character in this line and use its position as indentation
                    var lineStartPosition = sourceFile.getPositionFromLineAndCharacter(precedingListItemStartLineAndChar.line, 1);
                    for (var i = 0; i < precedingListItemStartLineAndChar.character; ++i) {
                        if (!isWhiteSpace(sourceFile.text.charCodeAt(lineStartPosition + i))) {
                            return i;
                        }
                    }

                    // seems that this is the first non-whitespace character on the line - return it
                    return precedingListItemStartLineAndChar.character;
                }
            }

            // try to find the node that will include 'position' starting from 'precedingToken'
            // if such node is found - compute initial indentation for 'position' inside this node
            var previous: Node;
            var current = precedingToken;
            var currentStartLine: number;
            var indentation: number;

            while (current) {
                if (!isToken(current) && isPositionBelongToNode(current, position, sourceFile)) {

                    currentStartLine = getStartLineForNode(current, sourceFile);

                    if (discardInitialIndentationIfNextTokenIsOpenOrCloseBrace(precedingToken, current, lineAtPosition, sourceFile)) {
                        indentation = 0;
                    }
                    else {
                        indentation =
                            isNodeContentIndented(current, previous) && 
                            lineAtPosition !== currentStartLine
                                ? options.indentSpaces 
                                : 0;
                    }

                    break;
                }

                previous = current;
                current = current.parent;
            }
                        
            if (!current) {
                // no parent was found - return 0 to be indented on the level of SourceFile
                return 0;
            }


            var parent: Node = current.parent;
            var parentStartLine: number;

            // walk upwards and collect indentations for pairs of parent-child nodes
            // indentation is not added if parent and child nodes start on the same line or if parent is IfStatement and child starts on the same line with 'else clause'
            while (parent) {
                parentStartLine = sourceFile.getLineAndCharacterFromPosition(parent.getStart(sourceFile)).line;
                var increaseIndentation = 
                    isNodeContentIndented(parent, current) && 
                    parentStartLine !== currentStartLine && 
                    !isChildStartsOnTheSameLineWithElseInIfStatement(parent, current, currentStartLine, sourceFile);

                if (increaseIndentation) {
                    indentation += options.indentSpaces;
                }

                current = parent;
                currentStartLine = parentStartLine;
                parent = current.parent;
            }

            return indentation;
        }

        function discardInitialIndentationIfNextTokenIsOpenOrCloseBrace(precedingToken: Node, current: Node, lineAtPosition: number, sourceFile: SourceFile): boolean {
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

                var nextTokenStartLine = getStartLineForNode(nextToken, sourceFile);
                return lineAtPosition === nextTokenStartLine;
            }

            return false;
        }

        function getStartLineForNode(n: Node, sourceFile: SourceFile): number {
            return sourceFile.getLineAndCharacterFromPosition(n.getStart(sourceFile)).line;
        }

        function findPrecedingListItem(commaToken: Node): Node {
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

            return children[commaIndex - 1];
        }

        function isPositionBelongToNode(candidate: Node, position: number, sourceFile: SourceFile): boolean {
            return candidate.end > position || !isCompletedNode(candidate, sourceFile);
        }

        function isChildStartsOnTheSameLineWithElseInIfStatement(parent: Node, child: Node, childStartLine: number, sourceFile: SourceFile): boolean {
            if (parent.kind === SyntaxKind.IfStatement && (<IfStatement>parent).elseStatement === child) {
                var elseKeyword = forEach(parent.getChildren(), c => c.kind === SyntaxKind.ElseKeyword && c);
                Debug.assert(elseKeyword);

                var elseKeywordStartLine =  getStartLineForNode(elseKeyword, sourceFile);
                return elseKeywordStartLine === childStartLine;
            }
        }

        // preserve indentation for list items
        // - first list item is either on the same line with the parent: foo(a... . (in this case it is not indented) or on the different line (then it is indented with base level + delta)
        // - subsequent list items inherit indentation for its sibling on the left when these siblings are also on the new line.
        // 1. foo(a, b
        //        $ - indentation = base level + delta 
        // 2. foo (a,
        //           b, c, d,
        //           $ - same indentation with first child node on the previous line
        // NOTE: indentation for list items spans from the beginning of the line to the first non-whitespace character
        //        /*test*/ x,
        //        $  <-- indentation for a new item will be here
        function getCustomIndentationForListItem(leftSibling: Node, sourceFile: SourceFile): number {
            if (leftSibling.parent) {
                switch (leftSibling.parent.kind) {
                    case SyntaxKind.ObjectLiteral:
                        return getCustomIndentationFromList((<ObjectLiteral>leftSibling.parent).properties);
                    case SyntaxKind.TypeLiteral:
                        return getCustomIndentationFromList((<TypeLiteralNode>leftSibling.parent).members);
                    case SyntaxKind.ArrayLiteral:
                        return getCustomIndentationFromList((<ArrayLiteral>leftSibling.parent).elements);
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.ArrowFunction:
                    case SyntaxKind.Method:
                    case SyntaxKind.CallSignature:
                    case SyntaxKind.ConstructSignature:
                        if ((<SignatureDeclaration>leftSibling.parent).typeParameters && leftSibling.end < (<SignatureDeclaration>leftSibling.parent).typeParameters.end) {
                            return getCustomIndentationFromList((<SignatureDeclaration>leftSibling.parent).typeParameters);
                        }
                        else {
                            return getCustomIndentationFromList((<SignatureDeclaration>leftSibling.parent).parameters);
                        }
                    case SyntaxKind.NewExpression:
                    case SyntaxKind.CallExpression:
                        if ((<CallExpression>leftSibling.parent).typeArguments && leftSibling.end < (<CallExpression>leftSibling.parent).typeArguments.end) {
                            return getCustomIndentationFromList((<CallExpression>leftSibling.parent).typeArguments);
                        }
                        else {
                            return getCustomIndentationFromList((<CallExpression>leftSibling.parent).arguments);
                        }

                        break;
                }
            }

            return -1;

            function getCustomIndentationFromList(list: Node[]): number {
                var index = indexOf(list, leftSibling);
                if (index !== -1) {
                    var lineAndCol = sourceFile.getLineAndCharacterFromPosition(leftSibling.getStart(sourceFile));
                    for (var i = index - 1; i >= 0; --i) {
                        var prevLineAndCol =  sourceFile.getLineAndCharacterFromPosition(list[i].getStart(sourceFile));
                        if (lineAndCol.line !== prevLineAndCol.line) {
                            // find the line start position
                            var lineStart = sourceFile.getPositionFromLineAndCharacter(lineAndCol.line, 1);
                            for (var i = 0; i <= lineAndCol.character; ++i) {
                                if (!isWhiteSpace(sourceFile.text.charCodeAt(lineStart + i))) {
                                    return i;
                                }
                            }
                            // code is unreachable because the rance that we check above includes at least one non-whitespace character at the very end
                            Debug.fail("Unreachable code")

                        }
                        lineAndCol = prevLineAndCol;
                    }
                }
                return -1;
            }
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
                        // previous token end exactly at the beginning of child
                        (child.pos === previousToken.end);

                    if (shouldDiveInChildNode && isCandidateNode(child)) {                        
                        return find(child);
                    }
                }
            }
        }

        function findPrecedingToken(position: number, sourceFile: SourceFile): Node {
            return find(sourceFile, /*diveIntoLastChild*/ false);

            function find(n: Node, diveIntoLastChild: boolean): Node {
                if (isToken(n)) {
                    return n;
                }

                var children = n.getChildren();
                if (diveIntoLastChild) {
                    var candidate = findLastChildNodeCandidate(children, /*exclusiveStartPosition*/ children.length);
                    return candidate && find(candidate, diveIntoLastChild);
                }

                for (var i = 0, len = children.length; i < len; ++i) {
                    var child = children[i];
                    if (isCandidateNode(child)) {
                        if (position < child.end) {
                            if (child.getStart(sourceFile) >= position) {
                                // actual start of the node is past the position - previous token should be at the end of previous child
                                var candidate = findLastChildNodeCandidate(children, /*exclusiveStartPosition*/ i);
                                return candidate && find(candidate, /*diveIntoLastChild*/ true)
                            }
                            else {
                                // candidate should be in this node
                                return find(child, diveIntoLastChild);
                            }
                        }
                    }
                }

                // here we know that none of child token nodes embrace the position
                // try to find the closest token on the left 
                if (children.length) {
                    var candidate = findLastChildNodeCandidate(children, /*exclusiveStartPosition*/ children.length);
                    return candidate && find(candidate, /*diveIntoLastChild*/ true);
                }
            }

            /// finds last node that is considered as candidate for search (isCandidate(node) === true) starting from 'exclusiveStartPosition'
            function findLastChildNodeCandidate(children: Node[], exclusiveStartPosition: number): Node {
                for (var i = exclusiveStartPosition - 1; i >= 0; --i) {
                    if (isCandidateNode(children[i])) {
                        return children[i];
                    }
                }
            }
        }

        /// checks if node is something that can contain tokens (except EOF) - filters out EOF tokens, Missing\Omitted expressions, empty SyntaxLists and expression statements that wrap any of listed nodes.
        function isCandidateNode(n: Node): boolean {
            if (n.kind === SyntaxKind.ExpressionStatement) {
                return isCandidateNode((<ExpressionStatement>n).expression);
            }

            if (n.kind === SyntaxKind.EndOfFileToken || n.kind === SyntaxKind.OmittedExpression || n.kind === SyntaxKind.Missing) {
                return false;
            }

            // SyntaxList is already realized so getChildCount should be fast and non-expensive
            return n.kind !== SyntaxKind.SyntaxList || n.getChildCount() !== 0;
        }

        function isToken(n: Node): boolean {
            return n.kind < SyntaxKind.Missing;
        }

        function isNodeContentIndented(parent: Node, child: Node): boolean {
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
                case SyntaxKind.BinaryExpression:
                case SyntaxKind.CallExpression:
                case SyntaxKind.NewExpression:
                case SyntaxKind.VariableStatement:
                case SyntaxKind.VariableDeclaration:
                    return true;
                default:
                    return false;
            }
        }

        /// checks if node ends with 'expectedLastToken'.
        /// If child at position 'length - 1' is 'SemicolonToken' it is skipped and 'expectedLastToken' is compared with child at position 'length - 2'.
        function isNodeEndWith(n: Node, expectedLastToken: SyntaxKind, sourceFile: SourceFile): boolean {
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
                    return isNodeEndWith(n, SyntaxKind.CloseBraceToken, sourceFile);
                case SyntaxKind.ParenExpression:
                case SyntaxKind.CallSignature:
                case SyntaxKind.CallExpression:
                    return isNodeEndWith(n, SyntaxKind.CloseParenToken, sourceFile);
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
                    return isNodeEndWith(n, SyntaxKind.CloseBracketToken, sourceFile);
                case SyntaxKind.Missing:
                    return false;
                case SyntaxKind.CaseClause:
                case SyntaxKind.DefaultClause:
                    // there is no such thing as terminator token for CaseClause\DefaultClause so for simplicitly always consider them non-completed
                    return false;
                case SyntaxKind.VariableStatement:
                    // variable statement is considered completed if it either doesn'not have variable declarations or last variable declaration is completed
                    var variableDeclarations = (<VariableStatement>n).declarations;
                    return variableDeclarations.length === 0 || isCompletedNode(variableDeclarations[variableDeclarations.length - 1], sourceFile);
                case SyntaxKind.VariableDeclaration:
                    // variable declaration is completed if it either doesn't have initializer or initializer is completed
                    return !(<VariableDeclaration>n).initializer || isCompletedNode((<VariableDeclaration>n).initializer, sourceFile);
                case SyntaxKind.WhileStatement:
                    return isCompletedNode((<WhileStatement>n).statement, sourceFile);
                case SyntaxKind.DoStatement:
                    return isCompletedNode((<DoStatement>n).statement, sourceFile);
                default:
                    return true;
            }
        }
    }
}