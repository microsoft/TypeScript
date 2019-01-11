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
        const tsconfigObjectLiteral = getTsConfigObjectLiteralExpression(configFile);
        if (tsconfigObjectLiteral === undefined) {
            return;
        }

        const compilerOptionsProperty = findJsonProperty(tsconfigObjectLiteral, "compilerOptions");
        if (compilerOptionsProperty === undefined) {
            changeTracker.insertNodeAtObjectStart(configFile, tsconfigObjectLiteral, createCompilerOptionsAssignment());
            return;
        }

        const compilerOptions = compilerOptionsProperty.initializer;
        if (!isObjectLiteralExpression(compilerOptions)) {
            return;
        }

        const experimentalDecoratorsProperty = findJsonProperty(compilerOptions, "experimentalDecorators");

        if (experimentalDecoratorsProperty === undefined) {
            changeTracker.insertNodeAtObjectStart(configFile, compilerOptions, createExperimentalDecoratorsAssignment());
        }
        else {
            changeTracker.replaceNodeWithText(configFile, experimentalDecoratorsProperty.initializer, "true");
        }
    }

    function createCompilerOptionsAssignment() {
        return createJsonPropertyAssignment(
            "compilerOptions",
            createObjectLiteral([
                createExperimentalDecoratorsAssignment(),
            ]),
        );
    }

    function createExperimentalDecoratorsAssignment() {
        return createJsonPropertyAssignment("experimentalDecorators", createTrue());
    }
}
