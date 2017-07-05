/// <reference path="..\..\..\src\harness\harness.ts" />
/// <reference path="..\..\..\src\compiler\commandLineParser.ts" />

namespace ts {
    describe("convertTypingOptionsFromJson", () => {
        function assertTypingOptions(json: any, configFileName: string, expectedResult: { typingOptions: TypingOptions, errors: Diagnostic[] }) {
            const { options: actualTypingOptions, errors: actualErrors } = convertTypingOptionsFromJson(json["typingOptions"], "/apath/", configFileName);
            const parsedTypingOptions = JSON.stringify(actualTypingOptions);
            const expectedTypingOptions = JSON.stringify(expectedResult.typingOptions);
            assert.equal(parsedTypingOptions, expectedTypingOptions);

            const expectedErrors = expectedResult.errors;
            assert.isTrue(expectedResult.errors.length === actualErrors.length, `Expected error: ${JSON.stringify(expectedResult.errors)}. Actual error: ${JSON.stringify(actualErrors)}.`);
            for (let i = 0; i < actualErrors.length; i++) {
                const actualError = actualErrors[i];
                const expectedError = expectedErrors[i];
                assert.equal(actualError.code, expectedError.code, `Expected error-code: ${JSON.stringify(expectedError.code)}. Actual error-code: ${JSON.stringify(actualError.code)}.`);
                assert.equal(actualError.category, expectedError.category, `Expected error-category: ${JSON.stringify(expectedError.category)}. Actual error-category: ${JSON.stringify(actualError.category)}.`);
            }
        }

        // tsconfig.json
        it("Convert correctly format tsconfig.json to typing-options ", () => {
            assertTypingOptions(
                {
                    "typingOptions":
                    {
                        "enableAutoDiscovery": true,
                        "include": ["0.d.ts", "1.d.ts"],
                        "exclude": ["0.js", "1.js"]
                    }
                },
                "tsconfig.json",
                {
                    typingOptions:
                    {
                        enableAutoDiscovery: true,
                        include: ["0.d.ts", "1.d.ts"],
                        exclude: ["0.js", "1.js"]
                    },
                    errors: <Diagnostic[]>[]
            });
        });

        it("Convert incorrect format tsconfig.json to typing-options ", () => {
            assertTypingOptions(
                {
                    "typingOptions":
                    {
                        "enableAutoDiscovy": true,
                    }
                }, "tsconfig.json",
                {
                    typingOptions:
                    {
                        enableAutoDiscovery: false,
                        include: [],
                        exclude: []
                    },
                    errors: [
                        {
                            category: Diagnostics.Unknown_typing_option_0.category,
                            code: Diagnostics.Unknown_typing_option_0.code,
                            file: undefined,
                            start: 0,
                            length: 0,
                            messageText: undefined
                        }
                    ]
                });
        });

        it("Convert default tsconfig.json to typing-options ", () => {
            assertTypingOptions({}, "tsconfig.json",
                {
                    typingOptions:
                    {
                        enableAutoDiscovery: false,
                        include: [],
                        exclude: []
                    },
                    errors: <Diagnostic[]>[]
                });
        });

        it("Convert tsconfig.json with only enableAutoDiscovery property to typing-options ", () => {
            assertTypingOptions(
                {
                    "typingOptions":
                    {
                        "enableAutoDiscovery": true
                    }
                }, "tsconfig.json",
                {
                    typingOptions:
                    {
                        enableAutoDiscovery: true,
                        include: [],
                        exclude: []
                    },
                    errors: <Diagnostic[]>[]
                });
        });

        // jsconfig.json
        it("Convert jsconfig.json to typing-options ", () => {
            assertTypingOptions(
                {
                    "typingOptions":
                    {
                        "enableAutoDiscovery": false,
                        "include": ["0.d.ts"],
                        "exclude": ["0.js"]
                    }
                }, "jsconfig.json",
                {
                    typingOptions:
                    {
                        enableAutoDiscovery: false,
                        include: ["0.d.ts"],
                        exclude: ["0.js"]
                    },
                    errors: <Diagnostic[]>[]
                });
        });

        it("Convert default jsconfig.json to typing-options ", () => {
            assertTypingOptions({ }, "jsconfig.json",
                {
                    typingOptions:
                    {
                        enableAutoDiscovery: true,
                        include: [],
                        exclude: []
                    },
                    errors: <Diagnostic[]>[]
                });
        });

        it("Convert incorrect format jsconfig.json to typing-options ", () => {
            assertTypingOptions(
                {
                    "typingOptions":
                    {
                        "enableAutoDiscovy": true,
                    }
                }, "jsconfig.json",
                {
                    typingOptions:
                    {
                        enableAutoDiscovery: true,
                        include: [],
                        exclude: []
                    },
                    errors: [
                        {
                            category: Diagnostics.Unknown_compiler_option_0.category,
                            code: Diagnostics.Unknown_typing_option_0.code,
                            file: undefined,
                            start: 0,
                            length: 0,
                            messageText: undefined
                        }
                    ]
                });
        });

        it("Convert jsconfig.json with only enableAutoDiscovery property to typing-options ", () => {
            assertTypingOptions(
                {
                    "typingOptions":
                    {
                        "enableAutoDiscovery": false
                    }
                }, "jsconfig.json",
                {
                    typingOptions:
                    {
                        enableAutoDiscovery: false,
                        include: [],
                        exclude: []
                    },
                    errors: <Diagnostic[]>[]
                });
        });
    });
}
