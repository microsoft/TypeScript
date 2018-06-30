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
            const token = getTokenAtPosition(sourceFile, context.span.start);

            const importDecl = tryGetFullImport(token);
            if (importDecl) {
                const changes = textChanges.ChangeTracker.with(context, t => t.deleteNode(sourceFile, importDecl));
                return [createCodeFixAction(fixName, changes, [Diagnostics.Remove_import_from_0, showModuleSpecifier(importDecl)], fixIdDelete, Diagnostics.Delete_all_unused_declarations)];
            }
            const delDestructure = textChanges.ChangeTracker.with(context, t =>
                tryDeleteFullDestructure(token, t, sourceFile, checker, sourceFiles, /*isFixAll*/ false));
            if (delDestructure.length) {
                return [createCodeFixAction(fixName, delDestructure, Diagnostics.Remove_destructuring, fixIdDelete, Diagnostics.Delete_all_unused_declarations)];
            }
            const delVar = textChanges.ChangeTracker.with(context, t => tryDeleteFullVariableStatement(sourceFile, token, t));
            if (delVar.length) {
                return [createCodeFixAction(fixName, delVar, Diagnostics.Remove_variable_statement, fixIdDelete, Diagnostics.Delete_all_unused_declarations)];
            }

            const result: CodeFixAction[] = [];

            const deletion = textChanges.ChangeTracker.with(context, t =>
                tryDeleteDeclaration(sourceFile, token, t, checker, sourceFiles, /*isFixAll*/ false));
            if (deletion.length) {
                const name = isComputedPropertyName(token.parent) ? token.parent : token;
                result.push(createCodeFixAction(fixName, deletion, [Diagnostics.Remove_declaration_for_Colon_0, name.getText(sourceFile)], fixIdDelete, Diagnostics.Delete_all_unused_declarations));
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
            return codeFixAll(context, errorCodes, (changes, diag) => {
                const token = getTokenAtPosition(sourceFile, diag.start);
                switch (context.fixId) {
                    case fixIdPrefix:
                        if (isIdentifier(token) && canPrefix(token)) {
                            tryPrefixDeclaration(changes, diag.code, sourceFile, token);
                        }
                        break;
                    case fixIdDelete: {
                        const importDecl = tryGetFullImport(token);
                        if (importDecl) {
                            changes.deleteDeclaration(sourceFile, importDecl);
                        }
                        else if (!tryDeleteFullDestructure(token, changes, sourceFile, checker, sourceFiles, /*isFixAll*/ true) &&
                            !tryDeleteFullVariableStatement(sourceFile, token, changes)) {
                            tryDeleteDeclaration(sourceFile, token, changes, checker, sourceFiles, /*isFixAll*/ true);
                        }
                        break;
                    }
                    default:
                        Debug.fail(JSON.stringify(context.fixId));
                }
            });
        },
    });

    // Sometimes the diagnostic span is an entire ImportDeclaration, so we should remove the whole thing.
    function tryGetFullImport(token: Node): ImportDeclaration | undefined {
        return token.kind === SyntaxKind.ImportKeyword ? tryCast(token.parent, isImportDeclaration) : undefined;
    }

    function tryDeleteFullDestructure(token: Node, changes: textChanges.ChangeTracker, sourceFile: SourceFile, checker: TypeChecker, sourceFiles: ReadonlyArray<SourceFile>, isFixAll: boolean): boolean {
        if (token.kind !== SyntaxKind.OpenBraceToken || !isObjectBindingPattern(token.parent)) return false;
        const decl = token.parent.parent;
        if (decl.kind === SyntaxKind.Parameter) {
            tryDeleteParameter(changes, sourceFile, decl, checker, sourceFiles, isFixAll);
        }
        else {
            changes.deleteDeclaration(sourceFile, decl);
        }
        return true;
    }

    function tryDeleteFullVariableStatement(sourceFile: SourceFile, token: Node, changes: textChanges.ChangeTracker): boolean {
        const declarationList = tryCast(token.parent, isVariableDeclarationList);
        if (declarationList && declarationList.getChildren(sourceFile)[0] === token) {
            changes.deleteDeclaration(sourceFile, declarationList.parent.kind === SyntaxKind.VariableStatement ? declarationList.parent : declarationList);
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

    function tryDeleteDeclaration(sourceFile: SourceFile, token: Node, changes: textChanges.ChangeTracker, checker: TypeChecker, sourceFiles: ReadonlyArray<SourceFile>, isFixAll: boolean) {
        tryDeleteDeclarationWorker(token, changes, sourceFile, checker, sourceFiles, isFixAll);
        if (isIdentifier(token)) deleteAssignments(changes, sourceFile, token, checker);
    }

    function deleteAssignments(changes: textChanges.ChangeTracker, sourceFile: SourceFile, token: Identifier, checker: TypeChecker) {
        FindAllReferences.Core.eachSymbolReferenceInFile(token, checker, sourceFile, (ref: Node) => {
            if (ref.parent.kind === SyntaxKind.PropertyAccessExpression) ref = ref.parent;
            if (ref.parent.kind === SyntaxKind.BinaryExpression && ref.parent.parent.kind === SyntaxKind.ExpressionStatement) {
                changes.deleteDeclaration(sourceFile, ref.parent.parent);
            }
        });
    }

    function tryDeleteDeclarationWorker(token: Node, changes: textChanges.ChangeTracker, sourceFile: SourceFile, checker: TypeChecker, sourceFiles: ReadonlyArray<SourceFile>, isFixAll: boolean): void {
        const { parent } = token;
        if (isParameter(parent)) {
            tryDeleteParameter(changes, sourceFile, parent, checker, sourceFiles, isFixAll);
        }
        else {
            changes.deleteDeclaration(sourceFile, isImportClause(parent) ? token : isComputedPropertyName(parent) ? parent.parent : parent);
        }
    }

    function tryDeleteParameter(changes: textChanges.ChangeTracker, sourceFile: SourceFile, p: ParameterDeclaration, checker: TypeChecker, sourceFiles: ReadonlyArray<SourceFile>, isFixAll: boolean): void {
        if (mayDeleteParameter(p, checker, isFixAll)) {
            changes.deleteDeclaration(sourceFile, p);
            deleteUnusedArguments(changes, sourceFile, p, sourceFiles, checker);
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

    function deleteUnusedArguments(changes: textChanges.ChangeTracker, sourceFile: SourceFile, deletedParameter: ParameterDeclaration, sourceFiles: ReadonlyArray<SourceFile>, checker: TypeChecker): void {
        FindAllReferences.Core.eachSignatureCall(deletedParameter.parent, sourceFiles, checker, call => {
            const index = deletedParameter.parent.parameters.indexOf(deletedParameter);
            if (call.arguments.length > index) { // Just in case the call didn't provide enough arguments.
                changes.deleteDeclaration(sourceFile, call.arguments[index]);
            }
        });
    }
}
