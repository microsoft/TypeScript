namespace ts {
    describe("unittests:: config:: showConfig", () => {
        function showTSConfigCorrectly(name: string, commandLinesArgs: string[], configJson?: object) {
            describe(name, () => {
                const outputFileName = `showConfig/${name.replace(/[^a-z0-9\-./ ]/ig, "")}/tsconfig.json`;

                it(`Correct output for ${outputFileName}`, () => {
                    const cwd = `/${name}`;
                    const configPath = combinePaths(cwd, "tsconfig.json");
                    const configContents = configJson ? JSON.stringify(configJson) : undefined;
                    const configParseHost: ParseConfigFileHost = {
                        fileExists: path =>
                            comparePaths(getNormalizedAbsolutePath(path, cwd), configPath) === Comparison.EqualTo ? true : false,
                        getCurrentDirectory() { return cwd; },
                        useCaseSensitiveFileNames: true,
                        onUnRecoverableConfigFileDiagnostic: d => {
                            throw new Error(flattenDiagnosticMessageText(d.messageText, "\n"));
                        },
                        readDirectory() { return []; },
                        readFile: path =>
                            comparePaths(getNormalizedAbsolutePath(path, cwd), configPath) === Comparison.EqualTo ? configContents : undefined,
                    };
                    let commandLine = parseCommandLine(commandLinesArgs);
                    if (commandLine.options.project) {
                        const result = getParsedCommandLineOfConfigFile(commandLine.options.project, commandLine.options, configParseHost);
                        if (result) {
                            commandLine = result;
                        }
                    }
                    const initResult = convertToTSConfig(commandLine, configPath, configParseHost);

                    // tslint:disable-next-line:no-null-keyword
                    Harness.Baseline.runBaseline(outputFileName, JSON.stringify(initResult, null, 4) + "\n");
                });
            });
        }

        showTSConfigCorrectly("Default initialized TSConfig", ["--showConfig"]);

        showTSConfigCorrectly("Show TSConfig with files options", ["--showConfig", "file0.st", "file1.ts", "file2.ts"]);

        showTSConfigCorrectly("Show TSConfig with boolean value compiler options", ["--showConfig", "--noUnusedLocals"]);

        showTSConfigCorrectly("Show TSConfig with enum value compiler options", ["--showConfig", "--target", "es5", "--jsx", "react"]);

        showTSConfigCorrectly("Show TSConfig with list compiler options", ["--showConfig", "--types", "jquery,mocha"]);

        showTSConfigCorrectly("Show TSConfig with list compiler options with enum value", ["--showConfig", "--lib", "es5,es2015.core"]);

        showTSConfigCorrectly("Show TSConfig with incorrect compiler option", ["--showConfig", "--someNonExistOption"]);

        showTSConfigCorrectly("Show TSConfig with incorrect compiler option value", ["--showConfig", "--lib", "nonExistLib,es5,es2015.promise"]);

        showTSConfigCorrectly("Show TSConfig with advanced options", ["--showConfig", "--declaration", "--declarationDir", "lib", "--skipLibCheck", "--noErrorTruncation"]);

        // Regression test for https://github.com/Microsoft/TypeScript/issues/28836
        showTSConfigCorrectly("Show TSConfig with paths and more", ["-p", "tsconfig.json"], {
    compilerOptions: {
        allowJs: true,
        outDir: "./lib",
        esModuleInterop: true,
        module: "commonjs",
        moduleResolution: "node",
        target: "ES2017",
        sourceMap: true,
        baseUrl: ".",
        paths: {
            "@root/*": ["./*"],
            "@configs/*": ["src/configs/*"],
            "@common/*": ["src/common/*"],
            "*": [
                "node_modules/*",
                "src/types/*"
            ]
        },
        experimentalDecorators: true,
        emitDecoratorMetadata: true,
        resolveJsonModule: true
    },
    include: [
        "./src/**/*"
    ]
});

        // Bulk validation of all option declarations
        for (const option of optionDeclarations) {
            if (option.name === "project") continue;
            let configObject: object | undefined;
            let args: string[];
            switch (option.type) {
                case "boolean": {
                    if (option.isTSConfigOnly) {
                        args = ["-p", "tsconfig.json"];
                        configObject = { compilerOptions: { [option.name]: true } };
                    }
                    else {
                        args = [`--${option.name}`];
                    }
                    break;
                }
                case "list": {
                    if (option.isTSConfigOnly) {
                        args = ["-p", "tsconfig.json"];
                        configObject = { compilerOptions: { [option.name]: [] } };
                    }
                    else {
                        args = [`--${option.name}`];
                    }
                    break;
                }
                case "string": {
                    if (option.isTSConfigOnly) {
                        args = ["-p", "tsconfig.json"];
                        configObject = { compilerOptions: { [option.name]: "someString" } };
                    }
                    else {
                        args = [`--${option.name}`, "someString"];
                    }
                    break;
                }
                case "number": {
                    if (option.isTSConfigOnly) {
                        args = ["-p", "tsconfig.json"];
                        configObject = { compilerOptions: { [option.name]: 0 } };
                    }
                    else {
                        args = [`--${option.name}`, "0"];
                    }
                    break;
                }
                case "object": {
                    args = ["-p", "tsconfig.json"];
                    configObject = { compilerOptions: { [option.name]: {} } };
                    break;
                }
                default: {
                    const val = option.type.keys().next().value;
                    if (option.isTSConfigOnly) {
                        args = ["-p", "tsconfig.json"];
                        configObject = { compilerOptions: { [option.name]: val } };
                    }
                    else {
                        args = [`--${option.name}`, val];
                    }
                    break;
                }
            }
            showTSConfigCorrectly(`Shows tsconfig for single option/${option.name}`, args, configObject);
        }
    });
}
