import * as Harness from "../../_namespaces/Harness.js";
import * as ts from "../../_namespaces/ts.js";

describe("unittests:: config:: showConfig", () => {
    function showTSConfigCorrectly(name: string, commandLinesArgs: string[], configJson?: object) {
        describe(name, () => {
            const outputFileName = `config/showConfig/${name.replace(/[^a-z0-9\-./ ]/gi, "")}/tsconfig.json`;

            it(`Correct output for ${outputFileName}`, () => {
                const cwd = `/${name}`;
                const configPath = ts.combinePaths(cwd, "tsconfig.json");
                const configContents = configJson ? JSON.stringify(configJson) : undefined;
                const configParseHost: ts.ParseConfigFileHost = {
                    fileExists: path => ts.comparePaths(ts.getNormalizedAbsolutePath(path, cwd), configPath) === ts.Comparison.EqualTo ? true : false,
                    getCurrentDirectory() {
                        return cwd;
                    },
                    useCaseSensitiveFileNames: true,
                    onUnRecoverableConfigFileDiagnostic: d => {
                        throw new Error(ts.flattenDiagnosticMessageText(d.messageText, "\n"));
                    },
                    readDirectory() {
                        return [];
                    },
                    readFile: path => ts.comparePaths(ts.getNormalizedAbsolutePath(path, cwd), configPath) === ts.Comparison.EqualTo ? configContents : undefined,
                };
                let commandLine = ts.parseCommandLine(commandLinesArgs);
                if (commandLine.options.project) {
                    const result = ts.getParsedCommandLineOfConfigFile(commandLine.options.project, commandLine.options, configParseHost);
                    if (result) {
                        commandLine = result;
                    }
                }
                const initResult = ts.convertToTSConfig(commandLine, configPath, configParseHost);

                // eslint-disable-next-line no-restricted-syntax
                Harness.Baseline.runBaseline(outputFileName, JSON.stringify(initResult, null, 4) + "\n");
            });
        });
    }

    showTSConfigCorrectly("Default initialized TSConfig", ["--showConfig"]);

    showTSConfigCorrectly("Show TSConfig with files options", ["--showConfig", "file0.ts", "file1.ts", "file2.ts"]);

    showTSConfigCorrectly("Show TSConfig with boolean value compiler options", ["--showConfig", "--noUnusedLocals"]);

    showTSConfigCorrectly("Show TSConfig with enum value compiler options", ["--showConfig", "--target", "es5", "--jsx", "react"]);

    showTSConfigCorrectly("Show TSConfig with list compiler options", ["--showConfig", "--types", "jquery,mocha"]);

    showTSConfigCorrectly("Show TSConfig with list compiler options with enum value", ["--showConfig", "--lib", "es5,es2015.core"]);

    showTSConfigCorrectly("Show TSConfig with incorrect compiler option", ["--showConfig", "--someNonExistOption"]);

    showTSConfigCorrectly("Show TSConfig with incorrect compiler option value", ["--showConfig", "--lib", "nonExistLib,es5,es2015.promise"]);

    showTSConfigCorrectly("Show TSConfig with advanced options", ["--showConfig", "--declaration", "--declarationDir", "lib", "--skipLibCheck", "--noErrorTruncation"]);

    showTSConfigCorrectly("Show TSConfig with transitively implied options", ["--showConfig", "--module", "nodenext"]);

    showTSConfigCorrectly("Show TSConfig with compileOnSave and more", ["-p", "tsconfig.json"], {
        compilerOptions: {
            esModuleInterop: true,
            target: "es5",
            module: "commonjs",
            strict: true,
        },
        compileOnSave: true,
        exclude: [
            "dist",
        ],
        files: [],
        include: [
            "src/*",
        ],
        references: [
            { path: "./test" },
        ],
    });

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
                    "src/types/*",
                ],
            },
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            resolveJsonModule: true,
        },
        include: [
            "./src/**/*",
        ],
    });

    showTSConfigCorrectly("Show TSConfig with watch options", ["-p", "tsconfig.json"], {
        watchOptions: {
            watchFile: "DynamicPriorityPolling",
        },
        include: [
            "./src/**/*",
        ],
    });

    showTSConfigCorrectly("Show TSConfig with configDir template template", ["-p", "tsconfig.json"], {
        compilerOptions: {
            outDir: "${configDir}/outDir", // eslint-disable-line no-template-curly-in-string
            typeRoots: ["root1", "${configDir}/root2", "root3"], // eslint-disable-line no-template-curly-in-string
            paths: {
                "@myscope/*": ["${configDir}/types/*"], // eslint-disable-line no-template-curly-in-string
                "other/*": ["other/*"],
            },
        },
        include: [
            "${configDir}/src/**/*", // eslint-disable-line no-template-curly-in-string
        ],
        files: ["${configDir}/main.ts"], // eslint-disable-line no-template-curly-in-string
    });

    // Bulk validation of all option declarations
    for (const option of ts.optionDeclarations) {
        baselineOption(option, /*isCompilerOptions*/ true);
    }

    for (const option of ts.optionsForWatch) {
        baselineOption(option, /*isCompilerOptions*/ false);
    }

    function baselineOption(option: ts.CommandLineOption, isCompilerOptions: boolean) {
        if (option.name === "project") return;
        let args: string[];
        let optionValue: object | undefined;
        switch (option.type) {
            case "boolean": {
                if (option.isTSConfigOnly) {
                    args = ["-p", "tsconfig.json"];
                    optionValue = { [option.name]: true };
                }
                else {
                    args = [`--${option.name}`];
                }
                break;
            }
            case "list": {
                if (option.isTSConfigOnly) {
                    args = ["-p", "tsconfig.json"];
                    optionValue = { [option.name]: [] };
                }
                else {
                    args = [`--${option.name}`];
                }
                break;
            }
            case "listOrElement": {
                ts.Debug.fail();
                break;
            }
            case "string": {
                if (option.isTSConfigOnly) {
                    args = ["-p", "tsconfig.json"];
                    optionValue = { [option.name]: "someString" };
                }
                else {
                    args = [`--${option.name}`, "someString"];
                }
                break;
            }
            case "number": {
                if (option.isTSConfigOnly) {
                    args = ["-p", "tsconfig.json"];
                    optionValue = { [option.name]: 0 };
                }
                else {
                    args = [`--${option.name}`, "0"];
                }
                break;
            }
            case "object": {
                args = ["-p", "tsconfig.json"];
                optionValue = { [option.name]: {} };
                break;
            }
            default: {
                const val = ts.firstOrUndefinedIterator(option.type.keys());
                if (val === undefined) return ts.Debug.fail("Expected 'option.type' to have entries");
                if (option.isTSConfigOnly) {
                    args = ["-p", "tsconfig.json"];
                    optionValue = { [option.name]: val };
                }
                else {
                    args = [`--${option.name}`, val];
                }
                break;
            }
        }

        const configObject = optionValue &&
            (isCompilerOptions ? { compilerOptions: optionValue } : { watchOptions: optionValue });
        showTSConfigCorrectly(`Shows tsconfig for single option/${option.name}`, args, configObject);
    }
});
