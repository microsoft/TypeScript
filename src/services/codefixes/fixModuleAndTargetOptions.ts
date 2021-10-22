/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [
            Diagnostics.The_0_setting_1_does_not_support_top_level_await_expressions_Consider_switching_to_2.code,
            Diagnostics.The_0_setting_1_does_not_support_top_level_for_await_loops_Consider_switching_to_2.code,
        ],
        getCodeActions: context => {
            const compilerOptions = context.program.getCompilerOptions();
            const { configFile } = compilerOptions;
            if (configFile === undefined) {
                return undefined;
            }

            const codeFixes: CodeFixAction[] = [];
            const moduleKind = getEmitModuleKind(compilerOptions);
            const moduleOutOfRange = moduleKind >= ModuleKind.ES2015 && moduleKind < ModuleKind.ESNext;
            if (moduleOutOfRange) {
                const changes = textChanges.ChangeTracker.with(context, changes => {
                    setJsonCompilerOptionValue(changes, configFile, "module", factory.createStringLiteral("esnext"));
                });
                codeFixes.push(createCodeFixActionWithoutFixAll("fixModuleOption", changes, [Diagnostics.Set_the_module_option_in_your_configuration_file_to_0, "esnext"]));
            }

            const target = getEmitScriptTarget(compilerOptions);
            const targetOutOfRange = target < ScriptTarget.ES2017 || target > ScriptTarget.ESNext;
            if (targetOutOfRange) {
                const changes = textChanges.ChangeTracker.with(context, tracker => {
                    const configObject = getTsConfigObjectLiteralExpression(configFile);
                    if (!configObject) return;

                    const options: [string, Expression][] = [["target", factory.createStringLiteral("es2017")]];
                    if (moduleKind === ModuleKind.CommonJS) {
                        // Ensure we preserve the default module kind (commonjs), as targets >= ES2015 have a default module kind of es2015.
                        options.push(["module", factory.createStringLiteral("commonjs")]);
                    }

                    setJsonCompilerOptionValues(tracker, configFile, options);
                });

                codeFixes.push(createCodeFixActionWithoutFixAll("fixTargetOption", changes, [Diagnostics.Set_the_target_option_in_your_configuration_file_to_0, "es2017"]));
            }

            return codeFixes.length ? codeFixes : undefined;
        }
    });
}
