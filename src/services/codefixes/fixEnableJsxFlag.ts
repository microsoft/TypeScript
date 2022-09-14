/* @internal */
namespace ts.codefix {
const fixID = "fixEnableJsxFlag";
const errorCodes = [ts.Diagnostics.Cannot_use_JSX_unless_the_jsx_flag_is_provided.code];
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToFixEnableJsxFlag(context) {
        const { configFile } = context.program.getCompilerOptions();
        if (configFile === undefined) {
            return undefined;
        }

        const changes = ts.textChanges.ChangeTracker.with(context, changeTracker =>
            doChange(changeTracker, configFile)
        );
        return [
            ts.codefix.createCodeFixActionWithoutFixAll(fixID, changes, ts.Diagnostics.Enable_the_jsx_flag_in_your_configuration_file)
        ];
    },
    fixIds: [fixID],
    getAllCodeActions: context =>
        ts.codefix.codeFixAll(context, errorCodes, changes => {
            const { configFile } = context.program.getCompilerOptions();
            if (configFile === undefined) {
                return undefined;
            }

            doChange(changes, configFile);
        })
});

function doChange(changeTracker: ts.textChanges.ChangeTracker, configFile: ts.TsConfigSourceFile) {
    ts.codefix.setJsonCompilerOptionValue(changeTracker, configFile, "jsx", ts.factory.createStringLiteral("react"));
}
}
