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
            it("unknownType", () => {
                parsesCorrectly("{?}",
                    `{
    "kind": "JSDocUnknownType",
    "pos": 1,
    "end": 2
}`);
            });

            it("allType", () => {
                parsesCorrectly("{*}",
                    `{
    "kind": "JSDocAllType",
    "pos": 1,
    "end": 2
}`);
            });

            it("nullableType", () => {
                parsesCorrectly("{?number}",
                    `{
    "kind": "JSDocNullableType",
    "pos": 1,
    "end": 8,
    "type": {
        "kind": "JSDocTypeReference",
        "pos": 2,
        "end": 8,
        "name": {
            "kind": "Identifier",
            "pos": 2,
            "end": 8,
            "text": "number"
        }
    }
}`)
            });

            it("unionType", () => {
                debugger;
                parsesCorrectly("{(number|string)}",
`{
    "kind": "JSDocUnionType",
    "pos": 1,
    "end": 16,
    "types": {
        "0": {
            "kind": "JSDocTypeReference",
            "pos": 2,
            "end": 8,
            "name": {
                "kind": "Identifier",
                "pos": 2,
                "end": 8,
                "text": "number"
            }
        },
        "1": {
            "kind": "JSDocTypeReference",
            "pos": 9,
            "end": 15,
            "name": {
                "kind": "Identifier",
                "pos": 9,
                "end": 15,
                "text": "string"
            }
        },
        "length": 2,
        "pos": 2,
        "end": 15
    }
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