/* @internal */
namespace ts.codefix {
const fixId = "enableExperimentalDecorators";
const errorCodes = [
    ts.Diagnostics.Experimental_support_for_decorators_is_a_feature_that_is_subject_to_change_in_a_future_release_Set_the_experimentalDecorators_option_in_your_tsconfig_or_jsconfig_to_remove_this_warning.code
];
ts.codefix.registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToEnableExperimentalDecorators(context) {
        const { configFile } = context.program.getCompilerOptions();
        if (configFile === undefined) {
            return undefined;
        }

        const changes = ts.textChanges.ChangeTracker.with(context, changeTracker => doChange(changeTracker, configFile));
        return [ts.codefix.createCodeFixActionWithoutFixAll(fixId, changes, ts.Diagnostics.Enable_the_experimentalDecorators_option_in_your_configuration_file)];
    },
    fixIds: [fixId],
    getAllCodeActions: context => ts.codefix.codeFixAll(context, errorCodes, (changes) => {
        const { configFile } = context.program.getCompilerOptions();
        if (configFile === undefined) {
            return undefined;
        }
        doChange(changes, configFile);
    }),
});

function doChange(changeTracker: ts.textChanges.ChangeTracker, configFile: ts.TsConfigSourceFile) {
    ts.codefix.setJsonCompilerOptionValue(changeTracker, configFile, "experimentalDecorators", ts.factory.createTrue());
}
}
