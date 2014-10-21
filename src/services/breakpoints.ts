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

                    if (node.parent.kind == SyntaxKind.ArrowFunction && (<FunctionDeclaration>node.parent).body == node) {
                        // If this is body of arrow function, it is allowed to have the breakpoint
                        return textSpan(node);
                    }
                }

                switch (node.kind) {
                    case SyntaxKind.VariableStatement:
                        return spanInVariableStatement(<VariableStatement>node);

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
                        return spanInFunctionDeclaration(<FunctionDeclaration>node);

                    case SyntaxKind.FunctionBlock:
                        return spanInFunctionBlock(<Block>node);

                    case SyntaxKind.Block:
                    case SyntaxKind.TryBlock:
                    case SyntaxKind.CatchBlock:
                    case SyntaxKind.FinallyBlock:
                    case SyntaxKind.ModuleBlock:
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
                        
                    case SyntaxKind.ForInStatement:
                        return spanInForInStatement(<ForInStatement>node);

                    case SyntaxKind.SwitchStatement:
                        return spanInSwitchStatement(<SwitchStatement>node);

                    case SyntaxKind.CaseClause:
                    case SyntaxKind.DefaultClause:
                        return spanInCaseOrDefaultClause(<CaseOrDefaultClause>node);

                    case SyntaxKind.TryStatement:
                        return spanInTryStatement(<TryStatement>node);

                    case SyntaxKind.ThrowStatement:
                        return spanInThrowStatement(<ThrowStatement>node);

                    case SyntaxKind.ExportAssignment:
                        return spanInExportAssignment(<ExportAssignment>node);

                    case SyntaxKind.ImportDeclaration:
                        return spanInImportDeclaration(<ImportDeclaration>node);

                    case SyntaxKind.EnumDeclaration:
                        return spanInEnumDeclaration(<EnumDeclaration>node);

                    case SyntaxKind.EnumMember:
                        return spanInEnumMember(<EnumMember>node);

                    case SyntaxKind.ModuleDeclaration:
                        return spanInModuleDeclaration(<ModuleDeclaration>node);

                    case SyntaxKind.ClassDeclaration:
                        return spanInClassDeclaration(<ClassDeclaration>node);

                    case SyntaxKind.CallExpression:
                    case SyntaxKind.NewExpression:
                        return spanInCallOrNewExpression(<CallExpression>node);

                    case SyntaxKind.WithStatement:
                        return spanInWithStatement(<WithStatement>node);

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
                        if (node.parent.kind === SyntaxKind.TypeAssertion && (<TypeAssertion>node.parent).type === node) {
                            return spanInNode((<TypeAssertion>node.parent).operand);
                        }

                        // return type of function go to previous token
                        if (isAnyFunction(node.parent) && (<FunctionDeclaration>node.parent).type === node) {
                            return spanInPreviousNode(node);
                        }

                        // Default go to parent to set the breakpoint
                        return spanInNode(node.parent);
                }
            }

            function spanInVariableDeclaration(variableDeclaration: VariableDeclaration): TypeScript.TextSpan {
                // If declaration of for in statement, just set the span in parent
                if (variableDeclaration.parent.kind === SyntaxKind.ForInStatement) {
                    return spanInForInStatement(<ForInStatement>variableDeclaration.parent);
                }

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

                // Set span in function body
                return spanInNode(functionDeclaration.body);
            }

            function spanInFunctionBlock(block: Block): TypeScript.TextSpan {
                if (block.statements.length) {
                    return spanInFirstStatementOfBlock(block);
                }

                // On close parenthesis
                return spanInNode(block.getLastToken());
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
                    case SyntaxKind.ForInStatement:
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

            function spanInForInStatement(forInStatement: ForInStatement): TypeScript.TextSpan {
                return textSpan(forInStatement, findNextToken(forInStatement.expression, forInStatement));
            }

            function spanInSwitchStatement(switchStatement: SwitchStatement): TypeScript.TextSpan {
                return textSpan(switchStatement, findNextToken(switchStatement.expression, switchStatement));
            }

            function spanInCaseOrDefaultClause(caseOrDefaultClause: CaseOrDefaultClause): TypeScript.TextSpan {
                return spanInNode(caseOrDefaultClause.statements[0]);
            }

            function spanInTryStatement(tryStatement: TryStatement): TypeScript.TextSpan {
                return spanInBlock(tryStatement.tryBlock);
            }

            function spanInThrowStatement(throwStatement: ThrowStatement): TypeScript.TextSpan {
                return textSpan(throwStatement, throwStatement.expression);
            }

            function spanInExportAssignment(exportAssignment: ExportAssignment): TypeScript.TextSpan {
                return textSpan(exportAssignment, exportAssignment.exportName);
            }

            function spanInImportDeclaration(importDeclaration: ImportDeclaration): TypeScript.TextSpan {
                return textSpan(importDeclaration, importDeclaration.entityName || importDeclaration.externalModuleName);
            }

            function spanInEnumDeclaration(enumDeclaration: EnumDeclaration): TypeScript.TextSpan {
                if (enumDeclaration.members.length) {
                    return spanInEnumMember(enumDeclaration.members[0]);
                }

                // On close brace
                return spanInNode(enumDeclaration.getLastToken(sourceFile));
            }

            function spanInEnumMember(enumMember: EnumMember) {
                return textSpan(enumMember);
            }

            function spanInModuleDeclaration(moduleDeclaration: ModuleDeclaration): TypeScript.TextSpan {
                return spanInNode(moduleDeclaration.body);
            }

            function spanInClassDeclaration(classDeclaration: ClassDeclaration): TypeScript.TextSpan {
                if (classDeclaration.members.length) {
                    return spanInNode(classDeclaration.members[0]);
                }

                return spanInNode(classDeclaration.getLastToken());
            }

            function spanInCallOrNewExpression(callOrNewExpression: CallExpression): TypeScript.TextSpan {
                return textSpan(callOrNewExpression);
            }

            function spanInWithStatement(withStatement: WithStatement): TypeScript.TextSpan {
                return spanInNode(withStatement.statement);
            }

            // Tokens:
            function spanInOpenBraceToken(node: Node): TypeScript.TextSpan {
                if (node.parent.kind === SyntaxKind.SwitchStatement) {
                    return spanInNodeIfStartsOnSameLine(node.parent, (<SwitchStatement>node.parent).clauses[0]);
                }

                // Default to parent node
                return spanInNode(node.parent);
            }

            function spanInCloseBraceToken(node: Node): TypeScript.TextSpan {
                switch (node.parent.kind) {
                    case SyntaxKind.FunctionBlock:
                    case SyntaxKind.EnumDeclaration:
                    case SyntaxKind.ClassDeclaration:
                        // Span on close brace token
                        return textSpan(node);

                    case SyntaxKind.ModuleBlock:
                        var moduleBlock = <Block>node.parent;
                        if (moduleBlock.statements.length || // there are statements in the module block
                            moduleBlock.parent.parent.kind === SyntaxKind.ModuleDeclaration) { // this is a dotted module body 
                            return textSpan(node);
                        }

                        // No span 
                        return;

                    case SyntaxKind.Block:
                    case SyntaxKind.TryBlock:
                    case SyntaxKind.CatchBlock:
                    case SyntaxKind.FinallyBlock:
                        return spanInLastStatementOfBlock(<Block>node.parent);

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
                if (isAnyFunction(node.parent) || node.parent.kind === SyntaxKind.PropertyAssignment) {
                    return spanInPreviousNode(node);
                }

                return spanInNode(node.parent);
            }

            function spanInGreaterThanOrLessThanToken(node: Node): TypeScript.TextSpan {
                if (node.parent.kind === SyntaxKind.TypeAssertion) {
                    return spanInNode((<TypeAssertion>node.parent).operand);
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