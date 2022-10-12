import * as ts from "../_namespaces/ts";

const fixName = "unusedIdentifier";
const fixIdPrefix = "unusedIdentifier_prefix";
const fixIdDelete = "unusedIdentifier_delete";
const fixIdDeleteImports = "unusedIdentifier_deleteImports";
const fixIdInfer = "unusedIdentifier_infer";
const errorCodes = [
    ts.Diagnostics._0_is_declared_but_its_value_is_never_read.code,
    ts.Diagnostics._0_is_declared_but_never_used.code,
    ts.Diagnostics.Property_0_is_declared_but_its_value_is_never_read.code,
    ts.Diagnostics.All_imports_in_import_declaration_are_unused.code,
    ts.Diagnostics.All_destructured_elements_are_unused.code,
    ts.Diagnostics.All_variables_are_unused.code,
    ts.Diagnostics.All_type_parameters_are_unused.code,
];

ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { errorCode, sourceFile, program, cancellationToken } = context;
        const checker = program.getTypeChecker();
        const sourceFiles = program.getSourceFiles();
        const token = ts.getTokenAtPosition(sourceFile, context.span.start);

        if (ts.isJSDocTemplateTag(token)) {
            return [createDeleteFix(ts.textChanges.ChangeTracker.with(context, t => t.delete(sourceFile, token)), ts.Diagnostics.Remove_template_tag)];
        }
        if (token.kind === ts.SyntaxKind.LessThanToken) {
            const changes = ts.textChanges.ChangeTracker.with(context, t => deleteTypeParameters(t, sourceFile, token));
            return [createDeleteFix(changes, ts.Diagnostics.Remove_type_parameters)];
        }
        const importDecl = tryGetFullImport(token);
        if (importDecl) {
            const changes = ts.textChanges.ChangeTracker.with(context, t => t.delete(sourceFile, importDecl));
            return [ts.codefix.createCodeFixAction(fixName, changes, [ts.Diagnostics.Remove_import_from_0, ts.showModuleSpecifier(importDecl)], fixIdDeleteImports, ts.Diagnostics.Delete_all_unused_imports)];
        }
        else if (isImport(token)) {
            const deletion = ts.textChanges.ChangeTracker.with(context, t => tryDeleteDeclaration(sourceFile, token, t, checker, sourceFiles, program, cancellationToken, /*isFixAll*/ false));
            if (deletion.length) {
                return [ts.codefix.createCodeFixAction(fixName, deletion, [ts.Diagnostics.Remove_unused_declaration_for_Colon_0, token.getText(sourceFile)], fixIdDeleteImports, ts.Diagnostics.Delete_all_unused_imports)];
            }
        }

        if (ts.isObjectBindingPattern(token.parent) || ts.isArrayBindingPattern(token.parent)) {
            if (ts.isParameter(token.parent.parent)) {
                const elements = token.parent.elements;
                const diagnostic: [ts.DiagnosticMessage, string] = [
                    elements.length > 1 ? ts.Diagnostics.Remove_unused_declarations_for_Colon_0 : ts.Diagnostics.Remove_unused_declaration_for_Colon_0,
                    ts.map(elements, e => e.getText(sourceFile)).join(", ")
                ];
                return [
                    createDeleteFix(ts.textChanges.ChangeTracker.with(context, t =>
                        deleteDestructuringElements(t, sourceFile, token.parent as ts.ObjectBindingPattern | ts.ArrayBindingPattern)), diagnostic)
                ];
            }
            return [
                createDeleteFix(ts.textChanges.ChangeTracker.with(context, t =>
                    t.delete(sourceFile, token.parent.parent)), ts.Diagnostics.Remove_unused_destructuring_declaration)
            ];
        }

        if (canDeleteEntireVariableStatement(sourceFile, token)) {
            return [
                createDeleteFix(ts.textChanges.ChangeTracker.with(context, t =>
                    deleteEntireVariableStatement(t, sourceFile, token.parent as ts.VariableDeclarationList)), ts.Diagnostics.Remove_variable_statement)
            ];
        }

        const result: ts.CodeFixAction[] = [];
        if (token.kind === ts.SyntaxKind.InferKeyword) {
            const changes = ts.textChanges.ChangeTracker.with(context, t => changeInferToUnknown(t, sourceFile, token));
            const name = ts.cast(token.parent, ts.isInferTypeNode).typeParameter.name.text;
            result.push(ts.codefix.createCodeFixAction(fixName, changes, [ts.Diagnostics.Replace_infer_0_with_unknown, name], fixIdInfer, ts.Diagnostics.Replace_all_unused_infer_with_unknown));
        }
        else {
            const deletion = ts.textChanges.ChangeTracker.with(context, t =>
                tryDeleteDeclaration(sourceFile, token, t, checker, sourceFiles, program, cancellationToken, /*isFixAll*/ false));
            if (deletion.length) {
                const name = ts.isComputedPropertyName(token.parent) ? token.parent : token;
                result.push(createDeleteFix(deletion, [ts.Diagnostics.Remove_unused_declaration_for_Colon_0, name.getText(sourceFile)]));
            }
        }

        const prefix = ts.textChanges.ChangeTracker.with(context, t => tryPrefixDeclaration(t, errorCode, sourceFile, token));
        if (prefix.length) {
            result.push(ts.codefix.createCodeFixAction(fixName, prefix, [ts.Diagnostics.Prefix_0_with_an_underscore, token.getText(sourceFile)], fixIdPrefix, ts.Diagnostics.Prefix_all_unused_declarations_with_where_possible));
        }

        return result;
    },
    fixIds: [fixIdPrefix, fixIdDelete, fixIdDeleteImports, fixIdInfer],
    getAllCodeActions: context => {
        const { sourceFile, program, cancellationToken } = context;
        const checker = program.getTypeChecker();
        const sourceFiles = program.getSourceFiles();
        return ts.codefix.codeFixAll(context, errorCodes, (changes, diag) => {
            const token = ts.getTokenAtPosition(sourceFile, diag.start);
            switch (context.fixId) {
                case fixIdPrefix:
                    tryPrefixDeclaration(changes, diag.code, sourceFile, token);
                    break;
                case fixIdDeleteImports: {
                    const importDecl = tryGetFullImport(token);
                    if (importDecl) {
                        changes.delete(sourceFile, importDecl);
                    }
                    else if (isImport(token)) {
                        tryDeleteDeclaration(sourceFile, token, changes, checker, sourceFiles, program, cancellationToken, /*isFixAll*/ true);
                    }
                    break;
                }
                case fixIdDelete: {
                    if (token.kind === ts.SyntaxKind.InferKeyword || isImport(token)) {
                        break; // Can't delete
                    }
                    else if (ts.isJSDocTemplateTag(token)) {
                        changes.delete(sourceFile, token);
                    }
                    else if (token.kind === ts.SyntaxKind.LessThanToken) {
                        deleteTypeParameters(changes, sourceFile, token);
                    }
                    else if (ts.isObjectBindingPattern(token.parent)) {
                        if (token.parent.parent.initializer) {
                            break;
                        }
                        else if (!ts.isParameter(token.parent.parent) || isNotProvidedArguments(token.parent.parent, checker, sourceFiles)) {
                            changes.delete(sourceFile, token.parent.parent);
                        }
                    }
                    else if (ts.isArrayBindingPattern(token.parent.parent) && token.parent.parent.parent.initializer) {
                        break;
                    }
                    else if (canDeleteEntireVariableStatement(sourceFile, token)) {
                        deleteEntireVariableStatement(changes, sourceFile, token.parent as ts.VariableDeclarationList);
                    }
                    else {
                        tryDeleteDeclaration(sourceFile, token, changes, checker, sourceFiles, program, cancellationToken, /*isFixAll*/ true);
                    }
                    break;
                }
                case fixIdInfer:
                    if (token.kind === ts.SyntaxKind.InferKeyword) {
                        changeInferToUnknown(changes, sourceFile, token);
                    }
                    break;
                default:
                    ts.Debug.fail(JSON.stringify(context.fixId));
            }
        });
    },
});

function changeInferToUnknown(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, token: ts.Node): void {
    changes.replaceNode(sourceFile, token.parent, ts.factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword));
}

function createDeleteFix(changes: ts.FileTextChanges[], diag: ts.DiagnosticAndArguments): ts.CodeFixAction {
    return ts.codefix.createCodeFixAction(fixName, changes, diag, fixIdDelete, ts.Diagnostics.Delete_all_unused_declarations);
}

function deleteTypeParameters(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, token: ts.Node): void {
    changes.delete(sourceFile, ts.Debug.checkDefined(ts.cast(token.parent, ts.isDeclarationWithTypeParameterChildren).typeParameters, "The type parameter to delete should exist"));
}

function isImport(token: ts.Node) {
    return token.kind === ts.SyntaxKind.ImportKeyword
        || token.kind === ts.SyntaxKind.Identifier && (token.parent.kind === ts.SyntaxKind.ImportSpecifier || token.parent.kind === ts.SyntaxKind.ImportClause);
}

/** Sometimes the diagnostic span is an entire ImportDeclaration, so we should remove the whole thing. */
function tryGetFullImport(token: ts.Node): ts.ImportDeclaration | undefined {
    return token.kind === ts.SyntaxKind.ImportKeyword ? ts.tryCast(token.parent, ts.isImportDeclaration) : undefined;
}

function canDeleteEntireVariableStatement(sourceFile: ts.SourceFile, token: ts.Node): boolean {
    return ts.isVariableDeclarationList(token.parent) && ts.first(token.parent.getChildren(sourceFile)) === token;
}

function deleteEntireVariableStatement(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, node: ts.VariableDeclarationList) {
    changes.delete(sourceFile, node.parent.kind === ts.SyntaxKind.VariableStatement ? node.parent : node);
}

function deleteDestructuringElements(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, node: ts.ObjectBindingPattern | ts.ArrayBindingPattern) {
    ts.forEach(node.elements, n => changes.delete(sourceFile, n));
}

function tryPrefixDeclaration(changes: ts.textChanges.ChangeTracker, errorCode: number, sourceFile: ts.SourceFile, token: ts.Node): void {
    // Don't offer to prefix a property.
    if (errorCode === ts.Diagnostics.Property_0_is_declared_but_its_value_is_never_read.code) return;
    if (token.kind === ts.SyntaxKind.InferKeyword) {
        token = ts.cast(token.parent, ts.isInferTypeNode).typeParameter.name;
    }
    if (ts.isIdentifier(token) && canPrefix(token)) {
        changes.replaceNode(sourceFile, token, ts.factory.createIdentifier(`_${token.text}`));
        if (ts.isParameter(token.parent)) {
            ts.getJSDocParameterTags(token.parent).forEach((tag) => {
                if (ts.isIdentifier(tag.name)) {
                    changes.replaceNode(sourceFile, tag.name, ts.factory.createIdentifier(`_${tag.name.text}`));
                }
            });
        }
    }
}

function canPrefix(token: ts.Identifier): boolean {
    switch (token.parent.kind) {
        case ts.SyntaxKind.Parameter:
        case ts.SyntaxKind.TypeParameter:
            return true;
        case ts.SyntaxKind.VariableDeclaration: {
            const varDecl = token.parent as ts.VariableDeclaration;
            switch (varDecl.parent.parent.kind) {
                case ts.SyntaxKind.ForOfStatement:
                case ts.SyntaxKind.ForInStatement:
                    return true;
            }
        }
    }
    return false;
}

function tryDeleteDeclaration(sourceFile: ts.SourceFile, token: ts.Node, changes: ts.textChanges.ChangeTracker, checker: ts.TypeChecker, sourceFiles: readonly ts.SourceFile[], program: ts.Program, cancellationToken: ts.CancellationToken, isFixAll: boolean) {
    tryDeleteDeclarationWorker(token, changes, sourceFile, checker, sourceFiles, program, cancellationToken, isFixAll);
    if (ts.isIdentifier(token)) {
        ts.FindAllReferences.Core.eachSymbolReferenceInFile(token, checker, sourceFile, (ref: ts.Node) => {
            if (ts.isPropertyAccessExpression(ref.parent) && ref.parent.name === ref) ref = ref.parent;
            if (!isFixAll && mayDeleteExpression(ref)) {
                changes.delete(sourceFile, ref.parent.parent);
            }
        });
    }
}

function tryDeleteDeclarationWorker(token: ts.Node, changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, checker: ts.TypeChecker, sourceFiles: readonly ts.SourceFile[], program: ts.Program, cancellationToken: ts.CancellationToken, isFixAll: boolean): void {
    const { parent } = token;
    if (ts.isParameter(parent)) {
        tryDeleteParameter(changes, sourceFile, parent, checker, sourceFiles, program, cancellationToken, isFixAll);
    }
    else if (!(isFixAll && ts.isIdentifier(token) && ts.FindAllReferences.Core.isSymbolReferencedInFile(token, checker, sourceFile))) {
        const node = ts.isImportClause(parent) ? token : ts.isComputedPropertyName(parent) ? parent.parent : parent;
        ts.Debug.assert(node !== sourceFile, "should not delete whole source file");
        changes.delete(sourceFile, node);
    }
}

function tryDeleteParameter(
    changes: ts.textChanges.ChangeTracker,
    sourceFile: ts.SourceFile,
    parameter: ts.ParameterDeclaration,
    checker: ts.TypeChecker,
    sourceFiles: readonly ts.SourceFile[],
    program: ts.Program,
    cancellationToken: ts.CancellationToken,
    isFixAll = false): void {
    if (mayDeleteParameter(checker, sourceFile, parameter, sourceFiles, program, cancellationToken, isFixAll)) {
        if (parameter.modifiers && parameter.modifiers.length > 0 &&
            (!ts.isIdentifier(parameter.name) || ts.FindAllReferences.Core.isSymbolReferencedInFile(parameter.name, checker, sourceFile))) {
            for (const modifier of parameter.modifiers) {
                if (ts.isModifier(modifier)) {
                    changes.deleteModifier(sourceFile, modifier);
                }
            }
        }
        else if (!parameter.initializer && isNotProvidedArguments(parameter, checker, sourceFiles)) {
            changes.delete(sourceFile, parameter);
        }
    }
}

function isNotProvidedArguments(parameter: ts.ParameterDeclaration, checker: ts.TypeChecker, sourceFiles: readonly ts.SourceFile[]) {
    const index = parameter.parent.parameters.indexOf(parameter);
    // Just in case the call didn't provide enough arguments.
    return !ts.FindAllReferences.Core.someSignatureUsage(parameter.parent, sourceFiles, checker, (_, call) => !call || call.arguments.length > index);
}

function mayDeleteParameter(checker: ts.TypeChecker, sourceFile: ts.SourceFile, parameter: ts.ParameterDeclaration, sourceFiles: readonly ts.SourceFile[], program: ts.Program, cancellationToken: ts.CancellationToken, isFixAll: boolean): boolean {
    const { parent } = parameter;
    switch (parent.kind) {
        case ts.SyntaxKind.MethodDeclaration:
        case ts.SyntaxKind.Constructor:
            const index = parent.parameters.indexOf(parameter);
            const referent = ts.isMethodDeclaration(parent) ? parent.name : parent;
            const entries = ts.FindAllReferences.Core.getReferencedSymbolsForNode(parent.pos, referent, program, sourceFiles, cancellationToken);
            if (entries) {
                for (const entry of entries) {
                    for (const reference of entry.references) {
                        if (reference.kind === ts.FindAllReferences.EntryKind.Node) {
                            // argument in super(...)
                            const isSuperCall = ts.isSuperKeyword(reference.node)
                                && ts.isCallExpression(reference.node.parent)
                                && reference.node.parent.arguments.length > index;
                            // argument in super.m(...)
                            const isSuperMethodCall = ts.isPropertyAccessExpression(reference.node.parent)
                                && ts.isSuperKeyword(reference.node.parent.expression)
                                && ts.isCallExpression(reference.node.parent.parent)
                                && reference.node.parent.parent.arguments.length > index;
                            // parameter in overridden or overriding method
                            const isOverriddenMethod = (ts.isMethodDeclaration(reference.node.parent) || ts.isMethodSignature(reference.node.parent))
                                && reference.node.parent !== parameter.parent
                                && reference.node.parent.parameters.length > index;
                            if (isSuperCall || isSuperMethodCall || isOverriddenMethod) return false;
                        }
                    }
                }
            }
            return true;
        case ts.SyntaxKind.FunctionDeclaration: {
            if (parent.name && isCallbackLike(checker, sourceFile, parent.name)) {
                return isLastParameter(parent, parameter, isFixAll);
            }
            return true;
        }
        case ts.SyntaxKind.FunctionExpression:
        case ts.SyntaxKind.ArrowFunction:
            // Can't remove a non-last parameter in a callback. Can remove a parameter in code-fix-all if future parameters are also unused.
            return isLastParameter(parent, parameter, isFixAll);

        case ts.SyntaxKind.SetAccessor:
            // Setter must have a parameter
            return false;

        case ts.SyntaxKind.GetAccessor:
            // Getter cannot have parameters
            return true;

        default:
            return ts.Debug.failBadSyntaxKind(parent);
    }
}

function isCallbackLike(checker: ts.TypeChecker, sourceFile: ts.SourceFile, name: ts.Identifier): boolean {
    return !!ts.FindAllReferences.Core.eachSymbolReferenceInFile(name, checker, sourceFile, reference =>
        ts.isIdentifier(reference) && ts.isCallExpression(reference.parent) && reference.parent.arguments.indexOf(reference) >= 0);
}

function isLastParameter(func: ts.FunctionLikeDeclaration, parameter: ts.ParameterDeclaration, isFixAll: boolean): boolean {
    const parameters = func.parameters;
    const index = parameters.indexOf(parameter);
    ts.Debug.assert(index !== -1, "The parameter should already be in the list");
    return isFixAll ?
        parameters.slice(index + 1).every(p => ts.isIdentifier(p.name) && !p.symbol.isReferenced) :
        index === parameters.length - 1;
}

function mayDeleteExpression(node: ts.Node) {
    return ((ts.isBinaryExpression(node.parent) && node.parent.left === node) ||
        ((ts.isPostfixUnaryExpression(node.parent) || ts.isPrefixUnaryExpression(node.parent)) && node.parent.operand === node)) && ts.isExpressionStatement(node.parent.parent);
}
