import { Diagnostics } from "../../compiler/diagnosticInformationMap.generated";
import { factory } from "../../compiler/factory/nodeFactory";
import { TsConfigSourceFile } from "../../compiler/types";
import {
    codeFixAll,
    createCodeFixActionWithoutFixAll,
    registerCodeFix,
} from "../codeFixProvider";
import { ChangeTracker } from "../textChanges";
import { setJsonCompilerOptionValue } from "./helpers";

const fixId = "enableExperimentalDecorators";
const errorCodes = [
    Diagnostics.Experimental_support_for_decorators_is_a_feature_that_is_subject_to_change_in_a_future_release_Set_the_experimentalDecorators_option_in_your_tsconfig_or_jsconfig_to_remove_this_warning.code
];
registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToEnableExperimentalDecorators(context) {
        const { configFile } = context.program.getCompilerOptions();
        if (configFile === undefined) {
            return undefined;
        }

        const changes = ChangeTracker.with(context, changeTracker => doChange(changeTracker, configFile));
        return [createCodeFixActionWithoutFixAll(fixId, changes, Diagnostics.Enable_the_experimentalDecorators_option_in_your_configuration_file)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => codeFixAll(context, errorCodes, (changes) => {
        const { configFile } = context.program.getCompilerOptions();
        if (configFile === undefined) {
            return undefined;
        }
        doChange(changes, configFile);
    }),
});

function doChange(changeTracker: ChangeTracker, configFile: TsConfigSourceFile) {
    setJsonCompilerOptionValue(changeTracker, configFile, "experimentalDecorators", factory.createTrue());
}
