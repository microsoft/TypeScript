import * as ts from "../_namespaces/ts";

ts.codefix.registerCodeFix({
    errorCodes: [
        ts.Diagnostics.Top_level_await_expressions_are_only_allowed_when_the_module_option_is_set_to_es2022_esnext_system_node16_or_nodenext_and_the_target_option_is_set_to_es2017_or_higher.code,
        ts.Diagnostics.Top_level_for_await_loops_are_only_allowed_when_the_module_option_is_set_to_es2022_esnext_system_node16_or_nodenext_and_the_target_option_is_set_to_es2017_or_higher.code,
    ],
    getCodeActions: function getCodeActionsToFixModuleAndTarget(context) {
        const compilerOptions = context.program.getCompilerOptions();
        const { configFile } = compilerOptions;
        if (configFile === undefined) {
            return undefined;
        }

        const codeFixes: ts.CodeFixAction[] = [];
        const moduleKind = ts.getEmitModuleKind(compilerOptions);
        const moduleOutOfRange = moduleKind >= ts.ModuleKind.ES2015 && moduleKind < ts.ModuleKind.ESNext;
        if (moduleOutOfRange) {
            const changes = ts.textChanges.ChangeTracker.with(context, changes => {
                ts.codefix.setJsonCompilerOptionValue(changes, configFile, "module", ts.factory.createStringLiteral("esnext"));
            });
            codeFixes.push(ts.codefix.createCodeFixActionWithoutFixAll("fixModuleOption", changes, [ts.Diagnostics.Set_the_module_option_in_your_configuration_file_to_0, "esnext"]));
        }

        const target = ts.getEmitScriptTarget(compilerOptions);
        const targetOutOfRange = target < ts.ScriptTarget.ES2017 || target > ts.ScriptTarget.ESNext;
        if (targetOutOfRange) {
            const changes = ts.textChanges.ChangeTracker.with(context, tracker => {
                const configObject = ts.getTsConfigObjectLiteralExpression(configFile);
                if (!configObject) return;

                const options: [string, ts.Expression][] = [["target", ts.factory.createStringLiteral("es2017")]];
                if (moduleKind === ts.ModuleKind.CommonJS) {
                    // Ensure we preserve the default module kind (commonjs), as targets >= ES2015 have a default module kind of es2015.
                    options.push(["module", ts.factory.createStringLiteral("commonjs")]);
                }

                ts.codefix.setJsonCompilerOptionValues(tracker, configFile, options);
            });

            codeFixes.push(ts.codefix.createCodeFixActionWithoutFixAll("fixTargetOption", changes, [ts.Diagnostics.Set_the_target_option_in_your_configuration_file_to_0, "es2017"]));
        }

        return codeFixes.length ? codeFixes : undefined;
    }
});
