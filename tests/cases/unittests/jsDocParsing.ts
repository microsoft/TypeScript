/// <reference path="..\..\..\src\harness\external\mocha.d.ts" />
/// <reference path="..\..\..\src\compiler\parser.ts" />
/// <reference path="..\..\..\src\harness\harness.ts" />

module ts {
    function parsesCorrectly(content: string, expected: string) {
        let type = ts.parseJSDocTypeExpression(content, 0);
        let result = Utils.sourceFileToJSON(type);
        assert.equal(result, expected);
    }

    function parsesIncorrectly(content: string) {
        let type = ts.parseJSDocTypeExpression(content, 0);
        assert.equal(type, undefined);
    }

    describe("JSDocParsing", () => {
        describe("parseCorrectly", () => {
            it("parsesQuestionCorrectly", () => {
                parsesCorrectly("{?}",
                    `{
    "kind": "JSDocUnknownType",
    "containsParseError": false,
    "pos": 1,
    "end": 2
}`);
            });

            it("parsesAsteriskCorrectly", () => {
                parsesCorrectly("{*}",
                    `{
    "kind": "JSDocAllType",
    "containsParseError": false,
    "pos": 1,
    "end": 2
}`);
            });
        });

        describe("parsesIncorrectly", () => {
            it("emptyType", () => {
                parsesIncorrectly("{}");
            });
        });
    });
}