import {
    codeFixAll,
    createCodeFixAction,
    registerCodeFix,
} from "../_namespaces/ts.codefix.js";
import {
    Debug,
    Diagnostics,
    getJSXImplicitImportBase,
    getTokenAtPosition,
    getTypesPackageName,
    InstallPackageAction,
    isExternalModuleNameRelative,
    isStringLiteral,
    LanguageServiceHost,
    nodeCoreModules,
    parsePackageName,
    SourceFile,
    tryCast,
} from "../_namespaces/ts.js";

const fixName = "fixCannotFindModule";
const fixIdInstallTypesPackage = "installTypesPackage";

const errorCodeCannotFindModule = Diagnostics.Cannot_find_module_0_or_its_corresponding_type_declarations.code;
const errorCannotFindImplicitJsxImport = Diagnostics.This_JSX_tag_requires_the_module_path_0_to_exist_but_none_could_be_found_Make_sure_you_have_types_for_the_appropriate_package_installed.code;
const errorCodes = [
    errorCodeCannotFindModule,
    Diagnostics.Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type.code,
    errorCannotFindImplicitJsxImport,
];
registerCodeFix({
    errorCodes,
    getCodeActions: function getCodeActionsToFixNotFoundModule(context) {
        const { host, sourceFile, span: { start }, errorCode } = context;

        const packageName = errorCode === errorCannotFindImplicitJsxImport ?
            getJSXImplicitImportBase(context.program.getCompilerOptions(), sourceFile) :
            tryGetImportedPackageName(sourceFile, start);
        if (packageName === undefined) return undefined;

        const typesPackageName = getTypesPackageNameToInstall(packageName, host, errorCode);
        return typesPackageName === undefined
            ? []
            : [createCodeFixAction(fixName, /*changes*/ [], [Diagnostics.Install_0, typesPackageName], fixIdInstallTypesPackage, Diagnostics.Install_all_missing_types_packages, getInstallCommand(sourceFile.fileName, typesPackageName))];
    },
    fixIds: [fixIdInstallTypesPackage],
    getAllCodeActions: context => {
        return codeFixAll(context, errorCodes, (_changes, diag, commands) => {
            const packageName = tryGetImportedPackageName(diag.file, diag.start);
            if (packageName === undefined) return undefined;
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

function getInstallCommand(fileName: string, packageName: string): InstallPackageAction {
    return { type: "install package", file: fileName, packageName };
}

function tryGetImportedPackageName(sourceFile: SourceFile, pos: number): string | undefined {
    const moduleSpecifierText = tryCast(getTokenAtPosition(sourceFile, pos), isStringLiteral);
    if (!moduleSpecifierText) return undefined;
    const moduleName = moduleSpecifierText.text;
    const { packageName } = parsePackageName(moduleName);
    return isExternalModuleNameRelative(packageName) ? undefined : packageName;
}

function getTypesPackageNameToInstall(packageName: string, host: LanguageServiceHost, diagCode: number): string | undefined {
    return diagCode === errorCodeCannotFindModule
        ? (nodeCoreModules.has(packageName) ? "@types/node" : undefined)
        : (host.isKnownTypesPackageName?.(packageName) ? getTypesPackageName(packageName) : undefined);
}
