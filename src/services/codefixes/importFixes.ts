import { Diagnostics } from "../../compiler/diagnosticInformationMap.generated";
import {
    createCombinedCodeActions,
    eachDiagnostic,
    registerCodeFix,
} from "../codeFixProvider";
import { ChangeTracker } from "../textChanges";
import {
    codeActionForFix,
    createImportAdder,
    fixId,
    fixName,
    getFixInfos,
} from "./importAdder";

const errorCodes: readonly number[] = [
    Diagnostics.Cannot_find_name_0.code,
    Diagnostics.Cannot_find_name_0_Did_you_mean_1.code,
    Diagnostics.Cannot_find_name_0_Did_you_mean_the_instance_member_this_0.code,
    Diagnostics.Cannot_find_name_0_Did_you_mean_the_static_member_1_0.code,
    Diagnostics.Cannot_find_namespace_0.code,
    Diagnostics._0_refers_to_a_UMD_global_but_the_current_file_is_a_module_Consider_adding_an_import_instead.code,
    Diagnostics._0_only_refers_to_a_type_but_is_being_used_as_a_value_here.code,
    Diagnostics.No_value_exists_in_scope_for_the_shorthand_property_0_Either_declare_one_or_provide_an_initializer.code,
    Diagnostics._0_cannot_be_used_as_a_value_because_it_was_imported_using_import_type.code,
];

/** @internal */
export const importFixName = fixName;

registerCodeFix({
    errorCodes,
    getCodeActions(context) {
        const { errorCode, preferences, sourceFile, span, program } = context;
        const info = getFixInfos(context, errorCode, span.start, /*useAutoImportProvider*/ true);
        if (!info) return undefined;
        return info.map(({ fix, symbolName, errorIdentifierText }) =>
            codeActionForFix(context, sourceFile, symbolName, fix, /*includeSymbolNameInDescription*/ symbolName !== errorIdentifierText, program.getCompilerOptions(), preferences));
    },
    fixIds: [fixId],
    getAllCodeActions: context => {
        const { sourceFile, program, preferences, host, cancellationToken } = context;
        const importAdder = createImportAdder(sourceFile, program, preferences, host, /*useAutoImportProvider*/ true, cancellationToken);
        eachDiagnostic(context, errorCodes, diag => importAdder.addImportFromDiagnostic(diag, context));
        return createCombinedCodeActions(ChangeTracker.with(context, importAdder.writeFixes));
    },
});
