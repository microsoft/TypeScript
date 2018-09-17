/* @internal */
namespace ts.codefix {
    const fixName = "fixCannotFindModule";
    const fixIdInstallTypesPackage = "installTypesPackage";
    const fixIdGenerateTypes = "generateTypes";

    const errorCodeCannotFindModule = Diagnostics.Cannot_find_module_0.code;
    const errorCodes = [
        errorCodeCannotFindModule,
        Diagnostics.Could_not_find_a_declaration_file_for_module_0_1_implicitly_has_an_any_type.code,
    ];
    registerCodeFix({
        errorCodes,
        getCodeActions: context => {
            const { host, sourceFile, span: { start } } = context;
            const packageName = tryGetImportedPackageName(sourceFile, start);
            if (packageName === undefined) return undefined;
            const typesPackageName = getTypesPackageNameToInstall(packageName, host, context.errorCode);
            return typesPackageName === undefined
                ? singleElementArray(tryGetGenerateTypesAction(context, packageName))
                : [createCodeFixAction(fixName, /*changes*/ [], [Diagnostics.Install_0, typesPackageName], fixIdInstallTypesPackage, Diagnostics.Install_all_missing_types_packages, getInstallCommand(sourceFile.fileName, typesPackageName))];
        },
        fixIds: [fixIdInstallTypesPackage, fixIdGenerateTypes],
        getAllCodeActions: context => {
            let savedTypesDir: string | null | undefined = null; // tslint:disable-line no-null-keyword
            return codeFixAll(context, errorCodes, (changes, diag, commands) => {
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
                    case fixIdGenerateTypes: {
                        const typesDir = savedTypesDir !== null ? savedTypesDir : savedTypesDir = getOrCreateTypesDirectory(changes, context);
                        const command = typesDir === undefined ? undefined : tryGenerateTypes(typesDir, packageName, context);
                        if (command) commands.push(command);
                        break;
                    }
                    default:
                        Debug.fail(`Bad fixId: ${context.fixId}`);
                }
            });
        },
    });

    function tryGetGenerateTypesAction(context: CodeFixContextBase, packageName: string): CodeFixAction | undefined {
        let command: GenerateTypesAction | undefined;
        const changes = textChanges.ChangeTracker.with(context, t => {
            const typesDir = getOrCreateTypesDirectory(t, context);
            command = typesDir === undefined ? undefined : tryGenerateTypes(typesDir, packageName, context);
        });
        return command && createCodeFixAction(fixName, changes, [Diagnostics.Generate_types_for_0, packageName], fixIdGenerateTypes, Diagnostics.Generate_types_for_all_packages_without_types, command);
    }

    function tryGenerateTypes(typesDir: string, packageName: string, context: CodeFixContextBase): GenerateTypesAction | undefined {
        const file = context.sourceFile.fileName;
        const fileToGenerateTypesFor = tryResolveJSModule(packageName, getDirectoryPath(file), context.host as ModuleResolutionHost); // TODO: GH#18217
        if (fileToGenerateTypesFor === undefined) return undefined;

        const outputFileName = resolvePath(getDirectoryPath(context.program.getCompilerOptions().configFile!.fileName), typesDir, packageName + ".d.ts");
        if (context.host.fileExists!(outputFileName)) return undefined;
        return { type: "generate types", file, fileToGenerateTypesFor, outputFileName };
    }

    // If no types directory exists yet, adds it to tsconfig.json
    function getOrCreateTypesDirectory(changes: textChanges.ChangeTracker, context: CodeFixContextBase): string | undefined {
        const { configFile } = context.program.getCompilerOptions();
        if (!configFile) return undefined;

        const tsconfigObjectLiteral = getTsConfigObjectLiteralExpression(configFile);
        if (!tsconfigObjectLiteral) return undefined;

        const compilerOptionsProperty = findProperty(tsconfigObjectLiteral, "compilerOptions");
        if (!compilerOptionsProperty) {
            const newCompilerOptions = createObjectLiteral([makeDefaultBaseUrl(), makeDefaultPaths()]);
            changes.insertNodeAtObjectStart(configFile, tsconfigObjectLiteral, createJsonPropertyAssignment("compilerOptions", newCompilerOptions));
            return defaultTypesDirectoryName;
        }

        const compilerOptions = compilerOptionsProperty.initializer;
        if (!isObjectLiteralExpression(compilerOptions)) return defaultTypesDirectoryName;

        const baseUrl = getOrAddBaseUrl(changes, configFile, compilerOptions);
        const typesDirectoryFromPathMapping = getOrAddPathMapping(changes, configFile, compilerOptions);
        return combinePaths(baseUrl, typesDirectoryFromPathMapping);
    }

    const defaultBaseUrl = ".";
    function makeDefaultBaseUrl(): PropertyAssignment {
        return createJsonPropertyAssignment("baseUrl", createStringLiteral(defaultBaseUrl));
    }
    function getOrAddBaseUrl(changes: textChanges.ChangeTracker, tsconfig: TsConfigSourceFile, compilerOptions: ObjectLiteralExpression): string {
        const baseUrlProp = findProperty(compilerOptions, "baseUrl");
        if (baseUrlProp) {
            return isStringLiteral(baseUrlProp.initializer) ? baseUrlProp.initializer.text : defaultBaseUrl;
        }
        else {
            changes.insertNodeAtObjectStart(tsconfig, compilerOptions, makeDefaultBaseUrl());
            return defaultBaseUrl;
        }
    }

    const defaultTypesDirectoryName = "types";
    function makeDefaultPathMapping(): PropertyAssignment {
        return createJsonPropertyAssignment("*", createArrayLiteral([createStringLiteral(`${defaultTypesDirectoryName}/*`)]));
    }
    function makeDefaultPaths(): PropertyAssignment {
        return createJsonPropertyAssignment("paths", createObjectLiteral([makeDefaultPathMapping()]));
    }
    function getOrAddPathMapping(changes: textChanges.ChangeTracker, tsconfig: TsConfigSourceFile, compilerOptions: ObjectLiteralExpression) {
        const paths = findProperty(compilerOptions, "paths");
        if (!paths || !isObjectLiteralExpression(paths.initializer)) {
            changes.insertNodeAtObjectStart(tsconfig, compilerOptions, makeDefaultPaths());
            return defaultTypesDirectoryName;
        }

        // Look for an existing path mapping. Should look like `"*": "foo/*"`.
        const existing = firstDefined(paths.initializer.properties, prop =>
            isPropertyAssignment(prop) && isStringLiteral(prop.name) && prop.name.text === "*" && isArrayLiteralExpression(prop.initializer)
                ? firstDefined(prop.initializer.elements, value => isStringLiteral(value) ? tryRemoveSuffix(value.text, "/*") : undefined)
                : undefined);
        if (existing) return existing;

        changes.insertNodeAtObjectStart(tsconfig, paths.initializer, makeDefaultPathMapping());
        return defaultTypesDirectoryName;
    }

    function createJsonPropertyAssignment(name: string, initializer: Expression) {
        return createPropertyAssignment(createStringLiteral(name), initializer);
    }

    function findProperty(obj: ObjectLiteralExpression, name: string): PropertyAssignment | undefined {
        return find(obj.properties, (p): p is PropertyAssignment => isPropertyAssignment(p) && !!p.name && isStringLiteral(p.name) && p.name.text === name);
    }

    function getInstallCommand(fileName: string, packageName: string): InstallPackageAction {
        return { type: "install package", file: fileName, packageName };
    }

    function tryGetImportedPackageName(sourceFile: SourceFile, pos: number): string | undefined {
        const moduleName = cast(getTokenAtPosition(sourceFile, pos), isStringLiteral).text;
        const { packageName } = parsePackageName(moduleName);
        return isExternalModuleNameRelative(packageName) ? undefined : packageName;
    }

    function getTypesPackageNameToInstall(packageName: string, host: LanguageServiceHost, diagCode: number): string | undefined {
        return diagCode === errorCodeCannotFindModule
            ? (JsTyping.nodeCoreModules.has(packageName) ? "@types/node" : undefined)
            : (host.isKnownTypesPackageName!(packageName) ? getTypesPackageName(packageName) : undefined); // TODO: GH#18217
    }
}
