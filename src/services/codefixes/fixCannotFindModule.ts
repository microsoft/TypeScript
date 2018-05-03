/* @internal */
namespace ts.codefix {
    const fixId = "fixCannotFindModule";
    const errorCodeCannotFindModule = Diagnostics.Cannot_find_module_0.code;
    const errorCodes = [
        errorCodeCannotFindModule,
        Diagnostics.Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type.code,
    ];
    registerCodeFix({
        errorCodes,
        getCodeActions: context => {
            const { host, sourceFile, span: { start } } = context;
            const packageName = getTypesPackageNameToInstall(host, sourceFile, start, context.errorCode);
            return packageName === undefined ? []
                : [createCodeFixAction(fixId, /*changes*/ [], [Diagnostics.Install_0, packageName], fixId, Diagnostics.Install_all_missing_types_packages, getCommand(sourceFile.fileName, packageName))];
        },
        fixIds: [fixId],
        getAllCodeActions: context => codeFixAll(context, errorCodes, (_, diag, commands) => {
            const pkg = getTypesPackageNameToInstall(context.host, diag.file, diag.start, diag.code);
            if (pkg) {
                commands.push(getCommand(diag.file.fileName, pkg));
            }
        }),
    });

    function getCommand(fileName: string, packageName: string): InstallPackageAction {
        return { type: "install package", file: fileName, packageName };
    }

    function getTypesPackageNameToInstall(host: LanguageServiceHost, sourceFile: SourceFile, pos: number, diagCode: number): string | undefined {
        const moduleName = cast(getTokenAtPosition(sourceFile, pos, /*includeJsDocComment*/ false), isStringLiteral).text;
        const { packageName } = getPackageName(moduleName);
        return diagCode === errorCodeCannotFindModule
            ? (JsTyping.nodeCoreModules.has(packageName) ? "@types/node" : undefined)
            : (host.isKnownTypesPackageName(packageName) ? getTypesPackageName(packageName) : undefined);
    }
}
