import {
    codeFixAll,
    createCodeFixActionWithoutFixAll,
    registerCodeFix,
    setJsonCompilerOptionValue,
} from "../_namespaces/ts.codefix.js";
import {
    Diagnostics,
    factory,
    textChanges,
    TsConfigSourceFile,
} from "../_namespaces/ts.js";

const fixID = "fixEnableJsxFlag";
const errorCodes = [Diagnostics.Cannot_use_JSX_unless_the_jsx_flag_is_provided.code];
registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToFixEnableJsxFlag(context) {
        const { configFile } = context.program.getCompilerOptions();
        if (configFile === undefined) {
            return undefined;
        }

        const changes = textChanges.ChangeTracker.with(context, changeTracker => doChange(changeTracker, configFile));
        return [
            createCodeFixActionWithoutFixAll(fixID, changes, Diagnostics.Enable_the_jsx_flag_in_your_configuration_file),
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
        }),
});

function doChange(changeTracker: textChanges.ChangeTracker, configFile: TsConfigSourceFile) {
    setJsonCompilerOptionValue(changeTracker, configFile, "jsx", factory.createStringLiteral("react"));
}
