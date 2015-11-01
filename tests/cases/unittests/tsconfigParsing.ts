/// <reference path="..\..\..\src\harness\harness.ts" />
/// <reference path="..\..\..\src\compiler\commandLineParser.ts" />

namespace ts {
    describe('parseConfigFileTextToJson', () => {
        function assertParseResult(jsonText: string, expectedConfigObject: { config?: any; error?: Diagnostic }) {
            let parsed = ts.parseConfigFileTextToJson("/apath/tsconfig.json", jsonText);
            assert.equal(JSON.stringify(parsed), JSON.stringify(expectedConfigObject));
        }

        function assertParseError(jsonText: string) {
             let parsed = ts.parseConfigFileTextToJson("/apath/tsconfig.json", jsonText);
             assert.isTrue(undefined === parsed.config);
             assert.isTrue(undefined !== parsed.error);
        }

        it("returns empty config for file with only whitespaces", () => {
            assertParseResult("", { config : {} });
            assertParseResult(" ", { config : {} });
        });

        it("returns empty config for file with comments only", () => {
            assertParseResult("// Comment", { config: {} });
            assertParseResult("/* Comment*/", { config: {} });
        });

        it("returns empty config when config is empty object", () => {
            assertParseResult("{}", { config: {} });
        });

        it("returns config object without comments", () => {
            assertParseResult(
                `{ // Excluded files
                    "exclude": [
                        // Exclude d.ts
                        "file.d.ts"
                    ]
                }`, { config: { exclude: ["file.d.ts"] } });

            assertParseResult(
                `{
                    /* Excluded
                         Files
                    */
                    "exclude": [
                        /* multiline comments can be in the middle of a line */"file.d.ts"
                    ]
                }`, { config: { exclude: ["file.d.ts"] } });
        });

        it("keeps string content untouched", () => {
            assertParseResult(
                `{
                    "exclude": [
                        "xx//file.d.ts"
                    ]
                }`, { config: { exclude: ["xx//file.d.ts"] } });
         assertParseResult(
                `{
                    "exclude": [
                        "xx/*file.d.ts*/"
                    ]
                }`, { config: { exclude: ["xx/*file.d.ts*/"] } });
        });

        it("handles escaped characters in strings correctly", () => {
            assertParseResult(
                `{
                    "exclude": [
                        "xx\\"//files"
                    ]
                }`, { config: { exclude: ["xx\"//files"] } });

            assertParseResult(
                `{
                    "exclude": [
                        "xx\\\\" // end of line comment
                    ]
                }`, { config: { exclude: ["xx\\"] } });
         });

        it("returns object with error when json is invalid", () => {
             assertParseError("invalid");
        });
    });
}
