///<reference path='_project.ts'/>

describe('getCompletionsAtPositionObjectLiterals', function () {
    var typescriptls = new Harness.TypeScriptLS();

    typescriptls.addDefaultLibrary();

    var fileNameObjectLiterals = 'tests/cases/unittests/services/testCode/getCompletionsAtPositionObjectLiterals.ts';

    typescriptls.addFile(fileNameObjectLiterals);

    var ls = typescriptls.getLanguageService();

    //
    // line and column are 1-based
    //
    function getCompletionList(fileName: string, line: number, column: number, isMemberCompletion: boolean): Services.CompletionInfo {
        var position = typescriptls.lineColToPosition(fileName, line, column);
        return ls.languageService.getCompletionsAtPosition(fileName, position, isMemberCompletion);
    }

    function assertIsMemberCompletions(result: Services.CompletionInfo) {
        assert.notNull(result);
        assert.is(result.isMemberCompletion, "isMemberCompletion should be set");
        assert.is(!result.maybeInaccurate, "CompletionInfo should be accurate");
        assert.is(result.entries.length == 2, "Completion should contain only 2 members of object literal");
        assert.arrayContainsOnce(result.entries, (x: Services.CompletionEntry) => x.name == "x1" && x.type == "number");
        assert.arrayContainsOnce(result.entries, (x: Services.CompletionEntry) => x.name == "y1" && x.type == "number");
    }

    function assertIsGlobalCompletions(result: Services.CompletionInfo) {
        assert.notNull(result);
        assert.is(!result.isMemberCompletion, "isMemberCompletion should be not be set");
        assert.is(!result.maybeInaccurate, "CompletionInfo should be accurate");
        assert.is(result.entries.length >= 10, "Completion should be global completion set");
    }

    function assertIsNoCompletions(result: Services.CompletionInfo) {
        assert.notNull(result);
        assert.is(result.entries.length == 0, "Completion should be empty (i.e. no completion)");
    }

    describe("test cases for completion list inside object literals", function () {
        it("Literal member completion inside empty literal", function () {
            var result = getCompletionList(fileNameObjectLiterals, 8, 9, false);
            assertIsMemberCompletions(result);
        });

        it("Literal member completion for 2nd member name", function () {
            var result = getCompletionList(fileNameObjectLiterals, 13, 9, false);
            assertIsMemberCompletions(result);
        });

        it("Literal member completion at existing member name location", function () {
            var result = getCompletionList(fileNameObjectLiterals, 17, 9, false);
            assertIsMemberCompletions(result);
        });

        it("Literal member completion after existing member name location", function () {
            var result = getCompletionList(fileNameObjectLiterals, 17, 12, false);
            assertIsMemberCompletions(result);
        });

    });

    describe("test cases for global completion list inside object literals", function () {
        it("Literal member completion after member name with empty member expression and missing colon", function () {
            var result = getCompletionList(fileNameObjectLiterals, 27, 13, false);
            assertIsGlobalCompletions(result);

            var result = getCompletionList(fileNameObjectLiterals, 28, 5, false);
            assertIsGlobalCompletions(result);
        });

        it("Literal member completion after member name with empty member expression", function () {
            var result = getCompletionList(fileNameObjectLiterals, 31, 13, false);
            assertIsGlobalCompletions(result);

            var result = getCompletionList(fileNameObjectLiterals, 31, 22, false);
            assertIsGlobalCompletions(result);
        });

        it("No completion on '{' location", function () {
            var result = getCompletionList(fileNameObjectLiterals, 7, 23, false);
            assertIsGlobalCompletions(result);
        });
    });

    describe("test cases for no completion list inside object literals", function () {
        it("No completion on comments (1)", function () {
            var result = getCompletionList(fileNameObjectLiterals, 8, 12, false);
            assertIsNoCompletions(result);
        });

        it("No completion on comments (2)", function () {
            var result = getCompletionList(fileNameObjectLiterals, 8, 18, false);
            assertIsNoCompletions(result);
        });
    });
});
