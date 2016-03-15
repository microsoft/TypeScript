/// <reference path="..\..\..\src\harness\harness.ts" />
/// <reference path="..\..\..\src\compiler\commandLineParser.ts" />

namespace ts {
    describe('convertTypingOptionsFromJson', () => {
        function assertTypingOptions(json: any, expectedResult: { typingOptions: TypingOptions, errors: Diagnostic[] }) {
            const actualErrors: Diagnostic[] = [];
            const actualTypingOptions = convertOptionsFromJson<TypingOptions>(typingOptionDeclarations, json["typingOptions"], "/apath/", "tsconfig.json", actualErrors);
            
            const parsedTypingOptions = JSON.stringify(actualTypingOptions);
            const expectedTypingOptions = JSON.stringify(expectedResult.typingOptions);
            assert.equal(parsedTypingOptions, parsedTypingOptions);
            
            const expectedErrors = expectedResult.errors;
            assert.isTrue(expectedResult.errors.length === actualErrors.length, `Expected error: ${JSON.stringify(expectedResult.errors)}. Actual error: ${JSON.stringify(actualErrors)}.`);
            for (let i = 0; i < actualErrors.length; ++i) {
                const actualError = actualErrors[i];
                const expectedError = expectedErrors[i]; 
                assert.equal(actualError.code, expectedError.code, `Expected error-code: ${JSON.stringify(expectedError.code)}. Actual error-code: ${JSON.stringify(actualError.code)}.`);
                assert.equal(actualError.category, expectedError.category, `Expected error-category: ${JSON.stringify(expectedError.category)}. Actual error-category: ${JSON.stringify(actualError.category)}.`);
            }
        }
        
        const correctFormatOptions = {
            "typingOptions": {
                "enableAutoDiscovery": true,
                "include": ["0.d.ts", "1.d.ts"],
                "exclude": ["0.js", "1.js"]
            }
        }
        
        it("Convert correctly format JSON to compiler-options ", () => {
            debugger;   
            assertTypingOptions(correctFormatOptions, {
                typingOptions: <TypingOptions>{
                    enableAutoDiscovery: true,
                    include: ["/apath/0.d.ts", "/apath/1.d.ts"],
                    exclude: ["/apath/0.js", "/apath/1.js"]
                },
                errors: <Diagnostic[]>[]
            });
        });
    });
}
