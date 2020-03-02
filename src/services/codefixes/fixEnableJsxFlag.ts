import { Diagnostics, TsConfigSourceFile, createStringLiteral } from "../ts";
import { registerCodeFix, createCodeFixActionWithoutFixAll, codeFixAll, setJsonCompilerOptionValue } from "../ts.codefix";
import { ChangeTracker } from "../ts.textChanges";
/* @internal */
const fixID = "fixEnableJsxFlag";
/* @internal */
const errorCodes = [Diagnostics.Cannot_use_JSX_unless_the_jsx_flag_is_provided.code];
/* @internal */
registerCodeFix({
    errorCodes,
    getCodeActions: context => {
        const { configFile } = context.program.getCompilerOptions();
        if (configFile === undefined) {
            return undefined;
        }
        const changes = ChangeTracker.with(context, changeTracker => doChange(changeTracker, configFile));
        return [
            createCodeFixActionWithoutFixAll(fixID, changes, Diagnostics.Enable_the_jsx_flag_in_your_configuration_file)
        ];
    },
    fixIds: [fixID],
    getAllCodeActions: context => codeFixAll(context, errorCodes, changes => {
        const { configFile } = context.program.getCompilerOptions();
        if (configFile === undefined) {
            return undefined;
        }
        doChange(changes, configFile);
    })
});
/* @internal */
function doChange(changeTracker: ChangeTracker, configFile: TsConfigSourceFile) {
    setJsonCompilerOptionValue(changeTracker, configFile, "jsx", createStringLiteral("react"));
}
