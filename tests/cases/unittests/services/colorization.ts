/// <reference path="..\..\..\..\src\harness\external\mocha.d.ts" />
/// <reference path="..\..\..\..\src\harness\harnessLanguageService.ts" />

interface ClassificationEntry {
    value: any;
    classification: ts.TokenClass;
}

describe('Colorization', function () {
    // Use the shim adaptor to ensure test coverage of the shim layer for the classifier
    var languageServiceAdabtor = new Harness.LanguageService.ShimLanugageServiceAdaptor();
    var classifier = languageServiceAdabtor.getClassifier();

    function getEntryAtPosistion(result: ts.ClassificationResult, position: number) {
        var entryPosition = 0;
        for (var i = 0, n = result.entries.length; i < n; i++) {
            var entry = result.entries[i];
            if (entryPosition === position) {
                return entry;
            }
            entryPosition += entry.length;
        }
        return undefined;
    }

    function punctuation(text: string): ClassificationEntry { return { value: text, classification: ts.TokenClass.Punctuation }; }
    function keyword(text: string): ClassificationEntry { return { value: text, classification: ts.TokenClass.Keyword }; }
    function operator(text: string): ClassificationEntry { return { value: text, classification: ts.TokenClass.Operator }; }
    function comment(text: string): ClassificationEntry { return { value: text, classification: ts.TokenClass.Comment }; }
    function whitespace(text: string): ClassificationEntry { return { value: text, classification: ts.TokenClass.Whitespace }; }
    function identifier(text: string): ClassificationEntry { return { value: text, classification: ts.TokenClass.Identifier }; }
    function numberLiteral(text: string): ClassificationEntry { return { value: text, classification: ts.TokenClass.NumberLiteral }; }
    function stringLiteral(text: string): ClassificationEntry { return { value: text, classification: ts.TokenClass.StringLiteral }; }
    function regExpLiteral(text: string): ClassificationEntry { return { value: text, classification: ts.TokenClass.RegExpLiteral }; }
    function finalEndOfLineState(value: number): ClassificationEntry { return { value: value, classification: <ts.TokenClass>undefined }; }

    function testLexicalClassification(text: string, initialEndOfLineState: ts.EndOfLineState, ...expectedEntries: ClassificationEntry[]): void {
        var result = classifier.getClassificationsForLine(text, initialEndOfLineState);

        for (var i = 0, n = expectedEntries.length; i < n; i++) {
            var expectedEntry = expectedEntries[i];

            if (expectedEntry.classification === undefined) {
                assert.equal(result.finalLexState, expectedEntry.value, "final endOfLineState does not match expected.");
            }
            else {
                var actualEntryPosition = text.indexOf(expectedEntry.value);
                assert(actualEntryPosition >= 0, "token: '" + expectedEntry.value + "' does not exit in text: '" + text + "'.");

                var actualEntry = getEntryAtPosistion(result, actualEntryPosition);

                assert(actualEntry, "Could not find classification entry for '" + expectedEntry.value + "' at position: " + actualEntryPosition);
                assert.equal(actualEntry.classification, expectedEntry.classification, "Classification class does not match expected. Expected: " + ts.TokenClass[expectedEntry.classification] + ", Actual: " + ts.TokenClass[actualEntry.classification]);
                assert.equal(actualEntry.length, expectedEntry.value.length, "Classification length does not match expected. Expected: " + ts.TokenClass[expectedEntry.value.length] + ", Actual: " + ts.TokenClass[actualEntry.length]);
            }
        }
    }

    describe("test getClassifications", function () {
        it("Returns correct token classes", function () {
            testLexicalClassification("var x: string = \"foo\"; //Hello",
                ts.EndOfLineState.Start,
                keyword("var"),
                whitespace(" "),
                identifier("x"),
                punctuation(":"),
                keyword("string"),
                operator("="),
                stringLiteral("\"foo\""),
                comment("//Hello"),
                punctuation(";"));
        });

        it("correctly classifies a comment after a divide operator", function () {
            testLexicalClassification("1 / 2 // comment",
                ts.EndOfLineState.Start,
                numberLiteral("1"),
                whitespace(" "),
                operator("/"),
                numberLiteral("2"),
                comment("// comment"));
        });

        it("correctly classifies a literal after a divide operator", function () {
            testLexicalClassification("1 / 2, 3 / 4",
                ts.EndOfLineState.Start,
                numberLiteral("1"),
                whitespace(" "),
                operator("/"),
                numberLiteral("2"),
                numberLiteral("3"),
                numberLiteral("4"),
                operator(","));
        });

        it("correctly classifies a multi-line string with one backslash", function () {
            testLexicalClassification("'line1\\",
                ts.EndOfLineState.Start,
                stringLiteral("'line1\\"),
                finalEndOfLineState(ts.EndOfLineState.InSingleQuoteStringLiteral));
        });

        it("correctly classifies a multi-line string with three backslashes", function () {
            testLexicalClassification("'line1\\\\\\",
                ts.EndOfLineState.Start,
                stringLiteral("'line1\\\\\\"),
                finalEndOfLineState(ts.EndOfLineState.InSingleQuoteStringLiteral));
        });

        it("correctly classifies an unterminated single-line string with no backslashes", function () {
            testLexicalClassification("'line1",
                ts.EndOfLineState.Start,
                stringLiteral("'line1"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });

        it("correctly classifies an unterminated single-line string with two backslashes", function () {
            testLexicalClassification("'line1\\\\",
                ts.EndOfLineState.Start,
                stringLiteral("'line1\\\\"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });

        it("correctly classifies an unterminated single-line string with four backslashes", function () {
            testLexicalClassification("'line1\\\\\\\\",
                ts.EndOfLineState.Start,
                stringLiteral("'line1\\\\\\\\"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });

        it("correctly classifies the continuing line of a multi-line string ending in one backslash", function () {
            testLexicalClassification("\\",
                ts.EndOfLineState.InDoubleQuoteStringLiteral,
                stringLiteral("\\"),
                finalEndOfLineState(ts.EndOfLineState.InDoubleQuoteStringLiteral));
        });

        it("correctly classifies the continuing line of a multi-line string ending in three backslashes", function () {
            testLexicalClassification("\\",
                ts.EndOfLineState.InDoubleQuoteStringLiteral,
                stringLiteral("\\"),
                finalEndOfLineState(ts.EndOfLineState.InDoubleQuoteStringLiteral));
        });

        it("correctly classifies the last line of an unterminated multi-line string ending in no backslashes", function () {
            testLexicalClassification("  ",
                ts.EndOfLineState.InDoubleQuoteStringLiteral,
                stringLiteral("  "),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });

        it("correctly classifies the last line of an unterminated multi-line string ending in two backslashes", function () {
            testLexicalClassification("\\\\",
                ts.EndOfLineState.InDoubleQuoteStringLiteral,
                stringLiteral("\\\\"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });

        it("correctly classifies the last line of an unterminated multi-line string ending in four backslashes", function () {
            testLexicalClassification("\\\\\\\\",
                ts.EndOfLineState.InDoubleQuoteStringLiteral,
                stringLiteral("\\\\\\\\"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });

        it("correctly classifies the last line of a multi-line string", function () {
            testLexicalClassification("'",
                ts.EndOfLineState.InSingleQuoteStringLiteral,
                stringLiteral("'"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });

        it("correctly classifies an unterminated multiline comment", function () {
            testLexicalClassification("/*",
                ts.EndOfLineState.Start,
                comment("/*"),
                finalEndOfLineState(ts.EndOfLineState.InMultiLineCommentTrivia));
        });

        it("correctly classifies the termination of a multiline comment", function () {
            testLexicalClassification("   */     ",
                ts.EndOfLineState.InMultiLineCommentTrivia,
                comment("   */"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });

        it("correctly classifies the continuation of a multiline comment", function () {
            testLexicalClassification("LOREM IPSUM DOLOR   ",
                ts.EndOfLineState.InMultiLineCommentTrivia,
                comment("LOREM IPSUM DOLOR   "),
                finalEndOfLineState(ts.EndOfLineState.InMultiLineCommentTrivia));
        });

        it("correctly classifies an unterminated multiline comment on a line ending in '/*/'", function () {
            testLexicalClassification("   /*/",
                ts.EndOfLineState.Start,
                comment("/*/"),
                finalEndOfLineState(ts.EndOfLineState.InMultiLineCommentTrivia));
        });

        it("correctly classifies an unterminated multiline comment with trailing space", function () {
            testLexicalClassification("/* ",
                ts.EndOfLineState.Start,
                comment("/* "),
                finalEndOfLineState(ts.EndOfLineState.InMultiLineCommentTrivia));
        });

        it("correctly classifies a keyword after a dot", function () {
            testLexicalClassification("a.var",
                ts.EndOfLineState.Start,
                identifier("var"));
        });

        it("correctly classifies a string literal after a dot", function () {
            testLexicalClassification("a.\"var\"",
                ts.EndOfLineState.Start,
                stringLiteral("\"var\""));
        });

        it("correctly classifies a keyword after a dot separated by comment trivia", function () {
            testLexicalClassification("a./*hello world*/ var",
                ts.EndOfLineState.Start,
                identifier("a"),
                punctuation("."),
                comment("/*hello world*/"),
                identifier("var"));
        });

        it("classifies a property access with whitespace around the dot", function () {
            testLexicalClassification("   x  .\tfoo ()",
                ts.EndOfLineState.Start,
                identifier("x"),
                identifier("foo"));
        });

        it("classifies a keyword after a dot on previous line", function () {
            testLexicalClassification("var",
                ts.EndOfLineState.Start,
                keyword("var"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });

        it("classifies multiple keywords properly", function () {
            testLexicalClassification("public static",
                ts.EndOfLineState.Start,
                keyword("public"),
                keyword("static"),
                finalEndOfLineState(ts.EndOfLineState.Start));

            testLexicalClassification("public var",
                ts.EndOfLineState.Start,
                keyword("public"),
                identifier("var"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });

        it("classifies partially written generics correctly.", function () {
            testLexicalClassification("Foo<number",
                ts.EndOfLineState.Start,
                identifier("Foo"),
                operator("<"),
                identifier("number"),
                finalEndOfLineState(ts.EndOfLineState.Start));

            // Looks like a cast, should get classified as a keyword.
            testLexicalClassification("<number",
                ts.EndOfLineState.Start,
                operator("<"),
                keyword("number"),
                finalEndOfLineState(ts.EndOfLineState.Start));

            // handle nesting properly.
            testLexicalClassification("Foo<Foo,Foo<number",
                ts.EndOfLineState.Start,
                identifier("Foo"),
                operator("<"),
                identifier("Foo"),
                operator(","),
                identifier("Foo"),
                operator("<"),
                identifier("number"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });

        it("LexicallyClassifiesConflictTokens", () => {
            // Test conflict markers.
            testLexicalClassification(
"class C {\r\n\
<<<<<<< HEAD\r\n\
    v = 1;\r\n\
=======\r\n\
    v = 2;\r\n\
>>>>>>> Branch - a\r\n\
}",
                ts.EndOfLineState.Start,
                keyword("class"),
                identifier("C"),
                punctuation("{"),
                comment("<<<<<<< HEAD"),
                identifier("v"),
                operator("="),
                numberLiteral("1"),
                punctuation(";"),
                comment("=======\r\n    v = 2;\r\n"),
                comment(">>>>>>> Branch - a"),
                punctuation("}"),
                finalEndOfLineState(ts.EndOfLineState.Start));

            testLexicalClassification(
"<<<<<<< HEAD\r\n\
class C { }\r\n\
=======\r\n\
class D { }\r\n\
>>>>>>> Branch - a\r\n",
                ts.EndOfLineState.Start,
                comment("<<<<<<< HEAD"),
                keyword("class"),
                identifier("C"),
                punctuation("{"),
                punctuation("}"),
                comment("=======\r\nclass D { }\r\n"),
                comment(">>>>>>> Branch - a"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });
    });
});