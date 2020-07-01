// lots of tests use quoted code
/* eslint-disable no-template-curly-in-string */

import { TokenClass, ClassificationResult, EndOfLineState } from "../../../services/types";
import { assert } from "console";
import { last } from "../../../compiler/core";

interface ClassificationEntry {
    value: any;
    classification: TokenClass;
    position?: number;
}

describe("unittests:: services:: Colorization", () => {
    // Use the shim adapter to ensure test coverage of the shim layer for the classifier
    const languageServiceAdapter = new Harness.LanguageService.ShimLanguageServiceAdapter(/*preprocessToResolve*/ false);
    const classifier = languageServiceAdapter.getClassifier();

    function getEntryAtPosition(result: ClassificationResult, position: number) {
        let entryPosition = 0;
        for (const entry of result.entries) {
            if (entryPosition === position) {
                return entry;
            }
            entryPosition += entry.length;
        }
        return undefined;
    }

    function punctuation(text: string, position?: number) { return createClassification(text, TokenClass.Punctuation, position); }
    function keyword(text: string, position?: number) { return createClassification(text, TokenClass.Keyword, position); }
    function operator(text: string, position?: number) { return createClassification(text, TokenClass.Operator, position); }
    function comment(text: string, position?: number) { return createClassification(text, TokenClass.Comment, position); }
    function whitespace(text: string, position?: number) { return createClassification(text, TokenClass.Whitespace, position); }
    function identifier(text: string, position?: number) { return createClassification(text, TokenClass.Identifier, position); }
    function numberLiteral(text: string, position?: number) { return createClassification(text, TokenClass.NumberLiteral, position); }
    function stringLiteral(text: string, position?: number) { return createClassification(text, TokenClass.StringLiteral, position); }
    function finalEndOfLineState(value: number): ClassificationEntry { return { value, classification: undefined!, position: 0 }; } // TODO: GH#18217
    function createClassification(value: string, classification: TokenClass, position?: number): ClassificationEntry {
        return { value, classification, position };
    }

    function testLexicalClassification(text: string, initialEndOfLineState: EndOfLineState, ...expectedEntries: ClassificationEntry[]): void {
        const result = classifier.getClassificationsForLine(text, initialEndOfLineState, /*syntacticClassifierAbsent*/ false);

        for (const expectedEntry of expectedEntries) {
            if (expectedEntry.classification === undefined) {
                assert.equal(result.finalLexState, expectedEntry.value, "final endOfLineState does not match expected.");
            }
            else {
                const actualEntryPosition = expectedEntry.position !== undefined ? expectedEntry.position : text.indexOf(expectedEntry.value);
                assert(actualEntryPosition >= 0, "token: '" + expectedEntry.value + "' does not exit in text: '" + text + "'.");

                const actualEntry = getEntryAtPosition(result, actualEntryPosition)!;

                assert(actualEntry, "Could not find classification entry for '" + expectedEntry.value + "' at position: " + actualEntryPosition);
                assert.equal(actualEntry.classification, expectedEntry.classification, "Classification class does not match expected. Expected: " + TokenClass[expectedEntry.classification] + ", Actual: " + TokenClass[actualEntry.classification]);
                assert.equal(actualEntry.length, expectedEntry.value.length, "Classification length does not match expected. Expected: " + TokenClass[expectedEntry.value.length] + ", Actual: " + TokenClass[actualEntry.length]);
            }
        }
    }

    describe("test getClassifications", () => {
        it("returns correct token classes", () => {
            testLexicalClassification("var x: string = \"foo\" ?? \"bar\"; //Hello",
                EndOfLineState.None,
                keyword("var"),
                whitespace(" "),
                identifier("x"),
                punctuation(":"),
                keyword("string"),
                operator("="),
                stringLiteral("\"foo\""),
                whitespace(" "),
                operator("??"),
                stringLiteral("\"foo\""),
                comment("//Hello"),
                punctuation(";"));
        });

        it("correctly classifies a comment after a divide operator", () => {
            testLexicalClassification("1 / 2 // comment",
                EndOfLineState.None,
                numberLiteral("1"),
                whitespace(" "),
                operator("/"),
                numberLiteral("2"),
                comment("// comment"));
        });

        it("correctly classifies a literal after a divide operator", () => {
            testLexicalClassification("1 / 2, 3 / 4",
                EndOfLineState.None,
                numberLiteral("1"),
                whitespace(" "),
                operator("/"),
                numberLiteral("2"),
                numberLiteral("3"),
                numberLiteral("4"),
                operator(","));
        });

        it("correctly classifies a multiline string with one backslash", () => {
            testLexicalClassification("'line1\\",
                EndOfLineState.None,
                stringLiteral("'line1\\"),
                finalEndOfLineState(EndOfLineState.InSingleQuoteStringLiteral));
        });

        it("correctly classifies a multiline string with three backslashes", () => {
            testLexicalClassification("'line1\\\\\\",
                EndOfLineState.None,
                stringLiteral("'line1\\\\\\"),
                finalEndOfLineState(EndOfLineState.InSingleQuoteStringLiteral));
        });

        it("correctly classifies an unterminated single-line string with no backslashes", () => {
            testLexicalClassification("'line1",
                EndOfLineState.None,
                stringLiteral("'line1"),
                finalEndOfLineState(EndOfLineState.None));
        });

        it("correctly classifies an unterminated single-line string with two backslashes", () => {
            testLexicalClassification("'line1\\\\",
                EndOfLineState.None,
                stringLiteral("'line1\\\\"),
                finalEndOfLineState(EndOfLineState.None));
        });

        it("correctly classifies an unterminated single-line string with four backslashes", () => {
            testLexicalClassification("'line1\\\\\\\\",
                EndOfLineState.None,
                stringLiteral("'line1\\\\\\\\"),
                finalEndOfLineState(EndOfLineState.None));
        });

        it("correctly classifies the continuing line of a multiline string ending in one backslash", () => {
            testLexicalClassification("\\",
                EndOfLineState.InDoubleQuoteStringLiteral,
                stringLiteral("\\"),
                finalEndOfLineState(EndOfLineState.InDoubleQuoteStringLiteral));
        });

        it("correctly classifies the continuing line of a multiline string ending in three backslashes", () => {
            testLexicalClassification("\\",
                EndOfLineState.InDoubleQuoteStringLiteral,
                stringLiteral("\\"),
                finalEndOfLineState(EndOfLineState.InDoubleQuoteStringLiteral));
        });

        it("correctly classifies the last line of an unterminated multiline string ending in no backslashes", () => {
            testLexicalClassification("  ",
                EndOfLineState.InDoubleQuoteStringLiteral,
                stringLiteral("  "),
                finalEndOfLineState(EndOfLineState.None));
        });

        it("correctly classifies the last line of an unterminated multiline string ending in two backslashes", () => {
            testLexicalClassification("\\\\",
                EndOfLineState.InDoubleQuoteStringLiteral,
                stringLiteral("\\\\"),
                finalEndOfLineState(EndOfLineState.None));
        });

        it("correctly classifies the last line of an unterminated multiline string ending in four backslashes", () => {
            testLexicalClassification("\\\\\\\\",
                EndOfLineState.InDoubleQuoteStringLiteral,
                stringLiteral("\\\\\\\\"),
                finalEndOfLineState(EndOfLineState.None));
        });

        it("correctly classifies the last line of a multiline string", () => {
            testLexicalClassification("'",
                EndOfLineState.InSingleQuoteStringLiteral,
                stringLiteral("'"),
                finalEndOfLineState(EndOfLineState.None));
        });

        it("correctly classifies an unterminated multiline comment", () => {
            testLexicalClassification("/*",
                EndOfLineState.None,
                comment("/*"),
                finalEndOfLineState(EndOfLineState.InMultiLineCommentTrivia));
        });

        it("correctly classifies the termination of a multiline comment", () => {
            testLexicalClassification("   */     ",
                EndOfLineState.InMultiLineCommentTrivia,
                comment("   */"),
                finalEndOfLineState(EndOfLineState.None));
        });

        it("correctly classifies the continuation of a multiline comment", () => {
            testLexicalClassification("LOREM IPSUM DOLOR   ",
                EndOfLineState.InMultiLineCommentTrivia,
                comment("LOREM IPSUM DOLOR   "),
                finalEndOfLineState(EndOfLineState.InMultiLineCommentTrivia));
        });

        it("correctly classifies an unterminated multiline comment on a line ending in '/*/'", () => {
            testLexicalClassification("   /*/",
                EndOfLineState.None,
                comment("/*/"),
                finalEndOfLineState(EndOfLineState.InMultiLineCommentTrivia));
        });

        it("correctly classifies an unterminated multiline comment with trailing space", () => {
            testLexicalClassification("/* ",
                EndOfLineState.None,
                comment("/* "),
                finalEndOfLineState(EndOfLineState.InMultiLineCommentTrivia));
        });

        it("correctly classifies a keyword after a dot", () => {
            testLexicalClassification("a.var",
                EndOfLineState.None,
                identifier("var"));
        });

        it("correctly classifies a string literal after a dot", () => {
            testLexicalClassification("a.\"var\"",
                EndOfLineState.None,
                stringLiteral("\"var\""));
        });

        it("correctly classifies a keyword after a dot separated by comment trivia", () => {
            testLexicalClassification("a./*hello world*/ var",
                EndOfLineState.None,
                identifier("a"),
                punctuation("."),
                comment("/*hello world*/"),
                identifier("var"));
        });

        it("classifies a property access with whitespace around the dot", () => {
            testLexicalClassification("   x  .\tfoo ()",
                EndOfLineState.None,
                identifier("x"),
                identifier("foo"));
        });

        it("classifies a keyword after a dot on previous line", () => {
            testLexicalClassification("var",
                EndOfLineState.None,
                keyword("var"),
                finalEndOfLineState(EndOfLineState.None));
        });

        it("classifies multiple keywords properly", () => {
            testLexicalClassification("public static",
                EndOfLineState.None,
                keyword("public"),
                keyword("static"),
                finalEndOfLineState(EndOfLineState.None));

            testLexicalClassification("public var",
                EndOfLineState.None,
                keyword("public"),
                identifier("var"),
                finalEndOfLineState(EndOfLineState.None));
        });

        it("classifies a single line no substitution template string correctly", () => {
            testLexicalClassification("`number number public string`",
                EndOfLineState.None,
                stringLiteral("`number number public string`"),
                finalEndOfLineState(EndOfLineState.None));
        });
        it("classifies substitution parts of a template string correctly", () => {
            testLexicalClassification("`number '${ 1 + 1 }' string '${ 'hello' }'`",
                EndOfLineState.None,
                stringLiteral("`number '${"),
                numberLiteral("1"),
                operator("+"),
                numberLiteral("1"),
                stringLiteral("}' string '${"),
                stringLiteral("'hello'"),
                stringLiteral("}'`"),
                finalEndOfLineState(EndOfLineState.None));
        });
        it("classifies an unterminated no substitution template string correctly", () => {
            testLexicalClassification("`hello world",
                EndOfLineState.None,
                stringLiteral("`hello world"),
                finalEndOfLineState(EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate));
        });
        it("classifies the entire line of an unterminated multiline no-substitution/head template", () => {
            testLexicalClassification("...",
                EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate,
                stringLiteral("..."),
                finalEndOfLineState(EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate));
        });
        it("classifies the entire line of an unterminated multiline template middle/end", () => {
            testLexicalClassification("...",
                EndOfLineState.InTemplateMiddleOrTail,
                stringLiteral("..."),
                finalEndOfLineState(EndOfLineState.InTemplateMiddleOrTail));
        });
        it("classifies a termination of a multiline template head", () => {
            testLexicalClassification("...${",
                EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate,
                stringLiteral("...${"),
                finalEndOfLineState(EndOfLineState.InTemplateSubstitutionPosition));
        });
        it("classifies the termination of a multiline no substitution template", () => {
            testLexicalClassification("...`",
                EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate,
                stringLiteral("...`"),
                finalEndOfLineState(EndOfLineState.None));
        });
        it("classifies the substitution parts and middle/tail of a multiline template string", () => {
            testLexicalClassification("${ 1 + 1 }...`",
                EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate,
                stringLiteral("${"),
                numberLiteral("1"),
                operator("+"),
                numberLiteral("1"),
                stringLiteral("}...`"),
                finalEndOfLineState(EndOfLineState.None));
        });
        it("classifies a template middle and propagates the end of line state", () => {
            testLexicalClassification("${ 1 + 1 }...`",
                EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate,
                stringLiteral("${"),
                numberLiteral("1"),
                operator("+"),
                numberLiteral("1"),
                stringLiteral("}...`"),
                finalEndOfLineState(EndOfLineState.None));
        });
        it("classifies substitution expressions with curly braces appropriately", () => {
            let pos = 0;
            let lastLength = 0;

            testLexicalClassification("...${ () => { } } ${ { x: `1` } }...`",
                EndOfLineState.InTemplateHeadOrNoSubstitutionTemplate,
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
                finalEndOfLineState(EndOfLineState.None));

            // Adjusts 'pos' by accounting for the length of each portion of the string,
            // but only return the last given string
            function track(...vals: string[]): string {
                for (const val of vals) {
                    pos += lastLength;
                    lastLength = val.length;
                }
                return last(vals);
            }
        });

        it("classifies partially written generics correctly.", () => {
            testLexicalClassification("Foo<number",
                EndOfLineState.None,
                identifier("Foo"),
                operator("<"),
                identifier("number"),
                finalEndOfLineState(EndOfLineState.None));

            // Looks like a cast, should get classified as a keyword.
            testLexicalClassification("<number",
                EndOfLineState.None,
                operator("<"),
                keyword("number"),
                finalEndOfLineState(EndOfLineState.None));

            // handle nesting properly.
            testLexicalClassification("Foo<Foo,Foo<number",
                EndOfLineState.None,
                identifier("Foo"),
                operator("<"),
                identifier("Foo"),
                operator(","),
                identifier("Foo"),
                operator("<"),
                identifier("number"),
                finalEndOfLineState(EndOfLineState.None));
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
                EndOfLineState.None,
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
                finalEndOfLineState(EndOfLineState.None));

            testLexicalClassification(
                "<<<<<<< HEAD\r\n\
class C { }\r\n\
=======\r\n\
class D { }\r\n\
>>>>>>> Branch - a\r\n",
                EndOfLineState.None,
                comment("<<<<<<< HEAD"),
                keyword("class"),
                identifier("C"),
                punctuation("{"),
                punctuation("}"),
                comment("=======\r\nclass D { }\r\n"),
                comment(">>>>>>> Branch - a"),
                finalEndOfLineState(EndOfLineState.None));

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
                EndOfLineState.None,
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
                finalEndOfLineState(EndOfLineState.None));

            testLexicalClassification(
                "<<<<<<< HEAD\r\n\
class C { }\r\n\
||||||| merged common ancestors\r\n\
class E { }\r\n\
=======\r\n\
class D { }\r\n\
>>>>>>> Branch - a\r\n",
                EndOfLineState.None,
                comment("<<<<<<< HEAD"),
                keyword("class"),
                identifier("C"),
                punctuation("{"),
                punctuation("}"),
                comment("||||||| merged common ancestors\r\nclass E { }\r\n"),
                comment("=======\r\nclass D { }\r\n"),
                comment(">>>>>>> Branch - a"),
                finalEndOfLineState(EndOfLineState.None));
        });

        it("'of' keyword", () => {
            testLexicalClassification("for (var of of of) { }",
                EndOfLineState.None,
                keyword("for"),
                punctuation("("),
                keyword("var"),
                keyword("of"),
                keyword("of"),
                keyword("of"),
                punctuation(")"),
                punctuation("{"),
                punctuation("}"),
                finalEndOfLineState(EndOfLineState.None));
        });
    });
});
