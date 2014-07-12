///<reference path='_project.ts'/>

describe('overridesCollector', function () {
    var typescriptLS = new Harness.TypeScriptLS();

    typescriptLS.addDefaultLibrary();

    var fileName = 'tests/cases/unittests/services/testCode/overridesCollector.ts';

    typescriptLS.addFile(fileName);

    var ls = typescriptLS.getLanguageService();


    function getOverridesAtPos(fileName:string, line: number, col: number): Services.SymbolSet {
        var pos = typescriptLS.lineColToPosition(fileName, line, col);

        var script = ls.languageService.getScriptAST(fileName);
        assert.notNull(script);

        var sym = ls.languageService.getSymbolAtPosition(script, pos);
        assert.notNull(sym);

        var symbolTree = ls.languageService.getSymbolTree();
        assert.notNull(symbolTree);

        var collector = new Services.OverridesCollector(symbolTree);
        return collector.findMemberOverrides(sym);
    }

    describe('Overrides Collector Simple Tests', function () {
        it("Find method override from base class", function() {
            var result = getOverridesAtPos(fileName, 3, 17);
            assert.notNull(result);
            assert.equal(2, result.getAll().length);
        });

        it("Find method override from derived class", function() {
            var result = getOverridesAtPos(fileName, 7, 17);
            assert.notNull(result);
            assert.equal(2, result.getAll().length);
        });

        it("Find method override from derived interface", function() {
            var result = getOverridesAtPos(fileName, 17, 10);
            assert.notNull(result);
            assert.equal(2, result.getAll().length);
        });

        it("Find method override from base interface", function() {
            var result = getOverridesAtPos(fileName, 14, 10);
            assert.notNull(result);
            assert.equal(2, result.getAll().length);
        });

        it("Find interface method override from derived class", function() {
            var result = getOverridesAtPos(fileName, 26, 17);
            assert.notNull(result);
            assert.equal(2, result.getAll().length);
        });

        it("Find interface method override from base interface", function() {
            var result = getOverridesAtPos(fileName, 23, 11);
            assert.notNull(result);
            assert.equal(2, result.getAll().length);
        });
    });
    describe('Overrides Collector Complex Tests', function () {
        it("Find field override in deep hierarchy", function() {
            var result = getOverridesAtPos(fileName, 42, 12);
            assert.notNull(result);
            assert.equal(5, result.getAll().length);
        });

        it("Find method override in deep hierarchy", function() {
            var result = getOverridesAtPos(fileName, 46, 13);
            assert.notNull(result);
            assert.equal(3, result.getAll().length);
        });
    });
});

