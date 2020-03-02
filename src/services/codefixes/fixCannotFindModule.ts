import { Diagnostics, Debug, InstallPackageAction, SourceFile, cast, getTokenAtPosition, isStringLiteral, parsePackageName, isExternalModuleNameRelative, LanguageServiceHost, JsTyping, getTypesPackageName } from "../ts";
import { registerCodeFix, createCodeFixAction, codeFixAll } from "../ts.codefix";
/* @internal */
const fixName = "fixCannotFindModule";
/* @internal */
const fixIdInstallTypesPackage = "installTypesPackage";
/* @internal */
const errorCodeCannotFindModule = Diagnostics.Cannot_find_module_0.code;
/* @internal */
const errorCodes = [
    errorCodeCannotFindModule,
    Diagnostics.Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type.code,
];
/* @internal */
registerCodeFix({
    errorCodes,
    getCodeActions: context => {
        const { host, sourceFile, span: { start } } = context;
        const packageName = tryGetImportedPackageName(sourceFile, start);
        if (packageName === undefined)
            return undefined;
        const typesPackageName = getTypesPackageNameToInstall(packageName, host, context.errorCode);
        return typesPackageName === undefined
            ? []
            : [createCodeFixAction(fixName, /*changes*/ [], [Diagnostics.Install_0, typesPackageName], fixIdInstallTypesPackage, Diagnostics.Install_all_missing_types_packages, getInstallCommand(sourceFile.fileName, typesPackageName))];
    },
    fixIds: [fixIdInstallTypesPackage],
    getAllCodeActions: context => {
        return codeFixAll(context, errorCodes, (_changes, diag, commands) => {
            const packageName = tryGetImportedPackageName(diag.file, diag.start);
            if (packageName === undefined)
                return undefined;
            switch (context.fixId) {
                case fixIdInstallTypesPackage: {
                    const pkg = getTypesPackageNameToInstall(packageName, context.host, diag.code);
                    if (pkg) {
                        commands.push(getInstallCommand(diag.file.fileName, pkg));
                    }
                    break;
                }
                default:
                    Debug.fail(`Bad fixId: ${context.fixId}`);
            }
        });
    },
});
/* @internal */
function getInstallCommand(fileName: string, packageName: string): InstallPackageAction {
    return { type: "install package", file: fileName, packageName };
}
/* @internal */
function tryGetImportedPackageName(sourceFile: SourceFile, pos: number): string | undefined {
    const moduleName = cast(getTokenAtPosition(sourceFile, pos), isStringLiteral).text;
    const { packageName } = parsePackageName(moduleName);
    return isExternalModuleNameRelative(packageName) ? undefined : packageName;
}
/* @internal */
function getTypesPackageNameToInstall(packageName: string, host: LanguageServiceHost, diagCode: number): string | undefined {
    return diagCode === errorCodeCannotFindModule
        ? (JsTyping.nodeCoreModules.has(packageName) ? "@types/node" : undefined)
        : (host.isKnownTypesPackageName!(packageName) ? getTypesPackageName(packageName) : undefined); // TODO: GH#18217
}
