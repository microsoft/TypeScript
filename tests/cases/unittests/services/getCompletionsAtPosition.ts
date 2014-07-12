///<reference path='_project.ts'/>

debugger;

describe('getCompletionsAtPosition', function () {
    var typescriptLS = new Harness.TypeScriptLS();

    typescriptLS.addDefaultLibrary();

    var fileName = 'tests/cases/unittests/services/testCode/getCompletionsAtPosition1.ts';
    var fileName2 = 'tests/cases/unittests/services/testCode/getCompletionsAtPosition2.ts';
    var fileName3 = 'tests/cases/unittests/services/testCode/getCompletionsAtPosition3.ts';
    var fileName4 = 'tests/cases/unittests/services/testCode/getCompletionsAtPosition4.ts';
    var fileName5 = 'tests/cases/unittests/services/testCode/getCompletionsAtPosition5.ts';
    var fileName6 = 'tests/cases/unittests/services/testCode/getCompletionsAtPosition6.ts';
    var fileName7 = 'tests/cases/unittests/services/testCode/getCompletionsAtPosition7.ts';
    var fileName8 = 'tests/cases/unittests/services/testCode/getCompletionsAtPosition8.ts';
    var fileName9 = 'tests/cases/unittests/services/testCode/getCompletionsAtPosition9.ts';
    var fileName10 = 'tests/cases/unittests/services/testCode/getCompletionsAtPosition10.ts';
    var fileNameBugFixes = 'tests/cases/unittests/services/testCode/getCompletionsAtPositionBugFixes.ts';

    typescriptLS.addFile(fileName);
    typescriptLS.addFile(fileName2);
    typescriptLS.addFile(fileName3);
    typescriptLS.addFile(fileName4);
    typescriptLS.addFile(fileName5);
    typescriptLS.addFile(fileName6);
    typescriptLS.addFile(fileName7);
    typescriptLS.addFile(fileName8);
    typescriptLS.addFile(fileName9);
    typescriptLS.addFile(fileName10);
    typescriptLS.addFile(fileNameBugFixes);

    var ls = typescriptLS.getLanguageService();

    //
    // line and column are 1-based
    //
    function lineColToPosition(fileName: string, line: number, col: number): number {
        var script = ls.languageService.getScriptAST(fileName);
        assert.notNull(script);

        var lineMap = script.locationInfo.lineMap;

        assert.is(line >= 1);
        assert.is(col >= 1);
        assert.is(line <= lineMap.length);
        var offset = lineMap[line - 1] + (col - 1);

        assert.is(offset < script.limChar);
        return offset;
    }

    //
    // line and column are 1-based
    //
    function getCompletionList(fileName, line, column, isMemberCompletion) {
        var position = lineColToPosition(fileName, line, column);
        return ls.languageService.getCompletionsAtPosition(fileName, position, isMemberCompletion);
    }

    describe("test cases for completion list", function () {

        it("contains a private variable defined in a module", function () {
            var result = ls.languageService.getCompletionsAtPosition(fileName, 45, false);
            assert.arrayContainsOnce(result.entries, (x: Services.CompletionEntry) => x.name == "testing" && x.type == "string");
        });

        it("'this.' member completion for class containing privates", function () {
            var result = ls.languageService.getCompletionsAtPosition(fileName, 85, true);
            assert.arrayContainsOnce(result.entries, (x: Services.CompletionEntry) => x.name == "privMeth" && x.type == "() => void");
            assert.arrayContainsOnce(result.entries, (x: Services.CompletionEntry) => x.name == "pubMeth" && x.type == "() => void");
            assert.arrayContainsOnce(result.entries, (x: Services.CompletionEntry) => x.name == "pubProp" && x.type == "number");
        });

        it("member completion for class containing privates, outside of class scope", function () {
            var result = ls.languageService.getCompletionsAtPosition(fileName, 203, true);

            assert.arrayContainsOnce(result.entries, (x: Services.CompletionEntry) => x.name == "pubMeth" && x.type == "() => void");
            assert.arrayContainsOnce(result.entries, (x: Services.CompletionEntry) => x.name == "pubProp" && x.type == "number");
        });

        it("member completion for module-exported class containing privates, outside of class and module scopes", function () {
            var result = ls.languageService.getCompletionsAtPosition(fileName, 343, true);
            assert.notNull(result);
            assert.notNull(result.entries);
            assert.equal(true, result.isMemberCompletion);
            assert.arrayContainsOnce(result.entries, (x: Services.CompletionEntry) => x.name == "pub" && x.type == "number");

        });

        it("member completion for dotted typeref works", function () {
            assert.equal(125, lineColToPosition(fileName2, 12, 11));
            var result = getCompletionList(fileName2, 12, 11, true);
            assert.notEqual(null, result);
            assert.notEqual(null, result.entries);
            assert.equal(true, result.isMemberCompletion);
            assert.equal(2, result.entries.length);
            assert.arrayContainsOnce(result.entries, function (item: Services.CompletionEntry) { return item.name === "Bar"; });
            assert.arrayContainsOnce(result.entries, function (item: Services.CompletionEntry) { return item.name === "Blah"; });
        });

        // Negative Cases
        it("doesnt return anything from a comment-1", function () {
            var result = ls.languageService.getCompletionsAtPosition(fileName, lineColToPosition(fileName, 23, 5), true);
            assert.equal(result.isMemberCompletion, true);
            assert.equal(result.entries.length, 0);
        });

        it("doesnt return anything from a comment-2", function () {
            var result = ls.languageService.getCompletionsAtPosition(fileName, lineColToPosition(fileName, 23, 5), false);
            assert.equal(result.isMemberCompletion, false);
            assert.equal(result.entries.length, 0);
        });

        it("doesnt return anything from a comment-3", function () {
            var result = ls.languageService.getCompletionsAtPosition(fileName, lineColToPosition(fileName, 23, 6), true);
            assert.equal(result.isMemberCompletion, true);
            assert.equal(result.entries.length, 0);
        });

        it("doesnt return anything from a comment-4", function () {
            var result = ls.languageService.getCompletionsAtPosition(fileName, lineColToPosition(fileName, 23, 6), false);
            assert.equal(result.isMemberCompletion, false);
            assert.equal(result.entries.length, 0);
        });

        it("checks for completion in comment", function () {
            var result = ls.languageService.getCompletionsAtPosition(fileName3, lineColToPosition(fileName3, 1, 4), false);
            assert.equal(result.isMemberCompletion, false);
            assert.equal(result.entries.length, 0);
        });

        /*
        it("checks for completion in var decl", function() {
            var result = ls.languageService.getCompletionsAtPosition(fileName3, lineColToPosition(fileName3, 2, 5), false);
            assert.equal(result.wasMemberCompletion, false);
            assert.equal(result.entries.length, 0);
        });
        
        
        it("checks for completion in class decl", function() {
            var result = ls.languageService.getCompletionsAtPosition(fileName4, lineColToPosition(fileName4, 1, 7), false);
            assert.equal(result.wasMemberCompletion, false);
            assert.equal(result.entries.length, 0);
        });
        
        
        it("checks for completion in module decl", function() {
            var result = ls.languageService.getCompletionsAtPosition(fileName5, lineColToPosition(fileName5, 1, 7), false);
            assert.equal(result.wasMemberCompletion, false);
            assert.equal(result.entries.length, 0);
        });

        it("checks for completion in interface decl", function() {
            var result = ls.languageService.getCompletionsAtPosition(fileName6, lineColToPosition(fileName6, 1, 11), false);
            assert.equal(result.wasMemberCompletion, false);
            assert.equal(result.entries.length, 0);
        });
        
        
        it("checks for completion in function decl", function() {
            var result = ls.languageService.getCompletionsAtPosition(fileName7, lineColToPosition(fileName7, 1, 10), false);
            assert.equal(result.wasMemberCompletion, false);
            assert.equal(result.entries.length, 0);
        });
        */

        it("checks for completion after single dot", function () {
            var result = ls.languageService.getCompletionsAtPosition(fileName8, lineColToPosition(fileName8, 1, 1), true);
            assert.equal(result.isMemberCompletion, true);
            assert.equal(result.entries.length, 0);
        });

        it("checks for completion at declaration of parameter type", function () {
            var result = ls.languageService.getCompletionsAtPosition(fileName9, lineColToPosition(fileName9, 9, 17), false);
            assert.equal(result.isMemberCompletion, false);
            assert.arrayContainsOnce(result.entries, function (item: Services.CompletionEntry) { return item.name === "Bar"; });
        });

        it("checks for completion after class extends", function () {
            var result = ls.languageService.getCompletionsAtPosition(fileName9, lineColToPosition(fileName9, 5, 30), false);
            assert.equal(result.isMemberCompletion, false);
            assert.arrayContainsOnce(result.entries, function (item: Services.CompletionEntry) { return item.name === "Bar"; });
            assert.arrayContainsOnce(result.entries, function (item: Services.CompletionEntry) { return item.name === "Bleah"; });
            assert.arrayContainsOnce(result.entries, function (item: Services.CompletionEntry) { return item.name === "Foo"; });
        });

        it("checks for completion at reference to function parameter", function () {
            var result = ls.languageService.getCompletionsAtPosition(fileName10, lineColToPosition(fileName10, 4, 31), true);
            assert.equal(result.isMemberCompletion, true);
            assert.arrayContainsOnce(result.entries, function (item: Services.CompletionEntry) { return item.name === "charAt"; });
            assert.arrayContainsOnce(result.entries, function (item: Services.CompletionEntry) { return item.name === "charCodeAt"; });
            assert.arrayContainsOnce(result.entries, function (item: Services.CompletionEntry) { return item.name === "length"; });
            assert.arrayContainsOnce(result.entries, function (item: Services.CompletionEntry) { return item.name === "concat"; });
        });

        it("checks for completion at enum", function () {
            var result = ls.languageService.getCompletionsAtPosition(fileNameBugFixes, lineColToPosition(fileNameBugFixes, 7, 22), true);
            assert.equal(result.isMemberCompletion, true);
            assert.equal(result.entries.length, 2);
            assert.arrayContainsOnce(result.entries, function (item: Services.CompletionEntry) { return item.name === "bar"; });
            assert.arrayContainsOnce(result.entries, function (item: Services.CompletionEntry) { return item.name === "baz"; });
        });

        it("checks for completion at imported enum", function () {
            var result = ls.languageService.getCompletionsAtPosition(fileNameBugFixes, lineColToPosition(fileNameBugFixes, 10, 9), true);
            assert.equal(result.isMemberCompletion, true);
            assert.equal(result.entries.length, 2);
            assert.arrayContainsOnce(result.entries, function (item: Services.CompletionEntry) { return item.name === "bar"; });
            assert.arrayContainsOnce(result.entries, function (item: Services.CompletionEntry) { return item.name === "baz"; });
        });

        it("checks for completion inside target typed function", function () {
            var result = ls.languageService.getCompletionsAtPosition(fileNameBugFixes, lineColToPosition(fileNameBugFixes, 15, 40), false);
            assert.equal(result.isMemberCompletion, false);
            assert.arrayContainsOnce(result.entries, function (item: Services.CompletionEntry) { return item.name === "elem" && item.type === "string"; });
        });
    });
});
