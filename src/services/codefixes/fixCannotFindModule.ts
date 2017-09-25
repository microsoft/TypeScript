/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [
            Diagnostics.Cannot_find_module_0.code,
            Diagnostics.Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type.code,
        ],
        getCodeActions: context => {
            const { sourceFile } = context;
            const { start } = context.span;

            const token = getTokenAtPosition(sourceFile, start, /*includeJsDocComment*/ false);
            if (!isStringLiteral(token)) {
                throw Debug.fail(); // These errors should only happen on the module name.
            }

            const packageName = token.text;

            //We want to avoid looking this up in the registry as that is expensive.
            const validationResult = validatePackageName(packageName);
            if (validationResult !== PackageNameValidationResult.Ok) {
                //TODO: this is a debug logging
                if (context.host.log) {
                    context.host.log(renderPackageNameValidationFailure(validationResult, packageName));
                }
                return undefined;
            }

            const registry = context.host.tryGetRegistry();
            if (!registry) {
                //Registry not available, can't do anything.
                return undefined;
            }

            if (!registry.has(packageName)) {
                return undefined;
            }

            const action: CodeAction = {
                description: `Install typings for ${packageName}`,
                changes: [],
                commands: [{
                    type: "install package",
                    packageName: `@types/${packageName}`,
                    tsconfigLocation: context.host.getTsconfigLocation(), //context.program.getCommonSourceDirectory(),
                }],
            };
            return [action];
        },
    });
}
