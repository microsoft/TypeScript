/// <reference path="..\harness.ts" />
/// <reference path="..\..\compiler\commandLineParser.ts" />
/// <reference path="../compiler.ts" />
/// <reference path="../vfs.ts" />

namespace ts {
    interface ExpectedResult { typeAcquisition: TypeAcquisition; errors: Diagnostic[]; }
    describe("convertTypeAcquisitionFromJson", () => {
        function assertTypeAcquisition(json: any, configFileName: string, expectedResult: ExpectedResult) {
            assertTypeAcquisitionWithJson(json, configFileName, expectedResult);
            assertTypeAcquisitionWithJsonNode(json, configFileName, expectedResult);
        }

        function verifyAcquisition(actualTypeAcquisition: TypeAcquisition, expectedResult: ExpectedResult) {
            const parsedTypeAcquisition = JSON.stringify(actualTypeAcquisition);
            const expectedTypeAcquisition = JSON.stringify(expectedResult.typeAcquisition);
            assert.equal(parsedTypeAcquisition, expectedTypeAcquisition);
        }

        function verifyErrors(actualErrors: Diagnostic[], expectedResult: ExpectedResult, hasLocation?: boolean) {
            const expectedErrors = expectedResult.errors;
            assert.isTrue(expectedResult.errors.length === actualErrors.length, `Expected error: ${JSON.stringify(expectedResult.errors)}. Actual error: ${JSON.stringify(actualErrors)}.`);
            for (let i = 0; i < actualErrors.length; i++) {
                const actualError = actualErrors[i];
                const expectedError = expectedErrors[i];
                assert.equal(actualError.code, expectedError.code, `Expected error-code: ${JSON.stringify(expectedError.code)}. Actual error-code: ${JSON.stringify(actualError.code)}.`);
                assert.equal(actualError.category, expectedError.category, `Expected error-category: ${JSON.stringify(expectedError.category)}. Actual error-category: ${JSON.stringify(actualError.category)}.`);
                if (hasLocation) {
                    assert(actualError.file);
                    assert(actualError.start);
                    assert(actualError.length);
                }
            }
        }

        function assertTypeAcquisitionWithJson(json: any, configFileName: string, expectedResult: ExpectedResult) {
            const jsonOptions = json.typeAcquisition || json.typingOptions;
            const { options: actualTypeAcquisition, errors: actualErrors } = convertTypeAcquisitionFromJson(jsonOptions, "/apath/", configFileName);
            verifyAcquisition(actualTypeAcquisition, expectedResult);
            verifyErrors(actualErrors, expectedResult);
        }

        function assertTypeAcquisitionWithJsonNode(json: any, configFileName: string, expectedResult: ExpectedResult) {
            const fileText = JSON.stringify(json);
            const result = parseJsonText(configFileName, fileText);
            assert(!result.parseDiagnostics.length);
            assert(!!result.endOfFileToken);
            const host: ParseConfigHost = new fakes.ParseConfigHost(new vfs.FileSystem(/*ignoreCase*/ false, { cwd: "/apath/" }));
            const { typeAcquisition: actualTypeAcquisition, errors: actualParseErrors } = parseJsonSourceFileConfigFileContent(result, host, "/apath/", /*existingOptions*/ undefined, configFileName);
            verifyAcquisition(actualTypeAcquisition, expectedResult);

            const actualErrors = filter(actualParseErrors, error => error.code !== Diagnostics.No_inputs_were_found_in_config_file_0_Specified_include_paths_were_1_and_exclude_paths_were_2.code);
            verifyErrors(actualErrors, expectedResult, /*hasLocation*/ true);
        }

        // tsconfig.json
        it("Convert deprecated typingOptions.enableAutoDiscovery format tsconfig.json to typeAcquisition ", () => {
            assertTypeAcquisition(
                {
                    typingOptions:
                    {
                        enableAutoDiscovery: true,
                        include: ["0.d.ts", "1.d.ts"],
                        exclude: ["0.js", "1.js"]
                    }
                },
                "tsconfig.json",
                {
                    typeAcquisition:
                    {
                        enable: true,
                        include: ["0.d.ts", "1.d.ts"],
                        exclude: ["0.js", "1.js"]
                    },
                    errors: <Diagnostic[]>[]
            });
        });

        it("Convert correctly format tsconfig.json to typeAcquisition ", () => {
            assertTypeAcquisition(
                {
                    typeAcquisition:
                    {
                        enable: true,
                        include: ["0.d.ts", "1.d.ts"],
                        exclude: ["0.js", "1.js"]
                    }
                },
                "tsconfig.json",
                {
                    typeAcquisition:
                    {
                        enable: true,
                        include: ["0.d.ts", "1.d.ts"],
                        exclude: ["0.js", "1.js"]
                    },
                    errors: <Diagnostic[]>[]
            });
        });

        it("Convert incorrect format tsconfig.json to typeAcquisition ", () => {
            assertTypeAcquisition(
                {
                    typeAcquisition:
                    {
                        enableAutoDiscovy: true,
                    }
                }, "tsconfig.json",
                {
                    typeAcquisition:
                    {
                        enable: false,
                        include: [],
                        exclude: []
                    },
                    errors: [
                        {
                            category: Diagnostics.Unknown_type_acquisition_option_0.category,
                            code: Diagnostics.Unknown_type_acquisition_option_0.code,
                            file: undefined,
                            start: 0,
                            length: 0,
                            messageText: undefined
                        }
                    ]
                });
        });

        it("Convert default tsconfig.json to typeAcquisition ", () => {
            assertTypeAcquisition({}, "tsconfig.json",
                {
                    typeAcquisition:
                    {
                        enable: false,
                        include: [],
                        exclude: []
                    },
                    errors: <Diagnostic[]>[]
                });
        });

        it("Convert tsconfig.json with only enable property to typeAcquisition ", () => {
            assertTypeAcquisition(
                {
                    typeAcquisition:
                    {
                        enable: true
                    }
                }, "tsconfig.json",
                {
                    typeAcquisition:
                    {
                        enable: true,
                        include: [],
                        exclude: []
                    },
                    errors: <Diagnostic[]>[]
                });
        });

        // jsconfig.json
        it("Convert jsconfig.json to typeAcquisition ", () => {
            assertTypeAcquisition(
                {
                    typeAcquisition:
                    {
                        enable: false,
                        include: ["0.d.ts"],
                        exclude: ["0.js"]
                    }
                }, "jsconfig.json",
                {
                    typeAcquisition:
                    {
                        enable: false,
                        include: ["0.d.ts"],
                        exclude: ["0.js"]
                    },
                    errors: <Diagnostic[]>[]
                });
        });

        it("Convert default jsconfig.json to typeAcquisition ", () => {
            assertTypeAcquisition({ }, "jsconfig.json",
                {
                    typeAcquisition:
                    {
                        enable: true,
                        include: [],
                        exclude: []
                    },
                    errors: <Diagnostic[]>[]
                });
        });

        it("Convert incorrect format jsconfig.json to typeAcquisition ", () => {
            assertTypeAcquisition(
                {
                    typeAcquisition:
                    {
                        enableAutoDiscovy: true,
                    }
                }, "jsconfig.json",
                {
                    typeAcquisition:
                    {
                        enable: true,
                        include: [],
                        exclude: []
                    },
                    errors: [
                        {
                            category: Diagnostics.Unknown_type_acquisition_option_0.category,
                            code: Diagnostics.Unknown_type_acquisition_option_0.code,
                            file: undefined,
                            start: 0,
                            length: 0,
                            messageText: undefined
                        }
                    ]
                });
        });

        it("Convert jsconfig.json with only enable property to typeAcquisition ", () => {
            assertTypeAcquisition(
                {
                    typeAcquisition:
                    {
                        enable: false
                    }
                }, "jsconfig.json",
                {
                    typeAcquisition:
                    {
                        enable: false,
                        include: [],
                        exclude: []
                    },
                    errors: <Diagnostic[]>[]
                });
        });
    });
}
