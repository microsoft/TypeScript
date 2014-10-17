// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

/// <reference path='services.ts' />

module ts.BreakpointResolver {
    /**
     * Get the breakpoint span in given sourceFile
     */
    export function spanInSourceFileAtLocation(sourceFile: SourceFile, position: number) {
        // Cannot set breakpoint in dts file
        if (sourceFile.flags & NodeFlags.DeclarationFile) {
            return;
        }

        var tokenAtLocation = getTokenAtPosition(sourceFile, position);
        var lineOfPosition = sourceFile.getLineAndCharacterFromPosition(position).line;
        if (sourceFile.getLineAndCharacterFromPosition(tokenAtLocation.getStart()).line > lineOfPosition) {
            // Get previous token if the token is returned starts on new line
            // eg: var x =10; |--- curser is here
            //     var y = 10; 
            // token at position will return var keyword on second line as the token but we would like to use 
            // token on same line if trailing trivia (comments or white spaces on same line) part of the last token on that line
            tokenAtLocation = findPrecedingToken(tokenAtLocation.pos, sourceFile);
        }

        // Cannot set breakpoint in ambient declarations
        if (isInAmbientContext(tokenAtLocation)) {
            return;
        }

        // Get the span in the node based on its syntax
        return spanInNode(tokenAtLocation);

        function textSpan(startNode: Node, endNode?: Node) {
            return TypeScript.TextSpan.fromBounds(startNode.getStart(), (endNode || startNode).getEnd());
        }

        function spanInNodeIfStartsOnSameLine(node: Node, otherwiseOnNode?: Node): TypeScript.TextSpan {
            if (node && lineOfPosition === sourceFile.getLineAndCharacterFromPosition(node.getStart()).line) {
                return spanInNode(node);
            }
            return spanInNode(otherwiseOnNode);
        }

        function spanInPreviousNode(node: Node): TypeScript.TextSpan {
            return spanInNode(findPrecedingToken(node.pos, sourceFile));
        }

        function spanInNextNode(node: Node): TypeScript.TextSpan {
            return spanInNode(findNextToken(node, node.parent));
        }

        function spanInNode(node: Node): TypeScript.TextSpan {
            if (node) {
                switch (node.kind) {
                    case SyntaxKind.VariableStatement:
                        return spanInVariableStatement(<VariableStatement>node);

                    case SyntaxKind.VariableDeclaration:
                        return spanInVariableDeclaration(<VariableDeclaration>node);

                    case SyntaxKind.Parameter:
                        return spanInParameterDeclaration(<ParameterDeclaration>node);

                    case SyntaxKind.FunctionDeclaration:
                        return spanInFunctionDeclaration(<FunctionDeclaration>node);

                    case SyntaxKind.FunctionBlock:
                        return spanInFirstStatementOfBlock(<Block>node);

                    case SyntaxKind.Block:
                        return spanInBlock(<Block>node);

                    case SyntaxKind.ExpressionStatement:
                        return spanInExpressionStatement(<ExpressionStatement>node);

                    case SyntaxKind.ReturnStatement:
                        return spanInReturnStatement(<ReturnStatement>node);

                    case SyntaxKind.WhileStatement:
                        return spanInWhileStatement(<WhileStatement>node);

                    case SyntaxKind.DoStatement:
                        return spanInDoStatement(<DoStatement>node);

                    case SyntaxKind.DebuggerStatement:
                        return spanInDebuggerStatement(node);

                    case SyntaxKind.IfStatement:
                        return spanInIfStatement(<IfStatement>node);

                    case SyntaxKind.LabeledStatement:
                        return spanInLabeledStatement(<LabeledStatement>node);

                    case SyntaxKind.BreakStatement:
                    case SyntaxKind.ContinueStatement:
                        return spanInBreakOrContinueStatement(<BreakOrContinueStatement>node);

                    case SyntaxKind.ForStatement:
                        return spanInForStatement(<ForStatement>node);
                        
                    case SyntaxKind.BinaryExpression:
                    case SyntaxKind.PostfixOperator:
                    case SyntaxKind.PrefixOperator:
                        return spanInExpression(node);

                    // Tokens:
                    case SyntaxKind.SemicolonToken:
                    case SyntaxKind.EndOfFileToken:
                        return spanInNodeIfStartsOnSameLine(findPrecedingToken(node.pos, sourceFile));

                    case SyntaxKind.CommaToken:
                        return spanInCommaToken(node);

                    case SyntaxKind.OpenBraceToken:
                        return spanInOpenBraceToken(node);

                    case SyntaxKind.CloseBraceToken:
                        return spanInCloseBraceToken(node);

                    case SyntaxKind.OpenParenToken: 
                        return spanInOpenParenToken(node);

                    case SyntaxKind.CloseParenToken:
                        return spanInCloseParenToken(node);

                    case SyntaxKind.ColonToken:
                        return spanInColonToken(node);

                    // Keywords:
                    case SyntaxKind.WhileKeyword:
                        return spanInWhileKeyword(node);

                    case SyntaxKind.ElseKeyword:
                        return spanInNextNode(node);

                    default:
                        // Default go to parent to set the breakpoint
                        return spanInNode(node.parent);
                }
            }

            function spanInVariableDeclaration(variableDeclaration: VariableDeclaration): TypeScript.TextSpan {
                var isParentVariableStatement = variableDeclaration.parent.kind === SyntaxKind.VariableStatement;
                var isDeclarationOfForStatement = variableDeclaration.parent.kind === SyntaxKind.ForStatement && contains((<ForStatement>variableDeclaration.parent).declarations, variableDeclaration);
                var declarations = isParentVariableStatement
                    ? (<VariableStatement>variableDeclaration.parent).declarations
                    : isDeclarationOfForStatement 
                    ? (<ForStatement>variableDeclaration.parent).declarations
                    : undefined;

                // Breakpoint is possible in variableDeclaration only if there is initialization
                if (variableDeclaration.initializer) {
                    if (declarations && declarations[0] === variableDeclaration) {
                        if (isParentVariableStatement) {
                            // First declaration - include var keyword
                            return textSpan(variableDeclaration.parent, variableDeclaration);
                        }
                        else {
                            Debug.assert(isDeclarationOfForStatement);
                            // Include var keyword from for statement declarations in the span
                            return textSpan(findPrecedingToken(variableDeclaration.pos, sourceFile, variableDeclaration.parent), variableDeclaration);
                        }
                    }
                    else {
                        // Span only on this declaration
                        return textSpan(variableDeclaration);
                    }
                }
                else if (declarations && declarations[0] !== variableDeclaration) {
                    // If we cant set breakpoint on this declaration, set it on previous one
                    var indexOfCurrentDeclaration = indexOf(declarations, variableDeclaration);
                    return spanInVariableDeclaration(declarations[indexOfCurrentDeclaration - 1]);
                }
            }

            function spanInVariableStatement(variableStatement: VariableStatement): TypeScript.TextSpan {
                return spanInVariableDeclaration(variableStatement.declarations[0]);
            }

            function canHaveSpanInParameterDeclaration(parameter: ParameterDeclaration): boolean {
                // Breakpoint is possible on parameter only if it has initializer, is a rest parameter, or has public or private modifier
                return !!parameter.initializer || !!(parameter.flags & NodeFlags.Rest) ||
                    !!(parameter.flags & NodeFlags.Public) || !!(parameter.flags & NodeFlags.Private);
            }

            function spanInParameterDeclaration(parameter: ParameterDeclaration): TypeScript.TextSpan {
                if (canHaveSpanInParameterDeclaration(parameter)) {
                    return textSpan(parameter);
                }
                else {
                    var functionDeclaration = <FunctionDeclaration>parameter.parent;
                    var indexOfParameter = indexOf(functionDeclaration.parameters, parameter);
                    if (indexOfParameter) {
                        // Not a first parameter, go to previous parameter
                        return spanInParameterDeclaration(functionDeclaration.parameters[indexOfParameter - 1]);
                    }
                    else {
                        // Set breakpoint in the function declaration body
                        return spanInNode(functionDeclaration.body);
                    }
                }
            }

            function spanInFunctionDeclaration(functionDeclaration: FunctionDeclaration): TypeScript.TextSpan {
                // No breakpoints in the function signature
                if (!functionDeclaration.body) {
                    return;
                }

                // Is this coming because the touchingToken was in typeAnnotation of return type
                if (functionDeclaration.type) {
                    for (var node = tokenAtLocation; node; node = node.parent) {
                        if (node.parent === functionDeclaration && functionDeclaration.type === node) {
                            if (functionDeclaration.parameters && functionDeclaration.parameters.length) {
                                // Set breakpoint in last parameter
                                return spanInParameterDeclaration(functionDeclaration.parameters[functionDeclaration.parameters.length - 1]);
                            }

                            // Set breakpoint in function body
                            break;
                        }
                    }
                }

                // Set span in function body
                return spanInNode(functionDeclaration.body);
            }

            function spanInFirstStatementOfBlock(block: Block): TypeScript.TextSpan {
                // Set breakpoint in first statement
                return spanInNode(block.statements[0]);
            }

            function spanInLastStatementOfBlock(block: Block): TypeScript.TextSpan {
                // Set breakpoint in first statement
                return spanInNode(block.statements[block.statements.length - 1]);
            }

            function spanInBlock(block: Block): TypeScript.TextSpan {
                switch (block.parent.kind) {
                    // Set on parent if on same line otherwise on first statement
                    case SyntaxKind.WhileStatement:
                    case SyntaxKind.IfStatement:
                        return spanInNodeIfStartsOnSameLine(block.parent, block.statements[0]);

                    // Set span on previous token if it starts on same line otherwise on the first statement of the block
                    case SyntaxKind.ForStatement:
                        return spanInNodeIfStartsOnSameLine(findPrecedingToken(block.pos, sourceFile, block.parent), block.statements[0]);
                }

                // Default action is to set on first statement
                return spanInFirstStatementOfBlock(block);
            }

            function spanInExpressionStatement(expressionStatement: ExpressionStatement): TypeScript.TextSpan {
                return textSpan(expressionStatement.expression);
            }

            function spanInReturnStatement(returnStatement: ReturnStatement): TypeScript.TextSpan {
                return textSpan(returnStatement.getChildAt(0, sourceFile), returnStatement.expression);
            }

            function spanInWhileStatement(whileStatement: WhileStatement): TypeScript.TextSpan {
                return textSpan(whileStatement, findNextToken(whileStatement.expression, whileStatement));
            }

            function spanInDoStatement(doStatement: DoStatement): TypeScript.TextSpan {
                return spanInNode(doStatement.statement);
            }

            function spanInDebuggerStatement(node: Node): TypeScript.TextSpan {
                // Set breakpoint on debugger keyword
                return textSpan(node.getChildAt(0, sourceFile));
            }

            function spanInIfStatement(ifStatement: IfStatement): TypeScript.TextSpan {
                // set on if(..) span
                return textSpan(ifStatement, findNextToken(ifStatement.expression, ifStatement));
            }

            function spanInLabeledStatement(labeledStatement: LabeledStatement): TypeScript.TextSpan {
                return spanInNode(labeledStatement.statement);
            }

            function spanInBreakOrContinueStatement(breakOrContinueStatement: BreakOrContinueStatement): TypeScript.TextSpan {
                return textSpan(breakOrContinueStatement, breakOrContinueStatement.label || breakOrContinueStatement.getChildAt(0));
            }

            function spanInForStatement(forStatement: ForStatement): TypeScript.TextSpan {
                if (forStatement.declarations) {
                    return spanInNode(forStatement.declarations[0]);
                }
                if (forStatement.initializer) {
                    return spanInNode(forStatement.initializer);
                }
                if (forStatement.condition) {
                    return textSpan(forStatement.condition);
                }

                if (forStatement.iterator) {
                    return textSpan(forStatement.iterator);
                }
            }

            function spanInExpression(expression: Expression): TypeScript.TextSpan {
                //TODO (pick this up later) for now lets fix do-while baseline                if (node.parent.kind === SyntaxKind.DoStatement) {
                    // Set span as if on while keyword
                    return spanInPreviousNode(node);
                }

                if (node.parent.kind === SyntaxKind.ForStatement) {
                    // For now lets set the span on this expression, fix it later
                    return textSpan(expression);
                }

                // Default action for now:
                return spanInNode(expression.parent);
            }
            
            // Tokens:
            function spanInCommaToken(node: Node): TypeScript.TextSpan {
                switch (node.parent.kind) {
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.VariableStatement:
                        return spanInPreviousNode(node);

                    // Default to parent node
                    default:
                        return spanInNode(node.parent);
                }
            }

            function spanInOpenBraceToken(node: Node): TypeScript.TextSpan {
                switch (node.parent.kind) {
                    case SyntaxKind.FunctionBlock:
                        // Span on first statement
                        return spanInFirstStatementOfBlock(<Block>node.parent);

                    case SyntaxKind.Block:
                        return spanInBlock(<Block>node.parent);

                    // Default to parent node
                    default:
                        return spanInNode(node.parent);
                }
            }

            function spanInCloseBraceToken(node: Node): TypeScript.TextSpan {
                switch (node.parent.kind) {
                    case SyntaxKind.FunctionBlock:
                        // Span on close brace token
                        return textSpan(node);

                    case SyntaxKind.Block:
                        return spanInLastStatementOfBlock(<Block>node.parent);

                    // Default to parent node
                    default:
                        return spanInNode(node.parent);
                }
            }

            function spanInOpenParenToken(node: Node): TypeScript.TextSpan {
                if (node.parent.kind === SyntaxKind.DoStatement) {
                    // Go to while keyword and do action instead
                    return spanInPreviousNode(node);
                }

                // Default to parent node
                return spanInNode(node.parent);
            }

            function spanInCloseParenToken(node: Node): TypeScript.TextSpan {
                // Is this close paren token of parameter list, set span in previous token
                switch (node.parent.kind) {
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.ArrowFunction:
                    case SyntaxKind.Method:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                    case SyntaxKind.Constructor:
                    case SyntaxKind.WhileStatement:
                    case SyntaxKind.DoStatement:
                    case SyntaxKind.ForStatement:
                        return spanInPreviousNode(node);

                    // Default to parent node
                    default:
                        return spanInNode(node.parent);
                }

                // Default to parent node
                return spanInNode(node.parent);
            }

            function spanInColonToken(node: Node): TypeScript.TextSpan {
                // Is this : specifying return annotation of the function declaration
                if (isAnyFunction(node.parent)) {
                    return spanInPreviousNode(node);
                }

                return spanInNode(node.parent);
            }

            function spanInWhileKeyword(node: Node): TypeScript.TextSpan {
                if (node.parent.kind === SyntaxKind.DoStatement) {
                    // Set span on while expression
                    return textSpan(node, findNextToken((<DoStatement>node.parent).expression, node.parent));
                }

                // Default to parent node
                return spanInNode(node.parent);
            }
        }
   }
}