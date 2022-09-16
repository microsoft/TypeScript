import * as ts from "../_namespaces/ts";

const fixId = "fixUnreferenceableDecoratorMetadata";
const errorCodes = [ts.Diagnostics.A_type_referenced_in_a_decorated_signature_must_be_imported_with_import_type_or_a_namespace_import_when_isolatedModules_and_emitDecoratorMetadata_are_enabled.code];
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions: context => {
        const importDeclaration = getImportDeclaration(context.sourceFile, context.program, context.span.start);
        if (!importDeclaration) return;

        const namespaceChanges = ts.textChanges.ChangeTracker.with(context, t => importDeclaration.kind === ts.SyntaxKind.ImportSpecifier && doNamespaceImportChange(t, context.sourceFile, importDeclaration, context.program));
        const typeOnlyChanges = ts.textChanges.ChangeTracker.with(context, t => doTypeOnlyImportChange(t, context.sourceFile, importDeclaration, context.program));
        let actions: ts.CodeFixAction[] | undefined;
        if (namespaceChanges.length) {
            actions = ts.append(actions, ts.codefix.createCodeFixActionWithoutFixAll(fixId, namespaceChanges, ts.Diagnostics.Convert_named_imports_to_namespace_import));
        }
        if (typeOnlyChanges.length) {
            actions = ts.append(actions, ts.codefix.createCodeFixActionWithoutFixAll(fixId, typeOnlyChanges, ts.Diagnostics.Convert_to_type_only_import));
        }
        return actions;
    },
    fixIds: [fixId],
});

function getImportDeclaration(sourceFile: ts.SourceFile, program: ts.Program, start: number): ts.ImportClause | ts.ImportSpecifier | ts.ImportEqualsDeclaration | undefined {
    const identifier = ts.tryCast(ts.getTokenAtPosition(sourceFile, start), ts.isIdentifier);
    if (!identifier || identifier.parent.kind !== ts.SyntaxKind.TypeReference) return;

    const checker = program.getTypeChecker();
    const symbol = checker.getSymbolAtLocation(identifier);
    return ts.find(symbol?.declarations || ts.emptyArray, ts.or(ts.isImportClause, ts.isImportSpecifier, ts.isImportEqualsDeclaration) as (n: ts.Node) => n is ts.ImportClause | ts.ImportSpecifier | ts.ImportEqualsDeclaration);
}

// Converts the import declaration of the offending import to a type-only import,
// only if it can be done without affecting other imported names. If the conversion
// cannot be done cleanly, we could offer to *extract* the offending import to a
// new type-only import declaration, but honestly I doubt anyone will ever use this
// codefix at all, so it's probably not worth the lines of code.
function doTypeOnlyImportChange(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, importDeclaration: ts.ImportClause | ts.ImportSpecifier | ts.ImportEqualsDeclaration, program: ts.Program) {
    if (importDeclaration.kind === ts.SyntaxKind.ImportEqualsDeclaration) {
        changes.insertModifierBefore(sourceFile, ts.SyntaxKind.TypeKeyword, importDeclaration.name);
        return;
    }

    const importClause = importDeclaration.kind === ts.SyntaxKind.ImportClause ? importDeclaration : importDeclaration.parent.parent;
    if (importClause.name && importClause.namedBindings) {
        // Cannot convert an import with a default import and named bindings to type-only
        // (it's a grammar error).
        return;
    }

    const checker = program.getTypeChecker();
    const importsValue = !!ts.forEachImportClauseDeclaration(importClause, decl => {
        if (ts.skipAlias(decl.symbol, checker).flags & ts.SymbolFlags.Value) return true;
    });

    if (importsValue) {
        // Assume that if someone wrote a non-type-only import that includes some values,
        // they intend to use those values in value positions, even if they haven't yet.
        // Don't convert it to type-only.
        return;
    }

    changes.insertModifierBefore(sourceFile, ts.SyntaxKind.TypeKeyword, importClause);
}

function doNamespaceImportChange(changes: ts.textChanges.ChangeTracker, sourceFile: ts.SourceFile, importDeclaration: ts.ImportSpecifier, program: ts.Program) {
    ts.refactor.doChangeNamedToNamespaceOrDefault(sourceFile, program, changes, importDeclaration.parent);
}
