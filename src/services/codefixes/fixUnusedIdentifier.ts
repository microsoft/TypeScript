/* @internal */
namespace ts.codefix {
    const fixName = "unusedIdentifier";
    const fixIdPrefix = "unusedIdentifier_prefix";
    const fixIdDelete = "unusedIdentifier_delete";
    const fixIdInfer = "unusedIdentifier_infer";
    const errorCodes = [
        Diagnostics._0_is_declared_but_its_value_is_never_read.code,
        Diagnostics._0_is_declared_but_never_used.code,
        Diagnostics.Property_0_is_declared_but_its_value_is_never_read.code,
        Diagnostics.All_imports_in_import_declaration_are_unused.code,
        Diagnostics.All_destructured_elements_are_unused.code,
        Diagnostics.All_variables_are_unused.code,
        Diagnostics.All_type_parameters_are_unused.code,
    ];

    registerCodeFix({
        errorCodes,
        getCodeActions(context) {
            const { errorCode, sourceFile, program } = context;
            const checker = program.getTypeChecker();
            const sourceFiles = program.getSourceFiles();
            const token = getTokenAtPosition(sourceFile, context.span.start);

            if (isJSDocTemplateTag(token)) {
                return [createDeleteFix(textChanges.ChangeTracker.with(context, t => t.delete(sourceFile, token)), Diagnostics.Remove_template_tag)];
            }
            if (token.kind === SyntaxKind.LessThanToken) {
                const changes = textChanges.ChangeTracker.with(context, t => deleteTypeParameters(t, sourceFile, token));
                return [createDeleteFix(changes, Diagnostics.Remove_type_parameters)];
            }
            const importDecl = tryGetFullImport(token);
            if (importDecl) {
                const changes = textChanges.ChangeTracker.with(context, t => t.delete(sourceFile, importDecl));
                return [createDeleteFix(changes, [Diagnostics.Remove_import_from_0, showModuleSpecifier(importDecl)])];
            }
            const delDestructure = textChanges.ChangeTracker.with(context, t =>
                tryDeleteFullDestructure(token, t, sourceFile, checker, sourceFiles, /*isFixAll*/ false));
            if (delDestructure.length) {
                return [createDeleteFix(delDestructure, Diagnostics.Remove_destructuring)];
            }
            const delVar = textChanges.ChangeTracker.with(context, t => tryDeleteFullVariableStatement(sourceFile, token, t));
            if (delVar.length) {
                return [createDeleteFix(delVar, Diagnostics.Remove_variable_statement)];
            }

            const result: CodeFixAction[] = [];

            if (token.kind === SyntaxKind.InferKeyword) {
                const changes = textChanges.ChangeTracker.with(context, t => changeInferToUnknown(t, sourceFile, token));
                const name = cast(token.parent, isInferTypeNode).typeParameter.name.text;
                result.push(createCodeFixAction(fixName, changes, [Diagnostics.Replace_infer_0_with_unknown, name], fixIdInfer, Diagnostics.Replace_all_unused_infer_with_unknown));
            }
            else {
                const deletion = textChanges.ChangeTracker.with(context, t =>
                    tryDeleteDeclaration(sourceFile, token, t, checker, sourceFiles, /*isFixAll*/ false));
                if (deletion.length) {
                    const name = isComputedPropertyName(token.parent) ? token.parent : token;
                    result.push(createDeleteFix(deletion, [Diagnostics.Remove_unused_declaration_for_Colon_0, name.getText(sourceFile)]));
                }
            }

            const prefix = textChanges.ChangeTracker.with(context, t => tryPrefixDeclaration(t, errorCode, sourceFile, token));
            if (prefix.length) {
                result.push(createCodeFixAction(fixName, prefix, [Diagnostics.Prefix_0_with_an_underscore, token.getText(sourceFile)], fixIdPrefix, Diagnostics.Prefix_all_unused_declarations_with_where_possible));
            }

            return result;
        },
        fixIds: [fixIdPrefix, fixIdDelete, fixIdInfer],
        getAllCodeActions: context => {
            const { sourceFile, program } = context;
            const checker = program.getTypeChecker();
            const sourceFiles = program.getSourceFiles();
            return codeFixAll(context, errorCodes, (changes, diag) => {
                const token = getTokenAtPosition(sourceFile, diag.start);
                switch (context.fixId) {
                    case fixIdPrefix:
                        tryPrefixDeclaration(changes, diag.code, sourceFile, token);
                        break;
                    case fixIdDelete: {
                        if (token.kind === SyntaxKind.InferKeyword) break; // Can't delete
                        const importDecl = tryGetFullImport(token);
                        if (importDecl) {
                            changes.delete(sourceFile, importDecl);
                        }
                        else if (isJSDocTemplateTag(token)) {
                            changes.delete(sourceFile, token);
                        }
                        else if (token.kind === SyntaxKind.LessThanToken) {
                            deleteTypeParameters(changes, sourceFile, token);
                        }
                        else if (!tryDeleteFullDestructure(token, changes, sourceFile, checker, sourceFiles, /*isFixAll*/ true) &&
                            !tryDeleteFullVariableStatement(sourceFile, token, changes)) {
                            tryDeleteDeclaration(sourceFile, token, changes, checker, sourceFiles, /*isFixAll*/ true);
                        }
                        break;
                    }
                    case fixIdInfer:
                        if (token.kind === SyntaxKind.InferKeyword) {
                            changeInferToUnknown(changes, sourceFile, token);
                        }
                        break;
                    default:
                        Debug.fail(JSON.stringify(context.fixId));
                }
            });
        },
    });

    function changeInferToUnknown(changes: textChanges.ChangeTracker, sourceFile: SourceFile, token: Node): void {
        changes.replaceNode(sourceFile, token.parent, createKeywordTypeNode(SyntaxKind.UnknownKeyword));
    }

    function createDeleteFix(changes: FileTextChanges[], diag: DiagnosticAndArguments): CodeFixAction {
        return createCodeFixAction(fixName, changes, diag, fixIdDelete, Diagnostics.Delete_all_unused_declarations);
    }

    function deleteTypeParameters(changes: textChanges.ChangeTracker, sourceFile: SourceFile, token: Node): void {
        changes.delete(sourceFile, Debug.checkDefined(cast(token.parent, isDeclarationWithTypeParameterChildren).typeParameters, "The type parameter to delete should exist"));
    }

    // Sometimes the diagnostic span is an entire ImportDeclaration, so we should remove the whole thing.
    function tryGetFullImport(token: Node): ImportDeclaration | undefined {
        return token.kind === SyntaxKind.ImportKeyword ? tryCast(token.parent, isImportDeclaration) : undefined;
    }

    function tryDeleteFullDestructure(token: Node, changes: textChanges.ChangeTracker, sourceFile: SourceFile, checker: TypeChecker, sourceFiles: readonly SourceFile[], isFixAll: boolean): boolean {
        if (token.kind !== SyntaxKind.OpenBraceToken || !isObjectBindingPattern(token.parent)) return false;
        const decl = token.parent.parent;
        if (decl.kind === SyntaxKind.Parameter) {
            tryDeleteParameter(changes, sourceFile, decl, checker, sourceFiles, isFixAll);
        }
        else {
            changes.delete(sourceFile, decl);
        }
        return true;
    }

    function tryDeleteFullVariableStatement(sourceFile: SourceFile, token: Node, changes: textChanges.ChangeTracker): boolean {
        const declarationList = tryCast(token.parent, isVariableDeclarationList);
        if (declarationList && declarationList.getChildren(sourceFile)[0] === token) {
            changes.delete(sourceFile, declarationList.parent.kind === SyntaxKind.VariableStatement ? declarationList.parent : declarationList);
            return true;
        }
        return false;
    }

    function tryPrefixDeclaration(changes: textChanges.ChangeTracker, errorCode: number, sourceFile: SourceFile, token: Node): void {
        // Don't offer to prefix a property.
        if (errorCode === Diagnostics.Property_0_is_declared_but_its_value_is_never_read.code) return;
        if (token.kind === SyntaxKind.InferKeyword) {
            token = cast(token.parent, isInferTypeNode).typeParameter.name;
        }
        if (isIdentifier(token) && canPrefix(token)) {
            changes.replaceNode(sourceFile, token, createIdentifier(`_${token.text}`));
            if (isParameter(token.parent)) {
                getJSDocParameterTags(token.parent).forEach((tag) => {
                    if (isIdentifier(tag.name)) {
                        changes.replaceNode(sourceFile, tag.name, createIdentifier(`_${tag.name.text}`));
                    }
                });
            }
        }
    }

    function canPrefix(token: Identifier): boolean {
        switch (token.parent.kind) {
            case SyntaxKind.Parameter:
            case SyntaxKind.TypeParameter:
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

    function tryDeleteDeclaration(sourceFile: SourceFile, token: Node, changes: textChanges.ChangeTracker, checker: TypeChecker, sourceFiles: readonly SourceFile[], isFixAll: boolean) {
        tryDeleteDeclarationWorker(token, changes, sourceFile, checker, sourceFiles, isFixAll);
        if (isIdentifier(token)) deleteAssignments(changes, sourceFile, token, checker);
    }

    function deleteAssignments(changes: textChanges.ChangeTracker, sourceFile: SourceFile, token: Identifier, checker: TypeChecker) {
        FindAllReferences.Core.eachSymbolReferenceInFile(token, checker, sourceFile, (ref: Node) => {
            if (isPropertyAccessExpression(ref.parent) && ref.parent.name === ref) ref = ref.parent;
            if (isBinaryExpression(ref.parent) && isExpressionStatement(ref.parent.parent) && ref.parent.left === ref) {
                changes.delete(sourceFile, ref.parent.parent);
            }
        });
    }

    function tryDeleteDeclarationWorker(token: Node, changes: textChanges.ChangeTracker, sourceFile: SourceFile, checker: TypeChecker, sourceFiles: readonly SourceFile[], isFixAll: boolean): void {
        const { parent } = token;
        if (isParameter(parent)) {
            tryDeleteParameter(changes, sourceFile, parent, checker, sourceFiles, isFixAll);
        }
        else {
            changes.delete(sourceFile, isImportClause(parent) ? token : isComputedPropertyName(parent) ? parent.parent : parent);
        }
    }

    function tryDeleteParameter(changes: textChanges.ChangeTracker, sourceFile: SourceFile, p: ParameterDeclaration, checker: TypeChecker, sourceFiles: readonly SourceFile[], isFixAll: boolean): void {
        if (mayDeleteParameter(p, checker, isFixAll)) {
            if (p.modifiers && p.modifiers.length > 0
                    && (!isIdentifier(p.name) || FindAllReferences.Core.isSymbolReferencedInFile(p.name, checker, sourceFile))) {
                p.modifiers.forEach(modifier => {
                    changes.deleteModifier(sourceFile, modifier);
                });
            }
            else {
                changes.delete(sourceFile, p);
                deleteUnusedArguments(changes, sourceFile, p, sourceFiles, checker);
            }
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
                Debug.assert(index !== -1, "The parameter should already be in the list");
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

    function deleteUnusedArguments(changes: textChanges.ChangeTracker, sourceFile: SourceFile, deletedParameter: ParameterDeclaration, sourceFiles: readonly SourceFile[], checker: TypeChecker): void {
        FindAllReferences.Core.eachSignatureCall(deletedParameter.parent, sourceFiles, checker, call => {
            const index = deletedParameter.parent.parameters.indexOf(deletedParameter);
            if (call.arguments.length > index) { // Just in case the call didn't provide enough arguments.
                changes.delete(sourceFile, call.arguments[index]);
            }
        });
    }
}
