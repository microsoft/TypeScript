/// <reference path="..\..\harnessLanguageService.ts" />

interface ClassificationEntry {
    value: any;
    classification: ts.TokenClass;
    position?: number;
}

describe("Colorization", function () {
    // Use the shim adapter to ensure test coverage of the shim layer for the classifier
    const languageServiceAdapter = new Harness.LanguageService.ShimLanguageServiceAdapter(/*preprocessToResolve*/ false);
    const classifier = languageServiceAdapter.getClassifier();

    function getEntryAtPosition(result: ts.ClassificationResult, position: number) {
        let entryPosition = 0;
        for (const entry of result.entries) {
            if (entryPosition === position) {
                return entry;
            }
            entryPosition += entry.length;
        }
        return undefined;
    }

    function punctuation(text: string, position?: number) { return createClassification(text, ts.TokenClass.Punctuation, position); }
    function keyword(text: string, position?: number) { return createClassification(text, ts.TokenClass.Keyword, position); }
    function operator(text: string, position?: number) { return createClassification(text, ts.TokenClass.Operator, position); }
    function comment(text: string, position?: number) { return createClassification(text, ts.TokenClass.Comment, position); }
    function whitespace(text: string, position?: number) { return createClassification(text, ts.TokenClass.Whitespace, position); }
    function identifier(text: string, position?: number) { return createClassification(text, ts.TokenClass.Identifier, position); }
    function numberLiteral(text: string, position?: number) { return createClassification(text, ts.TokenClass.NumberLiteral, position); }
    function stringLiteral(text: string, position?: number) { return createClassification(text, ts.TokenClass.StringLiteral, position); }
    function finalEndOfLineState(value: number): ClassificationEntry { return { value: value, classification: undefined, position: 0 }; }
    function createClassification(text: string, tokenClass: ts.TokenClass, position?: number): ClassificationEntry {
        return {
            value: text,
            classification: tokenClass,
            position: position,
        };
    }

    function testLexicalClassification(text: string, initialEndOfLineState: ts.EndOfLineState, ...expectedEntries: ClassificationEntry[]): void {
        const result = classifier.getClassificationsForLine(text, initialEndOfLineState, /*syntacticClassifierAbsent*/ false);

        for (const expectedEntry of expectedEntries) {
            if (expectedEntry.classification === undefined) {
                assert.equal(result.finalLexState, expectedEntry.value, "final endOfLineState does not match expected.");
            }
            else {
                const actualEntryPosition = expectedEntry.position !== undefined ? expectedEntry.position : text.indexOf(expectedEntry.value);
                assert(actualEntryPosition >= 0, "token: '" + expectedEntry.value + "' does not exit in text: '" + text + "'.");

                const actualEntry = getEntryAtPosition(result, actualEntryPosition);

                assert(actualEntry, "Could not find classification entry for '" + expectedEntry.value + "' at position: " + actualEntryPosition);
                assert.equal(actualEntry.classification, expectedEntry.classification, "Classification class does not match expected. Expected: " + ts.TokenClass[expectedEntry.classification] + ", Actual: " + ts.TokenClass[actualEntry.classification]);
                assert.equal(actualEntry.length, expectedEntry.value.length, "Classification length does not match expected. Expected: " + ts.TokenClass[expectedEntry.value.length] + ", Actual: " + ts.TokenClass[actualEntry.length]);
            }
        }
    }

    describe("test getClassifications", function () {
        it("Returns correct token classes", function () {
            testLexicalClassification("var x: string = \"foo\"; //Hello",
                ts.EndOfLineState.None,
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
                ts.EndOfLineState.None,
                numberLiteral("1"),
                whitespace(" "),
                operator("/"),
                numberLiteral("2"),
                comment("// comment"));
        });

        it("correctly classifies a literal after a divide operator", function () {
            testLexicalClassification("1 / 2, 3 / 4",
                ts.EndOfLineState.None,
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
                ts.EndOfLineState.None,
                stringLiteral("'line1\\"),
                finalEndOfLineState(ts.EndOfLineState.InSingleQuoteStringLiteral));
        });

        it("correctly classifies a multi-line string with three backslashes", function () {
            testLexicalClassification("'line1\\\\\\",
                ts.EndOfLineState.None,
                stringLiteral("'line1\\\\\\"),
                finalEndOfLineState(ts.EndOfLineState.InSingleQuoteStringLiteral));
        });

        it("correctly classifies an unterminated single-line string with no backslashes", function () {
            testLexicalClassification("'line1",
                ts.EndOfLineState.None,
                stringLiteral("'line1"),
                finalEndOfLineState(ts.EndOfLineState.None));
        });

        it("correctly classifies an unterminated single-line string with two backslashes", function () {
            testLexicalClassification("'line1\\\\",
                ts.EndOfLineState.None,
                stringLiteral("'line1\\\\"),
                finalEndOfLineState(ts.EndOfLineState.None));
        });

        it("correctly classifies an unterminated single-line string with four backslashes", function () {
            testLexicalClassification("'line1\\\\\\\\",
                ts.EndOfLineState.None,
                stringLiteral("'line1\\\\\\\\"),
                finalEndOfLineState(ts.EndOfLineState.None));
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
                finalEndOfLineState(ts.EndOfLineState.None));
        });

        it("correctly classifies the last line of an unterminated multi-line string ending in two backslashes", function () {
            testLexicalClassification("\\\\",
                ts.EndOfLineState.InDoubleQuoteStringLiteral,
                stringLiteral("\\\\"),
                finalEndOfLineState(ts.EndOfLineState.None));
        });

        it("correctly classifies the last line of an unterminated multi-line string ending in four backslashes", function () {
            testLexicalClassification("\\\\\\\\",
                ts.EndOfLineState.InDoubleQuoteStringLiteral,
                stringLiteral("\\\\\\\\"),
                finalEndOfLineState(ts.EndOfLineState.None));
        });

        it("correctly classifies the last line of a multi-line string", function () {
            testLexicalClassification("'",
                ts.EndOfLineState.InSingleQuoteStringLiteral,
                stringLiteral("'"),
                finalEndOfLineState(ts.EndOfLineState.None));
        });

        it("correctly classifies an unterminated multiline comment", function () {
            testLexicalClassification("/*",
                ts.EndOfLineState.None,
                comment("/*"),
                finalEndOfLineState(ts.EndOfLineState.InMultiLineCommentTrivia));
        });

        it("correctly classifies the termination of a multiline comment", function () {
            testLexicalClassification("   */     ",
                ts.EndOfLineState.InMultiLineCommentTrivia,
                comment("   */"),
                finalEndOfLineState(ts.EndOfLineState.None));
        });

        it("correctly classifies the continuation of a multiline comment", function () {
            testLexicalClassification("LOREM IPSUM DOLOR   ",
                ts.EndOfLineState.InMultiLineCommentTrivia,
                comment("LOREM IPSUM DOLOR   "),
                finalEndOfLineState(ts.EndOfLineState.InMultiLineCommentTrivia));
        });

        it("correctly classifies an unterminated multiline comment on a line ending in '/*/'", function () {
            testLexicalClassification("   /*/",
                ts.EndOfLineState.None,
                comment("/*/"),
                finalEndOfLineState(ts.EndOfLineState.InMultiLineCommentTrivia));
        });

        it("correctly classifies an unterminated multiline comment with trailing space", function () {
            testLexicalClassification("/* ",
                ts.EndOfLineState.None,
                comment("/* "),
                finalEndOfLineState(ts.EndOfLineState.InMultiLineCommentTrivia));
        });

        it("correctly classifies a keyword after a dot", function () {
            testLexicalClassification("a.var",
                ts.EndOfLineState.None,
                identifier("var"));
        });

        it("correctly classifies a string literal after a dot", function () {
            testLexicalClassification("a.\"var\"",
                ts.EndOfLineState.None,
                stringLiteral("\"var\""));
        });

        it("correctly classifies a keyword after a dot separated by comment trivia", function () {
            testLexicalClassification("a./*hello world*/ var",
                ts.EndOfLineState.None,
                identifier("a"),
                punctuation("."),
                comment("/*hello world*/"),
                identifier("var"));
        });

        it("classifies a property access with whitespace around the dot", function () {
            testLexicalClassification("   x  .\tfoo ()",
                ts.EndOfLineState.None,
                identifier("x"),
                identifier("foo"));
        });

        it("classifies a keyword after a dot on previous line", function () {
            testLexicalClassification("var",
                ts.EndOfLineState.None,
                keyword("var"),
                finalEndOfLineState(ts.EndOfLineState.None));
        });

        it("classifies multiple keywords properly", function () {
            testLexicalClassification("public static",
                ts.EndOfLineState.None,
                keyword("public"),
                keyword("static"),
                finalEndOfLineState(ts.EndOfLineState.None));

            testLexicalClassification("public var",
                ts.EndOfLineState.None,
                keyword("public"),
                identifier("var"),
                finalEndOfLineState(ts.EndOfLineState.None));
        });

        it("classifies a single line no substitution template string correctly", () => {
            testLexicalClassification("`number number public string`",
                ts.EndOfLineState.None,
                stringLiteral("`number number public string`"),
                finalEndOfLineState(ts.EndOfLineState.None));
        });
        it("classifies substitution parts of a template string correctly", () => {
            testLexicalClassification("`number '${ 1 + 1 }' string '${ 'hello' }'`",
                ts.EndOfLineState.None,
                stringLiteral("`number '${"),
                numberLiteral("1"),
                operator("+"),
                numberLiteral("1"),
                stringLiteral("}' string '${"),
                stringLiteral("'hello'"),
                stringLiteral("}'`"),
                finalEndOfLineState(ts.EndOfLineState.None));
        });
        it("classifies an unterminated no substitution template string correctly", () => {
            testLexicalClassification("`hello world",
                ts.EndOfLineState.None,
                stringLiteral("`hello world"),
                finalEndOfLineState(ts.EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate));
        });
        it("classifies the entire line of an unterminated multiline no-substitution/head template", () => {
            testLexicalClassification("...",
                ts.EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate,
                stringLiteral("..."),
                finalEndOfLineState(ts.EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate));
        });
        it("classifies the entire line of an unterminated multiline template middle/end", () => {
            testLexicalClassification("...",
                ts.EndOfLineState.InTemplateMiddleOrTail,
                stringLiteral("..."),
                finalEndOfLineState(ts.EndOfLineState.InTemplateMiddleOrTail));
        });
        it("classifies a termination of a multiline template head", () => {
            testLexicalClassification("...${",
                ts.EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate,
                stringLiteral("...${"),
                finalEndOfLineState(ts.EndOfLineState.InTemplateSubstitutionPosition));
        });
        it("classifies the termination of a multiline no substitution template", () => {
            testLexicalClassification("...`",
                ts.EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate,
                stringLiteral("...`"),
                finalEndOfLineState(ts.EndOfLineState.None));
        });
        it("classifies the substitution parts and middle/tail of a multiline template string", () => {
            testLexicalClassification("${ 1 + 1 }...`",
                ts.EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate,
                stringLiteral("${"),
                numberLiteral("1"),
                operator("+"),
                numberLiteral("1"),
                stringLiteral("}...`"),
                finalEndOfLineState(ts.EndOfLineState.None));
        });
        it("classifies a template middle and propagates the end of line state", () => {
            testLexicalClassification("${ 1 + 1 }...`",
                ts.EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate,
                stringLiteral("${"),
                numberLiteral("1"),
                operator("+"),
                numberLiteral("1"),
                stringLiteral("}...`"),
                finalEndOfLineState(ts.EndOfLineState.None));
        });
        it("classifies substitution expressions with curly braces appropriately", () => {
            let pos = 0;
            let lastLength = 0;

            testLexicalClassification("...${ () => { } } ${ { x: `1` } }...`",
                ts.EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate,
                stringLiteral(track("...${"), pos),
                punctuation(track(" ", "("), pos),
                punctuation(track(")"), pos),
                punctuation(track(" ", "=>"), pos),
                punctuation(track(" ", "{"), pos),
                punctuation(track(" ", "}"), pos),
                stringLiteral(track(" ", "} ${"), pos),
                punctuation(track(" ", "{"), pos),
                identifier(track(" ", "x"), pos),
                punctuation(track(":"), pos),
                stringLiteral(track(" ", "`1`"), pos),
                punctuation(track(" ", "}"), pos),
                stringLiteral(track(" ", "}...`"), pos),
                finalEndOfLineState(ts.EndOfLineState.None));

            // Adjusts 'pos' by accounting for the length of each portion of the string,
            // but only return the last given string
            function track(...vals: string[]): string {
                for (const val of vals) {
                    pos += lastLength;
                    lastLength = val.length;
                }
                return ts.lastOrUndefined(vals);
            }
        });

        it("classifies partially written generics correctly.", function () {
            testLexicalClassification("Foo<number",
                ts.EndOfLineState.None,
                identifier("Foo"),
                operator("<"),
                identifier("number"),
                finalEndOfLineState(ts.EndOfLineState.None));

            // Looks like a cast, should get classified as a keyword.
            testLexicalClassification("<number",
                ts.EndOfLineState.None,
                operator("<"),
                keyword("number"),
                finalEndOfLineState(ts.EndOfLineState.None));

            // handle nesting properly.
            testLexicalClassification("Foo<Foo,Foo<number",
                ts.EndOfLineState.None,
                identifier("Foo"),
                operator("<"),
                identifier("Foo"),
                operator(","),
                identifier("Foo"),
                operator("<"),
                identifier("number"),
                finalEndOfLineState(ts.EndOfLineState.None));
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
                ts.EndOfLineState.None,
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
                finalEndOfLineState(ts.EndOfLineState.None));

            testLexicalClassification(
"<<<<<<< HEAD\r\n\
class C { }\r\n\
=======\r\n\
class D { }\r\n\
>>>>>>> Branch - a\r\n",
                ts.EndOfLineState.None,
                comment("<<<<<<< HEAD"),
                keyword("class"),
                identifier("C"),
                punctuation("{"),
                punctuation("}"),
                comment("=======\r\nclass D { }\r\n"),
                comment(">>>>>>> Branch - a"),
                finalEndOfLineState(ts.EndOfLineState.None));

            testLexicalClassification(
"class C {\r\n\
<<<<<<< HEAD\r\n\
    v = 1;\r\n\
||||||| merged common ancestors\r\n\
    v = 3;\r\n\
=======\r\n\
    v = 2;\r\n\
>>>>>>> Branch - a\r\n\
}",
                ts.EndOfLineState.None,
                keyword("class"),
                identifier("C"),
                punctuation("{"),
                comment("<<<<<<< HEAD"),
                identifier("v"),
                operator("="),
                numberLiteral("1"),
                punctuation(";"),
                comment("||||||| merged common ancestors\r\n    v = 3;\r\n"),
                comment("=======\r\n    v = 2;\r\n"),
                comment(">>>>>>> Branch - a"),
                punctuation("}"),
                finalEndOfLineState(ts.EndOfLineState.None));

            testLexicalClassification(
"<<<<<<< HEAD\r\n\
class C { }\r\n\
||||||| merged common ancestors\r\n\
class E { }\r\n\
=======\r\n\
class D { }\r\n\
>>>>>>> Branch - a\r\n",
                ts.EndOfLineState.None,
                comment("<<<<<<< HEAD"),
                keyword("class"),
                identifier("C"),
                punctuation("{"),
                punctuation("}"),
                comment("||||||| merged common ancestors\r\nclass E { }\r\n"),
                comment("=======\r\nclass D { }\r\n"),
                comment(">>>>>>> Branch - a"),
                finalEndOfLineState(ts.EndOfLineState.None));
        });

        it("'of' keyword", function () {
            testLexicalClassification("for (var of of of) { }",
                ts.EndOfLineState.None,
                keyword("for"),
                punctuation("("),
                keyword("var"),
                keyword("of"),
                keyword("of"),
                keyword("of"),
                punctuation(")"),
                punctuation("{"),
                punctuation("}"),
                finalEndOfLineState(ts.EndOfLineState.None));
        });
    });
});
