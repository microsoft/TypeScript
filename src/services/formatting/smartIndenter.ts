///<reference path='..\services.ts' />

module ts.formatting {
    export module SmartIndenter {

        interface LineAndCharacter {
            line: number;
            character: number;
        }

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

            // try to find the node that will include 'position' starting from 'precedingToken'
            // if such node is found - compute initial indentation for 'position' inside this node
            var previous: Node;
            var current = precedingToken;
            var currentStart: LineAndCharacter;
            var indentation: number;

            while (current) {
                if (isPositionBelongToNode(current, position, sourceFile)) {
                    currentStart = getStartLineAndCharacterForNode(current, sourceFile);

                    if (discardInitialIndentationIfNextTokenIsOpenOrCloseBrace(precedingToken, current, lineAtPosition, sourceFile)) {
                        indentation = 0;
                    }
                    else {
                        indentation = isNodeContentIndented(current, previous) &&  lineAtPosition !== currentStart.line ? options.indentSpaces : 0;
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
                    return actualIndentation + indentation;
                }

                parentStart = sourceFile.getLineAndCharacterFromPosition(parent.getStart(sourceFile));
                var parentAndChildShareLine = 
                    parentStart.line === currentStart.line || 
                    isChildStartsOnTheSameLineWithElseInIfStatement(parent, current, currentStart.line, sourceFile);

                // try to fetch actual indentation for current node from source text
                var actualIndentation = getActualIndentationForNode(current, parent, currentStart, parentAndChildShareLine, sourceFile, options);
                if (actualIndentation !== -1) {
                    return actualIndentation + indentation;
                }

                // increase indentation if parent node wants its content to be indented and parent and child nodes don't start on the same line
                var increaseIndentation = isNodeContentIndented(parent, current) && !parentAndChildShareLine;

                if (increaseIndentation) {
                    indentation += options.indentSpaces;
                }

                current = parent;
                currentStart = parentStart;
                parent = current.parent;
            }

            return indentation;
        }

        function isDeclaration(n: Node): boolean {
            switch(n.kind) {
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.FunctionDeclaration:
                case SyntaxKind.ImportDeclaration:
                case SyntaxKind.Method:
                case SyntaxKind.Property:
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.VariableDeclaration:
                    return true;
                default:
                    return false;
            }
        }

        function isStatement(n: Node): boolean {
            switch(n.kind) {
                case SyntaxKind.BreakStatement:
                case SyntaxKind.ContinueStatement:
                case SyntaxKind.DebuggerStatement:
                case SyntaxKind.DoStatement:
                case SyntaxKind.ExpressionStatement:
                case SyntaxKind.EmptyStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.ForStatement:
                case SyntaxKind.IfStatement:
                case SyntaxKind.LabelledStatement:
                case SyntaxKind.ReturnStatement:
                case SyntaxKind.SwitchStatement:
                case SyntaxKind.ThrowKeyword:
                case SyntaxKind.TryStatement:
                case SyntaxKind.VariableStatement:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.WithStatement:
                    return true;
                default:
                    return false;
            }
        }

        function getActualIndentationForListItemBeforeComma(commaToken: Node, sourceFile: SourceFile, options: TypeScript.FormattingOptions): number {
            // previous token is comma that separates items in list - find the previous item and try to derive indentation from it
            var precedingListItem = findPrecedingListItem(commaToken);
            var precedingListItemStartLineAndChar = sourceFile.getLineAndCharacterFromPosition(precedingListItem.getStart(sourceFile));
            var listStart =  getStartLineAndCharacterForNode(precedingListItem.parent, sourceFile);

            if (precedingListItemStartLineAndChar.line !== listStart.line) {
                return findColumnForFirstNonWhitespaceCharacterInLine(precedingListItemStartLineAndChar, sourceFile, options);
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

            return -1;
        }

        function getActualIndentationForNode(current: Node, parent: Node, currentLineAndChar: LineAndCharacter, parentAndChildShareLine: boolean, sourceFile: SourceFile, options: TypeScript.FormattingOptions): number {
            var useActualIndentation = 
                (isDeclaration(current) || isStatement(current)) &&
                (parent.kind === SyntaxKind.SourceFile || !parentAndChildShareLine);
            
            if (!useActualIndentation) {
                return -1;
            }

            return findColumnForFirstNonWhitespaceCharacterInLine(currentLineAndChar, sourceFile, options);
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

                var nextTokenStartLine = getStartLineAndCharacterForNode(nextToken, sourceFile).line;
                return lineAtPosition === nextTokenStartLine;
            }

            return false;
        }

        function getStartLineAndCharacterForNode(n: Node, sourceFile: SourceFile): LineAndCharacter {
            return sourceFile.getLineAndCharacterFromPosition(n.getStart(sourceFile));
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

                var elseKeywordStartLine =  getStartLineAndCharacterForNode(elseKeyword, sourceFile).line;
                return elseKeywordStartLine === childStartLine;
            }
        }

        function getActualIndentationForListItem(node: Node, sourceFile: SourceFile, options: TypeScript.FormattingOptions): number {
            if (node.parent) {
                switch (node.parent.kind) {
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
                        else {
                            return getActualIndentationFromList((<SignatureDeclaration>node.parent).parameters);
                        }
                    case SyntaxKind.NewExpression:
                    case SyntaxKind.CallExpression:
                        if ((<CallExpression>node.parent).typeArguments && node.end < (<CallExpression>node.parent).typeArguments.end) {
                            return getActualIndentationFromList((<CallExpression>node.parent).typeArguments);
                        }
                        else {
                            return getActualIndentationFromList((<CallExpression>node.parent).arguments);
                        }

                        break;
                }
            }

            return -1;

            function getActualIndentationFromList(list: Node[]): number {
                var index = indexOf(list, node);
                if (index !== -1) {
                    var lineAndCharacter =  getStartLineAndCharacterForNode(node, sourceFile);;
                    for (var i = index - 1; i >= 0; --i) {
                        var prevLineAndCharacter =  getStartLineAndCharacterForNode(list[i], sourceFile);
                        if (lineAndCharacter.line !== prevLineAndCharacter.line) {
                            return findColumnForFirstNonWhitespaceCharacterInLine(lineAndCharacter, sourceFile, options);
                        }
                        lineAndCharacter = prevLineAndCharacter;
                    }
                }
                return -1;
            }
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