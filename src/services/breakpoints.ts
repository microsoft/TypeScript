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
                case SyntaxKind.TryBlock:
                case SyntaxKind.CatchBlock:
                case SyntaxKind.FinallyBlock:
                    return spanInBlock(<Block>statement, /*canSetBreakpointOnCloseBrace*/ false);
                case SyntaxKind.DebuggerStatement:
                    return spanInDebuggerStatement(statement);
                case SyntaxKind.IfStatement:
                    return spanInIfStatement(<IfStatement>statement);
                case SyntaxKind.LabelledStatement:
                    return spanInLabelledStatement(<LabelledStatement>statement);
                case SyntaxKind.ForStatement:
                    return spanInForStatement(<ForStatement>statement);
                case SyntaxKind.BreakStatement:
                case SyntaxKind.ContinueStatement:
                    return spanInBreakOrContinueStatement(<BreakOrContinueStatement>statement);
                case SyntaxKind.ForInStatement:
                    return spanInForInStatement(<ForInStatement>statement);
                case SyntaxKind.SwitchStatement:
                    return spanInSwitchStatement(<SwitchStatement>statement);
                case SyntaxKind.TryStatement:
                    return spanInTryStatement(<TryStatement>statement);
                case SyntaxKind.ThrowStatement:
                    return spanInThrowStatement(<ThrowStatement>statement);
                case SyntaxKind.ExportAssignment:
                    return spanInExportAssignment(<ExportAssignment>statement);
            }

            function spanInVariableStatement(variableStatement: VariableStatement): TypeScript.TextSpan {
                // No breakpoints in the ambient variable statement
                if (variableStatement.flags & NodeFlags.Ambient) {
                    return;
                }

                return spanInVariableDeclarations(variableStatement.declarations, () => variableStatement.pos);
            }

            function spanInVariableDeclarations(declarations: NodeArray<VariableDeclaration>, getFirstDeclarationPos: () => number): TypeScript.TextSpan {
                var firstDeclaration = declarations[0];
                var lastDeclaration = declarations[declarations.length - 1];

                // if past the end of the variable statement, the breakpoint goes into last variable declaration
                if (lastDeclaration.end <= askedPos) {
                    return spanInVariableDeclaration(lastDeclaration);
                }

                // If the position is before the first declaration, set breakpoint on the first declaration
                if (askedPos <= firstDeclaration.pos) {
                    return spanInVariableDeclaration(firstDeclaration);
                }

                return spanInNodeArray(declarations, spanInVariableDeclaration, SyntaxKind.CommaToken);

                function spanInVariableDeclaration(variableDeclaration: VariableDeclaration): TypeScript.TextSpan {
                    // Breakpoint is possible in variableDeclaration only if there is initialization
                    if (variableDeclaration.initializer) {
                        // If this is first variable declaration, the span starts at the variable statement pos so we can include var keyword
                        return textSpan(firstDeclaration === variableDeclaration ? getFirstDeclarationPos() : variableDeclaration.pos, variableDeclaration.end);
                    }
                    else if (variableDeclaration != firstDeclaration) {
                        // if we cant set breakpoint on this declaration, set it on previous one
                        var previousVariableDeclaration: VariableDeclaration;
                        forEach(declarations, currentDeclaration => {
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
                return spanInExpression(expressionStatement.expression);
            }

            function spanInExpression(expression: Expression): TypeScript.TextSpan {
                return textSpan(expression.pos, expression.end);
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

            function spanInLabelledStatement(labelledStatement: LabelledStatement): TypeScript.TextSpan {
                return spanInStatement(labelledStatement.statement);
            }

            function spanInForStatement(forStatement: ForStatement): TypeScript.TextSpan {
                if (askedPos < forStatement.statement.pos) {
                    var firstSemiColonPos = forStatement.declarations ? getLocalTokenStartPos(forStatement.declarations.end) :
                        forStatement.initializer ? getLocalTokenStartPos(forStatement.initializer.end) : undefined;

                    // Declaration or initializer
                    if (askedPos <= firstSemiColonPos) {
                        return spanInDeclarationOrInitializerOfForStatement();
                    }

                    // Condition
                    var secondSemiColonPos = forStatement.condition ? getLocalTokenStartPos(forStatement.condition.end) :
                        firstSemiColonPos !== undefined ? getLocalTokenStartPos(firstSemiColonPos + getTokenLength(SyntaxKind.SemicolonToken)) : undefined;
                    if (askedPos <= secondSemiColonPos) {
                        if (forStatement.condition) {
                            // If condition is present set breakpoint in the condition
                            return spanInExpression(forStatement.condition);
                        }
                        else if (firstSemiColonPos !== undefined) {
                            // Otherwise if declarations/initializer present set breakpoint in there
                            return spanInDeclarationOrInitializerOfForStatement();
                        }
                    }

                    // Iterator
                    var closeParenPos = forStatement.iterator ? getLocalTokenStartPos(forStatement.iterator.end) :
                        secondSemiColonPos !== undefined ? getLocalTokenStartPos(secondSemiColonPos + getTokenLength(SyntaxKind.SemicolonToken)) : undefined;
                    if (askedPos <= closeParenPos) {
                        return spanInForStatementIteratorOrConditionOrDeclarationsOrInitializer();
                    }
                }

                return spanInStatementOrBlock(forStatement.statement, spanInForStatementIteratorOrConditionOrDeclarationsOrInitializer);

                function spanInForStatementIteratorOrConditionOrDeclarationsOrInitializer() {
                    if (forStatement.iterator) {
                        // Set breakpoint in the iterator
                        return spanInExpression(forStatement.iterator);
                    }
                    else if (forStatement.condition) {
                        // Set breakpoint in the 
                        return spanInExpression(forStatement.condition);
                    }
                    else if (forStatement.declarations || forStatement.initializer) {
                        // Set breakpoint in declarations/intializer
                        return spanInDeclarationOrInitializerOfForStatement();
                    }
                }

                function spanInDeclarationOrInitializerOfForStatement() {
                    if (forStatement.declarations) {
                        return spanInVariableDeclarations(forStatement.declarations, getFirstDeclarationStartPos);
                    }
                    else if (forStatement.initializer) {
                        return spanInExpression(forStatement.initializer);
                    }

                    function getFirstDeclarationStartPos() {
                        var forKeywordPos = getLocalTokenStartPos(forStatement.pos);
                        var openParenPos = getLocalTokenStartPos(forKeywordPos + getTokenLength(SyntaxKind.ForKeyword));
                        return getLocalTokenStartPos(openParenPos + getTokenLength(SyntaxKind.OpenParenToken));
                    }
                }
            }

            function spanInBreakOrContinueStatement(breakOrContinueStatement: BreakOrContinueStatement): TypeScript.TextSpan {
                return textSpan(breakOrContinueStatement.pos, breakOrContinueStatement.label ? breakOrContinueStatement.label.end :
                    getLocalTokenStartPos(breakOrContinueStatement.pos) +
                    (breakOrContinueStatement.kind === SyntaxKind.BreakStatement ? getTokenLength(SyntaxKind.BreakKeyword) :
                    getTokenLength(SyntaxKind.ContinueKeyword))); 
            }

            function spanInForInStatement(forInStatement: ForInStatement): TypeScript.TextSpan {
                var closeParenPos = getLocalTokenStartPos(forInStatement.expression.end);

                // Any pos before for in expression close Paren - set breakpoint on for in expression
                if (askedPos <= closeParenPos) {
                    return spanInForInExpression();
                }

                // Set the breakpoint in the statement or use for in expression depending on asked position and position of statement
                return spanInStatementOrBlock(forInStatement.statement, spanInForInExpression);

                function spanInForInExpression() {
                    return textSpan(forInStatement.pos, closeParenPos + getTokenLength(SyntaxKind.CloseParenToken));
                }
            }

            function spanInSwitchStatement(switchStatement: SwitchStatement): TypeScript.TextSpan {
                var closeParenPos = getLocalTokenStartPos(switchStatement.expression.end);

                // Any pos before expression close Paren - set breakpoint on in expression
                if (askedPos <= closeParenPos) {
                    return spanInSwitchExpression();
                }

                if (askedPos >= switchStatement.clauses.end) {
                    // Set breakpoint in the last clause's last statement
                    var lastClause = switchStatement.clauses[switchStatement.clauses.length - 1];
                    if (lastClause && lastClause.statements.length) {
                        return spanInStatement(lastClause.statements[lastClause.statements.length -1]);
                    }
                }

                return spanInTriviaContainingSeparatingToke(closeParenPos + getTokenLength(SyntaxKind.CloseParenToken), SyntaxKind.OpenBraceToken,
                    spanInSwitchExpression, () => spanInNodeArray(switchStatement.clauses, spanInCaseOrDefaultClause, /*separatingToken*/ undefined));

                function spanInSwitchExpression() {
                    return textSpan(switchStatement.pos, closeParenPos + getTokenLength(SyntaxKind.CloseParenToken));
                }

                function spanInCaseOrDefaultClause(caseOrDefaultClause: CaseOrDefaultClause) {
                    if (askedPos <= caseOrDefaultClause.statements.pos) {
                        return spanInStatement(caseOrDefaultClause.statements[0]);
                    }

                    return spanInStatements(caseOrDefaultClause.statements);
                }
            }

            function spanInTryStatement(tryStatement: TryStatement): TypeScript.TextSpan {
                if (tryStatement.finallyBlock && askedPos >= tryStatement.finallyBlock.pos) {
                    return spanInNodeConsideringTrivia(tryStatement.finallyBlock.pos,
                        () => spanInStatement(tryStatement.catchBlock || tryStatement.tryBlock),
                        () => spanInStatement(tryStatement.finallyBlock));
                }

                if (tryStatement.catchBlock && askedPos >= tryStatement.catchBlock.pos) {
                    return spanInNodeConsideringTrivia(tryStatement.catchBlock.pos,
                        () => spanInStatement(tryStatement.tryBlock),
                        () => spanInStatement(tryStatement.catchBlock));
                }

                return spanInStatement(tryStatement.tryBlock);
            }

            function spanInThrowStatement(throwStatement: ThrowStatement): TypeScript.TextSpan {
                return textSpan(throwStatement.pos, throwStatement.expression.end);
            }

            function spanInExportAssignment(exportAssignment: ExportAssignment): TypeScript.TextSpan {
                return textSpan(exportAssignment.pos, exportAssignment.exportName.end);
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