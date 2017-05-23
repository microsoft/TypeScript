/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [
            Diagnostics._0_is_declared_but_never_used.code,
            Diagnostics.Property_0_is_declared_but_never_used.code
        ],
        getCodeActions: (context: CodeFixContext) => {
            const sourceFile = context.sourceFile;
            const start = context.span.start;

            let token = getTokenAtPosition(sourceFile, start, /*includeJsDocComment*/ false);

            // this handles var ["computed"] = 12;
            if (token.kind === SyntaxKind.OpenBracketToken) {
                token = getTokenAtPosition(sourceFile, start + 1, /*includeJsDocComment*/ false);
            }

            switch (token.kind) {
                case ts.SyntaxKind.Identifier:
                    return deleteIdentifier();

                case SyntaxKind.PropertyDeclaration:
                case SyntaxKind.NamespaceImport:
                    return deleteNode(token.parent);

                default:
                    return deleteDefault();
            }

            function deleteDefault() {
                if (isDeclarationName(token)) {
                    return deleteNode(token.parent);
                }
                else if (isLiteralComputedPropertyDeclarationName(token)) {
                    return deleteNode(token.parent.parent);
                }
                else {
                    return undefined;
                }
            }

            function deleteIdentifier(): CodeAction[] | undefined {
                switch (token.parent.kind) {
                    case ts.SyntaxKind.VariableDeclaration:
                        return deleteVariableDeclaration(<ts.VariableDeclaration>token.parent);

                    case SyntaxKind.TypeParameter:
                        const typeParameters = (<DeclarationWithTypeParameters>token.parent.parent).typeParameters;
                        if (typeParameters.length === 1) {
                            const previousToken = getTokenAtPosition(sourceFile, typeParameters.pos - 1, /*includeJsDocComment*/ false);
                            if (!previousToken || previousToken.kind !== SyntaxKind.LessThanToken) {
                                return deleteRange(typeParameters);
                            }
                            const nextToken = getTokenAtPosition(sourceFile, typeParameters.end, /*includeJsDocComment*/ false);
                            if (!nextToken || nextToken.kind !== SyntaxKind.GreaterThanToken) {
                                return deleteRange(typeParameters);
                            }
                            return deleteNodeRange(previousToken, nextToken);
                        }
                        else {
                            return deleteNodeInList(token.parent);
                        }

                    case ts.SyntaxKind.Parameter:
                        const functionDeclaration = <FunctionDeclaration>token.parent.parent;
                        if (functionDeclaration.parameters.length === 1) {
                            return deleteNode(token.parent);
                        }
                        else {
                            return deleteNodeInList(token.parent);
                        }

                    // handle case where 'import a = A;'
                    case SyntaxKind.ImportEqualsDeclaration:
                        const importEquals = getAncestor(token, SyntaxKind.ImportEqualsDeclaration);
                        return deleteNode(importEquals);

                    case SyntaxKind.ImportSpecifier:
                        const namedImports = <NamedImports>token.parent.parent;
                        if (namedImports.elements.length === 1) {
                            // Only 1 import and it is unused. So the entire declaration should be removed.
                            const importSpec = getAncestor(token, SyntaxKind.ImportDeclaration);
                            return deleteNode(importSpec);
                        }
                        else {
                            // delete import specifier
                            return deleteNodeInList(token.parent);
                        }

                    // handle case where "import d, * as ns from './file'"
                    // or "'import {a, b as ns} from './file'"
                    case SyntaxKind.ImportClause: // this covers both 'import |d|' and 'import |d,| *'
                        const importClause = <ImportClause>token.parent;
                        if (!importClause.namedBindings) { // |import d from './file'| or |import * as ns from './file'|
                            const importDecl = getAncestor(importClause, SyntaxKind.ImportDeclaration);
                            return deleteNode(importDecl);
                        }
                        else {
                            // import |d,| * as ns from './file'
                            const start = importClause.name.getStart(sourceFile);
                            const nextToken = getTokenAtPosition(sourceFile, importClause.name.end, /*includeJsDocComment*/ false);
                            if (nextToken && nextToken.kind === SyntaxKind.CommaToken) {
                                // shift first non-whitespace position after comma to the start position of the node
                                return deleteRange({ pos: start, end: skipTrivia(sourceFile.text, nextToken.end, /*stopAfterLineBreaks*/ false, /*stopAtComments*/ true) });
                            }
                            else {
                                return deleteNode(importClause.name);
                            }
                        }

                    case SyntaxKind.NamespaceImport:
                        const namespaceImport = <NamespaceImport>token.parent;
                        if (namespaceImport.name === token && !(<ImportClause>namespaceImport.parent).name) {
                            const importDecl = getAncestor(namespaceImport, SyntaxKind.ImportDeclaration);
                            return deleteNode(importDecl);
                        }
                        else {
                            const previousToken = getTokenAtPosition(sourceFile, namespaceImport.pos - 1, /*includeJsDocComment*/ false);
                            if (previousToken && previousToken.kind === SyntaxKind.CommaToken) {
                                const startPosition = textChanges.getAdjustedStartPosition(sourceFile, previousToken, {}, textChanges.Position.FullStart);
                                return deleteRange({ pos: startPosition, end: namespaceImport.end });
                            }
                            return deleteRange(namespaceImport);
                        }

                    default:
                        return deleteDefault();
                }
            }

            // token.parent is a variableDeclaration
            function deleteVariableDeclaration(varDecl: ts.VariableDeclaration): CodeAction[] | undefined {
                switch (varDecl.parent.parent.kind) {
                    case SyntaxKind.ForStatement:
                        const forStatement = <ForStatement>varDecl.parent.parent;
                        const forInitializer = <VariableDeclarationList>forStatement.initializer;
                        if (forInitializer.declarations.length === 1) {
                            return deleteNode(forInitializer);
                        }
                        else {
                            return deleteNodeInList(varDecl);
                        }

                    case SyntaxKind.ForOfStatement:
                        const forOfStatement = <ForOfStatement>varDecl.parent.parent;
                        Debug.assert(forOfStatement.initializer.kind === SyntaxKind.VariableDeclarationList);
                        const forOfInitializer = <VariableDeclarationList>forOfStatement.initializer;
                        return replaceNode(forOfInitializer.declarations[0], createObjectLiteral());

                    case SyntaxKind.ForInStatement:
                        // There is no valid fix in the case of:
                        //  for .. in
                        return undefined;

                    default:
                        const variableStatement = <VariableStatement>varDecl.parent.parent;
                        if (variableStatement.declarationList.declarations.length === 1) {
                            return deleteNode(variableStatement);
                        }
                        else {
                            return deleteNodeInList(varDecl);
                        }
                }
            }

            function deleteNode(n: Node) {
                return makeChange(textChanges.ChangeTracker.fromCodeFixContext(context).deleteNode(sourceFile, n));
            }

            function deleteRange(range: TextRange) {
                return makeChange(textChanges.ChangeTracker.fromCodeFixContext(context).deleteRange(sourceFile, range));
            }

            function deleteNodeInList(n: Node) {
                return makeChange(textChanges.ChangeTracker.fromCodeFixContext(context).deleteNodeInList(sourceFile, n));
            }

            function deleteNodeRange(start: Node, end: Node) {
                return makeChange(textChanges.ChangeTracker.fromCodeFixContext(context).deleteNodeRange(sourceFile, start, end));
            }

            function replaceNode(n: Node, newNode: Node) {
                return makeChange(textChanges.ChangeTracker.fromCodeFixContext(context).replaceNode(sourceFile, n, newNode));
            }

            function makeChange(changeTracker: textChanges.ChangeTracker) {
                return [{
                    description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Remove_declaration_for_Colon_0), { 0: token.getText() }),
                    changes: changeTracker.getChanges()
                }];
            }
        }
    });
}