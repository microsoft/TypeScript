/// <reference path="..\..\..\src\harness\harness.ts" />
/// <reference path="..\..\..\src\compiler\commandLineParser.ts" />

module ts {
    describe("JSON with comments and trailing commas", () => {
        it("should parse JSON with single line comments @jsonWithCommentsAndTrailingCommas", () => {
            let json =
`{
    "a": {
        // comment
        "b": true
    }
}`;
            expect(parseConfigFileText("file.ts", json).config).to.be.deep.equal({
                a: { b: true }
            });
        });


        it("should parse JSON with multiline line comments @jsonWithCommentsAndTrailingCommas", () => {
            let json =
`{
    "a": {
        /*
         * comment
         */
        "b": true
    }
}`;
            expect(parseConfigFileText("file.ts", json).config).to.be.deep.equal({
                a: { b: true }
            });
        });

        it("should parse JSON with trailing commas in an object @jsonWithCommentsAndTrailingCommas", () => {
            let json =
`{
    "a": {
        "b": true,
    }
}`;
            expect(parseConfigFileText("file.ts", json).config).to.be.deep.equal({
                a: { b: true }
            });
        });

        it("should parse JSON with trailing commas in an array @jsonWithCommentsAndTrailingCommas", () => {
            let json =
`{
    "a": [
        "b",
    ]
}`;
            expect(parseConfigFileText("file.ts", json).config).to.be.deep.equal({
                a: [ "b" ]
            });
        });

        it("should parse JSON with escape characters @jsonWithCommentsAndTrailingCommas", () => {
            let json =
`{
    "a": [
        "b\\\"\\\\",
    ]
}`;
            expect(parseConfigFileText("file.ts", json).config).to.be.deep.equal({
                a: [ "b\"\\" ]
            });
        });
    });
}

