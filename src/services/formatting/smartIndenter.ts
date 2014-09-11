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

            // try to find the node that will include 'position' starting from 'precedingToken'
            // if such node is found - compute initial indentation for 'position' inside this node
            var previous: Node;
            var current = precedingToken;
            var indentation: number;
            while (current) {
                if (!isToken(current) && isPositionBelongToNode(current, position, sourceFile)) {
                    indentation = getInitialIndentationInNode(position, current, previous, sourceFile, options);
                    break;
                }

                previous = current;
                current = current.parent;
            }

            if (!current) {
                return 0;
            }

            var currentStartLine: number = sourceFile.getLineAndCharacterFromPosition(current.getStart(sourceFile)).line;
            var parent: Node = current.parent;
            var parentStartLine: number;

            // walk upwards and collect indentations for pairs of parent-child nodes
            // indentation is not added if parent and child nodes start on the same line or if parent is IfStatement and child starts on the same line with 'else clause'
            while (parent) {
                parentStartLine = sourceFile.getLineAndCharacterFromPosition(parent.getStart(sourceFile)).line;
                if (isNodeContentIndented(parent, current) && parentStartLine !== currentStartLine && !isChildOnTheSameLineWithElseInIfStatement(parent, current, sourceFile)) {
                    indentation += options.indentSpaces;
                }

                current = parent;
                currentStartLine = parentStartLine;
                parent = current.parent;
            }

            return indentation;
        }

        function getInitialIndentationInNode(position: number, parent: Node, previous: Node, sourceFile: SourceFile, options: TypeScript.FormattingOptions): number {
            if (parent.kind === SyntaxKind.IfStatement) {
                Debug.assert(previous);
                
                // IfStatement will be parent when:
                // - previous token is the immediate child of IfStatement - some token
                // - Then\Else parts are completed and position is outside Then\Else statements
                if ((<IfStatement>parent).thenStatement === previous || (<IfStatement>parent).elseStatement === previous) {
                    if (previous.getStart(sourceFile) > position || previous.end < position) {
                        return 0;
                    }
                    else {
                        return indentIfPositionOnDifferentLineWithNodeStart(position, previous, sourceFile, options);
                    }
                }
            }
            else if (parent.kind === SyntaxKind.TryStatement) {
                Debug.assert(previous);
                // this is possible only if position is next to completed Try\Catch blocks - no indentation
                if (previous.kind === SyntaxKind.TryBlock || previous.kind === SyntaxKind.CatchBlock) {
                    return 0;
                }
            }

            return indentIfPositionOnDifferentLineWithNodeStart(position, parent, sourceFile, options);
        }

        function indentIfPositionOnDifferentLineWithNodeStart(position: number, node: Node, sourceFile: SourceFile, options: TypeScript.FormattingOptions): number {
            return isPositionOnTheSameLineWithNodeStart(position, node, sourceFile) ? 0 : options.indentSpaces;
        }

        function isPositionOnTheSameLineWithNodeStart(position: number, node: Node, sourceFile: SourceFile): boolean {
            var lineAtPosition = sourceFile.getLineAndCharacterFromPosition(position).line;
            var startLine = sourceFile.getLineAndCharacterFromPosition(node.getStart(sourceFile)).line;
            return lineAtPosition === startLine;
        }

        function isPositionBelongToNode(candidate: Node, position: number, sourceFile: SourceFile): boolean {
            return candidate.end > position || !isCompletedNode(candidate, sourceFile);
        }

        function isPositionOnTheSameLineWithSomeBrace(token: Node, position: number, sourceFile: SourceFile): boolean {
            switch (token.kind) {
                case SyntaxKind.OpenBraceToken:
                case SyntaxKind.OpenBracketToken:
                case SyntaxKind.OpenParenToken:
                case SyntaxKind.CloseBraceToken:
                case SyntaxKind.CloseBracketToken:
                case SyntaxKind.CloseParenToken:
                    return isPositionOnTheSameLineWithNodeStart(position, token, sourceFile);
                default:
                    return false;
            }
        }

        function isChildOnTheSameLineWithElseInIfStatement(parent: Node, child: Node, sourceFile: SourceFile): boolean {
            if (parent.kind === SyntaxKind.IfStatement && (<IfStatement>parent).elseStatement === child) {
                var elseKeyword = findTokenOfKind(parent, SyntaxKind.ElseKeyword);
                Debug.assert(elseKeyword);

                return isPositionOnTheSameLineWithNodeStart(child.getStart(sourceFile), elseKeyword, sourceFile);
            }
        }

        function findTokenOfKind(parent: Node, kind: SyntaxKind) {
            return forEach(parent.getChildren(), c => c.kind === kind && c);
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

        function findPrecedingToken(position: number, sourceFile: SourceFile): Node {
            return find(sourceFile, /*diveIntoLastChild*/ false);

            function find(n: Node, diveIntoLastChild: boolean): Node {
                if (isToken(n)) {
                    return n;
                }

                var children = n.getChildren();
                if (diveIntoLastChild) {
                    var candidate = findLastChildNodeCandidate(children, children.length);
                    return candidate && find(candidate, diveIntoLastChild);
                }

                for (var i = 0, len = children.length; i < len; ++i) {
                    var child = children[i];
                    if (isCandidateNode(child)) {
                        if (position < child.end) {
                            if (child.getStart(sourceFile) >= position) {
                                // actual start of the node is past the position - previous token should be at the end of previous child
                                var candidate = findLastChildNodeCandidate(children, i);
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
                    var candidate = findLastChildNodeCandidate(children, children.length);
                    return candidate && find(candidate, /*diveIntoLastChild*/ true);
                }
            }

            // filters out EOF tokens, Missing\Omitted expressions, empty SyntaxLists and expression statements that wrap any of listed nodes.
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

            // finds last node that is considered as candidate for search (isCandidate(node) === true) starting from 'exclusiveStartPosition'
            function findLastChildNodeCandidate(children: Node[], exclusiveStartPosition: number): Node {
                for (var i = exclusiveStartPosition - 1; i >= 0; --i) {
                    if (isCandidateNode(children[i])) {
                        return children[i];
                    }
                }
            }
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
                    return true;
                default:
                    return false;
            }
        }

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