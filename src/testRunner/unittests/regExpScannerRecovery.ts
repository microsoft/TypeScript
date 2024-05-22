import * as ts from "../_namespaces/ts.js";

describe("unittests:: regExpScannerRecovery", () => {
    const testCases = [
        "/",
        "/[]",
        "/{}",
        "/()",
        "/foo",
        "/foo[]",
        "/foo{}",
        "/foo()",
        "/[]foo",
        "/{}foo",
        "/()foo",
        "/{[]}",
        "/([])",
        "/[)}({]",
        "/({[]})",
        "/\\[",
        "/\\{",
        "/\\(",
        "/[\\[]",
        "/(\\[)",
        "/{\\[}",
        "/[\\(]",
        "/(\\()",
        "/{\\(}",
        "/[\\{]",
        "/(\\{)",
        "/{\\{}",
        "/\\{(\\[\\([{])",
        "/\\]",
        "/\\}",
        "/\\)",
        "/[\\]]",
        "/(\\])",
        "/{\\]}",
        "/[\\)]",
        "/(\\))",
        "/{\\)}",
        "/[\\}]",
        "/(\\})",
        "/{\\}}",
        "/({[\\])]})",
    ];
    const whiteSpaceSequences = [
        "",
        "  ",
        "\t\f",
        "\u3000\u2003",
    ];
    for (const testCase of testCases) {
        for (const whiteSpaces of whiteSpaceSequences) {
            const testCaseWithWhiteSpaces = testCase + whiteSpaces;
            const sources = [
                `const regex = ${testCaseWithWhiteSpaces};`,
                `(${testCaseWithWhiteSpaces});`,
                `([${testCaseWithWhiteSpaces}]);`,
                `({prop: ${testCaseWithWhiteSpaces}});`,
                `({prop: ([(${testCaseWithWhiteSpaces})])});`,
                `({[(${testCaseWithWhiteSpaces}).source]: 42});`,
            ];
            for (const source of sources) {
                it("stops parsing unterminated regexes at correct position: " + JSON.stringify(source), () => {
                    const { parseDiagnostics } = ts.createLanguageServiceSourceFile(
                        /*fileName*/ "",
                        ts.ScriptSnapshot.fromString(source),
                        ts.ScriptTarget.Latest,
                        /*version*/ "0",
                        /*setNodeParents*/ false,
                    );
                    const diagnostic = ts.find(parseDiagnostics, ({ code }) => code === ts.Diagnostics.Unterminated_regular_expression_literal.code);
                    assert(diagnostic, "There should be an 'Unterminated regular expression literal.' error");
                    assert.equal(diagnostic.start, source.indexOf("/"), "Diagnostic should start at where the regex starts");
                    assert.equal(diagnostic.length, testCase.length, "Diagnostic should end at where the regex ends");
                });
            }
        }
    }
});
