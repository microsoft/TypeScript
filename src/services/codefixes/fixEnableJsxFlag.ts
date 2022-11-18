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

const fixID = "fixEnableJsxFlag";
const errorCodes = [Diagnostics.Cannot_use_JSX_unless_the_jsx_flag_is_provided.code];
registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToFixEnableJsxFlag(context) {
        const { configFile } = context.program.getCompilerOptions();
        if (configFile === undefined) {
            return undefined;
        }

        const changes = ChangeTracker.with(context, changeTracker =>
            doChange(changeTracker, configFile)
        );
        return [
            createCodeFixActionWithoutFixAll(fixID, changes, Diagnostics.Enable_the_jsx_flag_in_your_configuration_file)
        ];
    },
    fixIds: [fixID],
    getAllCodeActions: context =>
        codeFixAll(context, errorCodes, changes => {
            const { configFile } = context.program.getCompilerOptions();
            if (configFile === undefined) {
                return undefined;
            }

            doChange(changes, configFile);
        })
});

function doChange(changeTracker: ChangeTracker, configFile: TsConfigSourceFile) {
    setJsonCompilerOptionValue(changeTracker, configFile, "jsx", factory.createStringLiteral("react"));
}
