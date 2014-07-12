///<reference path='_project.ts'/>

interface Classification {
    length: number;
    class2: TypeScript.TokenClass;
}

interface ClassiferResult {
    tuples: Classification[];
    finalLexState: TypeScript.LexState;
}

var TokenClassNames = {};
TokenClassNames[TypeScript.TokenClass.Punctuation] = "Punctuation";
TokenClassNames[TypeScript.TokenClass.Keyword] = "Keyword";
TokenClassNames[TypeScript.TokenClass.Operator] = "Operator";
TokenClassNames[TypeScript.TokenClass.Comment] = "Comment";
TokenClassNames[TypeScript.TokenClass.Whitespace] = "Whitespace";
TokenClassNames[TypeScript.TokenClass.Identifier] = "Identifier";
TokenClassNames[TypeScript.TokenClass.NumberLiteral] = "NumberLiteral";
TokenClassNames[TypeScript.TokenClass.StringLiteral] = "StringLiteral";
TokenClassNames[TypeScript.TokenClass.RegExpLiteral] = "RegExpLiteral";


describe('Colorization', function() {
    var mytypescriptLS = new Harness.TypeScriptLS();
    var myls = mytypescriptLS.getLanguageService();
    
    var myclassifier = new Services.ClassifierShim(myls.host);
    
    function getClassifications(code: string, initialLexState?: TypeScript.LexState = TypeScript.LexState.Start): ClassiferResult {
        var classResult = myclassifier.getClassificationsForLine(code, initialLexState).split('\n');
        var tuples: Classification[] = [];
        var i = 0;

        for (; i < classResult.length - 1; i += 2) {
            tuples[i / 2] = {
                length: parseInt(classResult[i]),
                class2: parseInt(classResult[i + 1])
            };
        }
        var finalLexState = classResult[classResult.length - 1];

        return {
            tuples: tuples,
            finalLexState: parseInt(finalLexState)
        };
    }

    function verifyClassification(classification: Classification, expectedLength: number, expectedClass: number) {
        assert.notNull(classification);
        assert.is(classification.length === expectedLength, "Classification length does not match expected. Expected: " + expectedLength + ", Actual: " + classification.length);
        assert.is(classification.class2 === expectedClass, "Classification class does not match expected. Expected: " + TokenClassNames[expectedClass] + ", Actual: " + TokenClassNames[classification.class2]);
    }
    
    describe("test cases for colorization", function() {
        var results = getClassifications('var x:string = "foo"; //Hello');

        it("checks for a keyword", function() {
            verifyClassification(results.tuples[0], 3, TypeScript.TokenClass.Keyword);
        });

        it("checks for a whitespace", function() {
            verifyClassification(results.tuples[1], 4, TypeScript.TokenClass.Whitespace);
        });

        it("checks for a identifier", function() {
            verifyClassification(results.tuples[2], 5, TypeScript.TokenClass.Identifier);
        });

        it("checks for an punctuation", function() {
            verifyClassification(results.tuples[3], 6, TypeScript.TokenClass.Punctuation);
        });
        
        it("checks for a operator", function() {
            verifyClassification(results.tuples[6], 14, TypeScript.TokenClass.Operator);
        });

        it("checks for a string literal", function() {
            verifyClassification(results.tuples[8], 20, TypeScript.TokenClass.StringLiteral);
        });

        it("checks for a comment", function() {
            verifyClassification(results.tuples[11], 29, TypeScript.TokenClass.Comment);
        });
    });

    describe("test comment colorization after a divide operator", function() {
        var results = getClassifications('1 / 1 // comment');

        it("checks for a number literal", function() {
            verifyClassification(results.tuples[0], 1, TypeScript.TokenClass.NumberLiteral);
        });

        it("checks for a whitespace", function() {
            verifyClassification(results.tuples[1], 2, TypeScript.TokenClass.Whitespace);
        });

        it("checks for a operator", function() {
            verifyClassification(results.tuples[2], 3, TypeScript.TokenClass.Operator);
        });

        it("checks for a whitespace", function() {
            verifyClassification(results.tuples[3], 4, TypeScript.TokenClass.Whitespace);
        });

        it("checks for a number literal", function() {
            verifyClassification(results.tuples[4], 5, TypeScript.TokenClass.NumberLiteral);
        });

        it("checks for a whitespace", function() {
            verifyClassification(results.tuples[5], 6, TypeScript.TokenClass.Whitespace);
        });

        it("checks for a comment", function() {
            verifyClassification(results.tuples[6], 16, TypeScript.TokenClass.Comment);
        });
    });

    describe("test literal colorization after a divide operator", function() {
        var results = getClassifications('1 / 2, 1 / 2');

        it("checks for a number literal", function() {
            verifyClassification(results.tuples[0], 1, TypeScript.TokenClass.NumberLiteral);
        });

        it("checks for a whitespace", function() {
            verifyClassification(results.tuples[1], 2, TypeScript.TokenClass.Whitespace);
        });

        it("checks for a operator", function() {
            verifyClassification(results.tuples[2], 3, TypeScript.TokenClass.Operator);
        });

        it("checks for a whitespace", function() {
            verifyClassification(results.tuples[3], 4, TypeScript.TokenClass.Whitespace);
        });

        it("checks for a number literal", function() {
            verifyClassification(results.tuples[4], 5, TypeScript.TokenClass.NumberLiteral);
        });

        it("checks for a operator", function() {
            verifyClassification(results.tuples[5], 6, TypeScript.TokenClass.Operator);
        });

        it("checks for a whitespace", function() {
            verifyClassification(results.tuples[6], 7, TypeScript.TokenClass.Whitespace);
        });

        it("checks for a number literal", function() {
            verifyClassification(results.tuples[7], 8, TypeScript.TokenClass.NumberLiteral);
        });

        it("checks for a whitespace", function() {
            verifyClassification(results.tuples[8], 9, TypeScript.TokenClass.Whitespace);
        });

        it("checks for a operator", function() {
            verifyClassification(results.tuples[9], 10, TypeScript.TokenClass.Operator);
        });

        it("checks for a whitespace", function() {
            verifyClassification(results.tuples[10], 11, TypeScript.TokenClass.Whitespace);
        });

        it("checks for a number literal", function() {
            verifyClassification(results.tuples[11], 12, TypeScript.TokenClass.NumberLiteral);
        });

    });

    describe("test cases for colorizing multi-line string", function() {
        it("classifies first line correctelly", function() {
            var results = getClassifications("'line1\\\n", TypeScript.LexState.Start);

            assert.equal(results.tuples.length, 1);
            verifyClassification(results.tuples[0], 8, TypeScript.TokenClass.StringLiteral);
            assert.equal(results.finalLexState, TypeScript.LexState.InMultilineSingleQuoteString);
        });

        it("classifies second line correctelly", function() {
            var results = getClassifications("\\\n", TypeScript.LexState.InMultilineSingleQuoteString);

            assert.equal(results.tuples.length, 1);
            verifyClassification(results.tuples[0], 2, TypeScript.TokenClass.StringLiteral);
            assert.equal(results.finalLexState, TypeScript.LexState.InMultilineSingleQuoteString);
        });

        it("classifies third line correctelly", function() {
            var results = getClassifications("'", TypeScript.LexState.InMultilineSingleQuoteString);

            assert.equal(results.tuples.length, 1);
            verifyClassification(results.tuples[0], 1, TypeScript.TokenClass.StringLiteral);
            assert.equal(results.finalLexState, TypeScript.LexState.Start);
        });
    });
});