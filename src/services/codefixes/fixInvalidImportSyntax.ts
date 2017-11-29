/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [Diagnostics.A_namespace_style_import_cannot_be_called_or_constructed_and_will_cause_a_failure_at_runtime.code],
        getCodeActions: getActionsForInvalidImport
    });

    function getActionsForInvalidImport(context: CodeFixContext): CodeAction[] | undefined {
        const sourceFile = context.sourceFile;

        // This is the whole import statement, eg:
        // import * as Bluebird from 'bluebird';
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        const node = getTokenAtPosition(sourceFile, context.span.start, /*includeJsDocComment*/ false).parent as ImportDeclaration;
        const namespace = getNamespaceDeclarationNode(node) as NamespaceImport;
        const opts = context.program.getCompilerOptions();
        const variations: CodeAction[] = [];
        if (opts.module === ModuleKind.CommonJS || (!opts.module && opts.target < ScriptTarget.ES2015)) {
            // import Bluebird = require("bluebird");
            const replacement = createImportEqualsDeclaration(
                /*decorators*/ undefined,
                /*modifiers*/ undefined,
                namespace.name,
                createExternalModuleReference(node.moduleSpecifier)
            );
            const changeTracker = textChanges.ChangeTracker.fromContext(context);
            changeTracker.replaceNode(sourceFile, node, replacement, { useNonAdjustedEndPosition: true });
            const changes = changeTracker.getChanges();
            variations.push({
                description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Replace_import_with_0), [changes[0].textChanges[0].newText]),
                changes
            });
        }

        // import Bluebird from "bluebird";
        const replacement = createImportDeclaration(
            /*decorators*/ undefined,
            /*modifiers*/ undefined,
            createImportClause(namespace.name, /*namedBindings*/ undefined),
            node.moduleSpecifier
        );
        const changeTracker = textChanges.ChangeTracker.fromContext(context);
        changeTracker.replaceNode(sourceFile, node, replacement, { useNonAdjustedEndPosition: true });
        const changes = changeTracker.getChanges();
        variations.push({
            description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Replace_import_with_0), [changes[0].textChanges[0].newText]),
            changes
        });

        return variations;
    }
}
