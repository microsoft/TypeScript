/* @internal */
namespace ts.codefix {
    const fixId = "fixCannotFindModule";
    const errorCodes = [Diagnostics.Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type.code];
    registerCodeFix({
        errorCodes,
        getCodeActions: context => {
            const codeAction = tryGetCodeActionForInstallPackageTypes(context.host, context.sourceFile.fileName, getModuleName(context.sourceFile, context.span.start));
            return codeAction && [{ fixId, ...codeAction }];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (_, diag, commands) => {
            const pkg = getTypesPackageNameToInstall(context.host, getModuleName(diag.file, diag.start));
            if (pkg) {
                commands.push(getCommand(diag.file.fileName, pkg));
            }
        }),
    });

    function getModuleName(sourceFile: SourceFile, pos: number): string {
        return cast(getTokenAtPosition(sourceFile, pos, /*includeJsDocComment*/ false), isStringLiteral).text;
    }

    function getCommand(fileName: string, packageName: string): InstallPackageAction {
        return { type: "install package", file: fileName, packageName };
    }

    function getTypesPackageNameToInstall(host: LanguageServiceHost, moduleName: string): string | undefined {
        const { packageName } = getPackageName(moduleName);
        // If !registry, registry not available yet, can't do anything.
        return host.isKnownTypesPackageName(packageName) ? getTypesPackageName(packageName) : undefined;
    }

    function tryGetCodeActionForInstallPackageTypes(host: LanguageServiceHost, fileName: string, moduleName: string): CodeAction | undefined {
        const packageName = getTypesPackageNameToInstall(host, moduleName);
        return packageName === undefined ? undefined : {
            description: formatStringFromArgs(getLocaleSpecificMessage(Diagnostics.Install_0), [packageName]),
            changes: [],
            commands: [getCommand(fileName, packageName)],
        };
    }
}
