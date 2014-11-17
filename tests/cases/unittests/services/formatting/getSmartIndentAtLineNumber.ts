///<reference path='_project.ts'/>

describe('getSmartIndentAtLineNumber', function() {
    var typescriptLS = new Harness.TypeScriptLS();

    typescriptLS.addDefaultLibrary();

    var fileName = 'tests/cases/unittests/services/testCode/getSmartIndentAtLineNumber.ts';
    var fileName2 = 'tests/cases/unittests/services/testCode/getSmartIndentAtLineNumber2.ts';
    var fileName3 = 'tests/cases/unittests/services/testCode/getSmartIndentAtLineNumber3.ts';

    typescriptLS.addFile(fileName);
    typescriptLS.addFile(fileName2);
    typescriptLS.addFile(fileName3);

    var ls = typescriptLS.getLanguageService();

    //
    // line is 1-based
    //
    function getSmartIndent(fileName: string, line: number): number {
        assert.is(line >= 1);
        var options = new Services.EditorOptions();
        var position = typescriptLS.lineColToPosition(fileName, line, 1);
        return ls.languageService.getSmartIndentAtLineNumber(fileName, position, options);
    }

    describe("test cases for smart indent", function() {

        it("smart indent inside module", function() {
            var result = getSmartIndent(fileName, 2);

            assert.notNull(result);
            assert.equal(4, result);
        });

        it("smart indent inside class", function() {
            var result = getSmartIndent(fileName, 4);

            assert.notNull(result);
            assert.equal(8, result);
        });

        it("smart indent after property in class", function() {
            var result = getSmartIndent(fileName, 6);

            assert.notNull(result);
            assert.equal(8, result);
        });

        it("smart indent inside method in class ", function() {
            var result = getSmartIndent(fileName, 9);

            assert.notNull(result);
            assert.equal(12, result);
        });

        it("smart indent after after method in class", function() {
            var result = getSmartIndent(fileName, 12);

            assert.notNull(result);
            assert.equal(8, result);
        });

        it("smart indent after class", function() {
            var result = getSmartIndent(fileName, 17);

            assert.notNull(result);
            assert.equal(4, result);
        });

        it("smart indent in interface", function() {
            var result = getSmartIndent(fileName, 19);

            assert.notNull(result);
            assert.equal(8, result);
        });

        it("smart indent after property in interface", function() {
            var result = getSmartIndent(fileName, 21);

            assert.notNull(result);
            assert.equal(8, result);
        });

        it("smart indent after method in interface", function() {
            var result = getSmartIndent(fileName, 23);

            assert.notNull(result);
            assert.equal(8, result);
        });

        it("smart indent after interface", function() {
            var result = getSmartIndent(fileName, 25);

            assert.notNull(result);
            assert.equal(4, result);
        });

        it("smart indent in nested module", function() {
            var result = getSmartIndent(fileName, 27);

            assert.notNull(result);
            assert.equal(8, result);
        });

        it("smart indent after function in nested module", function() {
            var result = getSmartIndent(fileName, 30);

            assert.notNull(result);
            assert.equal(8, result);
        });

        it("smart indent after variable in nested module", function() {
            var result = getSmartIndent(fileName, 32);

            assert.notNull(result);
            assert.equal(8, result);
        });

        it("smart indent after nested module", function() {
            var result = getSmartIndent(fileName, 34);

            assert.notNull(result);
            assert.equal(4, result);
        });

        it("smart indent in enum", function() {
            var result = getSmartIndent(fileName, 36);

            assert.notNull(result);
            assert.equal(8, result);
        });

        it("smart indent after variable in enum", function() {
            var result = getSmartIndent(fileName, 38);

            assert.notNull(result);
            assert.equal(8, result);
        });

        it("smart indent after 2nd variable in enum", function() {
            var result = getSmartIndent(fileName, 40);

            assert.notNull(result);
            assert.equal(8, result);
        });

        it("smart indent after enum", function() {
            var result = getSmartIndent(fileName, 42);

            assert.notNull(result);
            assert.equal(4, result);
        });

        it("smart indent after module", function() {
            var result = getSmartIndent(fileName, 44);

            assert.notNull(result);
            assert.equal(0, result);
        });

        ///////////////////////////////////////////////////////////////////////

        it("smart indent after an aligned function argument", function() {
            var result = getSmartIndent(fileName, 47);

            assert.notNull(result);
            assert.equal(13, result);
        });

        ///////////////////////////////////////////////////////////////////////

        it("smart indent inside a 'for' statement", function() {
            var result = getSmartIndent(fileName, 53);

            assert.notNull(result);
            assert.equal(8, result);
        });

        it("smart indent after a 'for' statement", function() {
            var result = getSmartIndent(fileName, 55);

            assert.notNull(result);
            assert.equal(4, result);
        });

        it("smart indent inside a 'for in' statement", function() {
            var result = getSmartIndent(fileName, 57);

            assert.notNull(result);
            assert.equal(8, result);
        });

        it("smart indent after a 'for in' statement", function() {
            var result = getSmartIndent(fileName, 59);

            assert.notNull(result);
            assert.equal(4, result);
        });

        it("smart indent inside a 'with' statement", function() {
            var result = getSmartIndent(fileName, 61);

            assert.notNull(result);
            assert.equal(8, result);
        });

        it("smart indent after a 'with' statement", function() {
            var result = getSmartIndent(fileName, 63);

            assert.notNull(result);
            assert.equal(4, result);
        });

        it("smart indent inside a 'switch' statement", function() {
            var result = getSmartIndent(fileName, 65);

            assert.notNull(result);
            assert.equal(8, result);
        });

        it("smart indent after a 'switch' statement", function() {
            var result = getSmartIndent(fileName, 67);

            assert.notNull(result);
            assert.equal(4, result);
        });

        it("smart indent inside a 'break' statement", function() {
            var result = getSmartIndent(fileName, 69);

            assert.notNull(result);
            assert.equal(8, result);
        });

        it("smart indent after a 'break' statement", function() {
            var result = getSmartIndent(fileName, 71);

            assert.notNull(result);
            assert.equal(12, result);
        });

        it("smart indent after a 'break' statement", function() {
            var result = getSmartIndent(fileName, 73);

            assert.notNull(result);
            assert.equal(8, result);
        });

        it("smart indent after last 'switch' statement", function() {
            var result = getSmartIndent(fileName, 75);

            assert.notNull(result);
            assert.equal(4, result);
        });

        ///////////////////////////////////////////////////////////////////////

        it("smart indent before 'try' in 'try/catch' statement", function() {
            var result = getSmartIndent(fileName, 79);

            assert.notNull(result);
            assert.equal(4, result);
        });

        it("smart indent insde 'try' in 'try/catch' statement", function() {
            var result = getSmartIndent(fileName, 81);

            assert.notNull(result);
            assert.equal(8, result);
        });

        it("smart indent before 'catch' in 'try/catch' statement", function() {
            var result = getSmartIndent(fileName, 83);

            assert.notNull(result);
            assert.equal(4, result);
        });

        it("smart indent inside 'catch' in 'try/catch' statement", function() {
            var result = getSmartIndent(fileName, 85);

            assert.notNull(result);
            assert.equal(8, result);
        });

        it("smart indent after 'catch' in 'try/catch' statement", function() {
            var result = getSmartIndent(fileName, 87);

            assert.notNull(result);
            assert.equal(4, result);
        });

        ///////////////////////////////////////////////////////////////////////

        it("smart indent before 'try' in 'try/finally' statement", function() {
            var result = getSmartIndent(fileName, 92);

            assert.notNull(result);
            assert.equal(4, result);
        });

        it("smart indent insde 'try' in 'try/finally' statement", function() {
            var result = getSmartIndent(fileName, 94);

            assert.notNull(result);
            assert.equal(8, result);
        });

        it("smart indent before 'finally' in 'try/finally' statement", function() {
            var result = getSmartIndent(fileName, 96);

            assert.notNull(result);
            assert.equal(4, result);
        });

        it("smart indent inside 'finally' in 'try/finally' statement", function() {
            var result = getSmartIndent(fileName, 98);

            assert.notNull(result);
            assert.equal(8, result);
        });

        it("smart indent after 'finally' in 'try/finally' statement", function() {
            var result = getSmartIndent(fileName, 100);

            assert.notNull(result);
            assert.equal(4, result);
        });

        ///////////////////////////////////////////////////////////////////////

        it("smart indent before 'try' in 'try/catch/finally' statement", function() {
            var result = getSmartIndent(fileName, 104);

            assert.notNull(result);
            assert.equal(4, result);
        });

        it("smart indent insde 'try' in 'try/catch/finally' statement", function() {
            var result = getSmartIndent(fileName, 106);

            assert.notNull(result);
            assert.equal(8, result);
        });

        it("smart indent before 'catch' in 'try/catch/finally' statement", function() {
            var result = getSmartIndent(fileName, 108);

            assert.notNull(result);
            assert.equal(4, result);
        });

        it("smart indent inside 'catch' in 'try/catch/finally' statement", function() {
            var result = getSmartIndent(fileName, 110);

            assert.notNull(result);
            assert.equal(8, result);
        });

        it("smart indent before 'finally' in 'try/catch/finally' statement", function() {
            var result = getSmartIndent(fileName, 112);

            assert.notNull(result);
            assert.equal(4, result);
        });

        it("smart indent inside 'finally' in 'try/catch/finally' statement", function() {
            var result = getSmartIndent(fileName, 114);

            assert.notNull(result);
            assert.equal(8, result);
        });

        it("smart indent after 'finally' in 'try/catch/finally' statement", function() {
            var result = getSmartIndent(fileName, 116);

            assert.notNull(result);
            assert.equal(4, result);
        });

        ///////////////////////////////////////////////////////////////////////

        it("smart indent inside a block inside case", function() {
            var result = getSmartIndent(fileName, 127);

            assert.notNull(result);
            assert.equal(20, result);
        });

        ///////////////////////////////////////////////////////////////////////

        it("smart indent works for a non terminated argument list at the end of a file", function() {
            var result = getSmartIndent(fileName2, 8);

            assert.notNull(result);
            assert.equal(4, result);
        });

        ///////////////////////////////////////////////////////////////////////

        it("smart indent works for a non terminated if statement at the end of a file", function() {
            var result = getSmartIndent(fileName3, 7);

            assert.notNull(result);
            assert.equal(4, result);
        });
    });
});
