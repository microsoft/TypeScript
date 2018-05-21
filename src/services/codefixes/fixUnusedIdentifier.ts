/* @internal */
namespace ts.codefix {
    const fixName = "unusedIdentifier";
    const fixIdPrefix = "unusedIdentifier_prefix";
    const fixIdDelete = "unusedIdentifier_delete";
    const errorCodes = [
        Diagnostics._0_is_declared_but_its_value_is_never_read.code,
        Diagnostics._0_is_declared_but_never_used.code,
        Diagnostics.Property_0_is_declared_but_its_value_is_never_read.code,
        Diagnostics.All_imports_in_import_declaration_are_unused.code,
        Diagnostics.All_destructured_elements_are_unused.code,
    ];
    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { errorCode, sourceFile, program } = context;
            const checker = program.getTypeChecker();
            const importDecl = tryGetFullImport(sourceFile, context.span.start);
            if (importDecl) {
                const changes = textChanges.ChangeTracker.with(context, t => t.deleteNode(sourceFile, importDecl));
                return [createCodeFixAction(fixName, changes, [Diagnostics.Remove_import_from_0, showModuleSpecifier(importDecl)], fixIdDelete, Diagnostics.Delete_all_unused_declarations)];
            }
            const delDestructure = textChanges.ChangeTracker.with(context, t => tryDeleteFullDestructure(t, sourceFile, context.span.start, /*deleted*/ undefined, checker));
            if (delDestructure.length) {
                return [createCodeFixAction(fixName, delDestructure, Diagnostics.Remove_destructuring, fixIdDelete, Diagnostics.Delete_all_unused_declarations)];
            }

            const token = getToken(sourceFile, textSpanEnd(context.span));
            const result: CodeFixAction[] = [];

            const deletion = textChanges.ChangeTracker.with(context, t => tryDeleteDeclaration(t, sourceFile, token, /*deleted*/ undefined, checker));
            if (deletion.length) {
                result.push(createCodeFixAction(fixName, deletion, [Diagnostics.Remove_declaration_for_Colon_0, token.getText(sourceFile)], fixIdDelete, Diagnostics.Delete_all_unused_declarations));
            }

            const prefix = textChanges.ChangeTracker.with(context, t => tryPrefixDeclaration(t, errorCode, sourceFile, token));
            if (prefix.length) {
                result.push(createCodeFixAction(fixName, prefix, [Diagnostics.Prefix_0_with_an_underscore, token.getText(sourceFile)], fixIdPrefix, Diagnostics.Prefix_all_unused_declarations_with_where_possible));
            }

            return result;
        },
        fixIds: [fixIdPrefix, fixIdDelete],
        getAllCodeActions: context => {
            // Track a set of deleted nodes that may be ancestors of other marked for deletion -- only delete the ancestors.
            const deleted = new NodeSet();
            const { sourceFile, program } = context;
            const checker = program.getTypeChecker();
            return codeFixAll(context, errorCodes, (changes, diag) => {
                const token = findPrecedingToken(textSpanEnd(diag), diag.file!);
                switch (context.fixId) {
                    case fixIdPrefix:
                        if (isIdentifier(token) && canPrefix(token)) {
                            tryPrefixDeclaration(changes, diag.code, sourceFile, token);
                        }
                        break;
                    case fixIdDelete:
                        // Ignore if this range was already deleted.
                        if (deleted.some(d => rangeContainsPosition(d, diag.start!))) break;

                        const importDecl = tryGetFullImport(diag.file!, diag.start!);
                        if (importDecl) {
                            changes.deleteNode(sourceFile, importDecl);
                        }
                        else {
                            if (!tryDeleteFullDestructure(changes, sourceFile, diag.start!, deleted, checker)) {
                                tryDeleteDeclaration(changes, sourceFile, token, deleted, checker);
                            }
                        }
                        break;
                    default:
                        Debug.fail(JSON.stringify(context.fixId));
                }
            });
        },
    });

    // Sometimes the diagnostic span is an entire ImportDeclaration, so we should remove the whole thing.
    function tryGetFullImport(sourceFile: SourceFile, pos: number): ImportDeclaration | undefined {
        const startToken = getTokenAtPosition(sourceFile, pos, /*includeJsDocComment*/ false);
        return startToken.kind === SyntaxKind.ImportKeyword ? tryCast(startToken.parent, isImportDeclaration) : undefined;
    }

    function tryDeleteFullDestructure(changes: textChanges.ChangeTracker, sourceFile: SourceFile, pos: number, deletedAncestors: NodeSet | undefined, checker: TypeChecker): boolean {
        const startToken = getTokenAtPosition(sourceFile, pos, /*includeJsDocComment*/ false);
        if (startToken.kind !== SyntaxKind.OpenBraceToken || !isObjectBindingPattern(startToken.parent)) return false;
        const decl = startToken.parent.parent;
        switch (decl.kind) {
            case SyntaxKind.VariableDeclaration:
                tryDeleteVariableDeclaration(changes, sourceFile, decl, deletedAncestors);
                break;
            case SyntaxKind.Parameter:
                if (!mayDeleteParameter(decl, checker)) break;
                if (deletedAncestors) deletedAncestors.add(decl);
                changes.deleteNodeInList(sourceFile, decl);
                break;
            case SyntaxKind.BindingElement:
            if (deletedAncestors) deletedAncestors.add(decl);
                changes.deleteNode(sourceFile, decl);
                break;
            default:
                return Debug.assertNever(decl);
        }
        return true;
    }

    function getToken(sourceFile: SourceFile, pos: number): Node {
        const token = findPrecedingToken(pos, sourceFile, /*startNode*/ undefined, /*includeJsDoc*/ true);
        // this handles var ["computed"] = 12;
        return token.kind === SyntaxKind.CloseBracketToken ? findPrecedingToken(pos - 1, sourceFile) : token;
    }

    function tryPrefixDeclaration(changes: textChanges.ChangeTracker, errorCode: number, sourceFile: SourceFile, token: Node): void {
        // Don't offer to prefix a property.
        if (errorCode !== Diagnostics.Property_0_is_declared_but_its_value_is_never_read.code && isIdentifier(token) && canPrefix(token)) {
            changes.replaceNode(sourceFile, token, createIdentifier(`_${token.text}`));
        }
    }

    function canPrefix(token: Identifier): boolean {
        switch (token.parent.kind) {
            case SyntaxKind.Parameter:
                return true;
            case SyntaxKind.VariableDeclaration: {
                const varDecl = token.parent as VariableDeclaration;
                switch (varDecl.parent.parent.kind) {
                    case SyntaxKind.ForOfStatement:
                    case SyntaxKind.ForInStatement:
                        return true;
                }
            }
        }
        return false;
    }

    function tryDeleteDeclaration(changes: textChanges.ChangeTracker, sourceFile: SourceFile, token: Node, deletedAncestors: NodeSet | undefined, checker: TypeChecker): void {
        switch (token.kind) {
            case SyntaxKind.Identifier:
                tryDeleteIdentifier(changes, sourceFile, <Identifier>token, deletedAncestors, checker);
                break;
            case SyntaxKind.PropertyDeclaration:
            case SyntaxKind.NamespaceImport:
                if (deletedAncestors) deletedAncestors.add(token.parent);
                changes.deleteNode(sourceFile, token.parent);
                break;
            default:
                tryDeleteDefault(changes, sourceFile, token, deletedAncestors);
        }
    }

    function tryDeleteDefault(changes: textChanges.ChangeTracker, sourceFile: SourceFile, token: Node, deletedAncestors: NodeSet | undefined): void {
        if (isDeclarationName(token)) {
            if (deletedAncestors) deletedAncestors.add(token.parent);
            changes.deleteNode(sourceFile, token.parent);
        }
        else if (isLiteralComputedPropertyDeclarationName(token)) {
            if (deletedAncestors) deletedAncestors.add(token.parent.parent);
            changes.deleteNode(sourceFile, token.parent.parent);
        }
    }

    function tryDeleteIdentifier(changes: textChanges.ChangeTracker, sourceFile: SourceFile, identifier: Identifier, deletedAncestors: NodeSet | undefined, checker: TypeChecker): void {
        const parent = identifier.parent;
        switch (parent.kind) {
            case SyntaxKind.VariableDeclaration:
                tryDeleteVariableDeclaration(changes, sourceFile, <VariableDeclaration>parent, deletedAncestors);
                break;

            case SyntaxKind.TypeParameter:
                const typeParameters = getEffectiveTypeParameterDeclarations(<DeclarationWithTypeParameters>parent.parent);
                if (typeParameters.length === 1) {
                    const { pos, end } = cast(typeParameters, isNodeArray);
                    const previousToken = getTokenAtPosition(sourceFile, pos - 1, /*includeJsDocComment*/ false);
                    const nextToken = getTokenAtPosition(sourceFile, end, /*includeJsDocComment*/ false);
                    Debug.assert(previousToken.kind === SyntaxKind.LessThanToken);
                    Debug.assert(nextToken.kind === SyntaxKind.GreaterThanToken);

                    changes.deleteNodeRange(sourceFile, previousToken, nextToken);
                }
                else {
                    changes.deleteNodeInList(sourceFile, parent);
                }
                break;

            case SyntaxKind.Parameter:
                if (!mayDeleteParameter(parent as ParameterDeclaration, checker)) break;
                const oldFunction = parent.parent;

                if (isArrowFunction(oldFunction) && oldFunction.parameters.length === 1) {
                    // Lambdas with exactly one parameter are special because, after removal, there
                    // must be an empty parameter list (i.e. `()`) and this won't necessarily be the
                    // case if the parameter is simply removed (e.g. in `x => 1`).
                    const newFunction = updateArrowFunction(
                        oldFunction,
                        oldFunction.modifiers,
                        oldFunction.typeParameters,
                        /*parameters*/ undefined,
                        oldFunction.type,
                        oldFunction.equalsGreaterThanToken,
                        oldFunction.body);

                    // Drop leading and trailing trivia of the new function because we're only going
                    // to replace the span (vs the full span) of the old function - the old leading
                    // and trailing trivia will remain.
                    suppressLeadingAndTrailingTrivia(newFunction);

                    changes.replaceNode(sourceFile, oldFunction, newFunction);
                }
                else {
                    changes.deleteNodeInList(sourceFile, parent);
                }
                break;

            case SyntaxKind.BindingElement: {
                const pattern = (parent as BindingElement).parent;
                switch (pattern.kind) {
                    case SyntaxKind.ArrayBindingPattern:
                        changes.deleteNode(sourceFile, parent); // Don't delete ','
                        break;
                    case SyntaxKind.ObjectBindingPattern:
                        changes.deleteNodeInList(sourceFile, parent);
                        break;
                    default:
                        return Debug.assertNever(pattern);
                }
                break;
            }

            // handle case where 'import a = A;'
            case SyntaxKind.ImportEqualsDeclaration:
                const importEquals = getAncestor(identifier, SyntaxKind.ImportEqualsDeclaration);
                changes.deleteNode(sourceFile, importEquals);
                break;

            case SyntaxKind.ImportSpecifier:
                const namedImports = <NamedImports>parent.parent;
                if (namedImports.elements.length === 1) {
                    tryDeleteNamedImportBinding(changes, sourceFile, namedImports);
                }
                else {
                    // delete import specifier
                    changes.deleteNodeInList(sourceFile, parent);
                }
                break;

            case SyntaxKind.ImportClause: // this covers both 'import |d|' and 'import |d,| *'
                const importClause = <ImportClause>parent;
                if (!importClause.namedBindings) { // |import d from './file'|
                    changes.deleteNode(sourceFile, getAncestor(importClause, SyntaxKind.ImportDeclaration)!);
                }
                else {
                    // import |d,| * as ns from './file'
                    const start = importClause.name.getStart(sourceFile);
                    const nextToken = getTokenAtPosition(sourceFile, importClause.name.end, /*includeJsDocComment*/ false);
                    if (nextToken && nextToken.kind === SyntaxKind.CommaToken) {
                        // shift first non-whitespace position after comma to the start position of the node
                        const end = skipTrivia(sourceFile.text, nextToken.end, /*stopAfterLineBreaks*/ false, /*stopAtComments*/ true);
                        changes.deleteRange(sourceFile, { pos: start, end });
                    }
                    else {
                        changes.deleteNode(sourceFile, importClause.name);
                    }
                }
                break;

            case SyntaxKind.NamespaceImport:
                tryDeleteNamedImportBinding(changes, sourceFile, <NamespaceImport>parent);
                break;

            default:
                tryDeleteDefault(changes, sourceFile, identifier, deletedAncestors);
                break;
        }
    }

    function tryDeleteNamedImportBinding(changes: textChanges.ChangeTracker, sourceFile: SourceFile, namedBindings: NamedImportBindings): void {
        if (namedBindings.parent.name) {
            // Delete named imports while preserving the default import
            // import d|, * as ns| from './file'
            // import d|, { a }| from './file'
            const previousToken = getTokenAtPosition(sourceFile, namedBindings.pos - 1, /*includeJsDocComment*/ false);
            if (previousToken && previousToken.kind === SyntaxKind.CommaToken) {
                changes.deleteRange(sourceFile, { pos: previousToken.getStart(), end: namedBindings.end });
            }
        }
        else {
            // Delete the entire import declaration
            // |import * as ns from './file'|
            // |import { a } from './file'|
            const importDecl = getAncestor(namedBindings, SyntaxKind.ImportDeclaration);
            changes.deleteNode(sourceFile, importDecl);
        }
    }

    // token.parent is a variableDeclaration
    function tryDeleteVariableDeclaration(changes: textChanges.ChangeTracker, sourceFile: SourceFile, varDecl: VariableDeclaration, deletedAncestors: NodeSet | undefined): void {
        switch (varDecl.parent.parent.kind) {
            case SyntaxKind.ForStatement: {
                const forStatement = varDecl.parent.parent;
                const forInitializer = <VariableDeclarationList>forStatement.initializer;
                if (forInitializer.declarations.length === 1) {
                    if (deletedAncestors) deletedAncestors.add(forInitializer);
                    changes.deleteNode(sourceFile, forInitializer);
                }
                else {
                    if (deletedAncestors) deletedAncestors.add(varDecl);
                    changes.deleteNodeInList(sourceFile, varDecl);
                }
                break;
            }

            case SyntaxKind.ForOfStatement:
                const forOfStatement = varDecl.parent.parent;
                Debug.assert(forOfStatement.initializer.kind === SyntaxKind.VariableDeclarationList);
                const forOfInitializer = <VariableDeclarationList>forOfStatement.initializer;
                if (deletedAncestors) deletedAncestors.add(forOfInitializer.declarations[0]);
                changes.replaceNode(sourceFile, forOfInitializer.declarations[0], createObjectLiteral());
                break;

            case SyntaxKind.ForInStatement:
            case SyntaxKind.TryStatement:
                break;

            default:
                const variableStatement = varDecl.parent.parent;
                if (variableStatement.declarationList.declarations.length === 1) {
                    if (deletedAncestors) deletedAncestors.add(variableStatement);
                    changes.deleteNode(sourceFile, variableStatement);
                }
                else {
                    if (deletedAncestors) deletedAncestors.add(varDecl);
                    changes.deleteNodeInList(sourceFile, varDecl);
                }
        }
    }

    function mayDeleteParameter(p: ParameterDeclaration, checker: TypeChecker) {
        const parent = p.parent;
        switch (parent.kind) {
            case SyntaxKind.Constructor:
            case SyntaxKind.FunctionDeclaration:
                return true;

            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction:
                // Can't remove a non-last parameter in a callback. (Can if future parameters are also unused.)
                const index = parent.parameters.indexOf(p);
                Debug.assert(index !== -1);
                return parent.parameters.slice(index).every(p => p.name.kind === SyntaxKind.Identifier && !p.symbol.isReferenced) || !checker.getContextualType(parent);

            case SyntaxKind.SetAccessor:
                // Setter must have a parameter
                return false;

            case SyntaxKind.MethodDeclaration:
                // Don't remove a parameter if this overrides something
                const symbol = checker.getSymbolAtLocation(parent.name);
                return !isMemberSymbolInBaseType(symbol, checker);

            default:
                return Debug.failBadSyntaxKind(parent);
        }
    }

    class NodeSet {
        private map = createMap<Node>();

        add(node: Node): void {
            this.map.set(String(getNodeId(node)), node);
        }

        some(pred: (node: Node) => boolean): boolean {
            return forEachEntry(this.map, pred) || false;
        }
    }
}
