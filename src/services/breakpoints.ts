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
            return undefined;
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

            // Its a blank line
            if (!tokenAtLocation || sourceFile.getLineAndCharacterFromPosition(tokenAtLocation.getEnd()).line !== lineOfPosition) {
                return undefined;
            }
        }

        // Cannot set breakpoint in ambient declarations
        if (isInAmbientContext(tokenAtLocation)) {
            return undefined;
        }

        // Get the span in the node based on its syntax
        return spanInNode(tokenAtLocation);

        function textSpan(startNode: Node, endNode?: Node) {
            return TextSpan.fromBounds(startNode.getStart(), (endNode || startNode).getEnd());
        }

        function spanInNodeIfStartsOnSameLine(node: Node, otherwiseOnNode?: Node): TextSpan {
            if (node && lineOfPosition === sourceFile.getLineAndCharacterFromPosition(node.getStart()).line) {
                return spanInNode(node);
            }
            return spanInNode(otherwiseOnNode);
        }

        function spanInPreviousNode(node: Node): TextSpan {
            return spanInNode(findPrecedingToken(node.pos, sourceFile));
        }

        function spanInNextNode(node: Node): TextSpan {
            return spanInNode(findNextToken(node, node.parent));
        }

        function spanInNode(node: Node): TextSpan {
            if (node) {
                if (isExpression(node)) {
                    if (node.parent.kind === SyntaxKind.DoStatement) {
                        // Set span as if on while keyword
                        return spanInPreviousNode(node);
                    }

                    if (node.parent.kind === SyntaxKind.ForStatement) {
                        // For now lets set the span on this expression, fix it later
                        return textSpan(node);
                    }

                    if (node.parent.kind === SyntaxKind.BinaryExpression && (<BinaryExpression>node.parent).operator === SyntaxKind.CommaToken) {
                        // if this is comma expression, the breakpoint is possible in this expression
                        return textSpan(node);
                    }

                    if (node.parent.kind == SyntaxKind.ArrowFunction && (<FunctionLikeDeclaration>node.parent).body == node) {
                        // If this is body of arrow function, it is allowed to have the breakpoint
                        return textSpan(node);
                    }
                }

                switch (node.kind) {
                    case SyntaxKind.VariableStatement:
                        // Span on first variable declaration
                        return spanInVariableDeclaration((<VariableStatement>node).declarations[0]);

                    case SyntaxKind.VariableDeclaration:
                    case SyntaxKind.Property:
                        return spanInVariableDeclaration(<VariableDeclaration>node);

                    case SyntaxKind.Parameter:
                        return spanInParameterDeclaration(<ParameterDeclaration>node);

                    case SyntaxKind.FunctionDeclaration:
                    case SyntaxKind.Method:
                    case SyntaxKind.GetAccessor:
                    case SyntaxKind.SetAccessor:
                    case SyntaxKind.Constructor:
                    case SyntaxKind.FunctionExpression:
                    case SyntaxKind.ArrowFunction:
                        return spanInFunctionDeclaration(<FunctionLikeDeclaration>node);

                    case SyntaxKind.Block:
                        if (isFunctionBlock(node)) {
                            return spanInFunctionBlock(<Block>node);
                        }
                        // Fall through
                    case SyntaxKind.TryBlock:
                    case SyntaxKind.FinallyBlock:
                    case SyntaxKind.ModuleBlock:
                        return spanInBlock(<Block>node);

                    case SyntaxKind.CatchClause:
                        return spanInBlock((<CatchClause>node).block);

                    case SyntaxKind.ExpressionStatement:
                        // span on the expression
                        return textSpan((<ExpressionStatement>node).expression);

                    case SyntaxKind.ReturnStatement:
                        // span on return keyword and expression if present
                        return textSpan(node.getChildAt(0), (<ReturnStatement>node).expression);

                    case SyntaxKind.WhileStatement:
                        // Span on while(...)
                        return textSpan(node, findNextToken((<WhileStatement>node).expression, node));

                    case SyntaxKind.DoStatement:
                        // span in statement of the do statement
                        return spanInNode((<DoStatement>node).statement);

                    case SyntaxKind.DebuggerStatement:
                        // span on debugger keyword
                        return textSpan(node.getChildAt(0));

                    case SyntaxKind.IfStatement:
                        // set on if(..) span
                        return textSpan(node, findNextToken((<IfStatement>node).expression, node));

                    case SyntaxKind.LabeledStatement:
                        // span in statement
                        return spanInNode((<LabeledStatement>node).statement);

                    case SyntaxKind.BreakStatement:
                    case SyntaxKind.ContinueStatement:
                        // On break or continue keyword and label if present
                        return textSpan(node.getChildAt(0), (<BreakOrContinueStatement>node).label);

                    case SyntaxKind.ForStatement:
                        return spanInForStatement(<ForStatement>node);

                    case SyntaxKind.ForInStatement:
                        // span on for (a in ...)
                        return textSpan(node, findNextToken((<ForInStatement>node).expression, node));

                    case SyntaxKind.SwitchStatement:
                        // span on switch(...)
                        return textSpan(node, findNextToken((<SwitchStatement>node).expression, node));

                    case SyntaxKind.CaseClause:
                    case SyntaxKind.DefaultClause:
                        // span in first statement of the clause
                        return spanInNode((<CaseOrDefaultClause>node).statements[0]);

                    case SyntaxKind.TryStatement:
                        // span in try block
                        return spanInBlock((<TryStatement>node).tryBlock);

                    case SyntaxKind.ThrowStatement:
                        // span in throw ...
                        return textSpan(node, (<ThrowStatement>node).expression);

                    case SyntaxKind.ExportAssignment:
                        // span on export = id
                        return textSpan(node, (<ExportAssignment>node).exportName);

                    case SyntaxKind.ImportDeclaration:
                        // import statement without including semicolon
                        return textSpan(node,(<ImportDeclaration>node).moduleReference);

                    case SyntaxKind.ModuleDeclaration:
                        // span on complete module if it is instantiated
                        if (getModuleInstanceState(node) !== ModuleInstanceState.Instantiated) {
                            return undefined;
                        }

                    case SyntaxKind.ClassDeclaration:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.EnumMember:
                    case SyntaxKind.CallExpression:
                    case SyntaxKind.NewExpression:
                        // span on complete node
                        return textSpan(node);

                    case SyntaxKind.WithStatement:
                        // span in statement
                        return spanInNode((<WithStatement>node).statement);

                    // No breakpoint in interface, type alias
                    case SyntaxKind.InterfaceDeclaration:
                    case SyntaxKind.TypeAliasDeclaration:
                        return undefined;

                    // Tokens:
                    case SyntaxKind.SemicolonToken:
                    case SyntaxKind.EndOfFileToken:
                        return spanInNodeIfStartsOnSameLine(findPrecedingToken(node.pos, sourceFile));

                    case SyntaxKind.CommaToken:
                        return spanInPreviousNode(node)
                        
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

                    case SyntaxKind.GreaterThanToken:
                    case SyntaxKind.LessThanToken:
                        return spanInGreaterThanOrLessThanToken(node);

                    // Keywords:
                    case SyntaxKind.WhileKeyword:
                        return spanInWhileKeyword(node);

                    case SyntaxKind.ElseKeyword:
                    case SyntaxKind.CatchKeyword:
                    case SyntaxKind.FinallyKeyword:
                        return spanInNextNode(node);

                    default:
                        // If this is name of property assignment, set breakpoint in the initializer
                        if (node.parent.kind === SyntaxKind.PropertyAssignment && (<PropertyDeclaration>node.parent).name === node) {
                            return spanInNode((<PropertyDeclaration>node.parent).initializer);
                        }

                        // Breakpoint in type assertion goes to its operand
                        if (node.parent.kind === SyntaxKind.TypeAssertionExpression && (<TypeAssertion>node.parent).type === node) {
                            return spanInNode((<TypeAssertion>node.parent).expression);
                        }

                        // return type of function go to previous token
                        if (isAnyFunction(node.parent) && (<FunctionLikeDeclaration>node.parent).type === node) {
                            return spanInPreviousNode(node);
                        }

                        // Default go to parent to set the breakpoint
                        return spanInNode(node.parent);
                }
            }

            function spanInVariableDeclaration(variableDeclaration: VariableDeclaration): TextSpan {
                // If declaration of for in statement, just set the span in parent
                if (variableDeclaration.parent.kind === SyntaxKind.ForInStatement) {
                    return spanInNode(variableDeclaration.parent);
                }

                var isParentVariableStatement = variableDeclaration.parent.kind === SyntaxKind.VariableStatement;
                var isDeclarationOfForStatement = variableDeclaration.parent.kind === SyntaxKind.ForStatement && contains((<ForStatement>variableDeclaration.parent).declarations, variableDeclaration);
                var declarations = isParentVariableStatement
                    ? (<VariableStatement>variableDeclaration.parent).declarations
                    : isDeclarationOfForStatement
                        ? (<ForStatement>variableDeclaration.parent).declarations
                        : undefined;

                // Breakpoint is possible in variableDeclaration only if there is initialization
                if (variableDeclaration.initializer || (variableDeclaration.flags & NodeFlags.Export)) {
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

            function canHaveSpanInParameterDeclaration(parameter: ParameterDeclaration): boolean {
                // Breakpoint is possible on parameter only if it has initializer, is a rest parameter, or has public or private modifier
                return !!parameter.initializer || parameter.dotDotDotToken !== undefined ||
                    !!(parameter.flags & NodeFlags.Public) || !!(parameter.flags & NodeFlags.Private);
            }

            function spanInParameterDeclaration(parameter: ParameterDeclaration): TextSpan {
                if (canHaveSpanInParameterDeclaration(parameter)) {
                    return textSpan(parameter);
                }
                else {
                    var functionDeclaration = <FunctionLikeDeclaration>parameter.parent;
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

            function canFunctionHaveSpanInWholeDeclaration(functionDeclaration: FunctionLikeDeclaration) {
                return !!(functionDeclaration.flags & NodeFlags.Export) ||
                    (functionDeclaration.parent.kind === SyntaxKind.ClassDeclaration && functionDeclaration.kind !== SyntaxKind.Constructor);
            }

            function spanInFunctionDeclaration(functionDeclaration: FunctionLikeDeclaration): TextSpan {
                // No breakpoints in the function signature
                if (!functionDeclaration.body) {
                    return undefined;
                }

                if (canFunctionHaveSpanInWholeDeclaration(functionDeclaration)) {
                    // Set the span on whole function declaration
                    return textSpan(functionDeclaration);
                }

                // Set span in function body
                return spanInNode(functionDeclaration.body);
            }

            function spanInFunctionBlock(block: Block): TextSpan {
                var nodeForSpanInBlock = block.statements.length ? block.statements[0] : block.getLastToken();
                if (canFunctionHaveSpanInWholeDeclaration(<FunctionLikeDeclaration>block.parent)) {
                    return spanInNodeIfStartsOnSameLine(block.parent, nodeForSpanInBlock);
                }

                return spanInNode(nodeForSpanInBlock);
            }

            function spanInBlock(block: Block): TextSpan {
                switch (block.parent.kind) {
                    case SyntaxKind.ModuleDeclaration:
                        if (getModuleInstanceState(block.parent) !== ModuleInstanceState.Instantiated) {
                            return undefined;
                        }

                    // Set on parent if on same line otherwise on first statement
                    case SyntaxKind.WhileStatement:
                    case SyntaxKind.IfStatement:
                    case SyntaxKind.ForInStatement:
                        return spanInNodeIfStartsOnSameLine(block.parent, block.statements[0]);

                    // Set span on previous token if it starts on same line otherwise on the first statement of the block
                    case SyntaxKind.ForStatement:
                        return spanInNodeIfStartsOnSameLine(findPrecedingToken(block.pos, sourceFile, block.parent), block.statements[0]);
                }

                // Default action is to set on first statement
                return spanInNode(block.statements[0]);
            }

            function spanInForStatement(forStatement: ForStatement): TextSpan {
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

            // Tokens:
            function spanInOpenBraceToken(node: Node): TextSpan {
                switch (node.parent.kind) {
                    case SyntaxKind.EnumDeclaration:
                        var enumDeclaration = <EnumDeclaration>node.parent;
                        return spanInNodeIfStartsOnSameLine(findPrecedingToken(node.pos, sourceFile, node.parent), enumDeclaration.members.length ? enumDeclaration.members[0] : enumDeclaration.getLastToken(sourceFile));

                    case SyntaxKind.ClassDeclaration:
                        var classDeclaration = <ClassDeclaration>node.parent;
                        return spanInNodeIfStartsOnSameLine(findPrecedingToken(node.pos, sourceFile, node.parent), classDeclaration.members.length ? classDeclaration.members[0] : classDeclaration.getLastToken(sourceFile));

                    case SyntaxKind.SwitchStatement:
                        return spanInNodeIfStartsOnSameLine(node.parent, (<SwitchStatement>node.parent).clauses[0]);
                }

                // Default to parent node
                return spanInNode(node.parent);
            }

            function spanInCloseBraceToken(node: Node): TextSpan {
                switch (node.parent.kind) {
                    case SyntaxKind.ModuleBlock:
                        // If this is not instantiated module block no bp span
                        if (getModuleInstanceState(node.parent.parent) !== ModuleInstanceState.Instantiated) {
                            return undefined;
                        }

                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.ClassDeclaration:
                        // Span on close brace token
                        return textSpan(node);

                    case SyntaxKind.Block:
                        if (isFunctionBlock(node.parent)) {
                            // Span on close brace token
                            return textSpan(node);
                        }
                        // fall through.

                    case SyntaxKind.TryBlock:
                    case SyntaxKind.CatchClause:
                    case SyntaxKind.FinallyBlock:
                        return spanInNode((<Block>node.parent).statements[(<Block>node.parent).statements.length - 1]);;

                    case SyntaxKind.SwitchStatement:
                        // breakpoint in last statement of the last clause
                        var switchStatement = <SwitchStatement>node.parent;
                        var lastClause = switchStatement.clauses[switchStatement.clauses.length - 1];
                        if (lastClause) {
                            return spanInNode(lastClause.statements[lastClause.statements.length - 1]);
                        }
                        return undefined;

                    // Default to parent node
                    default:
                        return spanInNode(node.parent);
                }
            }

            function spanInOpenParenToken(node: Node): TextSpan {
                if (node.parent.kind === SyntaxKind.DoStatement) {
                    // Go to while keyword and do action instead
                    return spanInPreviousNode(node);
                }

                // Default to parent node
                return spanInNode(node.parent);
            }

            function spanInCloseParenToken(node: Node): TextSpan {
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

            function spanInColonToken(node: Node): TextSpan {
                // Is this : specifying return annotation of the function declaration
                if (isAnyFunction(node.parent) || node.parent.kind === SyntaxKind.PropertyAssignment) {
                    return spanInPreviousNode(node);
                }

                return spanInNode(node.parent);
            }

            function spanInGreaterThanOrLessThanToken(node: Node): TextSpan {
                if (node.parent.kind === SyntaxKind.TypeAssertionExpression) {
                    return spanInNode((<TypeAssertion>node.parent).expression);
                }

                return spanInNode(node.parent);
            }

            function spanInWhileKeyword(node: Node): TextSpan {
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