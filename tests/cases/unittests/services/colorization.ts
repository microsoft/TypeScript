/// <reference path="..\..\..\..\src\harness\external\mocha.d.ts" />
/// <reference path="..\..\..\..\src\harness\harnessLanguageService.ts" />

interface Classification {
    length: number;
    class: ts.TokenClass;
    position: number;
}

interface ClassiferResult {
    tuples: Classification[];
    finalEndOfLineState: ts.EndOfLineState;
}

interface ClassificationEntry {
    value: any;
    class: ts.TokenClass;
    position?: number;
}

describe('Colorization', function () {
    var mytypescriptLS = new Harness.LanguageService.TypeScriptLS();
    var myclassifier = mytypescriptLS.getClassifier();

    function getClassifications(code: string, initialEndOfLineState: ts.EndOfLineState = ts.EndOfLineState.Start): ClassiferResult {
        var classResult = myclassifier.getClassificationsForLine(code, initialEndOfLineState).split('\n');
        var tuples: Classification[] = [];
        var i = 0;
        var position = 0;

        for (; i < classResult.length - 1; i += 2) {
            var t = tuples[i / 2] = {
                position: position,
                length: parseInt(classResult[i]),
                class: parseInt(classResult[i + 1])
            };

            assert.isTrue(t.length > 0, "Result length should be greater than 0, got :" + t.length);
            position += t.length;
        }
        var finalEndOfLineState = classResult[classResult.length - 1];

        assert.equal(position, code.length, "Expected cumulative length of all entries to match the length of the source. expected: " + code.length + ", but got: " + position);

        return {
            tuples: tuples,
            finalEndOfLineState: parseInt(finalEndOfLineState)
        };
    }

    function verifyClassification(classification: Classification, expectedLength: number, expectedClass: number) {
        assert.isNotNull(classification);
        assert.equal(classification.length, expectedLength, "Classification length does not match expected. Expected: " + expectedLength + ", Actual: " + classification.length);
        assert.equal(classification.class, expectedClass, "Classification class does not match expected. Expected: " + ts.TokenClass[expectedClass] + ", Actual: " + ts.TokenClass[classification.class]);
    }

    function getEntryAtPosistion(result: ClassiferResult, position: number) {
        for (var i = 0, n = result.tuples.length; i < n; i++) {
            if (result.tuples[i].position === position) return result.tuples[i];
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
    function regExpLiteral(text: string, position?: number) { return createClassification(text, ts.TokenClass.RegExpLiteral, position); }
    function finalEndOfLineState(value: number): ClassificationEntry { return { value: value, class: undefined, position: 0 }; }
    function createClassification(text: string, tokenClass: ts.TokenClass, position?: number): ClassificationEntry {
        return {
            value: text,
            class: tokenClass,
            position: position,
        };
    }

    function test(text: string, initialEndOfLineState: ts.EndOfLineState, ...expectedEntries: ClassificationEntry[]): void {
        var result = getClassifications(text, initialEndOfLineState);

        for (var i = 0, n = expectedEntries.length; i < n; i++) {
            var expectedEntry = expectedEntries[i];

            if (expectedEntry.class === undefined) {
                assert.equal(result.finalEndOfLineState, expectedEntry.value, "final endOfLineState does not match expected.");
            }
            else {
                var actualEntryPosition = expectedEntry.position !== undefined ? expectedEntry.position : text.indexOf(expectedEntry.value);
                assert(actualEntryPosition >= 0, "token: '" + expectedEntry.value + "' does not exit in text: '" + text + "'.");

                var actualEntry = getEntryAtPosistion(result, actualEntryPosition);

                assert(actualEntry, "Could not find classification entry for '" + expectedEntry.value + "' at position: " + actualEntryPosition + "\n\n" + JSON.stringify(result));
                assert.equal(actualEntry.class, expectedEntry.class,
                    "Classification class does not match expected. Expected: " + ts.TokenClass[expectedEntry.class] + " - '" + expectedEntry.value + "', Actual: " + ts.TokenClass[actualEntry.class] + " - '" + getActualText(text, actualEntry) + "\n\n" + JSON.stringify(result));
                assert.equal(actualEntry.length, expectedEntry.value.length, "Classification length does not match expected. Expected: " + expectedEntry.value.length + " - '" + expectedEntry.value + "', Actual: " + actualEntry.length + " - '" + getActualText(text, actualEntry) + "'\n\n" + JSON.stringify(result));
            }
        }
    }

    function getActualText(sourceText: string, classification: Classification): string {
        return sourceText.substr(classification.position, classification.length);
    }

    describe("test getClassifications", function () {
        it("Returns correct token classes", function () {
            test("var x: string = \"foo\"; //Hello",
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
            test("1 / 2 // comment",
                ts.EndOfLineState.Start,
                numberLiteral("1"),
                whitespace(" "),
                operator("/"),
                numberLiteral("2"),
                comment("// comment"));
        });

        it("correctly classifies a literal after a divide operator", function () {
            test("1 / 2, 3 / 4",
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
            test("'line1\\",
                ts.EndOfLineState.Start,
                stringLiteral("'line1\\"),
                finalEndOfLineState(ts.EndOfLineState.InSingleQuoteStringLiteral));
        });

        it("correctly classifies a multi-line string with three backslashes", function () {
            test("'line1\\\\\\",
                ts.EndOfLineState.Start,
                stringLiteral("'line1\\\\\\"),
                finalEndOfLineState(ts.EndOfLineState.InSingleQuoteStringLiteral));
        });

        it("correctly classifies an unterminated single-line string with no backslashes", function () {
            test("'line1",
                ts.EndOfLineState.Start,
                stringLiteral("'line1"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });

        it("correctly classifies an unterminated single-line string with two backslashes", function () {
            test("'line1\\\\",
                ts.EndOfLineState.Start,
                stringLiteral("'line1\\\\"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });

        it("correctly classifies an unterminated single-line string with four backslashes", function () {
            test("'line1\\\\\\\\",
                ts.EndOfLineState.Start,
                stringLiteral("'line1\\\\\\\\"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });

        it("correctly classifies the continuing line of a multi-line string ending in one backslash", function () {
            test("\\",
                ts.EndOfLineState.InDoubleQuoteStringLiteral,
                stringLiteral("\\"),
                finalEndOfLineState(ts.EndOfLineState.InDoubleQuoteStringLiteral));
        });

        it("correctly classifies the continuing line of a multi-line string ending in three backslashes", function () {
            test("\\",
                ts.EndOfLineState.InDoubleQuoteStringLiteral,
                stringLiteral("\\"),
                finalEndOfLineState(ts.EndOfLineState.InDoubleQuoteStringLiteral));
        });

        it("correctly classifies the last line of an unterminated multi-line string ending in no backslashes", function () {
            test("  ",
                ts.EndOfLineState.InDoubleQuoteStringLiteral,
                stringLiteral("  "),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });

        it("correctly classifies the last line of an unterminated multi-line string ending in two backslashes", function () {
            test("\\\\",
                ts.EndOfLineState.InDoubleQuoteStringLiteral,
                stringLiteral("\\\\"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });

        it("correctly classifies the last line of an unterminated multi-line string ending in four backslashes", function () {
            test("\\\\\\\\",
                ts.EndOfLineState.InDoubleQuoteStringLiteral,
                stringLiteral("\\\\\\\\"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });

        it("correctly classifies the last line of a multi-line string", function () {
            test("'",
                ts.EndOfLineState.InSingleQuoteStringLiteral,
                stringLiteral("'"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });

        it("correctly classifies an unterminated multiline comment", function () {
            test("/*",
                ts.EndOfLineState.Start,
                comment("/*"),
                finalEndOfLineState(ts.EndOfLineState.InMultiLineCommentTrivia));
        });

        it("correctly classifies the termination of a multiline comment", function () {
            test("   */     ",
                ts.EndOfLineState.InMultiLineCommentTrivia,
                comment("   */"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });

        it("correctly classifies the continuation of a multiline comment", function () {
            test("LOREM IPSUM DOLOR   ",
                ts.EndOfLineState.InMultiLineCommentTrivia,
                comment("LOREM IPSUM DOLOR   "),
                finalEndOfLineState(ts.EndOfLineState.InMultiLineCommentTrivia));
        });

        it("correctly classifies an unterminated multiline comment on a line ending in '/*/'", function () {
            test("   /*/",
                ts.EndOfLineState.Start,
                comment("/*/"),
                finalEndOfLineState(ts.EndOfLineState.InMultiLineCommentTrivia));
        });

        it("correctly classifies an unterminated multiline comment with trailing space", function () {
            test("/* ",
                ts.EndOfLineState.Start,
                comment("/* "),
                finalEndOfLineState(ts.EndOfLineState.InMultiLineCommentTrivia));
        });

        it("correctly classifies a keyword after a dot", function () {
            test("a.var",
                ts.EndOfLineState.Start,
                identifier("var"));
        });

        it("correctly classifies a string literal after a dot", function () {
            test("a.\"var\"",
                ts.EndOfLineState.Start,
                stringLiteral("\"var\""));
        });

        it("correctly classifies a keyword after a dot separated by comment trivia", function () {
            test("a./*hello world*/ var",
                ts.EndOfLineState.Start,
                identifier("a"),
                punctuation("."),
                comment("/*hello world*/"),
                identifier("var"));
        });

        it("classifies a property access with whitespace around the dot", function () {
            test("   x  .\tfoo ()",
                ts.EndOfLineState.Start,
                identifier("x"),
                identifier("foo"));
        });

        it("classifies a keyword after a dot on previous line", function () {
            test("var",
                ts.EndOfLineState.Start,
                keyword("var"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });

        it("classifies multiple keywords properly", function () {
            test("public static",
                ts.EndOfLineState.Start,
                keyword("public"),
                keyword("static"),
                finalEndOfLineState(ts.EndOfLineState.Start));

            test("public var",
                ts.EndOfLineState.Start,
                keyword("public"),
                identifier("var"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });

        it("classifies a single line no substitution template string correctly", () => {
            test("`number number public string`",
                ts.EndOfLineState.Start,
                stringLiteral("`number number public string`"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });
        it("classifies substitution parts of a template string correctly", () => {
            test("`number '${ 1 + 1 }' string '${ 'hello' }'`",
                ts.EndOfLineState.Start,
                stringLiteral("`number '${"),
                numberLiteral("1"),
                operator("+"),
                numberLiteral("1"),
                stringLiteral("}' string '${"),
                stringLiteral("'hello'"),
                stringLiteral("}'`"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });
        it("classifies an unterminated no substitution template string correctly", () => {
            test("`hello world",
                ts.EndOfLineState.Start,
                stringLiteral("`hello world"),
                finalEndOfLineState(ts.EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate));
        });
        it("classifies the entire line of an unterminated multiline no-substitution/head template", () => {
            test("...",
                ts.EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate,
                stringLiteral("..."),
                finalEndOfLineState(ts.EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate));
        });
        it("classifies the entire line of an unterminated multiline template middle/end",() => {
            test("...",
                ts.EndOfLineState.InTemplateMiddleOrTail,
                stringLiteral("..."),
                finalEndOfLineState(ts.EndOfLineState.InTemplateMiddleOrTail));
        });
        it("classifies a termination of a multiline template head", () => {
            test("...${",
                ts.EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate,
                stringLiteral("...${"),
                finalEndOfLineState(ts.EndOfLineState.InTemplateSubstitutionPosition));
        });
        it("classifies the termination of a multiline no substitution template", () => {
            test("...`",
                ts.EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate,
                stringLiteral("...`"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });
        it("classifies the substitution parts and middle/tail of a multiline template string", () => {
            test("${ 1 + 1 }...`",
                ts.EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate,
                stringLiteral("${"),
                numberLiteral("1"),
                operator("+"),
                numberLiteral("1"),
                stringLiteral("}...`"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });
        it("classifies a template middle and propagates the end of line state",() => {
            test("${ 1 + 1 }...`",
                ts.EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate,
                stringLiteral("${"),
                numberLiteral("1"),
                operator("+"),
                numberLiteral("1"),
                stringLiteral("}...`"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });
        it("classifies substitution expressions with curly braces appropriately", () => {
            var pos = 0;
            var lastLength = 0;

            test("...${ () => { } } ${ { x: `1` } }...`",
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
                finalEndOfLineState(ts.EndOfLineState.Start));

            // Adjusts 'pos' by accounting for the length of each portion of the string,
            // but only return the last given string
            function track(...vals: string[]): string {
                for (var i = 0, n = vals.length; i < n; i++) {
                    pos += lastLength;
                    lastLength = vals[i].length;
                }
                return ts.lastOrUndefined(vals);
            }
        });

        it("classifies partially written generics correctly.", function () {
            test("Foo<number",
                ts.EndOfLineState.Start,
                identifier("Foo"),
                operator("<"),
                identifier("number"),
                finalEndOfLineState(ts.EndOfLineState.Start));

            // Looks like a cast, should get classified as a keyword.
            test("<number",
                ts.EndOfLineState.Start,
                operator("<"),
                keyword("number"),
                finalEndOfLineState(ts.EndOfLineState.Start));

            // handle nesting properly.
            test("Foo<Foo,Foo<number",
                ts.EndOfLineState.Start,
                identifier("Foo"),
                operator("<"),
                identifier("Foo"),
                operator(","),
                identifier("Foo"),
                operator("<"),
                identifier("number"),
                finalEndOfLineState(ts.EndOfLineState.Start));

            // no longer in something that looks generic.
            test("Foo<Foo> number",
                ts.EndOfLineState.Start,
                identifier("Foo"),
                operator("<"),
                identifier("Foo"),
                operator(">"),
                keyword("number"),
                finalEndOfLineState(ts.EndOfLineState.Start));
        });
    });
});