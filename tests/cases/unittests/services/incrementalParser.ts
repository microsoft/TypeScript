///<reference path='_project.ts'/>

module IncrementalParserTest {
    export class State {
        private fileName: string;
        private typescriptLS: Harness.TypeScriptLS;
        private ls: Services.ILanguageServiceShim;
        private logger: TypeScript.BufferedLogger;
        private parser: TypeScript.IncrementalParser;
        private script: TypeScript.Script;
        private newSourceText: TypeScript.IScriptSnapshot;

        public applyEditInRange(fileName, startLine, startCol, endLine, endCol, newText) {
            this.initFileName(fileName);

            var result = this.applyIncrementalParser(startLine, startCol, endLine, endCol, newText);
            if (result === null) {
                var sep = "\r\n   | ";
                throw new Error("Incremental parser should not have bailed out:" + sep + this.logger.logContents.join(sep));
            }

            this.assertTreesAreEqual(result);
        }

        public assertBailout(fileName, startLine, startCol, endLine, endCol, newText) {
            this.initFileName(fileName);
            var result = this.applyIncrementalParser(startLine, startCol, endLine, endCol, newText);
            assert.is(result == null, "Incremental parser should have bailed out");
        }

        private applyIncrementalParser(startLine, startCol, endLine, endCol, newText): TypeScript.UpdateUnitResult {
            var fileName = this.fileName;
            var offset1 = this.typescriptLS.lineColToPosition(fileName, startLine, startCol);
            var offset2 = this.typescriptLS.lineColToPosition(fileName, endLine, endCol);
            var textEdit = new Services.TextEdit(offset1, offset2, newText);
            var newContent = this.typescriptLS.applyEdits(this.typescriptLS.getScriptContent(1), [textEdit]);
            this.newSourceText = new TypeScript.StringScriptSnapshot(newContent);

            var result = this.parser.attemptIncrementalUpdateUnit(this.script, fileName, this.newSourceText,
                new TypeScript.TextChangeRange(TypeScript.TextSpan.fromBounds(offset1, offset2), newText.length));
            return result;
        }

        private initFileName(fileName: string) {
            this.fileName = fileName;
            this.typescriptLS = this.createLS(fileName);
            this.ls = this.typescriptLS.getLanguageService();
            this.logger = new TypeScript.BufferedLogger();
            this.parser = new TypeScript.IncrementalParser(this.logger);
            this.script = this.ls.languageService.getScriptAST(fileName);
            assert.notNull(this.script);
        }

        private assertTreesAreEqual(result: TypeScript.UpdateUnitResult) {
            assert.notNull(result);
            this.parser.mergeTrees(result);

            var finalScript = result.script1;
            var nonIncrementalScript = this.typescriptLS.parseSourceText(this.fileName, this.newSourceText);

            var logger1 = new TypeScript.BufferedLogger();
            var astLogger1 = new TypeScript.AstLogger(logger1);
            astLogger1.logScript(finalScript);

            var logger2 = new TypeScript.BufferedLogger();
            var astLogger2 = new TypeScript.AstLogger(logger2);
            astLogger2.logScript(nonIncrementalScript);

            var log1 = logger1.logContents.join("\r\n");
            var log2 = logger2.logContents.join("\r\n");

            assert.noDiff(log1, log2);
        }

        private createLS(fileName: string): Harness.TypeScriptLS {
            var typescriptLS = new Harness.TypeScriptLS();
            typescriptLS.addDefaultLibrary();
            typescriptLS.addFile(fileName);
            return typescriptLS;
        }
    }
}

describe('incrementalParser tests', function () {
    var fileName = 'tests/cases/unittests/services/testCode/incrementalParser.ts';
    var fileName2 = 'tests/cases/unittests/services/testCode/incrementalParser2.ts';


    describe('Incremental edits to unit', function () {
        it("Simple delete inside a function should be incremental", function () {
            new IncrementalParserTest.State().applyEditInRange(fileName, 10, 5, 10, 39, "");
        });
        it("Simple insert inside a function should be incremental", function () {
            new IncrementalParserTest.State().applyEditInRange(fileName, 10, 5, 10, 6, "test-test-test");
        });
    });

    describe('Bail out tests', function () {
        it("Adding semicolon at end of interface function should force bailout", function () {
            new IncrementalParserTest.State().assertBailout(fileName2, 4, 16, 4, 16, ";");
        });
    });
});