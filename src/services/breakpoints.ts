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

        var askedPosLineAndCharacter = sourceFile.getLineAndCharacterFromPosition(askedPos);

        // try first in the statements at given location
        return spanInNodeArray(sourceFile.statements, spanInStatement, /*isTokenSeparated*/ false);

        function getLocalTokenStartPos(pos: number) {
            return skipTrivia(sourceFile.text, pos);
        }

        function textSpan(pos: number, end: number) {
            // Check if the asked Pos is in any comment
            return TypeScript.TextSpan.fromBounds(getLocalTokenStartPos(pos), end);
        }

        function spanInStatement(statement: Statement) {
            switch (statement.kind) {
                case SyntaxKind.VariableStatement:
                    return spanInVariableStatement(<VariableStatement>statement);
            }

            function spanInVariableStatement(variableStatement: VariableStatement) {
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

                return spanInNodeArray(variableStatement.declarations, spanInVariableDeclaration, /*isTokenSeparated*/ true);

                function spanInVariableDeclaration(variableDeclaration: VariableDeclaration) {
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
        }

        function spanInNodeIfEndsOnSameLine<T extends Node>(node: T, spanInNode: (node: T) => TypeScript.TextSpan) {
            // If the previous statement ends on same line as asked position, then set it on previous statement
            return sourceFile.getLineAndCharacterFromPosition(node.end).line === askedPosLineAndCharacter.line ?
                spanInNode(node) : undefined;
        }

        function spanInNodeArray<T extends Node>(nodes: NodeArray<T>, spanInNode: (node: T)=> TypeScript.TextSpan, isTokenSeparated: boolean) {
            // find the child that has this
            for (var i = 0, n = nodes.length; i < n; i++) {
                var node = nodes[i];
                if (node.pos > askedPos) {
                    // We have moved past the node
                    return;
                }

                // If the node lies inside this nodes pos and end try to set the breakpoint in this node
                if (node.end > askedPos) {
                    // Check if we should be setting the breakpoint in the previous node
                    if (i) {
                        // If the node doesnt starts on a line after the asked position, 
                        // we can either set the breakpoint on previous node or shouldnt set the breakpoint at all
                        if (sourceFile.getLineAndCharacterFromPosition(getLocalTokenStartPos(node.pos)).line > askedPosLineAndCharacter.line) {
                            // If the previous statement ends on same line as asked position, then set it on previous statement
                            return spanInNodeIfEndsOnSameLine(nodes[i - 1], spanInNode);
                        }
                    }

                    return spanInNode(node);
                }

                if (isTokenSeparated && i + 1 < n && nodes[i + 1].pos > askedPos) {
                    // Check if we should be setting breakpoint on this node if the asked pos is before the separating token
                    var tokenPos = getLocalTokenStartPos(node.end);
                    if (askedPos <= tokenPos) {
                        return spanInNodeIfEndsOnSameLine(node, spanInNode);
                    }
                }
            }
        }
   }
}