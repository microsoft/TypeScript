///<reference path='_project.ts'/>

describe('getFormattingEditsForRange', function() {
    //
    // Verify that formatting the typescript file "sourceFileName" results in the
    // baseline file "baselineFileName".
    //
    function getFormattingEditsForRange(sourceFileName: string) {
        var baselineFileName = "tests/cases/unittests/services/testCode/formatting/" + sourceFileName + "BaseLine.ts";
        sourceFileName = "tests/cases/unittests/services/testCode/formatting/" + sourceFileName + ".ts";

        var typescriptLS = new Harness.TypeScriptLS();
        typescriptLS.addDefaultLibrary();
        typescriptLS.addFile(sourceFileName);

        var ls = typescriptLS.getLanguageService();
        var script = ls.languageService.getScriptAST(sourceFileName);
        assert.notNull(script);

        var edits = ls.languageService.getFormattingEditsForRange(sourceFileName, 0, script.limChar, new Services.FormatCodeOptions());
        typescriptLS.checkEdits(sourceFileName, baselineFileName, edits);
    }

    describe('test cases for formatting engine', function() {
        it("formats typescript constructs properly", function() {
            getFormattingEditsForRange('typescriptConstructs');
        });
        it("formats document ready function properly", function() {
            getFormattingEditsForRange('documentReadyFunction');
        });
        it("formats on closing bracket properly", function() {
            getFormattingEditsForRange('onClosingBracket');
        });
        it("formats various javascript constructs", function() {
            getFormattingEditsForRange('various');
        });
        it("formats main javascript program", function() {
            getFormattingEditsForRange('main');
        });
        it("formats on semicolon properly", function() {
            getFormattingEditsForRange('onSemiColon');
        });
        it("formats enum with trailling tab characters properly", function() {
            getFormattingEditsForRange('tabAfterCloseCurly');
        });
        it("formats object literal", function() {
            getFormattingEditsForRange('objectLiteral');
        });
        it("formats with statements", function() {
            getFormattingEditsForRange('withStatement');
        });
        it("formats ':' and '?' in parameters", function() {
            getFormattingEditsForRange('colonAndQMark');
        });
        it("formats 'import' declaration", function() {
            getFormattingEditsForRange('importDeclaration');
        });
        it("formats exported class with implicit module", function() {
            //TODO: this is to force generation of implicit module in AST
            var svGenTarget = TypeScript.moduleGenTarget;
            try {
                TypeScript.moduleGenTarget = TypeScript.ModuleGenTarget.Asynchronous;
                getFormattingEditsForRange('implicitModule');
            }
            finally {
                TypeScript.moduleGenTarget = svGenTarget;
            }
        });
        it("formats constructor statements correctelly", function() {
            getFormattingEditsForRange('spaceAfterConstructor');
        });
        it("formats classes and interfaces correctelly", function() {
            getFormattingEditsForRange('classes');
        });
        it("formats modules correctly", function() {
            getFormattingEditsForRange('modules');
        });
        it("formats fat arrow expressions correctelly", function() {
            getFormattingEditsForRange('fatArrowFunctions');
        });
        it("formats empty object/interface literals correctelly", function() {
            getFormattingEditsForRange('emptyInterfaceLiteral');
        });
        it("formats variable declaration lists", function() {
            getFormattingEditsForRange('formatVariableDeclarationList');
        });
    });
});
