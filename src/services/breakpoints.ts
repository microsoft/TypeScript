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

        function spanInNodeIfStartsOnSameLine(node: Node): TypeScript.TextSpan {
            if (node && sourceFile.getLineAndCharacterFromPosition(position).line === sourceFile.getLineAndCharacterFromPosition(node.getStart()).line) {
                return spanInNode(node);
            }
        }

        function spanInPreviousNode(node: Node): TypeScript.TextSpan {
            return spanInNode(findPrecedingToken(node.pos, sourceFile));
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
                        return spanInBlock(<Block>node);

                    case SyntaxKind.ExpressionStatement:
                        return spanInExpressionStatement(<ExpressionStatement>node);

                    case SyntaxKind.ReturnStatement:
                        return spanInReturnStatement(<ReturnStatement>node);

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

                    case SyntaxKind.CloseParenToken:
                        return spanInCloseParenToken(node);

                    case SyntaxKind.ColonToken:
                        return spanInColonToken(node);

                    default:
                        // Default go to parent to set the breakpoint
                        return spanInNode(node.parent);
                }
            }

            function spanInVariableDeclaration(variableDeclaration: VariableDeclaration): TypeScript.TextSpan {
                var isParentVariableStatement = variableDeclaration.parent.kind === SyntaxKind.VariableStatement;
                var isfirstDeclarationOfVariableStatement = isParentVariableStatement &&
                    (<VariableStatement>variableDeclaration.parent).declarations[0] === variableDeclaration;

                // Breakpoint is possible in variableDeclaration only if there is initialization
                if (variableDeclaration.initializer) {
                    if (isfirstDeclarationOfVariableStatement) {
                        // First declaration - include var keyword
                        return textSpan(variableDeclaration.parent, variableDeclaration);
                    }
                    else {
                        // Span only on this declaration
                        return textSpan(variableDeclaration);
                    }
                }
                else if (!isfirstDeclarationOfVariableStatement && isParentVariableStatement) {
                    // If we cant set breakpoint on this declaration, set it on previous one
                    var variableStatement = <VariableStatement>variableDeclaration.parent;
                    var indexOfCurrentDeclaration = indexOf(variableStatement.declarations, variableDeclaration);
                    return spanInVariableDeclaration(variableStatement.declarations[indexOfCurrentDeclaration - 1]);
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

            function spanInBlock(block: Block): TypeScript.TextSpan {
                // Set breakpoint in first statement
                return spanInNode(block.statements[0]);
            }

            function spanInExpressionStatement(expressionStatement: ExpressionStatement): TypeScript.TextSpan {
                return textSpan(expressionStatement.expression);
            }

            function spanInReturnStatement(returnStatement: ReturnStatement): TypeScript.TextSpan {
                return textSpan(returnStatement.getChildAt(0, sourceFile), returnStatement.expression);
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

                    // Default to parent node
                    default:
                        return spanInNode(node.parent);
                }
            }

            function spanInCloseParenToken(node: Node): TypeScript.TextSpan {
                // Is this close paren token of parameter list, set span in previous token
                if (isAnyFunction(node.parent)) {
                    return spanInPreviousNode(node);
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
        }
   }
}