// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

module ts.BreakpointResolver {
    /**
     * Get the breakpoint span in given sourceFile
     */
    export function spanInSourceFileAtLocation(sourceFile: SourceFile, askedPos: number): TypeScript.TextSpan {
        // Cannot set breakpoint in dts file
        if (sourceFile.flags & NodeFlags.DeclarationFile) {
            return;
        }

        var askedPosLine = getLineOfLocalPosition(askedPos);

        // try first in the statements at given location
        return spanInStatements(sourceFile.statements);

        function getLocalTokenStartPos(pos: number) {
            return skipTrivia(sourceFile.text, pos);
        }

        function getLocalLineBreakPos(pos: number) {
            return skipTrivia(sourceFile.text, pos, /*stopAfterLineBreak*/ true);
        }

        function getTokenLength(tokenKind: SyntaxKind) {
            return tokenToString(tokenKind).length;
        }

        function getLineOfLocalPosition(pos: number) {
            return sourceFile.getLineAndCharacterFromPosition(pos).line;
        }

        function textSpan(pos: number, end: number) {
            // Check if the asked Pos is in any comment
            return TypeScript.TextSpan.fromBounds(getLocalTokenStartPos(pos), end);
        }

        function spanInStatement(statement: Statement): TypeScript.TextSpan {
            if (!statement) {
                return;
            }
            switch (statement.kind) {
                case SyntaxKind.VariableStatement:
                    return spanInVariableStatement(<VariableStatement>statement);
                case SyntaxKind.FunctionDeclaration:
                    return spanInFunctionDeclaration(<FunctionDeclaration>statement);
                case SyntaxKind.ExpressionStatement:
                    return spanInExpressionStatement(<ExpressionStatement>statement);
                case SyntaxKind.ReturnStatement:
                    return spanInReturnStatement(<ReturnStatement>statement);
                case SyntaxKind.WhileStatement:
                    return spanInWhileStatement(<WhileStatement>statement);
                case SyntaxKind.DoStatement:
                    return spanInDoStatement(<DoStatement>statement);
                case SyntaxKind.Block:
                    return spanInBlock(<Block>statement, /*canSetBreakpointOnCloseBrace*/ false);
                case SyntaxKind.DebuggerStatement:
                    return spanInDebuggerStatement(statement);
                case SyntaxKind.IfStatement:
                    return spanInIfStatement(<IfStatement>statement);
            }

            function spanInVariableStatement(variableStatement: VariableStatement): TypeScript.TextSpan {
                // No breakpoints in the ambient variable statement
                if (variableStatement.flags & NodeFlags.Ambient) {
                    return;
                }

                var firstDeclaration = variableStatement.declarations[0];
                var lastDeclaration = variableStatement.declarations[variableStatement.declarations.length - 1];

                // if past the end of the variable statement, the breakpoint goes into last variable declaration
                if (lastDeclaration.end <= askedPos) {
                    return spanInVariableDeclaration(lastDeclaration);
                }

                // If the position is before the first declaration, set breakpoint on the first declaration
                if (askedPos <= firstDeclaration.pos) {
                    return spanInVariableDeclaration(firstDeclaration);
                }

                return spanInNodeArray(variableStatement.declarations, spanInVariableDeclaration, SyntaxKind.CommaToken);

                function spanInVariableDeclaration(variableDeclaration: VariableDeclaration): TypeScript.TextSpan {
                    // Breakpoint is possible in variableDeclaration only if there is initialization
                    if (variableDeclaration.initializer) {
                        // If this is first variable declaration, the span starts at the variable statement pos so we can include var keyword
                        return textSpan(firstDeclaration === variableDeclaration ? variableStatement.pos : variableDeclaration.pos, variableDeclaration.end);
                    }
                    else if (variableDeclaration != firstDeclaration) {
                        // if we cant set breakpoint on this declaration, set it on previous one
                        var previousVariableDeclaration: VariableDeclaration;
                        forEach(variableStatement.declarations, currentDeclaration => {
                            if (currentDeclaration === variableDeclaration) {
                                return true;
                            }
                            previousVariableDeclaration = currentDeclaration;
                        });
                        return spanInVariableDeclaration(previousVariableDeclaration);
                    }
                }
            }

            function spanInFunctionDeclaration(functionDeclaration: FunctionDeclaration): TypeScript.TextSpan {
                // No breakpoints in the ambient function declaration or just a signature
                if ((functionDeclaration.flags & NodeFlags.Ambient) || !functionDeclaration.body) {
                    return;
                }

                // Set the span in parameters if the asked pos falls inside parameter list
                if (functionDeclaration.parameters.pos <= askedPos && askedPos < functionDeclaration.parameters.end) {
                    return spanInNodeArray(functionDeclaration.parameters, spanInParameterDeclaration, SyntaxKind.CommaToken);
                }

                // Set the breakpoint in the function body
                return spanInFunctionBody();

                function spanInParameterDeclaration(parameter: ParameterDeclaration): TypeScript.TextSpan {
                    // Breakpoint is possible on parameter only if it has initializer or is a rest parameter
                    if (parameter.initializer || parameter.flags & NodeFlags.Rest) {
                        // If this is first variable declaration, the span starts at the variable statement pos so we can include var keyword
                        return textSpan(parameter.pos, parameter.end);
                    }
                    else {
                        // first parameter and cant set breakpoint, goto body and set breakpoint there
                        return spanInFunctionBody();
                    }
                }

                function spanInFunctionBody(): TypeScript.TextSpan {
                    if (functionDeclaration.body.kind === SyntaxKind.FunctionBlock) {
                        return spanInBlock(<Block>functionDeclaration.body, /*canSetBreakpointOnCloseBrace*/ true);
                    }
                    else {
                        return textSpan(functionDeclaration.body.pos, functionDeclaration.body.end);
                    }
                }
            }

            function spanInBlock(block: Block, canSetBreakpointOnCloseBrace: boolean): TypeScript.TextSpan {
                // If the asked pos > statement.length or there are no statements, the breakpoint goes on the '}'
                if (!block.statements.length || askedPos >= getLocalLineBreakPos(block.statements.end)) {
                    if (canSetBreakpointOnCloseBrace) {
                        // Set breakpoint on '}'
                        return textSpan(block.statements.end, block.end);
                    }
                    else if (block.statements.length) {
                        // Set breakpoint on last statement
                        return spanInStatement(block.statements[block.statements.length - 1]);
                    }
                }

                // if the position is before the first statement, the breakpoint goes into first statement
                if (askedPos <= block.statements.pos) {
                    return spanInStatement(block.statements[0]);
                }

                // Set the breakpoint in the statement with askedPos
                return spanInStatements(block.statements);
            }

            function spanInExpressionStatement(expressionStatement: ExpressionStatement): TypeScript.TextSpan {
                return textSpan(expressionStatement.expression.pos, expressionStatement.expression.end);
            }

            function spanInReturnStatement(returnStatement: ReturnStatement): TypeScript.TextSpan {
                return textSpan(returnStatement.pos, returnStatement.expression ? returnStatement.expression.end : getLocalTokenStartPos(returnStatement.pos) + getTokenLength(SyntaxKind.ReturnKeyword));
            }

            function spanInStatementOrBlock(statementOrBlock: Statement, spanInPreviousNode: () => TypeScript.TextSpan): TypeScript.TextSpan {
                if (statementOrBlock.kind === SyntaxKind.Block) {
                    return spanInTriviaContainingSeparatingToke(statementOrBlock.pos, SyntaxKind.OpenBraceToken, spanInPreviousNode, () => spanInStatement(statementOrBlock));
                }
                else {
                    // Set the span in statement considering trivia
                    return spanInNodeConsideringTrivia(statementOrBlock.pos, spanInPreviousNode, () => spanInStatement(statementOrBlock));
                }
            }

            function spanInWhileStatement(whileStatement: WhileStatement): TypeScript.TextSpan {
                var closeParenPos = getLocalTokenStartPos(whileStatement.expression.end);

                // Any pos before while expression close Paren - set breakpoint on whileExpression
                if (askedPos <= closeParenPos) {
                    return spanInWhileExpression();
                }

                // Set the breakpoint in the statement or use while expression depending on asked position and position of statement
                return spanInStatementOrBlock(whileStatement.statement, spanInWhileExpression);

                function spanInWhileExpression() {
                    return textSpan(whileStatement.pos, closeParenPos + getTokenLength(SyntaxKind.CloseParenToken));
                }
            }

            function spanInDoStatement(doStatement: DoStatement): TypeScript.TextSpan {
                if (askedPos >= doStatement.statement.end) {
                    return spanInNodeConsideringTrivia(doStatement.statement.end,
                        // On statement of the doStatement
                        () => spanInStatement(doStatement.statement),
                        // On While expression
                        () => textSpan(doStatement.statement.end, getLocalTokenStartPos(doStatement.expression.end) + getTokenLength(SyntaxKind.CloseParenToken))); 
                }

                return spanInStatement(doStatement.statement);
            }

            function spanInDebuggerStatement(debuggerStatement: Statement): TypeScript.TextSpan {
                var debuggerKeyWordPos = getLocalTokenStartPos(debuggerStatement.pos);
                return textSpan(debuggerKeyWordPos, debuggerKeyWordPos + getTokenLength(SyntaxKind.DebuggerKeyword));
            }

            function spanInIfStatement(ifStatement: IfStatement): TypeScript.TextSpan {
                var closeParenPos = getLocalTokenStartPos(ifStatement.expression.end);

                // Any pos before while expression close Paren - set breakpoint on whileExpression
                if (askedPos <= closeParenPos) {
                    return spanInIfExpression();
                }

                // Set the breakpoint in thenStatement if there is no else statement or if the asked pos is inside thenStatement
                if (!ifStatement.elseStatement || askedPos < ifStatement.thenStatement.end) {
                    return spanInStatementOrBlock(ifStatement.thenStatement, spanInIfExpression);
                }

                // Set breakpoint in else statement depending on position of then token
                return  spanInNodeConsideringTrivia(ifStatement.thenStatement.end, spanInThenStatement,
                    () => spanInStatement(ifStatement.elseStatement));

                function spanInIfExpression() {
                    return textSpan(ifStatement.pos, closeParenPos + getTokenLength(SyntaxKind.CloseParenToken));
                }

                function spanInThenStatement() {
                    return spanInStatement(ifStatement.thenStatement);
                }
            }
        }

        function spanInTriviaContainingSeparatingToke(pos: number, separatingToken: SyntaxKind, spanInPreviousNode: () => TypeScript.TextSpan, spanInNode: () => TypeScript.TextSpan) {
            return spanInNodeConsideringTrivia(pos, spanInPreviousNode, () => {
                // If separating token is on same line as previous node, set the breakpoint span in prev node for the asked Pos on the same line
                var separatingTokenPos = getLocalTokenStartPos(pos);
                if (getLineOfLocalPosition(separatingTokenPos) === getLineOfLocalPosition(pos) && // separating token on same line
                    askedPos < getLocalLineBreakPos(separatingTokenPos + getTokenLength(separatingToken))) { // asked pos is on line same as previous node
                    return spanInPreviousNode();
                }

                // Set the breakpoint on the node
                return spanInNode();
            });
        }

        function spanInNodeConsideringTrivia(pos: number, spanInPreviousNode: () => TypeScript.TextSpan, spanInNode: () => TypeScript.TextSpan) {
            if (askedPos < getLocalLineBreakPos(pos) && // If the position is in the trivia
                getLineOfLocalPosition(pos) < getLineOfLocalPosition(getLocalTokenStartPos(pos))) { // node token starts on different line
                // token is on different line, set breakpoint on previous node for pos on prev node's line 
                return spanInPreviousNode();
            }

            // Breakpoint on the node
            return spanInNode();
        }

        function spanInStatements(statements: NodeArray<Statement>) {
            return spanInNodeArray(statements, spanInStatement, /*separtingToken*/ undefined);
        }

        function spanInNodeArray<T extends Node>(nodes: NodeArray<T>, spanInNode: (node: T) => TypeScript.TextSpan, separtingToken: SyntaxKind) {
            // find the child that has this
            for (var i = 0, n = nodes.length; i < n; i++) {
                var node = nodes[i];
                if (node.pos > askedPos) {
                    // We have moved past the node
                    return;
                }

                // If the node lies inside this nodes pos and end try to set the breakpoint in this node
                if (node.end > askedPos) {
                    // If the position is inside trivia, set breakpoint on the previous node otherwise on the currentNode
                    return i ? spanInNodeConsideringTrivia(node.pos, () => spanInNode(nodes[i - 1]), () => spanInNode(node)) : spanInNode(node);
                }

                if (i === n - 1) {
                    // If this is last node, set breakpoint on this node if the asked Pos is in skipped trivia that is on this line
                    return spanInNodeConsideringTrivia(node.end, () => spanInNode(node), () => <TypeScript.TextSpan>undefined);
                }

                if (separtingToken !== undefined && i + 1 < n && nodes[i + 1].pos > askedPos) {
                    // Set breakpoint in separating token
                    return spanInTriviaContainingSeparatingToke(node.end, separtingToken, () => spanInNode(node), () => spanInNode(nodes[i + 1]));
                }
            }
        }
   }
}