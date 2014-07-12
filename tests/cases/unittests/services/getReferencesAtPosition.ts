///<reference path='_project.ts'/>

debugger;

describe('getReferencesAtPosition', function() {
    var typescriptLS = new Harness.TypeScriptLS();

    typescriptLS.addDefaultLibrary();

    var fileName1 = 'tests/cases/unittests/services/testCode/getReferencesAtPositionTest.ts';
    var fileName2 = 'tests/cases/unittests/services/testCode/getReferencesAtPositionTest2.ts';
    var fileName3 = 'tests/cases/unittests/services/testCode/getReferencesAtPositionTest3.ts';
    var fileName4 = 'tests/cases/unittests/services/testCode/getReferencesAtPositionTest4.ts';

    typescriptLS.addFile(fileName1);
    typescriptLS.addFile(fileName2);
    typescriptLS.addFile(fileName3);
    typescriptLS.addFile(fileName4);

    var ls = typescriptLS.getLanguageService();

    // Returns the offset corresponding to the line + column given
    function lineToOffset(line: number, col = 0, fileName?: string = fileName1) {
        var script: TypeScript.Script = ls.languageService.getScriptAST(fileName);
        return script.locationInfo.lineMap[line - 1] + col;
    }

    describe("local get references", function() {

        it("finds references to comment", function() {
            var result = ls.getReferencesAtPosition(fileName1, lineToOffset(2, 25));
            assert.equal(1, result.split("\n").length);
        });

        it("find references to type", function() {
            var result = ls.getReferencesAtPosition(fileName1, lineToOffset(3, 15));
            var count = 0;
            // Filter out the lib.d.ts
            var items = result.split("\n");
            for (var i = 0; i < items.length; i++) {
                if (items[i].split(" ")[0] !== "0") {
                    count++;
                }
            }
            assert.equal(10, count);
        });

        it("find references to a variable declared in global", function() {
            var result = ls.getReferencesAtPosition(fileName1, lineToOffset(3, 4));
            assert.equal(12, result.split("\n").length);
        });

        it("find references to a variable declared in a class", function() {
            var result = ls.getReferencesAtPosition(fileName1, lineToOffset(8, 8));
            assert.equal(3, result.split("\n").length);
        });

        it("find references to static variable declared in a class", function() {
            var result = ls.getReferencesAtPosition(fileName1, lineToOffset(6, 16));
            assert.equal(7, result.split("\n").length);
        });

        it("find references to a variable declared in a function", function() {
            var result = ls.getReferencesAtPosition(fileName1, lineToOffset(22, 8));
            assert.equal(3, result.split("\n").length);
        });

        it("find references to a class parameter", function() {
            var result = ls.getReferencesAtPosition(fileName1, lineToOffset(15, 17));
            assert.equal(2, result.split("\n").length);
        });

        it("find references to a function parameter", function() {
            var result = ls.getReferencesAtPosition(fileName1, lineToOffset(20, 14));
            assert.equal(3, result.split("\n").length);
        });

        it("find references to a function argument", function() {
            var result = ls.getReferencesAtPosition(fileName1, lineToOffset(66, 8));
            assert.equal(12, result.split("\n").length);
        });

        it("find references to a class argument", function() {
            var result = ls.getReferencesAtPosition(fileName1, lineToOffset(65, 29));
            assert.equal(12, result.split("\n").length);
        });

        it("find references to illegal assignment", function() {
            var result = ls.getReferencesAtPosition(fileName1, lineToOffset(75, 0));
            assert.equal(8, result.split("\n").length);
        });

        it("find references to unresolved symbol", function() {
            var result = ls.getReferencesAtPosition(fileName1, lineToOffset(76, 0));
            assert.equal(1, result.split("\n").length);
        });

        it("find references to no context", function() {
            var result = ls.getReferencesAtPosition(fileName1, lineToOffset(77, 0));
            assert.equal(1, result.split("\n").length);
        });

        it("find references to shadowed function parameter", function() {
            var result = ls.getReferencesAtPosition(fileName1, lineToOffset(79, 20));
            assert.equal(4, result.split("\n").length);
        });

        it("find reference misses function parameter", function() {
            var result = ls.getReferencesAtPosition(fileName1, lineToOffset(115, 11));
            assert.equal(3, result.split("\n").length);
        });
    });

    describe("remote get references", function() {
        it("find references to a variable declared in global", function() {
            var result = ls.getReferencesAtPosition(fileName1, lineToOffset(96, 0));
            assert.equal(12, result.split("\n").length);
        });

        it("find references to a type", function() {
            var result = ls.getReferencesAtPosition(fileName1, lineToOffset(87, 23));
            assert.equal(9, result.split("\n").length);
        });

        it("find references to a function argument", function() {
            var result = ls.getReferencesAtPosition(fileName1, lineToOffset(91, 19));
            assert.equal(12, result.split("\n").length);
        });

        it("find references to a class argument", function() {
            var result = ls.getReferencesAtPosition(fileName1, lineToOffset(90, 43));
            assert.equal(12, result.split("\n").length);
        });

        it("find references to a variable declared in a class", function() {
            var result = ls.getReferencesAtPosition(fileName2, lineToOffset(5, 8, fileName2));
            assert.equal(3, result.split("\n").length);
        });

        it("find references to static variable declared in a class", function() {
            var result = ls.getReferencesAtPosition(fileName2, lineToOffset(6, 11, fileName2));
            assert.equal(7, result.split("\n").length);
        });
    });

    describe("get references for overrides", function() {
        it("find references to a field declared in a base class", function() {
            var result = ls.languageService.getReferencesAtPosition(fileName3, lineToOffset(62, 11, fileName3));
            assert.equal(3, result.length);
        });

        it("find references to a field declared in a base interface", function() {
            var result = ls.languageService.getReferencesAtPosition(fileName3, lineToOffset(65, 11, fileName3));
            assert.equal(3, result.length);
        });

        it("find references to a field declared in a chain of base class and interfaces", function() {
            var result = ls.languageService.getReferencesAtPosition(fileName3, lineToOffset(68, 11, fileName3));
            assert.equal(6, result.length);
        });
    });

    describe("get references for statics with same names as members", function() {
        it("find references to a member method with the same name as a static", function() {
            /* public foo(): void */
            var result = ls.languageService.getReferencesAtPosition(fileName4, lineToOffset(7, 21, fileName4));
            assert.equal(3, result.length);
        });

        it("find references to a static method with the same name as a member", function() {
            /* public static foo(): void  */
            var result = ls.languageService.getReferencesAtPosition(fileName4, lineToOffset(9, 28, fileName4));
            assert.equal(2, result.length);
        });

        it("find references to a member property with the same name as a static", function() {
            /* bar: Foo */
            var result = ls.languageService.getReferencesAtPosition(fileName4, lineToOffset(4, 14, fileName4));
            assert.equal(3, result.length);
        });

        it("find references to a static property with the same name as a member", function() {
            /* static bar: Foo */
            var result = ls.languageService.getReferencesAtPosition(fileName4, lineToOffset(5, 21, fileName4));
            assert.equal(2, result.length);
        });
    });
});
