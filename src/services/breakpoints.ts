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

        /** Get the lineBreak pos if the text after pos on that line contains only trivia, otherwise return pos */
        function getPosOrLineBreakPos(pos: number) {
            var lineBreakPos = getLocalLineBreakPos(pos);
            return getLineOfLocalPosition(pos) < getLineOfLocalPosition(lineBreakPos) ? lineBreakPos : pos;
        }

        function isAskedPosInLeftOfPosOrLineBreakPosOf(node: TextRange) {
            return askedPos < getPosOrLineBreakPos(node.end);
        }

        function isAskedPosInRightOfPosOrLineBreakPos(node: TextRange) {
            return askedPos >= getPosOrLineBreakPos(node.pos);
        }

        function isAskedPosInside(node: TextRange) {
            return isAskedPosInLeftOfPosOrLineBreakPosOf(node) && isAskedPosInRightOfPosOrLineBreakPos(node)
        }

        function isAskedPosAtOrLeftOfPos(pos: number) {
            return askedPos <= pos;
        }

        function isAskedPosAtOrRightOfPos(pos: number) {
            return pos <= askedPos;
        }

        function textSpan(pos: number, end: number) {
            // Check if the asked Pos is in any comment
            return TypeScript.TextSpan.fromBounds(getLocalTokenStartPos(pos), end);
        }

        function spanInStatement(statement: Statement): TypeScript.TextSpan {
            if (!statement) {
                return;
            }

            return getBreakpointSpanFromExpressionOfStatement() || getBreakpointSpanFromStatement();

            function getBreakpointSpanFromStatement() {
                switch (statement.kind) {
                    case SyntaxKind.VariableStatement:
                        return spanInVariableStatement(<VariableStatement>statement);
                    case SyntaxKind.Property:
                        return spanInProperty(<PropertyDeclaration>statement);
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.Constructor:
                    case SyntaxKind.Method:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
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
                    case SyntaxKind.LabeledStatement:
                        return spanInLabeledStatement(<LabeledStatement>statement);
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
                    case SyntaxKind.ImportDeclaration:
                        return spanInImportDeclaration(<ImportDeclaration>statement);
                    case SyntaxKind.EnumDeclaration:
                        return spanInEnumDeclaration(<EnumDeclaration>statement);
                    case SyntaxKind.ModuleDeclaration:
                        return spanInModuleDeclaration(<ModuleDeclaration>statement);
                    case SyntaxKind.ClassDeclaration:
                        return spanInClassDeclaration(<ClassDeclaration>statement);
                }
            }

            function getBreakpointSpanFromExpressionOfStatement() {
                var expression = getExpressionOfStatement();
                if (expression && isAskedPosInside(expression)) {
                    return spanInExpression(expression);
                }

                function getExpressionOfStatement(): Expression {
                    switch (statement.kind) {
                        case SyntaxKind.ReturnStatement:
                            return (<ReturnStatement>statement).expression;
                        case SyntaxKind.WhileStatement:
                            return (<WhileStatement>statement).expression;
                        case SyntaxKind.DoStatement:
                            return (<DoStatement>statement).expression;
                        case SyntaxKind.IfStatement:
                            return (<IfStatement>statement).expression;
                        case SyntaxKind.ForInStatement:
                            return (<ForInStatement>statement).expression;
                        case SyntaxKind.SwitchStatement:
                            return (<SwitchStatement>statement).expression;
                        case SyntaxKind.ThrowStatement:
                            return (<ThrowStatement>statement).expression;
                    }
                }
            }

            function spanInVariableStatement(variableStatement: VariableStatement): TypeScript.TextSpan {
                // No breakpoints in the ambient variable statement
                if (variableStatement.flags & NodeFlags.Ambient) {
                    return;
                }

                return spanInVariableDeclarations(variableStatement.declarations, () => variableStatement.pos);
            }

            function spanInProperty(propertyDeclaration: PropertyDeclaration): TypeScript.TextSpan {
                return spanInVariableDeclarations(<NodeArray<PropertyDeclaration>>[propertyDeclaration], () => propertyDeclaration.pos);
            }

            function spanInVariableDeclarations(declarations: NodeArray<VariableDeclaration>, getFirstDeclarationPos: () => number): TypeScript.TextSpan {
                return spanInNodeWithChildNodeArray(declarations, spanInVariableDeclaration, SyntaxKind.CommaToken);

                function spanInVariableDeclaration(variableDeclaration: VariableDeclaration): TypeScript.TextSpan {
                    // Breakpoint is possible in variableDeclaration only if there is initialization
                    if (variableDeclaration.initializer) {
                        // try getting span from expression
                        var spanOfInitializer: TypeScript.TextSpan;
                        if (isAskedPosInRightOfPosOrLineBreakPos(variableDeclaration.initializer)) {
                            spanOfInitializer = spanInExpression(variableDeclaration.initializer);
                        }
                        // If this is first variable declaration, the span starts at the variable statement pos so we can include var keyword
                        return spanOfInitializer || textSpan(declarations[0] === variableDeclaration ? getFirstDeclarationPos() : variableDeclaration.pos, variableDeclaration.end);
                    }
                    else if (variableDeclaration != declarations[0]) {
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
                if (isAskedPosInside(functionDeclaration.parameters)) {
                    return spanInNodeArray(functionDeclaration.parameters, spanInParameterDeclaration, SyntaxKind.CommaToken);
                }

                // Set the breakpoint in the function body
                return spanInFunctionBody();

                function spanInParameterDeclaration(parameter: ParameterDeclaration): TypeScript.TextSpan {
                    // Breakpoint is possible on parameter only if it has initializer or is a rest parameter
                    if (parameter.initializer || parameter.flags & (NodeFlags.Rest | NodeFlags.Public | NodeFlags.Private)) {
                        var spanInParameterInitializer: TypeScript.TextSpan;
                        if (parameter.initializer && isAskedPosInRightOfPosOrLineBreakPos(parameter.initializer)) {
                            spanInParameterInitializer = spanInExpression(parameter.initializer);
                        }
                        // If this is first variable declaration, the span starts at the variable statement pos so we can include var keyword
                        return spanInParameterInitializer || textSpan(parameter.pos, parameter.end);
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
                if (!block.statements.length || isAskedPosAtOrRightOfPos(getPosOrLineBreakPos(block.statements.end))) {
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
                if (isAskedPosAtOrLeftOfPos(block.statements.pos)) {
                    return spanInStatement(block.statements[0]);
                }

                // Set the breakpoint in the statement with askedPos
                return spanInStatements(block.statements);
            }

            function spanInExpressionStatement(expressionStatement: ExpressionStatement): TypeScript.TextSpan {
                return spanInExpression(expressionStatement.expression);
            }

            function spanInExpression(expression: Expression): TypeScript.TextSpan {
                if (!expression) {
                    return;
                }

                return getBreakpointSpanFromExpression(expression) ||
                    (canUseExpressionAsBreakpointSpan(expression) ? textSpan(expression.pos, expression.end) : undefined);

                function canUseExpressionAsBreakpointSpan(expression: Expression): boolean {
                    switch (expression.parent.kind) {
                        case SyntaxKind.ExpressionStatement:
                        case SyntaxKind.ForStatement:
                            return true;
                        case SyntaxKind.BinaryExpression:
                            if ((<BinaryExpression>expression.parent).operator === SyntaxKind.CommaToken) {
                                return canUseExpressionAsBreakpointSpan(expression.parent);
                            }
                    }
                }

                function getBreakpointSpanFromExpression(expression: Expression) {
                    switch (expression.kind) {
                        case SyntaxKind.BinaryExpression:
                            return spanInBinaryExpression(<BinaryExpression>expression);
                        case SyntaxKind.PrefixOperator:
                            return spanInPrefixOperator(<UnaryExpression>expression);
                        case SyntaxKind.PostfixOperator:
                            return spanInPostfixOperator(<UnaryExpression>expression);
                        case SyntaxKind.NewExpression:
                        case SyntaxKind.CallExpression:
                            return spanInCallExpression(<CallExpression>expression);
                        case SyntaxKind.ParenExpression:
                            return spanInParenExpression(<ParenExpression>expression);
                        case SyntaxKind.ConditionalExpression:
                            return spanInConditionalExpression(<ConditionalExpression>expression);
                        case SyntaxKind.PropertyAccess:
                            return spanInPropertyAccess(<PropertyAccess>expression);
                        case SyntaxKind.IndexedAccess:
                            return spanInIndexedAccess(<IndexedAccess>expression);
                        case SyntaxKind.TypeAssertion:
                            return spanInTypeAssertion(<TypeAssertion>expression);
                        case SyntaxKind.ArrayLiteral:
                            return spanInArrayLiteral(<ArrayLiteral>expression);
                        case SyntaxKind.ObjectLiteral:
                            return spanInObjectLiteral(<ObjectLiteral>expression);
                        case SyntaxKind.ArrowFunction:
                        case SyntaxKind.FunctionExpression:
                        case SyntaxKind.GetAccessor:
                        case SyntaxKind.SetAccessor:
                            return spanInFunctionDeclaration(<FunctionDeclaration>expression);
                        case SyntaxKind.PropertyAssignment:
                            return spanInPropertyAssignment(<PropertyDeclaration>expression);
                    }

                    function spanInBinaryExpression(binaryExpression: BinaryExpression): TypeScript.TextSpan {
                        if (isAskedPosInLeftOfPosOrLineBreakPosOf(binaryExpression.left)) {
                            return spanInExpression(binaryExpression.left);
                        }
                        if (binaryExpression.operator == SyntaxKind.CommaToken && isAskedPosInRightOfPosOrLineBreakPos(binaryExpression.left)) {
                            return spanInTriviaContainingSeparatingToken(binaryExpression.left.end, binaryExpression.operator,
                                () => spanInExpression(binaryExpression.left), () => spanInExpression(binaryExpression.right));
                        }
                        if (isAskedPosInRightOfPosOrLineBreakPos(binaryExpression.right)) {
                            return spanInExpression(binaryExpression.right);
                        }
                    }

                    function spanInPrefixOperator(prefixOperator: UnaryExpression): TypeScript.TextSpan {
                        if (isAskedPosInRightOfPosOrLineBreakPos(prefixOperator.operand)) {
                            return spanInExpression(prefixOperator.operand);
                        }
                    }

                    function spanInPostfixOperator(postfixOperator: UnaryExpression): TypeScript.TextSpan {
                        if (isAskedPosInLeftOfPosOrLineBreakPosOf(postfixOperator.operand)) {
                            return spanInExpression(postfixOperator.operand);
                        }
                    }

                    function spanInCallExpression(callExpression: CallExpression): TypeScript.TextSpan {
                        if (isAskedPosInLeftOfPosOrLineBreakPosOf(callExpression.func)) {
                            return spanInExpression(callExpression.func);
                        }
                        if (isAskedPosInside(callExpression.arguments)) {
                            return spanInNodeArray(callExpression.arguments, spanInExpression, SyntaxKind.CommaToken);
                        }
                    }

                    function spanInParenExpression(parenExpression: ParenExpression): TypeScript.TextSpan {
                        if (isAskedPosInside(parenExpression.expression)) {
                            return spanInExpression(parenExpression.expression);
                        }
                    }

                    function spanInConditionalExpression(conditionalExpression: ConditionalExpression): TypeScript.TextSpan {
                        if (isAskedPosInLeftOfPosOrLineBreakPosOf(conditionalExpression.condition)) {
                            return spanInExpression(conditionalExpression.condition);
                        }
                        if (isAskedPosInside(conditionalExpression.whenTrue)) {
                            return spanInExpression(conditionalExpression.whenTrue);
                        }
                        if (isAskedPosInRightOfPosOrLineBreakPos(conditionalExpression.whenFalse)) {
                            return spanInExpression(conditionalExpression.whenFalse);
                        }
                    }

                    function spanInPropertyAccess(propertyAccess: PropertyAccess): TypeScript.TextSpan {
                        if (isAskedPosInLeftOfPosOrLineBreakPosOf(propertyAccess.left)) {
                            return spanInExpression(propertyAccess.left);
                        }
                    }

                    function spanInIndexedAccess(indexedAccess: IndexedAccess): TypeScript.TextSpan {
                        if (isAskedPosInLeftOfPosOrLineBreakPosOf(indexedAccess.object)) {
                            return spanInExpression(indexedAccess.object);
                        }
                        if (isAskedPosInside(indexedAccess.index)) {
                            return spanInExpression(indexedAccess.index);
                        }
                    }

                    function spanInTypeAssertion(typeAssertion: TypeAssertion): TypeScript.TextSpan {
                        return spanInExpression(typeAssertion.operand);
                    }

                    function spanInArrayLiteral(arrayLiteral: ArrayLiteral): TypeScript.TextSpan {
                        return spanInNodeWithChildNodeArray(arrayLiteral.elements, spanInExpression, SyntaxKind.CommaToken);
                    }

                    function spanInObjectLiteral(objectLiteral: ObjectLiteral): TypeScript.TextSpan {
                        return spanInNodeWithChildNodeArray(objectLiteral.properties, spanInExpression, SyntaxKind.CommaToken);
                    }

                    function spanInPropertyAssignment(propertyAssignment: PropertyDeclaration): TypeScript.TextSpan {
                        return spanInExpression(propertyAssignment.initializer);
                    }
                }
            }

            function spanInReturnStatement(returnStatement: ReturnStatement): TypeScript.TextSpan {
                return textSpan(returnStatement.pos, returnStatement.expression ? returnStatement.expression.end : getLocalTokenStartPos(returnStatement.pos) + getTokenLength(SyntaxKind.ReturnKeyword));
            }

            function spanInStatementOrBlock(statementOrBlock: Statement, spanInPreviousNode: () => TypeScript.TextSpan): TypeScript.TextSpan {
                if (statementOrBlock.kind === SyntaxKind.Block) {
                    return spanInTriviaContainingSeparatingToken(statementOrBlock.pos, SyntaxKind.OpenBraceToken, spanInPreviousNode, () => spanInStatement(statementOrBlock));
                }
                else {
                    // Set the span in statement considering trivia
                    return spanInNodeConsideringTrivia(statementOrBlock.pos, spanInPreviousNode, () => spanInStatement(statementOrBlock));
                }
            }

            function spanInExpressionIfAskedPosInExpression(expression: Expression): TypeScript.TextSpan {
                if (expression && isAskedPosInside(expression)) {
                    return spanInExpression(expression);
                }
            }

            function spanInWhileStatement(whileStatement: WhileStatement): TypeScript.TextSpan {
                var closeParenPos = getLocalTokenStartPos(whileStatement.expression.end);

                // Any pos before while expression close Paren - set breakpoint on whileExpression
                if (isAskedPosAtOrLeftOfPos(closeParenPos)) {
                    return spanInWhileExpression();
                }

                // Set the breakpoint in the statement or use while expression depending on asked position and position of statement
                return spanInStatementOrBlock(whileStatement.statement, spanInWhileExpression);

                function spanInWhileExpression() {
                    return textSpan(whileStatement.pos, closeParenPos + getTokenLength(SyntaxKind.CloseParenToken));
                }
            }

            function spanInDoStatement(doStatement: DoStatement): TypeScript.TextSpan {
                if (isAskedPosAtOrRightOfPos(doStatement.statement.end)) {
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
                if (isAskedPosAtOrLeftOfPos(closeParenPos)) {
                    return spanInIfExpression();
                }

                // Set the breakpoint in thenStatement if there is no else statement or if the asked pos is inside thenStatement
                if (!ifStatement.elseStatement || isAskedPosInLeftOfPosOrLineBreakPosOf(ifStatement.thenStatement)) {
                    return spanInStatementOrBlock(ifStatement.thenStatement, spanInIfExpression);
                }

                // Set breakpoint in else statement
                return spanInStatement(ifStatement.elseStatement);

                function spanInIfExpression() {
                    return textSpan(ifStatement.pos, closeParenPos + getTokenLength(SyntaxKind.CloseParenToken));
                }

                function spanInThenStatement() {
                    return spanInStatement(ifStatement.thenStatement);
                }
            }

            function spanInLabeledStatement(labelledStatement: LabeledStatement): TypeScript.TextSpan {
                return spanInStatement(labelledStatement.statement);
            }

            function spanInForStatement(forStatement: ForStatement): TypeScript.TextSpan {
                if (isAskedPosAtOrLeftOfPos(forStatement.statement.pos)) {
                    var firstSemiColonPos = forStatement.declarations ? getLocalTokenStartPos(forStatement.declarations.end) :
                        forStatement.initializer ? getLocalTokenStartPos(forStatement.initializer.end) : undefined;

                    // Declaration or initializer
                    if (isAskedPosAtOrLeftOfPos(firstSemiColonPos)) {
                        return spanInDeclarationOrInitializerOfForStatement();
                    }

                    // Condition
                    var secondSemiColonPos = forStatement.condition ? getLocalTokenStartPos(forStatement.condition.end) :
                        firstSemiColonPos !== undefined ? getLocalTokenStartPos(firstSemiColonPos + getTokenLength(SyntaxKind.SemicolonToken)) : undefined;
                    if (isAskedPosAtOrLeftOfPos(secondSemiColonPos)) {
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
                    if (isAskedPosAtOrLeftOfPos(closeParenPos)) {
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
                if (isAskedPosAtOrLeftOfPos(closeParenPos)) {
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
                if (isAskedPosAtOrLeftOfPos(closeParenPos)) {
                    return spanInSwitchExpression();
                }

                if (isAskedPosAtOrRightOfPos(switchStatement.clauses.end)) {
                    // Set breakpoint in the last clause's last statement
                    var lastClause = switchStatement.clauses[switchStatement.clauses.length - 1];
                    if (lastClause && lastClause.statements.length) {
                        return spanInStatement(lastClause.statements[lastClause.statements.length -1]);
                    }
                }

                return spanInTriviaContainingSeparatingToken(closeParenPos + getTokenLength(SyntaxKind.CloseParenToken), SyntaxKind.OpenBraceToken,
                    spanInSwitchExpression, () => spanInNodeArray(switchStatement.clauses, spanInCaseOrDefaultClause, /*separatingToken*/ undefined));

                function spanInSwitchExpression() {
                    return textSpan(switchStatement.pos, closeParenPos + getTokenLength(SyntaxKind.CloseParenToken));
                }

                function spanInCaseOrDefaultClause(caseOrDefaultClause: CaseOrDefaultClause) {
                    var spanFromCaseOrDefaultClauseExpression: TypeScript.TextSpan;
                    if (caseOrDefaultClause.expression && isAskedPosInside(caseOrDefaultClause.expression)) {
                        spanFromCaseOrDefaultClauseExpression = spanInExpression(caseOrDefaultClause.expression);
                    }

                    return spanFromCaseOrDefaultClauseExpression ||
                        (isAskedPosAtOrLeftOfPos(caseOrDefaultClause.statements.pos) ?
                        spanInStatement(caseOrDefaultClause.statements[0]) :
                        spanInStatements(caseOrDefaultClause.statements));
                }
            }

            function spanInTryStatement(tryStatement: TryStatement): TypeScript.TextSpan {
                if (tryStatement.finallyBlock && isAskedPosInRightOfPosOrLineBreakPos(tryStatement.finallyBlock)) {
                        return spanInStatement(tryStatement.finallyBlock);
                }

                if (tryStatement.catchBlock && isAskedPosInRightOfPosOrLineBreakPos(tryStatement.catchBlock)) {
                    return spanInStatement(tryStatement.catchBlock);
                }

                return spanInStatement(tryStatement.tryBlock);
            }

            function spanInThrowStatement(throwStatement: ThrowStatement): TypeScript.TextSpan {
                return textSpan(throwStatement.pos, throwStatement.expression.end);
            }

            function spanInExportAssignment(exportAssignment: ExportAssignment): TypeScript.TextSpan {
                return textSpan(exportAssignment.pos, exportAssignment.exportName.end);
            }

            function spanInImportDeclaration(importDeclaration: ImportDeclaration): TypeScript.TextSpan {
                return textSpan(importDeclaration.pos, importDeclaration.entityName ? importDeclaration.entityName.end : importDeclaration.externalModuleName.end);
            }

            function spanInEnumDeclaration(enumDeclaration: EnumDeclaration): TypeScript.TextSpan {
                if (enumDeclaration.flags & NodeFlags.Ambient) {
                    return;
                }

                // No members span on '}' of enum declaration
                if (!enumDeclaration.members.length) {
                    return spanInCloseBraceTokenOfEnumDeclaration();
                }

                if (isAskedPosAtOrRightOfPos(enumDeclaration.members.end)) {
                    return spanInNodeConsideringTrivia(enumDeclaration.members.end, () => spanInEnumMember(enumDeclaration.members[enumDeclaration.members.length - 1]),
                        spanInCloseBraceTokenOfEnumDeclaration);
                }

                return spanInNodeWithChildNodeArray(enumDeclaration.members, spanInEnumMember, SyntaxKind.CommaToken);

                function spanInCloseBraceTokenOfEnumDeclaration() {
                    return textSpan(getLocalTokenStartPos(enumDeclaration.members.end), enumDeclaration.end)
                }

                function spanInEnumMember(enumMember: EnumMember): TypeScript.TextSpan {
                    return textSpan(enumMember.pos, enumMember.end);
                }
            }

            function spanInModuleDeclaration(moduleDeclaration: ModuleDeclaration): TypeScript.TextSpan {
                if (moduleDeclaration.flags & NodeFlags.Ambient) {
                    return;
                }

                // Empty modules cant have breakpoints
                if (moduleDeclaration.body.kind === SyntaxKind.ModuleBlock && // If the members of this module is module block
                    !(<Block>moduleDeclaration.body).statements.length && // and there are no statements in the module body
                    (moduleDeclaration.parent.kind !== SyntaxKind.ModuleDeclaration // And this module is not a child from dotted module name
                    || (<ModuleDeclaration>moduleDeclaration.parent).body !== moduleDeclaration)) {
                    return;
                }

                if (moduleDeclaration.body.kind !== SyntaxKind.ModuleBlock) {
                    // Set the breakpoint in the module body
                    return spanInStatement(moduleDeclaration.body);
                }
                return spanInBlock(<Block>moduleDeclaration.body, /*canSetBreakpointOnCloseBrace*/ true);
            }

            function spanInClassDeclaration(classDeclaration: ClassDeclaration): TypeScript.TextSpan {
                if (classDeclaration.flags & NodeFlags.Ambient) {
                    return;
                }

                // No members span on '}' of enum declaration
                if (!classDeclaration.members.length) {
                    return spanInCloseBraceTokenOfClassDeclaration();
                }

                if (isAskedPosAtOrRightOfPos(classDeclaration.members.end)) {
                    return spanInNodeConsideringTrivia(classDeclaration.members.end, () => spanInStatement(classDeclaration.members[classDeclaration.members.length - 1]),
                        spanInCloseBraceTokenOfClassDeclaration);
                }

                return spanInNodeWithChildNodeArray(classDeclaration.members, spanInStatement, /*separatingToken*/undefined);

                function spanInCloseBraceTokenOfClassDeclaration() {
                    return textSpan(getLocalTokenStartPos(classDeclaration.members.end), classDeclaration.end)
                }
            }
        }

        function spanInTriviaContainingSeparatingToken(pos: number, separatingToken: SyntaxKind, spanInPreviousNode: () => TypeScript.TextSpan, spanInNode: () => TypeScript.TextSpan) {
            return spanInNodeConsideringTrivia(pos, spanInPreviousNode, () => {
                // If separating token is on same line as previous node, set the breakpoint span in prev node for the asked Pos on the same line
                var separatingTokenPos = getLocalTokenStartPos(pos);
                if (getLineOfLocalPosition(separatingTokenPos) === getLineOfLocalPosition(pos) && // separating token on same line
                    askedPos < getPosOrLineBreakPos(separatingTokenPos + getTokenLength(separatingToken))) { // asked pos is on line same as previous node
                    return spanInPreviousNode();
                }

                // Set the breakpoint on the node
                return spanInNode();
            });
        }

        function spanInNodeConsideringTrivia(pos: number, spanInPreviousNode: () => TypeScript.TextSpan, spanInNode: () => TypeScript.TextSpan) {
            if (askedPos < getPosOrLineBreakPos(pos)) { 
                // if askedPos is inside the skipped trivia on same line and the rest of the line contains only trivia
                return spanInPreviousNode();
            }

            // Breakpoint on the node
            return spanInNode();
        }

        function spanInStatements(statements: NodeArray<Statement>) {
            return spanInNodeArray(statements, spanInStatement, /*separtingToken*/ undefined);
        }

        function spanInNodeWithChildNodeArray<T extends Node>(childNodes: NodeArray<T>, spanInChildNode: (node: T) => TypeScript.TextSpan, separtingToken: SyntaxKind): TypeScript.TextSpan {
            // If asked pos is after child array, set breakpoint in the last node
            if (isAskedPosAtOrRightOfPos(childNodes.end)) {
                return spanInChildNode(childNodes[childNodes.length - 1]);
            }

            // If the position is before the first child, set breakpoint on the first node
            if (isAskedPosAtOrLeftOfPos(childNodes.pos)) {
                return spanInChildNode(childNodes[0]);
            }

            // Asked pos is inside the child nodes pos-end, use spanInNodeArray to get the result
            return spanInNodeArray(childNodes, spanInChildNode, separtingToken);
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
                    return spanInTriviaContainingSeparatingToken(node.end, separtingToken, () => spanInNode(node), () => spanInNode(nodes[i + 1]));
                }
            }
        }
   }
}