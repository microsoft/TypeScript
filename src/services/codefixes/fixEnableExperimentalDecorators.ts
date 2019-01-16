/* @internal */
namespace ts.codefix {
    const fixId = "enableExperimentalDecorators";
    const errorCodes = [
        Diagnostics.Experimental_support_for_decorators_is_a_feature_that_is_subject_to_change_in_a_future_release_Set_the_experimentalDecorators_option_to_remove_this_warning.code
    ];
    registerCodeFix({
        errorCodes,
        getCodeActions: (context) => {
            const { configFile } = context.program.getCompilerOptions();
            if (configFile === undefined) {
                return undefined;
            }

            const changes = textChanges.ChangeTracker.with(context, changeTracker => makeChange(changeTracker, configFile));
            return [createCodeFixActionNoFixId(fixId, changes, Diagnostics.Enable_the_experimentalDecorators_option_in_your_configuration_file)];
        },
        fixIds: [fixId],
    });

    function makeChange(changeTracker: textChanges.ChangeTracker, configFile: TsConfigSourceFile) {
        setJsonCompilerOptionValue(changeTracker, configFile, "experimentalDecorators", createTrue());
    }
}
