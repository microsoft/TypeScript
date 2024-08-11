import {
    createCodeFixActionWithoutFixAll,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    Diagnostics,
    factory,
    textChanges,
} from "../_namespaces/ts.js";

registerCodeFix({
    errorCodes: [
        Diagnostics.await_expressions_are_only_allowed_at_the_top_level_of_a_file_when_that_file_is_a_module_but_this_file_has_no_imports_or_exports_Consider_adding_an_empty_export_to_make_this_file_a_module.code,
        Diagnostics.await_using_statements_are_only_allowed_at_the_top_level_of_a_file_when_that_file_is_a_module_but_this_file_has_no_imports_or_exports_Consider_adding_an_empty_export_to_make_this_file_a_module.code,
        Diagnostics.for_await_loops_are_only_allowed_at_the_top_level_of_a_file_when_that_file_is_a_module_but_this_file_has_no_imports_or_exports_Consider_adding_an_empty_export_to_make_this_file_a_module.code,
    ],
    getCodeActions: function getCodeActionsToAddEmptyExportDeclaration(context) {
        const { sourceFile } = context;
        const changes = textChanges.ChangeTracker.with(context, changes => {
            const exportDeclaration = factory.createExportDeclaration(
                /*modifiers*/ undefined,
                /*isTypeOnly*/ false,
                factory.createNamedExports([]),
                /*moduleSpecifier*/ undefined,
            );
            changes.insertNodeAtEndOfScope(sourceFile, sourceFile, exportDeclaration);
        });
        return [createCodeFixActionWithoutFixAll("addEmptyExportDeclaration", changes, Diagnostics.Add_export_to_make_this_file_into_a_module)];
    },
});
