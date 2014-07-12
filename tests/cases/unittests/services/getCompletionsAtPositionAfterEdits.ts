///<reference path='_project.ts'/>

describe('getCompletionsAtPositionAfterEdits', function () {
    var typescriptLS = new Harness.TypeScriptLS();

    typescriptLS.addDefaultLibrary();

    var fileName = 'tests/cases/unittests/services/testCode/getCompletionsAtPositionAfterEdits.ts';
    var fileName2 = 'otherScript.ts';

    typescriptLS.addFile(fileName);
    typescriptLS.addScript(fileName2, typescriptLS.getScriptContent(1));

    var ls = typescriptLS.getLanguageService();

    //
    // line and column are 1-based
    //
    function getCompletionList(fileName: string, position: number, isMemberCompletion: boolean): Services.CompletionInfo {
        return ls.languageService.getCompletionsAtPosition(fileName, position, isMemberCompletion);
    }

    function typeCharacters(fileName: string, line: number, column: number, text: string): number {
        var pos = typescriptLS.lineColToPosition(fileName, line, column);
        for (var i = 0; i < text.length; i++) {
            typescriptLS.editScript(fileName, pos, pos, text.charAt(i));
            pos++;
        }
        return pos;
    }

    describe("test cases for completion list after edits inside source file", function () {

        it("verify function arguments are available after edits at end of function", function () {
            // Apply edit
            var pos = typescriptLS.lineColToPosition(fileName, 5, 13);
            var text = "this.children = ch";
            typescriptLS.editScript(fileName, pos, pos, text);
            var result = getCompletionList(fileName, pos + text.length - 2 /*ch*/, false);
            var entry = result.entries.filter(x => x.name == "children");
            assert.notNull(entry);
            assert.equal(1, entry.length);
        });

        it("verify function arguments are available after edits at end of function after multiple edits", function () {
            // Apply edit
            var text = "this.children = ch";
            var pos = typeCharacters(fileName2, 5, 13, text);
            var result = getCompletionList(fileName2, pos - 2 /*ch*/, false);
            var entry = result.entries.filter(x => x.name == "children");
            assert.notNull(entry);
            assert.equal(1, entry.length);
        });
    });
});
