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
        Diagnostics.All_variables_are_unused.code,
    ];

    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { errorCode, sourceFile, program } = context;
            const checker = program.getTypeChecker();
            const sourceFiles = program.getSourceFiles();
            const token = getTokenAtPosition(sourceFile, context.span.start, /*includeJsDocComment*/ false);

            const importDecl = tryGetFullImport(token);
            if (importDecl) {
                const changes = textChanges.ChangeTracker.with(context, t => t.deleteNode(sourceFile, importDecl));
                return [createCodeFixAction(fixName, changes, [Diagnostics.Remove_import_from_0, showModuleSpecifier(importDecl)], fixIdDelete, Diagnostics.Delete_all_unused_declarations)];
            }
            const delDestructure = Deleter.with(context, d =>
                tryDeleteFullDestructure(token, d, checker, sourceFiles, /*isFixAll*/ false));
            if (delDestructure.length) {
                return [createCodeFixAction(fixName, delDestructure, Diagnostics.Remove_destructuring, fixIdDelete, Diagnostics.Delete_all_unused_declarations)];
            }
            const delVar = Deleter.with(context, d => tryDeleteFullVariableStatement(sourceFile, token, d));
            if (delVar.length) {
                return [createCodeFixAction(fixName, delVar, Diagnostics.Remove_variable_statement, fixIdDelete, Diagnostics.Delete_all_unused_declarations)];
            }

            const result: CodeFixAction[] = [];

            const deletion = Deleter.with(context, d =>
                tryDeleteDeclaration(sourceFile, token, d, checker, sourceFiles, /*isFixAll*/ false));
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
            const { sourceFile, program } = context;
            const checker = program.getTypeChecker();
            const sourceFiles = program.getSourceFiles();
            return createCombinedCodeActions(textChanges.ChangeTracker.with(context, changes => {
                Deleter.withChanges(changes, deleter => {
                    eachDiagnostic(context, errorCodes, diag => {
                        const token = getTokenAtPosition(sourceFile, diag.start, /*includeJsDocComment*/ false);
                        switch (context.fixId) {
                            case fixIdPrefix:
                                if (isIdentifier(token) && canPrefix(token)) {
                                    tryPrefixDeclaration(changes, diag.code, sourceFile, token);
                                }
                                break;
                            case fixIdDelete: {
                                const importDecl = tryGetFullImport(token);
                                if (importDecl) {
                                    deleter.add(importDecl);
                                }
                                else if (!tryDeleteFullDestructure(token, deleter, checker, sourceFiles, /*isFixAll*/ true) &&
                                    !tryDeleteFullVariableStatement(sourceFile, token, deleter)) {
                                    tryDeleteDeclaration(sourceFile, token, deleter, checker, sourceFiles, /*isFixAll*/ true);
                                }
                                break;
                            }
                            default:
                                Debug.fail(JSON.stringify(context.fixId));
                        }
                    });
                });
            }));
        },
    });

    // Sometimes the diagnostic span is an entire ImportDeclaration, so we should remove the whole thing.
    function tryGetFullImport(token: Node): ImportDeclaration | undefined {
        return token.kind === SyntaxKind.ImportKeyword ? tryCast(token.parent, isImportDeclaration) : undefined;
    }

    function tryDeleteFullDestructure(token: Node, deleter: Deleter, checker: TypeChecker, sourceFiles: ReadonlyArray<SourceFile>, isFixAll: boolean): boolean {
        if (token.kind !== SyntaxKind.OpenBraceToken || !isObjectBindingPattern(token.parent)) return false;
        const decl = cast(token.parent, isObjectBindingPattern).parent;
        if (decl.kind === SyntaxKind.Parameter) {
            if (mayDeleteParameter(decl, checker, isFixAll)) {
                deleter.add(decl);
                deleteUnusedArguments(deleter, decl, sourceFiles, checker);
            }
        }
        else {
            deleter.add(decl);
        }
        return true;
    }

    function tryDeleteFullVariableStatement(sourceFile: SourceFile, token: Node, deleter: Deleter) {
        const declarationList = tryCast(token.parent, isVariableDeclarationList);
        if (declarationList && declarationList.getChildren(sourceFile)[0] === token) {
            deleter.add(declarationList.parent.kind === SyntaxKind.VariableStatement ? declarationList.parent : declarationList);
            return true;
        }
        return false;
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

    function tryDeleteDeclaration(sourceFile: SourceFile, token: Node, deleter: Deleter, checker: TypeChecker, sourceFiles: ReadonlyArray<SourceFile>, isFixAll: boolean) {
        tryDeleteDeclarationWorker(token, deleter, checker, sourceFiles, isFixAll);
        if (isIdentifier(token)) deleteAssignments(deleter, sourceFile, token, checker);
    }

    function deleteAssignments(deleter: Deleter, sourceFile: SourceFile, token: Identifier, checker: TypeChecker) {
        FindAllReferences.Core.eachSymbolReferenceInFile(token, checker, sourceFile, (ref: Node) => {
            if (ref.parent.kind === SyntaxKind.PropertyAccessExpression) ref = ref.parent;
            if (ref.parent.kind === SyntaxKind.BinaryExpression && ref.parent.parent.kind === SyntaxKind.ExpressionStatement) {
                deleter.add(ref.parent.parent);
            }
        });
    }

    function tryDeleteDeclarationWorker(token: Node, deleter: Deleter, checker: TypeChecker, sourceFiles: ReadonlyArray<SourceFile>, isFixAll: boolean): void {
        const { parent } = token;
        switch (parent.kind) {
            case SyntaxKind.Parameter:
                if (!mayDeleteParameter(parent as ParameterDeclaration, checker, isFixAll)) break;
                deleter.add(parent);
                deleteUnusedArguments(deleter, parent as ParameterDeclaration, sourceFiles, checker);
                break;

            case SyntaxKind.ImportSpecifier:
                const namedImports = (parent as ImportSpecifier).parent;
                deleter.add(namedImports.elements.length === 1 ? namedImports : parent);
                break;

            case SyntaxKind.ImportClause:
                deleter.add(token);
                break;

            default:
                deleter.add(isComputedPropertyName(parent) ? parent.parent : parent);
                break;
        }
    }

    function mayDeleteParameter(p: ParameterDeclaration, checker: TypeChecker, isFixAll: boolean): boolean {
        const { parent } = p;
        switch (parent.kind) {
            case SyntaxKind.MethodDeclaration:
                // Don't remove a parameter if this overrides something.
                const symbol = checker.getSymbolAtLocation(parent.name)!;
                if (isMemberSymbolInBaseType(symbol, checker)) return false;
                // falls through

            case SyntaxKind.Constructor:
            case SyntaxKind.FunctionDeclaration:
                return true;

            case SyntaxKind.FunctionExpression:
            case SyntaxKind.ArrowFunction: {
                // Can't remove a non-last parameter in a callback. Can remove a parameter in code-fix-all if future parameters are also unused.
                const { parameters } = parent;
                const index = parameters.indexOf(p);
                Debug.assert(index !== -1);
                return isFixAll
                    ? parameters.slice(index + 1).every(p => p.name.kind === SyntaxKind.Identifier && !p.symbol.isReferenced)
                    : index === parameters.length - 1;
            }

            case SyntaxKind.SetAccessor:
                // Setter must have a parameter
                return false;

            default:
                return Debug.failBadSyntaxKind(parent);
        }
    }

    function deleteUnusedArguments(deleter: Deleter, deletedParameter: ParameterDeclaration, sourceFiles: ReadonlyArray<SourceFile>, checker: TypeChecker): void {
        FindAllReferences.Core.eachSignatureCall(deletedParameter.parent, sourceFiles, checker, call => {
            const index = deletedParameter.parent.parameters.indexOf(deletedParameter);
            if (call.arguments.length > index) { // Just in case the call didn't provide enough arguments.
                deleter.add(call.arguments[index]);
            }
        });
    }
}

namespace ts.codefix {
    export class Deleter {
        static with(context: textChanges.TextChangesContext, cb: (d: Deleter) => void): FileTextChanges[] {
            return textChanges.ChangeTracker.with(context, t => Deleter.withChanges(t, cb));
        }

        static withChanges(changes: textChanges.ChangeTracker, cb: (d: Deleter) => void): void {
            const d = new Deleter();
            cb(d);
            return d.finish(changes);
        }

        private nodes: Node[] = [];

        add(node: Node): void {
            this.nodes.push(node);
        }

        private finish(changes: textChanges.ChangeTracker): void {
            for (const node of this.nodes) {
                if (!this.nodes.some(o => rangeContainsRangeExclusive(o, node))) {
                    deleteNode(changes, node);
                }
            }
        }
    }

    function deleteNode(changes: textChanges.ChangeTracker, node: Node): void {
        const sourceFile = node.getSourceFile();
        switch (node.kind) {
            case SyntaxKind.Parameter: {
                const oldFunction = node.parent;
                if (isArrowFunction(oldFunction) && oldFunction.parameters.length === 1) {
                    // Lambdas with exactly one parameter are special because, after removal, there
                    // must be an empty parameter list (i.e. `()`) and this won't necessarily be the
                    // case if the parameter is simply removed (e.g. in `x => 1`).
                    const newFunction = updateArrowFunction(
                        oldFunction,
                        oldFunction.modifiers,
                        oldFunction.typeParameters,
                        /*parameters*/ undefined!, // TODO: GH#18217
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
                    changes.deleteNodeInList(sourceFile, node);
                }
                break;
            }

            case SyntaxKind.ImportDeclaration:
                changes.deleteNode(sourceFile, node);
                break;

            case SyntaxKind.BindingElement:
                const pattern = (node as BindingElement).parent;
                const preserveComma = pattern.kind === SyntaxKind.ArrayBindingPattern && node !== last(pattern.elements);
                if (preserveComma) {
                    changes.deleteNode(sourceFile, node);
                }
                else {
                    changes.deleteNodeInList(sourceFile, node);
                }
                break;

            case SyntaxKind.VariableDeclaration:
                deleteVariableDeclaration(changes, sourceFile, node as VariableDeclaration);
                break;

            case SyntaxKind.TypeParameter: {
                const typeParameters = getEffectiveTypeParameterDeclarations(<DeclarationWithTypeParameters>node.parent);
                if (typeParameters.length === 1) {
                    const { pos, end } = cast(typeParameters, isNodeArray);
                    const previousToken = getTokenAtPosition(sourceFile, pos - 1, /*includeJsDocComment*/ false);
                    const nextToken = getTokenAtPosition(sourceFile, end, /*includeJsDocComment*/ false);
                    Debug.assert(previousToken.kind === SyntaxKind.LessThanToken);
                    Debug.assert(nextToken.kind === SyntaxKind.GreaterThanToken);

                    changes.deleteNodeRange(sourceFile, previousToken, nextToken);
                }
                else {
                    changes.deleteNodeInList(sourceFile, node);
                }
                break;
            }

            case SyntaxKind.ImportSpecifier:
                const namedImports = <NamedImports>node.parent;
                if (namedImports.elements.length === 1) {
                    deleteImportBinding(changes, sourceFile, node as ImportSpecifier);
                }
                else {
                    changes.deleteNodeInList(sourceFile, node);
                }
                break;

            case SyntaxKind.NamespaceImport:
                deleteImportBinding(changes, sourceFile, node as NamespaceImport);
                break;

            default:
                if (isImportClause(node.parent)) {
                    Debug.assert(node.parent.name === node);
                    deleteDefaultImport(changes, sourceFile, node.parent);
                }
                else if (isCallLikeExpression(node.parent)) {
                    changes.deleteNodeInList(sourceFile, node);
                }
                else {
                    changes.deleteNode(sourceFile, node);
                }
        }
    }

    function deleteDefaultImport(changes: textChanges.ChangeTracker, sourceFile: SourceFile, importClause: ImportClause): void {
        if (!importClause.namedBindings) {
            // Delete the whole import
            changes.deleteNode(sourceFile, importClause.parent);
        }
        else {
            // import |d,| * as ns from './file'
            const start = importClause.name!.getStart(sourceFile);
            const nextToken = getTokenAtPosition(sourceFile, importClause.name!.end, /*includeJsDocComment*/ false);
            if (nextToken && nextToken.kind === SyntaxKind.CommaToken) {
                // shift first non-whitespace position after comma to the start position of the node
                const end = skipTrivia(sourceFile.text, nextToken.end, /*stopAfterLineBreaks*/ false, /*stopAtComments*/ true);
                changes.deleteRange(sourceFile, { pos: start, end });
            }
            else {
                changes.deleteNode(sourceFile, importClause.name!);
            }
        }
    }

    function deleteImportBinding(changes: textChanges.ChangeTracker, sourceFile: SourceFile, node: ImportSpecifier | NamespaceImport): void {
        const namedBindings = cast(node, isNamedImportBindings);
        if (namedBindings.parent.name) {
            // Delete named imports while preserving the default import
            // import d|, * as ns| from './file'
            // import d|, { a }| from './file'
            const previousToken = Debug.assertDefined(getTokenAtPosition(sourceFile, namedBindings.pos - 1, /*includeJsDocComment*/ false));
            changes.deleteRange(sourceFile, { pos: previousToken.getStart(sourceFile), end: namedBindings.end });
        }
        else {
            // Delete the entire import declaration
            // |import * as ns from './file'|
            // |import { a } from './file'|
            const importDecl = getAncestor(namedBindings, SyntaxKind.ImportDeclaration)!;
            changes.deleteNode(sourceFile, importDecl);
        }
    }

    function deleteVariableDeclaration(changes: textChanges.ChangeTracker, sourceFile: SourceFile, node: VariableDeclaration): void {
        const { parent } = node;

        if (parent.kind === SyntaxKind.CatchClause) {
            // TODO: There's currently no unused diagnostic for this, could be a suggestion
            changes.deleteNodeRange(sourceFile, findChildOfKind(parent, SyntaxKind.OpenParenToken, sourceFile)!, findChildOfKind(parent, SyntaxKind.CloseParenToken, sourceFile)!);
            return;
        }

        if (parent.declarations.length !== 1) {
            changes.deleteNodeInList(sourceFile, node);
            return;
        }

        const gp = parent.parent;
        switch (gp.kind) {
            case SyntaxKind.ForOfStatement:
            case SyntaxKind.ForInStatement:
                changes.replaceNode(sourceFile, node, createObjectLiteral());
                break;

            case SyntaxKind.ForStatement:
                changes.deleteNode(sourceFile, parent);
                break;

            case SyntaxKind.VariableStatement:
                changes.deleteNode(sourceFile, gp);
                break;

            default:
                Debug.assertNever(gp);
        }
    }
}
