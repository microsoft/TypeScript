// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

///<reference path='typescriptServices.ts' />

module TypeScript.Services.Breakpoints {
    function createBreakpointSpanInfo(parentElement: TypeScript.PositionedElement, ...childElements: TypeScript.ISyntaxElement[]): SpanInfo {
        if (!parentElement) {
            return null;
        }

        if (childElements.length == 0) {
            return new SpanInfo(parentElement.start(), parentElement.end());
        }

        var start: number;
        var end: number;
        for (var i = 0; i < childElements.length; i++) {
            var element = childElements[i];
            if (element) {
                if (start == undefined) {
                    start = parentElement.childStart(element);
                }
                end = parentElement.childEnd(element);
            }
        }

        return new SpanInfo(start, end);
    }

    function createBreakpointSpanInfoWithLimChar(startElement: TypeScript.PositionedElement, limChar: number): SpanInfo {
        return new SpanInfo(startElement.start(), limChar);
    }

    class BreakpointResolver {
        constructor(private posLine: number, private lineMap: TypeScript.LineMap) {
        }

        private breakpointSpanOfToken(positionedToken: TypeScript.PositionedToken): SpanInfo {
            switch (positionedToken.token().tokenKind) {
                case TypeScript.SyntaxKind.OpenBraceToken:
                    return this.breakpointSpanOfOpenBrace(positionedToken);

                case TypeScript.SyntaxKind.CloseBraceToken:
                    return this.breakpointSpanOfCloseBrace(positionedToken);

                case TypeScript.SyntaxKind.CommaToken:
                    return this.breakpointSpanOfComma(positionedToken);

                case TypeScript.SyntaxKind.SemicolonToken:
                case TypeScript.SyntaxKind.EndOfFileToken:
                    return this.breakpointSpanIfStartsOnSameLine(positionedToken.previousToken());

                case TypeScript.SyntaxKind.CloseParenToken:
                    return this.breakpointSpanOfCloseParen(positionedToken);

                case TypeScript.SyntaxKind.DoKeyword:
                    var parentElement = positionedToken.parent();
                    if (parentElement && parentElement.kind() == TypeScript.SyntaxKind.DoStatement) {
                        return this.breakpointSpanIfStartsOnSameLine(positionedToken.nextToken());
                    }
                    break;
            }

            return this.breakpointSpanOfContainingNode(positionedToken);
        }

        private breakpointSpanOfOpenBrace(openBraceToken: TypeScript.PositionedToken): SpanInfo {
            var container = openBraceToken.containingNode();
            if (container) {
                var originalContainer = container;
                if (container && container.kind() == TypeScript.SyntaxKind.Block) {
                    // We have to check the parent and decide what to do with the breakpoint
                    container = container.containingNode();
                    if (!container) {
                        container = originalContainer;
                    }
                }

                switch (container.kind()) {
                    case TypeScript.SyntaxKind.Block:
                        if (!this.canHaveBreakpointInBlock(container)) {
                            return null;
                        }
                        return this.breakpointSpanOfFirstStatementInBlock(container);
                        break;

                    case TypeScript.SyntaxKind.ModuleDeclaration:
                    case TypeScript.SyntaxKind.ClassDeclaration:
                    case TypeScript.SyntaxKind.FunctionDeclaration:
                    case TypeScript.SyntaxKind.ConstructorDeclaration:
                    case TypeScript.SyntaxKind.MemberFunctionDeclaration:
                    case TypeScript.SyntaxKind.GetAccessor:
                    case TypeScript.SyntaxKind.SetAccessor:
                    case TypeScript.SyntaxKind.FunctionExpression:
                    case TypeScript.SyntaxKind.ParenthesizedArrowFunctionExpression:
                    case TypeScript.SyntaxKind.SimpleArrowFunctionExpression:
                        if (!this.canHaveBreakpointInDeclaration(container)) {
                            return null;
                        }
                        if (this.posLine != this.lineMap.getLineNumberFromPosition(container.start())) {
                            return this.breakpointSpanOfFirstChildOfSyntaxList(this.getSyntaxListOfDeclarationWithElements(container));
                        }
                        else {
                            return this.breakpointSpanOf(container);
                        }

                    case TypeScript.SyntaxKind.EnumDeclaration:
                        if (!this.canHaveBreakpointInDeclaration(container)) {
                            return null;
                        }
                        if (this.posLine != this.lineMap.getLineNumberFromPosition(container.start())) {
                            return this.breakpointSpanOfFirstEnumElement(container);
                        }
                        else {
                            return this.breakpointSpanOf(container);
                        }

                    case TypeScript.SyntaxKind.IfStatement:
                    case TypeScript.SyntaxKind.ForInStatement:
                    case TypeScript.SyntaxKind.WhileStatement:
                    case TypeScript.SyntaxKind.CatchClause:
                        if (this.posLine != this.lineMap.getLineNumberFromPosition(container.start())) {
                            return this.breakpointSpanOfFirstStatementInBlock(originalContainer);
                        }
                        else {
                            return this.breakpointSpanOf(container);
                        }

                    case TypeScript.SyntaxKind.DoStatement:
                        return this.breakpointSpanOfFirstStatementInBlock(originalContainer);

                    case TypeScript.SyntaxKind.ForStatement:
                        if (this.posLine != this.lineMap.getLineNumberFromPosition(container.start())) {
                            return this.breakpointSpanOfFirstStatementInBlock(originalContainer);
                        }
                        else {
                            return this.breakpointSpanOf(openBraceToken.previousToken());
                        }

                    case TypeScript.SyntaxKind.ElseClause:
                    case TypeScript.SyntaxKind.CaseSwitchClause:
                    case TypeScript.SyntaxKind.DefaultSwitchClause:
                    case TypeScript.SyntaxKind.WithStatement:
                    case TypeScript.SyntaxKind.TryStatement:
                    case TypeScript.SyntaxKind.FinallyClause:
                        return this.breakpointSpanOfFirstStatementInBlock(originalContainer);

                    case TypeScript.SyntaxKind.SwitchStatement:
                        if (this.posLine != this.lineMap.getLineNumberFromPosition(container.start())) {
                            return this.breakpointSpanOfFirstStatementOfFirstCaseClause(container);
                        }
                        else {
                            return this.breakpointSpanOf(container);
                        }
                }
            }

            return null;
        }

        private breakpointSpanOfCloseBrace(closeBraceToken: TypeScript.PositionedToken): SpanInfo {
            var container = closeBraceToken.containingNode();
            if (container) {
                var originalContainer = container;
                if (container.kind() == TypeScript.SyntaxKind.Block) {
                    // We have to check the parent and decide what to do with the breakpoint
                    container = container.containingNode();
                    if (!container) {
                        container = originalContainer;
                    }
                }

                switch (container.kind()) {
                    case TypeScript.SyntaxKind.Block:
                        if (!this.canHaveBreakpointInBlock(container)) {
                            return null;
                        }
                        return this.breakpointSpanOfLastStatementInBlock(container);
                        break;

                    case TypeScript.SyntaxKind.ModuleDeclaration:
                        if (!this.canHaveBreakpointInDeclaration(container)) {
                            return null;
                        }
                        var moduleSyntax = <TypeScript.ModuleDeclarationSyntax>container.node();
                        if (moduleSyntax.moduleElements && moduleSyntax.moduleElements.childCount() > 0) {
                            return createBreakpointSpanInfo(closeBraceToken);
                        }
                        else {
                            return null;
                        }

                    case TypeScript.SyntaxKind.ClassDeclaration:
                    case TypeScript.SyntaxKind.FunctionDeclaration:
                    case TypeScript.SyntaxKind.ConstructorDeclaration:
                    case TypeScript.SyntaxKind.MemberFunctionDeclaration:
                    case TypeScript.SyntaxKind.GetAccessor:
                    case TypeScript.SyntaxKind.SetAccessor:
                    case TypeScript.SyntaxKind.FunctionExpression:
                        if (!this.canHaveBreakpointInDeclaration(container)) {
                            return null;
                        }
                        return createBreakpointSpanInfo(closeBraceToken);

                    case TypeScript.SyntaxKind.EnumDeclaration:
                        if (!this.canHaveBreakpointInDeclaration(container)) {
                            return null;
                        }
                        return createBreakpointSpanInfo(closeBraceToken);

                    case TypeScript.SyntaxKind.IfStatement:
                    case TypeScript.SyntaxKind.ElseClause:
                    case TypeScript.SyntaxKind.ForInStatement:
                    case TypeScript.SyntaxKind.ForStatement:
                    case TypeScript.SyntaxKind.WhileStatement:
                    case TypeScript.SyntaxKind.DoStatement:
                    case TypeScript.SyntaxKind.CaseSwitchClause:
                    case TypeScript.SyntaxKind.DefaultSwitchClause:
                    case TypeScript.SyntaxKind.WithStatement:
                    case TypeScript.SyntaxKind.TryStatement:
                    case TypeScript.SyntaxKind.CatchClause:
                    case TypeScript.SyntaxKind.FinallyClause:
                    case TypeScript.SyntaxKind.ParenthesizedArrowFunctionExpression:
                    case TypeScript.SyntaxKind.SimpleArrowFunctionExpression:
                        return this.breakpointSpanOfLastStatementInBlock(originalContainer);

                    case TypeScript.SyntaxKind.SwitchStatement:
                        return this.breakpointSpanOfLastStatementOfLastCaseClause(container);
                }
            }

            return null;
        }


        private breakpointSpanOfComma(commaToken: TypeScript.PositionedToken): SpanInfo {
            var commaParent = commaToken.parent();
            if (commaParent && commaParent.element().isSeparatedList()) {
                var grandParent = commaParent.parent();
                if (grandParent) {
                    switch (grandParent.kind()) {
                        case TypeScript.SyntaxKind.VariableDeclaration:
                        case TypeScript.SyntaxKind.EnumDeclaration:
                        case TypeScript.SyntaxKind.ParameterList:
                            var index = commaParent.childIndex(commaToken.token());
                            // Use the previous child
                            if (index > 0) {
                                var child = commaParent.childAt(index - 1);
                                return this.breakpointSpanOf(child);
                            }

                            // If we cant set breakpoint on enum element, just dont set breakpoint
                            if (grandParent.kind() == TypeScript.SyntaxKind.EnumDeclaration) {
                                return null;
                            }
                            break;
                    }
                }
            }

            return this.breakpointSpanOfContainingNode(commaToken);
        }

        private breakpointSpanOfCloseParen(closeParenToken: TypeScript.PositionedToken): SpanInfo {
            var closeParenParent = closeParenToken.parent();
            if (closeParenParent) {
                switch (closeParenParent.kind()) {
                    case TypeScript.SyntaxKind.ForStatement:
                    case TypeScript.SyntaxKind.ParameterList:
                        return this.breakpointSpanOf(closeParenToken.previousToken());
                }
            }

            return this.breakpointSpanOfContainingNode(closeParenToken);
        }

        private canHaveBreakpointInBlock(blockNode: TypeScript.PositionedNode) {
            if (!blockNode || TypeScript.SyntaxUtilities.isAmbientDeclarationSyntax(blockNode)) {
                return false;
            }

            var blockSyntax = <TypeScript.BlockSyntax>blockNode.node();
            return blockSyntax.statements && blockSyntax.statements.childCount() != 0;
        }

        private breakpointSpanOfFirstStatementInBlock(blockNode: TypeScript.PositionedNode): SpanInfo {
            if (!blockNode) {
                return null;
            }

            var blockSyntax = <TypeScript.BlockSyntax>blockNode.node();
            var statementsNode = blockNode.getPositionedChild(blockSyntax.statements);
            if (!statementsNode || statementsNode.childCount() == 0) {
                return null;
            }

            var firstStatement = statementsNode.childAt(0);
            if (firstStatement && firstStatement.kind() == TypeScript.SyntaxKind.Block) {
                if (this.canHaveBreakpointInBlock(<TypeScript.PositionedNode>firstStatement)) {
                    return this.breakpointSpanOfFirstStatementInBlock(<TypeScript.PositionedNode>firstStatement);
                }
                return null;
            }
            else {
                return this.breakpointSpanOf(firstStatement);
            }
        }

        private breakpointSpanOfLastStatementInBlock(blockNode: TypeScript.PositionedNode): SpanInfo {
            if (!blockNode) {
                return null;
            }

            var blockSyntax = <TypeScript.BlockSyntax>blockNode.node();
            var statementsNode = blockNode.getPositionedChild(blockSyntax.statements);
            if (!statementsNode || statementsNode.childCount() == 0) {
                return null;
            }

            var lastStatement = statementsNode.childAt(statementsNode.childCount() - 1);
            if (lastStatement && lastStatement.kind() == TypeScript.SyntaxKind.Block) {
                if (this.canHaveBreakpointInBlock(<TypeScript.PositionedNode>lastStatement)) {
                    return this.breakpointSpanOfLastStatementInBlock(<TypeScript.PositionedNode>lastStatement);
                }
                return null;
            }
            else {
                return this.breakpointSpanOf(lastStatement);
            }
        }

        private breakpointSpanOfFirstChildOfSyntaxList(positionedList: TypeScript.PositionedList): SpanInfo {
            if (!positionedList) {
                return null;
            }

            // Find the first syntax element
            var listSyntax = positionedList.list();
            if (listSyntax.childCount() == 0) {
                return null;
            }

            var firstStatement = positionedList.childAt(0);
            if (firstStatement && firstStatement.kind() == TypeScript.SyntaxKind.Block) {
                if (this.canHaveBreakpointInBlock(<TypeScript.PositionedNode>firstStatement)) {
                    return this.breakpointSpanOfFirstStatementInBlock(<TypeScript.PositionedNode>firstStatement);
                }

                return null;
            }
            else {
                return this.breakpointSpanOf(firstStatement);
            }
        }

        private breakpointSpanOfLastChildOfSyntaxList(positionedList: TypeScript.PositionedList): SpanInfo {
            if (!positionedList) {
                return null;
            }

            // Find the first syntax element
            var listSyntax = positionedList.list();
            if (listSyntax.childCount() == 0) {
                return null;
            }
            var lastStatement = positionedList.childAt(0);
            if (lastStatement && lastStatement.kind() == TypeScript.SyntaxKind.Block) {
                if (this.canHaveBreakpointInBlock(<TypeScript.PositionedNode>lastStatement)) {
                    return this.breakpointSpanOfLastStatementInBlock(<TypeScript.PositionedNode>lastStatement);
                }
                return null;
            }
            else {
                return this.breakpointSpanOf(lastStatement);
            }
        }

        private breakpointSpanOfNode(positionedNode: TypeScript.PositionedNode): SpanInfo {
            var node = positionedNode.node();
            switch (node.kind()) {
                // Declarations with elements
                case TypeScript.SyntaxKind.ModuleDeclaration:
                case TypeScript.SyntaxKind.ClassDeclaration:
                case TypeScript.SyntaxKind.FunctionDeclaration:
                case TypeScript.SyntaxKind.ConstructorDeclaration:
                case TypeScript.SyntaxKind.MemberFunctionDeclaration:
                case TypeScript.SyntaxKind.GetAccessor:
                case TypeScript.SyntaxKind.SetAccessor:
                case TypeScript.SyntaxKind.FunctionExpression:
                    return this.breakpointSpanOfDeclarationWithElements(positionedNode);

                // Var, parameter and member variable declaration syntax
                case TypeScript.SyntaxKind.VariableDeclarator:
                    return this.breakpointSpanOfVariableDeclarator(positionedNode);

                case TypeScript.SyntaxKind.VariableDeclaration:
                    return this.breakpointSpanOfVariableDeclaration(positionedNode);

                case TypeScript.SyntaxKind.VariableStatement:
                    return this.breakpointSpanOfVariableStatement(positionedNode);

                case TypeScript.SyntaxKind.Parameter:
                    return this.breakpointSpanOfParameter(positionedNode);

                case TypeScript.SyntaxKind.MemberVariableDeclaration:
                    return this.breakpointSpanOfMemberVariableDeclaration(positionedNode);

                case TypeScript.SyntaxKind.ImportDeclaration:
                    return this.breakpointSpanOfImportDeclaration(positionedNode);

                case TypeScript.SyntaxKind.EnumDeclaration:
                    return this.breakpointSpanOfEnumDeclaration(positionedNode);

                case TypeScript.SyntaxKind.EnumElement:
                    return this.breakpointSpanOfEnumElement(positionedNode);

                // Statements
                case TypeScript.SyntaxKind.IfStatement:
                    return this.breakpointSpanOfIfStatement(positionedNode);
                case TypeScript.SyntaxKind.ElseClause:
                    return this.breakpointSpanOfElseClause(positionedNode);
                case TypeScript.SyntaxKind.ForInStatement:
                    return this.breakpointSpanOfForInStatement(positionedNode);
                case TypeScript.SyntaxKind.ForStatement:
                    return this.breakpointSpanOfForStatement(positionedNode);
                case TypeScript.SyntaxKind.WhileStatement:
                    return this.breakpointSpanOfWhileStatement(positionedNode);
                case TypeScript.SyntaxKind.DoStatement:
                    return this.breakpointSpanOfDoStatement(positionedNode);
                case TypeScript.SyntaxKind.SwitchStatement:
                    return this.breakpointSpanOfSwitchStatement(positionedNode);
                case TypeScript.SyntaxKind.CaseSwitchClause:
                    return this.breakpointSpanOfCaseSwitchClause(positionedNode);
                case TypeScript.SyntaxKind.DefaultSwitchClause:
                    return this.breakpointSpanOfDefaultSwitchClause(positionedNode);
                case TypeScript.SyntaxKind.WithStatement:
                    return this.breakpointSpanOfWithStatement(positionedNode);
                case TypeScript.SyntaxKind.TryStatement:
                    return this.breakpointSpanOfTryStatement(positionedNode);
                case TypeScript.SyntaxKind.CatchClause:
                    return this.breakpointSpanOfCatchClause(positionedNode);
                case TypeScript.SyntaxKind.FinallyClause:
                    return this.breakpointSpanOfFinallyClause(positionedNode);

                // Arrow expressions
                case TypeScript.SyntaxKind.ParenthesizedArrowFunctionExpression:
                    return this.breakpointSpanOfParenthesizedArrowFunctionExpression(positionedNode);

                case TypeScript.SyntaxKind.SimpleArrowFunctionExpression:
                    return this.breakpointSpanOfSimpleArrowFunctionExpression(positionedNode);

                // Expressions or statements
                default:
                    if (node.isStatement()) {
                        return this.breakpointSpanOfStatement(positionedNode);
                    }
                    else {
                        return this.breakpointOfExpression(positionedNode);
                    }
            }
        }

        private isExpressionOfArrowExpressions(expressionNode: TypeScript.PositionedNode): boolean {
            if (!expressionNode) {
                return false;
            }

            var expressionParent = expressionNode.parent();
            if (expressionParent) {
                if (expressionParent.kind() == TypeScript.SyntaxKind.ParenthesizedArrowFunctionExpression) {
                    var expression = expressionNode.element();
                    var parenthesizedArrowExpression = <TypeScript.ParenthesizedArrowFunctionExpressionSyntax>expressionParent.element();
                    var expressionOfParenthesizedArrowExpression = expressionParent.getPositionedChild(parenthesizedArrowExpression.expression);
                    return expressionOfParenthesizedArrowExpression && expressionOfParenthesizedArrowExpression.element() == expression;
                }
                else if (expressionParent.kind() == TypeScript.SyntaxKind.SimpleArrowFunctionExpression) {
                    var expression = expressionNode.element();
                    var simpleArrowExpression = <TypeScript.SimpleArrowFunctionExpressionSyntax>expressionParent.element();
                    var expressionOfSimpleArrowExpression = expressionParent.getPositionedChild(simpleArrowExpression.expression);
                    return expressionOfSimpleArrowExpression && expressionOfSimpleArrowExpression.element() == expression;
                }
                else if (expressionParent.kind() == TypeScript.SyntaxKind.CommaExpression) {
                    return this.isExpressionOfArrowExpressions(<TypeScript.PositionedNode>expressionParent);
                }
            }
            return false;
        }
        
        private isInitializerOfForStatement(expressionNode: TypeScript.PositionedNode): boolean {
            if (!expressionNode) {
                return false;
            }

            var expressionParent = expressionNode.parent();
            if (expressionParent && expressionParent.kind() == TypeScript.SyntaxKind.ForStatement) {
                var expression = expressionNode.element();
                var forStatement = <TypeScript.ForStatementSyntax>expressionParent.element();
                var initializer = expressionParent.getPositionedChild(forStatement.initializer);
                return initializer && initializer.element() == expression;
            }
            else if (expressionParent && expressionParent.kind() == TypeScript.SyntaxKind.CommaExpression) {
                return this.isInitializerOfForStatement(<TypeScript.PositionedNode>expressionParent);
            }

            return false;
        }

        private isConditionOfForStatement(expressionNode: TypeScript.PositionedNode): boolean {
            if (!expressionNode) {
                return false;
            }

            var expressionParent = expressionNode.parent();
            if (expressionParent && expressionParent.kind() == TypeScript.SyntaxKind.ForStatement) {
                var expression = expressionNode.element();
                var forStatement = <TypeScript.ForStatementSyntax>expressionParent.element();
                var condition = expressionParent.getPositionedChild(forStatement.condition);
                return condition && condition.element() == expression;
            }
            else if (expressionParent && expressionParent.kind() == TypeScript.SyntaxKind.CommaExpression) {
                return this.isConditionOfForStatement(<TypeScript.PositionedNode>expressionParent);
            }

            return false;
        }

        private isIncrememtorOfForStatement(expressionNode: TypeScript.PositionedNode): boolean {
            if (!expressionNode) {
                return false;
            }

            var expressionParent = expressionNode.parent();
            if (expressionParent && expressionParent.kind() == TypeScript.SyntaxKind.ForStatement) {
                var expression = expressionNode.element();
                var forStatement = <TypeScript.ForStatementSyntax>expressionParent.element();
                var incrementor = expressionParent.getPositionedChild(forStatement.incrementor);
                return incrementor && incrementor.element() == expression;
            }
            else if (expressionParent && expressionParent.kind() == TypeScript.SyntaxKind.CommaExpression) {
                return this.isIncrememtorOfForStatement(<TypeScript.PositionedNode>expressionParent);
            }

            return false;
        }

        private breakpointOfLeftOfCommaExpression(commaExpressionNode: TypeScript.PositionedNode): SpanInfo {
            var commaExpression = <TypeScript.BinaryExpressionSyntax>commaExpressionNode.node();
            return this.breakpointSpanOf(commaExpressionNode.getPositionedChild(commaExpression.left));
        }

        private breakpointOfExpression(expressionNode: TypeScript.PositionedNode): SpanInfo {
            if (this.isInitializerOfForStatement(expressionNode) ||
                this.isConditionOfForStatement(expressionNode) ||
                this.isIncrememtorOfForStatement(expressionNode)) {
                if (expressionNode.kind() == TypeScript.SyntaxKind.CommaExpression) {
                    return this.breakpointOfLeftOfCommaExpression(expressionNode);
                }
                return createBreakpointSpanInfo(expressionNode);
            }

            if (this.isExpressionOfArrowExpressions(expressionNode)) {
                if (expressionNode.kind() == TypeScript.SyntaxKind.CommaExpression) {
                    return this.breakpointOfLeftOfCommaExpression(expressionNode);
                }
                return createBreakpointSpanInfo(expressionNode);
            }

            if (expressionNode.kind() == TypeScript.SyntaxKind.ExportAssignment) {
                var exportAssignmentSyntax = <TypeScript.ExportAssignmentSyntax>expressionNode.node();
                return createBreakpointSpanInfo(expressionNode, exportAssignmentSyntax.exportKeyword, exportAssignmentSyntax.equalsToken, exportAssignmentSyntax.identifier);
            }

            return this.breakpointSpanOfContainingNode(expressionNode);
        }

        private breakpointSpanOfStatement(statementNode: TypeScript.PositionedNode): SpanInfo {
            var statement = statementNode.node();
            if (statement.kind() == TypeScript.SyntaxKind.EmptyStatement) {
                return null;
            }

            var containingNode = statementNode.containingNode();
            if (containingNode && containingNode.node().isStatement()) {
                // Check if not the declarations and the compound statements
                var useNodeForBreakpoint = false;
                switch (containingNode.kind()) {
                    // Declarations
                    case TypeScript.SyntaxKind.ModuleDeclaration:
                    case TypeScript.SyntaxKind.ClassDeclaration:
                    case TypeScript.SyntaxKind.FunctionDeclaration:
                    case TypeScript.SyntaxKind.ConstructorDeclaration:
                    case TypeScript.SyntaxKind.MemberFunctionDeclaration:
                    case TypeScript.SyntaxKind.GetAccessor:
                    case TypeScript.SyntaxKind.SetAccessor:
                    case TypeScript.SyntaxKind.Block:

                    // Compound Statements
                    case TypeScript.SyntaxKind.IfStatement:
                    case TypeScript.SyntaxKind.ElseClause:
                    case TypeScript.SyntaxKind.ForInStatement:
                    case TypeScript.SyntaxKind.ForStatement:
                    case TypeScript.SyntaxKind.WhileStatement:
                    case TypeScript.SyntaxKind.DoStatement:
                    case TypeScript.SyntaxKind.SwitchStatement:
                    case TypeScript.SyntaxKind.CaseSwitchClause:
                    case TypeScript.SyntaxKind.DefaultSwitchClause:
                    case TypeScript.SyntaxKind.WithStatement:
                    case TypeScript.SyntaxKind.TryStatement:
                    case TypeScript.SyntaxKind.CatchClause:
                    case TypeScript.SyntaxKind.FinallyClause:
                    case TypeScript.SyntaxKind.Block:
                        useNodeForBreakpoint = true;
                }

                if (!useNodeForBreakpoint) {
                    return this.breakpointSpanOfContainingNode(statementNode);
                }
            }

            switch (statement.kind()) {
                case TypeScript.SyntaxKind.ExpressionStatement:
                    var expressionSyntax = <TypeScript.ExpressionStatementSyntax>statement;
                    return createBreakpointSpanInfo(statementNode.getPositionedChild(expressionSyntax.expression));

                case TypeScript.SyntaxKind.ReturnStatement:
                    var returnStatementSyntax = <TypeScript.ReturnStatementSyntax>statement;
                    return createBreakpointSpanInfo(statementNode, returnStatementSyntax.returnKeyword, returnStatementSyntax.expression);

                case TypeScript.SyntaxKind.ThrowStatement:
                    var throwStatementSyntax = <TypeScript.ThrowStatementSyntax>statement;
                    return createBreakpointSpanInfo(statementNode, throwStatementSyntax.throwKeyword, throwStatementSyntax.expression);

                case TypeScript.SyntaxKind.BreakStatement:
                    var breakStatementSyntax = <TypeScript.BreakStatementSyntax>statement;
                    return createBreakpointSpanInfo(statementNode, breakStatementSyntax.breakKeyword, breakStatementSyntax.identifier);

                case TypeScript.SyntaxKind.ContinueStatement:
                    var continueStatementSyntax = <TypeScript.ContinueStatementSyntax>statement;
                    return createBreakpointSpanInfo(statementNode, continueStatementSyntax.continueKeyword, continueStatementSyntax.identifier);

                case TypeScript.SyntaxKind.DebuggerStatement:
                    var debuggerStatementSyntax = <TypeScript.DebuggerStatementSyntax>statement;
                    return createBreakpointSpanInfo(statementNode.getPositionedChild(debuggerStatementSyntax.debuggerKeyword));

                case TypeScript.SyntaxKind.LabeledStatement:
                    var labeledStatementSyntax = <TypeScript.LabeledStatementSyntax>statement;
                    return this.breakpointSpanOf(statementNode.getPositionedChild(labeledStatementSyntax.statement));
            }

            return null;
        }

        private getSyntaxListOfDeclarationWithElements(positionedNode: TypeScript.PositionedNode) {
            var node = positionedNode.node();
            var elementsList: TypeScript.ISyntaxList;
            var block: TypeScript.BlockSyntax;
            switch (node.kind()) {
                case TypeScript.SyntaxKind.ModuleDeclaration:
                    elementsList = (<TypeScript.ModuleDeclarationSyntax>node).moduleElements;
                    break;

                case TypeScript.SyntaxKind.ClassDeclaration:
                    elementsList = (<TypeScript.ClassDeclarationSyntax>node).classElements;
                    break;

                case TypeScript.SyntaxKind.FunctionDeclaration:
                    block = (<TypeScript.FunctionDeclarationSyntax>node).block;
                    break;

                case TypeScript.SyntaxKind.ConstructorDeclaration:
                    block = (<TypeScript.ConstructorDeclarationSyntax>node).block;
                    break;

                case TypeScript.SyntaxKind.MemberFunctionDeclaration:
                    block = (<TypeScript.MemberFunctionDeclarationSyntax>node).block;
                    break;

                case TypeScript.SyntaxKind.GetAccessor:
                    block = (<TypeScript.GetAccessorSyntax>node).block;
                    break;

                case TypeScript.SyntaxKind.SetAccessor:
                    block = (<TypeScript.SetAccessorSyntax>node).block;
                    break;

                case TypeScript.SyntaxKind.FunctionExpression:
                    block = (<TypeScript.FunctionExpressionSyntax>node).block;
                    break;

                case TypeScript.SyntaxKind.ParenthesizedArrowFunctionExpression:
                    block = (<TypeScript.ParenthesizedArrowFunctionExpressionSyntax>node).block;
                    break;

                case TypeScript.SyntaxKind.SimpleArrowFunctionExpression:
                    block = (<TypeScript.SimpleArrowFunctionExpressionSyntax>node).block;
                    break;

                default:
                    throw TypeScript.Errors.argument('positionNode', 'unknown node kind in getSyntaxListOfDeclarationWithElements');
            }

            var parentElement: TypeScript.PositionedElement = positionedNode;
            if (block) {
                parentElement = positionedNode.getPositionedChild(block);
                elementsList = block.statements;
            }

            return <TypeScript.PositionedList>parentElement.getPositionedChild(elementsList);
        }

        private canHaveBreakpointInDeclaration(positionedNode: TypeScript.PositionedNode) {
            return positionedNode && !TypeScript.SyntaxUtilities.isAmbientDeclarationSyntax(positionedNode);
        }

        private breakpointSpanOfDeclarationWithElements(positionedNode: TypeScript.PositionedNode): SpanInfo {
            if (!this.canHaveBreakpointInDeclaration(positionedNode)) {
                return null;
            }

            // If inside another module the whole declaration is debuggable
            var node = positionedNode.node();
            var moduleSyntax = <TypeScript.ModuleDeclarationSyntax>positionedNode.node();
            if ((node.isModuleElement() && positionedNode.containingNode().kind() != TypeScript.SyntaxKind.SourceUnit) ||
                node.isClassElement() ||
                (moduleSyntax.kind() == TypeScript.SyntaxKind.ModuleDeclaration && moduleSyntax.name
                && moduleSyntax.name.kind() == TypeScript.SyntaxKind.QualifiedName)) {
                return createBreakpointSpanInfo(positionedNode);
            }
            else {
                // Try to get the breakpoint in first element declaration
                return this.breakpointSpanOfFirstChildOfSyntaxList(this.getSyntaxListOfDeclarationWithElements(positionedNode));
            }
        }

        private canHaveBreakpointInVariableDeclarator(varDeclaratorNode: TypeScript.PositionedNode) {
            if (!varDeclaratorNode || TypeScript.SyntaxUtilities.isAmbientDeclarationSyntax(varDeclaratorNode)) {
                return false;
            }

            var varDeclaratorSyntax = <TypeScript.VariableDeclaratorSyntax>varDeclaratorNode.node();
            return !!varDeclaratorSyntax.equalsValueClause;
        }

        private breakpointSpanOfVariableDeclarator(varDeclaratorNode: TypeScript.PositionedNode): SpanInfo {
            if (!this.canHaveBreakpointInVariableDeclarator(varDeclaratorNode)) {
                return null;
            }

            var container = varDeclaratorNode.containingNode();
            if (container && container.kind() == TypeScript.SyntaxKind.VariableDeclaration) {
                var parentDeclaratorsList = <TypeScript.PositionedSeparatedList>varDeclaratorNode.parent();
                // If this is the first declarator in the list use the declaration instead
                if (parentDeclaratorsList && parentDeclaratorsList.list().childAt(0) == varDeclaratorNode.node()) {
                    return this.breakpointSpanOfVariableDeclaration(container);
                }

                // Create breakpoint on this var declarator
                if (this.canHaveBreakpointInVariableDeclarator(varDeclaratorNode)) {
                    return createBreakpointSpanInfo(varDeclaratorNode);
                }
                else {
                    return null;
                }
            }
            else if (container) {
                // Member Variable syntax
                return this.breakpointSpanOfMemberVariableDeclaration(container);
            }

            return null;
        }

        private canHaveBreakpointInVariableDeclaration(varDeclarationNode: TypeScript.PositionedNode) {
            if (!varDeclarationNode || TypeScript.SyntaxUtilities.isAmbientDeclarationSyntax(varDeclarationNode)) {
                return false;
            }

            var varDeclarationSyntax = <TypeScript.VariableDeclarationSyntax>varDeclarationNode.node();
            var containerChildren = varDeclarationNode.getPositionedChild(varDeclarationSyntax.variableDeclarators);
            if (!containerChildren || containerChildren.childCount() == 0) {
                return false;
            }

            var child = containerChildren.childAt(0);
            if (child && child.element().isNode()) {
                return this.canHaveBreakpointInVariableDeclarator(<TypeScript.PositionedNode>containerChildren.childAt(0));
            }

            return false;
        }

        private breakpointSpanOfVariableDeclaration(varDeclarationNode: TypeScript.PositionedNode): SpanInfo {
            if (!this.canHaveBreakpointInDeclaration(varDeclarationNode)) {
                return null;
            }

            var container = varDeclarationNode.containingNode();
            var varDeclarationSyntax = <TypeScript.VariableDeclarationSyntax>varDeclarationNode.node();
            var varDeclarators = varDeclarationNode.getPositionedChild(varDeclarationSyntax.variableDeclarators);
            var varDeclaratorsCount = varDeclarators.childCount(); // varDeclarators has to be non null because its checked in canHaveBreakpoint

            if (container && container.kind() == TypeScript.SyntaxKind.VariableStatement) {
                return this.breakpointSpanOfVariableStatement(container);
            }

            if (this.canHaveBreakpointInVariableDeclaration(varDeclarationNode)) {
                return createBreakpointSpanInfoWithLimChar(varDeclarationNode, varDeclarators.childEndAt(0));
            }
            else {
                return null;
            }
        }

        private canHaveBreakpointInVariableStatement(varStatementNode: TypeScript.PositionedNode) {
            if (!varStatementNode || TypeScript.SyntaxUtilities.isAmbientDeclarationSyntax(varStatementNode)) {
                return false;
            }

            var variableStatement = <TypeScript.VariableStatementSyntax>varStatementNode.node();
            return this.canHaveBreakpointInVariableDeclaration(<TypeScript.PositionedNode>varStatementNode.getPositionedChild(variableStatement.variableDeclaration));
        }

        private breakpointSpanOfVariableStatement(varStatementNode: TypeScript.PositionedNode): SpanInfo {
            if (!this.canHaveBreakpointInVariableStatement(varStatementNode)) {
                return null;
            }

            var variableStatement = <TypeScript.VariableStatementSyntax>varStatementNode.node();
            var variableDeclaration = <TypeScript.PositionedNode>varStatementNode.getPositionedChild(variableStatement.variableDeclaration);
            var varDeclarationSyntax = <TypeScript.VariableDeclarationSyntax>variableDeclaration.node();
            var varDeclarators = variableDeclaration.getPositionedChild(varDeclarationSyntax.variableDeclarators);
            return createBreakpointSpanInfoWithLimChar(varStatementNode, varDeclarators.childEndAt(0));
        }

        private breakpointSpanOfParameter(parameterNode: TypeScript.PositionedNode): SpanInfo {
            if (TypeScript.SyntaxUtilities.isAmbientDeclarationSyntax(parameterNode)) {
                return null;
            }

            var parameterSyntax = <TypeScript.ParameterSyntax>parameterNode.node();
            if (parameterSyntax.dotDotDotToken || parameterSyntax.equalsValueClause || parameterSyntax.modifiers.childCount() > 0) {
                return createBreakpointSpanInfo(parameterNode);
            }
            else {
                return null;
            }
        }

        private breakpointSpanOfMemberVariableDeclaration(memberVarDeclarationNode: TypeScript.PositionedNode): SpanInfo {
            if (TypeScript.SyntaxUtilities.isAmbientDeclarationSyntax(memberVarDeclarationNode)) {
                return null;
            }

            var memberVariableDeclaration = <TypeScript.MemberVariableDeclarationSyntax>memberVarDeclarationNode.node();
            if (this.canHaveBreakpointInVariableDeclarator(<TypeScript.PositionedNode>memberVarDeclarationNode.getPositionedChild(memberVariableDeclaration.variableDeclarator))) {
                return createBreakpointSpanInfo(memberVarDeclarationNode, memberVariableDeclaration.modifiers, memberVariableDeclaration.variableDeclarator);
            }
            else {
                return null;
            }
        }

        private breakpointSpanOfImportDeclaration(importDeclarationNode: TypeScript.PositionedNode): SpanInfo {
            if (TypeScript.SyntaxUtilities.isAmbientDeclarationSyntax(importDeclarationNode)) {
                return null;
            }

            var importSyntax = <TypeScript.ImportDeclarationSyntax>importDeclarationNode.node();
            return createBreakpointSpanInfo(importDeclarationNode, importSyntax.modifiers, importSyntax.importKeyword, importSyntax.identifier, importSyntax.equalsToken, importSyntax.moduleReference);
        }

        private breakpointSpanOfEnumDeclaration(enumDeclarationNode: TypeScript.PositionedNode): SpanInfo {
            if (!this.canHaveBreakpointInDeclaration(enumDeclarationNode)) {
                return null;
            }

            return createBreakpointSpanInfo(enumDeclarationNode);
        }

        private breakpointSpanOfFirstEnumElement(enumDeclarationNode: TypeScript.PositionedNode): SpanInfo {
            var enumDeclarationSyntax = <TypeScript.EnumDeclarationSyntax>enumDeclarationNode.node();
            var enumElements = enumDeclarationNode.getPositionedChild(enumDeclarationSyntax.enumElements);
            if (enumElements && enumElements.childCount()) {
                return this.breakpointSpanOf(enumElements.childAt(0));
            }

            return null;
        }

        private breakpointSpanOfEnumElement(enumElementNode: TypeScript.PositionedNode): SpanInfo {
            if (TypeScript.SyntaxUtilities.isAmbientDeclarationSyntax(enumElementNode)) {
                return null;
            }

            return createBreakpointSpanInfo(enumElementNode);
        }

        private breakpointSpanOfIfStatement(ifStatementNode: TypeScript.PositionedNode): SpanInfo {
            var ifStatement = <TypeScript.IfStatementSyntax>ifStatementNode.node();
            return createBreakpointSpanInfo(ifStatementNode, ifStatement.ifKeyword, ifStatement.openParenToken, ifStatement.condition, ifStatement.closeParenToken);
        }

        private breakpointSpanOfElseClause(elseClauseNode: TypeScript.PositionedNode): SpanInfo {
            var elseClause = <TypeScript.ElseClauseSyntax>elseClauseNode.node();
            return this.breakpointSpanOf(elseClauseNode.getPositionedChild(elseClause.statement));
        }

        private breakpointSpanOfForInStatement(forInStatementNode: TypeScript.PositionedNode): SpanInfo {
            var forInStatement = <TypeScript.ForInStatementSyntax>forInStatementNode.node();
            return createBreakpointSpanInfo(forInStatementNode, forInStatement.forKeyword, forInStatement.openParenToken, forInStatement.variableDeclaration,
                forInStatement.left, forInStatement.inKeyword, forInStatement.expression, forInStatement.closeParenToken);
        }

        private breakpointSpanOfForStatement(forStatementNode: TypeScript.PositionedNode): SpanInfo {
            var forStatement = <TypeScript.ForStatementSyntax>forStatementNode.node();
            return this.breakpointSpanOf(forStatementNode.getPositionedChild(forStatement.variableDeclaration ? forStatement.variableDeclaration : forStatement.initializer));
        }

        private breakpointSpanOfWhileStatement(whileStatementNode: TypeScript.PositionedNode): SpanInfo {
            var whileStatement = <TypeScript.WhileStatementSyntax>whileStatementNode.node();
            return createBreakpointSpanInfo(whileStatementNode, whileStatement.whileKeyword, whileStatement.openParenToken, whileStatement.condition, whileStatement.closeParenToken);
        }

        private breakpointSpanOfDoStatement(doStatementNode: TypeScript.PositionedNode): SpanInfo {
            var doStatement = <TypeScript.DoStatementSyntax>doStatementNode.node();
            return createBreakpointSpanInfo(doStatementNode, doStatement.whileKeyword, doStatement.openParenToken, doStatement.condition, doStatement.closeParenToken);
        }

        private breakpointSpanOfSwitchStatement(switchStatementNode: TypeScript.PositionedNode): SpanInfo {
            var switchStatement = <TypeScript.SwitchStatementSyntax>switchStatementNode.node();
            return createBreakpointSpanInfo(switchStatementNode, switchStatement.switchKeyword, switchStatement.openParenToken, switchStatement.expression, switchStatement.closeParenToken);
        }

        private breakpointSpanOfFirstStatementOfFirstCaseClause(switchStatementNode: TypeScript.PositionedNode): SpanInfo {
            var switchStatement = <TypeScript.SwitchStatementSyntax>switchStatementNode.node();
            if (switchStatement.switchClauses && switchStatement.switchClauses.childCount() == 0) {
                return null;
            }

            var switchClauses = <TypeScript.PositionedList>switchStatementNode.getPositionedChild(switchStatement.switchClauses);
            if (switchClauses.childCount() == 0) {
                return null;
            }

            var firstCaseClause = <TypeScript.PositionedNode>switchClauses.childAt(0);
            var statements: TypeScript.ISyntaxList = null;
            if (firstCaseClause && firstCaseClause.kind() == TypeScript.SyntaxKind.CaseSwitchClause) {
                var caseClause = <TypeScript.CaseSwitchClauseSyntax>firstCaseClause.node();
                statements = caseClause.statements;
            }
            else if (firstCaseClause && firstCaseClause.kind() == TypeScript.SyntaxKind.DefaultSwitchClause) {
                var defaultClause = <TypeScript.CaseSwitchClauseSyntax>firstCaseClause.node();
                statements = defaultClause.statements;
            }
            else {
                return null;
            }

            return this.breakpointSpanOfFirstChildOfSyntaxList(<TypeScript.PositionedList>firstCaseClause.getPositionedChild(statements));
        }

        private breakpointSpanOfLastStatementOfLastCaseClause(switchStatementNode: TypeScript.PositionedNode): SpanInfo {
            var switchStatement = <TypeScript.SwitchStatementSyntax>switchStatementNode.node();
            if (switchStatement.switchClauses && switchStatement.switchClauses.childCount() == 0) {
                return null;
            }

            var switchClauses = <TypeScript.PositionedList>switchStatementNode.getPositionedChild(switchStatement.switchClauses);
            if (switchClauses.childCount() == 0) {
                return null;
            }

            var lastClauseNode = <TypeScript.PositionedNode>switchClauses.childAt(switchClauses.childCount() - 1);
            var statements: TypeScript.ISyntaxList = null;
            if (lastClauseNode && lastClauseNode.kind() == TypeScript.SyntaxKind.CaseSwitchClause) {
                var caseClause = <TypeScript.CaseSwitchClauseSyntax>lastClauseNode.node();
                statements = caseClause.statements;
            }
            else if (lastClauseNode && lastClauseNode.kind() == TypeScript.SyntaxKind.DefaultSwitchClause) {
                var defaultClause = <TypeScript.CaseSwitchClauseSyntax>lastClauseNode.node();
                statements = defaultClause.statements;
            }
            else {
                return null;
            }

            return this.breakpointSpanOfLastChildOfSyntaxList(<TypeScript.PositionedList>lastClauseNode.getPositionedChild(statements));
        }

        private breakpointSpanOfCaseSwitchClause(caseClauseNode: TypeScript.PositionedNode): SpanInfo {
            var caseSwitchClause = <TypeScript.CaseSwitchClauseSyntax>caseClauseNode.node();
            return this.breakpointSpanOfFirstChildOfSyntaxList(<TypeScript.PositionedList>caseClauseNode.getPositionedChild(caseSwitchClause.statements));
        }

        private breakpointSpanOfDefaultSwitchClause(defaultSwithClauseNode: TypeScript.PositionedNode): SpanInfo {
            var defaultSwitchClause = <TypeScript.DefaultSwitchClauseSyntax>defaultSwithClauseNode.node();
            return this.breakpointSpanOfFirstChildOfSyntaxList(<TypeScript.PositionedList>defaultSwithClauseNode.getPositionedChild(defaultSwitchClause.statements));
        }

        private breakpointSpanOfWithStatement(withStatementNode: TypeScript.PositionedNode): SpanInfo {
            var withStatement = <TypeScript.WithStatementSyntax>withStatementNode.node();
            return this.breakpointSpanOf(withStatementNode.getPositionedChild(withStatement.statement));
        }

        private breakpointSpanOfTryStatement(tryStatementNode: TypeScript.PositionedNode): SpanInfo {
            var tryStatement = <TypeScript.TryStatementSyntax>tryStatementNode.node();
            return this.breakpointSpanOfFirstStatementInBlock(<TypeScript.PositionedNode>tryStatementNode.getPositionedChild(tryStatement.block));
        }

        private breakpointSpanOfCatchClause(catchClauseNode: TypeScript.PositionedNode): SpanInfo {
            var catchClause = <TypeScript.CatchClauseSyntax>catchClauseNode.node();
            return createBreakpointSpanInfo(catchClauseNode, catchClause.catchKeyword, catchClause.openParenToken, catchClause.identifier, catchClause.typeAnnotation, catchClause.closeParenToken);
        }

        private breakpointSpanOfFinallyClause(finallyClauseNode: TypeScript.PositionedNode): SpanInfo {
            var finallyClause = <TypeScript.FinallyClauseSyntax>finallyClauseNode.node();
            return this.breakpointSpanOfFirstStatementInBlock(<TypeScript.PositionedNode>finallyClauseNode.getPositionedChild(finallyClause.block));
        }

        private breakpointSpanOfParenthesizedArrowFunctionExpression(arrowFunctionExpressionNode: TypeScript.PositionedNode): SpanInfo {
            var arrowFunctionExpression = <TypeScript.ParenthesizedArrowFunctionExpressionSyntax>arrowFunctionExpressionNode.node();
            if (arrowFunctionExpression.block) {
                return this.breakpointSpanOfFirstStatementInBlock(<TypeScript.PositionedNode>arrowFunctionExpressionNode.getPositionedChild(arrowFunctionExpression.block));
            }
            else {
                return this.breakpointSpanOf(arrowFunctionExpressionNode.getPositionedChild(arrowFunctionExpression.expression));
            }
        }

        private breakpointSpanOfSimpleArrowFunctionExpression(arrowFunctionExpressionNode: TypeScript.PositionedNode): SpanInfo {
            var arrowFunctionExpression = <TypeScript.SimpleArrowFunctionExpressionSyntax>arrowFunctionExpressionNode.node();
            if (arrowFunctionExpression.block) {
                return this.breakpointSpanOfFirstStatementInBlock(<TypeScript.PositionedNode>arrowFunctionExpressionNode.getPositionedChild(arrowFunctionExpression.block));
            }
            else {
                return this.breakpointSpanOf(arrowFunctionExpressionNode.getPositionedChild(arrowFunctionExpression.expression));
            }
        }

        private breakpointSpanOfContainingNode(positionedElement: TypeScript.PositionedElement): SpanInfo {
            return this.breakpointSpanOf(positionedElement.containingNode());
        }

        private breakpointSpanIfStartsOnSameLine(positionedElement: TypeScript.PositionedElement): SpanInfo {
            if (positionedElement && this.posLine == this.lineMap.getLineNumberFromPosition(positionedElement.start())) {
                return this.breakpointSpanOf(positionedElement);
            }

            return null;
        }

        public breakpointSpanOf(positionedElement: TypeScript.PositionedElement): SpanInfo {
            if (!positionedElement) {
                return null;
            }

            for (var containingNode = positionedElement.containingNode(); containingNode != null; containingNode = containingNode.containingNode()) {
                if (containingNode.kind() == TypeScript.SyntaxKind.TypeAnnotation) {
                    return this.breakpointSpanIfStartsOnSameLine(containingNode);
                }
            }

            var element = positionedElement.element();

            // Syntax node
            if (element.isNode()) {
                return this.breakpointSpanOfNode(<TypeScript.PositionedNode>positionedElement);
            }

            // Token
            if (element.isToken()) {
                return this.breakpointSpanOfToken(<TypeScript.PositionedToken>positionedElement);
            }

            // List
            // Separated List 
            return this.breakpointSpanOfContainingNode(positionedElement);
        }
    }

    export function getBreakpointLocation(syntaxTree: TypeScript.SyntaxTree, askedPos: number): SpanInfo {
        // Cannot set breakpoint in dts file
        if (TypeScript.isDTSFile(syntaxTree.fileName())) {
            return null;
        }

        var sourceUnit = syntaxTree.sourceUnit();
        var positionedToken = sourceUnit.findToken(askedPos);

        var lineMap = syntaxTree.lineMap();
        var posLine = lineMap.getLineNumberFromPosition(askedPos);
        var tokenStartLine = lineMap.getLineNumberFromPosition(positionedToken.start());
        if (posLine < tokenStartLine) {
            return null;
        }

        var breakpointResolver = new BreakpointResolver(posLine, lineMap);
        return breakpointResolver.breakpointSpanOf(positionedToken);
    }
}