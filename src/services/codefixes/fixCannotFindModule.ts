/* @internal */
namespace ts.codefix {
    registerCodeFix({
        errorCodes: [
            Diagnostics.Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type.code,
        ],
        getCodeActions: context => {
            const { sourceFile, span: { start } } = context;
            const token = getTokenAtPosition(sourceFile, start, /*includeJsDocComment*/ false);
            if (!isStringLiteral(token)) {
                throw Debug.fail(); // These errors should only happen on the module name.
            }

            const action = tryGetCodeActionForInstallPackageTypes(context.host, token.text);
            return action && [action];
        },
    });

    export function tryGetCodeActionForInstallPackageTypes(host: LanguageServiceHost, moduleName: string): CodeAction | undefined {
        const { packageName } = getPackageName(moduleName);

        if (!host.isKnownTypesPackageName!(packageName)) { // TODO: GH#18217
            // If !registry, registry not available yet, can't do anything.
            return undefined;
        }

        const typesPackageName = getTypesPackageName(packageName);
        return {
            description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Install_0), [typesPackageName]),
            changes: [],
            commands: [{ type: "install package", packageName: typesPackageName }],
        };
    }
}
