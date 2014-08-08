interface Classification {
    length: number;
    class: ts.TokenClass;
}

interface ClassiferResult {
    tuples: Classification[];
    finalEndOfLineState: ts.EndOfLineState;
}

var TokenClassNames = {};
TokenClassNames[ts.TokenClass.Punctuation] = "Punctuation";
TokenClassNames[ts.TokenClass.Keyword] = "Keyword";
TokenClassNames[ts.TokenClass.Operator] = "Operator";
TokenClassNames[ts.TokenClass.Comment] = "Comment";
TokenClassNames[ts.TokenClass.Whitespace] = "Whitespace";
TokenClassNames[ts.TokenClass.Identifier] = "Identifier";
TokenClassNames[ts.TokenClass.NumberLiteral] = "NumberLiteral";
TokenClassNames[ts.TokenClass.StringLiteral] = "StringLiteral";
TokenClassNames[ts.TokenClass.RegExpLiteral] = "RegExpLiteral";


describe('Colorization', function () {
    var mytypescriptLS = new Harness.LanguageService.TypeScriptLS();
    var myclassifier = mytypescriptLS.getClassifier();

    function getClassifications(code: string, initialEndOfLineState: ts.EndOfLineState = ts.EndOfLineState.Start): ClassiferResult {
        var classResult = myclassifier.getClassificationsForLine(code, initialEndOfLineState).split('\n');
        var tuples: Classification[] = [];
        var i = 0;
        var computedLength = 0;

        for (; i < classResult.length - 1; i += 2) {
            var t = tuples[i / 2] = {
                length: parseInt(classResult[i]),
                class: parseInt(classResult[i + 1])
            };

            assert.isTrue(t.length > 0, "Result length should be greater than 0, got :" + t.length);
            computedLength += t.length;
        }
        var finalEndOfLineState = classResult[classResult.length - 1];

        assert.equal(computedLength, code.length, "Expected accumilative length of all entries to match the length of the source. expected: " + code.length + ", but got: " + computedLength);

        return {
            tuples: tuples,
            finalEndOfLineState: parseInt(finalEndOfLineState)
        };
    }

    function verifyClassification(classification: Classification, expectedLength: number, expectedClass: number) {
        assert.isNotNull(classification);
        assert.equal(classification.length, expectedLength, "Classification length does not match expected. Expected: " + expectedLength + ", Actual: " + classification.length);
        assert.equal(classification.class, expectedClass, "Classification class does not match expected. Expected: " + TokenClassNames[expectedClass] + ", Actual: " + TokenClassNames[classification.class]);
    }

    describe("test cases for colorization", function () {
        var results = getClassifications('var x:string = "foo"; //Hello');

        it("checks for a keyword", function () {
            verifyClassification(results.tuples[0], 3, ts.TokenClass.Keyword);
        });

        it("checks for a whitespace", function () {
            verifyClassification(results.tuples[1], 1, ts.TokenClass.Whitespace);
        });

        it("checks for a identifier", function () {
            verifyClassification(results.tuples[2], 1, ts.TokenClass.Identifier);
        });

        it("checks for an punctuation", function () {
            verifyClassification(results.tuples[3], 1, ts.TokenClass.Punctuation);
        });

        it("checks for a operator", function () {
            verifyClassification(results.tuples[6], 1, ts.TokenClass.Operator);
        });

        it("checks for a string literal", function () {
            verifyClassification(results.tuples[8], 5, ts.TokenClass.StringLiteral);
        });

        it("checks for a comment", function () {
            verifyClassification(results.tuples[11], 7, ts.TokenClass.Comment);
        });
    });

    describe("test comment colorization after a divide operator", function () {
        var results = getClassifications('1 / 1 // comment');

        it("checks for a number literal", function () {
            verifyClassification(results.tuples[0], 1, ts.TokenClass.NumberLiteral);
        });

        it("checks for a whitespace", function () {
            verifyClassification(results.tuples[1], 1, ts.TokenClass.Whitespace);
        });

        it("checks for a operator", function () {
            verifyClassification(results.tuples[2], 1, ts.TokenClass.Operator);
        });

        it("checks for a whitespace", function () {
            verifyClassification(results.tuples[3], 1, ts.TokenClass.Whitespace);
        });

        it("checks for a number literal", function () {
            verifyClassification(results.tuples[4], 1, ts.TokenClass.NumberLiteral);
        });

        it("checks for a whitespace", function () {
            verifyClassification(results.tuples[5], 1, ts.TokenClass.Whitespace);
        });

        it("checks for a comment", function () {
            verifyClassification(results.tuples[6], 10, ts.TokenClass.Comment);
        });
    });

    describe("test literal colorization after a divide operator", function () {
        var results = getClassifications('1 / 2, 1 / 2');

        it("checks for a number literal", function () {
            verifyClassification(results.tuples[0], 1, ts.TokenClass.NumberLiteral);
        });

        it("checks for a whitespace", function () {
            verifyClassification(results.tuples[1], 1, ts.TokenClass.Whitespace);
        });

        it("checks for a operator", function () {
            verifyClassification(results.tuples[2], 1, ts.TokenClass.Operator);
        });

        it("checks for a whitespace", function () {
            verifyClassification(results.tuples[3], 1, ts.TokenClass.Whitespace);
        });

        it("checks for a number literal", function () {
            verifyClassification(results.tuples[4], 1, ts.TokenClass.NumberLiteral);
        });

        it("checks for a operator", function () {
            verifyClassification(results.tuples[5], 1, ts.TokenClass.Operator);
        });

        it("checks for a whitespace", function () {
            verifyClassification(results.tuples[6], 1, ts.TokenClass.Whitespace);
        });

        it("checks for a number literal", function () {
            verifyClassification(results.tuples[7], 1, ts.TokenClass.NumberLiteral);
        });

        it("checks for a whitespace", function () {
            verifyClassification(results.tuples[8], 1, ts.TokenClass.Whitespace);
        });

        it("checks for a operator", function () {
            verifyClassification(results.tuples[9], 1, ts.TokenClass.Operator);
        });

        it("checks for a whitespace", function () {
            verifyClassification(results.tuples[10], 1, ts.TokenClass.Whitespace);
        });

        it("checks for a number literal", function () {
            verifyClassification(results.tuples[11], 1, ts.TokenClass.NumberLiteral);
        });

    });

    describe("test cases for colorizing multi-line string", function () {
        it("classifies first line correctelly", function () {
            var results = getClassifications("'line1\\", ts.EndOfLineState.Start);

            assert.equal(results.tuples.length, 1);
            verifyClassification(results.tuples[0], 7, ts.TokenClass.StringLiteral);
            assert.equal(results.finalEndOfLineState, ts.EndOfLineState.InSingleQuoteStringLiteral);
        });

        it("classifies second line correctelly", function () {
            var results = getClassifications("\\", ts.EndOfLineState.InDoubleQuoteStringLiteral);

            assert.equal(results.tuples.length, 1);
            verifyClassification(results.tuples[0], 1, ts.TokenClass.StringLiteral);
            assert.equal(results.finalEndOfLineState, ts.EndOfLineState.InDoubleQuoteStringLiteral);
        });

        it("classifies third line correctelly", function () {
            var results = getClassifications("'", ts.EndOfLineState.InSingleQuoteStringLiteral);

            assert.equal(results.tuples.length, 1);
            verifyClassification(results.tuples[0], 1, ts.TokenClass.StringLiteral);
            assert.equal(results.finalEndOfLineState, ts.EndOfLineState.Start);
        });
    });

    describe("test cases for colorizing unterminted multi-line comment", function () {
        it("unterminated multi-line comment correctelly", function () {
            var results = getClassifications("/*", ts.EndOfLineState.Start);

            assert.equal(results.tuples.length, 1);
            verifyClassification(results.tuples[0], 2, ts.TokenClass.Comment);
            assert.equal(results.finalEndOfLineState, ts.EndOfLineState.InMultiLineCommentTrivia);
        });

        it("unterminated multi-line comment with trailing space correctelly", function () {
            var results = getClassifications("/* ", ts.EndOfLineState.Start);

            assert.equal(results.tuples.length, 1);
            verifyClassification(results.tuples[0], 3, ts.TokenClass.Comment);
            assert.equal(results.finalEndOfLineState, ts.EndOfLineState.InMultiLineCommentTrivia);
        });
    });

    describe("test cases for colorizing keywords", function () {
        it("classifies keyword after a dot", function () {
            var results = getClassifications("a.var", ts.EndOfLineState.Start);
            verifyClassification(results.tuples[2], 3, ts.TokenClass.Identifier);
        });

        it("classifies keyword after a dot on previous line", function () {
            var results = getClassifications("var", ts.EndOfLineState.EndingWithDotToken);

            assert.equal(results.tuples.length, 1);
            verifyClassification(results.tuples[0], 3, ts.TokenClass.Identifier);
            assert.equal(results.finalEndOfLineState, ts.EndOfLineState.Start);
        });
    });
});