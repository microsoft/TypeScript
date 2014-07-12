///<reference path='_project.ts'/>

describe('getImplementorsAtPosition', function () {
    var typescriptLS = new Harness.TypeScriptLS();

    typescriptLS.addDefaultLibrary();

    var fileName = 'tests/cases/unittests/services/testCode/getImplementorsAtPosition.ts';

    typescriptLS.addFile(fileName);

    var ls = typescriptLS.getLanguageService();


    function getImplementorsAtPos(fileName:string, line: number, col: number): Services.ReferenceEntry[] {
        var pos = typescriptLS.lineColToPosition(fileName, line, col);

        return ls.languageService.getImplementorsAtPosition(fileName, pos);
    }

    describe('Get Implementors At Position Simple Tests', function () {
        it("Find derived class from base class", function() {
            var result = getImplementorsAtPos(fileName, 2, 12);
            assert.notNull(result);
            assert.equal(2, result.length);
        });

        it("Should not find base class from derived class", function() {
            var result = getImplementorsAtPos(fileName, 6, 12);
            assert.notNull(result);
            assert.equal(1, result.length);
        });

        it("Find derived interface from base interface", function() {
            var result = getImplementorsAtPos(fileName, 13, 16);
            assert.notNull(result);
            assert.equal(2, result.length);
        });

        it("Should not find base interface from derived interface", function() {
            var result = getImplementorsAtPos(fileName, 16, 16);
            assert.notNull(result);
            assert.equal(1, result.length);
        });

        it("Find dervied class from base interface", function() {
            var result = getImplementorsAtPos(fileName, 22, 16);
            assert.notNull(result);
            assert.equal(2, result.length);
        });

        it("Should not find base interface from derived class", function() {
            var result = getImplementorsAtPos(fileName, 25, 12);
            assert.notNull(result);
            assert.equal(1, result.length);
        });
    });

    describe('Get Implementors At Position Complex Tests', function () {
        it("Find derived classes and interfaces from top level interface", function() {
            var result = getImplementorsAtPos(fileName, 32, 17);
            assert.notNull(result);
            assert.equal(6, result.length);
        });

        it("Find derived classes and interfaces from middle interface", function() {
            var result = getImplementorsAtPos(fileName, 41, 18);
            assert.notNull(result);
            assert.equal(4, result.length);
        });
    });
});

