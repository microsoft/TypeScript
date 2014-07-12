///<reference path='_project.ts'/>

describe('getDefinitionPositionAtPositionPartialInterface', function() {
    var typescriptLS = new Harness.TypeScriptLS();

    typescriptLS.addDefaultLibrary();

    var fileName = 'tests/cases/unittests/services/testCode/getDefinitionsAtPositionPartialInterface1.ts';
    var fileName2 = 'tests/cases/unittests/services/testCode/getDefinitionsAtPositionPartialInterface2.ts';

    typescriptLS.addFile(fileName);
    typescriptLS.addFile(fileName2);

    var ls = typescriptLS.getLanguageService()
    function definitionAtPos(fileName:string, line: number, col: number) {
        return ls.languageService.getDefinitionAtPosition(fileName, typescriptLS.lineColToPosition(fileName, line, col));
    }

    describe('GoTo Definition', function() {
        it("returns the location of the first part of a partial interface", function() {
            var def = definitionAtPos(fileName2, 8, 13);
            assert.notNull(def);
            assert.equal(def.unitIndex, 1);
            assert.equal(typescriptLS.positionToZeroBasedLineCol(fileName, def.minChar).line + 1, 2);
            assert.equal(typescriptLS.positionToZeroBasedLineCol(fileName, def.minChar).col + 1, 5);
        });
    });
});

