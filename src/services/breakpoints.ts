// Copyright (c) Microsoft. All rights reserved. Licensed under the Apache License, Version 2.0. 
// See LICENSE.txt in the project root for complete license information.

/// <reference path='services.ts' />

module ts.Breakpoints {
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

        function spanInNode(node: Node): TypeScript.TextSpan {
            if (node) {
                switch (node.kind) {
                    case SyntaxKind.VariableStatement:
                        return spanInVariableStatement(<VariableStatement>node);

                    case SyntaxKind.VariableDeclaration:
                        return spanInVariableDeclaration(<VariableDeclaration>node);

                    case SyntaxKind.SemicolonToken:
                    case SyntaxKind.EndOfFileToken:
                        return spanInNodeIfStartsOnSameLine(findPrecedingToken(node.pos, sourceFile));

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
        }
   }
}